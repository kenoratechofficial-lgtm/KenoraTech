import type { Metadata } from "next";
import { JobsManager } from "@/components/admin/JobsManager";

export const metadata: Metadata = { title: "Careers & Jobs", description: "Manage KenoraTech career opportunities." };

export default function JobsPage() { return <JobsManager />; }