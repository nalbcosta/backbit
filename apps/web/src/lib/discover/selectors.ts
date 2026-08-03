import { discoverGames } from "@/lib/discover/content";
import type { DiscoverFilter, DiscoverGame, DiscoverSort } from "@/lib/discover/types";

export function getFeaturedItems(games: readonly DiscoverGame[] = discoverGames) {
  return games.filter((game) => game.featured);
}

export function filterGames(games: readonly DiscoverGame[], query: string, filter: DiscoverFilter) {
  const normalizedQuery = query.trim().toLocaleLowerCase("pt-BR");
  return games.filter((game) => {
    const searchable = [game.title, game.studio, ...game.genres, ...game.platforms, ...game.tags].join(" ").toLocaleLowerCase("pt-BR");
    const matchesQuery = !normalizedQuery || searchable.includes(normalizedQuery);
    const matchesFilter = filter === "Tudo" || game.genres.includes(filter) || game.tags.includes(filter);
    return matchesQuery && matchesFilter;
  });
}

export function sortGames(games: readonly DiscoverGame[], sort: DiscoverSort) {
  return [...games].sort((a, b) => {
    if (sort === "nota") return b.score - a.score;
    if (sort === "recente") return b.year - a.year;
    return Number(Boolean(b.featured)) - Number(Boolean(a.featured)) || b.score - a.score;
  });
}

export function getGameBySlug(slug: string) { return discoverGames.find((game) => game.slug === slug); }
