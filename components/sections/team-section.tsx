"use client";

import Image from "next/image";
import { Github, Linkedin, Mail } from "lucide-react";
import { useEffect, useState } from "react";
import { SectionHeading } from "@/components/section-heading";

type TeamMember = { id: string; title: string; designation?: string; description: string; imageId?: string; linkedinUrl?: string; githubUrl?: string; email?: string };
const initials = (name: string) => name.split(/\s+/).map((part) => part[0]).join("").slice(0, 2).toUpperCase();

export function TeamSection() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  useEffect(() => { void fetch("/api/admin/content/team", { cache: "no-store" }).then((response) => response.json()).then((body) => setMembers(Array.isArray(body?.items) ? body.items : [])).catch(() => setMembers([])); }, []);
  if (!members.length) return null;
  return <section className="relative overflow-hidden bg-[#030711] py-20 text-white"><div className="pointer-events-none absolute inset-0 opacity-40 [background:radial-gradient(circle_at_16%_52%,rgba(22,110,255,.2),transparent_20rem),radial-gradient(circle_at_84%_46%,rgba(153,48,255,.2),transparent_23rem)]" /><div className="container relative"><SectionHeading eyebrow="Our Team" title="The people behind Kenora Tech." description="A focused team that brings strategy, design and engineering together for every project." /><div className="mx-auto mt-14 grid max-w-5xl gap-12 sm:grid-cols-2 lg:grid-cols-3">{members.map((member) => <article key={member.id} className="text-center"><div className="relative mx-auto grid h-48 w-48 place-items-center rounded-full bg-gradient-to-br from-[#21b8ff] via-[#7353ff] to-[#c144ff] p-[2px] shadow-[0_0_34px_rgba(99,90,255,.32)] sm:h-56 sm:w-56"><div className="relative h-full w-full overflow-hidden rounded-full border-4 border-[#030711] bg-[#111a39]">{member.imageId ? <Image src={`/api/team-image/${member.imageId}`} alt={member.title} width={480} height={480} sizes="(max-width: 640px) 192px, 224px" className="h-full w-full object-cover object-center" /> : <span className="grid h-full w-full place-items-center bg-[radial-gradient(circle_at_30%_25%,#356eff,#111a39_55%,#6c2dbd)] text-4xl font-black tracking-tight text-white">{initials(member.title)}</span>}</div></div><h3 className="mt-6 text-2xl font-bold">{member.title}</h3><p className="mt-1 bg-gradient-to-r from-[#2bbcff] to-[#ad58ff] bg-clip-text text-base font-semibold text-transparent">{member.designation || "Team Member"}</p><p className="mx-auto mt-5 max-w-xs text-sm leading-7 text-white/65">{member.description}</p><div className="mt-5 flex justify-center gap-3">{member.linkedinUrl ? <a href={member.linkedinUrl} target="_blank" rel="noreferrer" aria-label={`${member.title} on LinkedIn`} className="team-social"><Linkedin /></a> : null}{member.githubUrl ? <a href={member.githubUrl} target="_blank" rel="noreferrer" aria-label={`${member.title} on GitHub`} className="team-social"><Github /></a> : null}{member.email ? <a href={`mailto:${member.email}`} aria-label={`Email ${member.title}`} className="team-social"><Mail /></a> : null}</div></article>)}</div></div></section>;
}
