"use client";

import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import {
  gamesDiscoverOptions,
  type GamesDiscoverFilters,
} from "@/lib/discover/games-discover.types";

type Props = {
  filters: GamesDiscoverFilters;
  onChange: (changes: Partial<GamesDiscoverFilters>) => void;
};
const labels = {
  genre: "Gênero",
  platform: "Plataforma",
  release: "Lançamento",
  rating: "Nota",
} as const;

export function GamesFilterBar({ filters, onChange }: Props) {
  const [query, setQuery] = useState(filters.query);

  useEffect(() => {
    setQuery(filters.query);
  }, [filters.query]);

  useEffect(() => {
    if (query === filters.query) return;
    const timeoutId = window.setTimeout(() => onChange({ query }), 280);
    return () => window.clearTimeout(timeoutId);
  }, [filters.query, onChange, query]);

  return (
    <section
      aria-label="Filtros de jogos"
      className="grid grid-cols-1 items-end gap-3 border-y border-(--line) py-5 sm:grid-cols-2 lg:grid-cols-[minmax(15rem,1.6fr)_repeat(4,minmax(0,1fr))]"
    >
      <Input
        id="games-search"
        label="Buscar jogos"
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Título, estúdio ou clima"
        trailingAction={
          <Search
            aria-hidden="true"
            size={18}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-(--ink-muted)"
          />
        }
      />
      {(Object.keys(labels) as Array<keyof typeof labels>).map((key) => (
        <Select
          key={key}
          label={labels[key]}
          value={filters[key]}
          onChange={(event) => onChange({ [key]: event.target.value })}
        >
          {gamesDiscoverOptions[
            `${key}s` as "genres" | "platforms" | "releases" | "ratings"
          ].map((option) => (
            <option key={option} value={option}>
              {option === "all" ? "Todos" : option}
            </option>
          ))}
        </Select>
      ))}
    </section>
  );
}
