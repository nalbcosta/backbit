export const gameStatuses = [
  'backlog',
  'playing',
  'finished',
  'paused',
  'dropped',
] as const;

export type GameStatus = (typeof gameStatuses)[number];

export interface GameSummary {
  id: string;
  title: string;
  status: GameStatus;
}
