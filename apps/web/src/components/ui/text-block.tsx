import type { ReactNode } from "react";
export function TextBlock({ children }: { children: ReactNode }) {
  return (
    <p className="text-base leading-7 text-(--ink-muted) sm:text-lg">
      {children}
    </p>
  );
}
