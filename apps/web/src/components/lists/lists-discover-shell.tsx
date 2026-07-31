"use client";
import { Container } from "@/components/ui/container";
import { DiscoverFooter } from "@/components/discover/discover-footer";
import { GamesDiscoverHeader } from "@/components/discover/games-discover-header";
import { discoverCollections } from "@/lib/discover/content";
import { listsDiscoverDefaults } from "@/lib/lists/lists-discover.types";
import { useListsDiscoverParams } from "@/hooks/use-lists-discover-params";
import { useListsFilters } from "@/hooks/use-lists-filters";
import { EmptyListsResults } from "./empty-lists-results";
import { FeaturedListsStrip } from "./featured-lists-strip";
import { ListsFilterBar } from "./lists-filter-bar";
import { ListsGrid } from "./lists-grid";
import { ListsPagination } from "./lists-pagination";
import { ListsResultsHeader } from "./lists-results-header";
export function ListsDiscoverShell() {
  const { filters, update } = useListsDiscoverParams();
  const results = useListsFilters(filters);
  const featured = discoverCollections.filter((list) => list.featured);
  return (
    <div className="flex min-h-dvh flex-col">
      <GamesDiscoverHeader />
      <main className="flex-1">
        <Container className="flex flex-col gap-12 py-8 sm:gap-16 sm:py-12">
          <header className="max-w-3xl">
            <p className="eyebrow">Descobrir · Listas</p>
            <h1 className="display mt-4 text-5xl leading-[.92] sm:text-7xl">
              Jogos vistos por um outro ângulo.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-(--ink-muted)">
              Coleções para uma noite específica, uma plataforma esquecida ou
              apenas a vontade de encontrar algo diferente.
            </p>
          </header>
          <FeaturedListsStrip collections={featured} />
          <div id="results" className="flex flex-col gap-7">
            <div className="hidden lg:block">
              <ListsFilterBar filters={filters} onChange={update} />
            </div>
            <ListsResultsHeader
              total={results.totalItems}
              filters={filters}
              onChange={update}
            />
            {results.items.length ? (
              <ListsGrid collections={results.items} />
            ) : (
              <EmptyListsResults
                onClear={() => update(listsDiscoverDefaults)}
              />
            )}
            <ListsPagination
              page={results.page}
              totalPages={results.totalPages}
              onPageChange={(page) => update({ page }, false)}
            />
          </div>
        </Container>
      </main>
      <DiscoverFooter />
    </div>
  );
}
