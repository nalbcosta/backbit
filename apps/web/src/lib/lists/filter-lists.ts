import type { DiscoverCollection } from "@/lib/discover/types";
import type { ListsDiscoverFilters } from "./lists-discover.types";

export function filterLists(
  lists: readonly DiscoverCollection[],
  filters: ListsDiscoverFilters,
) {
  const query = filters.query.trim().toLocaleLowerCase("pt-BR");
  return lists.filter((list) => {
    const searchable = [
      list.title,
      list.subtitle,
      list.description,
      list.mood,
      list.curator,
      ...(list.tags ?? []),
    ]
      .filter(Boolean)
      .join(" ")
      .toLocaleLowerCase("pt-BR");
    return (
      (!query || searchable.includes(query)) &&
      (filters.theme === "all" || list.tags?.includes(filters.theme)) &&
      (filters.platform === "all" ||
        list.platforms?.includes(filters.platform)) &&
      (filters.curator === "all" || list.curatorType === filters.curator)
    );
  });
}
