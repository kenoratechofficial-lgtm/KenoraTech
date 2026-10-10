import { BarChart3, FolderKanban, Mail, Users } from "lucide-react";

export const stats = [
  { label: "Total Messages", value: 24, change: "+12.4%", icon: Mail },
  { label: "Total Projects", value: 18, change: "+4.8%", icon: FolderKanban },
  { label: "Total Visitors", value: 2543, change: "+18.2%", icon: Users },
  { label: "Total Inquiries", value: 156, change: "+9.7%", icon: BarChart3 }
];

export const visitorSeries = [
  { month: "Jan", value: 420 },
  { month: "Feb", value: 620 },
  { month: "Mar", value: 540 },
  { month: "Apr", value: 900 },
  { month: "May", value: 1220 },
  { month: "Jun", value: 1560 },
  { month: "Jul", value: 2543 }
];

export const sourceSeries = [
  { label: "Organic", value: "42%", color: "bg-[#8B5CF6]" },
  { label: "Social", value: "28%", color: "bg-[#3B82F6]" },
  { label: "Referral", value: "18%", color: "bg-[#22C55E]" },
  { label: "Direct", value: "12%", color: "bg-[#F59E0B]" }
];

export const activities = [
  "New contact inquiry from Rohan Shah",
  "Portfolio project marked as featured",
  "Pricing plan updated for Growth package",
  "Team member profile draft created"
];
