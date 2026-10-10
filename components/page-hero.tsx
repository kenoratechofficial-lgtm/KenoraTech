import { SectionHeading } from "@/components/section-heading";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export function PageHero({ eyebrow, title, description }: PageHeroProps) {
  return (
    <section className="container py-20 md:py-28">
      <SectionHeading eyebrow={eyebrow} title={title} description={description} />
    </section>
  );
}
