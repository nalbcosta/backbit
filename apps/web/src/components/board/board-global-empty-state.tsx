import { Plus, Search } from "lucide-react";

export function BoardGlobalEmptyState({
  filtered,
  onAdd,
  onClear,
}: {
  filtered: boolean;
  onAdd: () => void;
  onClear: () => void;
}) {
  return (
    <div className="rounded-2xl border border-dashed border-(--line) px-6 py-16 text-center">
      {filtered ? (
        <Search aria-hidden="true" className="mx-auto text-(--ink-muted)" size={25} />
      ) : (
        <Plus aria-hidden="true" className="mx-auto text-(--ink-muted)" size={25} />
      )}
      <h2 className="mt-4 text-lg font-semibold">
        {filtered ? "Nenhum jogo encontrado" : "Seu board ainda está vazio"}
      </h2>
      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-(--ink-muted)">
        {filtered
          ? "Tente ajustar os filtros ou buscar por outro termo."
          : "Adicione um jogo para começar a construir seu ritmo."}
      </p>
      <button
        type="button"
        onClick={filtered ? onClear : onAdd}
        className="mt-6 min-h-11 rounded-full bg-(--action-bg) px-5 text-sm font-semibold text-(--action-fg)"
      >
        {filtered ? "Limpar filtros" : "Adicionar jogo"}
      </button>
    </div>
  );
}
