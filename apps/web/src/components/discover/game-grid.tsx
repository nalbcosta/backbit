"use client";

import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

import type { DiscoverGame } from "@/lib/discover/types";
import { DiscoverGameCard } from "@/components/discover/game-card";

const PAGE_SIZE = 3;

type GameGridProps = {
  games: readonly DiscoverGame[];
  onPreview: (game: DiscoverGame) => void;
};
export function GameGrid({ games, onPreview }: GameGridProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const pageCount = Math.ceil(games.length / PAGE_SIZE);
  const safePage = Math.min(currentPage, Math.max(pageCount, 1));
  const visibleGames = games.slice(
    (safePage - 1) * PAGE_SIZE,
    safePage * PAGE_SIZE,
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [games]);

  return (
    <section aria-labelledby="games-title">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
        <div>
          <p className="eyebrow">Em circulação</p>
          <h2 id="games-title" className="display mt-3 text-4xl leading-none">
            Jogos para considerar
          </h2>
        </div>
        <div className="flex flex-wrap items-center gap-3 sm:justify-end">
          <p className="text-sm text-(--ink-muted)">{games.length} encontrados</p>
          <button
            type="button"
            disabled
            title="O catálogo completo estará disponível em breve"
            className="inline-flex min-h-10 items-center gap-2 rounded-full border border-(--line) px-4 text-xs font-semibold text-(--ink-muted) opacity-75"
          >
            Catálogo completo · em breve
            <ArrowUpRight aria-hidden="true" size={14} />
          </button>
        </div>
      </div>
      {games.length ? (
        <>
          <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {visibleGames.map((game) => (
              <DiscoverGameCard key={game.id} game={game} onPreview={onPreview} />
            ))}
          </div>
          {pageCount > 1 && (
            <nav
              aria-label="Paginação dos jogos"
              className="mt-8 flex flex-wrap items-center justify-center gap-2"
            >
              <button
                type="button"
                aria-label="Página anterior"
                onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
                disabled={safePage === 1}
                className="inline-flex size-11 items-center justify-center rounded-full border border-(--line) transition-colors hover:bg-(--action-bg) hover:text-(--action-fg) disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--accent)"
              >
                <ChevronLeft aria-hidden="true" size={18} />
              </button>
              {Array.from({ length: pageCount }, (_, index) => index + 1).map(
                (page) => (
                  <button
                    key={page}
                    type="button"
                    aria-label={`Ir para a página ${page}`}
                    aria-current={page === safePage ? "page" : undefined}
                    onClick={() => setCurrentPage(page)}
                    className={`inline-flex size-11 items-center justify-center rounded-full text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--accent) ${page === safePage ? "bg-(--action-bg) text-(--action-fg)" : "border border-(--line) hover:bg-(--surface-muted)"}`}
                  >
                    {page}
                  </button>
                ),
              )}
              <button
                type="button"
                aria-label="Próxima página"
                onClick={() =>
                  setCurrentPage((page) => Math.min(pageCount, page + 1))
                }
                disabled={safePage === pageCount}
                className="inline-flex size-11 items-center justify-center rounded-full border border-(--line) transition-colors hover:bg-(--action-bg) hover:text-(--action-fg) disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--accent)"
              >
                <ChevronRight aria-hidden="true" size={18} />
              </button>
            </nav>
          )}
        </>
      ) : (
        <div className="mt-7 rounded-2xl border border-dashed border-(--line) p-8">
          <p className="display text-3xl">Nada por aqui ainda.</p>
          <p className="mt-3 text-sm text-(--ink-muted)">
            Tente outro título, gênero ou filtro.
          </p>
        </div>
      )}
    </section>
  );
}
