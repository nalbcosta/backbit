"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { getElapsedSessionSeconds } from "@/lib/board/session-timer";

export function useSessionTimer() {
  const [gameId, setGameId] = useState<string | null>(null);
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const [accumulatedSeconds, setAccumulatedSeconds] = useState(0);
  const [now, setNow] = useState(() => Date.now());
  const isRunning = startedAt !== null;
  const elapsedSeconds = useMemo(
    () =>
      getElapsedSessionSeconds(startedAt, accumulatedSeconds, now),
    [accumulatedSeconds, now, startedAt],
  );

  useEffect(() => {
    if (!isRunning) return;
    const interval = window.setInterval(() => setNow(Date.now()), 1000);
    const refresh = () => setNow(Date.now());
    document.addEventListener("visibilitychange", refresh);
    return () => {
      window.clearInterval(interval);
      document.removeEventListener("visibilitychange", refresh);
    };
  }, [isRunning]);

  const start = useCallback((nextGameId: string) => {
    setGameId(nextGameId);
    setAccumulatedSeconds(0);
    setStartedAt(Date.now());
    setNow(Date.now());
  }, []);
  const resume = useCallback(() => {
    setStartedAt(Date.now());
    setNow(Date.now());
  }, []);
  const pause = useCallback(() => {
    setAccumulatedSeconds((current) => current + Math.max(0, Math.floor((Date.now() - (startedAt ?? Date.now())) / 1000)));
    setStartedAt(null);
    setNow(Date.now());
  }, [startedAt]);
  const reset = useCallback(() => {
    setGameId(null);
    setStartedAt(null);
    setAccumulatedSeconds(0);
    setNow(Date.now());
  }, []);

  return {
    gameId,
    elapsedSeconds,
    isRunning,
    hasTime: elapsedSeconds > 0,
    start,
    resume,
    pause,
    reset,
  };
}
