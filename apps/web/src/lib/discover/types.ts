export type DiscoverGame = {
  id: string;
  slug: string;
  title: string;
  studio: string;
  year: number;
  platforms: readonly string[];
  genres: readonly string[];
  tags: readonly string[];
  duration: string;
  score: number;
  summary: string;
  note: string;
  coverTone: "ember" | "forest" | "night" | "gold";
  featured?: boolean;
};

export type DiscoverCollection = {
  id: string;
  slug: string;
  title: string;
  description: string;
  gameIds: readonly string[];
  mood: string;
};

export type DiscoverReview = {
  id: string;
  slug: string;
  gameId: string;
  author: string;
  rating: number;
  excerpt: string;
  body: string;
  publishedAt: string;
};

export type DiscoverContentItem =
  | { kind: "game"; item: DiscoverGame }
  | { kind: "collection"; item: DiscoverCollection }
  | { kind: "review"; item: DiscoverReview };

export type DiscoverFilter = "Tudo" | "Curto" | "Narrativo" | "Exploração" | "Cooperativo";
export type DiscoverSort = "relevancia" | "nota" | "recente";
