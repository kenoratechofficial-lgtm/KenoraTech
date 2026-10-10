import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description: string;
  align?: "left" | "center";
};

export function SectionHeading({ eyebrow, title, description, align = "center" }: SectionHeadingProps) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center")}>
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">{eyebrow}</p>
      <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight md:text-5xl">{title}</h2>
      <p className="mt-5 text-base leading-8 text-muted-foreground md:text-lg">{description}</p>
    </div>
  );
}
