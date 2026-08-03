import type { BoardColumn, BoardStatus } from "@/lib/board/board.types";
import { useEffect, useRef } from "react";

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
  const buttonRefs = useRef<Partial<Record<BoardStatus, HTMLButtonElement>>>(
    {},
  );

  useEffect(() => {
    buttonRefs.current[activeStatus]?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  }, [activeStatus]);

  return (
    <div
      aria-label="Colunas do board"
      className="board-mobile-switcher -mx-5 snap-x snap-mandatory overflow-x-auto overscroll-x-contain px-5 pb-2 scroll-px-5 sm:-mx-8 sm:px-8 md:hidden"
    >
      <div className="flex w-max gap-2">
        {columns.map((column) => (
          <button
            key={column.id}
            type="button"
            ref={(element) => {
              buttonRefs.current[column.key] = element ?? undefined;
            }}
            aria-pressed={activeStatus === column.key}
            onClick={(event) => {
              onStatusChange(column.key);
              event.currentTarget.scrollIntoView({
                behavior: "smooth",
                block: "nearest",
                inline: "center",
              });
            }}
            className={`inline-flex min-h-11 snap-start items-center gap-2 rounded-full border px-4 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--accent) ${activeStatus === column.key ? "border-(--action-bg) bg-(--action-bg) text-(--action-fg)" : "border-(--line) bg-(--surface) text-(--ink-muted)"}`}
          >
            {column.title}
            <span className="text-xs opacity-70">{counts[column.key]}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
