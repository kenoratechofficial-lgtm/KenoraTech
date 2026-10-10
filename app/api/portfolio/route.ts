import { NextResponse, type NextRequest } from "next/server";
import { isAuthorizedAdmin } from "@/lib/admin-auth";
import { DatabaseConnectionError } from "@/lib/mongodb";
import { createPortfolioProject, listPortfolioProjects } from "@/lib/portfolio";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
  try {
    const projects = await listPortfolioProjects();
    return NextResponse.json({ projects });
  } catch (error) {
    if (error instanceof DatabaseConnectionError) {
      return NextResponse.json({ error: error.message }, { status: 503 });
    }

    return NextResponse.json({ error: "Unable to load projects." }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  if (!isAuthorizedAdmin(request)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    const project = await createPortfolioProject(await request.json());
    return NextResponse.json({ project }, { status: 201 });
  } catch (error) {
    if (error instanceof DatabaseConnectionError) {
      return NextResponse.json({ error: error.message }, { status: 503 });
    }

    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to create project." },
      { status: 400 }
    );
  }
}
