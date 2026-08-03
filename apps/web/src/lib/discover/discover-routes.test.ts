import { describe, expect, it } from "vitest";

import {
  getDiscoverBackHref,
  getDiscoverRoutes,
} from "@/lib/discover/discover-routes";

describe("rotas de Discover", () => {
  it("cria URLs públicas sem o contexto privado", () => {
    const routes = getDiscoverRoutes("public");

    expect(routes.root).toBe("/discover");
    expect(routes.game("after-winter")).toBe("/discover/games/after-winter");
    expect(routes.list("short-games")).toBe("/discover/lists/short-games");
  });

  it("mantém URLs privadas sob /app/discover", () => {
    const routes = getDiscoverRoutes("private");

    expect(routes.root).toBe("/app/discover");
    expect(routes.games).toBe("/app/discover/games");
    expect(routes.review("winter-notes")).toBe(
      "/app/discover/reviews/winter-notes",
    );
  });

  it("aceita somente o retorno pertencente ao mesmo contexto", () => {
    expect(getDiscoverBackHref("private", "/app/discover/games", "games")).toBe(
      "/app/discover/games",
    );
    expect(getDiscoverBackHref("private", "/discover/games", "games")).toBe(
      "/app/discover",
    );
  });
});
