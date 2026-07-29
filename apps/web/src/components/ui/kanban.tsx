import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

export type KanbanItem = {
  id: string;
  title: string;
  meta: string;
  note: string;
};

export type KanbanColumn = {
  id: string;
  label: string;
  description?: string;
  items: readonly KanbanItem[];
};

type KanbanBoardProps = {
  columns: readonly KanbanColumn[];
  className?: string;
};

function KanbanColumnView({ column }: { column: KanbanColumn }) {
  return (
    <section
      aria-labelledby={`kanban-column-${column.id}`}
      className="rounded-2xl border border-(--line) bg-(--surface-muted) p-3"
    >
      <header className="flex items-start justify-between gap-3 px-1 pb-3">
        <div>
          <h3
            id={`kanban-column-${column.id}`}
            className="text-sm font-semibold"
          >
            {column.label}
          </h3>
          {column.description && (
            <p className="mt-1 text-xs text-(--ink-muted)">
              {column.description}
            </p>
          )}
        </div>
        <span className="inline-flex min-h-6 min-w-6 items-center justify-center rounded-full bg-(--canvas) px-2 text-xs font-semibold text-(--ink-muted)">
          {column.items.length}
        </span>
      </header>
      <ul className="space-y-3">
        {column.items.map((item) => (
          <li key={item.id}>
            <Card className="p-4 transition-transform hover:-translate-y-0.5">
              <Badge>{item.meta}</Badge>
              <h4 className="display mt-6 text-2xl leading-none">
                {item.title}
              </h4>
              <p className="mt-4 text-xs leading-5 text-(--ink-muted)">
                {item.note}
              </p>
            </Card>
          </li>
        ))}
        {column.items.length === 0 && (
          <li className="rounded-xl border border-dashed border-(--line) px-4 py-8 text-center text-xs text-(--ink-muted)">
            Nada por aqui ainda.
          </li>
        )}
      </ul>
    </section>
  );
}

export function KanbanBoard({ columns, className = "" }: KanbanBoardProps) {
  return (
    <div
      aria-label="Board de jogos"
      className={`overflow-x-auto pb-2 lg:overflow-visible lg:pb-0 ${className}`}
    >
      <div className="grid min-w-3xl grid-cols-3 gap-3 lg:min-w-0">
        {columns.map((column) => (
          <KanbanColumnView key={column.id} column={column} />
        ))}
      </div>
    </div>
  );
}
