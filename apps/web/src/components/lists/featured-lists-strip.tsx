import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { DiscoverCollection } from "@/lib/discover/types";
export function FeaturedListsStrip({
  collections,
}: {
  collections: readonly DiscoverCollection[];
}) {
  if (!collections.length) return null;
  return (
    <section
      aria-labelledby="featured-lists"
      className="border-y border-(--line) py-5"
    >
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="eyebrow">Seleção editorial</p>
          <h2 id="featured-lists" className="display mt-1 text-3xl">
            Listas com um ponto de partida.
          </h2>
        </div>
        <Link
          href="#results"
          className="hidden items-center gap-2 text-sm font-semibold hover:text-(--accent) sm:inline-flex"
        >
          Ver arquivo <ArrowRight size={16} />
        </Link>
      </div>
      <div className="-mr-5 mt-5 flex snap-x snap-mandatory gap-3 overflow-x-auto pb-1 pr-5 sm:mr-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:pr-0">
        {collections.map((collection) => (
          <Link
            key={collection.id}
            href={`/discover/lists/${collection.slug}?from=/discover/lists`}
            className={`discover-cover discover-cover-${collection.coverTone ?? "night"} min-h-52 w-[78vw] shrink-0 snap-start rounded-2xl p-5 text-white sm:w-auto`}
          >
            <p className="text-xs font-semibold uppercase tracking-[.12em] text-white/70">
              {collection.mood}
            </p>
            <h3 className="display mt-8 text-3xl leading-[.92]">
              {collection.title}
            </h3>
            <p className="mt-3 text-sm text-white/75">
              {collection.gameIds.length} jogos · {collection.curator}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
