"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import portfolioHero from "@/assets/portfolio.png";

const heroParticles = [
  "left-[6%] top-[18%] h-1 w-1",
  "left-[20%] top-[78%] h-1.5 w-1.5",
  "left-[42%] top-[15%] h-1 w-1",
  "right-[16%] top-[18%] h-1.5 w-1.5",
  "right-[7%] top-[66%] h-1 w-1",
  "right-[46%] bottom-[10%] h-1 w-1"
];

const cubes = [
  "left-[8%] top-[43%]",
  "left-[26%] top-[28%]",
  "right-[8%] top-[38%]",
  "right-[22%] top-[18%]",
  "right-[26%] bottom-[18%]"
];

export function PortfolioHero() {
  return (
    <section className="container relative grid min-h-[500px] items-center gap-12 pb-10 pt-14 lg:grid-cols-[0.94fr_1.06fr] lg:pt-16">
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease: "easeOut" }}
        className="relative z-10 text-center lg:text-left"
      >
        <span className="inline-flex rounded-full border border-[#8b31ff]/58 bg-[#130a30]/70 px-4 py-1.5 text-xs font-medium uppercase tracking-normal text-[#cb7dff] shadow-[0_0_20px_rgba(139,49,255,0.18)]">
          OUR PORTFOLIO
        </span>
        <h1 className="mx-auto mt-7 max-w-[640px] text-[42px] font-black leading-[1.08] tracking-normal text-white md:text-[60px] lg:mx-0">
          Work That Speaks
          <br />
          For{" "}
          <span className="bg-gradient-to-r from-[#8B1CFF] via-[#6B5CFF] to-[#09A8FF] bg-clip-text text-transparent">
            Itself
          </span>
        </h1>
        <p className="mx-auto mt-6 max-w-[560px] text-base leading-8 text-white/72 lg:mx-0">
          Explore a selection of our recent projects that highlight our expertise, creativity, and commitment to delivering results.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 28, scale: 0.96 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.08 }}
        className="relative mx-auto min-h-[330px] w-full max-w-[560px] lg:max-w-[590px]"
      >
        <div className="absolute left-1/2 top-1/2 h-[24rem] w-[24rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#7b22ff]/24 blur-[90px]" />
        <div className="absolute right-[9%] top-[20%] h-44 w-44 rounded-full bg-[#07a8ff]/20 blur-[70px]" />
        <div className="absolute bottom-[5%] left-[14%] h-36 w-36 rounded-full bg-[#b32cff]/18 blur-[64px]" />

        {cubes.map((position, index) => (
          <motion.span
            key={position}
            animate={{ y: [0, -12, 0], rotate: [45, 55, 45] }}
            transition={{ duration: 5 + index * 0.45, repeat: Infinity, ease: "easeInOut", delay: index * 0.2 }}
            className={`absolute ${position} h-5 w-5 rotate-45 border border-[#8e35ff]/70 bg-[#101d4a]/45 shadow-[0_0_20px_rgba(139,92,246,0.55)]`}
          />
        ))}
        {heroParticles.map((particle, index) => (
          <motion.span
            key={particle}
            animate={{ opacity: [0.25, 1, 0.25], scale: [1, 1.5, 1] }}
            transition={{ duration: 3.2 + index * 0.28, repeat: Infinity, ease: "easeInOut" }}
            className={`absolute ${particle} rounded-full bg-[#38b8ff] shadow-[0_0_14px_#38b8ff]`}
          />
        ))}

        <motion.div
          animate={{ y: [0, -14, 0], rotate: [0, -1.2, 0.8, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="relative z-10"
        >
          <Image
            src={portfolioHero}
            alt="Futuristic portfolio showcase illustration"
            priority
            sizes="(min-width: 1024px) 590px, 100vw"
            className="mx-auto w-full select-none object-contain drop-shadow-[0_0_58px_rgba(30,144,255,0.34)]"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
