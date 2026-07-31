import type {
  BoardColumn as BoardColumnType,
  BoardColumnsByStatus,
  BoardStatus,
} from "@/lib/board/board.types";
import { BoardColumn } from "@/components/board/board-column";

type BoardGridProps = {
  columns: readonly BoardColumnType[];
  gamesByStatus: BoardColumnsByStatus;
  activeStatus: BoardStatus;
  onOpenGame: (gameId: string) => void;
};

export function BoardGrid({
  columns,
  gamesByStatus,
  activeStatus,
  onOpenGame,
}: BoardGridProps) {
  return (
    <div aria-label="Board de jogos" className="md:overflow-x-auto md:pb-3">
      <div className="grid gap-4 md:min-w-[108rem] md:grid-cols-6">
        {columns.map((column) => (
          <BoardColumn
            key={column.id}
            column={column}
            games={gamesByStatus[column.key]}
            isActive={activeStatus === column.key}
            onOpenGame={onOpenGame}
          />
        ))}
      </div>
    </div>
  );
}
