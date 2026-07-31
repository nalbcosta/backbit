import { discoverGames } from "@/lib/discover/content";
import { filterGamesForDiscover } from "@/lib/discover/filter-games";
import { paginateGames } from "@/lib/discover/paginate-games";
import { sortGamesForDiscover } from "@/lib/discover/sort-games";
import type { GamesDiscoverFilters } from "@/lib/discover/games-discover.types";

export function getVisibleGames(filters: GamesDiscoverFilters) {
  return paginateGames(
    sortGamesForDiscover(
      filterGamesForDiscover(discoverGames, filters),
      filters.sort,
    ),
    filters.page,
  );
}
