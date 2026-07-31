import { ArrowUpRight } from "lucide-react";

import type { GameSnapshot } from "@/components/app/types";
import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/section-heading";

type BacklogSnapshotProps = { games: readonly GameSnapshot[] };

export function BacklogSnapshot({ games }: BacklogSnapshotProps) {
  return (
    <section>
      <div className="flex items-end justify-between gap-4"><SectionHeading eyebrow="Sua fila" title="Backlog em foco" description="Alguns jogos que ainda fazem sentido para você agora." /><span className="hidden text-sm text-(--ink-muted) sm:block">{games.length} escolhidos</span></div>
      <div className="mt-7 grid gap-3 sm:grid-cols-3">
        {games.map((game) => (
          <Card key={game.title} className="group rounded-2xl p-5">
            <div className="flex items-start justify-between gap-3"><p className="text-xs font-semibold uppercase tracking-[.12em] text-(--ink-muted)">{game.meta}</p><ArrowUpRight aria-hidden="true" size={17} className="text-(--ink-muted) transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></div>
            <h3 className="display mt-8 text-3xl leading-none">{game.title}</h3>
            <p className="mt-4 text-sm leading-6 text-(--ink-muted)">{game.note}</p>
          </Card>
        ))}
      </div>
    </section>
  );
}
