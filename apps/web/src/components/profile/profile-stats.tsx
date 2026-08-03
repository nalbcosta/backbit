import { Card } from "@/components/ui/card";
import type { ProfileMetric } from "@/lib/profile/profile.types";

export function ProfileStats({ items }: { items: readonly ProfileMetric[] }) {
  return (
    <section aria-label="Seu ritmo" className="grid gap-3 sm:grid-cols-3">
      {items.map((item) => <Card key={item.label} className="rounded-2xl p-5">
        <p className="text-xs font-semibold uppercase tracking-[.12em] text-(--ink-muted)">{item.label}</p>
        <p className="display mt-4 text-4xl leading-none">{item.value}</p>
        <p className="mt-3 text-sm text-(--ink-muted)">{item.detail}</p>
      </Card>)}
    </section>
  );
}
