import type { DiscoverGame } from "@/lib/discover/types";
import type { GamesDiscoverPage } from "@/lib/discover/games-discover.types";

export const GAMES_PER_PAGE = 16;

export function paginateGames(
  games: readonly DiscoverGame[],
  requestedPage: number,
  pageSize = GAMES_PER_PAGE,
): GamesDiscoverPage {
  const totalPages = Math.max(1, Math.ceil(games.length / pageSize));
  const page = Math.min(Math.max(1, requestedPage), totalPages);
  return {
    items: games.slice((page - 1) * pageSize, page * pageSize),
    totalItems: games.length,
    totalPages,
    page,
  };
}
