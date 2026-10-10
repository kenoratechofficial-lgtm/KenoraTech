"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight, BriefcaseBusiness, Check, ChevronDown, Clock3, Code2, HeartHandshake,
  Lightbulb, MapPin, Search, Send, Sparkles, UsersRound, X
} from "lucide-react";
import { FormEvent, useEffect, useMemo, useState } from "react";
import type { Job } from "@/lib/jobs";
import careersImage from "@/assets/careers.png";

const defaultJobs: Omit<Job, "id" | "createdAt" | "published">[] = [
  { title: "Frontend Developer", department: "Engineering", location: "Remote", type: "Full-time", experience: "2-4 years", salary: "₹5L - ₹9L", skills: ["React", "Next.js", "TypeScript"], description: "Create polished, high-performance interfaces for ambitious digital products." },
  { title: "UI/UX Designer", department: "Design", location: "Valsad, Gujarat", type: "Full-time", experience: "1-3 years", salary: "₹4L - ₹7L", skills: ["Figma", "Research", "Prototyping"], description: "Turn complex workflows into effortless, memorable product experiences." },
  { title: "Node.js Developer", department: "Engineering", location: "Hybrid", type: "Full-time", experience: "2-5 years", salary: "₹6L - ₹10L", skills: ["Node.js", "MongoDB", "APIs"], description: "Build robust backend services and integrations that scale with our clients." }
];

const reasons = [
  [Lightbulb, "Build work that matters", "Shape products that solve real business problems and make a clear impact."],
  [UsersRound, "A team that has your back", "Work with kind, curious people who share ideas and celebrate progress."],
  [Sparkles, "Room to grow", "Take ownership, learn fast and grow your craft with meaningful challenges."],
  [HeartHandshake, "Life-first flexibility", "A flexible, focused culture built around trust, clarity and sustainable pace."]
] as const;

const process = ["Apply online", "Initial conversation", "Skills conversation", "Welcome to KenoraTech"];
const faqs = [
  ["Can I apply if I do not meet every requirement?", "Absolutely. If the role excites you and you can demonstrate strong potential, we would love to hear from you."],
  ["Do you offer remote opportunities?", "Yes. Role location is shown on each opening and we support remote and hybrid collaboration where the role allows it."],
  ["What happens after I apply?", "Our team reviews every application. If there is a match, we will reach out to schedule a short introductory conversation."],
];

export function CareersPage() {
  const [jobs, setJobs] = useState(defaultJobs);
  const [query, setQuery] = useState("");
  const [department, setDepartment] = useState("All departments");
  const [selectedJob, setSelectedJob] = useState<(typeof defaultJobs)[number] | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [submitted, setSubmitted] = useState(false);
  const visibleJobs = useMemo(() => jobs.filter((job) => {
    const haystack = `${job.title} ${job.department} ${job.location} ${job.skills.join(" ")}`.toLowerCase();
    return haystack.includes(query.toLowerCase()) && (department === "All departments" || job.department === department);
  }), [query, department, jobs]);

  useEffect(() => { void (async () => { const response = await fetch("/api/jobs", { cache: "no-store" }); const body = await response.json().catch(() => null); if (response.ok && Array.isArray(body?.jobs)) setJobs(body.jobs); })(); }, []);

  async function submitApplication(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const fields = event.currentTarget.querySelectorAll<HTMLInputElement>("input");
    const message = event.currentTarget.querySelector("textarea")?.value || "";
    const resume = fields[5]?.files?.[0];
    const payload = new FormData();
    payload.append("jobTitle", selectedJob?.title || ""); payload.append("fullName", fields[0]?.value || ""); payload.append("email", fields[1]?.value || ""); payload.append("phone", fields[2]?.value || ""); payload.append("location", fields[3]?.value || ""); payload.append("profileUrl", fields[4]?.value || ""); payload.append("coverLetter", message);
    if (resume) payload.append("resume", resume);
    const response = await fetch("/api/applications", { method: "POST", body: payload });
    if (response.ok) {
      setSubmitted(true);
    } else {
      const body = await response.json().catch(() => null);
      window.alert(body?.error || "Your application could not be submitted. Please try again.");
    }
  }

  return <div className="overflow-hidden bg-[#030711] text-white">
    <section className="relative isolate min-h-[660px] border-b border-white/10">
      <Image src={careersImage} alt="KenoraTech team collaborating in a futuristic studio" priority className="absolute inset-0 -z-20 h-full w-full object-cover object-center" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,#02040ef2_0%,#030711d9_42%,#0307117a_72%,#030711c7_100%)]" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_22%_42%,rgba(126,48,255,.26),transparent_26rem)]" />
      <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7 }} className="container flex min-h-[660px] items-center py-24">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#a66aff]/65 bg-[#190a38]/70 px-4 py-2 text-xs font-bold uppercase tracking-[.18em] text-[#d9a9ff] shadow-[0_0_26px_rgba(139,54,255,.3)]"><Sparkles className="h-4 w-4" /> Careers at KenoraTech</span>
          <h1 className="mt-7 text-5xl font-black leading-[1.05] sm:text-6xl lg:text-7xl">Create what&apos;s <span className="bg-gradient-to-r from-[#e095ff] via-[#9b48ff] to-[#42caff] bg-clip-text text-transparent">next.</span></h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-white/76">Join a team of designers, developers and thinkers shaping intelligent digital experiences for businesses ready to grow.</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a href="#open-roles" className="inline-flex h-13 items-center justify-center gap-3 rounded-lg bg-gradient-to-r from-[#9227ff] to-[#169eff] px-6 py-3.5 text-sm font-bold shadow-[0_0_32px_rgba(64,99,255,.42)] transition hover:scale-[1.02]">View open positions <ArrowRight className="h-5 w-5" /></a>
            <a href="#life" className="inline-flex h-13 items-center justify-center rounded-lg border border-white/25 bg-white/10 px-6 py-3.5 text-sm font-bold text-white/90 backdrop-blur transition hover:bg-white/18">Life at KenoraTech</a>
          </div>
        </div>
      </motion.div>
    </section>

    <section className="bg-[#060b19] py-24"><div className="container"><div className="max-w-2xl"><p className="text-sm font-bold uppercase tracking-[.18em] text-[#a96aff]">Why join us</p><h2 className="mt-3 text-4xl font-black sm:text-5xl">Do your best work, with people who care.</h2></div><div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">{reasons.map(([Icon, title, text], index) => <motion.article key={title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * .08 }} className="rounded-2xl border border-[#29345a] bg-gradient-to-b from-[#0b1530] to-[#070c1d] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,.06)]"><div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#8735ff] to-[#1ab8ff] shadow-[0_0_24px_rgba(105,69,255,.32)]"><Icon className="h-6 w-6" /></div><h3 className="mt-6 text-xl font-bold">{title}</h3><p className="mt-3 text-sm leading-6 text-white/66">{text}</p></motion.article>)}</div></div></section>

    <section id="open-roles" className="relative bg-[#030711] py-24"><div className="container"><div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end"><div><p className="text-sm font-bold uppercase tracking-[.18em] text-[#49caff]">Open positions</p><h2 className="mt-3 text-4xl font-black sm:text-5xl">Find your next challenge.</h2><p className="mt-4 text-white/65">Explore opportunities to make an impact from day one.</p></div><span className="text-sm text-white/55">{visibleJobs.length} open roles</span></div><div className="mt-10 grid gap-3 rounded-2xl border border-white/10 bg-[#091023] p-3 md:grid-cols-[1fr_220px]"><label className="flex h-12 items-center gap-3 rounded-xl bg-[#050914] px-4 text-white/55"><Search className="h-5 w-5"/><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search roles, skills or keywords" className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/38" /></label><select aria-label="Filter by department" value={department} onChange={(event) => setDepartment(event.target.value)} className="h-12 rounded-xl border border-white/10 bg-[#050914] px-4 text-sm text-white outline-none"><option>All departments</option><option>Engineering</option><option>Design</option></select></div><div className="mt-5 grid gap-4">{visibleJobs.map((job, index) => <motion.article key={job.title} initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * .08 }} className="rounded-2xl border border-[#28355a] bg-[#080f20] p-6 transition hover:border-[#7142ff] hover:shadow-[0_0_35px_rgba(72,68,255,.16)]"><div className="flex flex-col gap-6 lg:flex-row lg:items-center"><div className="flex min-w-0 flex-1 gap-4"><div className="flex h-12 w-12 flex-none items-center justify-center rounded-xl bg-[#17214a] text-[#6edcff]"><Code2 className="h-6 w-6" /></div><div><h3 className="text-xl font-bold">{job.title}</h3><div className="mt-2 flex flex-wrap gap-x-4 gap-y-2 text-sm text-white/56"><span className="flex items-center gap-1.5"><BriefcaseBusiness className="h-4 w-4" />{job.department}</span><span className="flex items-center gap-1.5"><MapPin className="h-4 w-4" />{job.location}</span><span className="flex items-center gap-1.5"><Clock3 className="h-4 w-4" />{job.experience}</span></div></div></div><div className="flex flex-wrap gap-2">{job.skills.map(skill => <span key={skill} className="rounded-full border border-[#8e55ff]/45 bg-[#5b2db3]/15 px-3 py-1 text-xs font-semibold text-[#d6baff]">{skill}</span>)}</div><button onClick={() => { setSelectedJob(job); setSubmitted(false); }} className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#8326f6] to-[#168ff5] px-5 text-sm font-bold transition hover:scale-[1.02]">Apply now <ArrowRight className="h-4 w-4" /></button></div><p className="mt-5 border-t border-white/8 pt-5 text-sm leading-6 text-white/63">{job.description} <span className="ml-2 font-semibold text-[#68d5ff]">{job.type} · {job.salary}</span></p></motion.article>)}</div></div></section>

    <section className="border-y border-white/8 bg-[#070d1e] py-24"><div className="container"><div className="text-center"><p className="text-sm font-bold uppercase tracking-[.18em] text-[#ad73ff]">Hiring process</p><h2 className="mt-3 text-4xl font-black sm:text-5xl">Clear, thoughtful, human.</h2></div><div className="relative mt-14 grid gap-8 md:grid-cols-4">{process.map((item, index) => <div key={item} className="relative text-center"><div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-[#9e61ff] bg-[#0f1430] text-xl font-black text-[#75ddff] shadow-[0_0_24px_rgba(112,73,255,.3)]">0{index + 1}</div><h3 className="mt-5 font-bold">{item}</h3><p className="mt-2 text-sm leading-6 text-white/55">{index === 0 ? "Tell us what inspires you." : index === 3 ? "Start creating meaningful work." : "A transparent two-way conversation."}</p></div>)}</div></div></section>

    <section id="life" className="bg-[#030711] py-24"><div className="container grid gap-10 lg:grid-cols-[.83fr_1.17fr] lg:items-center"><div><p className="text-sm font-bold uppercase tracking-[.18em] text-[#4ed5ff]">Life at KenoraTech</p><h2 className="mt-3 text-4xl font-black sm:text-5xl">Curious minds.<br />Great energy.</h2><p className="mt-6 max-w-md leading-8 text-white/65">We take the craft seriously, but never ourselves too seriously. You will find focused collaboration, honest feedback and space to explore new ideas.</p><div className="mt-7 flex gap-6 text-sm"><span><b className="block text-2xl text-[#b776ff]">01</b><span className="text-white/55">shared purpose</span></span><span><b className="block text-2xl text-[#5bd9ff]">∞</b><span className="text-white/55">curiosity</span></span></div></div><div className="relative"><div className="absolute -inset-2 rounded-[1.5rem] bg-gradient-to-r from-[#7d2dff]/35 to-[#15adff]/20 blur-xl"/><Image src={careersImage} alt="A creative KenoraTech workspace" className="relative aspect-[16/10] w-full rounded-2xl border border-[#7048ff]/50 object-cover shadow-2xl"/></div></div></section>

    <section className="bg-[#060b19] py-24"><div className="container max-w-3xl"><div className="text-center"><p className="text-sm font-bold uppercase tracking-[.18em] text-[#a96aff]">FAQ</p><h2 className="mt-3 text-4xl font-black">Questions, answered.</h2></div><div className="mt-10 grid gap-3">{faqs.map(([question, answer], index) => <div key={question} className="rounded-xl border border-white/10 bg-[#091023]"><button onClick={() => setOpenFaq(openFaq === index ? null : index)} className="flex w-full items-center justify-between gap-5 px-5 py-5 text-left font-bold"><span>{question}</span><ChevronDown className={`h-5 w-5 flex-none text-[#8ddfff] transition ${openFaq === index ? "rotate-180" : ""}`} /></button><AnimatePresence>{openFaq === index && <motion.p initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden px-5 pb-5 text-sm leading-7 text-white/63">{answer}</motion.p>}</AnimatePresence></div>)}</div></div></section>

    <section className="relative overflow-hidden bg-gradient-to-r from-[#251059] via-[#112d6e] to-[#075583] py-20 text-center"><div className="absolute inset-0 opacity-60 [background-image:radial-gradient(rgba(255,255,255,.18)_1px,transparent_1px)] [background-size:20px_20px]"/><div className="container relative"><h2 className="text-4xl font-black sm:text-5xl">Ready to create what&apos;s next?</h2><p className="mx-auto mt-4 max-w-xl text-white/75">Bring your perspective, curiosity and drive. We&apos;ll make space for you to do remarkable work.</p><a href="#open-roles" className="mt-8 inline-flex items-center gap-3 rounded-lg bg-white px-6 py-3.5 text-sm font-bold text-[#162463] shadow-xl">Explore opportunities <ArrowRight className="h-5 w-5" /></a></div></section>

    <AnimatePresence>{selectedJob && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[70] flex items-center justify-center bg-[#02040d]/85 p-4 backdrop-blur-sm"><motion.div initial={{ y: 24, scale: .98 }} animate={{ y: 0, scale: 1 }} exit={{ y: 24, scale: .98 }} className="relative max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl border border-[#6d45d7] bg-[#0a1123] p-6 shadow-[0_0_70px_rgba(99,65,255,.3)]"><button onClick={() => setSelectedJob(null)} aria-label="Close application form" className="absolute right-5 top-5 text-white/65 hover:text-white"><X /></button>{submitted ? <div className="py-14 text-center"><div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#143d61] text-[#6be2ff]"><Check className="h-8 w-8" /></div><h2 className="mt-6 text-2xl font-black">Application received!</h2><p className="mt-3 text-white/65">Thanks for your interest in {selectedJob.title}. Our team will be in touch soon.</p><button onClick={() => setSelectedJob(null)} className="mt-7 rounded-lg bg-white px-5 py-3 text-sm font-bold text-[#101b42]">Done</button></div> : <><p className="text-sm font-semibold text-[#a777ff]">Apply for</p><h2 className="mt-1 text-2xl font-black">{selectedJob.title}</h2><form onSubmit={submitApplication} className="mt-6 grid gap-4"><div className="grid gap-4 sm:grid-cols-2"><Input label="Full name" required /><Input label="Email address" type="email" required /></div><div className="grid gap-4 sm:grid-cols-2"><Input label="Phone number" /><Input label="Current location" /></div><Input label="LinkedIn or portfolio URL" type="url" /><label className="grid gap-2 text-sm font-semibold">Cover letter<textarea required rows={4} className="rounded-lg border border-white/12 bg-[#050914] p-3 text-sm font-normal text-white outline-none focus:border-[#7796ff]" placeholder="Tell us why you would be a great fit." /></label><label className="grid gap-2 text-sm font-semibold">Resume <input required type="file" accept=".pdf,.doc,.docx" className="rounded-lg border border-dashed border-white/22 bg-[#050914] p-3 text-sm font-normal text-white/65 file:mr-3 file:rounded file:border-0 file:bg-[#263a79] file:px-3 file:py-1.5 file:text-white" /></label><label className="flex gap-2 text-xs text-white/65"><input required type="checkbox" className="mt-0.5 accent-[#8f45ff]" />I agree to the Privacy Policy and the processing of my application.</label><button className="mt-1 inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#8325fb] to-[#159cf6] px-5 py-3.5 text-sm font-bold"><Send className="h-4 w-4" />Submit application</button></form></>}</motion.div></motion.div>}</AnimatePresence>
  </div>;
}

function Input({ label, type = "text", required = false }: { label: string; type?: string; required?: boolean }) {
  return <label className="grid gap-2 text-sm font-semibold">{label}<input required={required} type={type} className="h-11 rounded-lg border border-white/12 bg-[#050914] px-3 text-sm font-normal text-white outline-none focus:border-[#7796ff]" /></label>;
}
