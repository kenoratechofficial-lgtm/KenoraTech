import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/section-heading";
import { listPortfolioProjects } from "@/lib/portfolio";

type PortfolioSectionProps = {
  compact?: boolean;
};

export async function PortfolioSection({ compact = false }: PortfolioSectionProps) {
  const portfolio = await listPortfolioProjects().catch(() => []);

  return (
    <section className="section-band bg-card/45 py-20">
      <div className="container">
        {!compact ? (
          <SectionHeading
            eyebrow="Portfolio"
            title="Case-study thinking, even when the timeline is lean."
            description="Every build is framed around a business goal, then shaped into a fast, responsive and memorable digital experience."
          />
        ) : null}
        {portfolio.length > 0 ? (
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {portfolio.map((project) => (
            <article
              key={project.title}
              className="group rounded-lg border bg-background p-5 shadow-inner-border transition hover:-translate-y-1 hover:shadow-soft-lg"
            >
              <div
                className="aspect-[4/3] rounded-md border bg-[linear-gradient(135deg,hsl(var(--primary)/0.95),hsl(var(--accent)/0.75)_55%,hsl(var(--secondary)))] bg-cover bg-center p-4 text-primary-foreground"
                style={project.imageUrl ? { backgroundImage: `url(${project.imageUrl})` } : undefined}
              >
                <div className="flex h-full flex-col justify-between rounded-md border border-white/20 bg-white/10 p-4 backdrop-blur-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold">{project.category}</span>
                  </div>
                  <p className="text-3xl font-semibold tracking-tight">{project.title}</p>
                </div>
              </div>
              <h3 className="mt-5 text-xl font-semibold">{project.title}</h3>
              <p className="mt-3 leading-7 text-muted-foreground">{project.description}</p>
              <p className="mt-5 text-sm font-semibold text-primary">{project.result}</p>
              {project.liveUrl ? (
                <Link
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex text-sm font-semibold text-foreground underline-offset-4 hover:underline"
                >
                  View project
                </Link>
              ) : null}
              <div className="mt-4 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span key={tag} className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                    {tag}
                  </span>
                ))}
              </div>
            </article>
            ))}
          </div>
        ) : (
          <div className="mx-auto mt-12 max-w-2xl rounded-lg border bg-background p-8 text-center shadow-inner-border">
            <h3 className="text-2xl font-semibold tracking-tight">Portfolio coming soon</h3>
            <p className="mt-4 leading-7 text-muted-foreground">
              Project showcases are being prepared and will be added here later.
            </p>
            <Button asChild className="mt-6">
              <Link href="/contact">Discuss your project</Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
