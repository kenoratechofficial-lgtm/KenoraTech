"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown, ArrowUp, Edit3, ExternalLink, Search, Star, Trash2 } from "lucide-react";
import { DataTable } from "@/components/admin/DataTable";
import { EmptyState } from "@/components/admin/EmptyState";
import { Loading } from "@/components/admin/Loading";
import type { PortfolioProject } from "@/lib/portfolio";

export function ProjectsTable() {
  const [projects, setProjects] = useState<PortfolioProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "published" | "draft">("all");
  const [query, setQuery] = useState("");

  async function loadProjects() {
    setLoading(true);
    const token = window.localStorage.getItem("kenora-admin-token") || "";
    const response = await fetch("/api/portfolio", { headers: { Authorization: `Bearer ${token}` }, cache: "no-store" });
    const body = await response.json().catch(() => null);
    setProjects(response.ok ? body?.projects || [] : []);
    setLoading(false);
  }

  useEffect(() => {
    void loadProjects();
  }, []);

  async function deleteProject(id: string) {
    if (!window.confirm("Delete this project? This cannot be undone.")) return;
    const token = window.localStorage.getItem("kenora-admin-token") || "";
    const response = await fetch(`/api/portfolio/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` }
    });

    if (!response.ok) {
      const body = await response.json().catch(() => null);
      setStatus(body?.error || "Project could not be deleted.");
      return;
    }

    setStatus("Project deleted.");
    await loadProjects();
  }

  async function moveProject(index: number, direction: -1 | 1) {
    const next = [...projects];
    const target = index + direction;
    if (target < 0 || target >= next.length) return;
    [next[index], next[target]] = [next[target], next[index]];
    setProjects(next);
    const token = window.localStorage.getItem("kenora-admin-token") || "";
    const responses = await Promise.all(next.map((project, sortOrder) => fetch(`/api/portfolio/${project.id}`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({ ...project, sortOrder })
    })));
    if (responses.some((response) => !response.ok)) { setStatus("Project order could not be saved."); await loadProjects(); }
    else setStatus("Project display order saved.");
  }

  if (loading) {
    return <Loading />;
  }

  if (projects.length === 0) {
    return <EmptyState title="No projects yet" description="Projects you add from the admin panel will appear here." />;
  }

  const visibleProjects = projects.filter((project) => {
    const matchesStatus = statusFilter === "all" || project.status === statusFilter;
    const matchesQuery = `${project.title} ${project.category}`.toLowerCase().includes(query.trim().toLowerCase());
    return matchesStatus && matchesQuery;
  });

  return (
    <div className="grid gap-3">
      {status ? <p className="rounded-2xl border border-white/[0.08] bg-[#0D1323]/78 px-4 py-3 text-sm text-white/70">{status}</p> : null}
      <div className="grid gap-3 sm:grid-cols-[1fr_190px]">
        <label className="relative block"><span className="sr-only">Search projects</span><Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/38" /><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search projects..." className="h-11 w-full rounded-2xl border border-white/[0.08] bg-[#0D1323]/78 pl-11 pr-4 text-sm text-white outline-none placeholder:text-white/38 focus:border-[#3B82F6]/70" /></label>
        <label className="sr-only" htmlFor="project-status-filter">Filter by status</label><select id="project-status-filter" value={statusFilter} onChange={(event) => setStatusFilter(event.target.value as typeof statusFilter)} className="h-11 rounded-2xl border border-white/[0.08] bg-[#0D1323]/78 px-4 text-sm text-white/80 outline-none"><option value="all">All Status</option><option value="published">Published</option><option value="draft">Draft</option></select>
      </div>
      {!visibleProjects.length ? <EmptyState title="No matching projects" description="Try another search or status filter." /> : null}
      <DataTable>
        <table className="w-full min-w-[1040px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-white/[0.08] text-white/48">
              {["Image", "Title", "Category", "Tags", "Status", "Featured", "Order", "Actions"].map((heading) => (
                <th key={heading} className="px-5 py-4 font-semibold">
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {visibleProjects.map((project, visibleIndex) => {
              const index = projects.findIndex((entry) => entry.id === project.id);
              return (
              <motion.tr
                key={project.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: visibleIndex * 0.04 }}
                className="border-b border-white/[0.06] text-white/72 transition hover:bg-white/[0.035] last:border-b-0"
              >
                <td className="px-5 py-4">
                  {project.imageUrl ? (
                    <Image src={project.imageUrl} alt="" width={96} height={56} className="h-14 w-24 rounded-xl border border-white/[0.08] object-cover" />
                  ) : (
                    <div className="grid h-14 w-24 place-items-center rounded-xl border border-white/[0.08] bg-white/[0.03] text-xs text-white/38">No image</div>
                  )}
                </td>
                <td className="px-5 py-4 font-bold text-white">{project.title}</td>
                <td className="px-5 py-4">{project.category}</td>
                <td className="px-5 py-4">
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span key={tag} className="rounded-full bg-white/[0.04] px-2.5 py-1 text-xs text-white/62">
                        {tag}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-5 py-4">
                  <span className={project.status === "draft" ? "rounded-full border border-amber-400/20 bg-amber-400/12 px-3 py-1 text-xs font-bold text-amber-300" : "rounded-full border border-emerald-400/20 bg-emerald-400/12 px-3 py-1 text-xs font-bold text-emerald-300"}>{project.status === "draft" ? "Draft" : "Published"}</span>
                </td>
                <td className="px-5 py-4">
                  <Star className="h-5 w-5 text-white/28" />
                </td>
                <td className="px-5 py-4"><div className="flex items-center gap-1"><span className="font-bold text-white">#{index + 1}</span><button disabled={index === 0} onClick={() => void moveProject(index, -1)} className="rounded p-1 text-white/50 disabled:opacity-25"><ArrowUp className="h-3.5 w-3.5" /></button><button disabled={index === projects.length - 1} onClick={() => void moveProject(index, 1)} className="rounded p-1 text-white/50 disabled:opacity-25"><ArrowDown className="h-3.5 w-3.5" /></button></div></td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2">
                    <Link href={`/admin/projects/${project.id}`} className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03] text-white/62 transition hover:border-[#3B82F6]/50 hover:text-white">
                      <Edit3 className="h-4 w-4" />
                    </Link>
                    {project.liveUrl ? (
                      <Link href={project.liveUrl} target="_blank" className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03] text-white/62 transition hover:border-[#3B82F6]/50 hover:text-white">
                        <ExternalLink className="h-4 w-4" />
                      </Link>
                    ) : null}
                    <button onClick={() => void deleteProject(project.id)} className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03] text-white/62 transition hover:border-red-400/50 hover:text-red-200">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </motion.tr>
            );})}
          </tbody>
        </table>
      </DataTable>
    </div>
  );
}
