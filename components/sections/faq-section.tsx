import { SectionHeading } from "@/components/section-heading";
import { faqs } from "@/lib/content";

export function FaqSection() {
  return (
    <section className="section-band bg-card/45 py-20">
      <div className="container">
        <SectionHeading
          eyebrow="FAQ"
          title="Clear answers before we begin."
          description="A few common questions about timelines, content, maintenance and custom application work."
        />
        <div className="mx-auto mt-12 grid max-w-4xl gap-4">
          {faqs.map((faq) => (
            <details key={faq.question} className="group rounded-lg border bg-background p-5 shadow-inner-border">
              <summary className="cursor-pointer list-none text-lg font-semibold">
                <span className="flex items-center justify-between gap-4">
                  {faq.question}
                  <span className="text-primary transition group-open:rotate-45">+</span>
                </span>
              </summary>
              <p className="mt-4 leading-7 text-muted-foreground">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
