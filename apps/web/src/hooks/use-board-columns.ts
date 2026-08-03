"use client";

import { useMemo } from "react";

import { groupGamesByStatus } from "@/lib/board/group-games-by-status";
import { sortBoardGames } from "@/lib/board/sort-board-games";
import type {
  BoardColumnsByStatus,
  BoardGame,
  BoardSort,
} from "@/lib/board/board.types";

export function useBoardColumns(
  games: readonly BoardGame[],
  sort: BoardSort,
): BoardColumnsByStatus {
  return useMemo(
    () => groupGamesByStatus(sortBoardGames(games, sort)),
    [games, sort],
  );
}
