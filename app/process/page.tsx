import type { Metadata } from "next";
import { ProcessPageContent } from "@/components/sections/process-page-content";

export const metadata: Metadata = {
  title: "Process",
  description: "See KenoraTech's clear website and product development process, from discovery and design through launch and ongoing growth.",
  alternates: { canonical: "/process" }
};

export default function ProcessPage() {
  return <ProcessPageContent />;
}