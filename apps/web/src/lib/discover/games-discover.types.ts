import type { DiscoverGame } from "@/lib/discover/types";

export type GamesDiscoverFilters = {
  query: string;
  genre: string;
  platform: string;
  release: string;
  rating: string;
  sort: GamesDiscoverSort;
  page: number;
};

export type GamesDiscoverSort = "relevance" | "score" | "newest" | "title";

export type GamesDiscoverPage = {
  items: readonly DiscoverGame[];
  totalItems: number;
  totalPages: number;
  page: number;
};

export const gamesDiscoverDefaults: GamesDiscoverFilters = {
  query: "",
  genre: "all",
  platform: "all",
  release: "all",
  rating: "all",
  sort: "relevance",
  page: 1,
};

export const gamesDiscoverOptions = {
  genres: [
    "all",
    "Narrativo",
    "Exploração",
    "Aventura",
    "Cooperativo",
    "Puzzle",
  ],
  platforms: ["all", "PC", "PlayStation", "Switch", "Xbox"],
  releases: ["all", "2025", "2024", "2023 e anteriores"],
  ratings: ["all", "9+", "8–8.9"],
} as const;
