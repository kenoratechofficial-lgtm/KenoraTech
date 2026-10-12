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
      <PageHeader title="Add New Project" description="Choose a portfolio type, add its links and details, and upload a cover image or app logo." />
      <ProjectForm />
    </div>
  );
}
