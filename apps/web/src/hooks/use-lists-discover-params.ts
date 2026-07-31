"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";
import {
  listsDiscoverDefaults,
  type ListsDiscoverFilters,
  type ListsDiscoverSort,
} from "@/lib/lists/lists-discover.types";

const validSorts: readonly ListsDiscoverSort[] = [
  "relevance",
  "popular",
  "rating",
  "updated",
  "title",
];
export function useListsDiscoverParams() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const filters = useMemo<ListsDiscoverFilters>(
    () => ({
      query: searchParams.get("q") ?? "",
      theme: searchParams.get("theme") ?? "all",
      platform: searchParams.get("platform") ?? "all",
      curator: searchParams.get("curator") ?? "all",
      sort: validSorts.includes(searchParams.get("sort") as ListsDiscoverSort)
        ? (searchParams.get("sort") as ListsDiscoverSort)
        : "relevance",
      page: Math.max(1, Number(searchParams.get("page")) || 1),
    }),
    [searchParams],
  );
  const update = useCallback(
    (changes: Partial<ListsDiscoverFilters>, resetPage = true) => {
      const next = {
        ...filters,
        ...changes,
        page: resetPage ? 1 : (changes.page ?? filters.page),
      };
      const params = new URLSearchParams();
      (
        Object.entries(next) as Array<
          [keyof ListsDiscoverFilters, string | number]
        >
      ).forEach(([key, value]) => {
        if (value !== listsDiscoverDefaults[key])
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
