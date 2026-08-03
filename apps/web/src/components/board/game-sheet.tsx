import { Badge } from "@/components/ui/badge";
import { Dialog } from "@/components/ui/dialog";
import { getGameProgressLabel } from "@/lib/board/board-game-progress";
import { Plus } from "lucide-react";
import { boardColumns, boardStatusLabels } from "@/lib/board/mock-board-games";
import type { BoardGame, BoardStatus } from "@/lib/board/board.types";

type GameSheetProps = {
  game: BoardGame | null;
  onClose: () => void;
  onMove: (status: BoardStatus) => void;
  onRegisterSession: () => void;
};

export function GameSheet({
  game,
  onClose,
  onMove,
  onRegisterSession,
}: GameSheetProps) {
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
                {getGameProgressLabel(game) ?? "Ainda sem sessão"}
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
          <div className="mt-8 border-b border-(--line) pb-8">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h3 className="text-sm font-semibold">Sessões</h3>
                <p className="mt-1 text-xs text-(--ink-muted)">
                  {game.sessions.length === 0
                    ? "Nenhuma sessão registrada."
                    : `${game.sessions.length} registro${game.sessions.length === 1 ? "" : "s"}`}
                </p>
              </div>
              <button
                type="button"
                aria-label="Registrar sessão"
                onClick={onRegisterSession}
                className="inline-flex size-11 items-center justify-center rounded-full bg-(--action-bg) text-(--action-fg) md:size-auto md:min-h-11 md:gap-2 md:px-4 md:text-sm md:font-semibold"
              >
                <Plus aria-hidden="true" size={17} />
                <span className="sr-only md:not-sr-only">Registrar</span>
              </button>
            </div>
            {game.sessions.length > 0 && (
              <ul className="mt-4 divide-y divide-(--line)">
                {[...game.sessions]
                  .sort((first, second) =>
                    second.playedOn.localeCompare(first.playedOn),
                  )
                  .map((session) => (
                    <li
                      key={session.id}
                      className="py-3 text-sm leading-6 text-(--ink-muted)"
                    >
                      <span className="font-semibold text-(--ink)">
                        {new Intl.DateTimeFormat("pt-BR").format(
                          new Date(`${session.playedOn}T12:00:00`),
                        )}
                      </span>{" "}
                      · {session.durationMinutes} min
                      {session.progressPercent !== undefined
                        ? ` · ${session.progressPercent}%`
                        : ""}
                      {session.note ? (
                        <span className="block">{session.note}</span>
                      ) : null}
                    </li>
                  ))}
              </ul>
            )}
          </div>
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
