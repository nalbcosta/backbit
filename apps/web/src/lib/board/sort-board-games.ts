import type { BoardGame, BoardSort } from "@/lib/board/board.types";

export function sortBoardGames(
  games: readonly BoardGame[],
  sort: BoardSort,
): readonly BoardGame[] {
  return [...games].sort((first, second) => {
    if (sort === "position") return first.position - second.position;
    if (sort === "title") return first.title.localeCompare(second.title, "pt-BR");
    if (sort === "progress") {
      return (second.progressPercent ?? -1) - (first.progressPercent ?? -1);
    }
    return second.updatedAt.localeCompare(first.updatedAt);
  });
}
