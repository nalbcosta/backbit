"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { GamesDiscoverHeader } from "@/components/discover/games-discover-header";
import { GamesFilterBar } from "@/components/discover/games-filter-bar";
import { GamesGrid } from "@/components/discover/games-grid";
import { GamesPagination } from "@/components/discover/games-pagination";
import { GamesResultsHeader } from "@/components/discover/games-results-header";
import { EmptyResults } from "@/components/discover/empty-results";
import { discoverGames } from "@/lib/discover/content";
import { gamesDiscoverDefaults } from "@/lib/discover/games-discover.types";
import { useGamesDiscoverParams } from "@/hooks/use-games-discover-params";
import { useGamesFilters } from "@/hooks/use-games-filters";
import { DiscoverFooter } from "@/components/discover/discover-footer";
import {
  getDiscoverRoutes,
  type DiscoverScope,
} from "@/lib/discover/discover-routes";

export function GamesDiscoverShell({ scope }: { scope: DiscoverScope }) {
  const { filters, update } = useGamesDiscoverParams();
  const results = useGamesFilters(filters);
  const featured = discoverGames.filter((game) => game.featured);
  return (
    <div className="flex min-h-dvh flex-col">
      {scope === "public" && <GamesDiscoverHeader />}
      <div className="flex-1">
        <Container className="flex flex-col gap-12 py-8 sm:gap-16 sm:py-12">
          <header className="max-w-3xl">
            <p className="eyebrow">Descobrir · Jogos</p>
            <h1 className="display mt-4 text-5xl leading-[.92] sm:text-7xl">
              Encontre o jogo que combina com agora.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-(--ink-muted)">
              Um catálogo menor, organizado por tempo, clima e vontade de jogar.
            </p>
          </header>
          <section
            aria-labelledby="featured-games"
            className="flex flex-col gap-5 border-y border-(--line) py-5"
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="eyebrow">Escolhas da semana</p>
                <h2 id="featured-games" className="display mt-1 text-3xl">
                  Para começar sem procurar demais.
                </h2>
              </div>
              <Link
                href="#results"
                className="inline-flex items-center gap-2 text-sm font-semibold text-(--ink) hover:text-(--accent)"
              >
                Ver catálogo <ArrowRight aria-hidden="true" size={16} />
              </Link>
            </div>
            <div className="-mr-5 flex snap-x snap-mandatory gap-3 overflow-x-auto pb-1 pr-5 sm:mr-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:pr-0 lg:gap-4">
              {featured.map((game) => (
                <Link
                  key={game.id}
                  href={`${getDiscoverRoutes(scope).game(game.slug)}?from=${getDiscoverRoutes(scope).games}`}
                  className={`discover-cover discover-cover-${game.coverTone} min-h-56 w-[82vw] shrink-0 snap-start rounded-2xl p-6 text-white transition-transform hover:-translate-y-0.5 sm:min-h-64 sm:w-auto lg:min-h-72 lg:p-7`}
                >
                  <p className="text-xs font-semibold uppercase tracking-[.12em] text-white/70">
                    {game.genres[0]} · {game.duration}
                  </p>
                  <h3 className="display mt-7 text-3xl">{game.title}</h3>
                  <p className="mt-2 text-sm text-white/80">{game.note}</p>
                </Link>
              ))}
            </div>
          </section>
          <div id="results" className="flex flex-col gap-7">
            <div className="hidden lg:block">
              <GamesFilterBar filters={filters} onChange={update} />
            </div>
            <div>
              <GamesResultsHeader
                total={results.totalItems}
                filters={filters}
                onChange={update}
              />
            </div>
            <div>
              {results.items.length ? (
                <GamesGrid games={results.items} scope={scope} />
              ) : (
                <EmptyResults onClear={() => update(gamesDiscoverDefaults)} />
              )}
            </div>
            <div>
              <GamesPagination
                page={results.page}
                totalPages={results.totalPages}
                onPageChange={(page) => update({ page }, false)}
              />
            </div>
          </div>
        </Container>
      </div>
      {scope === "public" && <DiscoverFooter />}
    </div>
  );
}
