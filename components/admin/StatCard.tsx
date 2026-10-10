"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  label: string;
  value: number;
  change: string;
  icon: LucideIcon;
  index: number;
}

export function StatCard({ label, value, change, icon: Icon, index }: StatCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.06, ease: "easeOut" }}
      whileHover={{ y: -6 }}
      className="rounded-[24px] border border-white/[0.08] bg-[#0D1323]/86 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_18px_60px_rgba(0,0,0,0.2)] backdrop-blur-2xl"
    >
      <div className="flex items-center justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#8B5CF6]/22 to-[#3B82F6]/22 text-[#82C9FF] shadow-[0_0_26px_rgba(139,92,246,0.18)]">
          <Icon className="h-6 w-6" />
        </div>
        <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-bold text-emerald-300">
          {change}
        </span>
      </div>
      <p className="mt-5 text-sm text-white/56">{label}</p>
      <p className="mt-2 text-3xl font-black tracking-normal text-white">{value.toLocaleString("en-IN")}</p>
    </motion.article>
  );
}
