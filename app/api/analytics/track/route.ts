import { NextResponse, type NextRequest } from "next/server";
import { analyticsCollections } from "@/lib/analytics";
import { classifySource } from "@/lib/traffic-source";

export const runtime = "nodejs";
const validId = (value: unknown) => typeof value === "string" && /^[a-z0-9-]{20,80}$/i.test(value);
const safe = (value: unknown, length = 500) => typeof value === "string" ? value.slice(0, length) : "";

export async function POST(request: NextRequest) {
  try { const body = await request.json(); if (!validId(body.sessionId) || !validId(body.visitorId)) return NextResponse.json({ ok: false }, { status: 400 });
    const now = new Date(); const pagePath = safe(body.pagePath, 800); if (!pagePath.startsWith("/")) return NextResponse.json({ ok: false }, { status: 400 });
    const source = classifySource(safe(body.utmSource, 80), safe(body.referrer, 800)); const { sessions, pageViews } = await analyticsCollections();
    const existing = await sessions.findOne({ sessionId: body.sessionId });
    await sessions.updateOne({ sessionId: body.sessionId }, { $set: { visitorId: body.visitorId, lastSeenAt: now, currentPage: pagePath, source, medium: safe(body.utmMedium, 80), campaign: safe(body.utmCampaign, 160), device: ["Desktop", "Mobile", "Tablet"].includes(body.device) ? body.device : "Desktop", browser: safe(body.browser, 240) }, $setOnInsert: { firstSeenAt: now } }, { upsert: true });
    if (!existing || existing.currentPage !== pagePath) await pageViews.insertOne({ sessionId: body.sessionId, visitorId: body.visitorId, pagePath, source, device: ["Desktop", "Mobile", "Tablet"].includes(body.device) ? body.device : "Desktop", timestamp: now });
    return NextResponse.json({ ok: true });
  } catch { return NextResponse.json({ ok: false }, { status: 204 }); }
}
