"use client";

import { useCallback, useState } from "react";

export function useBoardInteractions() {
  const [selectedGameId, setSelectedGameId] = useState<string | null>(null);
  const openGame = useCallback(
    (gameId: string) => setSelectedGameId(gameId),
    [],
  );
  const closeGame = useCallback(() => setSelectedGameId(null), []);

  return { selectedGameId, openGame, closeGame };
}
