import { PageHeader } from "@/components/admin/PageHeader";
import { EmptyState } from "@/components/admin/EmptyState";

interface AdminPlaceholderPageProps {
  title: string;
  description: string;
  items: string[];
}

export function AdminPlaceholderPage({ title, description, items }: AdminPlaceholderPageProps) {
  return (
    <div className="grid gap-7">
      <PageHeader title={title} description={description} />
      {items.length > 0 ? (
        <section className="rounded-[24px] border border-white/[0.08] bg-[#0D1323]/82 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_18px_70px_rgba(0,0,0,0.22)] backdrop-blur-2xl">
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {items.map((item, index) => (
              <article key={item} className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4">
                <p className="text-xs font-bold uppercase text-[#8EC5FF]">Item {String(index + 1).padStart(2, "0")}</p>
                <h2 className="mt-3 text-lg font-bold text-white">{item}</h2>
                <p className="mt-2 text-sm leading-6 text-white/52">Manage content, visibility and display order from this admin section.</p>
              </article>
            ))}
          </div>
        </section>
      ) : (
        <EmptyState title={`No ${title.toLowerCase()} yet`} description="This section is ready. Add your own entries when the backend for this content type is connected." />
      )}
    </div>
  );
}
