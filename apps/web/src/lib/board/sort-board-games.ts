import type { BoardGame, BoardSort } from "@/lib/board/board.types";

export function sortBoardGames(
  games: readonly BoardGame[],
  sort: BoardSort,
): readonly BoardGame[] {
  return [...games].sort((first, second) =>
    sort === "title"
      ? first.title.localeCompare(second.title, "pt-BR")
      : second.updatedAt.localeCompare(first.updatedAt),
  );
}
