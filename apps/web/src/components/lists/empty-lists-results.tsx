import { Button } from "@/components/ui/button";
export function EmptyListsResults({ onClear }: { onClear: () => void }) {
  return (
    <div className="rounded-2xl border border-dashed border-(--line) px-6 py-12 text-center">
      <p className="display text-3xl">Nada combinou desta vez.</p>
      <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-(--ink-muted)">
        Tente outro tema, plataforma ou uma busca mais aberta.
      </p>
      <Button variant="secondary" className="mt-6" onClick={onClear}>
        Limpar filtros
      </Button>
    </div>
  );
}
