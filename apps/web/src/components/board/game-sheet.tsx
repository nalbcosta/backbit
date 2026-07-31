import { Badge } from "@/components/ui/badge";
import { Dialog } from "@/components/ui/dialog";
import { boardColumns, boardStatusLabels } from "@/lib/board/mock-board-games";
import type { BoardGame, BoardStatus } from "@/lib/board/board.types";

type GameSheetProps = {
  game: BoardGame | null;
  onClose: () => void;
  onMove: (status: BoardStatus) => void;
};

export function GameSheet({ game, onClose, onMove }: GameSheetProps) {
  return (
    <Dialog
      open={game !== null}
      onClose={onClose}
      title={game?.title ?? "Jogo"}
    >
      {game && (
        <div>
          <div className="flex flex-wrap gap-2">
            <Badge>{game.platform}</Badge>
            <Badge>{game.releaseYear}</Badge>
            {game.rating && <Badge>Nota {game.rating.toFixed(1)}</Badge>}
          </div>
          {game.shortNote && (
            <p className="mt-6 text-base leading-7 text-(--ink-muted)">
              {game.shortNote}
            </p>
          )}
          <dl className="mt-8 grid grid-cols-2 gap-5 border-y border-(--line) py-5 text-sm">
            <div>
              <dt className="text-xs font-semibold uppercase tracking-[.12em] text-(--ink-muted)">
                Progresso
              </dt>
              <dd className="mt-2 font-semibold">
                {game.progressLabel ?? "Ainda sem sessão"}
              </dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-[.12em] text-(--ink-muted)">
                Status
              </dt>
              <dd className="mt-2 font-semibold">
                {boardStatusLabels[game.status]}
              </dd>
            </div>
          </dl>
          <label
            className="mt-8 block text-sm font-semibold"
            htmlFor="game-status"
          >
            Mover para
          </label>
          <select
            id="game-status"
            value={game.status}
            onChange={(event) => onMove(event.target.value as BoardStatus)}
            className="mt-2 min-h-12 w-full rounded-xl border border-(--line) bg-(--surface) px-3 text-sm text-(--ink) outline-none focus:border-(--accent) focus:ring-2 focus:ring-(--accent)/20"
          >
            {boardColumns.map((column) => (
              <option key={column.key} value={column.key}>
                {column.title}
              </option>
            ))}
          </select>
        </div>
      )}
    </Dialog>
  );
}
