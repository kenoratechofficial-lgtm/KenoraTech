import { NextResponse, type NextRequest } from "next/server";
import { isAuthorizedAdmin } from "@/lib/admin-auth";
import { DatabaseConnectionError } from "@/lib/mongodb";
import { createJob, listJobs } from "@/lib/jobs";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  try { return NextResponse.json({ jobs: await listJobs(isAuthorizedAdmin(request)) }); }
  catch (error) { return NextResponse.json({ error: error instanceof DatabaseConnectionError ? error.message : "Unable to load jobs." }, { status: 503 }); }
}

export async function POST(request: NextRequest) {
  if (!isAuthorizedAdmin(request)) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  try { return NextResponse.json({ job: await createJob(await request.json()) }, { status: 201 }); }
  catch (error) { return NextResponse.json({ error: error instanceof Error ? error.message : "Unable to create job." }, { status: 400 }); }
}
