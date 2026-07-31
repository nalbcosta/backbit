import { discoverCollections } from "@/lib/discover/content";
import { filterLists } from "./filter-lists";
import { paginateLists } from "./paginate-lists";
import { sortLists } from "./sort-lists";
import type { ListsDiscoverFilters } from "./lists-discover.types";

export function getVisibleLists(filters: ListsDiscoverFilters) {
  return paginateLists(
    sortLists(filterLists(discoverCollections, filters), filters.sort),
    filters.page,
  );
}
