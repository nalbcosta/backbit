import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import type { DiscoverGame } from "@/lib/discover/types";
import {
  getDiscoverRoutes,
  type DiscoverScope,
} from "@/lib/discover/discover-routes";

type Props = { games: readonly DiscoverGame[]; scope: DiscoverScope };
export function GamesGrid({ games, scope }: Props) {
  const routes = getDiscoverRoutes(scope);
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {games.map((game) => (
        <Card
          key={game.id}
          className="group flex h-full flex-col overflow-hidden rounded-2xl"
        >
          <div
            className={`discover-cover discover-cover-${game.coverTone} flex min-h-48 flex-col justify-between p-4 text-white sm:min-h-52`}
          >
            <div className="flex items-center justify-between">
              <Badge variant="inverse">{game.score.toFixed(1)}</Badge>
              <span className="text-xs font-semibold uppercase tracking-[.12em]">
                {game.year}
              </span>
            </div>
            <p className="max-w-48 text-sm leading-5 text-white/80">
              {game.note}
            </p>
          </div>
          <div className="flex flex-1 flex-col p-5">
            <p className="text-xs font-semibold uppercase tracking-[.12em] text-(--ink-muted)">
              {game.studio} · {game.platforms.slice(0, 2).join(" · ")}
            </p>
            <h3 className="display mt-2 text-3xl leading-none">{game.title}</h3>
            <p className="mt-3 min-h-12 text-sm leading-6 text-(--ink-muted)">
              {game.summary}
            </p>
            <div className="mt-auto flex items-center justify-between gap-3 pt-6">
              <span className="text-xs font-semibold uppercase tracking-[.12em] text-(--ink-muted)">
                {game.duration}
              </span>
              <Link
                href={`${routes.game(game.slug)}?from=${routes.games}`}
                aria-label={`Abrir detalhes de ${game.title}`}
                className="inline-flex size-10 items-center justify-center rounded-full border border-(--line) transition-colors hover:bg-(--action-bg) hover:text-(--action-fg) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--accent)"
              >
                <ArrowUpRight aria-hidden="true" size={17} />
              </Link>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
