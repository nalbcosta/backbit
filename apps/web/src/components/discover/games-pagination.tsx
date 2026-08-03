"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};
export function GamesPagination({ page, totalPages, onPageChange }: Props) {
  if (totalPages <= 1) return null;
  return (
    <nav
      aria-label="Paginação de jogos"
      className="flex items-center justify-center gap-2"
    >
      <button
        type="button"
        aria-label="Página anterior"
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
        className="inline-flex size-11 items-center justify-center rounded-full border border-(--line) disabled:opacity-40"
      >
        <ChevronLeft aria-hidden="true" size={18} />
      </button>
      {Array.from({ length: totalPages }, (_, index) => index + 1).map(
        (item) => (
          <button
            key={item}
            type="button"
            aria-label={`Página ${item}`}
            aria-current={item === page ? "page" : undefined}
            onClick={() => onPageChange(item)}
            className={`inline-flex size-11 items-center justify-center rounded-full text-sm font-semibold ${item === page ? "bg-(--action-bg) text-(--action-fg)" : "border border-(--line)"}`}
          >
            {item}
          </button>
        ),
      )}
      <button
        type="button"
        aria-label="Próxima página"
        disabled={page === totalPages}
        onClick={() => onPageChange(page + 1)}
        className="inline-flex size-11 items-center justify-center rounded-full border border-(--line) disabled:opacity-40"
      >
        <ChevronRight aria-hidden="true" size={18} />
      </button>
    </nav>
  );
}
