import { Search, X } from "lucide-react";

import { boardColumns, boardStatusLabels } from "@/lib/board/mock-board-games";
import type { BoardFilters, BoardSort } from "@/lib/board/board.types";

type BoardToolbarProps = {
  filters: BoardFilters;
  sort: BoardSort;
  platforms: readonly string[];
  tags: readonly string[];
  onFiltersChange: (filters: BoardFilters) => void;
  onSortChange: (sort: BoardSort) => void;
  onClear: () => void;
};

export function BoardToolbar({
  filters,
  sort,
  platforms,
  tags,
  onFiltersChange,
  onSortChange,
  onClear,
}: BoardToolbarProps) {
  const hasFilters = Boolean(
    filters.query || filters.platform || filters.tags?.length || filters.status,
  );
  return (
    <div className="rounded-2xl border border-(--line) bg-(--surface-muted)/35 p-3">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
        <label className="relative min-w-0 flex-1">
          <span className="sr-only">Buscar jogos</span>
          <Search
            aria-hidden="true"
            size={17}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-(--ink-muted)"
          />
          <input
            value={filters.query ?? ""}
            onChange={(event) =>
              onFiltersChange({ ...filters, query: event.target.value })
            }
            placeholder="Buscar por título, plataforma ou tag"
            className="min-h-11 w-full rounded-xl border border-(--line) bg-(--surface) pl-10 pr-3 text-sm text-(--ink) outline-none placeholder:text-(--ink-muted) focus:border-(--accent) focus:ring-2 focus:ring-(--accent)/20"
          />
        </label>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:flex">
          <select
            aria-label="Filtrar por plataforma"
            value={filters.platform ?? ""}
            onChange={(event) =>
              onFiltersChange({
                ...filters,
                platform: event.target.value || undefined,
              })
            }
            className="min-h-11 min-w-0 rounded-xl border border-(--line) bg-(--surface) px-3 text-sm text-(--ink) outline-none focus:border-(--accent)"
          >
            <option value="">Plataformas</option>
            {platforms.map((platform) => (
              <option key={platform} value={platform}>
                {platform}
              </option>
            ))}
          </select>
          <select
            aria-label="Filtrar por tag"
            value={filters.tags?.[0] ?? ""}
            onChange={(event) =>
              onFiltersChange({
                ...filters,
                tags: event.target.value ? [event.target.value] : undefined,
              })
            }
            className="min-h-11 min-w-0 rounded-xl border border-(--line) bg-(--surface) px-3 text-sm text-(--ink) outline-none focus:border-(--accent)"
          >
            <option value="">Tags</option>
            {tags.map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </select>
          <select
            aria-label="Filtrar por status"
            value={filters.status ?? ""}
            onChange={(event) =>
              onFiltersChange({
                ...filters,
                status: (event.target.value || undefined) as BoardFilters["status"],
              })
            }
            className="min-h-11 min-w-0 rounded-xl border border-(--line) bg-(--surface) px-3 text-sm text-(--ink) outline-none focus:border-(--accent)"
          >
            <option value="">Status</option>
            {boardColumns.map((column) => (
              <option key={column.key} value={column.key}>
                {boardStatusLabels[column.key]}
              </option>
            ))}
          </select>
          <select
            aria-label="Ordenar jogos"
            value={sort}
            onChange={(event) => onSortChange(event.target.value as BoardSort)}
            className="min-h-11 min-w-0 rounded-xl border border-(--line) bg-(--surface) px-3 text-sm text-(--ink) outline-none focus:border-(--accent)"
          >
            <option value="position">Minha ordem</option>
            <option value="updatedAt">Mais recentes</option>
            <option value="title">Título</option>
            <option value="progress">Progresso</option>
          </select>
        </div>
        {hasFilters && (
          <button
            type="button"
            onClick={onClear}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-3 text-sm font-semibold text-(--ink-muted) hover:bg-(--surface-muted) hover:text-(--ink)"
          >
            <X aria-hidden="true" size={16} />
            Limpar
          </button>
        )}
      </div>
    </div>
  );
}
