"use client";

import { motion } from "framer-motion";

interface PricingToggleProps {
  billingCycle: "monthly" | "yearly";
  onChange: (cycle: "monthly" | "yearly") => void;
}

export function PricingToggle({ billingCycle, onChange }: PricingToggleProps) {
  return (
    <div className="inline-flex items-center rounded-full border border-white/12 bg-[#070d1b]/80 p-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_0_32px_rgba(139,92,246,0.16)] backdrop-blur-xl">
      {(["monthly", "yearly"] as const).map((cycle) => {
        const selected = billingCycle === cycle;

        return (
          <button
            key={cycle}
            type="button"
            aria-pressed={selected}
            onClick={() => onChange(cycle)}
            className="relative min-h-10 rounded-full px-6 text-sm font-semibold text-white transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1aa8ff]"
          >
            {selected ? (
              <motion.span
                layoutId="pricing-toggle-active"
                className="absolute inset-0 rounded-full bg-[#111a34] shadow-[0_0_24px_rgba(139,92,246,0.42)]"
                transition={{ type: "spring", stiffness: 360, damping: 32 }}
              />
            ) : null}
            <span className="relative z-10 inline-flex items-center gap-2">
              {cycle === "monthly" ? "Monthly" : "Yearly"}
              {cycle === "yearly" ? (
                <span className="rounded-full bg-[#63c458]/20 px-2 py-0.5 text-[11px] font-bold text-[#a8ff9a]">
                  Save 20%
                </span>
              ) : null}
            </span>
          </button>
        );
      })}
    </div>
  );
}
