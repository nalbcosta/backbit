"use client";
import { useMemo } from "react";
import { getVisibleLists } from "@/lib/lists/get-visible-lists";
import type { ListsDiscoverFilters } from "@/lib/lists/lists-discover.types";
export function useListsFilters(filters: ListsDiscoverFilters) {
  return useMemo(() => getVisibleLists(filters), [filters]);
}
