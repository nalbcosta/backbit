import { ArrowUpRight, Star } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import type { DiscoverCollection } from "@/lib/discover/types";
import {
  getDiscoverRoutes,
  type DiscoverScope,
} from "@/lib/discover/discover-routes";

type Props = { collection: DiscoverCollection; scope: DiscoverScope };
export function ListCard({ collection, scope }: Props) {
  const tone = collection.coverTone ?? "night";
  return (
    <Card className="group flex min-h-80 flex-col overflow-hidden rounded-2xl p-0">
      <div
        className={`discover-cover discover-cover-${tone} min-h-32 p-5 text-white`}
      >
        <p className="text-xs font-semibold uppercase tracking-[.12em] text-white/70">
          {collection.subtitle ?? collection.mood}
        </p>
        <h3 className="display mt-5 max-w-sm text-3xl leading-[.92]">
          {collection.title}
        </h3>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-sm leading-6 text-(--ink-muted)">
          {collection.description}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {(collection.tags ?? []).slice(0, 2).map((tag) => (
            <Badge key={tag}>{tag}</Badge>
          ))}
        </div>
        <div className="mt-auto flex items-end justify-between gap-3 pt-6 text-xs text-(--ink-muted)">
          <span>
            {collection.gameIds.length} jogos ·{" "}
            {collection.curatorType ?? "Editorial"}
          </span>
          {collection.rating ? (
            <span className="inline-flex items-center gap-1">
              <Star aria-hidden="true" size={13} fill="currentColor" />
              {collection.rating.toFixed(1)}
            </span>
          ) : null}
        </div>
        <Link
          href={`${getDiscoverRoutes(scope).list(collection.slug)}?from=${getDiscoverRoutes(scope).lists}`}
          className="mt-4 inline-flex items-center gap-2 self-start text-sm font-semibold transition-colors hover:text-(--accent)"
        >
          Abrir lista <ArrowUpRight aria-hidden="true" size={16} />
        </Link>
      </div>
    </Card>
  );
}
