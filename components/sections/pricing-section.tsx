import Link from "next/link";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/section-heading";
import { pricing } from "@/lib/content";
import { cn } from "@/lib/utils";

type PricingSectionProps = {
  compact?: boolean;
};

export function PricingSection({ compact = false }: PricingSectionProps) {
  return (
    <section className="section-band py-20">
      <div className="container">
        {!compact ? (
          <SectionHeading
            eyebrow="Pricing"
            title="Simple packages with room to scale."
            description="Start with a focused website package or choose a premium engagement for applications, automation and custom product work."
          />
        ) : null}
        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {pricing.map((plan) => (
            <div
              key={plan.name}
              className={cn(
                "rounded-lg border bg-card p-6 shadow-inner-border",
                plan.featured && "border-primary bg-primary text-primary-foreground shadow-soft-lg"
              )}
            >
              <p className={cn("text-sm font-semibold uppercase tracking-[0.18em] text-primary", plan.featured && "text-primary-foreground/80")}>
                {plan.name}
              </p>
              <p className="mt-5 text-4xl font-semibold tracking-tight">{plan.price}</p>
              <p className={cn("mt-4 leading-7 text-muted-foreground", plan.featured && "text-primary-foreground/82")}>
                {plan.description}
              </p>
              <div className="mt-6 grid gap-3">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-3">
                    <Check className="mt-0.5 h-4 w-4 flex-none" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
              <Button asChild className="mt-7 w-full" variant={plan.featured ? "secondary" : "default"}>
                <Link href="/contact">{plan.cta}</Link>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
