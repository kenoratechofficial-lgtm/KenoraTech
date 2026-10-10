import type { Metadata } from "next";
import { AdminContentManager } from "@/components/admin/AdminContentManager";

export const metadata: Metadata = {
  title: "Services",
  description: "Manage service sections."
};

export default function ServicesPage() {
  return <AdminContentManager type="services" title="Services" description="Add and manage your service offerings." titleLabel="Service name" descriptionLabel="Service description" />;
}