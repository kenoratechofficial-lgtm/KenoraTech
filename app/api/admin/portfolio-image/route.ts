import { GridFSBucket } from "mongodb";
import { NextResponse, type NextRequest } from "next/server";
import { isAuthorizedAdmin } from "@/lib/admin-auth";
import { DatabaseConnectionError, getMongoDb } from "@/lib/mongodb";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  if (!isAuthorizedAdmin(request)) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  try {
    const file = (await request.formData()).get("image");
    if (!file || typeof file === "string" || !["image/jpeg", "image/png", "image/webp"].includes(file.type)) return NextResponse.json({ error: "Please select a PNG, JPG, or WebP image." }, { status: 400 });
    if (file.size > 8 * 1024 * 1024) return NextResponse.json({ error: "Images must be 8 MB or smaller." }, { status: 400 });
    const buffer = Buffer.from(await file.arrayBuffer());
    const bucket = new GridFSBucket(await getMongoDb(), { bucketName: "portfolio_images" });
    const upload = bucket.openUploadStream(file.name || "portfolio-image", { metadata: { contentType: file.type } });
    await new Promise<void>((resolve, reject) => { upload.once("finish", resolve); upload.once("error", reject); upload.end(buffer); });
    return NextResponse.json({ imageUrl: `/api/portfolio-image/${upload.id}` }, { status: 201 });
  } catch (error) { return NextResponse.json({ error: error instanceof DatabaseConnectionError ? error.message : "Unable to upload image." }, { status: 500 }); }
}
