import type { ReactNode } from "react";

type BadgeProps = {
  children: ReactNode;
  variant?: "default" | "inverse";
  className?: string;
};

export function Badge({ children, variant = "default", className = "" }: BadgeProps) {
  const colors = variant === "inverse"
    ? "border-[var(--line-art)] text-[var(--on-art)]"
    : "border-[var(--line)] text-[var(--ink-muted)]";

  return (
    <span className={`inline-flex rounded-full border px-3 py-1 text-[.68rem] font-semibold uppercase tracking-widest ${colors} ${className}`}>
      {children}
    </span>
  );
}
