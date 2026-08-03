import { useState } from "react";
import type {
  BoardColumn as BoardColumnType,
  BoardGame,
} from "@/lib/board/board.types";
import { BoardCard } from "@/components/board/board-card";
import { BoardColumnHeader } from "@/components/board/board-column-header";
import { BoardEmptyState } from "@/components/board/board-empty-state";

type BoardColumnProps = {
  column: BoardColumnType;
  games: readonly BoardGame[];
  onOpenGame: (gameId: string) => void;
  onRemoveGame: (gameId: string) => void;
  onMoveGame: (gameId: string, status: BoardColumnType["key"]) => void;
  onRegisterSession: (gameId: string) => void;
  onDropGame: (
    gameId: string,
    status: BoardColumnType["key"],
    index?: number,
  ) => void;
  onTouchDragStart: (gameId: string) => void;
};

export function BoardColumn({
  column,
  games,
  onOpenGame,
  onRemoveGame,
  onMoveGame,
  onRegisterSession,
  onDropGame,
  onTouchDragStart,
}: BoardColumnProps) {
  const [dragOver, setDragOver] = useState(false);
  const [dropIndex, setDropIndex] = useState<number | null>(null);
  return (
    <section
      aria-labelledby={column.id}
      data-board-status={column.key}
      data-drop-target={column.key}
      onDragEnter={(event) => {
        event.preventDefault();
        setDragOver(true);
      }}
      onDragOver={(event) => {
        event.preventDefault();
        const target =
          event.target instanceof Element
            ? event.target.closest("[data-game-id]")
            : null;
        const index = target
          ? games.findIndex((game) => game.id === target.getAttribute("data-game-id"))
          : games.length;
        setDropIndex(index < 0 ? games.length : index);
      }}
      onDragLeave={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setDragOver(false);
          setDropIndex(null);
        }
      }}
      onDrop={(event) => {
        event.preventDefault();
        const gameId = event.dataTransfer.getData("text/plain");
        const target =
          event.target instanceof Element
            ? event.target.closest("[data-game-id]")
            : null;
        const index = target
          ? games.findIndex(
              (game) => game.id === target.getAttribute("data-game-id"),
            )
          : undefined;
        if (gameId)
          onDropGame(gameId, column.key, index === -1 ? undefined : index);
        setDragOver(false);
        setDropIndex(null);
      }}
      className={`flex min-h-[calc(100dvh-13rem)] w-full flex-col rounded-2xl border p-3 transition-colors md:min-h-0 md:w-auto ${dragOver ? "border-(--accent) bg-(--accent)/10" : "border-(--line) bg-(--surface-muted)"}`}
    >
      <BoardColumnHeader column={column} count={games.length} />
      {games.length > 0 ? (
        <ul className="relative space-y-3 md:min-h-0 md:flex-1 md:overflow-y-auto md:pr-1">
          {games.map((game, index) => (
            <li key={game.id}>
              {dragOver && dropIndex === index && (
                <div aria-hidden="true" className="mb-3 h-1 rounded-full bg-(--accent)" />
              )}
              <BoardCard
                game={game}
                onOpen={onOpenGame}
                onRemove={onRemoveGame}
                onMoveGame={onMoveGame}
                onRegisterSession={onRegisterSession}
                onDragStart={() => undefined}
                onTouchDragStart={onTouchDragStart}
              />
            </li>
          ))}
          {dragOver && dropIndex === games.length && (
            <div aria-hidden="true" className="mt-3 h-1 rounded-full bg-(--accent)" />
          )}
        </ul>
      ) : (
        <BoardEmptyState column={column} />
      )}
    </section>
  );
}
