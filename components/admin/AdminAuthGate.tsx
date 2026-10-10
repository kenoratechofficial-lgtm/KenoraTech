"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { KeyRound, LogIn } from "lucide-react";

export function AdminAuthGate({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const saved = window.localStorage.getItem("kenora-admin-token") || "";
    setToken(saved);

    async function verifySavedToken() {
      if (!saved) {
        setReady(true);
        return;
      }

      const response = await fetch("/api/admin/verify", {
        headers: { Authorization: `Bearer ${saved}` }
      });

      if (response.ok) {
        setUnlocked(true);
      } else {
        window.localStorage.removeItem("kenora-admin-token");
      }

      setReady(true);
    }

    void verifySavedToken();
  }, []);

  if (!ready) {
    return null;
  }

  if (unlocked) {
    return <>{children}</>;
  }

  return (
    <div className="relative grid min-h-screen place-items-center overflow-hidden bg-[#050816] px-4 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(139,92,246,0.22),transparent_24rem),radial-gradient(circle_at_80%_70%,rgba(59,130,246,0.16),transparent_24rem)]" />
      <form
        className="relative w-full max-w-md rounded-[28px] border border-white/[0.08] bg-[#0D1323]/86 p-7 shadow-[0_24px_90px_rgba(0,0,0,0.35)] backdrop-blur-2xl"
        onSubmit={(event) => {
          event.preventDefault();
          void (async () => {
            setError("");
            if (!token.trim()) {
              return;
            }

            const response = await fetch("/api/admin/verify", {
              headers: { Authorization: `Bearer ${token.trim()}` }
            });

            if (!response.ok) {
              setError("Invalid admin token.");
              return;
            }

            window.localStorage.setItem("kenora-admin-token", token.trim());
            setUnlocked(true);
          })();
        }}
      >
        <div className="flex items-center gap-3">
          <Image src="/kenora-tech-logo.png" alt="KenoraTech" width={48} height={48} className="h-12 w-12 rounded-md object-contain" />
          <div>
            <h1 className="text-2xl font-black">Admin Access</h1>
            <p className="text-sm text-white/52">Enter your admin token to continue.</p>
          </div>
        </div>
        <label className="mt-7 grid gap-2 text-sm font-semibold text-white/78">
          Admin token
          <span className="relative">
            <KeyRound className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/38" />
            <input
              type="password"
              value={token}
              onChange={(event) => setToken(event.target.value)}
              placeholder="ADMIN_TOKEN"
              className="h-12 w-full rounded-2xl border border-white/[0.08] bg-[#050816]/70 pl-11 pr-4 text-sm text-white outline-none placeholder:text-white/34 focus:border-[#3B82F6]/70 focus:ring-2 focus:ring-[#3B82F6]/18"
            />
          </span>
        </label>
        {error ? <p className="mt-4 rounded-2xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm font-semibold text-red-200">{error}</p> : null}
        <button className="mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#8B5CF6] to-[#3B82F6] text-sm font-bold text-white shadow-[0_0_30px_rgba(59,130,246,0.24)]">
          <LogIn className="h-4 w-4" />
          Unlock Dashboard
        </button>
      </form>
    </div>
  );
}
