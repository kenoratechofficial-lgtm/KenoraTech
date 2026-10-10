import { Inbox } from "lucide-react";

export function EmptyState({ title, description }: { title: string; description: string }) {
  return (
    <div className="rounded-[24px] border border-dashed border-white/12 bg-[#0D1323]/58 p-10 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#8B5CF6]/20 to-[#3B82F6]/20 text-[#9CCBFF]">
        <Inbox className="h-7 w-7" />
      </div>
      <h2 className="mt-5 text-lg font-bold text-white">{title}</h2>
      <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-white/58">{description}</p>
    </div>
  );
}
