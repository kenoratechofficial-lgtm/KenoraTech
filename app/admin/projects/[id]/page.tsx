import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/admin/PageHeader";
import { ProjectForm } from "@/components/admin/projects/ProjectForm";
import { listPortfolioProjects } from "@/lib/portfolio";

export const metadata: Metadata = {
  title: "Edit Project",
  description: "Edit a KenoraTech portfolio project."
};

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const projects = await listPortfolioProjects().catch(() => []);
  const project = projects.find((item) => item.id === id);

  if (!project) {
    notFound();
  }

  return (
    <div className="grid gap-7">
      <PageHeader title="Edit Project" description="Update project details, media and display metadata." />
      <ProjectForm initialProject={project} />
    </div>
  );
}