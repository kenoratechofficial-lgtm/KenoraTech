interface DataTableProps {
  children: React.ReactNode;
}

export function DataTable({ children }: DataTableProps) {
  return (
    <div className="overflow-hidden rounded-[24px] border border-white/[0.08] bg-[#0D1323]/78 shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_18px_70px_rgba(0,0,0,0.22)] backdrop-blur-2xl">
      <div className="overflow-x-auto">{children}</div>
    </div>
  );
}
