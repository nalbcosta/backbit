import type { DiscoverCollection } from "@/lib/discover/types";
import { ListCard } from "./list-card";
import type { DiscoverScope } from "@/lib/discover/discover-routes";
export function ListsGrid({
  collections,
  scope,
}: {
  collections: readonly DiscoverCollection[];
  scope: DiscoverScope;
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {collections.map((collection) => (
        <ListCard key={collection.id} collection={collection} scope={scope} />
      ))}
    </div>
  );
}
