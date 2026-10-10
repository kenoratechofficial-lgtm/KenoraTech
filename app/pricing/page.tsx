import type { Metadata } from "next";
import { PricingPage as PricingPageContent } from "@/components/pricing/PricingPage";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Explore transparent INR pricing for KenoraTech websites, SaaS interfaces, CMS builds and custom digital products.",
  alternates: { canonical: "/pricing" }
};

export default function PricingPage() {
  return <PricingPageContent />;
}