import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import type { DiscoverCollection } from "@/lib/discover/types";
import {
  getDiscoverRoutes,
  type DiscoverScope,
} from "@/lib/discover/discover-routes";
type ListCardProps = { collection: DiscoverCollection; scope: DiscoverScope };
export function ListCard({ collection, scope }: ListCardProps) {
  return (
    <Card className="flex min-h-60 flex-col justify-between rounded-2xl p-5">
      <div>
        <p className="eyebrow">
          {collection.mood} · {collection.gameIds.length} jogos
        </p>
        <h3 className="display mt-4 text-3xl leading-[.95]">
          {collection.title}
        </h3>
        <p className="mt-4 text-sm leading-6 text-(--ink-muted)">
          {collection.description}
        </p>
      </div>
      <Link
        href={`${getDiscoverRoutes(scope).list(collection.slug)}?from=${getDiscoverRoutes(scope).lists}`}
        className="mt-6 inline-flex items-center gap-2 self-start text-sm font-semibold hover:text-(--accent)"
      >
        Abrir lista <ArrowUpRight aria-hidden="true" size={16} />
      </Link>
    </Card>
  );
}
