import { Card } from "@/components/ui/card";
import type { SummaryMetric } from "@/components/app/types";

type SummaryCardsProps = { items: readonly SummaryMetric[] };

export function SummaryCards({ items }: SummaryCardsProps) {
  return (
    <section aria-label="Resumo do seu ritmo" className="grid gap-3 sm:grid-cols-3">
      {items.map((item) => (
        <Card key={item.label} className="rounded-2xl p-5">
          <p className="text-xs font-semibold uppercase tracking-[.12em] text-(--ink-muted)">{item.label}</p>
          <p className="display mt-5 text-4xl leading-none">{item.value}</p>
          <p className="mt-3 text-sm text-(--ink-muted)">{item.detail}</p>
        </Card>
      ))}
    </section>
  );
}
