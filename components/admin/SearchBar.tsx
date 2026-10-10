import { Search } from "lucide-react";

export function SearchBar({ placeholder = "Search..." }: { placeholder?: string }) {
  return (
    <label className="relative block">
      <span className="sr-only">{placeholder}</span>
      <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/38" />
      <input
        type="search"
        placeholder={placeholder}
        className="h-11 w-full rounded-2xl border border-white/[0.08] bg-[#0D1323]/78 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-white/38 focus:border-[#3B82F6]/70 focus:ring-2 focus:ring-[#3B82F6]/18"
      />
    </label>
  );
}
