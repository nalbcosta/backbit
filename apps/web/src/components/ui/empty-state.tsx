import type { ReactNode } from "react";

type EmptyStateProps = { title: string; description: string; action?: ReactNode };

export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div className="rounded-2xl border border-dashed border-(--line) px-5 py-8 text-center">
      <p className="font-semibold text-(--ink)">{title}</p>
      <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-(--ink-muted)">{description}</p>
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
