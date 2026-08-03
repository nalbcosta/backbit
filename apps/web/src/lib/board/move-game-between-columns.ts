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
  const movedGame = {
    ...game,
    status: command.destinationStatus,
    updatedAt: new Date().toISOString(),
  };
  const destinationIds = destinationGames.map((item) => item.id);
  destinationIds.splice(destinationIndex, 0, movedGame.id);
  const nextGames = withoutGame.concat(movedGame);
  return nextGames.map((item) => {
    const columnGames = nextGames
      .filter((candidate) => candidate.status === item.status)
      .sort((first, second) => first.position - second.position);
    const orderedIds =
      item.status === command.destinationStatus
        ? destinationIds
        : columnGames.map((candidate) => candidate.id);
    return { ...item, position: orderedIds.indexOf(item.id) };
  });
}
