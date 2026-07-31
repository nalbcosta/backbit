"use client";

import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

import type { DiscoverCollection } from "@/lib/discover/types";
import { ListCard } from "@/components/discover/list-card";

const PAGE_SIZE = 2;

type CollectionsSectionProps = { collections: readonly DiscoverCollection[] };
export function CollectionsSection({ collections }: CollectionsSectionProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const pageCount = Math.ceil(collections.length / PAGE_SIZE);
  const safePage = Math.min(currentPage, Math.max(pageCount, 1));
  const visibleCollections = collections.slice(
    (safePage - 1) * PAGE_SIZE,
    safePage * PAGE_SIZE,
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [collections]);

  return (
    <section
      className="discover-section border-t border-(--line) pt-14"
      aria-labelledby="collections-title"
    >
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
        <div>
          <p className="eyebrow">Listas com ponto de vista</p>
          <h2
            id="collections-title"
            className="display mt-3 max-w-2xl text-4xl leading-[.95] sm:text-5xl"
          >
            Escolhas que já vêm com contexto.
          </h2>
        </div>
        <Link
          href="/discover/lists"
          className="inline-flex min-h-10 self-start items-center gap-2 rounded-full border border-(--line) px-4 text-xs font-semibold text-(--ink-muted) opacity-75 sm:self-end"
        >
          Ver todas
          <ArrowUpRight aria-hidden="true" size={14} />
        </Link>
      </div>

      {collections.length ? (
        <>
          <div className="mt-7 grid gap-4 sm:grid-cols-2">
            {visibleCollections.map((collection) => (
              <ListCard key={collection.id} collection={collection} />
            ))}
          </div>
          {pageCount > 1 && (
            <nav
              aria-label="Paginação das collections"
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
          <p className="display text-3xl">Nenhuma lista por aqui ainda.</p>
        </div>
      )}
    </section>
  );
}
