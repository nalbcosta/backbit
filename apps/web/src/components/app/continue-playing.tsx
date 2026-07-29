import { Play } from "lucide-react";

import type { ContinuePlayingGame } from "@/components/app/types";
import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/section-heading";

type ContinuePlayingProps = { game: ContinuePlayingGame };

export function ContinuePlaying({ game }: ContinuePlayingProps) {
  return (
    <section>
      <SectionHeading eyebrow="Agora" title="Continue jogando" />
      <Card className="art mt-7 overflow-hidden rounded-2xl border-0 p-6 sm:p-8">
        <div className="flex items-start justify-between gap-5"><div><p className="text-xs font-semibold uppercase tracking-[.12em] text-(--on-art-muted)">{game.meta}</p><h3 className="display mt-4 text-4xl leading-none sm:text-5xl">{game.title}</h3></div><span className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-(--line-art)"><Play aria-hidden="true" size={17} fill="currentColor" /></span></div>
        <p className="art-muted mt-6 max-w-md text-sm leading-6">{game.note}</p>
        <div className="mt-10 flex items-center justify-between gap-4 text-sm"><span className="art-muted">{game.session}</span><span className="font-semibold">{game.progress}%</span></div>
        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/20"><div className="h-full rounded-full bg-(--on-art)" style={{ width: `${game.progress}%` }} /></div>
      </Card>
    </section>
  );
}
