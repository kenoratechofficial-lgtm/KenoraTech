"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BadgeDollarSign,
  CalendarDays,
  CircleUserRound,
  ClipboardList,
  BriefcaseBusiness,
  FolderKanban,
  Home,
  LogOut,
  MessageSquareText,
  ShieldCheck,
  Sparkles,
  Star,
  Users
} from "lucide-react";
import { cn } from "@/lib/utils";

const menuItems = [
  { label: "Dashboard", href: "/admin/dashboard", icon: Home },
  { label: "Contact Messages", href: "/admin/messages", icon: MessageSquareText },
  { label: "Bookings", href: "/admin/appointments", icon: CalendarDays },
  { label: "Portfolio Projects", href: "/admin/projects", icon: FolderKanban },
  { label: "Careers & Jobs", href: "/admin/jobs", icon: BriefcaseBusiness },
  { label: "Applications", href: "/admin/applications", icon: ClipboardList },
  { label: "Services", href: "/admin/services", icon: Sparkles },
  { label: "Team Members", href: "/admin/team", icon: Users },
  { label: "Testimonials", href: "/admin/testimonials", icon: Star },
  { label: "Pricing Plans", href: "/admin/pricing", icon: BadgeDollarSign },
  { label: "Admin Profile", href: "/admin/profile", icon: CircleUserRound }
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-40 hidden h-screen w-[292px] border-r border-white/[0.08] bg-[#070B16]/96 px-5 py-6 text-white shadow-[20px_0_70px_rgba(0,0,0,0.22)] backdrop-blur-2xl lg:block">
      <Link href="/admin/dashboard" className="flex items-center gap-3" aria-label="KenoraTech admin dashboard">
        <Image src="/kenora-tech-logo.png" alt="KenoraTech" width={46} height={46} className="h-11 w-11 rounded-md object-contain" />
        <div>
          <p className="text-xl font-black tracking-normal">
            Kenora<span className="text-[#8B5CF6]">Tech</span>
          </p>
          <p className="text-xs font-medium uppercase tracking-normal text-white/42">Admin Panel</p>
        </div>
      </Link>

      <nav className="mt-9 grid gap-1" aria-label="Admin navigation">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href || (item.href === "/admin/projects" && pathname.startsWith("/admin/projects"));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group flex h-11 items-center gap-3 rounded-2xl px-3 text-sm font-semibold text-white/62 transition hover:bg-white/[0.05] hover:text-white",
                active && "bg-[#8B5CF6]/18 text-white shadow-[0_0_24px_rgba(59,130,246,0.18)] ring-1 ring-[#8B5CF6]/28"
              )}
            >
              <Icon className={cn("h-5 w-5 text-white/42 transition group-hover:text-[#8EC5FF]", active && "text-[#8EC5FF]")} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="absolute bottom-6 left-5 right-5">
        <div className="rounded-[24px] border border-white/[0.08] bg-[#0D1323]/78 p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-[#8B5CF6] to-[#3B82F6]">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-bold">Super Admin</p>
              <p className="text-xs text-white/42">Full access</p>
            </div>
          </div>
          <button
            onClick={() => {
              window.localStorage.removeItem("kenora-admin-token");
              window.location.assign("/admin");
            }}
            className="mt-4 flex h-10 w-full items-center justify-center gap-2 rounded-2xl border border-white/[0.08] text-sm font-semibold text-white/68 transition hover:border-red-400/40 hover:text-red-200"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      </div>
    </aside>
  );
}
