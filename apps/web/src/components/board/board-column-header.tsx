import type { BoardColumn } from "@/lib/board/board.types";

type BoardColumnHeaderProps = { column: BoardColumn; count: number };

export function BoardColumnHeader({ column, count }: BoardColumnHeaderProps) {
  return (
    <header className="flex items-start justify-between gap-3 px-1 pb-4">
      <div>
        <h2 id={column.id} className="text-sm font-semibold">
          {column.title}
        </h2>
        <p className="mt-1 text-xs leading-5 text-(--ink-muted)">
          {column.description}
        </p>
      </div>
      <span
        aria-label={`${count} jogos`}
        className="inline-flex min-h-7 min-w-7 items-center justify-center rounded-full bg-(--canvas) px-2 text-xs font-semibold text-(--ink-muted)"
      >
        {count}
      </span>
    </header>
  );
}
