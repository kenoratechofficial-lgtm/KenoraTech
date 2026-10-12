import type { Metadata } from "next";
import { CtaSection } from "@/components/sections/cta-section";
import { HomeThreeHero } from "@/components/sections/home-three-hero";
import { ServicesSection } from "@/components/sections/services-section";
import { AppsSection } from "@/components/sections/apps-section";

export const metadata: Metadata = {
  alternates: { canonical: "/" }
};

export default function Home() {
  return (
    <>
      <HomeThreeHero />
      <ServicesSection />
      <AppsSection />
      <CtaSection />
    </>
  );
}
