import type { Metadata } from "next";
import { TeamManager } from "@/components/admin/TeamManager";

export const metadata: Metadata = {
  title: "Team Members",
  description: "Manage team members."
};

export default function TeamPage() {
  return <TeamManager />;
}