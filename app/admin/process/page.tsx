import type { Metadata } from "next";
import { AdminPlaceholderPage } from "@/components/admin/AdminPlaceholderPage";

export const metadata: Metadata = {
  title: "Process Steps",
  description: "Manage process steps."
};

export default function ProcessAdminPage() {
  return (
    <AdminPlaceholderPage
      title="Process Steps"
      description="Manage process timeline content and ordering."
      items={[]}
    />
  );
}