"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, BriefcaseBusiness, Code2, Home, Mail, Search, Send, Sparkles, UserRoundSearch } from "lucide-react";
import { FormEvent, useState } from "react";
import background from "@/assets/error_page.png";

const destinations = [
  { title: "Home", description: "Return to the KenoraTech home page.", href: "/", icon: Home },
  { title: "Services", description: "Explore our digital capabilities.", href: "/services", icon: Code2 },
  { title: "Portfolio", description: "See work built for growing brands.", href: "/portfolio", icon: Sparkles },
  { title: "Careers", description: "Find your next opportunity.", href: "/careers", icon: BriefcaseBusiness },
  { title: "Contact", description: "Talk with the KenoraTech team.", href: "/contact", icon: Mail }
];

export function NotFoundExperience() {
  const [term, setTerm] = useState("");
  function search(event: FormEvent) { event.preventDefault(); if (term.trim()) window.location.assign(`/services?search=${encodeURIComponent(term.trim())}`); }
  return <div className="relative isolate overflow-hidden bg-[#030711] text-white">
    <Image src={background} alt="" priority fill className="-z-30 object-cover object-center" />
    <div className="absolute inset-0 -z-20 bg-[linear-gradient(180deg,rgba(3,7,17,.1),#030711_69%,#030711)]" />
    <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_50%_31%,rgba(67,85,255,.18),transparent_21rem)]" />
    <motion.div animate={{ y: [0, -12, 0], rotate: [0, 4, 0] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} className="pointer-events-none absolute left-[11%] top-32 hidden h-16 w-16 rotate-12 rounded-xl border border-[#b65bff]/60 bg-[#731dff]/15 shadow-[0_0_42px_rgba(156,54,255,.72)] md:block" />
    <motion.div animate={{ y: [0, 18, 0], rotate: [0, -9, 0] }} transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }} className="pointer-events-none absolute right-[12%] top-56 hidden h-12 w-12 rotate-45 border border-[#4bd6ff]/70 bg-[#137aff]/15 shadow-[0_0_36px_rgba(21,145,255,.65)] md:block" />

    <section className="container flex min-h-[690px] flex-col items-center justify-center py-24 text-center">
      <motion.div initial={{ opacity: 0, scale: .88 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .65 }} className="relative">
        <div className="absolute inset-x-10 top-1/2 h-20 -translate-y-1/2 rounded-full bg-[#7f35ff]/45 blur-3xl" />
        <p className="relative bg-gradient-to-r from-[#d88aff] via-[#9a4bff] to-[#4ee1ff] bg-clip-text text-[8rem] font-black leading-none tracking-[-.08em] text-transparent drop-shadow-[0_0_24px_rgba(116,77,255,.75)] sm:text-[12rem]">404</p>
      </motion.div>
      <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .15, duration: .6 }} className="max-w-2xl">
        <span className="inline-flex items-center gap-2 rounded-full border border-[#a873ff]/40 bg-[#3d176d]/20 px-4 py-2 text-xs font-bold uppercase tracking-[.18em] text-[#d8b9ff] backdrop-blur"><UserRoundSearch className="h-4 w-4" /> Signal lost</span>
        <h1 className="mt-6 text-4xl font-black tracking-tight sm:text-6xl">Oops! Page Not Found</h1>
        <p className="mx-auto mt-5 max-w-xl text-base leading-8 text-white/66 sm:text-lg">The page you&apos;re looking for may have moved, changed its address, or never existed in this corner of the universe.</p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row"><Link href="/" className="inline-flex h-12 items-center justify-center gap-3 rounded-lg bg-gradient-to-r from-[#8c1cff] to-[#19a8ff] px-6 text-sm font-bold shadow-[0_0_35px_rgba(74,113,255,.42)] transition hover:scale-[1.02]">Return Home <ArrowRight className="h-5 w-5" /></Link><button onClick={() => window.history.back()} className="inline-flex h-12 items-center justify-center gap-3 rounded-lg border border-white/20 bg-white/[.07] px-6 text-sm font-bold text-white/88 backdrop-blur transition hover:bg-white/[.12]"><ArrowLeft className="h-5 w-5" /> Go Back</button></div>
      </motion.div>
    </section>

    <section className="container pb-24"><div className="rounded-[1.8rem] border border-white/[.11] bg-[#091126]/72 p-5 shadow-[0_0_55px_rgba(52,83,255,.13),inset_0_1px_0_rgba(255,255,255,.08)] backdrop-blur-xl sm:p-8"><div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="text-sm font-bold uppercase tracking-[.16em] text-[#75ddff]">Explore more</p><h2 className="mt-2 text-3xl font-black">Find your way back.</h2></div><p className="max-w-sm text-sm leading-6 text-white/56">A few useful places to continue your KenoraTech journey.</p></div><div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">{destinations.map(({ icon: Icon, ...item }, index) => <motion.div key={item.title} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * .06 }}><Link href={item.href} className="group block h-full rounded-2xl border border-white/[.09] bg-[#060b1a]/72 p-5 transition duration-300 hover:-translate-y-1 hover:border-[#7b54ff]/70 hover:shadow-[0_0_30px_rgba(98,70,255,.25)]"><div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#8435ff] to-[#139fff] shadow-[0_0_20px_rgba(86,93,255,.3)]"><Icon className="h-5 w-5" /></div><h3 className="mt-5 font-bold">{item.title}</h3><p className="mt-2 text-sm leading-6 text-white/53">{item.description}</p></Link></motion.div>)}</div></div>
      <form onSubmit={search} className="mx-auto mt-9 flex max-w-2xl rounded-2xl border border-[#7f63ff]/30 bg-[#071024]/76 p-2 shadow-[0_0_45px_rgba(72,92,255,.18)] backdrop-blur-xl"><Search className="ml-3 mt-3.5 h-5 w-5 flex-none text-[#7fe1ff]" /><label className="sr-only" htmlFor="not-found-search">Search KenoraTech</label><input id="not-found-search" value={term} onChange={event => setTerm(event.target.value)} placeholder="What are you looking for?" className="min-w-0 flex-1 bg-transparent px-3 text-sm text-white outline-none placeholder:text-white/37" /><button className="inline-flex h-11 items-center gap-2 rounded-xl bg-gradient-to-r from-[#8125f2] to-[#168fff] px-4 text-sm font-bold">Search <Send className="h-4 w-4" /></button></form><p className="mt-3 text-center text-xs text-white/38">Press Enter to search</p>
    </section>

    <section className="container pb-24"><div className="relative overflow-hidden rounded-[2rem] border border-[#6d61ff]/35 bg-[#0a1430]/76 px-6 py-12 text-center shadow-[0_0_54px_rgba(45,99,255,.18)] backdrop-blur-xl sm:px-12"><div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(121,67,255,.26),transparent_20rem)]" /><div className="relative"><h2 className="text-3xl font-black sm:text-4xl">Still can&apos;t find what you&apos;re looking for?</h2><p className="mx-auto mt-4 max-w-xl leading-7 text-white/65">Our team is here to help you find the right service, answer a question, or point you in the right direction.</p><div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row"><Link href="/contact" className="inline-flex h-12 items-center justify-center gap-3 rounded-lg bg-gradient-to-r from-[#8c1cff] to-[#19a8ff] px-6 text-sm font-bold">Contact Us <ArrowRight className="h-5 w-5" /></Link><a href="mailto:hello@kenoratech.com" className="inline-flex h-12 items-center justify-center gap-3 rounded-lg border border-white/20 bg-white/[.07] px-6 text-sm font-bold text-white/88"><Mail className="h-5 w-5 text-[#6de4ff]" /> Email Support</a></div></div></div></section>
  </div>;
}
