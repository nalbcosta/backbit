import { Star } from "lucide-react";

import type { BoardGame } from "@/lib/board/board.types";
import { getGameProgressLabel } from "@/lib/board/board-game-progress";

export function BoardCardMeta({ game }: { game: BoardGame }) {
  const progressLabel = getGameProgressLabel(game);
  return (
    <div className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-(--ink-muted)">
      <span>{game.platform}</span>
      {progressLabel && (
        <>
          <span aria-hidden="true">·</span>
          <span>{progressLabel}</span>
        </>
      )}
      {game.rating && (
        <>
          <span aria-hidden="true">·</span>
          <span className="inline-flex items-center gap-1 text-(--ink)">
            <Star aria-hidden="true" size={12} fill="currentColor" />
            {game.rating.toFixed(1)}
          </span>
        </>
      )}
    </div>
  );
}
