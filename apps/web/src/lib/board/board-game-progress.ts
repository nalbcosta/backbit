import type { BoardGame, PlaySession } from "@/lib/board/board.types";

export function getLatestSession(
  sessions: readonly PlaySession[],
): PlaySession | undefined {
  return [...sessions].sort((a, b) => b.playedOn.localeCompare(a.playedOn))[0];
}

export function getGameProgressLabel(game: BoardGame): string | undefined {
  if (game.status === "completed") return "Finalizado";
  if (game.progressPercent !== undefined) {
    const sessionCount = game.sessions.length;
    return `${game.progressPercent}%${sessionCount > 0 ? ` · sessão ${sessionCount}` : ""}`;
  }
  return undefined;
}
