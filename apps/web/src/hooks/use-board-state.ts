"use client";

import { useCallback, useState } from "react";

import { moveGameBetweenColumns } from "@/lib/board/move-game-between-columns";
import type {
  AddGameCommand,
  BoardFilters,
  BoardGame,
  BoardSort,
  MoveGameCommand,
  RegisterSessionCommand,
} from "@/lib/board/board.types";

export function useBoardState(initialGames: readonly BoardGame[]) {
  const [games, setGames] = useState<readonly BoardGame[]>(initialGames);
  const [filters] = useState<BoardFilters>({});
  const [sort] = useState<BoardSort>("position");
  const moveGame = useCallback(
    (command: MoveGameCommand) =>
      setGames((currentGames) => moveGameBetweenColumns(currentGames, command)),
    [],
  );
  const addGame = useCallback((command: AddGameCommand) => {
    setGames((currentGames) => {
      if (currentGames.some((game) => game.title === command.game.title))
        return currentGames;
      const position = currentGames.filter(
        (game) => game.status === command.destinationStatus,
      ).length;
      return [
        ...currentGames,
        {
          ...command.game,
          id: `board-${command.game.id}`,
          slug: command.game.title
            .toLocaleLowerCase("pt-BR")
            .replaceAll(" ", "-"),
          status: command.destinationStatus,
          position,
          sessions: [],
          tags: [],
          updatedAt: new Date().toISOString(),
        },
      ];
    });
  }, []);
  const registerSession = useCallback((command: RegisterSessionCommand) => {
    setGames((currentGames) =>
      currentGames.map((game) =>
        game.id === command.gameId
          ? {
              ...game,
              progressPercent:
                command.session.progressPercent ?? game.progressPercent,
              sessions: [...game.sessions, command.session],
              updatedAt: new Date().toISOString(),
            }
          : game,
      ),
    );
  }, []);

  return { games, filters, sort, moveGame, addGame, registerSession };
}
