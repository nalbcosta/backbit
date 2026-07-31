import type { DiscoverCollection } from "@/lib/discover/types";
import { ListCard } from "./list-card";
export function ListsGrid({
  collections,
}: {
  collections: readonly DiscoverCollection[];
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {collections.map((collection) => (
        <ListCard key={collection.id} collection={collection} />
      ))}
    </div>
  );
}
