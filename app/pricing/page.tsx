import type { Metadata } from "next";
import { PricingPage as PricingPageContent } from "@/components/pricing/PricingPage";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Explore KenoraTech pricing for websites, e-commerce stores, custom web applications, and Android apps.",
  alternates: { canonical: "/pricing" }
};

export default function PricingPage() {
  return <PricingPageContent />;
}
