import type { Metadata } from "next";
import Link from "next/link";
import { Plus } from "lucide-react";
import { PageHeader } from "@/components/admin/PageHeader";
import { ProjectsTable } from "@/components/admin/projects/ProjectsTable";
import { DemoRequestsPanel } from "@/components/admin/projects/DemoRequestsPanel";

export const metadata: Metadata = {
  title: "Portfolio Projects",
  description: "Manage KenoraTech portfolio projects."
};

export default function ProjectsPage() {
  return (
    <div className="grid gap-7">
      <PageHeader
        title="Portfolio Projects"
        description="Manage projects, apps, websites, and software in one portfolio."
        action={
          <Link href="/admin/projects/new" className="inline-flex h-11 items-center gap-2 rounded-2xl bg-gradient-to-r from-[#8B5CF6] to-[#3B82F6] px-4 text-sm font-bold text-white shadow-[0_0_28px_rgba(59,130,246,0.24)]">
            <Plus className="h-4 w-4" />
            Add New Project
          </Link>
        }
      />
      <ProjectsTable />
      <DemoRequestsPanel />
    </div>
  );
}
