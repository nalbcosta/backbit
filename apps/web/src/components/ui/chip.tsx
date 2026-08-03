import type { ButtonHTMLAttributes, ReactNode } from "react";

type ChipProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  selected?: boolean;
};

export function Chip({ children, selected = false, className = "", ...props }: ChipProps) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      className={`inline-flex min-h-11 items-center justify-center rounded-full border px-4 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--accent) ${selected ? "border-(--action-bg) bg-(--action-bg) text-(--action-fg)" : "border-(--line) bg-(--surface) text-(--ink) hover:border-(--ink)"} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
