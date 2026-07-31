import type { ReactNode } from "react";

type BoardHeaderProps = {
  title: string;
  summary: string;
  actions?: ReactNode;
};

export function BoardHeader({ title, summary, actions }: BoardHeaderProps) {
  return (
    <header className="flex flex-col gap-6 border-b border-(--line) pb-8 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-xl">
        <p className="eyebrow">Seu ritmo</p>
        <h1 className="display mt-4 text-5xl leading-[.9] sm:text-6xl">
          {title}
        </h1>
        <p className="mt-5 text-base leading-7 text-(--ink-muted)">{summary}</p>
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </header>
  );
}
