import { Badge } from "@/components/ui/badge";
import { BoardCardMeta } from "@/components/board/board-card-meta";
import { boardColumns } from "@/lib/board/mock-board-games";
import type { BoardColumnsByStatus } from "@/lib/board/board.types";

export function BoardList({
  gamesByStatus,
  onOpenGame,
}: {
  gamesByStatus: BoardColumnsByStatus;
  onOpenGame: (gameId: string) => void;
}) {
  return (
    <div className="space-y-8">
      {boardColumns.map((column) => (
        <section key={column.key} aria-labelledby={`list-${column.id}`}>
          <div className="flex items-center justify-between border-b border-(--line) pb-3">
            <h2 id={`list-${column.id}`} className="display text-2xl">
              {column.title}
            </h2>
            <span className="text-sm text-(--ink-muted)">
              {gamesByStatus[column.key].length}
            </span>
          </div>
          {gamesByStatus[column.key].length > 0 ? (
            <ul className="divide-y divide-(--line)">
              {gamesByStatus[column.key].map((game) => (
                <li key={game.id}>
                  <button
                    type="button"
                    onClick={() => onOpenGame(game.id)}
                    className="flex min-h-22 w-full items-center gap-3 py-3 text-left hover:text-(--accent) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--accent)"
                  >
                    <div
                      aria-hidden="true"
                      className="h-14 w-10 shrink-0 rounded-lg bg-(--surface-muted)"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="truncate text-sm font-semibold">
                          {game.title}
                        </h3>
                        <Badge className="px-2 py-0.5 text-[.6rem]">
                          {game.releaseYear}
                        </Badge>
                      </div>
                      <BoardCardMeta game={game} />
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="py-5 text-sm text-(--ink-muted)">
              Ainda não há jogos aqui.
            </p>
          )}
        </section>
      ))}
    </div>
  );
}
