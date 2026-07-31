"use client";

import { useCallback, useState } from "react";

import { moveGameBetweenColumns } from "@/lib/board/move-game-between-columns";
import type {
  BoardFilters,
  BoardGame,
  BoardSort,
  MoveGameCommand,
} from "@/lib/board/board.types";

export function useBoardState(initialGames: readonly BoardGame[]) {
  const [games, setGames] = useState<readonly BoardGame[]>(initialGames);
  const [filters] = useState<BoardFilters>({});
  const [sort] = useState<BoardSort>("updatedAt");
  const moveGame = useCallback(
    (command: MoveGameCommand) =>
      setGames((currentGames) => moveGameBetweenColumns(currentGames, command)),
    [],
  );

  return { games, filters, sort, moveGame };
}
