import type { Metadata } from "next";
import { ServicesPageContent } from "@/components/sections/services-page-content";

export const metadata: Metadata = {
  title: "Services",
  description: "Website development, web applications, e-commerce, UI/UX design and ongoing maintenance for growing businesses.",
  alternates: { canonical: "/services" }
};

export default function ServicesPage() {
  return <ServicesPageContent />;
}