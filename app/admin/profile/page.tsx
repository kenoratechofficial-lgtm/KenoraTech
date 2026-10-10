import type { Metadata } from "next";
import { AdminContentManager } from "@/components/admin/AdminContentManager";

export const metadata: Metadata = {
  title: "Admin Profile",
  description: "Manage admin profile."
};

export default function ProfilePage() {
  return <AdminContentManager type="profile" title="Admin Profile" description="Save administrator profile details and preferences." titleLabel="Profile field" descriptionLabel="Value" />;
}