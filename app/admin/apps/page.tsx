import type { Metadata } from "next";
import { AppsManager } from "@/components/admin/AppsManager";

export const metadata: Metadata = { title: "Apps", description: "Manage app download and website links." };

export default function AppsPage() { return <AppsManager />; }
