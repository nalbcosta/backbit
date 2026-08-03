export function getElapsedSessionSeconds(
  startedAt: number | null,
  accumulatedSeconds: number,
  now: number,
): number {
  if (startedAt === null) return accumulatedSeconds;
  return accumulatedSeconds + Math.max(0, Math.floor((now - startedAt) / 1000));
}
