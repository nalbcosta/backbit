import type { BoardColumn } from "@/lib/board/board.types";

export function BoardEmptyState({ column }: { column: BoardColumn }) {
  return (
    <div
      data-drop-target={column.key}
      className="rounded-xl border border-dashed border-(--line) px-4 py-9 text-center"
    >
      <p className="text-sm font-semibold">Espaço para o próximo jogo.</p>
      <p className="mt-2 text-xs leading-5 text-(--ink-muted)">
        Quando fizer sentido, ele pode ficar aqui.
      </p>
    </div>
  );
}
