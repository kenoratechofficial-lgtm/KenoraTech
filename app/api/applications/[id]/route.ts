import { NextResponse, type NextRequest } from "next/server";
import { isAuthorizedAdmin } from "@/lib/admin-auth";
import { updateApplicationStatus } from "@/lib/applications";
export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) { if (!isAuthorizedAdmin(request)) return NextResponse.json({ error: "Unauthorized." }, { status: 401 }); try { const { id } = await params; return NextResponse.json({ application: await updateApplicationStatus(id, (await request.json()).status) }); } catch (error) { return NextResponse.json({ error: error instanceof Error ? error.message : "Unable to update application." }, { status: 400 }); } }
