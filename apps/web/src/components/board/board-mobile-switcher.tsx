import type { BoardColumn, BoardStatus } from "@/lib/board/board.types";

type BoardMobileSwitcherProps = {
  columns: readonly BoardColumn[];
  activeStatus: BoardStatus;
  counts: Record<BoardStatus, number>;
  onStatusChange: (status: BoardStatus) => void;
};

export function BoardMobileSwitcher({
  columns,
  activeStatus,
  counts,
  onStatusChange,
}: BoardMobileSwitcherProps) {
  return (
    <div
      aria-label="Colunas do board"
      className="-mx-5 overflow-x-auto px-5 pb-1 sm:-mx-8 sm:px-8 md:hidden"
    >
      <div className="flex w-max gap-2">
        {columns.map((column) => (
          <button
            key={column.id}
            type="button"
            aria-pressed={activeStatus === column.key}
            onClick={() => onStatusChange(column.key)}
            className={`inline-flex min-h-11 items-center gap-2 rounded-full border px-4 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--accent) ${activeStatus === column.key ? "border-(--action-bg) bg-(--action-bg) text-(--action-fg)" : "border-(--line) bg-(--surface) text-(--ink-muted)"}`}
          >
            {column.title}
            <span className="text-xs opacity-70">{counts[column.key]}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
