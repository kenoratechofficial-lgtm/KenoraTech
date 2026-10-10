import type { ContactSubmission } from "@/lib/contact-submissions";

export function RecentMessages({ messages }: { messages: ContactSubmission[] }) {
  return (
    <section className="rounded-[24px] border border-white/[0.08] bg-[#0D1323]/82 p-5 backdrop-blur-2xl">
      <h2 className="text-lg font-bold text-white">Recent Messages</h2>
      <div className="mt-4 grid gap-3">
        {messages.length > 0 ? messages.slice(0, 4).map((message) => (
          <div key={message.id} className="flex items-center justify-between gap-3 rounded-2xl bg-white/[0.03] p-3">
            <div>
              <p className="text-sm font-bold text-white">{message.name}</p>
              <p className="mt-1 text-xs text-white/46">{message.project}</p>
            </div>
            <span className="rounded-full bg-[#8B5CF6]/14 px-2.5 py-1 text-xs font-bold text-[#C7A8FF]">New</span>
          </div>
        )) : <p className="rounded-2xl bg-white/[0.03] p-4 text-sm text-white/50">No messages yet.</p>}
      </div>
    </section>
  );
}
