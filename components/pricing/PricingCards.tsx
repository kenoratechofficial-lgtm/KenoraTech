"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { PricingCard } from "@/components/pricing/PricingCard";
import { pricingPlans } from "@/components/pricing/pricing-data";

export function PricingCards() {
  const [plans, setPlans] = useState(pricingPlans);

  useEffect(() => {
    void fetch("/api/pricing", { cache: "no-store" })
      .then((response) => response.json())
      .then((body) => {
        if (!Array.isArray(body?.plans)) return;
        setPlans(pricingPlans.map((plan) => ({ ...plan, ...body.plans.find((item: { name: string }) => item.name === plan.name) })));
      })
      .catch(() => undefined);
  }, []);

  return (
    <section className="container relative z-10 pb-5">
      <motion.div
        initial={{ opacity: 0, y: -18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="mb-8 text-center"
      >
        <div className="inline-flex rounded-full bg-gradient-to-r from-[#8c1cff] to-[#1aa8ff] px-5 py-2 text-sm font-bold text-white shadow-[0_0_28px_rgba(84,77,255,0.35)]">
          🎉 Launch Offer – 40% OFF for First 3 Months
        </div>
        <p className="mt-3 text-sm font-medium text-white/62">Offer ends soon.</p>
      </motion.div>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {plans.map((plan, index) => (
          <PricingCard key={plan.name} plan={plan} index={index} />
        ))}
      </div>
    </section>
  );
}
