import { SearchX } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = { onClear: () => void };
export function EmptyResults({ onClear }: Props) {
  return (
    <div className="rounded-2xl border border-dashed border-(--line) px-5 py-16 text-center">
      <SearchX
        aria-hidden="true"
        size={24}
        className="mx-auto text-(--ink-muted)"
      />
      <h3 className="display mt-4 text-3xl">Nada por aqui ainda.</h3>
      <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-(--ink-muted)">
        Tente outro título, plataforma ou combinação de filtros.
      </p>
      <Button variant="secondary" className="mt-6" onClick={onClear}>
        Limpar filtros
      </Button>
    </div>
  );
}
