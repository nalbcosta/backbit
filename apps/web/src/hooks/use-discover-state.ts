"use client";

import { useMemo, useState } from "react";
import { discoverGames } from "@/lib/discover/content";
import { filterGames, sortGames } from "@/lib/discover/selectors";
import type { DiscoverFilter, DiscoverGame, DiscoverSort } from "@/lib/discover/types";

export const discoverFilters: readonly DiscoverFilter[] = ["Tudo", "Curto", "Narrativo", "Exploração", "Cooperativo"];

export function useDiscoverState() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<DiscoverFilter>("Tudo");
  const [sort, setSort] = useState<DiscoverSort>("relevancia");
  const [selectedGame, setSelectedGame] = useState<DiscoverGame | null>(null);
  const games = useMemo(() => sortGames(filterGames(discoverGames, query, filter), sort), [filter, query, sort]);
  return { query, setQuery, filter, setFilter, sort, setSort, games, selectedGame, setSelectedGame };
}
