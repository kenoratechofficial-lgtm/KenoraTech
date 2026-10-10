import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Diamond, Eye, Target } from "lucide-react";
import { CtaSection } from "@/components/sections/cta-section";
import { TeamSection } from "@/components/sections/team-section";
import { values } from "@/lib/content";
import aboutImage from "@/assets/about.png";

export const metadata: Metadata = {
  title: "About",
  description: "Meet KenoraTech, a technology agency combining strategy, thoughtful design and reliable engineering for ambitious businesses.",
  alternates: { canonical: "/about" }
};

const aboutCards = [
  {
    icon: Target,
    title: "Our Mission",
    body: "To empower businesses with innovative technology solutions that drive growth, efficiency and excellence."
  },
  {
    icon: Eye,
    title: "Our Vision",
    body: "To be a global leader in digital innovation, known for delivering impactful solutions and creating long-term value."
  }
];

const aboutValues = [
  "Innovation in everything we do",
  "Integrity in all our actions",
  "Customer success is our priority",
  "Collaboration and teamwork"
];

export default function AboutPage() {
  return (
    <>
      <div className="bg-[#030711] text-white">
        <section className="container grid min-h-[520px] items-center gap-10 py-12 lg:grid-cols-[0.86fr_1.42fr] lg:py-14">
          <div className="max-w-xl">
            <span className="inline-flex rounded-full border border-[#8b2cff]/70 bg-[#180a32]/70 px-4 py-1.5 text-sm font-semibold uppercase tracking-wide text-[#c778ff] shadow-[0_0_24px_rgba(142,44,255,0.28)]">
              About Us
            </span>
            <h1 className="mt-6 text-5xl font-extrabold leading-tight tracking-normal text-white sm:text-6xl">
              We are{" "}
              <span className="bg-gradient-to-r from-[#9b35ff] via-[#6a42ff] to-[#20a8ff] bg-clip-text text-transparent">
                KenoraTech
              </span>
            </h1>
            <p className="mt-4 text-xl text-white/76">
              Building intelligent digital products that create impact
            </p>
            <p className="mt-7 max-w-lg text-base leading-8 text-white/76">
              KenoraTech is a modern technology company focused on delivering innovative digital solutions for startups,
              businesses and enterprises. We combine creativity, technology and strategy to build products that drive real
              results.
            </p>
            <Link
              href="/contact"
              className="mt-6 inline-flex h-12 items-center gap-4 rounded-md bg-gradient-to-r from-[#8c1cff] to-[#19a8ff] px-5 text-sm font-bold text-white shadow-[0_16px_42px_rgba(38,126,255,0.25)] transition hover:scale-[1.02]"
            >
              Let&apos;s Build Something Amazing
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>

          <div className="relative">
            <div className="absolute -inset-1 rounded-[1.25rem] bg-gradient-to-r from-[#7d24ff]/60 via-transparent to-[#25a7ff]/60 blur-lg" />
            <Image
              src={aboutImage}
              alt="KenoraTech digital strategy room"
              priority
              className="relative aspect-[2.22/1] w-full rounded-[1.1rem] border border-[#7e30ff]/55 object-cover shadow-[0_0_48px_rgba(101,38,255,0.26)]"
            />
          </div>
        </section>

        <section className="border-t border-white/8 bg-[#040814] py-7">
          <div className="container">
            <p className="text-sm font-medium text-[#b74cff]">About KenoraTech</p>
            <h2 className="mt-2 text-3xl font-extrabold tracking-normal text-white sm:text-4xl">
              Driven by Passion. Focused on Impact.
            </h2>

            <div className="mt-5 grid gap-4 lg:grid-cols-3">
              {aboutCards.map((card) => {
                const Icon = card.icon;

                return (
                  <article
                    key={card.title}
                    className="grid min-h-52 grid-cols-[4.75rem_1fr] gap-6 rounded-lg border border-[#263453] bg-[#07101f]/92 p-7 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
                  >
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#164fff] to-[#7b24d9] shadow-[0_0_26px_rgba(128,61,255,0.42)]">
                      <Icon className="h-9 w-9 text-[#6ef0ff]" />
                    </div>
                    <div>
                      <h3 className="text-xl font-extrabold text-white">{card.title}</h3>
                      <div className="mt-4 h-0.5 w-8 bg-[#9c35ff]" />
                      <p className="mt-6 text-sm leading-7 text-white/73">{card.body}</p>
                    </div>
                  </article>
                );
              })}

              <article className="grid min-h-52 grid-cols-[4.75rem_1fr] gap-6 rounded-lg border border-[#263453] bg-[#07101f]/92 p-7 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#164fff] to-[#7b24d9] shadow-[0_0_26px_rgba(128,61,255,0.42)]">
                  <Diamond className="h-9 w-9 text-[#6ef0ff]" />
                </div>
                <div>
                  <h3 className="text-xl font-extrabold text-white">Our Values</h3>
                  <div className="mt-4 h-0.5 w-8 bg-[#9c35ff]" />
                  <ul className="mt-5 space-y-2.5 text-sm text-white/73">
                    {aboutValues.map((value) => (
                      <li key={value} className="flex items-center gap-3">
                        <CheckCircle2 className="h-4 w-4 flex-none text-[#9a55ff]" />
                        <span>{value}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </div>
          </div>
        </section>
      </div>
      <section className="container grid gap-10 py-16 md:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">How we work</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl">
            Clear scope, elegant execution, measurable outcomes.
          </h2>
        </div>
        <div className="space-y-5 text-base leading-8 text-muted-foreground">
          <p>
            Kenora Tech was built for clients who want a senior digital partner without the slow layers of a traditional agency. Every project begins with a sharp discovery sprint, moves through visual direction and prototyping, then ships with performance, accessibility and conversion in mind.
          </p>
          <p>
            Our process is collaborative but calm. You get clear checkpoints, honest recommendations, reusable components and a site or app that is ready to grow with your business.
          </p>
        </div>
      </section>
      <section className="section-band bg-card/45 py-16">
        <div className="container grid gap-5 md:grid-cols-3">
          {values.map((value) => (
            <article key={value.title} className="rounded-lg border bg-background/80 p-6 shadow-inner-border">
              <h3 className="text-lg font-semibold">{value.title}</h3>
              <p className="mt-3 leading-7 text-muted-foreground">{value.description}</p>
            </article>
          ))}
        </div>
      </section>
      <TeamSection />
      <CtaSection />
    </>
  );
}