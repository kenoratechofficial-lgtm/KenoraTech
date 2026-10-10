import type { Metadata } from "next";
import { MaintenancePage } from "@/components/maintenance-page";

export const metadata: Metadata = {
  title: "Maintenance",
  description: "KenoraTech is currently undergoing scheduled maintenance. We'll be back online shortly.",
  robots: { index: false, follow: false }
};

export default function Page() { return <MaintenancePage />; }