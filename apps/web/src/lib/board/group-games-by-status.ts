import type { BoardColumnsByStatus, BoardGame } from "@/lib/board/board.types";

export function groupGamesByStatus(
  games: readonly BoardGame[],
): BoardColumnsByStatus {
  const groups: Record<keyof BoardColumnsByStatus, BoardGame[]> = {
    backlog: [],
    playing: [],
    paused: [],
    completed: [],
    dropped: [],
    wishlist: [],
  };

  for (const game of games) {
    groups[game.status]?.push(game);
  }

  return groups;
}
