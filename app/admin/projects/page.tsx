import type { Metadata } from "next";
import Link from "next/link";
import { Plus } from "lucide-react";
import { PageHeader } from "@/components/admin/PageHeader";
import { SearchBar } from "@/components/admin/SearchBar";
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
        description="Organize published projects, drafts, featured work and display order."
        action={
          <Link href="/admin/projects/new" className="inline-flex h-11 items-center gap-2 rounded-2xl bg-gradient-to-r from-[#8B5CF6] to-[#3B82F6] px-4 text-sm font-bold text-white shadow-[0_0_28px_rgba(59,130,246,0.24)]">
            <Plus className="h-4 w-4" />
            Add New Project
          </Link>
        }
      />
      <div className="grid gap-4 lg:grid-cols-[1fr_190px]">
        <SearchBar placeholder="Search projects..." />
        <select className="h-11 rounded-2xl border border-white/[0.08] bg-[#0D1323]/78 px-4 text-sm text-white/70 outline-none">
          <option>All Status</option>
          <option>Published</option>
          <option>Draft</option>
        </select>
      </div>
      <ProjectsTable />
      <DemoRequestsPanel />
      <div className="flex items-center justify-between text-sm text-white/46">
        <span>Showing 1-5 of 18 projects</span>
        <div className="flex gap-2">
          <button className="rounded-xl border border-white/[0.08] px-3 py-2">Previous</button>
          <button className="rounded-xl border border-[#8B5CF6]/30 bg-[#8B5CF6]/14 px-3 py-2 text-white">1</button>
          <button className="rounded-xl border border-white/[0.08] px-3 py-2">Next</button>
        </div>
      </div>
    </div>
  );
}