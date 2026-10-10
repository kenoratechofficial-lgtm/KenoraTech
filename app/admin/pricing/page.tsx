import type { Metadata } from "next";
import { PricingManager } from "@/components/admin/PricingManager";

export const metadata: Metadata = {
  title: "Pricing Plans",
  description: "Manage pricing plans."
};

export default function PricingAdminPage() {
  return <PricingManager />;
}