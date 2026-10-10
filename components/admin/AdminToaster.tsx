"use client";

import { useEffect, useState } from "react";
type Toast = { id: number; message: string; type: "success" | "error" };
let publish: ((message: string, type: Toast["type"]) => void) | undefined;
export const adminToast = { success: (message: string) => publish?.(message, "success"), error: (message: string) => publish?.(message, "error") };
export function AdminToaster() { const [toasts, setToasts] = useState<Toast[]>([]); useEffect(() => { publish = (message, type) => { const id = Date.now(); setToasts(current => [...current, { id, message, type }]); setTimeout(() => setToasts(current => current.filter(toast => toast.id !== id)), 3500); }; return () => { publish = undefined; }; }, []); return <div className="pointer-events-none fixed right-4 top-4 z-[100] grid w-[min(24rem,calc(100vw-2rem))] gap-2">{toasts.map(toast => <div key={toast.id} className={`rounded-2xl border px-4 py-3 text-sm font-semibold shadow-2xl ${toast.type === "success" ? "border-emerald-400/30 bg-[#0D241D] text-emerald-200" : "border-red-400/30 bg-[#2A1016] text-red-200"}`}>{toast.message}</div>)}</div>; }
