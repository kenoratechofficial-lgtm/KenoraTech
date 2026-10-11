"use client";

import { useEffect, useState } from "react";

type Plan = { name: string; price: number; pricePrefix?: string; description: string; subtext: string; features: string[] | string; cta: string; popular?: boolean };
const blankPlan: Plan = { name: "New service", price: 0, description: "", subtext: "", features: [], cta: "Get Started" };

export function PricingManager() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [status, setStatus] = useState("");

  useEffect(() => {
    void fetch("/api/pricing", { cache: "no-store" }).then(async (response) => {
      const body = await response.json();
      if (!response.ok) throw new Error(body.error || "Unable to load pricing.");
      setPlans(body.plans || []);
    }).catch((error: Error) => setStatus(error.message || "Unable to load pricing."));
  }, []);

  const update = (index: number, key: keyof Plan, value: string | boolean) => {
    setPlans((current) => current.map((plan, i) => i === index ? { ...plan, [key]: key === "price" ? Number(value) || 0 : value } : plan));
  };
  const updateFeatures = (index: number, value: string) => setPlans((current) => current.map((plan, i) => i === index ? { ...plan, features: value } : plan));
  const save = async () => {
    setStatus("Saving...");
    try {
      const token = window.localStorage.getItem("kenora-admin-token") || "";
      const response = await fetch("/api/pricing", { method: "PUT", headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }, body: JSON.stringify({ plans: plans.map((plan) => ({ ...plan, features: typeof plan.features === "string" ? plan.features.split("\n").map((item) => item.trim()).filter(Boolean) : plan.features })) }) });
      const body = await response.json();
      setStatus(response.ok ? "Pricing saved and live on the public pricing page." : body.error || "Unable to save pricing.");
    } catch { setStatus("Unable to save pricing. Check your connection and try again."); }
  };

  return <div className="grid gap-7">
    <div><h1 className="text-3xl font-black text-white">Pricing Plans</h1><p className="mt-2 text-sm text-white/55">Edit prices, descriptions, features, and the “From” label shown on the public pricing page.</p></div>
    <div className="grid gap-4">{plans.map((plan, index) => <article key={`${plan.name}-${index}`} className="grid gap-4 rounded-3xl border border-white/[0.08] bg-[#0D1323]/78 p-6 md:grid-cols-2">
      <label className="grid gap-2 text-sm text-white/70">Service name<input value={plan.name} onChange={(e) => update(index, "name", e.target.value)} className="h-10 rounded-xl border border-white/[0.08] bg-[#050816] px-3 text-white" /></label>
      <label className="grid gap-2 text-sm text-white/70">Price in INR<input type="number" min="1" value={plan.price || ""} onChange={(e) => update(index, "price", e.target.value)} className="h-10 rounded-xl border border-white/[0.08] bg-[#050816] px-3 text-white" /></label>
      <label className="grid gap-2 text-sm text-white/70">Price prefix (optional)<input placeholder="From" value={plan.pricePrefix || ""} onChange={(e) => update(index, "pricePrefix", e.target.value)} className="h-10 rounded-xl border border-white/[0.08] bg-[#050816] px-3 text-white" /></label>
      <label className="grid gap-2 text-sm text-white/70">Button text<input value={plan.cta} onChange={(e) => update(index, "cta", e.target.value)} className="h-10 rounded-xl border border-white/[0.08] bg-[#050816] px-3 text-white" /></label>
      <label className="grid gap-2 text-sm text-white/70 md:col-span-2">Description<textarea rows={2} value={plan.description} onChange={(e) => update(index, "description", e.target.value)} className="rounded-xl border border-white/[0.08] bg-[#050816] p-3 text-white" /></label>
      <label className="grid gap-2 text-sm text-white/70 md:col-span-2">Supporting text<textarea rows={2} value={plan.subtext} onChange={(e) => update(index, "subtext", e.target.value)} className="rounded-xl border border-white/[0.08] bg-[#050816] p-3 text-white" /></label>
      <label className="grid gap-2 text-sm text-white/70 md:col-span-2">Features (one per line)<textarea rows={4} value={Array.isArray(plan.features) ? plan.features.join("\n") : plan.features} onChange={(e) => updateFeatures(index, e.target.value)} className="rounded-xl border border-white/[0.08] bg-[#050816] p-3 text-white" /></label>
      <label className="flex items-center gap-2 text-sm text-white/70"><input type="checkbox" checked={Boolean(plan.popular)} onChange={(e) => update(index, "popular", e.target.checked)} />Mark as most popular</label>
      <button type="button" onClick={() => setPlans((items) => items.filter((_, i) => i !== index))} className="justify-self-end text-sm text-red-300">Remove plan</button>
    </article>)}</div>
    {plans.length < 10 ? <button type="button" onClick={() => setPlans((items) => [...items, { ...blankPlan, features: [] }])} className="h-10 w-fit rounded-xl border border-white/15 px-4 text-sm text-white">Add plan</button> : null}
    <button onClick={() => void save()} className="h-11 w-fit rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#3B82F6] px-5 text-sm font-bold text-white">Save Pricing</button>
    {status ? <p className="text-sm text-white/65">{status}</p> : null}
  </div>;
}
