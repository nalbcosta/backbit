"use client";

import { Search } from "lucide-react";
import { Chip } from "@/components/ui/chip";
import type { DiscoverFilter, DiscoverSort } from "@/lib/discover/types";

type SearchBarProps = { query: string; onQueryChange: (value: string) => void; filter: DiscoverFilter; filters: readonly DiscoverFilter[]; onFilterChange: (filter: DiscoverFilter) => void; sort: DiscoverSort; onSortChange: (sort: DiscoverSort) => void };
export function SearchBar({ query, onQueryChange, filter, filters, onFilterChange, sort, onSortChange }: SearchBarProps) {
  return <section aria-label="Buscar jogos" className="border-y border-(--line) py-5"><div className="flex flex-col gap-4 lg:flex-row lg:items-center"><label className="relative block flex-1"><span className="sr-only">Buscar por jogo, estúdio, gênero ou plataforma</span><Search aria-hidden="true" size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-(--ink-muted)" /><input value={query} onChange={(event) => onQueryChange(event.target.value)} placeholder="Buscar por jogo, estúdio ou clima" className="min-h-13 w-full rounded-full border border-(--line) bg-(--surface) py-3 pl-11 pr-4 text-sm outline-none placeholder:text-(--ink-muted) focus:border-(--accent) focus:ring-2 focus:ring-(--accent)/20" /></label><label className="flex items-center gap-3 text-sm text-(--ink-muted)"><span>Ordenar</span><select value={sort} onChange={(event) => onSortChange(event.target.value as DiscoverSort)} className="min-h-11 rounded-full border border-(--line) bg-(--surface) px-4 text-(--ink) outline-none focus:border-(--accent)"><option value="relevancia">Relevância</option><option value="nota">Melhor nota</option><option value="recente">Mais recentes</option></select></label></div><div className="mt-4 flex gap-2 overflow-x-auto pb-1">{filters.map((item) => <Chip key={item} selected={filter === item} onClick={() => onFilterChange(item)} className="shrink-0">{item}</Chip>)}</div></section>;
}
