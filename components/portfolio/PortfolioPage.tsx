"use client";

import { PortfolioCTA } from "@/components/portfolio/PortfolioCTA";
import { PortfolioHero } from "@/components/portfolio/PortfolioHero";
import { ProjectsGrid } from "@/components/portfolio/ProjectsGrid";

const starPositions = [
  "left-[5%] top-[9%]",
  "left-[18%] top-[35%]",
  "left-[44%] top-[12%]",
  "right-[7%] top-[18%]",
  "right-[20%] top-[52%]",
  "right-[44%] bottom-[18%]",
  "left-[28%] bottom-[12%]"
];

export function PortfolioPage() {
  return (
    <div className="relative overflow-hidden bg-[#050816] text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_12%,rgba(139,28,255,0.13),transparent_24rem),radial-gradient(circle_at_78%_10%,rgba(0,168,255,0.16),transparent_26rem),linear-gradient(180deg,#050816_0%,#02050f_58%,#050816_100%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[680px] bg-[linear-gradient(90deg,transparent_0,rgba(139,92,246,0.045)_1px,transparent_1px),linear-gradient(0deg,transparent_0,rgba(59,130,246,0.035)_1px,transparent_1px)] bg-[size:76px_76px] opacity-30" />
      {starPositions.map((position) => (
        <span key={position} className={`pointer-events-none absolute ${position} h-1 w-1 rounded-full bg-[#45bdff] shadow-[0_0_14px_#45bdff]`} />
      ))}
      <div className="relative">
        <PortfolioHero />
        <ProjectsGrid />
        <PortfolioCTA />
      </div>
    </div>
  );
}
