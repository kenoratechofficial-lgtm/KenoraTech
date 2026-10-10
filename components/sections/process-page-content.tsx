"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValue, useSpring } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  Code2,
  Headphones,
  Lightbulb,
  Pencil,
  Rocket,
  ShieldCheck,
  Target,
  Users
} from "lucide-react";
import processImage from "@/assets/process.png";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 }
};

const timelineSteps = [
  {
    number: "01",
    title: "Discover",
    description: "We understand your business, goals, and audience to define the right solution.",
    icon: Lightbulb,
    tone: "purple"
  },
  {
    number: "02",
    title: "Plan",
    description: "We analyze, strategize, and create a clear roadmap tailored to your requirements.",
    icon: Pencil,
    tone: "purple"
  },
  {
    number: "03",
    title: "Design & Develop",
    description: "Our team designs intuitive interfaces and builds robust, scalable solutions using modern technologies.",
    icon: Code2,
    tone: "purple"
  },
  {
    number: "04",
    title: "Test & Launch",
    description: "We rigorously test for performance and quality before launching your solution successfully.",
    icon: Rocket,
    tone: "purple"
  },
  {
    number: "05",
    title: "Support & Grow",
    description: "We provide ongoing support and improvements to help your business scale continually.",
    icon: BarChart3,
    tone: "blue"
  }
];

const differenceCards = [
  {
    title: "Collaborative Approach",
    description: "We work closely with you at every step.",
    icon: Users
  },
  {
    title: "Transparent Communication",
    description: "You're always in the loop with clear updates.",
    icon: ShieldCheck
  },
  {
    title: "Goal-Oriented Solutions",
    description: "We focus on delivering measurable results.",
    icon: Target
  },
  {
    title: "Agile Development",
    description: "We adapt quickly to changes and deliver efficiently.",
    icon: Code2
  },
  {
    title: "Long-Term Partnership",
    description: "We're with you even after the launch.",
    icon: Headphones
  }
];

function MagneticButton({ children, href }: { children: React.ReactNode; href: string }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 180, damping: 13, mass: 0.18 });
  const springY = useSpring(y, { stiffness: 180, damping: 13, mass: 0.18 });

  return (
    <motion.div
      style={{ x: springX, y: springY }}
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        x.set((event.clientX - rect.left - rect.width / 2) * 0.12);
        y.set((event.clientY - rect.top - rect.height / 2) * 0.16);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      whileTap={{ scale: 0.98 }}
    >
      <Link
        href={href}
        className="inline-flex h-[46px] items-center justify-center gap-4 rounded-lg bg-gradient-to-r from-[#8B1CFF] to-[#05A8FF] px-5 text-sm font-bold text-white shadow-[0_0_30px_rgba(59,130,246,0.27)] transition hover:shadow-[0_0_42px_rgba(139,92,246,0.42)]"
      >
        {children}
      </Link>
    </motion.div>
  );
}

function SectionHeading({ title, gradientWord, subtitle }: { title: string; gradientWord: string; subtitle?: string }) {
  const parts = title.split(gradientWord);

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      transition={{ staggerChildren: 0.08 }}
      className="text-center"
    >
      <motion.h2 variants={fadeUp} className="text-[28px] font-black leading-tight tracking-normal text-white md:text-[32px]">
        {parts[0]}
        <span className="bg-gradient-to-r from-[#9b31ff] to-[#159dff] bg-clip-text text-transparent">
          {gradientWord}
        </span>
        {parts[1]}
      </motion.h2>
      <motion.div
        variants={fadeUp}
        className="mx-auto mt-2 h-0.5 w-10 rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#3B82F6] shadow-[0_0_14px_rgba(139,92,246,0.75)]"
      />
      {subtitle ? (
        <motion.p variants={fadeUp} className="mx-auto mt-4 max-w-xl text-sm leading-6 text-white/72">
          {subtitle}
        </motion.p>
      ) : null}
    </motion.div>
  );
}

function HeroIllustration() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 24, scale: 0.98 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ duration: 0.9, ease: "easeOut", delay: 0.14 }}
      className="relative mx-auto mt-8 w-full max-w-[720px] lg:mt-0 lg:max-w-[690px]"
    >
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="relative"
      >
        <div className="absolute left-[20%] top-[22%] h-48 w-48 rounded-full bg-[#8B5CF6]/28 blur-[70px]" />
        <div className="absolute right-[10%] top-[24%] h-52 w-52 rounded-full bg-[#3B82F6]/30 blur-[76px]" />
        <div className="absolute left-1/2 top-[58%] h-28 w-[70%] -translate-x-1/2 rounded-full bg-[#1f6fff]/15 blur-3xl" />
        <Image
          src={processImage}
          alt="KenoraTech process infinity illustration"
          priority
          sizes="(min-width: 1024px) 690px, 100vw"
          className="relative z-10 w-full select-none object-contain opacity-95 mix-blend-screen drop-shadow-[0_0_52px_rgba(59,130,246,0.24)]"
        />
        <div className="pointer-events-none absolute inset-x-[6%] bottom-[12%] z-20 h-px bg-gradient-to-r from-transparent via-[#8B5CF6]/80 to-transparent opacity-60" />
      </motion.div>
    </motion.div>
  );
}

function TimelineStep({ step, index }: { step: (typeof timelineSteps)[number]; index: number }) {
  const Icon = step.icon;
  const isBlue = step.tone === "blue";

  return (
    <motion.article
      variants={fadeUp}
      transition={{ duration: 0.5, delay: index * 0.06, ease: "easeOut" }}
      className="relative z-10 flex min-w-0 flex-col items-center text-center"
    >
      <span className="mb-5 text-base font-medium text-white">{step.number}</span>
      <motion.div
        whileHover={{ y: -5, rotate: 4 }}
        className={[
          "flex h-[78px] w-[78px] items-center justify-center rounded-full border bg-[#120b2c]/75 shadow-[0_0_30px_rgba(139,92,246,0.22)]",
          isBlue
            ? "border-[#129bff] text-[#1ba9ff] shadow-[0_0_28px_rgba(59,130,246,0.32)]"
            : "border-[#b63bff] text-[#df6cff]"
        ].join(" ")}
      >
        <Icon className="h-9 w-9 stroke-[1.7]" />
      </motion.div>
      <h3 className={["mt-7 text-lg font-bold", isBlue ? "text-[#149dff]" : "text-[#d24cff]"].join(" ")}>
        {step.title}
      </h3>
      <p className="mt-4 max-w-[190px] text-sm leading-7 text-white/74">{step.description}</p>
    </motion.article>
  );
}

function ProcessTimeline() {
  return (
    <section className="container py-8 md:py-10">
      <SectionHeading
        title="Our Process"
        gradientWord="Process"
        subtitle="From idea to launch, we keep it simple and effective."
      />
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-120px" }}
        transition={{ staggerChildren: 0.06 }}
        className="relative mt-10 grid gap-10 md:grid-cols-5 md:gap-3"
      >
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.85, ease: "easeOut" }}
          className="absolute left-[9%] right-[9%] top-[10px] hidden h-px origin-left bg-gradient-to-r from-[#b43bff]/65 via-[#7d35ff]/55 to-[#139dff]/75 md:block"
        />
        {timelineSteps.map((step, index) => (
          <TimelineStep key={step.title} step={step} index={index} />
        ))}
      </motion.div>
    </section>
  );
}

function DifferenceCard({ card, index }: { card: (typeof differenceCards)[number]; index: number }) {
  const Icon = card.icon;

  return (
    <motion.article
      variants={fadeUp}
      transition={{ duration: 0.45, delay: index * 0.05, ease: "easeOut" }}
      whileHover={{ y: -8, scale: 1.015 }}
      className="group relative min-h-[236px] overflow-hidden rounded-[10px] border border-white/[0.08] bg-[#071021]/88 px-5 py-8 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_20px_60px_rgba(0,0,0,0.14)]"
    >
      <div className="absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(139,92,246,0.22),transparent_10rem),linear-gradient(135deg,rgba(139,92,246,0.12),rgba(59,130,246,0.05),transparent)]" />
      </div>
      <motion.div
        animate={{ rotate: [0, 5, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: index * 0.3 }}
        className="relative mx-auto flex h-[66px] w-[66px] items-center justify-center rounded-full border border-[#a64dff] bg-[#160b36]/80 text-[#d35cff] shadow-[0_0_28px_rgba(139,92,246,0.34)]"
      >
        <Icon className="h-9 w-9 stroke-[1.65]" />
        <span className="absolute -right-0.5 top-1 h-1.5 w-1.5 rounded-full bg-[#c769ff] shadow-[0_0_10px_#c769ff]" />
      </motion.div>
      <h3 className="relative mx-auto mt-5 max-w-[160px] text-lg font-extrabold leading-6 text-white">{card.title}</h3>
      <p className="relative mx-auto mt-4 max-w-[170px] text-sm leading-6 text-white/74">{card.description}</p>
    </motion.article>
  );
}

function DifferenceSection() {
  return (
    <section className="container pb-9 pt-7">
      <SectionHeading title="What Makes Our Process Different" gradientWord="Process" />
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-120px" }}
        transition={{ staggerChildren: 0.07 }}
        className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5 lg:gap-5"
      >
        {differenceCards.map((card, index) => (
          <DifferenceCard key={card.title} card={card} index={index} />
        ))}
      </motion.div>
    </section>
  );
}

function ProcessCta() {
  return (
    <section className="container pb-10 pt-1">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className="relative overflow-hidden rounded-[12px] border border-white/[0.11] bg-[#071020]/82 px-7 py-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_0_42px_rgba(59,130,246,0.08)] md:px-11 md:py-5"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_9%_50%,rgba(139,92,246,0.22),transparent_12rem),radial-gradient(circle_at_100%_110%,rgba(139,92,246,0.16),transparent_21rem)]" />
        <div className="absolute -bottom-16 right-[-4%] h-44 w-[48%] opacity-55">
          {Array.from({ length: 12 }).map((_, index) => (
            <span
              key={index}
              className="absolute bottom-0 right-0 h-36 w-[120%] rounded-[50%] border-t border-[#8B5CF6]/45"
              style={{
                transform: `translateY(${index * -7}px) rotate(${-10 + index * 1.7}deg)`,
                transformOrigin: "100% 100%"
              }}
            />
          ))}
        </div>
        <div className="relative grid items-center gap-7 md:grid-cols-[138px_1fr]">
          <motion.div
            animate={{ y: [0, -6, 0], boxShadow: ["0 0 34px rgba(139,92,246,.28)", "0 0 48px rgba(59,130,246,.32)", "0 0 34px rgba(139,92,246,.28)"] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
            className="flex h-[104px] w-[104px] items-center justify-center rounded-full border border-[#2454ff]/50 bg-gradient-to-br from-[#122aff]/50 to-[#5d12bd]/58 text-[#65d9ff] shadow-[0_0_34px_rgba(139,92,246,0.28)]"
          >
            <Rocket className="h-12 w-12 stroke-[1.7]" />
          </motion.div>
          <div>
            <p className="text-sm font-medium text-[#b987ff]">Ready to start your project?</p>
            <h2 className="mt-3 text-2xl font-black leading-tight tracking-normal text-white md:text-[28px]">
              Let&apos;s Build Something Amazing Together!
            </h2>
            <div className="mt-5">
              <MagneticButton href="/contact">
                Start Your Project
                <ArrowRight className="h-5 w-5" />
              </MagneticButton>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

export function ProcessPageContent() {
  return (
    <div className="overflow-hidden bg-[#050816] text-white">
      <div className="relative">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_22%_18%,rgba(139,92,246,0.08),transparent_21rem),radial-gradient(circle_at_77%_19%,rgba(59,130,246,0.12),transparent_25rem),linear-gradient(180deg,#050816_0%,#02050f_58%,#050816_100%)]" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[640px] bg-[linear-gradient(90deg,transparent_0,rgba(139,92,246,0.04)_1px,transparent_1px),linear-gradient(0deg,transparent_0,rgba(59,130,246,0.035)_1px,transparent_1px)] bg-[size:72px_72px] opacity-30" />
        <motion.section
          initial="hidden"
          animate="visible"
          transition={{ staggerChildren: 0.12 }}
          className="container relative grid min-h-[430px] items-center gap-6 pb-8 pt-12 lg:grid-cols-[0.86fr_1.14fr] lg:pb-8 lg:pt-[72px]"
        >
          <motion.div variants={fadeUp} transition={{ duration: 0.6, ease: "easeOut" }} className="relative z-10">
            <span className="inline-flex rounded-full border border-[#8B5CF6]/62 bg-[#160b36]/35 px-4 py-1.5 text-xs font-medium uppercase tracking-normal text-[#c26bff]">
              OUR PROCESS
            </span>
            <h1 className="mt-8 max-w-[600px] text-[40px] font-black leading-[1.08] tracking-normal text-white md:text-[52px] lg:text-[53px]">
              A Simple, Transparent
              <br />
              Process That
              <br />
              <span className="bg-gradient-to-r from-[#a22dff] via-[#745BFF] to-[#00A8FF] bg-clip-text text-transparent">
                Delivers Results
              </span>
            </h1>
            <p className="mt-6 max-w-[430px] text-base leading-8 text-white/78">
              We follow a proven process to turn your ideas into powerful digital solutions that drive real impact.
            </p>
            <div className="mt-8 lg:hidden">
              <MagneticButton href="/contact">
                Start Your Project
                <ArrowRight className="h-5 w-5" />
              </MagneticButton>
            </div>
          </motion.div>
          <HeroIllustration />
        </motion.section>

        <ProcessTimeline />
        <DifferenceSection />
        <ProcessCta />
      </div>
    </div>
  );
}
