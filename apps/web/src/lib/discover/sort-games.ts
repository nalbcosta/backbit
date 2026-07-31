import type { DiscoverGame } from "@/lib/discover/types";
import type { GamesDiscoverSort } from "@/lib/discover/games-discover.types";

export function sortGamesForDiscover(
  games: readonly DiscoverGame[],
  sort: GamesDiscoverSort,
) {
  return [...games].sort((first, second) => {
    if (sort === "score") return second.score - first.score;
    if (sort === "newest") return second.year - first.year;
    if (sort === "title")
      return first.title.localeCompare(second.title, "pt-BR");
    return (
      Number(Boolean(second.featured)) - Number(Boolean(first.featured)) ||
      second.score - first.score
    );
  });
}
