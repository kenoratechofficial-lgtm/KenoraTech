"use client";

import { useEffect, useState } from "react";
import { Quote } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { testimonials } from "@/lib/content";

export function TestimonialsSection() {
  const [managedTestimonials, setManagedTestimonials] = useState<Array<{ title: string; description: string }>>([]);
  const displayedTestimonials = managedTestimonials.length
    ? managedTestimonials.map((item) => ({ name: item.title, role: "Client", quote: item.description }))
    : testimonials;

  useEffect(() => {
    void fetch("/api/admin/content/testimonials", { cache: "no-store" })
      .then((response) => response.json())
      .then((body) => setManagedTestimonials(Array.isArray(body?.items) ? body.items : []))
      .catch(() => setManagedTestimonials([]));
  }, []);

  return (
    <section className="section-band bg-card/45 py-20">
      <div className="container">
        <SectionHeading
          eyebrow="Testimonials"
          title="Clients remember the calm process as much as the polished launch."
          description="Kenora Tech is built for teams who want speed, taste and accountable communication from first call to final handoff."
        />
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {displayedTestimonials.map((item) => (
            <figure key={item.name} className="rounded-lg border bg-background p-6 shadow-inner-border">
              <Quote className="h-6 w-6 text-primary" />
              <blockquote className="mt-5 leading-7 text-muted-foreground">“{item.quote}”</blockquote>
              <figcaption className="mt-6">
                <p className="font-semibold">{item.name}</p>
                <p className="text-sm text-muted-foreground">{item.role}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
