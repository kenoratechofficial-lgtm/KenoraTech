import { ObjectId } from "mongodb";
import { NextResponse, type NextRequest } from "next/server";
import { isAuthorizedAdmin } from "@/lib/admin-auth";
import { getMongoDb } from "@/lib/mongodb";
import { createSecret, demoCollections, demoDurations, hashToken } from "@/lib/protected-demo";

export const runtime = "nodejs";
const clean = (value: unknown, limit = 1000) => typeof value === "string" ? value.trim().slice(0, limit) : "";
const whatsappNumber = (value: string) => /^\+[1-9]\d{7,14}$/.test(value) ? value.slice(1) : null;

export async function POST(request: NextRequest) { try { const body = await request.json(); const projectId = clean(body.projectId, 64), projectTitle = clean(body.projectTitle, 160), name = clean(body.name, 160), email = clean(body.email, 320).toLowerCase(), phone = clean(body.phone, 80); if (!projectId || !projectTitle || !/^\S+@\S+\.\S+$/.test(email) || !phone) return NextResponse.json({ error: "Email, WhatsApp number, and project are required." }, { status: 400 }); if (!whatsappNumber(phone)) return NextResponse.json({ error: "Enter a WhatsApp number with country code, for example +14155552671." }, { status: 400 }); const db = await getMongoDb(); const recent = await db.collection("demoRequests").countDocuments({ email, projectId, createdAt: { $gte: new Date(Date.now() - 60 * 60 * 1000) } }); if (recent >= 3) return NextResponse.json({ error: "Please wait before sending another request for this demo." }, { status: 429 }); await db.collection("demoRequests").insertOne({ projectId, projectTitle, name, email, company: clean(body.company, 200), phone, message: clean(body.message, 3000), status: "PENDING", createdAt: new Date() }); return NextResponse.json({ ok: true }, { status: 201 }); } catch { return NextResponse.json({ error: "Unable to submit demo request." }, { status: 500 }); } }

export async function GET(request: NextRequest) { if (!isAuthorizedAdmin(request)) return NextResponse.json({ error: "Unauthorized." }, { status: 401 }); try { const db = await getMongoDb(); const requests = await db.collection("demoRequests").find({}).sort({ createdAt: -1 }).toArray(); return NextResponse.json({ requests: requests.map(({ _id, ...item }) => ({ id: _id.toString(), ...item })) }); } catch { return NextResponse.json({ error: "Unable to load demo requests." }, { status: 500 }); } }

export async function PATCH(request: NextRequest) {
  if (!isAuthorizedAdmin(request)) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  try {
    const body = await request.json(), id = clean(body.id, 64), status = clean(body.status, 16).toUpperCase(), durationKey = clean(body.duration, 8) as keyof typeof demoDurations;
    if (!ObjectId.isValid(id) || !["APPROVED", "DECLINED"].includes(status)) return NextResponse.json({ error: "Choose a valid request and decision." }, { status: 400 });
    const db = await getMongoDb(), requests = db.collection("demoRequests"), item = await requests.findOne({ _id: new ObjectId(id) });
    if (!item) return NextResponse.json({ error: "Demo request not found." }, { status: 404 });
    if (item.status !== "PENDING") return NextResponse.json({ error: "This request has already been reviewed." }, { status: 409 });
    if (status === "DECLINED") { const result = await requests.findOneAndUpdate({ _id: item._id }, { $set: { status, reviewedAt: new Date() } }, { returnDocument: "after" }); const { _id, ...updated } = result!; return NextResponse.json({ request: { id: _id.toString(), ...updated } }); }
    if (!durationKey || !(durationKey in demoDurations)) return NextResponse.json({ error: "Choose how long demo access should last." }, { status: 400 });
    const phone = whatsappNumber(clean(item.phone, 80));
    if (!phone) return NextResponse.json({ error: "This request needs a WhatsApp number with a country code (for example +14155552671) before it can be approved." }, { status: 400 });
    if (!ObjectId.isValid(item.projectId)) return NextResponse.json({ error: "This request has an invalid project reference." }, { status: 400 });
    const project = await db.collection("portfolioProjects").findOne({ _id: new ObjectId(item.projectId) }), demoUrl = clean(project?.demoUrl, 2000);
    if (!project?.demoEnabled || !demoUrl) return NextResponse.json({ error: "Add a protected demo URL and enable the demo for this project before approving requests." }, { status: 400 });
    const token = createSecret(), url = new URL(demoUrl), durationSeconds = demoDurations[durationKey]; url.searchParams.set("access_token", token);
    const { access, audit } = await demoCollections(), now = new Date();
    const accessRecord = await access.insertOne({ requestId: item._id.toString(), projectId: item.projectId, email: item.email, tokenHash: hashToken(token), status: "ISSUED", accessDurationSeconds: durationSeconds, issuedAt: now });
    await audit.insertOne({ demoAccessId: accessRecord.insertedId.toString(), action: "ACCESS_ISSUED", timestamp: now });
    const result = await requests.findOneAndUpdate({ _id: item._id }, { $set: { status, reviewedAt: now, accessDuration: durationKey, demoAccessId: accessRecord.insertedId.toString(), whatsappPreparedAt: now } }, { returnDocument: "after" }); const { _id, ...updated } = result!;
    const greeting = item.name ? `Hello ${item.name},` : "Hello,";
    const message = `${greeting}\n\nYour KenoraTech demo access request for ${item.projectTitle} has been approved.\n\nOpen your private demo link:\n${url}\n\nThis access is valid for ${durationKey} after you first open it. Please do not share this link.\n\nRegards,\nKenoraTech`;
    return NextResponse.json({ request: { id: _id.toString(), ...updated }, whatsappUrl: `https://wa.me/${phone}?text=${encodeURIComponent(message)}` });
  } catch (error) { return NextResponse.json({ error: error instanceof Error ? error.message : "Unable to update demo request." }, { status: 500 }); }
}

export async function DELETE(request: NextRequest) {
  if (!isAuthorizedAdmin(request)) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  const id = request.nextUrl.searchParams.get("id") || "";
  if (!ObjectId.isValid(id)) return NextResponse.json({ error: "Invalid demo request id." }, { status: 400 });
  try {
    const db = await getMongoDb();
    const deleted = await db.collection("demoRequests").findOneAndDelete({ _id: new ObjectId(id) });
    if (!deleted) return NextResponse.json({ error: "Demo request not found." }, { status: 404 });
    const { access } = await demoCollections();
    await access.deleteMany({ requestId: id });
    return NextResponse.json({ ok: true });
  } catch { return NextResponse.json({ error: "Unable to delete demo request." }, { status: 500 }); }
}
