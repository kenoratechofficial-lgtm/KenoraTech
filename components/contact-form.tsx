"use client";

import { useState, type FormEvent } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus("sending");
    setMessage("");

    const formData = new FormData(form);
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: formData.get("name"),
        email: formData.get("email"),
        project: formData.get("project"),
        message: formData.get("message")
      })
    });

    if (!response.ok) {
      const body = await response.json().catch(() => null);
      setStatus("error");
      setMessage(body?.error || "Something went wrong. Please try again.");
      return;
    }

    form.reset();
    setStatus("sent");
    setMessage("Project brief received. We will contact you soon.");
  }

  return (
    <form className="rounded-lg border bg-card p-6 shadow-soft-lg" onSubmit={handleSubmit}>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-medium">
          Name
          <input
            className="h-11 rounded-md border bg-background px-3 text-sm outline-none transition focus:ring-2 focus:ring-ring"
            placeholder="Your name"
            name="name"
            autoComplete="name"
            required
          />
        </label>
        <label className="grid gap-2 text-sm font-medium">
          Email
          <input
            className="h-11 rounded-md border bg-background px-3 text-sm outline-none transition focus:ring-2 focus:ring-ring"
            placeholder="you@company.com"
            type="email"
            name="email"
            autoComplete="email"
            required
          />
        </label>
        <label className="grid gap-2 text-sm font-medium sm:col-span-2">
          Project Type
          <select className="h-11 rounded-md border bg-background px-3 text-sm outline-none transition focus:ring-2 focus:ring-ring" name="project">
            <option>Website Development</option>
            <option>Web Application</option>
            <option>E-commerce Development</option>
            <option>UI/UX Design</option>
            <option>Website Maintenance</option>
          </select>
        </label>
        <label className="grid gap-2 text-sm font-medium sm:col-span-2">
          Message
          <textarea
            className="min-h-32 rounded-md border bg-background px-3 py-3 text-sm outline-none transition focus:ring-2 focus:ring-ring"
            placeholder="Tell us about your business, goals and ideal launch timeline."
            name="message"
            required
          />
        </label>
      </div>
      {message ? (
        <p className={status === "error" ? "mt-5 text-sm font-medium text-red-600" : "mt-5 text-sm font-medium text-primary"}>
          {message}
        </p>
      ) : null}
      <Button className="mt-6 w-full sm:w-auto" type="submit" disabled={status === "sending"}>
        {status === "sending" ? "Sending..." : "Send Project Brief"} <Send className="h-4 w-4" />
      </Button>
    </form>
  );
}
