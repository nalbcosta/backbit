export type SummaryMetric = {
  label: string;
  value: string;
  detail: string;
};

export type GameSnapshot = {
  title: string;
  meta: string;
  note: string;
};

export type ContinuePlayingGame = GameSnapshot & {
  progress: number;
  session: string;
};

export type DiscoveryGame = GameSnapshot & {
  reason: string;
};

export type ActivityItem = {
  title: string;
  detail: string;
  time: string;
};
