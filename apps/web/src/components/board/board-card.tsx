import { ArrowUpRight, GripVertical, Trash2 } from "lucide-react";
import { useRef, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Dialog } from "@/components/ui/dialog";
import type { BoardGame } from "@/lib/board/board.types";
import { BoardCardMeta } from "@/components/board/board-card-meta";

const coverTones: Record<BoardGame["coverTone"], string> = {
  ember: "linear-gradient(145deg, #9b4b34, #342824 82%)",
  forest: "linear-gradient(145deg, #3e635a, #1e2926 82%)",
  night: "linear-gradient(145deg, #394a70, #1c202e 82%)",
  gold: "linear-gradient(145deg, #9a7040, #3d3023 82%)",
  smoke: "linear-gradient(145deg, #44312d, #171513 82%)",
  wine: "linear-gradient(145deg, #6a3225, #403c35 82%)",
};

type BoardCardProps = {
  game: BoardGame;
  onOpen: (gameId: string) => void;
  onRemove: (gameId: string) => void;
  onDragStart?: (gameId: string) => void;
  onTouchDragStart?: (gameId: string) => void;
};

export function BoardCard({
  game,
  onOpen,
  onRemove,
  onDragStart,
  onTouchDragStart,
}: BoardCardProps) {
  const [removeOpen, setRemoveOpen] = useState(false);
  const longPressTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  function clearLongPress() {
    if (longPressTimeout.current) window.clearTimeout(longPressTimeout.current);
    longPressTimeout.current = null;
  }
  return (
    <Card
      data-game-id={game.id}
      draggable={Boolean(onDragStart)}
      onDragStart={(event) => {
        event.dataTransfer.effectAllowed = "move";
        event.dataTransfer.setData("text/plain", game.id);
        onDragStart?.(game.id);
      }}
      onPointerDown={(event) => {
        if (event.pointerType !== "touch" || !onTouchDragStart) return;
        longPressTimeout.current = window.setTimeout(
          () => onTouchDragStart(game.id),
          220,
        );
      }}
      onPointerUp={clearLongPress}
      onPointerCancel={clearLongPress}
      className="relative overflow-hidden rounded-2xl transition-colors hover:border-(--ink-muted)"
    >
      <span
        aria-hidden="true"
        className="absolute bottom-2 left-2 hidden rounded-full bg-(--surface-muted)/90 p-1 text-(--ink-muted) md:block"
      >
        <GripVertical size={15} />
      </span>
      <button
        type="button"
        onClick={() => onOpen(game.id)}
        className="block min-h-36 w-full p-3 pb-11 text-left focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-(--accent)"
      >
        <div className="flex gap-3">
          <div
            aria-hidden="true"
            className="h-25 w-[4.6rem] shrink-0 rounded-xl border border-white/15"
            style={{ background: coverTones[game.coverTone] }}
          />
          <div className="min-w-0 flex-1 py-0.5">
            <div className="flex items-start justify-between gap-3">
              <Badge className="px-2 py-0.5 text-[.6rem]">
                {game.releaseYear}
              </Badge>
              <ArrowUpRight
                aria-hidden="true"
                size={16}
                className="shrink-0 text-(--ink-muted)"
              />
            </div>
            <h3 className="mt-3 truncate text-sm font-semibold">
              {game.title}
            </h3>
            <BoardCardMeta game={game} />
          </div>
        </div>
        {game.shortNote && (
          <p className="mt-3 line-clamp-2 text-xs leading-5 text-(--ink-muted)">
            {game.shortNote}
          </p>
        )}
      </button>
      <button
        type="button"
        aria-label={`Remover ${game.title}`}
        title="Remover do Kanban"
        onClick={() => setRemoveOpen(true)}
        className="absolute bottom-2 right-2 inline-flex size-8 items-center justify-center rounded-full text-(--ink-muted) transition-colors hover:bg-(--surface-muted) hover:text-(--accent) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--accent)"
      >
        <Trash2 aria-hidden="true" size={15} />
      </button>
      <Dialog
        open={removeOpen}
        onClose={() => setRemoveOpen(false)}
        title="Remover jogo?"
      >
        <p className="text-sm leading-6 text-(--ink-muted)">
          Tem certeza que deseja remover <strong className="text-(--ink)">{game.title}</strong> do seu Kanban?
        </p>
        <div className="mt-7 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={() => setRemoveOpen(false)}
            className="min-h-11 rounded-full border border-(--line) px-4 text-sm font-semibold hover:bg-(--surface-muted) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--accent)"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={() => {
              onRemove(game.id);
              setRemoveOpen(false);
            }}
            className="min-h-11 rounded-full bg-(--accent) px-4 text-sm font-semibold text-(--accent-ink) hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--accent)"
          >
            Remover
          </button>
        </div>
      </Dialog>
    </Card>
  );
}
