export type ProjectStatus = "Published" | "Draft";

export interface AdminProject {
  id: string;
  title: string;
  category: string;
  image: string;
  technologies: string[];
  status: ProjectStatus;
  featured: boolean;
  order: number;
}

export const adminProjects: AdminProject[] = [
  { id: "pro-1", title: "JensnMart", category: "E-commerce", image: "/portfolio/jensnmart.svg", technologies: ["Next.js", "MongoDB", "Stripe"], status: "Published", featured: true, order: 1 },
  { id: "pro-2", title: "FloraMind AI", category: "AI Product", image: "/portfolio/floramind-ai.svg", technologies: ["React", "AI", "CMS"], status: "Published", featured: true, order: 2 },
  { id: "pro-3", title: "Analytics Dashboard", category: "SaaS", image: "/portfolio/analytics-dashboard.svg", technologies: ["Charts", "Auth", "API"], status: "Published", featured: false, order: 3 },
  { id: "pro-4", title: "Cloud Infrastructure", category: "DevOps", image: "/portfolio/cloud-infrastructure.svg", technologies: ["AWS", "Docker", "CI/CD"], status: "Draft", featured: false, order: 4 },
  { id: "pro-5", title: "Aurex Branding", category: "Branding", image: "/portfolio/aurex-branding.svg", technologies: ["Identity", "UI Kit"], status: "Published", featured: false, order: 5 }
];
