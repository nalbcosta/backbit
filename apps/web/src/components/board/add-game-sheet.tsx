import { Check, Plus, Search } from "lucide-react";
import { useMemo, useState } from "react";

import { Dialog } from "@/components/ui/dialog";
import { boardColumns } from "@/lib/board/mock-board-games";
import type {
  BoardGame,
  BoardStatus,
  CatalogGame,
} from "@/lib/board/board.types";

const coverTones: Record<CatalogGame["coverTone"], string> = {
  ember: "linear-gradient(145deg, #9b4b34, #342824 82%)",
  forest: "linear-gradient(145deg, #3e635a, #1e2926 82%)",
  night: "linear-gradient(145deg, #394a70, #1c202e 82%)",
  gold: "linear-gradient(145deg, #9a7040, #3d3023 82%)",
  smoke: "linear-gradient(145deg, #44312d, #171513 82%)",
  wine: "linear-gradient(145deg, #6a3225, #403c35 82%)",
};

export function AddGameSheet({
  open,
  games,
  catalog,
  onClose,
  onAdd,
}: {
  open: boolean;
  games: readonly BoardGame[];
  catalog: readonly CatalogGame[];
  onClose: () => void;
  onAdd: (game: CatalogGame, status: BoardStatus) => void;
}) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<BoardStatus>("backlog");
  const results = useMemo(
    () =>
      catalog.filter((game) =>
        game.title
          .toLocaleLowerCase("pt-BR")
          .includes(query.trim().toLocaleLowerCase("pt-BR")),
      ),
    [catalog, query],
  );
  return (
    <Dialog open={open} onClose={onClose} title="Adicionar um jogo">
      <p className="text-sm leading-6 text-(--ink-muted)">
        Escolha onde esse jogo começa. Você poderá mudar depois.
      </p>
      <div className="board-mobile-switcher -mx-1 mt-6 flex snap-x snap-mandatory gap-2 overflow-x-auto overscroll-x-contain px-1 pb-2 scroll-px-1">
        {boardColumns.map((column) => (
          <button
            key={column.key}
            type="button"
            onClick={(event) => {
              setStatus(column.key);
              event.currentTarget.scrollIntoView({
                behavior: "smooth",
                block: "nearest",
                inline: "center",
              });
            }}
            className={`min-h-11 shrink-0 snap-start rounded-full border px-4 text-sm font-semibold ${status === column.key ? "border-(--action-bg) bg-(--action-bg) text-(--action-fg)" : "border-(--line)"}`}
          >
            {column.title}
          </button>
        ))}
      </div>
      <label className="relative mt-6 block">
        <span className="text-sm font-semibold">Buscar na biblioteca</span>
        <Search
          aria-hidden="true"
          size={18}
          className="absolute bottom-4 left-4 text-(--ink-muted)"
        />
        <input
          autoFocus
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Procure um jogo"
          className="mt-2 min-h-13 w-full rounded-xl border border-(--line) bg-(--surface) py-3 pl-11 pr-4 text-sm outline-none focus:border-(--accent)"
        />
      </label>
      <ul className="mt-4 divide-y divide-(--line)">
        {results.map((game) => {
          const added = games.some((item) => item.title === game.title);
          return (
            <li key={game.id}>
              <button
                type="button"
                disabled={added}
                aria-label={
                  added
                    ? `${game.title} já está no board`
                    : `Adicionar ${game.title}`
                }
                onClick={() => {
                  onAdd(game, status);
                  onClose();
                }}
                className="flex min-h-18 w-full items-center gap-3 py-2 text-left disabled:cursor-not-allowed disabled:opacity-45"
              >
                <div
                  aria-hidden="true"
                  className="h-14 w-10 shrink-0 rounded-lg border border-white/15"
                  style={{ background: coverTones[game.coverTone] }}
                />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-semibold">
                    {game.title}
                  </span>
                  <span className="mt-1 block text-xs text-(--ink-muted)">
                    {game.platform} · {game.releaseYear}
                  </span>
                </span>
                <span
                  aria-hidden="true"
                  className="inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-(--line)"
                >
                  {added ? <Check size={16} /> : <Plus size={17} />}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </Dialog>
  );
}
