"use client";

import { useEffect, useState } from "react";
import { GameCard, type GameCardData } from "@/components/ui/game-card";

type GameCardCarouselProps = {
  items: readonly GameCardData[];
  intervalMs?: number;
};

export function GameCardCarousel({
  items,
  intervalMs = 5200,
}: GameCardCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (
      items.length < 2 ||
      paused ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const timer = window.setInterval(
      () => setActiveIndex((current) => (current + 1) % items.length),
      intervalMs,
    );
    return () => window.clearInterval(timer);
  }, [intervalMs, items.length, paused]);

  if (items.length === 0) return null;
  const activeItem = items[activeIndex] ?? items[0];

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div aria-live="polite">
        <GameCard key={activeItem.title} {...activeItem} />
      </div>
      {items.length > 1 && (
        <div
          className="mt-4 flex items-center justify-center gap-2"
          aria-label="Selecionar jogo em destaque"
        >
          {items.map((item, index) => (
            <button
              key={item.title}
              type="button"
              aria-label={`Mostrar ${item.title}`}
              aria-current={index === activeIndex ? "true" : undefined}
              onClick={() => setActiveIndex(index)}
              className={`h-2 rounded-full transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--accent) ${index === activeIndex ? "w-7 bg-(--ink)" : "w-2 bg-(--line)"}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
