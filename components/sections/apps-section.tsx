"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, Download, Globe, Smartphone } from "lucide-react";

type AppItem = { id: string; title: string; description?: string; androidUrl?: string; websiteUrl?: string };
const initialApp: AppItem = {
  id: "vikcastx",
  title: "VikcastX",
  description: "Explore VikcastX on Android or visit the website.",
  androidUrl: "https://vikcastx.com/download#android-download",
  websiteUrl: "https://vikcastx.com/"
};

export function AppsSection() {
  const [apps, setApps] = useState<AppItem[]>([initialApp]);
  useEffect(() => {
    void fetch("/api/admin/content/apps", { cache: "no-store" })
      .then((response) => response.json())
      .then((body) => {
        if (Array.isArray(body?.items) && body.items.length) setApps(body.items);
      })
      .catch(() => undefined);
  }, []);
  return <section className="container py-16" aria-labelledby="apps-heading">
    <div className="mb-7"><p className="text-sm font-bold uppercase tracking-[.2em] text-[#8B5CF6]">Apps &amp; digital products</p><h2 id="apps-heading" className="mt-2 text-3xl font-black text-white">Explore our apps</h2></div>
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{apps.map((app) => <article key={app.id} className="rounded-3xl border border-white/10 bg-[#0D1323]/80 p-6 text-white">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#8B5CF6]/30 to-[#3B82F6]/30 text-[#c7a8ff]"><Smartphone className="h-6 w-6" /></div>
      <h3 className="mt-4 text-xl font-bold">{app.title}</h3><p className="mt-2 min-h-12 text-sm leading-6 text-white/60">{app.description || "Find out more and get started."}</p>
      <div className="mt-5 flex flex-wrap gap-3">{app.androidUrl ? <a href={app.androidUrl} target="_blank" rel="noopener noreferrer" className="inline-flex h-10 items-center gap-2 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#3B82F6] px-4 text-sm font-bold"><Download className="h-4 w-4" />Android app<ArrowUpRight className="h-4 w-4" /></a> : null}{app.websiteUrl ? <a href={app.websiteUrl} target="_blank" rel="noopener noreferrer" className="inline-flex h-10 items-center gap-2 rounded-xl border border-white/15 px-4 text-sm font-semibold text-white/80"><Globe className="h-4 w-4" />Website<ArrowUpRight className="h-4 w-4" /></a> : null}</div>
    </article>)}</div>
  </section>;
}
