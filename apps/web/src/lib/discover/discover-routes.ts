export type DiscoverScope = "public" | "private";

type DiscoverRoutes = {
  root: string;
  games: string;
  lists: string;
  game: (slug: string) => string;
  list: (slug: string) => string;
  review: (slug: string) => string;
};

export function getDiscoverRoutes(scope: DiscoverScope): DiscoverRoutes {
  const root = scope === "private" ? "/app/discover" : "/discover";

  return {
    root,
    games: `${root}/games`,
    lists: `${root}/lists`,
    game: (slug) => `${root}/games/${slug}`,
    list: (slug) => `${root}/lists/${slug}`,
    review: (slug) => `${root}/reviews/${slug}`,
  };
}

export function getDiscoverBackHref(
  scope: DiscoverScope,
  origin: string | undefined,
  section?: "games" | "lists",
) {
  const routes = getDiscoverRoutes(scope);
  const sectionHref = section ? routes[section] : undefined;

  return origin === sectionHref ? origin : routes.root;
}
