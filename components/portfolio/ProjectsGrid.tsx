"use client";

import { useEffect, useState } from "react";
import { ProjectCard } from "@/components/portfolio/ProjectCard";
import type { PortfolioProject } from "@/lib/portfolio";

const vikcastX: PortfolioProject = {
  id: "vikcastx", title: "VikcastX", category: "App", projectType: "app", status: "published",
  description: "Explore VikcastX on Android or visit the website.",
  details: "Explore VikcastX on Android or visit the VikcastX website.",
  result: "", tags: [], androidUrl: "https://vikcastx.com/download#android-download",
  websiteUrl: "https://vikcastx.com/", liveUrl: "https://vikcastx.com/",
  demoEnabled: false, demoRequiresApproval: false, watermarkEnabled: false, sortOrder: 0,
  createdAt: new Date(0).toISOString()
};

export function ProjectsGrid() {
  const [projects, setProjects] = useState<PortfolioProject[]>([]);
  useEffect(() => {
    void fetch("/api/portfolio", { cache: "no-store" })
      .then((response) => response.json())
      .then((body) => {
        const saved: PortfolioProject[] = Array.isArray(body?.projects) ? body.projects : [];
        setProjects(saved.some((item) => item.title.toLowerCase() === "vikcastx") ? saved : [vikcastX, ...saved]);
      })
      .catch(() => setProjects([vikcastX]));
  }, []);

  if (!projects.length) return null;
  const groups = [
    { key: "project", heading: "Projects", items: projects.filter((item) => !item.projectType || item.projectType === "project") },
    { key: "app", heading: "Apps", items: projects.filter((item) => item.projectType === "app") },
    { key: "website", heading: "Websites", items: projects.filter((item) => item.projectType === "website") },
    { key: "software", heading: "Software", items: projects.filter((item) => item.projectType === "software") }
  ];
  return <section className="container relative z-10 grid gap-12 pb-5">
    {groups.filter((group) => group.items.length > 0).map((group) => <div key={group.key}>
      <h2 className="mb-6 text-3xl font-black text-white">{group.heading}</h2>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">{group.items.map((project, index) => <ProjectCard key={project.id} project={project} index={index} />)}</div>
    </div>)}
  </section>;
}
