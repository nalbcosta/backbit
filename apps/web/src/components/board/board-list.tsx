import { Clock3, Trash2 } from "lucide-react";
import { useState } from "react";

import { BoardCardMeta } from "@/components/board/board-card-meta";
import { BoardCover } from "@/components/board/board-cover";
import { GameRemovalDialog } from "@/components/board/game-removal-dialog";
import { Badge } from "@/components/ui/badge";
import { boardColumns, boardStatusLabels } from "@/lib/board/mock-board-games";
import { getLatestSession, getGameProgressLabel } from "@/lib/board/board-game-progress";
import type { BoardColumnsByStatus, BoardGame, BoardStatus } from "@/lib/board/board.types";

export function BoardList({
  gamesByStatus,
  onOpenGame,
  onRemoveGame,
  onMoveGame,
  onRegisterSession,
}: {
  gamesByStatus: BoardColumnsByStatus;
  onOpenGame: (gameId: string) => void;
  onRemoveGame: (gameId: string) => void;
  onMoveGame: (gameId: string, status: BoardStatus) => void;
  onRegisterSession: (gameId: string) => void;
}) {
  const [gameToRemove, setGameToRemove] = useState<BoardGame | null>(null);
  return (
    <>
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
                {gamesByStatus[column.key].map((game) => {
                  const latestSession = getLatestSession(game.sessions);
                  return (
                    <li key={game.id} className="py-3">
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => onOpenGame(game.id)}
                          className="flex min-w-0 flex-1 items-center gap-3 text-left hover:text-(--accent) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--accent)"
                        >
                          <BoardCover game={game} className="h-14 w-10 rounded-lg" />
                          <span className="min-w-0 flex-1">
                            <span className="flex items-center gap-2">
                              <span className="truncate text-sm font-semibold">{game.title}</span>
                              <Badge className="px-2 py-0.5 text-[.6rem]">{game.releaseYear}</Badge>
                            </span>
                            <span className="mt-1 block text-xs text-(--ink-muted)">
                              {game.platform} · {boardStatusLabels[game.status]}
                            </span>
                            <span className="mt-1 block text-xs text-(--ink-muted)">
                              {getGameProgressLabel(game) ?? "Sem progresso"} · {game.sessions.length} sessão{game.sessions.length === 1 ? "" : "ões"}
                              {latestSession ? ` · última em ${latestSession.playedOn}` : ""}
                            </span>
                            <BoardCardMeta game={game} />
                          </span>
                        </button>
                        <div className="flex shrink-0 items-center gap-1">
                          <select
                            aria-label={`Mover ${game.title}`}
                            value={game.status}
                            onChange={(event) => onMoveGame(game.id, event.target.value as BoardStatus)}
                            className="hidden min-h-9 max-w-28 rounded-full border border-(--line) bg-(--surface) px-2 text-xs text-(--ink-muted) outline-none focus:border-(--accent) sm:block"
                          >
                            {boardColumns.map((item) => <option key={item.key} value={item.key}>{item.title}</option>)}
                          </select>
                          <button
                            type="button"
                            aria-label={`Registrar sessão de ${game.title}`}
                            onClick={() => onRegisterSession(game.id)}
                            className="inline-flex size-9 items-center justify-center rounded-full text-(--ink-muted) hover:bg-(--surface-muted) hover:text-(--ink)"
                          >
                            <Clock3 aria-hidden="true" size={15} />
                          </button>
                          <button
                            type="button"
                            aria-label={`Remover ${game.title}`}
                            onClick={() => setGameToRemove(game)}
                            className="inline-flex size-9 items-center justify-center rounded-full text-(--ink-muted) hover:bg-(--surface-muted) hover:text-(--accent)"
                          >
                            <Trash2 aria-hidden="true" size={15} />
                          </button>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className="py-5 text-sm text-(--ink-muted)">Ainda não há jogos aqui.</p>
            )}
          </section>
        ))}
      </div>
      {gameToRemove && (
        <GameRemovalDialog
          gameTitle={gameToRemove.title}
          open
          onClose={() => setGameToRemove(null)}
          onConfirm={() => {
            onRemoveGame(gameToRemove.id);
            setGameToRemove(null);
          }}
        />
      )}
    </>
  );
}
