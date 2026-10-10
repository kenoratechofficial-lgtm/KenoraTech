import { NextResponse, type NextRequest } from "next/server";
import { isAuthorizedAdmin } from "@/lib/admin-auth";
import { DatabaseConnectionError } from "@/lib/mongodb";
import { deletePortfolioProject, updatePortfolioProject } from "@/lib/portfolio";

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
    await deletePortfolioProject(id);
    return NextResponse.json({ ok: true });
  } catch (error) {
    if (error instanceof DatabaseConnectionError) {
      return NextResponse.json({ error: error.message }, { status: 503 });
    }

    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to delete project." },
      { status: 400 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!isAuthorizedAdmin(request)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    const { id } = await params;
    const project = await updatePortfolioProject(id, await request.json());
    return NextResponse.json({ project });
  } catch (error) {
    if (error instanceof DatabaseConnectionError) {
      return NextResponse.json({ error: error.message }, { status: 503 });
    }

    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to update project." },
      { status: 400 }
    );
  }
}
