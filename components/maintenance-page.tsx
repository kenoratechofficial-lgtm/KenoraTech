"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Bell, CalendarDays, Check, Clock3, Cog, Github, Headphones, Hourglass, Instagram, Linkedin, Mail, Rocket, Send, Wrench, X, type LucideIcon } from "lucide-react";
import { FormEvent, useState } from "react";
import background from "@/assets/maintenance.png";

const steps = [
  { label: "System Check", status: "Completed", icon: Check, state: "done" },
  { label: "Maintenance", status: "In Progress", icon: Wrench, state: "current" },
  { label: "Optimization", status: "Pending", icon: Cog, state: "pending" },
  { label: "Going Live", status: "Pending", icon: Rocket, state: "pending" }
];

const completionItems: { icon: LucideIcon; title: string; sub: string }[] = [
  { icon: CalendarDays, title: "Today", sub: "July 30, 2026" },
  { icon: Clock3, title: "06:00 PM", sub: "IST" },
  { icon: Hourglass, title: "2h 45m", sub: "Remaining" }
];

export function MaintenancePage() {
  const [email, setEmail] = useState(""); const [notified, setNotified] = useState(false);
  async function notify(event: FormEvent) { event.preventDefault(); const response = await fetch("/api/maintenance-notifications", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email }) }); if (response.ok) setNotified(true); else { const body = await response.json().catch(() => null); window.alert(body?.error || "Unable to save your email."); } }
  return <div className="relative isolate overflow-hidden bg-[#030711] text-white">
    <Image src={background} alt="" priority fill className="-z-30 object-cover object-center" />
    <div className="absolute inset-0 -z-20 bg-[linear-gradient(180deg,rgba(3,7,17,.18),#030711_82%)]" />
    <main className="container py-16 sm:py-20">
      <section className="grid items-center gap-10 lg:min-h-[490px] lg:grid-cols-[.9fr_1.1fr]">
        <motion.div initial={{ opacity: 0, x: -18 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: .65 }}>
          <span className="inline-flex items-center gap-2 rounded-xl border border-[#b84cff]/75 bg-[#351252]/35 px-4 py-2 text-sm font-bold shadow-[0_0_28px_rgba(151,50,255,.28)] backdrop-blur"><Wrench className="h-4 w-4" /> Scheduled Maintenance</span>
          <h1 className="mt-7 text-5xl font-black leading-[1.12] sm:text-6xl">We&apos;ll Be<br /><span className="bg-gradient-to-r from-[#c139ff] via-[#7d60ff] to-[#0ebcff] bg-clip-text text-transparent">Back Soon!</span></h1>
          <p className="mt-6 max-w-md text-lg leading-8 text-white/75">Our team is currently performing scheduled maintenance to improve your experience. We appreciate your patience!</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, scale: .94 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: .1, duration: .7 }} className="relative mx-auto w-full max-w-xl py-8">
          <motion.div animate={{ y: [0, -10, 0], rotate: [0, 4, 0] }} transition={{ duration: 5, repeat: Infinity }} className="absolute left-3 top-10 z-10 flex h-20 w-20 items-center justify-center rounded-full border border-[#b956ff] bg-[#331263]/75 shadow-[0_0_36px_rgba(168,55,255,.6)]"><Cog className="h-11 w-11 text-[#bd6cff]" /></motion.div>
          <motion.div animate={{ y: [0, 11, 0] }} transition={{ duration: 4.5, repeat: Infinity }} className="absolute bottom-5 right-3 z-10 flex h-20 w-20 items-center justify-center rounded-2xl border border-[#6b43ff] bg-[#15144b]/80 shadow-[0_0_30px_rgba(60,118,255,.52)]"><Wrench className="h-11 w-11 text-[#59bfff]" /></motion.div>
          <div className="relative ml-10 rounded-[1.7rem] border-4 border-[#763aff] bg-[#080d29] p-4 shadow-[0_0_55px_rgba(89,47,255,.55)] [transform:perspective(1000px)_rotateY(-5deg)_rotateX(3deg)]"><div className="rounded-xl border border-[#2363ea] bg-[#04071a] px-5 py-12 text-center shadow-[inset_0_0_40px_rgba(23,88,255,.18)]"><div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#16317b]/40 text-[#69d7ff] shadow-[0_0_28px_rgba(44,115,255,.65)]"><Wrench className="h-11 w-11" /></div><p className="mt-5 text-sm tracking-wide text-[#d4dcff]">SYSTEM UPDATE</p><div className="mt-4 h-4 overflow-hidden rounded-full border border-[#942cff] bg-[#150827]"><motion.div initial={{ width: 0 }} animate={{ width: "72%" }} transition={{ duration: 1.4 }} className="h-full rounded-full bg-gradient-to-r from-[#a42fff] to-[#18aaff] shadow-[0_0_20px_#3f8fff]" /></div><p className="mt-2 text-sm text-white/74">72%</p></div><div className="mx-auto h-4 w-[86%] rounded-b-2xl bg-gradient-to-r from-[#1b2060] via-[#6a2cd5] to-[#0e2f8c] shadow-[0_6px_18px_rgba(0,0,0,.7)]" /></div>
          <div className="absolute bottom-0 left-0 flex h-24 w-28 items-center justify-center rounded-[2rem] border-2 border-[#a94dff] bg-[#311060]/62 text-4xl text-[#d85bff] shadow-[0_0_30px_rgba(177,62,255,.5)]">!</div>
        </motion.div>
      </section>

      <section className="mt-7 rounded-2xl border border-[#3c3974]/70 bg-[#081025]/75 p-6 shadow-[0_0_40px_rgba(59,62,210,.12)] backdrop-blur-xl sm:p-8"><div className="flex items-center justify-center gap-4 text-xl font-bold"><span className="h-px w-10 bg-gradient-to-r from-transparent to-[#a756ff]" />Estimated Completion<span className="h-px w-10 bg-gradient-to-l from-transparent to-[#38baff]" /></div><div className="mt-8 grid gap-5 md:grid-cols-3">{completionItems.map(({ icon: Icon, title, sub }, index) => <div key={title} className={`flex items-center justify-center gap-5 ${index ? "md:border-l md:border-white/10" : ""}`}><div className="flex h-16 w-16 items-center justify-center rounded-full border border-[#744aff] bg-[#3c1970]/35 text-[#a55dff] shadow-[0_0_24px_rgba(110,65,255,.35)]"><Icon className="h-8 w-8" /></div><div><p className="text-lg font-bold">{title}</p><p className="mt-1 text-white/62">{sub}</p></div></div>)}</div></section>

      <section className="mt-6 rounded-2xl border border-[#3c3974]/70 bg-[#081025]/75 p-6 backdrop-blur-xl sm:p-8"><div className="relative grid grid-cols-2 gap-y-8 before:absolute before:left-[13%] before:right-[13%] before:top-8 before:h-0.5 before:bg-gradient-to-r before:from-[#a72fff] before:via-[#21b8ff] before:to-white/15 md:grid-cols-4">{steps.map(({ icon: Icon, ...step }) => <div key={step.label} className="relative z-10 text-center"><div className={`mx-auto flex h-16 w-16 items-center justify-center rounded-full border ${step.state === "current" ? "border-[#35c9ff] bg-[#163b87] text-[#6fe3ff] shadow-[0_0_26px_rgba(32,185,255,.65)]" : step.state === "done" ? "border-[#ad45ff] bg-[#7927d9] text-white" : "border-white/20 bg-[#0c1330] text-white/45"}`}><Icon className="h-7 w-7" /></div><p className="mt-4 font-bold">{step.label}</p><p className={`mt-1 text-sm ${step.state === "current" ? "text-[#50d9ff]" : step.state === "done" ? "text-[#cb65ff]" : "text-white/42"}`}>{step.status}</p></div>)}</div></section>

      <section className="mt-6 grid gap-6 md:grid-cols-2"><div className="rounded-2xl border border-[#3c3974]/70 bg-[#081025]/75 p-7 backdrop-blur-xl"><div className="flex gap-5"><div className="flex h-16 w-16 flex-none items-center justify-center rounded-full bg-[#5420a1]/45 text-[#c976ff] shadow-[0_0_22px_rgba(151,58,255,.38)]"><Bell className="h-8 w-8" /></div><div><h2 className="text-xl font-bold">Get Notified</h2><p className="mt-2 leading-6 text-white/65">We&apos;ll notify you when we&apos;re back online.</p></div></div><form onSubmit={notify} className="mt-6 flex overflow-hidden rounded-xl border border-[#58448d] bg-[#070d20]"><input required type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter your email address" className="min-w-0 flex-1 bg-transparent px-4 text-sm outline-none placeholder:text-white/45"/><button className="bg-gradient-to-r from-[#a82dff] to-[#0caaff] px-5 text-sm font-bold">{notified ? "Added!" : "Notify Me"}</button></form></div><div className="rounded-2xl border border-[#3c3974]/70 bg-[#081025]/75 p-7 backdrop-blur-xl"><h2 className="text-xl font-bold">Stay Connected</h2><p className="mt-3 max-w-sm leading-6 text-white/65">Follow us on social media for real-time updates.</p><div className="mt-6 flex gap-3">{[[Linkedin,"LinkedIn"],[Github,"GitHub"],[Instagram,"Instagram"],[X,"X"]].map(([Icon,label]) => <a key={String(label)} href="#" aria-label={String(label)} className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#4c3b89] bg-[#111735] text-white/80 transition hover:-translate-y-1 hover:border-[#7bd6ff] hover:text-[#79deff]"><Icon className="h-6 w-6" /></a>)}</div></div></section>
      <section className="mt-6 flex flex-col gap-6 rounded-2xl border border-[#3c3974]/70 bg-[#081025]/75 p-7 backdrop-blur-xl md:flex-row md:items-center"><div className="flex flex-1 gap-5"><div className="flex h-16 w-16 flex-none items-center justify-center rounded-full bg-[#5420a1]/45 text-[#c976ff]"><Headphones className="h-8 w-8" /></div><div><h2 className="text-xl font-bold">Need Immediate Help?</h2><p className="mt-2 max-w-sm leading-6 text-white/65">If you have an urgent query, our support team is here to help.</p></div></div><div className="flex flex-col gap-3 sm:flex-row"><Link href="/contact" className="inline-flex h-12 items-center justify-center gap-3 rounded-xl border border-[#208eff] bg-[#10316d]/35 px-5 font-bold"><Headphones className="h-5 w-5 text-[#66d6ff]"/>Contact Support</Link><a href="mailto:hello@kenoratech.com" className="inline-flex h-12 items-center justify-center gap-3 rounded-xl border border-[#9f36ff] bg-[#3a155d]/25 px-5 font-bold"><Mail className="h-5 w-5 text-[#c171ff]"/>Email Support</a></div></section>
    </main>
  </div>;
}
