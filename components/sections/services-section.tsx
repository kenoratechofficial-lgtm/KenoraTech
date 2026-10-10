"use client";

import { useEffect, useState } from "react";
import { Code2, LayoutDashboard, Palette, ShoppingBag, Smartphone, Wand2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SectionHeading } from "@/components/section-heading";

const fallbackServices = [
  { icon: Code2, title: "Web Development", description: "We build fast, responsive and scalable websites using modern technologies to help your brand stand out." },
  { icon: Smartphone, title: "Mobile Development", description: "Custom mobile applications for iOS and Android that deliver seamless experiences and real results." },
  { icon: Wand2, title: "UI/UX Design", description: "We design intuitive, engaging and user-centered interfaces that leave a lasting impression." }
];
const serviceIcons = { code: Code2, mobile: Smartphone, design: Wand2, dashboard: LayoutDashboard, commerce: ShoppingBag, palette: Palette, sparkles: Wand2 };

type ServicesSectionProps = {
  compact?: boolean;
};

export function ServicesSection({ compact = false }: ServicesSectionProps) {
  const [managedServices, setManagedServices] = useState<Array<{ title: string; description: string; icon?: string }>>([]);
  const services = managedServices.length
    ? managedServices.map((service) => ({ ...service, icon: (service.icon ? serviceIcons[service.icon as keyof typeof serviceIcons] : undefined) || fallbackServices.find((fallback) => fallback.title === service.title)?.icon || Code2 }))
    : fallbackServices;

  useEffect(() => {
    void fetch("/api/admin/content/services", { cache: "no-store" })
      .then((response) => response.json())
      .then((body) => setManagedServices(Array.isArray(body?.items) ? body.items : []))
      .catch(() => setManagedServices([]));
  }, []);

  return (
    <section className="section-band py-20">
      <div className="container">
        {!compact ? (
          <SectionHeading
            eyebrow="Services"
            title="Everything you need to launch, improve and scale online."
            description="We bring design taste and engineering discipline together across websites, applications, commerce and long-term maintenance."
          />
        ) : null}
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Card key={service.title} className="h-full transition hover:-translate-y-1 hover:shadow-soft-lg">
              <CardHeader>
                <div className="grid h-11 w-11 place-items-center rounded-md bg-secondary text-primary">
                  <service.icon className="h-5 w-5" />
                </div>
                <CardTitle>{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="leading-7 text-muted-foreground">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
