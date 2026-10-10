"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Minus } from "lucide-react";
import { comparisonRows } from "@/components/pricing/pricing-data";

const columns = ["Starter", "Growth", "Business", "Enterprise"] as const;

function CellValue({ value }: { value: string | boolean }) {
  if (value === true) {
    return <CheckCircle2 className="mx-auto h-5 w-5 text-[#8c38ff]" aria-label="Included" />;
  }

  if (value === false) {
    return <Minus className="mx-auto h-5 w-5 text-white/42" aria-label="Not included" />;
  }

  return <span>{value}</span>;
}

export function ComparisonTable() {
  return (
    <section className="container py-5">
      <motion.div
        initial={{ opacity: 0, y: 34 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className="overflow-hidden rounded-3xl border border-white/[0.08] bg-[#071020]/72 shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_18px_70px_rgba(0,0,0,0.24)] backdrop-blur-2xl"
      >
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] border-collapse text-left text-sm text-white">
            <caption className="sr-only">Pricing plan comparison</caption>
            <thead>
              <tr className="border-b border-white/[0.08] bg-white/[0.02]">
                <th scope="col" className="px-6 py-5 font-bold">
                  Features
                </th>
                {columns.map((column) => (
                  <th key={column} scope="col" className="px-6 py-5 text-center font-bold">
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row) => (
                <tr key={row.feature} className="border-b border-white/[0.06] transition hover:bg-white/[0.035] last:border-b-0">
                  <th scope="row" className="px-6 py-4 font-medium text-white">
                    {row.feature}
                  </th>
                  <td className="px-6 py-4 text-center text-white/78">
                    <CellValue value={row.starter} />
                  </td>
                  <td className="px-6 py-4 text-center text-white/78">
                    <CellValue value={row.growth} />
                  </td>
                  <td className="px-6 py-4 text-center text-white/78">
                    <CellValue value={row.business} />
                  </td>
                  <td className="px-6 py-4 text-center text-white/78">
                    <CellValue value={row.enterprise} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </section>
  );
}
