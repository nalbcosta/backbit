import type { DiscoverCollection } from "@/lib/discover/types";
import type { ListsDiscoverSort } from "./lists-discover.types";

export function sortLists(
  lists: readonly DiscoverCollection[],
  sort: ListsDiscoverSort,
) {
  return [...lists].sort((a, b) => {
    if (sort === "title") return a.title.localeCompare(b.title, "pt-BR");
    if (sort === "popular") return (b.popularity ?? 0) - (a.popularity ?? 0);
    if (sort === "rating") return (b.rating ?? 0) - (a.rating ?? 0);
    if (sort === "updated")
      return (b.updatedAt ?? "").localeCompare(a.updatedAt ?? "");
    return (
      Number(Boolean(b.featured)) - Number(Boolean(a.featured)) ||
      (b.popularity ?? 0) - (a.popularity ?? 0)
    );
  });
}
