import type { Metadata } from "next";
import { PageHeader } from "@/components/admin/PageHeader";
import { AppointmentsManager } from "@/components/admin/AppointmentsManager";
export const metadata: Metadata = { title: "Bookings", description: "Manage KenoraTech consultation bookings." };
export default function AppointmentsPage() { return <div className="grid gap-7"><PageHeader title="Bookings & Appointments" description="Review, confirm, complete, or cancel consultation requests."/><AppointmentsManager/></div>; }