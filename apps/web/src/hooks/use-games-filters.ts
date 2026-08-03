"use client";

import { useMemo } from "react";
import { getVisibleGames } from "@/lib/discover/get-visible-games";
import type { GamesDiscoverFilters } from "@/lib/discover/games-discover.types";

export function useGamesFilters(filters: GamesDiscoverFilters) {
  return useMemo(() => getVisibleGames(filters), [filters]);
}
