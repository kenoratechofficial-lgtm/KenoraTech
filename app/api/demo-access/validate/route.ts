import { NextResponse, type NextRequest } from "next/server";
import { validateDemoAccess } from "@/lib/protected-demo";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const token = typeof body.token === "string" ? body.token : "";
    const projectId = typeof body.projectId === "string" ? body.projectId : "";
    const clientId = typeof body.clientId === "string" ? body.clientId : "";
    const clientSecret = typeof body.clientSecret === "string" ? body.clientSecret : "";
    if (!token || !projectId || !clientId || !clientSecret) return NextResponse.json({ allowed: false, reason: "INVALID_REQUEST" }, { status: 400 });
    return NextResponse.json(await validateDemoAccess(token, projectId, clientId, clientSecret));
  } catch { return NextResponse.json({ allowed: false, reason: "VALIDATION_UNAVAILABLE" }, { status: 503 }); }
}
