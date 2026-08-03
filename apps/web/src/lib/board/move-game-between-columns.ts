import type { BoardGame, MoveGameCommand } from "@/lib/board/board.types";

export function moveGameBetweenColumns(
  games: readonly BoardGame[],
  command: MoveGameCommand,
): readonly BoardGame[] {
  const game = games.find((item) => item.id === command.gameId);

  if (!game) return games;

  const withoutGame = games.filter((item) => item.id !== command.gameId);
  const destinationGames = withoutGame.filter(
    (item) => item.status === command.destinationStatus,
  );
  const destinationIndex = Math.max(
    0,
    Math.min(
      command.destinationIndex ?? destinationGames.length,
      destinationGames.length,
    ),
  );
  const movedGame = { ...game, status: command.destinationStatus };
  const destinationIds = destinationGames.map((item) => item.id);
  destinationIds.splice(destinationIndex, 0, movedGame.id);

  return withoutGame.concat(movedGame).map((item) => {
    if (item.status !== command.destinationStatus) return item;
    const nextPosition = destinationIds.indexOf(item.id);
    return { ...item, position: nextPosition };
  });
}
