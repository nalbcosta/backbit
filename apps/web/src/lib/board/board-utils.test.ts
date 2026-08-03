import { describe, expect, it } from "vitest";

import { getColumnCounts } from "@/lib/board/get-column-counts";
import { filterBoardGames } from "@/lib/board/filter-board-games";
import { getGameProgressLabel } from "@/lib/board/board-game-progress";
import { groupGamesByStatus } from "@/lib/board/group-games-by-status";
import { mockBoardGames } from "@/lib/board/mock-board-games";
import { moveGameBetweenColumns } from "@/lib/board/move-game-between-columns";
import { sortBoardGames } from "@/lib/board/sort-board-games";
import { getElapsedSessionSeconds } from "@/lib/board/session-timer";

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

  it("filtra por busca, plataforma, tag e status", () => {
    expect(filterBoardGames(mockBoardGames, { query: "Depois" })).toHaveLength(1);
    expect(
      filterBoardGames(mockBoardGames, {
        platform: "Nintendo Switch",
        tags: ["plataforma"],
        status: "paused",
      }).map((game) => game.id),
    ).toEqual(["small-suns"]);
  });

  it("normaliza as posições da coluna de origem ao mover um jogo", () => {
    const movedGames = moveGameBetweenColumns(mockBoardGames, {
      gameId: "after-winter",
      destinationStatus: "backlog",
    });
    const playing = movedGames
      .filter((game) => game.status === "playing")
      .sort((first, second) => first.position - second.position);
    expect(playing.map((game) => game.position)).toEqual([0]);
  });

  it("ordena jogos por progresso, tratando ausência como menor valor", () => {
    const sorted = sortBoardGames(mockBoardGames, "progress");
    expect(sorted[0]?.progressPercent).toBe(100);
    expect(sorted.at(-1)?.progressPercent).toBeUndefined();
  });

  it("calcula o cronômetro por timestamp e preserva o tempo pausado", () => {
    expect(getElapsedSessionSeconds(1_000, 90, 91_500)).toBe(90 + 90);
    expect(getElapsedSessionSeconds(null, 180, 99_999)).toBe(180);
  });
});
