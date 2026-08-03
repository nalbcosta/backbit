import type { ActivityItem } from "@/components/app/types";
import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/section-heading";

type RecentActivityProps = { items: readonly ActivityItem[] };

export function RecentActivity({ items }: RecentActivityProps) {
  return (
    <section>
      <SectionHeading eyebrow="Registro recente" title="O que ficou da semana" />
      <Card className="mt-7 divide-y divide-(--line) rounded-2xl px-5">
        <ul>
          {items.map((item) => (
            <li key={`${item.title}-${item.time}`} className="flex items-start justify-between gap-5 py-5"><div><h3 className="text-sm font-semibold">{item.title}</h3><p className="mt-1 text-sm leading-6 text-(--ink-muted)">{item.detail}</p></div><time className="shrink-0 text-xs text-(--ink-muted)">{item.time}</time></li>
          ))}
        </ul>
      </Card>
    </section>
  );
}
