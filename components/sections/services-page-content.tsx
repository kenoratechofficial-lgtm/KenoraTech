"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Code2,
  Headphones,
  LayoutDashboard,
  Palette,
  Rocket,
  ShoppingBag,
  Smartphone,
  Star,
  Users,
  Wand2
} from "lucide-react";
import servicesImage from "@/assets/services.png";

const services = [
  {
    icon: Code2,
    title: "Web Development",
    description: "We build fast, responsive and scalable websites using modern technologies to help your brand stand out."
  },
  {
    icon: Smartphone,
    title: "Mobile Development",
    description: "Custom mobile applications for iOS and Android that deliver seamless experiences and real results."
  },
  {
    icon: Wand2,
    title: "UI/UX Design",
    description: "We design intuitive, engaging and user-centered interfaces that leave a lasting impression."
  }
];

const serviceIcons = { code: Code2, mobile: Smartphone, design: Wand2, dashboard: LayoutDashboard, commerce: ShoppingBag, palette: Palette, sparkles: Wand2 };

const whyChoose = [
  { icon: Star, title: "Client-Centric\nApproach" },
  { icon: Rocket, title: "Innovative\nSolutions" },
  { icon: CheckCircle2, title: "On-Time\nDelivery" },
  { icon: Headphones, title: "24/7\nSupport" },
  { icon: Users, title: "Professional\nTeam" }
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 }
};

function MagneticButton({
  children,
  href,
  variant = "primary"
}: {
  children: React.ReactNode;
  href: string;
  variant?: "primary" | "secondary";
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 180, damping: 14, mass: 0.18 });
  const springY = useSpring(y, { stiffness: 180, damping: 14, mass: 0.18 });

  return (
    <motion.div
      style={{ x: springX, y: springY }}
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        x.set((event.clientX - rect.left - rect.width / 2) * 0.12);
        y.set((event.clientY - rect.top - rect.height / 2) * 0.18);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      whileTap={{ scale: 0.98 }}
    >
      <Link
        href={href}
        className={
          variant === "primary"
            ? "inline-flex h-14 items-center justify-center gap-4 rounded-md bg-gradient-to-r from-[#8B5CF6] to-[#0EA5FF] px-6 text-sm font-bold text-white shadow-[0_0_34px_rgba(59,130,246,0.25)] transition hover:shadow-[0_0_44px_rgba(139,92,246,0.38)]"
            : "inline-flex h-14 items-center justify-center gap-4 rounded-md border border-white/10 bg-white/[0.02] px-6 text-sm font-bold text-white transition hover:border-[#8B5CF6]/70 hover:bg-white/[0.05]"
        }
      >
        {children}
      </Link>
    </motion.div>
  );
}

function ServiceCard({ service, index }: { service: (typeof services)[number]; index: number }) {
  const Icon = service.icon;

  return (
    <motion.article
      variants={fadeUp}
      transition={{ duration: 0.45, delay: index * 0.06, ease: "easeOut" }}
      whileHover={{ y: -8, scale: 1.01 }}
      className="group relative min-h-[270px] overflow-hidden rounded-lg border border-white/[0.08] bg-white/[0.03] p-7 shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_18px_60px_rgba(0,0,0,0.18)] transition"
    >
      <div className="absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(139,92,246,0.2),transparent_20rem),linear-gradient(135deg,rgba(139,92,246,0.12),rgba(59,130,246,0.06),transparent)]" />
      </div>
      <div className="relative grid grid-cols-[4.5rem_1fr] gap-5">
        <div className="flex h-16 w-16 items-center justify-center rounded-full border border-[#8B5CF6]/55 bg-[#8B5CF6]/15 text-[#c7a8ff] shadow-[0_0_28px_rgba(139,92,246,0.34)]">
          <Icon className="h-8 w-8" />
        </div>
        <div>
          <h3 className="mt-3 text-xl font-extrabold text-white">{service.title}</h3>
          <p className="mt-4 max-w-[16.5rem] text-sm leading-7 text-[#A8B3CF]">{service.description}</p>
          <Link
            href="/contact"
            className="mt-8 inline-flex items-center gap-3 text-sm font-medium text-[#b764ff] transition group-hover:text-[#60a5fa]"
          >
            Learn More
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

function ServicesIllustration() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-0.5, 0.5], [5, -5]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-7, 7]);

  return (
    <motion.div
      className="relative mx-auto w-full max-w-[740px] lg:ml-auto"
      initial={{ opacity: 0, x: 28 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, ease: "easeOut", delay: 0.12 }}
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        mouseX.set((event.clientX - rect.left) / rect.width - 0.5);
        mouseY.set((event.clientY - rect.top) / rect.height - 0.5);
      }}
      onMouseLeave={() => {
        mouseX.set(0);
        mouseY.set(0);
      }}
    >
      <motion.div
        style={{ rotateX, rotateY, transformPerspective: 1000 }}
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="relative overflow-visible"
      >
        <div className="absolute left-1/2 top-1/2 h-[70%] w-[78%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#3B82F6]/16 blur-3xl" />
        <div className="absolute left-1/2 top-[54%] h-[58%] w-[62%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#8B5CF6]/14 blur-3xl" />
        <Image
          src={servicesImage}
          alt="KenoraTech futuristic services cube"
          priority
          className="relative z-10 w-full select-none object-contain opacity-95 mix-blend-screen drop-shadow-[0_0_50px_rgba(59,130,246,0.25)] [mask-image:radial-gradient(ellipse_at_center,black_48%,rgba(0,0,0,0.9)_64%,rgba(0,0,0,0.45)_78%,transparent_94%)]"
        />
      </motion.div>
    </motion.div>
  );
}

export function ServicesPageContent() {
  const [managedServices, setManagedServices] = useState<Array<{ title: string; description: string; icon?: string }>>([]);
  const displayedServices = managedServices.length
    ? [...managedServices]
        .filter((service) => service.title.trim() && service.description.trim())
        .sort((first, second) => {
          const firstIndex = services.findIndex((service) => service.title === first.title);
          const secondIndex = services.findIndex((service) => service.title === second.title);
          return (firstIndex < 0 ? 99 : firstIndex) - (secondIndex < 0 ? 99 : secondIndex);
        })
        .map((service) => ({ ...service, icon: (service.icon ? serviceIcons[service.icon as keyof typeof serviceIcons] : undefined) || services.find((defaultService) => defaultService.title === service.title)?.icon || Code2 }))
    : services;

  useEffect(() => {
    void fetch("/api/admin/content/services", { cache: "no-store" })
      .then((response) => response.json())
      .then((body) => setManagedServices(Array.isArray(body?.items) ? body.items : []))
      .catch(() => setManagedServices([]));
  }, []);

  return (
    <div className="overflow-hidden bg-[radial-gradient(circle_at_72%_16%,rgba(59,130,246,0.13),transparent_28rem),radial-gradient(circle_at_22%_15%,rgba(139,92,246,0.12),transparent_24rem),linear-gradient(180deg,#050816,#030613_55%,#050816)] text-white">
      <motion.section
        initial="hidden"
        animate="visible"
        transition={{ staggerChildren: 0.12 }}
        className="container relative grid min-h-[560px] items-center gap-10 pb-10 pt-12 lg:grid-cols-[0.82fr_1.18fr] lg:pb-8 lg:pt-14"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_67%_44%,rgba(59,130,246,0.12),transparent_27rem),radial-gradient(circle_at_12%_25%,rgba(139,92,246,0.12),transparent_20rem)]" />
        <motion.div variants={fadeUp} transition={{ duration: 0.55, ease: "easeOut" }} className="relative z-10">
          <span className="inline-flex rounded-full border border-[#8B5CF6]/70 bg-white/[0.02] px-4 py-1.5 text-xs font-medium uppercase tracking-wide text-[#b995ff]">
            Our Services
          </span>
          <h1 className="mt-7 max-w-xl text-balance text-5xl font-black leading-[1.06] tracking-normal text-white md:text-6xl">
            Solutions That{" "}
            <span className="bg-gradient-to-r from-[#9d35ff] via-[#7C3AED] to-[#0EA5FF] bg-clip-text text-transparent">
              Drive Innovation
            </span>
          </h1>
          <p className="mt-7 max-w-md text-base leading-8 text-[#d0d5e2]/86">
            We deliver end-to-end digital solutions designed to empower businesses, enhance user experiences, and drive
            measurable growth.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <MagneticButton href="/contact">
              Let&apos;s Build Something Amazing
              <ArrowRight className="h-5 w-5" />
            </MagneticButton>
            <MagneticButton href="/portfolio" variant="secondary">
              View Portfolio
              <ArrowRight className="h-5 w-5" />
            </MagneticButton>
          </div>
        </motion.div>
        <ServicesIllustration />
      </motion.section>

      <section className="container py-8 lg:py-12">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-120px" }}
          transition={{ staggerChildren: 0.1 }}
          className="text-center"
        >
          <motion.p variants={fadeUp} className="text-sm font-medium uppercase tracking-wide text-[#9b63ff]">
            What We Do
          </motion.p>
          <motion.h2 variants={fadeUp} className="mt-3 text-4xl font-black tracking-normal text-white md:text-5xl">
            Our{" "}
            <span className="bg-gradient-to-r from-[#8B5CF6] to-[#3B82F6] bg-clip-text text-transparent">
              Services
            </span>
          </motion.h2>
          <motion.p variants={fadeUp} className="mx-auto mt-6 max-w-xl text-base leading-7 text-[#A8B3CF]">
            From strategy to execution, we offer a wide range of services to help your business thrive in the digital world.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-120px" }}
          transition={{ staggerChildren: 0.08 }}
          className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3"
        >
          {displayedServices.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </motion.div>
      </section>

      <section className="container pb-14 pt-2">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="relative overflow-hidden rounded-lg border border-white/[0.08] bg-white/[0.03] px-8 py-9 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_100%_100%,rgba(139,92,246,0.16),transparent_22rem)]" />
          <div className="relative grid gap-8 lg:grid-cols-[1.15fr_3fr] lg:items-center">
            <div>
              <p className="text-sm font-medium uppercase tracking-wide text-[#9b63ff]">Why Choose Us</p>
              <h2 className="mt-4 text-3xl font-black leading-tight tracking-normal text-white">
                We&apos;re More Than
                <br />
                Just a{" "}
                <span className="bg-gradient-to-r from-[#8B5CF6] to-[#3B82F6] bg-clip-text text-transparent">
                  Service Provider
                </span>
              </h2>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
              {whyChoose.map((item, index) => {
                const Icon = item.icon;

                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.06, duration: 0.4 }}
                    className="border-white/10 text-center lg:border-l lg:px-5"
                  >
                    <Icon className="mx-auto h-12 w-12 text-[#9f55ff] drop-shadow-[0_0_18px_rgba(139,92,246,0.36)]" />
                    <p className="mt-5 whitespace-pre-line text-base font-medium leading-6 text-white">{item.title}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
