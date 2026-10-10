import { AlertTriangle } from "lucide-react";

export function ConfirmDialog() {
  return (
    <div className="hidden items-center gap-3 rounded-2xl border border-amber-400/20 bg-amber-400/10 px-4 py-3 text-sm text-amber-200 lg:flex">
      <AlertTriangle className="h-4 w-4" />
      Destructive actions require confirmation.
    </div>
  );
}
