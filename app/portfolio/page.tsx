import type { Metadata } from "next";
import { PortfolioPage as PortfolioPageContent } from "@/components/portfolio/PortfolioPage";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Explore KenoraTech case studies and digital projects across SaaS, AI, analytics, cloud, branding and web development.",
  alternates: { canonical: "/portfolio" }
};

export default function PortfolioPage() {
  return <PortfolioPageContent />;
}