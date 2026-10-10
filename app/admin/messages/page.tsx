import type { Metadata } from "next";
import { PageHeader } from "@/components/admin/PageHeader";
import { MessagesTable } from "@/components/admin/messages/MessagesTable";

export const metadata: Metadata = {
  title: "Contact Messages",
  description: "Manage KenoraTech contact messages."
};

export default function MessagesPage() {
  return (
    <div className="grid gap-7">
      <PageHeader
        title="Contact Messages"
        description="Review, reply and manage inbound project inquiries."
      />
      <MessagesTable />
    </div>
  );
}