"use client";

import { StatCard } from "@/components/admin/StatCard";
import { BriefcaseBusiness, FolderKanban, Mail, UsersRound } from "lucide-react";

export function DashboardStats({ messageCount, projectCount, applicationCount, jobCount }: { messageCount: number; projectCount: number; applicationCount: number; jobCount: number }) {
  const resolvedStats = [
    { label: "Contact Messages", value: messageCount, change: "Live total", icon: Mail },
    { label: "Portfolio Projects", value: projectCount, change: "Live total", icon: FolderKanban },
    { label: "Open Positions", value: jobCount, change: "Live total", icon: BriefcaseBusiness },
    { label: "Job Applications", value: applicationCount, change: "Live total", icon: UsersRound }
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {resolvedStats.map((stat, index) => (
        <StatCard key={stat.label} {...stat} index={index} />
      ))}
    </div>
  );
}
