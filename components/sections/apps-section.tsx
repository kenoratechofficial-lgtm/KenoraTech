"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowUpRight, Download, Globe, Smartphone, X } from "lucide-react";

type AppItem = { id: string; title: string; description?: string; details?: string; androidUrl?: string; websiteUrl?: string; imageUrl?: string; productType?: "app" | "website" | "software" };
const initialApp: AppItem = {
  id: "vikcastx",
  title: "VikcastX",
  description: "Explore VikcastX on Android or visit the website.",
  details: "Explore VikcastX on Android or visit the VikcastX website.",
  productType: "app",
  androidUrl: "https://vikcastx.com/download#android-download",
  websiteUrl: "https://vikcastx.com/"
};

export function AppsSection() {
  const [apps, setApps] = useState<AppItem[]>([initialApp]);
  const [selectedApp, setSelectedApp] = useState<AppItem | null>(null);
  useEffect(() => {
    void fetch("/api/admin/content/apps", { cache: "no-store" })
      .then((response) => response.json())
      .then((body) => {
        if (Array.isArray(body?.items) && body.items.length) setApps(body.items);
      })
      .catch(() => undefined);
  }, []);
  const groups = [
    { key: "app", heading: "Apps", entries: apps.filter((app) => (app.productType || "app") === "app") },
    { key: "website", heading: "Websites", entries: apps.filter((app) => app.productType === "website") },
    { key: "software", heading: "Software", entries: apps.filter((app) => app.productType === "software") }
  ];
  if (!apps.length) return null;
  return <section className="container grid gap-12 py-16" aria-label="Apps, websites, and software">
    {groups.filter((group) => group.entries.length > 0).map((group) => <div key={group.key}>
      <div className="mb-7"><h2 className="text-3xl font-black text-white">{group.heading}</h2></div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{group.entries.map((app) => <article key={app.id} className="rounded-3xl border border-white/10 bg-[#0D1323]/80 p-6 text-white">
        <div className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-[#8B5CF6]/30 to-[#3B82F6]/30 text-[#c7a8ff]">{app.imageUrl ? <Image src={app.imageUrl} alt={`${app.title} logo`} fill sizes="48px" className="object-contain p-1" /> : <Smartphone className="h-6 w-6" />}</div>
        <h3 className="mt-4 text-xl font-bold">{app.title}</h3><p className="mt-2 min-h-12 text-sm leading-6 text-white/60">{app.description || "Find out more and get started."}</p>
        <div className="mt-5 flex flex-wrap gap-3">{app.androidUrl ? <a href={app.androidUrl} target="_blank" rel="noopener noreferrer" className="inline-flex h-10 items-center gap-2 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#3B82F6] px-4 text-sm font-bold"><Download className="h-4 w-4" />Android app<ArrowUpRight className="h-4 w-4" /></a> : null}{app.websiteUrl ? <a href={app.websiteUrl} target="_blank" rel="noopener noreferrer" className="inline-flex h-10 items-center gap-2 rounded-xl border border-white/15 px-4 text-sm font-semibold text-white/80"><Globe className="h-4 w-4" />Website<ArrowUpRight className="h-4 w-4" /></a> : null}<button type="button" onClick={() => setSelectedApp(app)} className="inline-flex h-10 items-center gap-2 rounded-xl border border-white/15 px-4 text-sm font-semibold text-white/80 hover:border-[#8B5CF6]/60 hover:text-white">Learn More<ArrowUpRight className="h-4 w-4" /></button></div>
      </article>)}</div>
    </div>)}
    {selectedApp ? <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/75 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="portfolio-app-details-title" onMouseDown={() => setSelectedApp(null)}><section onMouseDown={(event) => event.stopPropagation()} className="my-auto w-full max-w-xl rounded-3xl border border-white/10 bg-[#0D1323] p-6 text-white shadow-2xl"><div className="flex items-start justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-[.2em] text-[#8ccfff]">{selectedApp.productType || "app"} details</p><h2 id="portfolio-app-details-title" className="mt-2 text-2xl font-black">{selectedApp.title}</h2></div><button type="button" onClick={() => setSelectedApp(null)} aria-label="Close details" className="rounded-lg p-1 text-white/70 hover:text-white"><X /></button></div><p className="mt-5 whitespace-pre-wrap leading-7 text-white/75">{selectedApp.details || selectedApp.description || "More details will be added soon."}</p><button type="button" onClick={() => setSelectedApp(null)} className="mt-7 h-10 rounded-xl border border-white/10 px-4 text-sm font-semibold text-white/75 transition hover:bg-white/[.05] hover:text-white">Close</button></section></div> : null}
  </section>;
}
