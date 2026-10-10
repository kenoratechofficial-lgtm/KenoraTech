import { NextResponse, type NextRequest } from "next/server";
import { isAuthorizedAdmin } from "@/lib/admin-auth";
import { createAppointment, listAppointments } from "@/lib/appointments";
import { sendAppointmentEmails } from "@/lib/appointment-mail";
export const runtime = "nodejs"; export const dynamic = "force-dynamic";
export async function POST(request: NextRequest) { try { const body = await request.json(); const appointment = await createAppointment(body); void sendAppointmentEmails(appointment); return NextResponse.json({ appointment }, { status: 201 }); } catch (error) { return NextResponse.json({ error: error instanceof Error ? error.message : "Unable to request a consultation." }, { status: 400 }); } }
export async function GET(request: NextRequest) { if (!isAuthorizedAdmin(request)) return NextResponse.json({ error: "Unauthorized." }, { status: 401 }); try { const { searchParams } = request.nextUrl; return NextResponse.json({ appointments: await listAppointments(searchParams.get("status") || undefined, searchParams.get("date") || undefined) }); } catch { return NextResponse.json({ error: "Unable to load bookings." }, { status: 500 }); } }
