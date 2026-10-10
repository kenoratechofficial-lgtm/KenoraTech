import { NextResponse, type NextRequest } from "next/server";
import { isAuthorizedAdmin } from "@/lib/admin-auth";
import { deleteJob, updateJob } from "@/lib/jobs";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!isAuthorizedAdmin(request)) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  try { const { id } = await params; return NextResponse.json({ job: await updateJob(id, await request.json()) }); }
  catch (error) { return NextResponse.json({ error: error instanceof Error ? error.message : "Unable to update job." }, { status: 400 }); }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!isAuthorizedAdmin(request)) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  try { const { id } = await params; await deleteJob(id); return NextResponse.json({ ok: true }); }
  catch (error) { return NextResponse.json({ error: error instanceof Error ? error.message : "Unable to delete job." }, { status: 400 }); }
}
