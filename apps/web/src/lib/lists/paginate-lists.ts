import type { DiscoverCollection } from "@/lib/discover/types";
import type { ListsDiscoverPage } from "./lists-discover.types";

const pageSize = 6;
export function paginateLists(
  items: readonly DiscoverCollection[],
  requestedPage: number,
): ListsDiscoverPage {
  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
  const page = Math.min(Math.max(1, requestedPage), totalPages);
  return {
    items: items.slice((page - 1) * pageSize, page * pageSize),
    totalItems: items.length,
    totalPages,
    page,
  };
}
