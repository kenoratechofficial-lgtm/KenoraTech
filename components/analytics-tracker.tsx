"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { classifySource } from "@/lib/traffic-source";

const id = () => crypto.randomUUID();
const device = () => /ipad|tablet/i.test(navigator.userAgent) ? "Tablet" : /mobi|android/i.test(navigator.userAgent) ? "Mobile" : "Desktop";

export function AnalyticsTracker() {
  const pathname = usePathname(); const search = useSearchParams();
  useEffect(() => {
    const visitorId = localStorage.getItem("kt_visitor") || id(); localStorage.setItem("kt_visitor", visitorId);
    const sessionId = sessionStorage.getItem("kt_session") || id(); sessionStorage.setItem("kt_session", sessionId);
    const payload = () => ({ visitorId, sessionId, pagePath: `${pathname}${search.toString() ? `?${search}` : ""}`, referrer: document.referrer, utmSource: search.get("utm_source") || "", utmMedium: search.get("utm_medium") || "", utmCampaign: search.get("utm_campaign") || "", utmContent: search.get("utm_content") || "", utmTerm: search.get("utm_term") || "", source: classifySource(search.get("utm_source") || "", document.referrer), device: device(), browser: navigator.userAgent.slice(0, 240) });
    const send = () => { void fetch("/api/analytics/track", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload()), keepalive: true }).catch(() => undefined); };
    send(); const heartbeat = window.setInterval(send, 25000); return () => window.clearInterval(heartbeat);
  }, [pathname, search]);
  return null;
}
