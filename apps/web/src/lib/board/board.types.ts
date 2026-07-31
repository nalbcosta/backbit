export const boardStatuses = [
  "backlog",
  "playing",
  "paused",
  "completed",
  "dropped",
  "wishlist",
] as const;

export type BoardStatus = (typeof boardStatuses)[number];

export type BoardGame = {
  id: string;
  slug: string;
  title: string;
  coverTone: "ember" | "forest" | "night" | "gold" | "smoke" | "wine";
  platform: string;
  status: BoardStatus;
  progressLabel?: string;
  rating?: number;
  releaseYear: number;
  tags: readonly string[];
  shortNote?: string;
  updatedAt: string;
};

export type BoardColumn = {
  id: string;
  key: BoardStatus;
  title: string;
  description: string;
  order: number;
};

export type BoardColumnsByStatus = Record<BoardStatus, readonly BoardGame[]>;

export type MoveGameCommand = {
  gameId: string;
  destinationStatus: BoardStatus;
};

export type BoardFilters = {
  platform?: string;
  tags?: readonly string[];
};

export type BoardSort = "updatedAt" | "title";
