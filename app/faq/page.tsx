import type { Metadata } from "next";
import { FaqSection } from "@/components/sections/faq-section";
import { PageHero } from "@/components/page-hero";
import { faqs } from "@/lib/content";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Answers to common questions about KenoraTech website projects, timelines, content, maintenance and custom web applications.",
  alternates: { canonical: "/faq" }
};

export default function FaqPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } }))
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <PageHero
        eyebrow="FAQ"
        title="Quick answers before we start building."
        description="Find answers about timelines, pricing, content, maintenance, custom web applications and the Kenora Tech process."
      />
      <FaqSection />
    </>
  );
}