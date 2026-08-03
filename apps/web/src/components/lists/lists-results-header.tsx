import { Select } from "@/components/ui/select";
import type { ListsDiscoverFilters } from "@/lib/lists/lists-discover.types";
import { ListsFilterDrawer } from "./lists-filter-drawer";
type Props = {
  total: number;
  filters: ListsDiscoverFilters;
  onChange: (
    changes: Partial<ListsDiscoverFilters>,
    resetPage?: boolean,
  ) => void;
};
export function ListsResultsHeader({ total, filters, onChange }: Props) {
  return (
    <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
      <div>
        <p className="eyebrow">Arquivo de listas</p>
        <h2 className="display mt-2 text-4xl leading-[.95] sm:text-5xl">
          Encontre uma forma de entrar.
        </h2>
        <p className="mt-3 text-sm text-(--ink-muted)">
          {total} {total === 1 ? "lista encontrada" : "listas encontradas"}
        </p>
      </div>
      <div className="flex w-full items-end justify-between gap-3 sm:w-auto">
        <ListsFilterDrawer filters={filters} onChange={onChange} />
        <div className="w-36 sm:w-44">
          <Select
            label="Ordenar"
            value={filters.sort}
            onChange={(event) =>
              onChange({
                sort: event.target.value as ListsDiscoverFilters["sort"],
              })
            }
          >
            <option value="relevance">Relevância</option>
            <option value="popular">Mais salvas</option>
            <option value="rating">Melhor avaliação</option>
            <option value="updated">Atualizadas</option>
            <option value="title">A–Z</option>
          </Select>
        </div>
      </div>
    </div>
  );
}
