"use client";

import { useEffect, useState, type FormEvent } from "react";
import { KeyRound, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { PortfolioProject } from "@/lib/portfolio";

const emptyForm = {
  title: "",
  category: "",
  description: "",
  result: "",
  tags: "",
  imageUrl: "",
  liveUrl: "",
  sortOrder: "0"
};

type ProjectForm = typeof emptyForm;

export function AdminPortfolioManager() {
  const [token, setToken] = useState("");
  const [projects, setProjects] = useState<PortfolioProject[]>([]);
  const [form, setForm] = useState<ProjectForm>(emptyForm);
  const [status, setStatus] = useState("");
  const [statusType, setStatusType] = useState<"success" | "error">("success");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setToken(window.localStorage.getItem("kenora-admin-token") || "");
    void loadProjects();
  }, []);

  async function loadProjects() {
    const response = await fetch("/api/portfolio", { cache: "no-store" });
    const body = await response.json().catch(() => null);

    if (!response.ok) {
      setStatusType("error");
      setStatus(body?.error || "Projects could not be loaded.");
      return;
    }

    setProjects(body?.projects || []);
  }

  function updateField(field: keyof ProjectForm, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function saveToken(value: string) {
    setToken(value);
    window.localStorage.setItem("kenora-admin-token", value);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setStatus("");
    setStatusType("success");

    const response = await fetch("/api/portfolio", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        ...form,
        sortOrder: Number(form.sortOrder || 0),
        tags: form.tags.split(",").map((tag) => tag.trim()).filter(Boolean)
      })
    });

    const body = await response.json().catch(() => null);
    setLoading(false);

    if (!response.ok) {
      setStatusType("error");
      setStatus(body?.error || "Project could not be saved.");
      return;
    }

    setForm(emptyForm);
    setStatusType("success");
    setStatus("Project saved.");
    await loadProjects();
  }

  async function deleteProject(id: string) {
    setLoading(true);
    setStatus("");
    setStatusType("success");

    const response = await fetch(`/api/portfolio/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` }
    });

    const body = await response.json().catch(() => null);
    setLoading(false);

    if (!response.ok) {
      setStatusType("error");
      setStatus(body?.error || "Project could not be deleted.");
      return;
    }

    setStatusType("success");
    setStatus("Project deleted.");
    await loadProjects();
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
      <section className="rounded-lg border bg-card p-6 shadow-inner-border">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-md bg-secondary text-primary">
            <KeyRound className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Portfolio Admin</h1>
            <p className="text-sm text-muted-foreground">Manage projects shown on the portfolio page.</p>
          </div>
        </div>

        <label className="mt-6 grid gap-2 text-sm font-medium">
          Admin token
          <input
            className="h-11 rounded-md border bg-background px-3 text-sm outline-none transition focus:ring-2 focus:ring-ring"
            type="password"
            value={token}
            onChange={(event) => saveToken(event.target.value)}
            placeholder="ADMIN_TOKEN"
          />
        </label>

        <form className="mt-6 grid gap-4" onSubmit={handleSubmit}>
          <label className="grid gap-2 text-sm font-medium">
            Project title
            <input
              className="h-11 rounded-md border bg-background px-3 text-sm outline-none transition focus:ring-2 focus:ring-ring"
              value={form.title}
              onChange={(event) => updateField("title", event.target.value)}
              required
            />
          </label>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="grid gap-2 text-sm font-medium">
              Category
              <input
                className="h-11 rounded-md border bg-background px-3 text-sm outline-none transition focus:ring-2 focus:ring-ring"
                value={form.category}
                onChange={(event) => updateField("category", event.target.value)}
                placeholder="Website, SaaS, E-commerce"
                required
              />
            </label>
            <label className="grid gap-2 text-sm font-medium">
              Sort order
              <input
                className="h-11 rounded-md border bg-background px-3 text-sm outline-none transition focus:ring-2 focus:ring-ring"
                type="number"
                value={form.sortOrder}
                onChange={(event) => updateField("sortOrder", event.target.value)}
              />
            </label>
          </div>
          <label className="grid gap-2 text-sm font-medium">
            Description
            <textarea
              className="min-h-28 rounded-md border bg-background px-3 py-3 text-sm outline-none transition focus:ring-2 focus:ring-ring"
              value={form.description}
              onChange={(event) => updateField("description", event.target.value)}
              required
            />
          </label>
          <label className="grid gap-2 text-sm font-medium">
            Result
            <input
              className="h-11 rounded-md border bg-background px-3 text-sm outline-none transition focus:ring-2 focus:ring-ring"
              value={form.result}
              onChange={(event) => updateField("result", event.target.value)}
              placeholder="Launched in 10 days, improved speed, increased leads"
              required
            />
          </label>
          <label className="grid gap-2 text-sm font-medium">
            Tags
            <input
              className="h-11 rounded-md border bg-background px-3 text-sm outline-none transition focus:ring-2 focus:ring-ring"
              value={form.tags}
              onChange={(event) => updateField("tags", event.target.value)}
              placeholder="Next.js, E-commerce, Dashboard"
            />
          </label>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="grid gap-2 text-sm font-medium">
              Image URL
              <input
                className="h-11 rounded-md border bg-background px-3 text-sm outline-none transition focus:ring-2 focus:ring-ring"
                value={form.imageUrl}
                onChange={(event) => updateField("imageUrl", event.target.value)}
                placeholder="https://..."
              />
            </label>
            <label className="grid gap-2 text-sm font-medium">
              Live URL
              <input
                className="h-11 rounded-md border bg-background px-3 text-sm outline-none transition focus:ring-2 focus:ring-ring"
                value={form.liveUrl}
                onChange={(event) => updateField("liveUrl", event.target.value)}
                placeholder="https://..."
              />
            </label>
          </div>
          {status ? (
            <p className={statusType === "error" ? "text-sm font-medium text-red-600" : "text-sm font-medium text-primary"}>
              {status}
            </p>
          ) : null}
          <Button type="submit" disabled={loading || !token}>
            <Plus className="h-4 w-4" /> {loading ? "Saving..." : "Add project"}
          </Button>
        </form>
      </section>

      <section className="rounded-lg border bg-card p-6 shadow-inner-border">
        <h2 className="text-xl font-semibold tracking-tight">Projects</h2>
        <div className="mt-5 grid gap-4">
          {projects.length > 0 ? (
            projects.map((project) => (
              <article key={project.id} className="rounded-lg border bg-background p-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-primary">{project.category}</p>
                    <h3 className="mt-1 text-lg font-semibold">{project.title}</h3>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    aria-label={`Delete ${project.title}`}
                    disabled={loading || !token}
                    onClick={() => deleteProject(project.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{project.description}</p>
                <p className="mt-3 text-sm font-semibold">{project.result}</p>
                {project.tags.length > 0 ? (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span key={tag} className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                        {tag}
                      </span>
                    ))}
                  </div>
                ) : null}
              </article>
            ))
          ) : (
            <p className="rounded-lg border bg-background p-5 text-sm text-muted-foreground">No projects added yet.</p>
          )}
        </div>
      </section>
    </div>
  );
}
