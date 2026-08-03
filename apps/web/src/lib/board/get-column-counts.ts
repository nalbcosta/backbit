import {
  boardStatuses,
  type BoardColumnsByStatus,
  type BoardStatus,
} from "@/lib/board/board.types";

export function getColumnCounts(
  columns: BoardColumnsByStatus,
): Record<BoardStatus, number> {
  return Object.fromEntries(
    boardStatuses.map((status) => [status, columns[status].length]),
  ) as Record<BoardStatus, number>;
}
