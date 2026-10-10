import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="container flex min-h-[calc(68vh-4rem)] items-center py-14 md:py-20">
      <div className="mx-auto max-w-4xl text-center">
        <div className="inline-flex items-center gap-2 rounded-full border bg-card/80 px-3 py-1 text-sm text-muted-foreground shadow-inner-border">
          <CheckCircle2 className="h-4 w-4 text-primary" />
          Digital products for ambitious businesses
        </div>
        <h1 className="mt-6 text-balance text-5xl font-semibold tracking-tight md:text-7xl">
          Transforming Ideas Into Digital Products
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground md:text-xl">
          Kenora Tech builds modern websites, web applications and digital solutions for businesses.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button asChild size="lg">
            <Link href="/book-consultation">
              Get Free Consultation <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/portfolio">View Portfolio</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
