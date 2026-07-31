import { Select } from "@/components/ui/select";
import type { GamesDiscoverFilters } from "@/lib/discover/games-discover.types";
import { GamesFilterDrawer } from "@/components/discover/games-filter-drawer";

type Props = {
  total: number;
  filters: GamesDiscoverFilters;
  onChange: (
    changes: Partial<GamesDiscoverFilters>,
    resetPage?: boolean,
  ) => void;
};
export function GamesResultsHeader({ total, filters, onChange }: Props) {
  return (
    <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
      <div>
        <p className="eyebrow">Catálogo</p>
        <h2 className="display mt-2 max-w-2xl text-4xl leading-[.95] sm:text-5xl">
          Jogos para o seu próximo tempo livre.
        </h2>
        <p className="mt-3 text-sm text-(--ink-muted)">
          {total} {total === 1 ? "jogo encontrado" : "jogos encontrados"}
        </p>
      </div>
      <div className="flex w-full shrink-0 items-end justify-between gap-3 sm:w-auto sm:justify-normal">
        <GamesFilterDrawer filters={filters} onChange={onChange} />
      <div className="w-36 sm:w-44">
          <Select
            label="Ordenar"
            value={filters.sort}
            onChange={(event) =>
              onChange({
                sort: event.target.value as GamesDiscoverFilters["sort"],
              })
            }
          >
            <option value="relevance">Relevância</option>
            <option value="score">Melhor nota</option>
            <option value="newest">Mais recentes</option>
            <option value="title">A–Z</option>
          </Select>
        </div>
      </div>
    </div>
  );
}
