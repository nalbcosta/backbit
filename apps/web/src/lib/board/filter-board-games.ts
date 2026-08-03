import type { BoardFilters, BoardGame } from "@/lib/board/board.types";

export function filterBoardGames(
  games: readonly BoardGame[],
  filters: BoardFilters,
): readonly BoardGame[] {
  const query = filters.query?.trim().toLocaleLowerCase("pt-BR");
  return games.filter((game) => {
    if (filters.status && game.status !== filters.status) return false;
    if (
      filters.platform &&
      game.platform.toLocaleLowerCase("pt-BR") !==
        filters.platform.toLocaleLowerCase("pt-BR")
    )
      return false;
    if (
      filters.tags?.length &&
      !filters.tags.every((tag) => game.tags.includes(tag))
    )
      return false;
    if (!query) return true;
    return [game.title, game.platform, ...game.tags].some((value) =>
      value.toLocaleLowerCase("pt-BR").includes(query),
    );
  });
}
