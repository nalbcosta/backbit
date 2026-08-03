"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";
import {
  gamesDiscoverDefaults,
  type GamesDiscoverFilters,
  type GamesDiscoverSort,
} from "@/lib/discover/games-discover.types";

const validSorts: readonly GamesDiscoverSort[] = [
  "relevance",
  "score",
  "newest",
  "title",
];

export function useGamesDiscoverParams() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const filters = useMemo<GamesDiscoverFilters>(
    () => ({
      query: searchParams.get("q") ?? "",
      genre: searchParams.get("genre") ?? "all",
      platform: searchParams.get("platform") ?? "all",
      release: searchParams.get("release") ?? "all",
      rating: searchParams.get("rating") ?? "all",
      sort: validSorts.includes(searchParams.get("sort") as GamesDiscoverSort)
        ? (searchParams.get("sort") as GamesDiscoverSort)
        : "relevance",
      page: Math.max(1, Number(searchParams.get("page")) || 1),
    }),
    [searchParams],
  );
  const update = useCallback(
    (changes: Partial<GamesDiscoverFilters>, resetPage = true) => {
      const next = {
        ...filters,
        ...changes,
        page: resetPage ? 1 : (changes.page ?? filters.page),
      };
      const params = new URLSearchParams();
      (
        Object.entries(next) as Array<
          [keyof GamesDiscoverFilters, string | number]
        >
      ).forEach(([key, value]) => {
        if (value !== gamesDiscoverDefaults[key])
          params.set(key === "query" ? "q" : key, String(value));
      });
      router.replace(params.size ? `${pathname}?${params}` : pathname, {
        scroll: false,
      });
    },
    [filters, pathname, router],
  );
  return { filters, update };
}
