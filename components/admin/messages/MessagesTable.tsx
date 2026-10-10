"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Eye, Reply, Trash2, X } from "lucide-react";
import { DataTable } from "@/components/admin/DataTable";
import { EmptyState } from "@/components/admin/EmptyState";
import { Loading } from "@/components/admin/Loading";
import { cn } from "@/lib/utils";

type AdminMessage = {
  id: string;
  name: string;
  email: string;
  project: string;
  message: string;
  createdAt: string;
};

function statusClass(status: "New" | "Read" | "Replied") {
  if (status === "New") return "bg-[#8B5CF6]/14 text-[#C7A8FF] border-[#8B5CF6]/20";
  if (status === "Read") return "bg-[#3B82F6]/14 text-[#8EC5FF] border-[#3B82F6]/20";
  return "bg-emerald-400/12 text-emerald-300 border-emerald-400/20";
}

export function MessagesTable() {
  const [messages, setMessages] = useState<AdminMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("");
  const [selectedMessage, setSelectedMessage] = useState<AdminMessage | null>(null);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<"All" | "New" | "Read" | "Replied">("All");
  const [page, setPage] = useState(1);
  const pageSize = 6;

  async function loadMessages() {
    setLoading(true);
    const token = window.localStorage.getItem("kenora-admin-token") || "";
    const response = await fetch("/api/contact", {
      cache: "no-store",
      headers: { Authorization: `Bearer ${token}` }
    });
    const body = await response.json().catch(() => null);
    setMessages(response.ok ? body?.messages || [] : []);
    if (!response.ok) {
      setStatus(body?.error || "Messages could not be loaded.");
    }
    setLoading(false);
  }

  useEffect(() => {
    void loadMessages();
  }, []);

  async function deleteMessage(id: string) {
    const token = window.localStorage.getItem("kenora-admin-token") || "";
    const response = await fetch(`/api/contact/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` }
    });

    if (!response.ok) {
      const body = await response.json().catch(() => null);
      setStatus(body?.error || "Message could not be deleted.");
      return;
    }

    setStatus("Message deleted.");
    await loadMessages();
  }

  if (loading) {
    return <Loading />;
  }

  if (messages.length === 0) {
    return <EmptyState title="No messages yet" description={status || "Contact form submissions will appear here."} />;
  }

  const filteredMessages = messages.filter((message, index) => {
    const rowStatus = index === 0 ? "New" : "Read";
    const searchable = `${message.name} ${message.email} ${message.project} ${message.message}`.toLowerCase();
    return searchable.includes(query.trim().toLowerCase()) && (filter === "All" || filter === rowStatus);
  });
  const totalPages = Math.max(1, Math.ceil(filteredMessages.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const visibleMessages = filteredMessages.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  function updateQuery(value: string) {
    setQuery(value);
    setPage(1);
  }

  function updateFilter(value: "All" | "New" | "Read" | "Replied") {
    setFilter(value);
    setPage(1);
  }

  return (
    <div className="grid gap-3">
      {status ? <p className="rounded-2xl border border-white/[0.08] bg-[#0D1323]/78 px-4 py-3 text-sm text-white/70">{status}</p> : null}
      <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_190px]">
        <label className="relative block">
          <span className="sr-only">Search messages</span>
          <input value={query} onChange={(event) => updateQuery(event.target.value)} type="search" placeholder="Search messages..." className="h-11 w-full rounded-2xl border border-white/[0.08] bg-[#0D1323]/78 px-4 text-sm text-white outline-none transition placeholder:text-white/38 focus:border-[#3B82F6]/70 focus:ring-2 focus:ring-[#3B82F6]/18" />
        </label>
        <select value={filter} onChange={(event) => updateFilter(event.target.value as "All" | "New" | "Read" | "Replied")} className="h-11 w-full rounded-2xl border border-white/[0.08] bg-[#0D1323]/78 px-4 text-sm text-white/70 outline-none focus:border-[#3B82F6]/70">
          <option value="All">All statuses</option><option value="New">New</option><option value="Read">Read</option><option value="Replied">Replied</option>
        </select>
      </div>
      <DataTable>
        <table className="w-full min-w-[980px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-white/[0.08] text-white/48">
              {["", "Name", "Email", "Project", "Message", "Date", "Status", "Actions"].map((heading) => (
                <th key={heading} className="px-5 py-4 font-semibold">
                  {heading || <span className="sr-only">Select</span>}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {visibleMessages.map((message) => {
              const index = messages.findIndex((item) => item.id === message.id);
              const rowStatus = index === 0 ? "New" : "Read";

              return (
                <motion.tr
                  key={message.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: index * 0.04 }}
                  className="border-b border-white/[0.06] text-white/72 transition hover:bg-white/[0.035] last:border-b-0"
                >
                  <td className="px-5 py-4">
                    <input type="checkbox" aria-label={`Select message from ${message.name}`} className="h-4 w-4 rounded border-white/20 bg-transparent" />
                  </td>
                  <td className="px-5 py-4 font-bold text-white">{message.name}</td>
                  <td className="px-5 py-4">{message.email}</td>
                  <td className="px-5 py-4">{message.project}</td>
                  <td className="max-w-[260px] truncate px-5 py-4">{message.message}</td>
                  <td className="px-5 py-4">{new Date(message.createdAt).toLocaleDateString("en-IN")}</td>
                  <td className="px-5 py-4">
                    <span className={cn("rounded-full border px-3 py-1 text-xs font-bold", statusClass(rowStatus))}>{rowStatus}</span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <button type="button" onClick={() => setSelectedMessage(message)} aria-label={`View complete message from ${message.name}`} className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03] text-white/62 transition hover:border-[#3B82F6]/50 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6]">
                        <Eye className="h-4 w-4" />
                      </button>
                      <a href={`mailto:${message.email}`} aria-label={`Reply to ${message.name}`} className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03] text-white/62 transition hover:border-[#3B82F6]/50 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6]">
                        <Reply className="h-4 w-4" />
                      </a>
                      <button type="button" onClick={() => void deleteMessage(message.id)} aria-label={`Delete message from ${message.name}`} className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03] text-white/62 transition hover:border-red-400/50 hover:text-red-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </DataTable>
      {filteredMessages.length === 0 ? <EmptyState title="No matching messages" description="Try a different search term or status filter." /> : null}
      <div className="flex flex-col gap-3 text-sm text-white/55 sm:flex-row sm:items-center sm:justify-between">
        <span>Showing {filteredMessages.length ? (currentPage - 1) * pageSize + 1 : 0}-{Math.min(currentPage * pageSize, filteredMessages.length)} of {filteredMessages.length} messages</span>
        <div className="flex gap-2">
          <button type="button" disabled={currentPage === 1} onClick={() => setPage((value) => Math.max(1, value - 1))} className="min-h-11 rounded-xl border border-white/[0.08] px-3 text-white transition hover:border-white/25 disabled:cursor-not-allowed disabled:opacity-40">Previous</button>
          <span className="grid min-h-11 min-w-11 place-items-center rounded-xl border border-[#8B5CF6]/30 bg-[#8B5CF6]/14 px-3 text-white">{currentPage}</span>
          <button type="button" disabled={currentPage === totalPages} onClick={() => setPage((value) => Math.min(totalPages, value + 1))} className="min-h-11 rounded-xl border border-white/[0.08] px-3 text-white transition hover:border-white/25 disabled:cursor-not-allowed disabled:opacity-40">Next</button>
        </div>
      </div>
      {selectedMessage ? <div role="dialog" aria-modal="true" aria-labelledby="message-dialog-title" className="fixed inset-0 z-[90] grid place-items-center p-4 sm:p-6">
        <button type="button" aria-label="Close message" onClick={() => setSelectedMessage(null)} className="absolute inset-0 cursor-default bg-black/70 backdrop-blur-sm" />
        <section className="relative z-10 flex max-h-[calc(100dvh-2rem)] w-full max-w-2xl flex-col overflow-hidden rounded-3xl border border-white/[0.12] bg-[#0D1323] shadow-2xl sm:max-h-[calc(100dvh-3rem)]">
          <header className="flex items-start justify-between gap-4 border-b border-white/[0.08] px-5 py-4 sm:px-6">
            <div className="min-w-0"><p className="text-sm text-white/52">Message from</p><h2 id="message-dialog-title" className="truncate text-lg font-black text-white">{selectedMessage.name}</h2><a href={`mailto:${selectedMessage.email}`} className="break-all text-sm text-[#8EC5FF] hover:underline">{selectedMessage.email}</a></div>
            <button type="button" onClick={() => setSelectedMessage(null)} aria-label="Close message" className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-white/[0.08] text-white/70 transition hover:bg-white/[0.07] hover:text-white"><X className="h-5 w-5" /></button>
          </header>
          <div className="overflow-y-auto px-5 py-5 sm:px-6"><dl className="grid gap-4 text-sm"><div><dt className="text-white/48">Project</dt><dd className="mt-1 font-semibold text-white">{selectedMessage.project}</dd></div><div><dt className="text-white/48">Received</dt><dd className="mt-1 text-white/80">{new Date(selectedMessage.createdAt).toLocaleString("en-IN")}</dd></div><div><dt className="text-white/48">Message</dt><dd className="mt-2 whitespace-pre-wrap break-words rounded-2xl bg-white/[0.04] p-4 leading-7 text-white/85">{selectedMessage.message}</dd></div></dl></div>
          <footer className="flex flex-col-reverse gap-3 border-t border-white/[0.08] px-5 py-4 sm:flex-row sm:justify-end sm:px-6"><button type="button" onClick={() => setSelectedMessage(null)} className="min-h-11 rounded-xl border border-white/[0.08] px-4 text-sm font-semibold text-white/75 transition hover:bg-white/[0.06]">Close</button><a href={`mailto:${selectedMessage.email}`} className="flex min-h-11 items-center justify-center rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#3B82F6] px-4 text-sm font-bold text-white">Reply by email</a></footer>
        </section>
      </div> : null}
    </div>
  );
}
