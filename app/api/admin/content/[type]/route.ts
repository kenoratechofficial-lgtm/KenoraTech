import { GridFSBucket, ObjectId, type Document } from "mongodb";
import { NextResponse, type NextRequest } from "next/server";
import { isAuthorizedAdmin } from "@/lib/admin-auth";
import { DatabaseConnectionError, getMongoDb } from "@/lib/mongodb";

const contentTypes = new Set(["services", "team", "testimonials", "process", "navigation", "social-links", "settings", "home", "about", "contact"]);
const publicTypes = new Set(["services", "team", "testimonials", "process", "navigation", "social-links", "home", "about", "contact"]);
const text = (value: unknown, length = 2000) => typeof value === "string" ? value.trim().slice(0, length) : "";
const list = (value: unknown) => Array.isArray(value) ? value.map((item) => text(item, 120)).filter(Boolean).slice(0, 30) : [];

function serialize(doc: Document) {
  const { _id, ...item } = doc;
  return { id: _id.toString(), ...item, createdAt: doc.createdAt?.toISOString?.(), updatedAt: doc.updatedAt?.toISOString?.() };
}

function clean(type: string, body: Record<string, unknown>) {
  const title = text(body.title, 160);
  const description = text(body.description, 4000);
  if (type !== "settings" && type !== "home" && !title) throw new Error("A title is required.");
  if (["services", "process", "testimonials"].includes(type) && !description) throw new Error("A description is required.");
  const imageId = text(body.imageId, 64);
  if (imageId && !ObjectId.isValid(imageId)) throw new Error("Invalid image reference.");
  return {
    title, description, imageId: imageId || undefined, designation: text(body.designation, 160) || undefined,
    linkedinUrl: text(body.linkedinUrl, 500) || undefined, githubUrl: text(body.githubUrl, 500) || undefined,
    email: text(body.email, 320) || undefined, icon: text(body.icon, 60) || undefined,
    imageUrl: text(body.imageUrl, 1000) || undefined, category: text(body.category, 160) || undefined,
    url: text(body.url, 1000) || undefined, features: list(body.features),
    isActive: body.isActive !== false, sortOrder: Number.isFinite(Number(body.sortOrder)) ? Number(body.sortOrder) : 0,
    updatedAt: new Date()
  };
}

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET(request: NextRequest, { params }: { params: Promise<{ type: string }> }) {
  const { type } = await params;
  if (!contentTypes.has(type)) return NextResponse.json({ error: "Unknown content type." }, { status: 404 });
  const admin = isAuthorizedAdmin(request);
  if (!admin && !publicTypes.has(type)) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  try {
    const db = await getMongoDb();
    const filter = admin ? {} : { isActive: { $ne: false } };
    const items = await db.collection(`admin_${type}`).find(filter).sort({ sortOrder: 1, createdAt: 1 }).toArray();
    return NextResponse.json({ items: items.map(serialize) }, { headers: admin ? undefined : { "Cache-Control": "no-store, max-age=0" } });
  } catch (error) {
    return NextResponse.json({ error: error instanceof DatabaseConnectionError ? error.message : "Unable to load content." }, { status: 500 });
  }
}

export async function POST(request: NextRequest, { params }: { params: Promise<{ type: string }> }) {
  if (!isAuthorizedAdmin(request)) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  const { type } = await params;
  if (!contentTypes.has(type)) return NextResponse.json({ error: "Unknown content type." }, { status: 404 });
  try {
    const db = await getMongoDb(); const payload = clean(type, await request.json()); const now = new Date();
    const last = await db.collection(`admin_${type}`).find({}).sort({ sortOrder: -1 }).limit(1).next();
    const result = await db.collection(`admin_${type}`).insertOne({ ...payload, sortOrder: payload.sortOrder || (Number(last?.sortOrder) || 0) + 1, createdAt: now });
    const item = await db.collection(`admin_${type}`).findOne({ _id: result.insertedId });
    return NextResponse.json({ item: item && serialize(item) }, { status: 201 });
  } catch (error) { return NextResponse.json({ error: error instanceof Error ? error.message : "Unable to save content." }, { status: 400 }); }
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ type: string }> }) {
  if (!isAuthorizedAdmin(request)) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  const { type } = await params; const id = new URL(request.url).searchParams.get("id") || "";
  if (!contentTypes.has(type) || !ObjectId.isValid(id)) return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  try { const db = await getMongoDb(); const payload = clean(type, await request.json()); await db.collection(`admin_${type}`).updateOne({ _id: new ObjectId(id) }, { $set: payload }); const item = await db.collection(`admin_${type}`).findOne({ _id: new ObjectId(id) }); return NextResponse.json({ item: item && serialize(item) }); } catch (error) { return NextResponse.json({ error: error instanceof Error ? error.message : "Unable to update content." }, { status: 400 }); }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ type: string }> }) {
  if (!isAuthorizedAdmin(request)) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  const { type } = await params; if (!contentTypes.has(type)) return NextResponse.json({ error: "Unknown content type." }, { status: 404 });
  try { const ids = (await request.json()).ids; if (!Array.isArray(ids) || ids.some((id) => typeof id !== "string" || !ObjectId.isValid(id))) throw new Error("Invalid ordering."); const db = await getMongoDb(); await db.collection(`admin_${type}`).bulkWrite(ids.map((id, sortOrder) => ({ updateOne: { filter: { _id: new ObjectId(id) }, update: { $set: { sortOrder, updatedAt: new Date() } } } }))); return NextResponse.json({ ok: true }); } catch (error) { return NextResponse.json({ error: error instanceof Error ? error.message : "Unable to save order." }, { status: 400 }); }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ type: string }> }) {
  if (!isAuthorizedAdmin(request)) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  const { type } = await params; const id = new URL(request.url).searchParams.get("id") || "";
  if (!contentTypes.has(type) || !ObjectId.isValid(id)) return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  try { const db = await getMongoDb(); const item = await db.collection(`admin_${type}`).findOneAndDelete({ _id: new ObjectId(id) }); if (type === "team" && item?.imageId && ObjectId.isValid(item.imageId)) await new GridFSBucket(db, { bucketName: "team_images" }).delete(new ObjectId(item.imageId)).catch(() => undefined); return NextResponse.json({ ok: true }); } catch (error) { return NextResponse.json({ error: error instanceof DatabaseConnectionError ? error.message : "Unable to delete content." }, { status: 500 }); }
}
