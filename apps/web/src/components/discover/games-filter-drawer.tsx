"use client";

import { SlidersHorizontal, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { GamesFilterBar } from "@/components/discover/games-filter-bar";
import type { GamesDiscoverFilters } from "@/lib/discover/games-discover.types";

type Props = {
  filters: GamesDiscoverFilters;
  onChange: (changes: Partial<GamesDiscoverFilters>) => void;
};
export function GamesFilterDrawer(props: Props) {
  const [open, setOpen] = useState(false);
  return (
    <div className="lg:hidden">
      <Button variant="secondary" onClick={() => setOpen(true)}>
        <SlidersHorizontal aria-hidden="true" size={16} /> Filtros
      </Button>
      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/35 p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Filtros"
        >
          <div className="ml-auto min-h-full w-full max-w-md bg-(--canvas) p-5">
            <div className="flex items-center justify-between">
              <h2 className="display text-3xl">Refinar jogos</h2>
              <button
                aria-label="Fechar filtros"
                onClick={() => setOpen(false)}
                className="inline-flex size-11 items-center justify-center rounded-full border border-(--line)"
              >
                <X aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6">
              <GamesFilterBar {...props} />
            </div>
            <Button className="mt-6" fullWidth onClick={() => setOpen(false)}>
              Ver resultados
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
