"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Rocket } from "lucide-react";

export function PricingCTA() {
  return (
    <section className="container pb-12 pt-3">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className="relative overflow-hidden rounded-3xl border border-white/[0.09] bg-[#071020]/78 px-6 py-8 shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_0_56px_rgba(139,92,246,0.14)] backdrop-blur-2xl md:px-12"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_8%_50%,rgba(139,28,255,0.24),transparent_14rem),radial-gradient(circle_at_92%_40%,rgba(0,168,255,0.14),transparent_18rem)]" />
        <div className="absolute bottom-0 right-0 h-36 w-[46%] opacity-50">
          {Array.from({ length: 14 }).map((_, index) => (
            <span
              key={index}
              className={[
                "absolute bottom-[-5rem] right-[-2rem] h-40 w-[130%] rounded-[50%] border-t border-[#8c31ff]/35",
                index % 2 === 0 ? "rotate-[-11deg]" : "rotate-[-7deg]"
              ].join(" ")}
            />
          ))}
        </div>
        <div className="relative z-10 grid items-center gap-7 text-center md:grid-cols-[96px_1fr_auto] md:text-left">
          <motion.div
            animate={{ y: [0, -7, 0], boxShadow: ["0 0 32px rgba(139,28,255,.28)", "0 0 48px rgba(0,168,255,.30)", "0 0 32px rgba(139,28,255,.28)"] }}
            transition={{ duration: 4.4, repeat: Infinity, ease: "easeInOut" }}
            className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-[#2454ff]/45 bg-gradient-to-br from-[#122aff]/45 to-[#721ac8]/65 text-[#71daff] shadow-[0_0_34px_rgba(139,92,246,0.28)] md:mx-0"
          >
            <Rocket className="h-10 w-10 stroke-[1.7]" />
          </motion.div>
          <div>
            <p className="text-sm font-medium text-[#bb76ff]">Need something custom?</p>
            <h2 className="mt-3 text-2xl font-black leading-tight tracking-normal text-white md:text-[28px]">
              Let&apos;s build the perfect solution for your business.
            </h2>
          </div>
          <Link
            href="/contact"
            className="inline-flex h-12 items-center justify-center gap-4 rounded-lg bg-gradient-to-r from-[#8c1cff] to-[#19a8ff] px-6 text-sm font-bold text-white shadow-[0_0_30px_rgba(105,51,255,0.28)] transition hover:scale-[1.03] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1aa8ff]"
          >
            Contact Us
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
