import type { ComponentPropsWithoutRef, ReactNode } from "react";

type SelectProps = ComponentPropsWithoutRef<"select"> & { label: string; children: ReactNode };

export function Select({ label, children, className = "", ...props }: SelectProps) {
  return <label className="block text-xs font-semibold uppercase tracking-[.12em] text-(--ink-muted)">{label}<select className={`mt-2 min-h-12 w-full rounded-xl border border-(--line) bg-(--surface) px-3 text-sm normal-case tracking-normal text-(--ink) outline-none focus:border-(--accent) focus:ring-2 focus:ring-(--accent)/20 ${className}`} {...props}>{children}</select></label>;
}
