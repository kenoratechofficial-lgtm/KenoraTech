interface PageHeaderProps {
  title: string;
  description: string;
  action?: React.ReactNode;
}

export function PageHeader({ title, description, action }: PageHeaderProps) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div>
        <h1 className="text-3xl font-black tracking-normal text-white md:text-4xl">{title}</h1>
        <p className="mt-2 text-sm leading-6 text-white/60">{description}</p>
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
