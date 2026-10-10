"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, X } from "lucide-react";
import { useEffect, useState } from "react";
import type { PortfolioProject } from "@/lib/portfolio";

interface ProjectCardProps { project: PortfolioProject; index: number; }

export function ProjectCard({ project, index }: ProjectCardProps) {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState("");
  useEffect(() => { if (!open) return; const close = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false); document.addEventListener("keydown", close); return () => document.removeEventListener("keydown", close); }, [open]);

  return <>
    <motion.article initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.48, delay: index * 0.06, ease: "easeOut" }} whileHover={{ y: -10 }} className="group relative overflow-hidden rounded-3xl border border-white/[0.08] bg-[#071020]/78 p-4 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_20px_70px_rgba(0,0,0,0.22)] backdrop-blur-2xl transition duration-500 hover:border-[#1aa8ff]/75 hover:shadow-[0_0_52px_rgba(139,49,255,0.32)]">
      <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100"><div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_0%,rgba(0,168,255,0.18),transparent_10rem),radial-gradient(circle_at_8%_100%,rgba(139,28,255,0.22),transparent_12rem)]" /></div>
      <div className="relative flex aspect-[1.72] items-center justify-center overflow-hidden rounded-2xl border border-white/[0.06] bg-[#050816] p-2"><Image src={project.imageUrl || "/portfolio/portfolio-website.svg"} alt={`${project.title} project preview`} width={960} height={560} className="h-full w-full object-contain transition duration-700 group-hover:scale-[1.04]" /></div>
      <div className="relative z-10 px-1 pb-1 pt-5"><h3 className="text-xl font-bold tracking-normal text-white">{project.title}</h3><p className="mt-2 min-h-[72px] text-sm leading-6 text-white/72">{project.description}</p>{project.demoEnabled && project.demoRequiresApproval ? <button onClick={() => { setStatus(""); setOpen(true); }} className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#c062ff] transition hover:text-[#37b8ff] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1aa8ff]" aria-label={`Request demo access for ${project.title}`}>Request Demo Access <ArrowRight className="h-4 w-4" /></button> : <Link href={project.liveUrl || "/contact"} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#c062ff] transition hover:text-[#37b8ff]">View Project <ArrowRight className="h-4 w-4" /></Link>}</div>
    </motion.article>
    {open ? <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto overscroll-contain bg-black/75 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby={`demo-title-${project.id}`} onMouseDown={() => setOpen(false)}>
      <form onMouseDown={(event) => event.stopPropagation()} onSubmit={async (event) => { event.preventDefault(); const data = new FormData(event.currentTarget); const response = await fetch("/api/demo-requests", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(Object.fromEntries(data)) }); const body = await response.json().catch(() => null); setStatus(response.ok ? "Your demo access request has been submitted. Our team will review it." : body?.error || "Unable to submit request."); if (response.ok) event.currentTarget.reset(); }} className="my-auto w-full max-w-lg rounded-3xl border border-white/10 bg-[#0D1323] p-5 shadow-2xl sm:p-6">
        <div className="flex items-start justify-between gap-4"><div><h2 id={`demo-title-${project.id}`} className="text-xl font-black">Request Demo Access</h2><p className="mt-1 text-sm text-white/60">{project.title}</p></div><button type="button" onClick={() => setOpen(false)} aria-label="Close request form" className="rounded-lg p-1 text-white/70 hover:text-white"><X /></button></div>
        <input type="hidden" name="projectId" value={project.id} /><input type="hidden" name="projectTitle" value={project.title} />
        <div className="mt-5 grid gap-3"><input name="name" type="text" placeholder="Full name (optional)" className="h-11 rounded-xl border border-white/10 bg-[#050816] px-4 text-sm text-white" /><input name="email" required type="email" placeholder="Email *" className="h-11 rounded-xl border border-white/10 bg-[#050816] px-4 text-sm text-white" /><input name="company" type="text" placeholder="Company / Organization (optional)" className="h-11 rounded-xl border border-white/10 bg-[#050816] px-4 text-sm text-white" /><div className="grid gap-1"><input name="phone" required type="tel" inputMode="tel" pattern="\+[1-9][0-9]{7,14}" placeholder="WhatsApp number with country code * (e.g. +14155552671)" title="Include your country code, for example +14155552671." className="h-11 rounded-xl border border-white/10 bg-[#050816] px-4 text-sm text-white" /><p className="text-xs text-white/45">Include the country code so we can contact you internationally on WhatsApp.</p></div><textarea name="message" placeholder="Message (optional)" rows={3} className="rounded-xl border border-white/10 bg-[#050816] p-4 text-sm text-white" /><button className="h-11 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#3B82F6] text-sm font-bold">Submit Request</button>{status ? <p className="text-sm text-white/70" aria-live="polite">{status}</p> : null}</div>
      </form>
    </div> : null}
  </>;
}
