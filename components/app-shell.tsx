"use client";

import { usePathname } from "next/navigation";
import { Suspense } from "react";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { DynamicBackground } from "@/components/dynamic-background";
import { ComingSoonPage } from "@/components/coming-soon-page";
import { AnalyticsTracker } from "@/components/analytics-tracker";

// Set to false after launch to restore every existing public page unchanged.
const LAUNCH_MODE = false;

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) {
    return <main>{children}</main>;
  }

  if (LAUNCH_MODE) {
    return <ComingSoonPage />;
  }

  return (
    <div className="relative z-0 flex min-h-screen flex-col bg-transparent">
      <Suspense fallback={null}><AnalyticsTracker /></Suspense>
      <DynamicBackground />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
