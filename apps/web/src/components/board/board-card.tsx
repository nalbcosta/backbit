import { ArrowUpRight, Clock3, GripVertical, Trash2 } from "lucide-react";
import { useRef, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { GameRemovalDialog } from "@/components/board/game-removal-dialog";
import type { BoardGame } from "@/lib/board/board.types";
import { BoardCardMeta } from "@/components/board/board-card-meta";
import { BoardCover } from "@/components/board/board-cover";
import { boardColumns } from "@/lib/board/mock-board-games";

type BoardCardProps = {
  game: BoardGame;
  onOpen: (gameId: string) => void;
  onRemove: (gameId: string) => void;
  onMoveGame?: (gameId: string, status: BoardGame["status"]) => void;
  onRegisterSession?: (gameId: string) => void;
  onDragStart?: (gameId: string) => void;
  onTouchDragStart?: (gameId: string) => void;
};

export function BoardCard({
  game,
  onOpen,
  onRemove,
  onMoveGame,
  onRegisterSession,
  onDragStart,
  onTouchDragStart,
}: BoardCardProps) {
  const [removeOpen, setRemoveOpen] = useState(false);
  const [dragging, setDragging] = useState(false);
  const longPressTimeout = useRef<number | null>(null);
  function clearLongPress() {
    if (longPressTimeout.current) window.clearTimeout(longPressTimeout.current);
    longPressTimeout.current = null;
  }
  return (
    <Card
      data-game-id={game.id}
      draggable={Boolean(onDragStart)}
      onDragStart={(event) => {
        setDragging(true);
        event.dataTransfer.effectAllowed = "move";
        event.dataTransfer.setData("text/plain", game.id);
        onDragStart?.(game.id);
      }}
      onDragEnd={() => setDragging(false)}
      onPointerDown={(event) => {
        if (event.pointerType !== "touch" || !onTouchDragStart) return;
        if (
          event.target instanceof Element &&
          event.target.closest("button, select, input, textarea")
        )
          return;
        longPressTimeout.current = window.setTimeout(
          () => onTouchDragStart(game.id),
          220,
        );
      }}
      onPointerUp={clearLongPress}
      onPointerCancel={clearLongPress}
      className={`relative overflow-hidden rounded-2xl transition-all hover:border-(--ink-muted) ${dragging ? "scale-[.98] opacity-45" : ""}`}
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
          <BoardCover game={game} className="h-25 w-[4.6rem]" />
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
      <div className="absolute bottom-2 left-2 flex items-center gap-1">
        {onMoveGame && (
          <label className="sr-only" htmlFor={`move-${game.id}`}>
            Mover {game.title}
          </label>
        )}
        {onMoveGame && (
          <select
            id={`move-${game.id}`}
            aria-label={`Mover ${game.title}`}
            value={game.status}
            onChange={(event) =>
              onMoveGame(game.id, event.target.value as BoardGame["status"])
            }
            className="h-8 max-w-28 rounded-full border border-(--line) bg-(--surface-muted) px-2 text-[.65rem] font-semibold text-(--ink-muted) outline-none focus:border-(--accent)"
          >
            {boardColumns.map((column) => (
              <option key={column.key} value={column.key}>
                {column.title}
              </option>
            ))}
          </select>
        )}
        {onRegisterSession && (
          <button
            type="button"
            aria-label={`Registrar sessão de ${game.title}`}
            onClick={() => onRegisterSession(game.id)}
            className="inline-flex size-8 items-center justify-center rounded-full bg-(--surface-muted) text-(--ink-muted) hover:text-(--ink)"
          >
            <Clock3 aria-hidden="true" size={15} />
          </button>
        )}
      </div>
      <button
        type="button"
        aria-label={`Remover ${game.title}`}
        title="Remover do Kanban"
        onClick={() => setRemoveOpen(true)}
        className="absolute bottom-2 right-2 inline-flex size-8 items-center justify-center rounded-full text-(--ink-muted) transition-colors hover:bg-(--surface-muted) hover:text-(--accent) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--accent)"
      >
        <Trash2 aria-hidden="true" size={15} />
      </button>
      <GameRemovalDialog
        gameTitle={game.title}
        open={removeOpen}
        onClose={() => setRemoveOpen(false)}
        onConfirm={() => {
          onRemove(game.id);
          setRemoveOpen(false);
        }}
      />
    </Card>
  );
}
