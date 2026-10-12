"use client";

import { useCallback, useEffect, useState } from "react";
import { adminToast } from "@/components/admin/AdminToaster";
import { EmptyState } from "@/components/admin/EmptyState";
import { ArrowDown, ArrowUp, Edit3, Plus, Trash2, X } from "lucide-react";

type AppItem = { id: string; title: string; description: string; androidUrl?: string; websiteUrl?: string; isActive: boolean; sortOrder: number };
const input = "h-11 rounded-xl border border-white/[.08] bg-[#050816] px-4 text-sm text-white outline-none";

export function AppsManager() {
  const [items, setItems] = useState<AppItem[]>([]);
  const [editing, setEditing] = useState<AppItem | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [androidUrl, setAndroidUrl] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [error, setError] = useState("");
  const token = () => localStorage.getItem("kenora-admin-token") || "";
  const load = useCallback(async () => {
    const response = await fetch("/api/admin/content/apps", { headers: { Authorization: `Bearer ${token()}` }, cache: "no-store" });
    const body = await response.json().catch(() => null);
    setItems(response.ok && Array.isArray(body?.items) ? body.items : []);
  }, []);
  useEffect(() => { void load(); }, [load]);
  const clear = () => { setEditing(null); setTitle(""); setDescription(""); setAndroidUrl(""); setWebsiteUrl(""); setIsActive(true); setError(""); };
  const save = async (event: React.FormEvent) => {
    event.preventDefault(); setError("");
    const response = await fetch(editing ? `/api/admin/content/apps?id=${editing.id}` : "/api/admin/content/apps", {
      method: editing ? "PATCH" : "POST",
      headers: { Authorization: `Bearer ${token()}`, "Content-Type": "application/json" },
      body: JSON.stringify({ title, description, androidUrl, websiteUrl, isActive, sortOrder: editing?.sortOrder || items.length + 1 })
    });
    const body = await response.json().catch(() => null);
    if (!response.ok) { setError(body?.error || "Unable to save app."); return; }
    adminToast.success(editing ? "App updated." : "App added."); clear(); await load();
  };
  const remove = async (item: AppItem) => {
    if (!confirm(`Delete ${item.title}?`)) return;
    const response = await fetch(`/api/admin/content/apps?id=${item.id}`, { method: "DELETE", headers: { Authorization: `Bearer ${token()}` } });
    if (response.ok) { adminToast.success("App deleted."); await load(); } else adminToast.error("Unable to delete app.");
  };
  const move = async (index: number, direction: -1 | 1) => {
    const next = [...items]; const target = index + direction;
    if (target < 0 || target >= next.length) return;
    [next[index], next[target]] = [next[target], next[index]]; setItems(next);
    const response = await fetch("/api/admin/content/apps", { method: "PUT", headers: { Authorization: `Bearer ${token()}`, "Content-Type": "application/json" }, body: JSON.stringify({ ids: next.map((item) => item.id) }) });
    if (!response.ok) { adminToast.error("Order could not be saved."); await load(); }
  };
  return <div className="grid gap-7">
    <div><h1 className="text-3xl font-black text-white">Apps</h1><p className="mt-2 text-sm text-white/55">Manage apps and their Android download and website links. Either link can be added on its own.</p></div>
    <form onSubmit={save} className="grid gap-4 rounded-3xl border border-white/[.08] bg-[#0D1323]/78 p-6">
      <div className="flex justify-between"><b className="text-white">{editing ? `Edit ${editing.title}` : "Add app"}</b>{editing ? <button type="button" onClick={clear} aria-label="Cancel editing"><X className="h-4 w-4" /></button> : null}</div>
      <input required value={title} onChange={(event) => setTitle(event.target.value)} placeholder="App name" className={input} />
      <textarea value={description} onChange={(event) => setDescription(event.target.value)} placeholder="Short description (optional)" rows={3} className={`${input} h-auto py-3`} />
      <input type="url" value={androidUrl} onChange={(event) => setAndroidUrl(event.target.value)} placeholder="Android app link (optional)" className={input} />
      <input type="url" value={websiteUrl} onChange={(event) => setWebsiteUrl(event.target.value)} placeholder="Website link (optional)" className={input} />
      <p className="text-xs text-white/45">Provide at least one link. Android and website links are both optional individually.</p>
      <label className="flex gap-2 text-sm text-white/70"><input type="checkbox" checked={isActive} onChange={(event) => setIsActive(event.target.checked)} /> Show publicly</label>
      {error ? <p role="alert" className="text-sm text-red-300">{error}</p> : null}
      <button className="inline-flex h-11 w-fit items-center gap-2 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#3B82F6] px-4 text-sm font-bold text-white"><Plus className="h-4 w-4" />{editing ? "Update app" : "Add app"}</button>
    </form>
    {!items.length ? <EmptyState title="No apps yet" description="Add an app above to manage its public links." /> : <div className="grid gap-3">{items.map((item, index) => <article key={item.id} className="flex items-center gap-4 rounded-2xl border border-white/[.08] bg-[#0D1323]/78 p-4"><div className="min-w-0 flex-1"><h2 className="font-bold text-white">{item.title}</h2><p className="truncate text-sm text-white/55">{item.androidUrl || item.websiteUrl}</p><span className={item.isActive === false ? "text-xs text-amber-300" : "text-xs text-emerald-300"}>{item.isActive === false ? "Hidden" : "Published"}</span></div><button aria-label="Move up" disabled={index === 0} onClick={() => void move(index, -1)}><ArrowUp className="h-4 w-4" /></button><button aria-label="Move down" disabled={index === items.length - 1} onClick={() => void move(index, 1)}><ArrowDown className="h-4 w-4" /></button><button aria-label={`Edit ${item.title}`} onClick={() => { setEditing(item); setTitle(item.title); setDescription(item.description || ""); setAndroidUrl(item.androidUrl || ""); setWebsiteUrl(item.websiteUrl || ""); setIsActive(item.isActive !== false); }}><Edit3 className="h-4 w-4 text-[#8EC5FF]" /></button><button aria-label={`Delete ${item.title}`} onClick={() => void remove(item)}><Trash2 className="h-4 w-4 text-red-200" /></button></article>)}</div>}
  </div>;
}
