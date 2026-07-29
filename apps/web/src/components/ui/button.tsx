import type { AnchorHTMLAttributes, ReactNode } from "react";

type ButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
  variant?: "primary" | "secondary";
};
export function Button({
  children,
  className = "",
  variant = "primary",
  ...props
}: ButtonProps) {
  const styles =
    variant === "primary"
      ? "bg-[var(--action-bg)] text-[var(--action-fg)] hover:bg-[var(--accent)]"
      : "border border-[var(--line)] text-[var(--ink)] hover:border-[var(--action-bg)] hover:bg-[var(--action-bg)] hover:text-[var(--action-fg)]";
  return (
    <a
      className={`inline-flex min-h-12 items-center justify-center rounded-full px-5 text-sm font-semibold transition-colors ${styles} ${className}`}
      {...props}
    >
      {children}
    </a>
  );
}
