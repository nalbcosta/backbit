import type { BoardGame, CatalogGame } from "@/lib/board/board.types";

const coverTones: Record<BoardGame["coverTone"], string> = {
  ember: "linear-gradient(145deg, #9b4b34, #342824 82%)",
  forest: "linear-gradient(145deg, #3e635a, #1e2926 82%)",
  night: "linear-gradient(145deg, #394a70, #1c202e 82%)",
  gold: "linear-gradient(145deg, #9a7040, #3d3023 82%)",
  smoke: "linear-gradient(145deg, #44312d, #171513 82%)",
  wine: "linear-gradient(145deg, #6a3225, #403c35 82%)",
};

export function BoardCover({
  game,
  className,
}: {
  game: Pick<BoardGame | CatalogGame, "coverTone" | "coverUrl" | "title">;
  className: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={`shrink-0 overflow-hidden rounded-xl border border-white/15 ${className}`}
      style={{ background: coverTones[game.coverTone] }}
    >
      {game.coverUrl && (
        <img
          src={game.coverUrl}
          alt=""
          className="size-full object-cover"
          loading="lazy"
        />
      )}
    </div>
  );
}
