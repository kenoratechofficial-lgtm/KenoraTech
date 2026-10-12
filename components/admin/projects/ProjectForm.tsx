"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { CheckCircle2, UploadCloud } from "lucide-react";
import type { PortfolioProject } from "@/lib/portfolio";

const inputClass = "h-11 rounded-2xl border border-white/[0.08] bg-[#050816]/60 px-4 text-sm text-white outline-none transition placeholder:text-white/34 focus:border-[#3B82F6]/70 focus:ring-2 focus:ring-[#3B82F6]/18";
const textareaClass = "min-h-28 rounded-2xl border border-white/[0.08] bg-[#050816]/60 px-4 py-3 text-sm leading-6 text-white outline-none transition placeholder:text-white/34 focus:border-[#3B82F6]/70 focus:ring-2 focus:ring-[#3B82F6]/18";

type ProjectType = "app" | "website" | "software";
type TeamMemberOption = { id: string; title: string; designation?: string };

export function ProjectForm({ initialProject }: { initialProject?: PortfolioProject }) {
  const [teamMembers, setTeamMembers] = useState<TeamMemberOption[]>([]);
  const [creatorIds, setCreatorIds] = useState<string[]>(initialProject?.creatorIds || (initialProject?.creatorId ? [initialProject.creatorId] : []));
  const [title, setTitle] = useState(initialProject?.title || "");
  const [projectType, setProjectType] = useState<ProjectType>(initialProject?.projectType && initialProject.projectType !== "project" ? initialProject.projectType : "website");
  const [description, setDescription] = useState(initialProject?.description || "");
  const [details, setDetails] = useState(initialProject?.details || initialProject?.intro || "");
  const [imageUrl, setImageUrl] = useState(initialProject?.imageUrl || "");
  const [androidUrl, setAndroidUrl] = useState(initialProject?.androidUrl || "");
  const [websiteUrl, setWebsiteUrl] = useState(initialProject?.websiteUrl || initialProject?.liveUrl || "");
  const [status, setStatus] = useState<"draft" | "published">(initialProject?.status || "published");
  const [uploading, setUploading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = window.localStorage.getItem("kenora-admin-token") || "";
    void fetch("/api/admin/content/team", { headers: { Authorization: `Bearer ${token}` }, cache: "no-store" })
      .then((response) => response.json())
      .then((body) => setTeamMembers(Array.isArray(body?.items) ? body.items : []))
      .catch(() => setTeamMembers([]));
  }, []);

  async function uploadImage(file?: File) {
    if (!file) return;
    setUploading(true); setError("");
    try {
      const token = window.localStorage.getItem("kenora-admin-token") || "";
      const data = new FormData(); data.set("image", file);
      const response = await fetch("/api/admin/portfolio-image", { method: "POST", headers: { Authorization: `Bearer ${token}` }, body: data });
      const body = await response.json().catch(() => null);
      if (!response.ok || !body?.imageUrl) throw new Error(body?.error || "Image upload failed.");
      setImageUrl(body.imageUrl);
    } catch (uploadError) { setError(uploadError instanceof Error ? uploadError.message : "Image upload failed."); }
    finally { setUploading(false); }
  }

  return <form className="grid max-w-3xl gap-5" onSubmit={async (event) => {
    event.preventDefault(); setSaved(false); setError("");
    const token = window.localStorage.getItem("kenora-admin-token") || "";
    const response = await fetch(initialProject ? `/api/portfolio/${initialProject.id}` : "/api/portfolio", {
      method: initialProject ? "PUT" : "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({
        title, category: projectType, projectType, description, details, result: details || description,
        imageUrl, androidUrl, websiteUrl, liveUrl: websiteUrl, status,
        ...(teamMembers.length ? { creatorIds, creatorNames: creatorIds.map((id) => teamMembers.find((member) => member.id === id)?.title || "").filter(Boolean) } : {}),
        tags: initialProject?.tags || [], sortOrder: initialProject?.sortOrder || 0
      })
    });
    if (!response.ok) { const body = await response.json().catch(() => null); setError(body?.error || "Project could not be saved."); return; }
    setSaved(true);
  }}>
    <section className="grid gap-5 rounded-3xl border border-white/[0.08] bg-[#0D1323]/82 p-6">
      <label className="grid gap-2 text-sm font-semibold text-white/78">Name<input className={inputClass} value={title} onChange={(event) => setTitle(event.target.value)} required /></label>
      <label className="grid gap-2 text-sm font-semibold text-white/78">Type<select className={inputClass} value={projectType} onChange={(event) => setProjectType(event.target.value as ProjectType)}><option value="app">App</option><option value="website">Website</option><option value="software">Software</option></select></label>
      <label className="grid gap-2 text-sm font-semibold text-white/78">Short description<textarea className={textareaClass} value={description} onChange={(event) => setDescription(event.target.value)} required /></label>
      <label className="grid gap-2 text-sm font-semibold text-white/78">Learn More details<textarea className={textareaClass} value={details} onChange={(event) => setDetails(event.target.value)} placeholder="Details shown when visitors select Learn More" /></label>
      <fieldset className="grid gap-2 text-sm font-semibold text-white/78"><legend>Project developers</legend><p className="text-xs font-normal text-white/45">Selected developers appear in Learn More.</p><div className="grid gap-2 rounded-2xl border border-white/[0.08] bg-[#050816]/60 p-3 sm:grid-cols-2">{teamMembers.length ? teamMembers.map((member) => <label key={member.id} className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-white/75 hover:bg-white/[0.04]"><input type="checkbox" checked={creatorIds.includes(member.id)} onChange={(event) => setCreatorIds((current) => event.target.checked ? [...current, member.id] : current.filter((id) => id !== member.id))} /><span>{member.title}{member.designation ? <span className="ml-1 text-white/40">· {member.designation}</span> : null}</span></label>) : <p className="px-3 py-2 text-xs font-normal text-white/45">No team members are available. Add them under Team Members first.</p>}</div></fieldset>
      <label className="grid gap-2 text-sm font-semibold text-white/78">Android app link (optional)<input className={inputClass} type="url" value={androidUrl} onChange={(event) => setAndroidUrl(event.target.value)} placeholder="https://..." /></label>
      <label className="grid gap-2 text-sm font-semibold text-white/78">Website link (optional)<input className={inputClass} type="url" value={websiteUrl} onChange={(event) => setWebsiteUrl(event.target.value)} placeholder="https://..." /></label>
      <label className="grid gap-2 text-sm font-semibold text-white/78">One image or logo<input type="file" accept="image/png,image/jpeg,image/webp" disabled={uploading} onChange={(event) => { void uploadImage(event.target.files?.[0]); event.currentTarget.value = ""; }} className="text-sm text-white/70 file:mr-3 file:rounded-lg file:border-0 file:bg-white/10 file:px-3 file:py-2 file:text-white" /><span className="text-xs font-normal text-white/45">PNG, JPG, or WebP up to 8 MB. {uploading ? "Uploading…" : ""}</span></label>
      <label className="grid gap-2 text-sm font-semibold text-white/78">Image URL (optional)<input className={inputClass} type="url" value={imageUrl.startsWith("/api/portfolio-image/") ? "" : imageUrl} onChange={(event) => setImageUrl(event.target.value)} placeholder="https://..." /></label>
      {imageUrl ? <div className="relative h-28 w-40 overflow-hidden rounded-xl border border-white/10 bg-[#050816]"><Image src={imageUrl} alt="Project image preview" fill sizes="160px" className="object-contain p-2" /></div> : null}
      <label className="grid gap-2 text-sm font-semibold text-white/78">Status<select className={inputClass} value={status} onChange={(event) => setStatus(event.target.value as "draft" | "published")}><option value="published">Published</option><option value="draft">Draft</option></select></label>
    </section>
    {saved ? <p className="flex items-center gap-2 text-sm font-semibold text-emerald-300"><CheckCircle2 className="h-4 w-4" />Saved.</p> : null}
    {error ? <p role="alert" className="text-sm font-semibold text-red-200">{error}</p> : null}
    <button type="submit" disabled={uploading} className="h-12 w-fit rounded-2xl bg-gradient-to-r from-[#8B5CF6] to-[#3B82F6] px-7 text-sm font-bold text-white disabled:opacity-50">{initialProject ? "Save Changes" : "Create Project"}</button>
  </form>;
}
