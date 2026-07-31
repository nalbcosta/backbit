"use client";

import { Search, X } from "lucide-react";
import { Chip } from "@/components/ui/chip";
import type { DiscoverFilter, DiscoverSort } from "@/lib/discover/types";

type SearchBarProps = {
  query: string;
  onQueryChange: (value: string) => void;
  filter: DiscoverFilter;
  filters: readonly DiscoverFilter[];
  onFilterChange: (filter: DiscoverFilter) => void;
  sort: DiscoverSort;
  onSortChange: (sort: DiscoverSort) => void;
};
export function SearchBar({
  query,
  onQueryChange,
  filter,
  filters,
  onFilterChange,
  sort,
  onSortChange,
}: SearchBarProps) {
  return (
    <section
      aria-label="Buscar jogos"
      className="border-y border-(--line) py-5"
    >
      <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end sm:gap-4">
        <label className="relative block flex-1">
          <span className="sr-only">
            Buscar por jogo, estúdio, gênero ou plataforma
          </span>
          <Search
            aria-hidden="true"
            size={18}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-(--ink-muted)"
          />
          <input
            type="search"
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder="Buscar por jogo, estúdio ou clima"
            enterKeyHint="search"
            autoComplete="off"
            className={`min-h-13 w-full rounded-2xl border border-(--line) bg-(--surface) py-3 pl-11 text-sm outline-none placeholder:text-(--ink-muted) focus:border-(--accent) focus:ring-2 focus:ring-(--accent)/20 sm:rounded-full ${query ? "pr-12" : "pr-4"}`}
          />
          {query && (
            <button
              type="button"
              aria-label="Limpar busca"
              onClick={() => onQueryChange("")}
              className="absolute right-1 top-1/2 inline-flex size-11 -translate-y-1/2 items-center justify-center rounded-full text-(--ink-muted) hover:bg-(--surface-muted) hover:text-(--ink) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--accent)"
            >
              <X aria-hidden="true" size={16} />
            </button>
          )}
        </label>
        <label className="flex items-center gap-3 text-sm text-(--ink-muted) sm:min-w-52">
          <span className="shrink-0">Ordenar</span>
          <select
            value={sort}
            onChange={(event) =>
              onSortChange(event.target.value as DiscoverSort)
            }
            className="min-h-12 min-w-0 flex-1 rounded-2xl border border-(--line) bg-(--surface) px-4 text-(--ink) outline-none focus:border-(--accent) sm:rounded-full"
          >
            <option value="relevancia">Relevância</option>
            <option value="nota">Melhor nota</option>
            <option value="recente">Mais recentes</option>
          </select>
        </label>
      </div>
      <div className="discover-filter-scroll -mx-1 mt-4 flex gap-2 overflow-x-auto px-1 pb-1">
        {filters.map((item) => (
          <Chip
            key={item}
            selected={filter === item}
            onClick={() => onFilterChange(item)}
            className="shrink-0"
          >
            {item}
          </Chip>
        ))}
      </div>
    </section>
  );
}
