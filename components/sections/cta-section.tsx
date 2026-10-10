import Link from "next/link";
import { CalendarCheck, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CtaSection() {
  return (
    <section className="section-band py-20">
      <div className="container">
        <div className="rounded-lg border bg-[linear-gradient(135deg,hsl(var(--primary)),hsl(218_72%_17%))] p-8 text-primary-foreground shadow-soft-lg md:p-12">
          <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/72">Free consultation</p>
              <h2 className="mt-4 max-w-3xl text-balance text-3xl font-semibold tracking-tight md:text-5xl">
                Ready to turn your next idea into a polished digital product?
              </h2>
              <p className="mt-5 max-w-2xl leading-8 text-white/76">
                Share your goals and Kenora Tech will help you choose the leanest path to a premium, scalable launch.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row md:flex-col">
              <Button asChild size="lg" variant="secondary">
                <Link href="/book-consultation">
                  <CalendarCheck className="h-4 w-4" /> Get Free Consultation
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white/30 bg-white/10 text-white hover:bg-white/16">
                <Link href="https://wa.me/+917383530982" target="_blank" rel="noreferrer">
                  <MessageSquare className="h-4 w-4" /> WhatsApp Us
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
