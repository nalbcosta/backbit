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
  coverUrl?: string;
  platform: string;
  status: BoardStatus;
  position: number;
  progressPercent?: number;
  sessions: readonly PlaySession[];
  rating?: number;
  releaseYear: number;
  tags: readonly string[];
  shortNote?: string;
  updatedAt: string;
};

export type PlaySession = {
  id: string;
  playedOn: string;
  durationMinutes: number;
  progressPercent?: number;
  note?: string;
};

export type CatalogGame = {
  id: string;
  title: string;
  releaseYear: number;
  platform: string;
  coverTone: BoardGame["coverTone"];
  coverUrl?: string;
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
  destinationIndex?: number;
};

export type AddGameCommand = {
  game: CatalogGame;
  destinationStatus: BoardStatus;
};

export type RegisterSessionCommand = {
  gameId: string;
  session: PlaySession;
};

export type BoardFilters = {
  query?: string;
  platform?: string;
  tags?: readonly string[];
  status?: BoardStatus;
};

export type BoardSort = "position" | "updatedAt" | "title" | "progress";
