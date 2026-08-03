import type { ReactNode } from "react";

type PrivacySectionProps = {
  number: string;
  title: string;
  children: ReactNode;
};

export function PrivacySection({ number, title, children }: PrivacySectionProps) {
  return (
    <section className="grid gap-4 border-t border-(--line) py-8 md:grid-cols-[7rem_1fr] md:gap-8">
      <p className="eyebrow">{number}</p>
      <div>
        <h2 className="display text-2xl sm:text-3xl">{title}</h2>
        <div className="mt-4 space-y-4 text-sm leading-7 text-(--ink-muted)">{children}</div>
      </div>
    </section>
  );
}
