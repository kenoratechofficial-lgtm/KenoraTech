import { GridFSBucket, ObjectId } from "mongodb";
import { NextResponse } from "next/server";
import { getMongoDb } from "@/lib/mongodb";

export const runtime = "nodejs";

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!ObjectId.isValid(id)) return new NextResponse(null, { status: 404 });

  try {
    const db = await getMongoDb();
    const bucket = new GridFSBucket(db, { bucketName: "team_images" });
    const file = await db.collection("team_images.files").findOne({ _id: new ObjectId(id) });
    if (!file) return new NextResponse(null, { status: 404 });
    const stream = bucket.openDownloadStream(new ObjectId(id));
    const body = new ReadableStream({
      start(controller) {
        stream.on("data", (chunk) => controller.enqueue(chunk));
        stream.on("end", () => controller.close());
        stream.on("error", (error) => controller.error(error));
      }
    });
    const contentType = typeof file.metadata?.contentType === "string" ? file.metadata.contentType : "image/jpeg";
    return new NextResponse(body, { headers: { "Content-Type": contentType, "Cache-Control": "public, max-age=31536000, immutable" } });
  } catch {
    return new NextResponse(null, { status: 404 });
  }
}
