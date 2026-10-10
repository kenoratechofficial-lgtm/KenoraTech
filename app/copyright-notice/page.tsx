import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = {
  title: "Copyright Notice",
  description: "Copyright notice for Kenora Tech content, code, designs, graphics and digital assets."
};

const sections = [
  {
    title: "Ownership",
    body: [
      "All content, code, design systems, graphics, images, layouts, branding, copy and digital assets displayed on this website are owned by Kenora Tech unless otherwise stated.",
      "These materials are protected by applicable copyright, trademark and intellectual property laws."
    ]
  },
  {
    title: "Restrictions",
    body: [
      "Unauthorized reproduction, copying, modification, publication, distribution, resale or commercial use of any website content, code, design or assets is prohibited.",
      "You may not remove copyright notices, ownership labels or other proprietary markings from any Kenora Tech material."
    ]
  },
  {
    title: "Permitted Use",
    body: [
      "You may view and share links to public pages on this website for informational purposes.",
      "Any other use requires prior written permission from Kenora Tech."
    ]
  },
  {
    title: "Contact",
    body: [
      "For licensing, permissions or copyright-related questions, contact Kenora Tech at kenoratech.in@gmail.com."
    ]
  }
];

export default function CopyrightNoticePage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Copyright Notice"
        description="Important ownership and usage terms for Kenora Tech content, code, designs and digital assets."
      />
      <LegalPage title="Copyright Notice" description="Information about KenoraTech intellectual property, permitted use and copyright enquiries." updatedAt="June 24, 2026" sections={sections} />
    </>
  );
}