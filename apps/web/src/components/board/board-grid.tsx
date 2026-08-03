import { useRef, type CSSProperties } from "react";

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
  onDropGame: (gameId: string, status: BoardStatus, index?: number) => void;
  onTouchDragStart: (gameId: string) => void;
  onStatusChange: (status: BoardStatus) => void;
};

export function BoardGrid({
  columns,
  gamesByStatus,
  activeStatus,
  onOpenGame,
  onDropGame,
  onTouchDragStart,
  onStatusChange,
}: BoardGridProps) {
  const touchStartX = useRef<number | null>(null);
  const activeIndex = columns.findIndex(
    (column) => column.key === activeStatus,
  );

  function handleTouchEnd(event: React.TouchEvent<HTMLDivElement>) {
    const startX = touchStartX.current;
    const endX = event.changedTouches[0]?.clientX;
    touchStartX.current = null;
    if (startX === null || endX === undefined || Math.abs(startX - endX) < 48)
      return;
    const direction = startX > endX ? 1 : -1;
    const nextColumn = columns[activeIndex + direction];
    if (nextColumn) onStatusChange(nextColumn.key);
  }

  return (
    <div
      onTouchStart={(event) => {
        touchStartX.current = event.touches[0]?.clientX ?? null;
      }}
      onTouchEnd={handleTouchEnd}
      aria-label="Board de jogos"
      className="-mx-5 overflow-hidden px-5 pb-24 touch-pan-y md:mx-0 md:h-[calc(100dvh-20rem)] md:min-h-120 md:overflow-x-auto md:pb-3"
    >
      <div
        className="flex w-full translate-x-(--board-carousel-offset) transition-transform duration-300 ease-out md:grid md:h-full md:min-w-[108rem] md:translate-x-0 md:grid-cols-6"
        style={
          {
            "--board-carousel-offset": `-${Math.max(activeIndex, 0) * 100}%`,
          } as CSSProperties
        }
      >
        {columns.map((column) => (
          <div key={column.id} className="w-full shrink-0 pr-4 md:contents">
            <BoardColumn
              column={column}
              games={gamesByStatus[column.key]}
              onOpenGame={onOpenGame}
              onDropGame={onDropGame}
              onTouchDragStart={onTouchDragStart}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
