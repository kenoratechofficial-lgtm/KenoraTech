export type MessageStatus = "New" | "Read" | "Replied";

export interface AdminMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  date: string;
  status: MessageStatus;
}

export const messages: AdminMessage[] = [
  { id: "msg-1", name: "Aarav Mehta", email: "aarav@novacare.in", phone: "+91 98765 12001", subject: "SaaS dashboard build", date: "09 Jul 2026", status: "New" },
  { id: "msg-2", name: "Nisha Patel", email: "nisha@florist.ai", phone: "+91 98765 12002", subject: "AI website redesign", date: "08 Jul 2026", status: "Read" },
  { id: "msg-3", name: "Karan Iyer", email: "karan@finflow.app", phone: "+91 98765 12003", subject: "Mobile landing page", date: "07 Jul 2026", status: "Replied" },
  { id: "msg-4", name: "Priya Shah", email: "priya@aurex.co", phone: "+91 98765 12004", subject: "Brand identity", date: "06 Jul 2026", status: "New" },
  { id: "msg-5", name: "Dev Malhotra", email: "dev@cloudgrid.io", phone: "+91 98765 12005", subject: "Cloud migration", date: "05 Jul 2026", status: "Read" },
  { id: "msg-6", name: "Mira Joshi", email: "mira@jensnmart.com", phone: "+91 98765 12006", subject: "Marketplace platform", date: "04 Jul 2026", status: "Replied" }
];
