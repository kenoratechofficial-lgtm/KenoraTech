import { GridFSBucket, ObjectId } from "mongodb";
import { NextResponse, type NextRequest } from "next/server";
import { getMongoDb } from "@/lib/mongodb";

export const runtime = "nodejs";

export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!ObjectId.isValid(id)) return new NextResponse("Not found", { status: 404 });
  try {
    const db = await getMongoDb();
    const file = await db.collection("portfolio_images.files").findOne({ _id: new ObjectId(id) });
    if (!file) return new NextResponse("Not found", { status: 404 });
    const stream = new GridFSBucket(db, { bucketName: "portfolio_images" }).openDownloadStream(new ObjectId(id));
    return new NextResponse(stream as unknown as ReadableStream, { headers: { "Content-Type": String(file.metadata?.contentType || "image/jpeg"), "Cache-Control": "public, max-age=31536000, immutable" } });
  } catch { return new NextResponse("Not found", { status: 404 }); }
}
