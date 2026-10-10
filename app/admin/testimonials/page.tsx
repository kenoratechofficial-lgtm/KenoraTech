import type { Metadata } from "next";
import { AdminContentManager } from "@/components/admin/AdminContentManager";

export const metadata: Metadata = {
  title: "Testimonials",
  description: "Manage testimonials."
};

export default function TestimonialsPage() {
  return <AdminContentManager type="testimonials" title="Testimonials" description="Add and manage client reviews." titleLabel="Client name" descriptionLabel="Testimonial" />;
}