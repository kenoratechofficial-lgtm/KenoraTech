import type { Metadata } from "next";
import { CareersPage } from "@/components/careers/careers-page";

export const metadata: Metadata = {
  title: "Careers",
  description: "Explore careers at KenoraTech and help build thoughtful websites, applications and digital products.",
  alternates: { canonical: "/careers" }
};

export default function Page() {
  return <CareersPage />;
}