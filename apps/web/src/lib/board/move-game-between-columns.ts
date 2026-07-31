import type { BoardGame, MoveGameCommand } from "@/lib/board/board.types";

export function moveGameBetweenColumns(
  games: readonly BoardGame[],
  command: MoveGameCommand,
): readonly BoardGame[] {
  const game = games.find((item) => item.id === command.gameId);

  if (!game || game.status === command.destinationStatus) return games;

  return games.map((item) =>
    item.id === command.gameId
      ? { ...item, status: command.destinationStatus }
      : item,
  );
}
