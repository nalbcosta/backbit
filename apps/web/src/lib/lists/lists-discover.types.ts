import type { DiscoverCollection } from "@/lib/discover/types";

export type ListsDiscoverSort =
  | "relevance"
  | "popular"
  | "rating"
  | "updated"
  | "title";

export type ListsDiscoverFilters = {
  query: string;
  theme: string;
  platform: string;
  curator: string;
  sort: ListsDiscoverSort;
  page: number;
};

export type ListsDiscoverPage = {
  items: readonly DiscoverCollection[];
  totalItems: number;
  totalPages: number;
  page: number;
};

export const listsDiscoverDefaults: ListsDiscoverFilters = {
  query: "",
  theme: "all",
  platform: "all",
  curator: "all",
  sort: "relevance",
  page: 1,
};

export const listsDiscoverOptions = {
  themes: [
    "all",
    "Curto",
    "Narrativo",
    "Exploração",
    "Cooperativo",
    "Calmo",
    "Mistério",
  ],
  platforms: ["all", "PC", "PlayStation", "Switch", "Xbox"],
  curators: ["all", "Editorial", "Comunidade", "Crítica"],
} as const;
