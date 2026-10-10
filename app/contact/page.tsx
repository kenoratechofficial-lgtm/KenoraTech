import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { PageHero } from "@/components/page-hero";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact KenoraTech to discuss your website, web application, e-commerce store or digital product. Book a free consultation.",
  alternates: { canonical: "/contact" }
};

export default function ContactPage() {
  const channels = [
    { icon: Mail, label: "Email", value: "kenoratech.in@gmail.com" },
    { icon: Phone, label: "Phone", value: "+91 7383530982" },
    { icon: MapPin, label: "Location", value: "Serving clients worldwide" }
  ];

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Tell us what you want to build."
        description="Share a few details and we will respond with a practical next step, timeline and recommendation for your budget."
      />
      <section className="container pb-8"><div className="flex flex-col items-start justify-between gap-4 rounded-lg border bg-card p-5 shadow-inner-border sm:flex-row sm:items-center"><div><h2 className="font-bold">Prefer to talk it through?</h2><p className="mt-1 text-sm text-muted-foreground">Choose a convenient time for a free 30-minute consultation.</p></div><Link href="/book-consultation" className="inline-flex h-11 shrink-0 items-center justify-center rounded-lg bg-gradient-to-r from-[#8c1cff] to-[#19a8ff] px-5 text-sm font-bold text-white">Book a Free Consultation</Link></div></section>
      <section className="container grid gap-10 pb-20 md:grid-cols-[0.85fr_1.15fr]">
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-1">
          {channels.map((item) => (
            <div key={item.label} className="rounded-lg border bg-card p-5 shadow-inner-border">
              <item.icon className="h-5 w-5 text-primary" aria-hidden="true" />
              <p className="mt-4 text-sm font-semibold text-muted-foreground">{item.label}</p>
              <p className="mt-1 font-medium">{item.value}</p>
            </div>
          ))}
        </div>
        <ContactForm />
      </section>
    </>
  );
}