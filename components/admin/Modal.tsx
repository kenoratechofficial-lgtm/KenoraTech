export function Modal({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-[24px] border border-white/[0.08] bg-[#0D1323] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.35)]">
      <h2 className="text-xl font-bold text-white">{title}</h2>
      <div className="mt-4">{children}</div>
    </div>
  );
}
