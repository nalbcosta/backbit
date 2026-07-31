import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Dialog } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import type { DiscoverGame } from "@/lib/discover/types";
import {
  getDiscoverRoutes,
  type DiscoverScope,
} from "@/lib/discover/discover-routes";
type GameModalProps = {
  game: DiscoverGame | null;
  onClose: () => void;
  scope: DiscoverScope;
};
export function GameModal({ game, onClose, scope }: GameModalProps) {
  return (
    <Dialog
      open={Boolean(game)}
      onClose={onClose}
      title={game?.title ?? "Prévia do jogo"}
    >
      {game && (
        <div>
          <div
            className={`discover-cover discover-cover-${game.coverTone} min-h-48 rounded-2xl p-5 text-white`}
          >
            <div className="flex justify-between">
              <Badge variant="inverse">
                {game.score.toFixed(1)} no Backbit
              </Badge>
              <span className="text-sm">{game.duration}</span>
            </div>
          </div>
          <p className="mt-6 text-base leading-7 text-(--ink-muted)">
            {game.summary}
          </p>
          <dl className="mt-6 grid grid-cols-2 gap-4 border-y border-(--line) py-5 text-sm">
            <div>
              <dt className="text-(--ink-muted)">Estúdio</dt>
              <dd className="mt-1 font-semibold">{game.studio}</dd>
            </div>
            <div>
              <dt className="text-(--ink-muted)">Onde jogar</dt>
              <dd className="mt-1 font-semibold">
                {game.platforms.join(", ")}
              </dd>
            </div>
          </dl>
          <Link
            href={getDiscoverRoutes(scope).game(game.slug)}
            className="mt-6 inline-flex min-h-11 items-center gap-2 text-sm font-semibold underline underline-offset-4 hover:text-(--accent)"
          >
            Ver página do jogo <ArrowUpRight aria-hidden="true" size={16} />
          </Link>
        </div>
      )}
    </Dialog>
  );
}
