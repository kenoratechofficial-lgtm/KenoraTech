import type { Application } from "@/lib/applications";
import type { ContactSubmission } from "@/lib/contact-submissions";
import type { PortfolioProject } from "@/lib/portfolio";
import type { Job } from "@/lib/jobs";

type Activity = { id: string; text: string; date: string };
export function ActivityFeed({ messages, projects, applications, jobs }: { messages: ContactSubmission[]; projects: PortfolioProject[]; applications: Application[]; jobs: Job[] }) {
  const activities: Activity[] = [
    ...applications.map(item => ({ id: `application-${item.id}`, text: `${item.fullName} applied for ${item.jobTitle}`, date: item.createdAt })),
    ...messages.map(item => ({ id: `message-${item.id}`, text: `New contact message from ${item.name}`, date: item.createdAt })),
    ...projects.map(item => ({ id: `project-${item.id}`, text: `Project added: ${item.title}`, date: item.createdAt })),
    ...jobs.map(item => ({ id: `job-${item.id}`, text: `Job opening created: ${item.title}`, date: item.createdAt }))
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 5);
  return <section className="rounded-[24px] border border-white/[0.08] bg-[#0D1323]/82 p-5 backdrop-blur-2xl"><h2 className="text-lg font-bold text-white">Activity Feed</h2><div className="mt-5 grid gap-4">{activities.length ? activities.map(activity => <div key={activity.id} className="relative flex gap-3"><span className="mt-1 h-3 w-3 rounded-full bg-[#3B82F6] shadow-[0_0_14px_#3B82F6]" /><div><p className="text-sm font-medium text-white/76">{activity.text}</p><p className="mt-1 text-xs text-white/36">{new Date(activity.date).toLocaleString()}</p></div></div>) : <p className="rounded-2xl bg-white/[0.03] p-4 text-sm text-white/50">No recent activity yet.</p>}</div></section>;
}
