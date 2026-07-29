import type { ComponentPropsWithoutRef, ReactNode } from "react";
type CardProps = ComponentPropsWithoutRef<"article"> & { children: ReactNode };
export function Card({ children, className = "", ...props }: CardProps) {
  return (
    <article
      className={`border border-(--line) bg-(--surface) ${className}`}
      {...props}
    >
      {children}
    </article>
  );
}
