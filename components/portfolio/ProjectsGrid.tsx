"use client";

import { useEffect, useState } from "react";
import { ProjectCard } from "@/components/portfolio/ProjectCard";
import type { PortfolioProject } from "@/lib/portfolio";

export function ProjectsGrid() {
  const [projects, setProjects] = useState<PortfolioProject[]>([]);

  useEffect(() => {
    void fetch("/api/portfolio", { cache: "no-store" })
      .then((response) => response.json())
      .then((body) => setProjects(Array.isArray(body?.projects) ? body.projects : []))
      .catch(() => setProjects([]));
  }, []);

  if (projects.length === 0) return null;

  return (
    <section className="container relative z-10 pb-5">
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {projects.map((project, index) => (
          <ProjectCard key={project.title} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}
