import type { Metadata } from "next";
import { PageHeader } from "@/components/admin/PageHeader";
import { ProjectForm } from "@/components/admin/projects/ProjectForm";

export const metadata: Metadata = {
  title: "Add Project",
  description: "Add a new KenoraTech portfolio project."
};

export default function AddProjectPage() {
  return (
    <div className="grid gap-7">
      <PageHeader title="Add New Project" description="Create a polished portfolio case study with media, project details and publishing controls." />
      <ProjectForm />
    </div>
  );
}