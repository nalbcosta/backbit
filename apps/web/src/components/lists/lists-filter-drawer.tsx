"use client";
import { SlidersHorizontal, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import type { ListsDiscoverFilters } from "@/lib/lists/lists-discover.types";
import { ListsFilterBar } from "./lists-filter-bar";
type Props = {
  filters: ListsDiscoverFilters;
  onChange: (changes: Partial<ListsDiscoverFilters>) => void;
};
export function ListsFilterDrawer(props: Props) {
  const [open, setOpen] = useState(false);
  return (
    <div className="lg:hidden">
      <Button variant="secondary" onClick={() => setOpen(true)}>
        <SlidersHorizontal aria-hidden="true" size={16} /> Filtros
      </Button>
      {open ? (
        <div
          className="fixed inset-0 z-50 bg-black/35 p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Filtros de listas"
        >
          <div className="ml-auto min-h-full w-full max-w-md bg-(--canvas) p-5">
            <div className="flex items-center justify-between">
              <h2 className="display text-3xl">Refinar listas</h2>
              <button
                type="button"
                aria-label="Fechar filtros"
                onClick={() => setOpen(false)}
                className="inline-flex size-11 items-center justify-center rounded-full border border-(--line)"
              >
                <X aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6">
              <ListsFilterBar {...props} />
            </div>
            <Button className="mt-6" fullWidth onClick={() => setOpen(false)}>
              Ver resultados
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
