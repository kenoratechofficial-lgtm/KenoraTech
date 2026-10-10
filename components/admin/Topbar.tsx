"use client";

import Link from "next/link";
import { useState } from "react";
import { BadgeDollarSign, CalendarDays, CircleUserRound, FolderKanban, Home, Menu, MessageSquareText, Sparkles, Star, Users, X } from "lucide-react";

const mobileItems = [
  { label: "Dashboard", href: "/admin/dashboard", icon: Home }, { label: "Contact Messages", href: "/admin/messages", icon: MessageSquareText }, { label: "Portfolio Projects", href: "/admin/projects", icon: FolderKanban },
  { label: "Bookings", href: "/admin/appointments", icon: CalendarDays },
  { label: "Services", href: "/admin/services", icon: Sparkles }, { label: "Team Members", href: "/admin/team", icon: Users }, { label: "Testimonials", href: "/admin/testimonials", icon: Star },
  { label: "Pricing Plans", href: "/admin/pricing", icon: BadgeDollarSign }, { label: "Admin Profile", href: "/admin/profile", icon: CircleUserRound }
];

export function Topbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <header className="sticky top-0 z-30 border-b border-white/[0.08] bg-[#050816]/82 backdrop-blur-2xl">
      <div className="flex h-[76px] items-center justify-between gap-4 px-4 md:px-8">
        <div className="flex items-center gap-3 lg:hidden">
          <button onClick={() => setMenuOpen(true)} aria-label="Open admin navigation" className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/[0.08] bg-[#0D1323] text-white">
            <Menu className="h-5 w-5" />
          </button>
          <p className="text-lg font-black text-white">KenoraTech</p>
        </div>
      </div>
      {menuOpen ? <div className="absolute left-0 top-0 z-50 h-[100dvh] w-screen lg:hidden"><button onClick={() => setMenuOpen(false)} aria-label="Close navigation" className="absolute inset-0 bg-black/65" /><nav className="relative flex h-[100dvh] w-[min(18rem,86vw)] flex-col overflow-y-auto border-r border-white/[0.08] bg-[#070B16] p-5 shadow-2xl"><div className="mb-8 flex items-center justify-between border-b border-white/[0.08] pb-5"><div><p className="text-xl font-black">Kenora<span className="text-[#8B5CF6]">Tech</span></p><p className="mt-1 text-xs font-medium uppercase text-white/42">Admin Panel</p></div><button onClick={() => setMenuOpen(false)} aria-label="Close navigation" className="rounded-xl p-2 text-white/65"><X className="h-5 w-5" /></button></div><div className="grid gap-1">{mobileItems.map((item) => { const Icon = item.icon; return <Link key={item.href} href={item.href} onClick={() => setMenuOpen(false)} className="flex h-11 items-center gap-3 rounded-xl px-3 text-sm font-semibold text-white/70 transition hover:bg-white/[0.06] hover:text-white"><Icon className="h-5 w-5 text-[#8EC5FF]" />{item.label}</Link>; })}</div></nav></div> : null}
    </header>
  );
}
