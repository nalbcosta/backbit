"use client";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import {
  listsDiscoverOptions,
  type ListsDiscoverFilters,
} from "@/lib/lists/lists-discover.types";
type Props = {
  filters: ListsDiscoverFilters;
  onChange: (changes: Partial<ListsDiscoverFilters>) => void;
};
const labels = {
  theme: "Tema",
  platform: "Plataforma",
  curator: "Curadoria",
} as const;
export function ListsFilterBar({ filters, onChange }: Props) {
  const [query, setQuery] = useState(filters.query);
  useEffect(() => setQuery(filters.query), [filters.query]);
  useEffect(() => {
    if (query === filters.query) return;
    const id = window.setTimeout(() => onChange({ query }), 280);
    return () => window.clearTimeout(id);
  }, [filters.query, onChange, query]);
  return (
    <section
      aria-label="Filtros de listas"
      className="grid grid-cols-1 items-end gap-3 border-y border-(--line) py-5 sm:grid-cols-2 lg:grid-cols-[minmax(15rem,1.6fr)_repeat(3,minmax(0,1fr))]"
    >
      <Input
        id="lists-search"
        label="Buscar listas"
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Tema, clima ou curador"
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
          {listsDiscoverOptions[
            `${key}s` as "themes" | "platforms" | "curators"
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
