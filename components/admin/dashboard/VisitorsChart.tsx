"use client";

import { motion } from "framer-motion";
import type { Application } from "@/lib/applications";

export function VisitorsChart({ applications }: { applications: Application[] }) {
  const days = Array.from({ length: 7 }, (_, index) => { const date = new Date(); date.setDate(date.getDate() - (6 - index)); const key = date.toISOString().slice(0, 10); return { day: date.toLocaleDateString("en", { weekday: "short" }), value: applications.filter(application => application.createdAt.slice(0, 10) === key).length }; });
  const max = Math.max(1, ...days.map(item => item.value));
  const points = days.map((item, index) => {
    const x = 48 + index * 82;
    const y = 250 - (item.value / max) * 190;
    return `${x},${y}`;
  });

  return (
    <div className="grid gap-5 xl:grid-cols-[1.45fr_0.55fr]">
      <motion.section
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="rounded-[24px] border border-white/[0.08] bg-[#0D1323]/82 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_18px_70px_rgba(0,0,0,0.22)] backdrop-blur-2xl"
      >
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-white">Application Overview</h2>
            <p className="mt-1 text-sm text-white/48">Applications received in the last 7 days</p>
          </div>
          <span className="rounded-full bg-[#3B82F6]/12 px-3 py-1 text-xs font-bold text-[#8EC5FF]">{applications.length} total</span>
        </div>
        <svg className="mt-6 h-[280px] w-full" viewBox="0 0 600 280" role="img" aria-label="Visitors line chart">
          <defs>
            <linearGradient id="visitorStroke" x1="0" x2="1">
              <stop stopColor="#8B5CF6" />
              <stop offset="1" stopColor="#3B82F6" />
            </linearGradient>
            <linearGradient id="visitorFill" x1="0" x2="0" y1="0" y2="1">
              <stop stopColor="#8B5CF6" stopOpacity=".34" />
              <stop offset="1" stopColor="#3B82F6" stopOpacity="0" />
            </linearGradient>
          </defs>
          {[70, 120, 170, 220].map((y) => (
            <line key={y} x1="36" y1={y} x2="570" y2={y} stroke="rgba(255,255,255,.08)" />
          ))}
          <motion.polyline
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            points={points.join(" ")}
            fill="none"
            stroke="url(#visitorStroke)"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <polygon points={`48,250 ${points.join(" ")} 540,250`} fill="url(#visitorFill)" />
          {days.map((item, index) => {
            const x = 48 + index * 82;
            const y = 250 - (item.value / max) * 190;
            return (
              <g key={item.day}>
                <circle cx={x} cy={y} r="5" fill="#050816" stroke="#8EC5FF" strokeWidth="3" />
                <text x={x} y="272" fill="rgba(255,255,255,.48)" fontSize="12" textAnchor="middle">
                  {item.day}
                </text>
              </g>
            );
          })}
        </svg>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.08, ease: "easeOut" }}
        className="rounded-[24px] border border-white/[0.08] bg-[#0D1323]/82 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_18px_70px_rgba(0,0,0,0.22)] backdrop-blur-2xl"
      >
        <h2 className="text-lg font-bold text-white">Application Status</h2>
        <p className="mt-1 text-sm text-white/48">Current hiring pipeline</p>
        <div className="mx-auto mt-8 grid h-44 w-44 place-items-center rounded-full bg-[conic-gradient(from_180deg,#8B5CF6_0_40%,#3B82F6_40%_70%,#22C55E_70%_100%)] shadow-[0_0_42px_rgba(139,92,246,0.22)]">
          <div className="grid h-28 w-28 place-items-center rounded-full bg-[#0D1323] text-center">
            <span className="text-2xl font-black">{applications.length}</span>
          </div>
        </div>
        <div className="mt-8 grid gap-3">
          {[["New", applications.filter(item => item.status === "New").length, "bg-[#8B5CF6]"], ["Shortlisted", applications.filter(item => item.status === "Shortlisted").length, "bg-[#3B82F6]"], ["Interview", applications.filter(item => item.status === "Interview").length, "bg-[#22C55E]"]].map(([label, value, color]) => (
            <div key={label} className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2 text-white/66">
                <span className={`h-2.5 w-2.5 rounded-full ${color}`} />
                {label}
              </span>
              <span className="font-bold text-white">{value}</span>
            </div>
          ))}
        </div>
      </motion.section>
    </div>
  );
}
