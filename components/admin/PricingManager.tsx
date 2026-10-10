"use client";

import { useEffect, useState } from "react";

type Plan = { name: string; originalPrice?: number; offerPrice?: number; priceLabel?: string; unit: "/project" | "/month" };

export function PricingManager() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [status, setStatus] = useState("");

  useEffect(() => {
    void fetch("/api/pricing").then((response) => response.json()).then((body) => setPlans(body.plans || [])).catch(() => setStatus("Unable to load pricing."));
  }, []);

  const update = (index: number, key: keyof Plan, value: string) => {
    setPlans((current) => current.map((plan, planIndex) => planIndex === index ? { ...plan, [key]: key === "originalPrice" || key === "offerPrice" ? Number(value) || undefined : value } : plan));
  };

  const save = async () => {
    setStatus("");
    const token = window.localStorage.getItem("kenora-admin-token") || "";
    const response = await fetch("/api/pricing", { method: "PUT", headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }, body: JSON.stringify({ plans }) });
    setStatus(response.ok ? "Pricing saved and live on the public pricing page." : "Unable to save pricing.");
  };

  return <div className="grid gap-7"><div><h1 className="text-3xl font-black text-white">Pricing Plans</h1><p className="mt-2 text-sm text-white/55">Update your plan prices and whether each price is per project or per month.</p></div><div className="grid gap-4">{plans.map((plan, index) => <article key={plan.name} className="grid gap-4 rounded-3xl border border-white/[0.08] bg-[#0D1323]/78 p-6 md:grid-cols-2"><label className="grid gap-2 text-sm text-white/70">Plan name<input value={plan.name} onChange={(event) => update(index, "name", event.target.value)} className="h-10 rounded-xl border border-white/[0.08] bg-[#050816] px-3 text-white" /></label>{plan.name === "Enterprise" ? <label className="grid gap-2 text-sm text-white/70">Price label<input value={plan.priceLabel || ""} onChange={(event) => update(index, "priceLabel", event.target.value)} className="h-10 rounded-xl border border-white/[0.08] bg-[#050816] px-3 text-white" /></label> : <><label className="grid gap-2 text-sm text-white/70">Original price<input type="number" value={plan.originalPrice || ""} onChange={(event) => update(index, "originalPrice", event.target.value)} className="h-10 rounded-xl border border-white/[0.08] bg-[#050816] px-3 text-white" /></label><label className="grid gap-2 text-sm text-white/70">Offer price<input type="number" value={plan.offerPrice || ""} onChange={(event) => update(index, "offerPrice", event.target.value)} className="h-10 rounded-xl border border-white/[0.08] bg-[#050816] px-3 text-white" /></label><label className="grid gap-2 text-sm text-white/70">Price unit<select value={plan.unit} onChange={(event) => update(index, "unit", event.target.value)} className="h-10 rounded-xl border border-white/[0.08] bg-[#050816] px-3 text-white"><option value="/project">Per project</option><option value="/month">Per month</option></select></label></>}</article>)}</div><button onClick={() => void save()} className="h-11 w-fit rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#3B82F6] px-5 text-sm font-bold text-white">Save Pricing</button>{status ? <p className="text-sm text-white/65">{status}</p> : null}</div>;
}
