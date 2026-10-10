"use client";

import Image from "next/image";
import { useState } from "react";
import { Bold, CalendarDays, CheckCircle2, ImagePlus, Italic, Link2, List, UploadCloud } from "lucide-react";
import type { PortfolioProject } from "@/lib/portfolio";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="grid gap-2 text-sm font-semibold text-white/78">
      {label}
      {children}
    </label>
  );
}

const inputClass = "h-11 rounded-2xl border border-white/[0.08] bg-[#050816]/60 px-4 text-sm text-white outline-none transition placeholder:text-white/34 focus:border-[#3B82F6]/70 focus:ring-2 focus:ring-[#3B82F6]/18";
const textareaClass = "min-h-28 rounded-2xl border border-white/[0.08] bg-[#050816]/60 px-4 py-3 text-sm leading-6 text-white outline-none transition placeholder:text-white/34 focus:border-[#3B82F6]/70 focus:ring-2 focus:ring-[#3B82F6]/18";

const emptyForm = {
  title: "",
  category: "",
  description: "",
  result: "",
  tags: "",
  imageUrl: "",
  liveUrl: "",
  sortOrder: "0",
  demoUrl: ""
};

export function ProjectForm({ initialProject }: { initialProject?: PortfolioProject }) {
  const [form, setForm] = useState({
    title: initialProject?.title || emptyForm.title,
    category: initialProject?.category || emptyForm.category,
    description: initialProject?.description || emptyForm.description,
    result: initialProject?.result || emptyForm.result,
    tags: initialProject?.tags.join(", ") || emptyForm.tags,
    imageUrl: initialProject?.imageUrl || emptyForm.imageUrl,
    liveUrl: initialProject?.liveUrl || emptyForm.liveUrl,
    sortOrder: String(initialProject?.sortOrder ?? 0),
    demoUrl: ""
  });
  const [demoEnabled, setDemoEnabled] = useState(initialProject?.demoEnabled || false);
  const [demoRequiresApproval, setDemoRequiresApproval] = useState(initialProject?.demoRequiresApproval || false);
  const [watermarkEnabled, setWatermarkEnabled] = useState(initialProject?.watermarkEnabled || false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);

  function updateField(field: keyof typeof form, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function uploadCoverImage(file?: File) {
    if (!file) return;
    setUploading(true);
    setError("");
    try {
      const token = window.localStorage.getItem("kenora-admin-token") || "";
      const data = new FormData();
      data.set("image", file);
      const response = await fetch("/api/admin/portfolio-image", { method: "POST", headers: { Authorization: `Bearer ${token}` }, body: data });
      const body = await response.json().catch(() => null);
      if (!response.ok || !body?.imageUrl) throw new Error(body?.error || "Image upload failed.");
      updateField("imageUrl", body.imageUrl);
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : "Image upload failed.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <form
      className="grid gap-5 xl:grid-cols-3"
      onSubmit={async (event) => {
        event.preventDefault();
        setSaved(false);
        setError("");

        const token = window.localStorage.getItem("kenora-admin-token") || "";
        const response = await fetch(initialProject ? `/api/portfolio/${initialProject.id}` : "/api/portfolio", {
          method: initialProject ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            ...form,
            sortOrder: Number(form.sortOrder || 0),
            demoEnabled,
            demoRequiresApproval,
            demoUrl: form.demoUrl,
            watermarkEnabled,
            tags: form.tags.split(",").map((tag) => tag.trim()).filter(Boolean)
          })
        });

        if (!response.ok) {
          const body = await response.json().catch(() => null);
          setError(body?.error || "Project could not be saved.");
          return;
        }

        setSaved(true);
      }}
    >
      <section className="rounded-[24px] border border-white/[0.08] bg-[#0D1323]/82 p-5 backdrop-blur-2xl">
        <h2 className="text-lg font-bold text-white">Basic Information</h2>
        <div className="mt-5 grid gap-4">
          <Field label="Project Name">
            <input className={inputClass} value={form.title} onChange={(event) => updateField("title", event.target.value)} placeholder="FloraMind AI" required />
          </Field>
          <Field label="Category">
            <input className={inputClass} value={form.category} onChange={(event) => updateField("category", event.target.value)} placeholder="Web Development" required />
          </Field>
          <Field label="Short Description">
            <textarea className={textareaClass} value={form.description} onChange={(event) => updateField("description", event.target.value)} placeholder="A short card-ready project summary." required />
          </Field>
          <Field label="Full Description">
            <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-[#050816]/60">
              <div className="flex gap-1 border-b border-white/[0.08] p-2">
                {[Bold, Italic, List, Link2].map((Icon, index) => (
                  <button key={index} type="button" className="flex h-9 w-9 items-center justify-center rounded-xl text-white/60 transition hover:bg-white/[0.06] hover:text-white">
                    <Icon className="h-4 w-4" />
                  </button>
                ))}
              </div>
              <textarea className="min-h-40 w-full bg-transparent px-4 py-3 text-sm leading-6 text-white outline-none placeholder:text-white/34" value={form.result} onChange={(event) => updateField("result", event.target.value)} placeholder="Write the case study overview/result..." required />
            </div>
          </Field>
        </div>
      </section>

      <section className="rounded-[24px] border border-white/[0.08] bg-[#0D1323]/82 p-5 backdrop-blur-2xl">
        <h2 className="text-lg font-bold text-white">Media</h2>
        <div className="mt-5 grid gap-4">
          <label className="grid min-h-48 cursor-pointer place-items-center overflow-hidden rounded-[24px] border border-dashed border-[#8B5CF6]/30 bg-[#050816]/52 p-6 text-center transition hover:border-[#3B82F6]/70">
            <div>
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#8B5CF6]/22 to-[#3B82F6]/22 text-[#9CCBFF]">
                <UploadCloud className="h-7 w-7" />
              </div>
              <p className="mt-4 text-sm font-bold text-white">{uploading ? "Uploading image..." : form.imageUrl ? "Cover image uploaded — choose another" : "Choose cover image"}</p>
              <p className="mt-1 text-xs text-white/44">PNG, JPG or WebP up to 8MB</p>
              {form.imageUrl ? <div className="relative mx-auto mt-4 h-20 w-32 overflow-hidden rounded-lg border border-white/10"><Image src={form.imageUrl} alt="Uploaded project cover preview" fill sizes="128px" className="object-cover" /></div> : null}
            </div>
            <input type="file" accept="image/png,image/jpeg,image/webp" className="sr-only" disabled={uploading} onChange={(event) => { void uploadCoverImage(event.target.files?.[0]); event.currentTarget.value = ""; }} />
          </label>
          <div>
            <p className="text-sm font-semibold text-white/78">Gallery Upload</p>
            <div className="mt-3 grid grid-cols-3 gap-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <button key={index} type="button" className="grid aspect-square place-items-center rounded-2xl border border-white/[0.08] bg-[#050816]/60 text-white/40 transition hover:border-[#3B82F6]/50 hover:text-white">
                  <ImagePlus className="h-5 w-5" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-[24px] border border-white/[0.08] bg-[#0D1323]/82 p-5 backdrop-blur-2xl">
        <h2 className="text-lg font-bold text-white">Project Details</h2>
        <div className="mt-5 grid gap-4">
          <Field label="Technologies Used">
            <input className={inputClass} value={form.tags} onChange={(event) => updateField("tags", event.target.value)} placeholder="Next.js, MongoDB, Tailwind" />
          </Field>
          <Field label="Live Demo URL">
            <input className={inputClass} value={form.liveUrl} onChange={(event) => updateField("liveUrl", event.target.value)} placeholder="https://example.com" />
          </Field>
          <Field label="Cover Image URL">
            <input className={inputClass} value={form.imageUrl} onChange={(event) => updateField("imageUrl", event.target.value)} placeholder="https://..." />
          </Field>
          <Field label="Sort Order">
            <input className={inputClass} type="number" value={form.sortOrder} onChange={(event) => updateField("sortOrder", event.target.value)} />
          </Field>
          <div className="grid gap-3 rounded-2xl border border-white/[0.08] bg-[#050816]/60 p-4">
            <p className="text-sm font-bold text-white">Protected Demo Settings</p>
            <label className="flex items-center justify-between gap-3 text-sm text-white/70"><span>Demo enabled</span><input type="checkbox" checked={demoEnabled} onChange={(event) => { setDemoEnabled(event.target.checked); if (!event.target.checked) setDemoRequiresApproval(false); }} /></label>
            <label className="flex items-center justify-between gap-3 text-sm text-white/70"><span>Requires approval</span><input type="checkbox" disabled={!demoEnabled} checked={demoRequiresApproval} onChange={(event) => setDemoRequiresApproval(event.target.checked)} /></label>
            <Field label="Protected Demo URL (admin only)"><input className={inputClass} type="url" value={form.demoUrl} onChange={(event) => updateField("demoUrl", event.target.value)} placeholder="https://your-demo.vercel.app" /></Field>
            <label className="flex items-center justify-between gap-3 text-sm text-white/70"><span>Personalized watermark</span><input type="checkbox" disabled={!demoEnabled} checked={watermarkEnabled} onChange={(event) => setWatermarkEnabled(event.target.checked)} /></label>
          </div>
          <Field label="Completion Date">
            <div className="relative">
              <CalendarDays className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/36" />
              <input className={`${inputClass} w-full pr-11`} type="date" />
            </div>
          </Field>
          <div className="flex items-center justify-between rounded-2xl border border-white/[0.08] bg-[#050816]/60 px-4 py-3">
            <div>
              <p className="text-sm font-bold text-white">Featured Project</p>
              <p className="mt-1 text-xs text-white/42">Show this project near the top.</p>
            </div>
            <button type="button" className="relative h-7 w-12 rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#3B82F6]">
              <span className="absolute right-1 top-1 h-5 w-5 rounded-full bg-white" />
            </button>
          </div>
        </div>
      </section>

      <div className="flex flex-col gap-3 xl:col-span-3 sm:flex-row sm:justify-end">
        {saved ? (
          <p className="flex items-center gap-2 rounded-2xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-3 text-sm font-semibold text-emerald-300 sm:mr-auto">
            <CheckCircle2 className="h-4 w-4" />
            Project saved.
          </p>
        ) : null}
        {error ? <p className="rounded-2xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm font-semibold text-red-200 sm:mr-auto">{error}</p> : null}
        <button type="button" className="h-12 rounded-2xl border border-white/[0.08] px-6 text-sm font-bold text-white/70 transition hover:text-white">
          Cancel
        </button>
        <button type="submit" className="h-12 rounded-2xl bg-gradient-to-r from-[#8B5CF6] to-[#3B82F6] px-7 text-sm font-bold text-white shadow-[0_0_30px_rgba(59,130,246,0.24)] transition hover:scale-[1.02]">
          Save Project
        </button>
      </div>
    </form>
  );
}
