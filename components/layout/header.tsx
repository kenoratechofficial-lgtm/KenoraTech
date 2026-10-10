"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ArrowRight, Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { navItems } from "@/lib/content";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header
      className="sticky top-0 z-50 border-b border-white/5 bg-[#030711]/95 text-white backdrop-blur-xl"
      suppressHydrationWarning
    >
      <div className="container flex h-[86px] items-center justify-between">
        <Link href="/" className="flex items-center gap-3" aria-label="Kenora Tech home">
          <Image
            src="/kenora-tech-logo.png"
            alt="Kenora Tech"
            width={46}
            height={46}
            priority
            className="h-11 w-11 rounded-md object-contain"
          />
          <span className="text-xl font-extrabold tracking-normal">
            Kenora<span className="text-[#7d3cff]">Tech</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Main navigation">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative px-1 py-2 text-sm font-medium text-white transition hover:text-[#35b7ff]",
                pathname === item.href &&
                  "text-white after:absolute after:bottom-0 after:left-1/2 after:h-0.5 after:w-10 after:-translate-x-1/2 after:rounded-full after:bg-[#20a8ff] after:shadow-[0_0_10px_#20a8ff]"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <Link
            href="/contact"
            className="inline-flex h-12 items-center gap-4 rounded-lg bg-gradient-to-r from-[#8c1cff] to-[#19a8ff] px-5 text-sm font-bold text-white shadow-[0_0_30px_rgba(105,51,255,0.28)] transition hover:scale-[1.02]"
          >
            Start Your Project
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>

        <div className="flex items-center gap-1 lg:hidden">
          <Button
            size="icon"
            variant="ghost"
            aria-label="Toggle menu"
            className="text-white hover:bg-white/10"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-white/10 bg-[#030711] lg:hidden">
          <nav className="container grid gap-1 py-4" aria-label="Mobile navigation">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-3 text-sm font-medium text-white/76 hover:bg-white/10 hover:text-white"
              >
                {item.label}
              </Link>
            ))}
            <Button asChild className="mt-2 bg-gradient-to-r from-[#8c1cff] to-[#19a8ff] text-white">
              <Link href="/contact" onClick={() => setOpen(false)}>
                Start Your Project
              </Link>
            </Button>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
