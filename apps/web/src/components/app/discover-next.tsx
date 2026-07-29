import { Sparkles } from "lucide-react";

import type { DiscoveryGame } from "@/components/app/types";
import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/section-heading";

type DiscoverNextProps = { games: readonly DiscoveryGame[] };

export function DiscoverNext({ games }: DiscoverNextProps) {
  return (
    <section>
      <SectionHeading eyebrow="Uma boa próxima escolha" title="Descubra sem ruído" description="Sugestões curtas para quando você quiser abrir algo novo." />
      <div className="mt-7 grid gap-3 md:grid-cols-2">
        {games.map((game) => (
          <Card key={game.title} className="rounded-2xl p-5">
            <div className="flex items-start gap-4"><span className="inline-flex min-h-10 min-w-10 items-center justify-center rounded-full bg-(--surface-muted) text-(--accent)"><Sparkles aria-hidden="true" size={17} strokeWidth={1.75} /></span><div><p className="text-xs font-semibold uppercase tracking-[.12em] text-(--ink-muted)">{game.meta}</p><h3 className="display mt-3 text-3xl leading-none">{game.title}</h3></div></div>
            <p className="mt-5 text-sm leading-6 text-(--ink-muted)">{game.reason}</p>
          </Card>
        ))}
      </div>
    </section>
  );
}
