"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import type { PricingPlan } from "@/components/pricing/pricing-data";

interface PricingCardProps {
  plan: PricingPlan;
  index: number;
}

function formatInr(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(value);
}

export function PricingCard({ plan, index }: PricingCardProps) {
  const Icon = plan.icon;

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-90px" }}
      transition={{ duration: 0.48, delay: index * 0.08, ease: "easeOut" }}
      whileHover={{ y: -10 }}
      className={[
        "group relative flex min-h-[610px] flex-col overflow-hidden rounded-3xl border bg-[#071020]/78 p-6 text-white backdrop-blur-2xl transition duration-500",
        "border-white/[0.08] shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_20px_70px_rgba(0,0,0,0.22)] hover:border-[#1aa8ff]/75 hover:shadow-[0_0_52px_rgba(139,49,255,0.34)]",
        plan.popular ? "border-[#266cff]/60 shadow-[0_0_44px_rgba(139,31,255,0.27)]" : ""
      ].join(" ")}
    >
      <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_8%,rgba(0,168,255,0.2),transparent_10rem),radial-gradient(circle_at_10%_0%,rgba(139,28,255,0.22),transparent_13rem)]" />
      </div>
      {plan.popular ? (
        <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-r from-[#941cff]/45 via-transparent to-[#0ba8ff]/45 p-px opacity-80">
          <div className="h-full w-full rounded-3xl bg-transparent" />
        </div>
      ) : null}
      <div className="relative z-10 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-normal">{plan.name}</h2>
          <p className="mt-2 text-sm text-white/72">{plan.description}</p>
        </div>
        <Icon className="h-10 w-10 shrink-0 text-[#9b42ff] drop-shadow-[0_0_14px_rgba(155,66,255,0.55)]" />
      </div>
      {plan.popular ? (
        <span className="relative z-10 mx-auto mt-[-1.75rem] rounded-full bg-gradient-to-r from-[#8c1cff] to-[#1aa8ff] px-4 py-1.5 text-[11px] font-black uppercase text-white shadow-[0_0_24px_rgba(139,92,246,0.42)]">
          Most Popular
        </span>
      ) : null}
      <div className="relative z-10 mt-8">
        {plan.offerPrice && plan.originalPrice ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.18 + index * 0.08 }}
          >
            <span className="text-lg font-semibold text-white/45 line-through decoration-[#7f1d1d] decoration-2">{formatInr(plan.originalPrice)}</span>
            <span className="ml-3 inline-flex rounded-full bg-gradient-to-r from-[#8c1cff] to-[#1aa8ff] px-2.5 py-1 text-[10px] font-black text-white shadow-[0_0_16px_rgba(74,116,255,0.36)]">
              40% OFF
            </span>
            <div className="mt-3 flex items-end gap-2">
              <span className="text-[40px] font-black leading-none tracking-normal text-white">{formatInr(plan.offerPrice)}</span>
              <span className="pb-1 text-sm text-white/72">{plan.unit || "/project"}</span>
            </div>
          </motion.div>
        ) : (
          <span className="bg-gradient-to-r from-[#8c1cff] to-[#1aa8ff] bg-clip-text text-[40px] font-black leading-none text-transparent">
            {plan.priceLabel}
          </span>
        )}
        <p className="mt-5 min-h-[56px] text-sm leading-7 text-white/70">{plan.subtext}</p>
      </div>
      <ul className="relative z-10 mt-7 grid gap-4">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-center gap-3 text-sm text-white/82">
            <CheckCircle2 className="h-4 w-4 shrink-0 text-[#9b42ff]" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <div className="relative z-10 mt-auto pt-9">
        <Link
          href="/contact"
          className={[
            "inline-flex h-12 w-full items-center justify-center rounded-lg border text-sm font-bold transition hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(48,151,255,0.42)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1aa8ff]",
            plan.popular
              ? "border-transparent bg-gradient-to-r from-[#8c1cff] to-[#0da8ff] text-white shadow-[0_0_30px_rgba(13,168,255,0.26)]"
              : "border-white/16 bg-transparent text-[#d061ff] hover:border-[#1aa8ff]/60 hover:text-white"
          ].join(" ")}
        >
          {plan.cta}
        </Link>
      </div>
    </motion.article>
  );
}
