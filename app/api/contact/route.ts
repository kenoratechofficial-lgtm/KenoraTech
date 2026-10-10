import { NextResponse, type NextRequest } from "next/server";
import { isAuthorizedAdmin } from "@/lib/admin-auth";
import { createContactSubmission, listContactSubmissions } from "@/lib/contact-submissions";
import { DatabaseConnectionError } from "@/lib/mongodb";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    await createContactSubmission(await request.json());
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (error) {
    if (error instanceof DatabaseConnectionError) {
      return NextResponse.json({ error: error.message }, { status: 503 });
    }

    return NextResponse.json({ error: "Please fill all required fields." }, { status: 400 });
  }
}

export async function GET(request: NextRequest) {
  if (!isAuthorizedAdmin(request)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    const messages = await listContactSubmissions();
    return NextResponse.json({ messages });
  } catch (error) {
    if (error instanceof DatabaseConnectionError) {
      return NextResponse.json({ error: error.message }, { status: 503 });
    }

    return NextResponse.json({ error: "Unable to load messages." }, { status: 500 });
  }
}
