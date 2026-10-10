import type { Metadata } from "next";
import { LegalPage, type LegalSection } from "@/components/legal-page";
export const metadata: Metadata = {
  title: "Cookie Policy",
  description:
    "Learn how KenoraTech uses cookies and similar technologies to improve your browsing experience.",
};
const sections: LegalSection[] = [
  {
    title: "Introduction",
    body: [
      "This Cookie Policy explains how KenoraTech uses cookies and similar technologies on our website.",
    ],
  },
  {
    title: "What Are Cookies",
    body: [
      "Cookies are small text files placed on your device that help websites remember information about your visit.",
    ],
  },
  {
    title: "Types of Cookies",
    body: [
      "We may use essential, performance, analytics, functional and marketing cookies depending on the features you use.",
    ],
  },
  {
    title: "Essential Cookies",
    body: [
      "These cookies are necessary for core website functionality and security.",
    ],
  },
  {
    title: "Performance Cookies",
    body: [
      "These cookies help us understand and improve loading speed, reliability and website performance.",
    ],
  },
  {
    title: "Analytics Cookies",
    body: [
      "Analytics cookies provide aggregated information about how visitors interact with our website.",
    ],
  },
  {
    title: "Functional Cookies",
    body: [
      "Functional cookies remember preferences that make your visit more convenient.",
    ],
  },
  {
    title: "Marketing Cookies",
    body: [
      "Marketing cookies may be used to measure the relevance of campaigns where consent is required.",
    ],
  },
  {
    title: "Third Party Cookies",
    body: [
      "Third-party providers, such as analytics or embedded map services, may set cookies under their own policies.",
    ],
  },
  {
    title: "Managing Cookies",
    body: [
      "You can control cookies through your browser settings and, where available, our cookie preference controls.",
    ],
  },
  {
    title: "Disabling Cookies",
    body: [
      "Disabling cookies may affect the availability or functionality of parts of this website.",
    ],
  },
  {
    title: "Changes to Cookie Policy",
    body: [
      "We may update this policy periodically. The current date above shows when it was last revised.",
    ],
  },
  {
    title: "Contact Information",
    body: ["For cookie-related questions, contact hello@kenoratech.com."],
  },
];
export default function Page() {
  return (
    <LegalPage
      title="Cookie Policy"
      description="How KenoraTech uses cookies and similar technologies to improve your browsing experience."
      updatedAt="July 30, 2026"
      sections={sections}
    />
  );
}