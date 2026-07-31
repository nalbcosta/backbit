import type { DiscoverGame } from "@/lib/discover/types";
import type { GamesDiscoverFilters } from "@/lib/discover/games-discover.types";

export function filterGamesForDiscover(
  games: readonly DiscoverGame[],
  filters: GamesDiscoverFilters,
) {
  const query = filters.query.trim().toLocaleLowerCase("pt-BR");
  return games.filter((game) => {
    const searchable = [
      game.title,
      game.studio,
      ...game.genres,
      ...game.platforms,
      ...game.tags,
    ]
      .join(" ")
      .toLocaleLowerCase("pt-BR");
    const releaseMatches =
      filters.release === "all" ||
      String(game.year) === filters.release ||
      (filters.release === "2023 e anteriores" && game.year <= 2023);
    const ratingMatches =
      filters.rating === "all" ||
      (filters.rating === "9+" && game.score >= 9) ||
      (filters.rating === "8–8.9" && game.score >= 8 && game.score < 9);
    return (
      (!query || searchable.includes(query)) &&
      (filters.genre === "all" || game.genres.includes(filters.genre)) &&
      (filters.platform === "all" ||
        game.platforms.includes(filters.platform)) &&
      releaseMatches &&
      ratingMatches
    );
  });
}
