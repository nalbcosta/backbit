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

type UndoEntry =
  | { kind: "game"; game: BoardGame }
  | {
      kind: "session";
      gameId: string;
      session: BoardGame["sessions"][number];
      previousProgress?: number;
    };

export function useBoardState(initialGames: readonly BoardGame[]) {
  const [games, setGames] = useState<readonly BoardGame[]>(initialGames);
  const [filters] = useState<BoardFilters>({});
  const [sort] = useState<BoardSort>("position");
  const [undoEntry, setUndoEntry] = useState<UndoEntry | null>(null);
  const moveGame = useCallback(
    (command: MoveGameCommand) =>
      setGames((currentGames) => moveGameBetweenColumns(currentGames, command)),
    [],
  );
  const removeGame = useCallback((gameId: string) => {
    const game = games.find((item) => item.id === gameId);
    if (game) setUndoEntry({ kind: "game", game });
    setGames((currentGames) => currentGames.filter((item) => item.id !== gameId));
  }, [games]);
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
  const updateSession = useCallback(
    (command: RegisterSessionCommand) => {
      setGames((currentGames) =>
        currentGames.map((game) =>
          game.id === command.gameId
            ? {
                ...game,
                progressPercent: command.session.progressPercent,
                sessions: game.sessions.map((session) =>
                  session.id === command.session.id ? command.session : session,
                ),
                updatedAt: new Date().toISOString(),
              }
            : game,
        ),
      );
    },
    [],
  );
  const removeSession = useCallback(
    (gameId: string, sessionId: string) => {
      const game = games.find((item) => item.id === gameId);
      const session = game?.sessions.find((item) => item.id === sessionId);
      if (!game || !session) return;
      setUndoEntry({
        kind: "session",
        gameId,
        session,
        previousProgress: game.progressPercent,
      });
      setGames((currentGames) =>
        currentGames.map((item) =>
          item.id === gameId
            ? {
                ...item,
                progressPercent:
                  [...item.sessions]
                    .filter((itemSession) => itemSession.id !== sessionId)
                    .sort((first, second) =>
                      second.playedOn.localeCompare(first.playedOn),
                    )[0]?.progressPercent,
                sessions: item.sessions.filter(
                  (itemSession) => itemSession.id !== sessionId,
                ),
                updatedAt: new Date().toISOString(),
              }
            : item,
        ),
      );
    },
    [games],
  );
  const undoLastRemoval = useCallback(() => {
    if (!undoEntry) return;
    setGames((currentGames) => {
      if (undoEntry.kind === "game") {
        if (currentGames.some((game) => game.id === undoEntry.game.id))
          return currentGames;
        return [...currentGames, undoEntry.game];
      }
      return currentGames.map((game) =>
        game.id === undoEntry.gameId
          ? {
              ...game,
              progressPercent: undoEntry.previousProgress,
              sessions: [...game.sessions, undoEntry.session],
            }
          : game,
      );
    });
    setUndoEntry(null);
  }, [undoEntry]);

  return {
    games,
    filters,
    sort,
    moveGame,
    removeGame,
    addGame,
    registerSession,
    updateSession,
    removeSession,
    undoEntry,
    undoLastRemoval,
  };
}
