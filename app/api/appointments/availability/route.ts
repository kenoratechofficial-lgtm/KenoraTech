import { NextResponse, type NextRequest } from "next/server";
import { availableDates, availableSlots } from "@/lib/appointments";
export const runtime = "nodejs"; export const dynamic = "force-dynamic";
export async function GET(request: NextRequest) { try { const date = request.nextUrl.searchParams.get("date"); return NextResponse.json(date ? { slots: await availableSlots(date) } : { dates: await availableDates() }); } catch (error) { return NextResponse.json({ error: error instanceof Error ? error.message : "Unable to check availability." }, { status: 400 }); } }
