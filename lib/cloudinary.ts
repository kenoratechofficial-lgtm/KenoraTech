import crypto from "node:crypto";

export async function uploadCareerResume(file: File) {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;
  if (!cloudName || !apiKey || !apiSecret) throw new Error("Cloudinary is not configured.");

  const timestamp = Math.floor(Date.now() / 1000).toString();
  const folder = "kenoratech/careers/resumes";
  const signature = crypto.createHash("sha1").update(`folder=${folder}&timestamp=${timestamp}${apiSecret}`).digest("hex");
  const form = new FormData();
  form.append("file", file);
  form.append("folder", folder);
  form.append("timestamp", timestamp);
  form.append("api_key", apiKey);
  form.append("signature", signature);
  const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/raw/upload`, { method: "POST", body: form });
  const body = await response.json().catch(() => null);
  if (!response.ok || !body?.secure_url) throw new Error(body?.error?.message || "Cloudinary upload failed.");
  return { url: body.secure_url as string, publicId: body.public_id as string };
}
