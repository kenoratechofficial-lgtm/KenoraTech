import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = { title: "Apps", description: "Manage app download and website links." };

export default function AppsPage() { redirect("/admin/projects"); }
