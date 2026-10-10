import { NextResponse, type NextRequest } from "next/server";
import { isAuthorizedAdmin } from "@/lib/admin-auth";
import { listMaintenanceNotifications, subscribeToMaintenanceNotifications } from "@/lib/maintenance-notifications";
import { sendMaintenanceSubscriptionEmail } from "@/lib/careers-mail";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();
    const subscription = await subscribeToMaintenanceNotifications(email);
    if (!subscription.alreadySubscribed) void sendMaintenanceSubscriptionEmail(subscription.email);
    return NextResponse.json(subscription, { status: 201 });
  } catch (error) { return NextResponse.json({ error: error instanceof Error ? error.message : "Unable to save your email." }, { status: 400 }); }
}

export async function GET(request: NextRequest) {
  if (!isAuthorizedAdmin(request)) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  try { return NextResponse.json({ subscribers: await listMaintenanceNotifications() }); }
  catch { return NextResponse.json({ error: "Unable to load subscribers." }, { status: 503 }); }
}
