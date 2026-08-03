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
  onDropGame,
  onTouchDragStart,
}: BoardColumnProps) {
  return (
    <section
      aria-labelledby={column.id}
      data-board-status={column.key}
      data-drop-target={column.key}
      onDragOver={(event) => event.preventDefault()}
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
      }}
      className="flex min-h-[calc(100dvh-13rem)] w-full flex-col rounded-2xl border border-(--line) bg-(--surface-muted) p-3 md:min-h-0 md:w-auto"
    >
      <BoardColumnHeader column={column} count={games.length} />
      {games.length > 0 ? (
        <ul className="space-y-3 md:min-h-0 md:flex-1 md:overflow-y-auto md:pr-1">
          {games.map((game) => (
            <li key={game.id}>
              <BoardCard
                game={game}
                onOpen={onOpenGame}
                onDragStart={() => undefined}
                onTouchDragStart={onTouchDragStart}
              />
            </li>
          ))}
        </ul>
      ) : (
        <BoardEmptyState column={column} />
      )}
    </section>
  );
}
