import { describe, expect, it } from "vitest";

import { getColumnCounts } from "@/lib/board/get-column-counts";
import { getGameProgressLabel } from "@/lib/board/board-game-progress";
import { groupGamesByStatus } from "@/lib/board/group-games-by-status";
import { mockBoardGames } from "@/lib/board/mock-board-games";
import { moveGameBetweenColumns } from "@/lib/board/move-game-between-columns";
import { sortBoardGames } from "@/lib/board/sort-board-games";

describe("utilitários do board", () => {
  it("agrupa jogos em todos os status, preservando a ordem de entrada", () => {
    const columns = groupGamesByStatus(mockBoardGames);

    expect(columns.playing.map((game) => game.id)).toEqual([
      "after-winter",
      "low-tide",
    ]);
    expect(columns.wishlist).toHaveLength(1);
    expect(columns.backlog).toHaveLength(2);
  });

  it("calcula contagens para colunas vazias e preenchidas", () => {
    const counts = getColumnCounts(groupGamesByStatus(mockBoardGames));

    expect(counts).toMatchObject({
      backlog: 2,
      playing: 2,
      paused: 1,
      completed: 1,
      dropped: 1,
      wishlist: 1,
    });
  });

  it("move um jogo e o posiciona no destino sem alterar os outros status", () => {
    const movedGames = moveGameBetweenColumns(mockBoardGames, {
      gameId: "paper-moon",
      destinationStatus: "playing",
    });

    expect(movedGames.find((game) => game.id === "paper-moon")?.status).toBe(
      "playing",
    );
    expect(
      mockBoardGames.find((game) => game.id === "paper-moon")?.status,
    ).toBe("backlog");
  });

  it("mantém a referência quando o jogo não existe", () => {
    expect(
      moveGameBetweenColumns(mockBoardGames, {
        gameId: "missing",
        destinationStatus: "playing",
      }),
    ).toBe(mockBoardGames);
  });

  it("reordena um jogo dentro da própria coluna", () => {
    const movedGames = moveGameBetweenColumns(mockBoardGames, {
      gameId: "low-tide",
      destinationStatus: "playing",
      destinationIndex: 0,
    });
    const playingGames = movedGames
      .filter((game) => game.status === "playing")
      .sort((first, second) => first.position - second.position);
    expect(playingGames.map((game) => game.id)).toEqual([
      "low-tide",
      "after-winter",
    ]);
  });

  it("ordena cópias por título ou última atualização", () => {
    const byTitle = sortBoardGames(mockBoardGames, "title");
    const byUpdate = sortBoardGames(mockBoardGames, "updatedAt");

    expect(byTitle).not.toBe(mockBoardGames);
    expect(byTitle[0]?.title).toBe("A estrada de sal");
    expect(byUpdate[0]?.id).toBe("after-winter");
  });

  it("deriva o resumo de progresso a partir das sessões", () => {
    const game = mockBoardGames.find((item) => item.id === "after-winter");
    expect(game && getGameProgressLabel(game)).toBe("62% · sessão 1");
  });
});
