import type { Metadata } from "next";
import { PageHeader } from "@/components/admin/PageHeader";
import { DashboardStats } from "@/components/admin/dashboard/DashboardStats";
import { VisitorsChart } from "@/components/admin/dashboard/VisitorsChart";
import { RecentMessages } from "@/components/admin/dashboard/RecentMessages";
import { ActivityFeed } from "@/components/admin/dashboard/ActivityFeed";
import { AnalyticsPanel } from "@/components/admin/AnalyticsPanel";
import { listContactSubmissions } from "@/lib/contact-submissions";
import { listPortfolioProjects } from "@/lib/portfolio";
import { listApplications } from "@/lib/applications";
import { listJobs } from "@/lib/jobs";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "KenoraTech admin dashboard overview."
};

export default async function DashboardPage() {
  const [messages, projects, applications, jobs] = await Promise.all([
    listContactSubmissions().catch(() => []),
    listPortfolioProjects().catch(() => []),
    listApplications().catch(() => []),
    listJobs(true).catch(() => [])
  ]);

  return (
    <div className="grid gap-7">
      <PageHeader title="Dashboard" description="Welcome back, Admin. Here is what is happening across KenoraTech." />
      <DashboardStats messageCount={messages.length} projectCount={projects.length} applicationCount={applications.length} jobCount={jobs.length} />
      <AnalyticsPanel />
      <VisitorsChart applications={applications} />
      <div className="grid gap-5 xl:grid-cols-3">
        <RecentMessages messages={messages} />
        <section className="rounded-[24px] border border-white/[0.08] bg-[#0D1323]/82 p-5 backdrop-blur-2xl">
          <h2 className="text-lg font-bold text-white">Recent Projects</h2>
          <div className="mt-4 grid gap-3">
            {projects.length > 0 ? projects.slice(0, 4).map((project) => (
              <div key={project.id} className="flex items-center justify-between gap-3 rounded-2xl bg-white/[0.03] p-3">
                <div>
                  <p className="text-sm font-bold text-white">{project.title}</p>
                  <p className="mt-1 text-xs text-white/46">{project.category}</p>
                </div>
                <span className="text-xs font-bold text-[#8EC5FF]">#{project.sortOrder}</span>
              </div>
            )) : <p className="rounded-2xl bg-white/[0.03] p-4 text-sm text-white/50">No projects yet.</p>}
          </div>
        </section>
        <ActivityFeed messages={messages} projects={projects} applications={applications} jobs={jobs} />
      </div>
    </div>
  );
}