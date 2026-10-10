import { GridFSBucket } from "mongodb";
import { NextResponse, type NextRequest } from "next/server";
import { isAuthorizedAdmin } from "@/lib/admin-auth";
import { DatabaseConnectionError, getMongoDb } from "@/lib/mongodb";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  if (!isAuthorizedAdmin(request)) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

  try {
    const formData = await request.formData();
    const file = formData.get("image");
    if (!(file instanceof File) || !file.type.startsWith("image/")) {
      return NextResponse.json({ error: "Please select an image file." }, { status: 400 });
    }
    if (file.size > 2 * 1024 * 1024) {
      return NextResponse.json({ error: "Images must be 2 MB or smaller." }, { status: 400 });
    }

    const db = await getMongoDb();
    const bucket = new GridFSBucket(db, { bucketName: "team_images" });
    const upload = bucket.openUploadStream(file.name || "team-member-image", { metadata: { contentType: file.type } });
    const buffer = Buffer.from(await file.arrayBuffer());
    await new Promise<void>((resolve, reject) => {
      upload.once("finish", resolve);
      upload.once("error", reject);
      upload.end(buffer);
    });
    return NextResponse.json({ imageId: upload.id.toString() }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error instanceof DatabaseConnectionError ? error.message : "Unable to upload image." }, { status: 500 });
  }
}
