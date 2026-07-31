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
  isActive: boolean;
  onOpenGame: (gameId: string) => void;
};

export function BoardColumn({
  column,
  games,
  isActive,
  onOpenGame,
}: BoardColumnProps) {
  return (
    <section
      aria-labelledby={column.id}
      data-board-status={column.key}
      className={`${isActive ? "block" : "hidden"} rounded-2xl border border-(--line) bg-(--surface-muted) p-3 md:block`}
    >
      <BoardColumnHeader column={column} count={games.length} />
      {games.length > 0 ? (
        <ul className="space-y-3">
          {games.map((game) => (
            <li key={game.id}>
              <BoardCard game={game} onOpen={onOpenGame} />
            </li>
          ))}
        </ul>
      ) : (
        <BoardEmptyState column={column} />
      )}
    </section>
  );
}
