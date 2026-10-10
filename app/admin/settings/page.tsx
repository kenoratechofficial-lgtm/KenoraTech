import type { Metadata } from "next";
import { AdminContentManager } from "@/components/admin/AdminContentManager";

export const metadata: Metadata = {
  title: "Website Settings",
  description: "Manage website settings."
};

export default function SettingsPage() {
  return <AdminContentManager type="settings" title="Website Settings" description="Save website contact details and global settings." titleLabel="Setting name" descriptionLabel="Setting value" />;
}