"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import type { DiscoverGame } from "@/lib/discover/types";
import { DiscoverGameCard } from "@/components/discover/game-card";
type FeaturedRecommendationsProps = {
  games: readonly DiscoverGame[];
  onPreview: (game: DiscoverGame) => void;
};
export function FeaturedRecommendations({
  games,
  onPreview,
}: FeaturedRecommendationsProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || games.length < 2) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSlide = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        const visibleIndex = visibleSlide
          ? slideRefs.current.indexOf(visibleSlide.target as HTMLDivElement)
          : -1;

        if (visibleIndex >= 0) setActiveIndex(visibleIndex);
      },
      { root: track, threshold: 0.65 },
    );

    slideRefs.current.forEach((slide) => {
      if (slide) observer.observe(slide);
    });

    return () => observer.disconnect();
  }, [games.length]);

  const goToSlide = (index: number) => {
    const nextIndex = Math.max(0, Math.min(index, games.length - 1));
    slideRefs.current[nextIndex]?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start",
    });
    setActiveIndex(nextIndex);
  };

  return (
    <section className="discover-section" aria-labelledby="featured-title">
      <div className="grid gap-6 sm:grid-cols-[.8fr_1fr] sm:items-end sm:gap-10">
        <div>
          <p className="eyebrow">Comece por aqui</p>
          <h1
            id="featured-title"
            className="display mt-4 max-w-xl text-4xl leading-[.94] sm:text-6xl"
          >
            Descubra algo que cabe no agora.
          </h1>
        </div>
        <p className="max-w-lg text-sm leading-6 text-(--ink-muted) sm:mb-1 sm:justify-self-end">
          Jogos escolhidos por duração, clima e pela vontade de abrir algo novo
          — sem uma prateleira infinita no caminho.
        </p>
        <Link
          href="/discover/games"
          className="text-sm font-semibold text-(--ink) underline underline-offset-4 hover:text-(--accent)"
        >
          Explorar todos os jogos
        </Link>
      </div>

      <div className="mt-8 flex items-center justify-between gap-4 sm:mt-9 md:hidden">
        <p className="text-xs font-semibold uppercase tracking-[.12em] text-(--ink-muted)">
          {String(activeIndex + 1).padStart(2, "0")} /{" "}
          {String(games.length).padStart(2, "0")}
        </p>
        {games.length > 1 && (
          <div className="flex gap-2">
            <button
              type="button"
              aria-label="Recomendação anterior"
              onClick={() => goToSlide(activeIndex - 1)}
              disabled={activeIndex === 0}
              className="inline-flex size-11 items-center justify-center rounded-full border border-(--line) transition-colors hover:bg-(--action-bg) hover:text-(--action-fg) disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--accent)"
            >
              <ChevronLeft aria-hidden="true" size={18} />
            </button>
            <button
              type="button"
              aria-label="Próxima recomendação"
              onClick={() => goToSlide(activeIndex + 1)}
              disabled={activeIndex === games.length - 1}
              className="inline-flex size-11 items-center justify-center rounded-full border border-(--line) transition-colors hover:bg-(--action-bg) hover:text-(--action-fg) disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--accent)"
            >
              <ChevronRight aria-hidden="true" size={18} />
            </button>
          </div>
        )}
      </div>

      <div
        ref={trackRef}
        role="region"
        aria-label="Recomendações em destaque"
        aria-roledescription="carrossel"
        className="discover-carousel-track mx-0 mt-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 sm:-mx-8 sm:px-8 md:mx-0 md:mt-9 md:grid md:grid-cols-2 md:overflow-visible md:px-0 md:pb-0"
      >
        {games.map((game, index) => (
          <div
            key={game.id}
            ref={(slide) => {
              slideRefs.current[index] = slide;
            }}
            className="w-[calc(100%-1.5rem)] shrink-0 snap-start sm:w-[calc(50%-0.5rem)] md:w-auto"
          >
            <DiscoverGameCard game={game} onPreview={onPreview} />
          </div>
        ))}
      </div>

      {games.length > 1 && (
        <div
          className="mt-3 flex justify-center gap-2 md:hidden"
          aria-label="Posição no carrossel"
        >
          {games.map((game, index) => (
            <button
              key={game.id}
              type="button"
              aria-label={`Mostrar recomendação ${index + 1}`}
              aria-current={index === activeIndex ? "true" : undefined}
              onClick={() => goToSlide(index)}
              className={`h-2 rounded-full transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--accent) ${index === activeIndex ? "w-7 bg-(--ink)" : "w-2 bg-(--line)"}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
