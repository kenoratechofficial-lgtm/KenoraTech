import { NextResponse, type NextRequest } from "next/server";
import { isAuthorizedAdmin } from "@/lib/admin-auth";
import { deleteContactSubmission } from "@/lib/contact-submissions";
import { DatabaseConnectionError } from "@/lib/mongodb";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!isAuthorizedAdmin(request)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    const { id } = await params;
    await deleteContactSubmission(id);
    return NextResponse.json({ ok: true });
  } catch (error) {
    if (error instanceof DatabaseConnectionError) {
      return NextResponse.json({ error: error.message }, { status: 503 });
    }

    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to delete message." },
      { status: 400 }
    );
  }
}
