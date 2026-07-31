import {
  ArrowLeft,
  ArrowUpRight,
  BookmarkPlus,
  Clock3,
  Gamepad2,
  Star,
} from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { DiscoverFooter } from "@/components/discover/discover-footer";
import { DiscoverHeader } from "@/components/discover/discover-header";
import type {
  DiscoverCollection,
  DiscoverGame,
  DiscoverReview,
} from "@/lib/discover/types";

function BackToDiscover({ href = "/discover", label = "Voltar para descobrir" }: { href?: string; label?: string }) {
  return (
    <Link
      href={href}
      className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-(--ink-muted) transition-colors hover:text-(--ink) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--accent)"
    >
      <ArrowLeft aria-hidden="true" size={17} /> {label}
    </Link>
  );
}

function DetailLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <DiscoverHeader />
      <main className="detail-page min-h-[calc(100svh-4rem)]">{children}</main>
      <DiscoverFooter />
    </>
  );
}

export function GameDetailPage({ game, backHref = "/discover" }: { game: DiscoverGame; backHref?: string }) {
  return (
    <DetailLayout>
      <Container className="py-8 sm:py-12 lg:py-16">
        <BackToDiscover href={backHref} label={backHref === "/discover/games" ? "Voltar para catálogo" : undefined} />
        <section className="mt-8 grid gap-8 lg:grid-cols-[.85fr_1.15fr] lg:items-center lg:gap-16">
          <div
            className={`order-2 discover-cover discover-cover-${game.coverTone} relative min-h-64 overflow-hidden rounded-3xl p-5 text-white sm:min-h-136 lg:order-1`}
          >
            <div className="relative z-10 flex items-start justify-between gap-4">
              <Badge variant="inverse">{game.score.toFixed(1)} no Backbit</Badge>
              <span className="text-xs font-semibold uppercase tracking-[.12em] text-white/75">
                {game.duration}
              </span>
            </div>
            <div className="absolute inset-x-5 bottom-5 z-10 border-t border-(--line-art) pt-4">
              <p className="text-xs font-semibold uppercase tracking-[.14em] text-white/70">
                Uma escolha para agora
              </p>
              <p className="display mt-2 max-w-sm text-3xl leading-[.95] sm:text-5xl">
                {game.note}
              </p>
            </div>
            <div className="pointer-events-none absolute -bottom-24 -right-16 size-64 rounded-full border border-white/15" />
            <div className="pointer-events-none absolute -bottom-16 -right-8 size-44 rounded-full border border-white/15" />
          </div>

          <div className="order-1 lg:order-2">
            <p className="eyebrow">
              {game.studio} · {game.year}
            </p>
            <h1 className="display mt-4 max-w-2xl text-5xl leading-[.9] sm:text-6xl lg:text-7xl">
              {game.title}
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-(--ink-muted) sm:mt-6 sm:text-lg">
              {game.summary}
            </p>

            <div className="mt-7 flex flex-wrap gap-2">
              {game.genres.map((genre) => (
                <span
                  key={genre}
                  className="rounded-full border border-(--line) px-3 py-1.5 text-xs font-semibold text-(--ink-muted)"
                >
                  {genre}
                </span>
              ))}
            </div>

            <dl className="mt-8 grid grid-cols-2 gap-5 border-y border-(--line) py-5 sm:grid-cols-3">
              <div className="col-span-2 sm:col-span-1">
                <dt className="flex items-center gap-2 text-xs uppercase tracking-[.12em] text-(--ink-muted)">
                  <Star aria-hidden="true" size={14} /> Nota
                </dt>
                <dd className="mt-2 font-semibold">{game.score.toFixed(1)}</dd>
              </div>
              <div>
                <dt className="flex items-center gap-2 text-xs uppercase tracking-[.12em] text-(--ink-muted)">
                  <Clock3 aria-hidden="true" size={14} /> Duração
                </dt>
                <dd className="mt-2 font-semibold">{game.duration}</dd>
              </div>
              <div>
                <dt className="flex items-center gap-2 text-xs uppercase tracking-[.12em] text-(--ink-muted)">
                  <Gamepad2 aria-hidden="true" size={14} /> Onde jogar
                </dt>
                <dd className="mt-2 font-semibold sm:text-sm">
                  {game.platforms.join(", ")}
                </dd>
              </div>
            </dl>

            <Link
              href="/register"
              className="mt-7 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-(--action-bg) px-5 text-sm font-semibold text-(--action-fg) transition-colors hover:bg-(--accent) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--accent) sm:w-auto"
            >
              <BookmarkPlus aria-hidden="true" size={17} />
              Salvar no meu Backbit
            </Link>
          </div>
        </section>

        <section className="mt-14 grid gap-8 border-t border-(--line) pt-8 sm:mt-20 sm:grid-cols-[.8fr_1.2fr] sm:gap-16">
          <div>
            <p className="eyebrow">O que fica</p>
            <h2 className="display mt-3 max-w-md text-4xl leading-[.95]">
              Cabe no seu momento.
            </h2>
          </div>
          <p className="max-w-2xl text-base leading-7 text-(--ink-muted) sm:text-lg">
            {game.note}
          </p>
        </section>
      </Container>
    </DetailLayout>
  );
}

export function CollectionDetailPage({
  collection,
  games,
}: {
  collection: DiscoverCollection;
  games: readonly DiscoverGame[];
}) {
  return (
    <DetailLayout>
      <Container className="py-8 sm:py-12 lg:py-16">
        <BackToDiscover />
        <section className="mt-10 grid gap-8 lg:grid-cols-[1.2fr_.8fr] lg:items-end lg:gap-16">
          <div>
            <p className="eyebrow">{collection.mood}</p>
            <h1 className="display mt-4 max-w-4xl text-5xl leading-[.9] sm:text-7xl">
              {collection.title}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-(--ink-muted) sm:text-lg">
              {collection.description}
            </p>
          </div>
          <Card className="rounded-2xl p-5 sm:p-6">
            <p className="eyebrow">Uma seleção com contexto</p>
            <p className="display mt-4 text-5xl leading-none">{games.length}</p>
            <p className="mt-2 text-sm text-(--ink-muted)">
              jogos escolhidos para este momento.
            </p>
          </Card>
        </section>

        <section className="mt-14 border-t border-(--line) pt-8 sm:mt-20">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="eyebrow">A seleção</p>
              <h2 className="display mt-3 text-4xl leading-none">
                Comece por qualquer um.
              </h2>
            </div>
            <span className="text-sm text-(--ink-muted)">
              {games.length} jogos
            </span>
          </div>
          <ol className="mt-7 divide-y divide-(--line) border-y border-(--line)">
            {games.map((game, index) => (
              <li
                key={game.id}
                className="grid grid-cols-[2.5rem_minmax(0,1fr)_auto] items-center gap-3 py-6 sm:grid-cols-[3.5rem_1fr_auto] sm:gap-6"
              >
                <span className="display text-3xl text-(--ink-muted)">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <Link
                    href={`/discover/games/${game.slug}`}
                    className="display text-3xl leading-none transition-colors hover:text-(--accent)"
                  >
                    {game.title}
                  </Link>
                  <p className="mt-2 text-sm leading-6 text-(--ink-muted)">
                    {game.duration} · {game.note}
                  </p>
                </div>
                <Link
                  href={`/discover/games/${game.slug}`}
                  aria-label={`Abrir ${game.title}`}
                  className="inline-flex size-11 items-center justify-center rounded-full border border-(--line) transition-colors hover:bg-(--action-bg) hover:text-(--action-fg) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--accent) sm:justify-self-end"
                >
                  <ArrowUpRight aria-hidden="true" size={17} />
                </Link>
              </li>
            ))}
          </ol>
        </section>
      </Container>
    </DetailLayout>
  );
}

export function ReviewDetailPage({
  review,
  game,
}: {
  review: DiscoverReview;
  game: DiscoverGame;
}) {
  return (
    <DetailLayout>
      <Container className="py-8 sm:py-12 lg:py-16">
        <BackToDiscover />
        <article className="mx-auto mt-10 max-w-5xl">
          <header className="max-w-4xl">
            <p className="eyebrow">
              Review de {game.title} · {review.publishedAt}
            </p>
            <h1 className="display mt-4 max-w-3xl text-4xl leading-[.94] sm:text-6xl lg:text-7xl">
              {review.slug.replaceAll("-", " ")}
            </h1>
            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm">
              <p className="font-semibold">Por {review.author}</p>
              <span className="h-1 w-1 rounded-full bg-(--line)" aria-hidden="true" />
              <div className="flex items-center gap-2 text-(--accent)" aria-label={`Nota ${review.rating} de 5`}>
                <span className="flex gap-0.5" aria-hidden="true">
                  {Array.from({ length: 5 }, (_, index) => (
                    <Star key={index} size={14} fill={index < Math.round(review.rating) ? "currentColor" : "none"} />
                  ))}
                </span>
                <span className="font-semibold text-(--ink)">{review.rating}/5</span>
              </div>
            </div>
          </header>

          <div className="mt-10 grid gap-10 sm:mt-14 lg:grid-cols-[1.2fr_.8fr] lg:items-start lg:gap-20">
            <div>
              <blockquote className="display border-l-2 border-(--accent) pl-5 text-3xl leading-[1.06] sm:pl-6 sm:text-5xl sm:leading-[1.02]">
                “{review.excerpt}”
              </blockquote>
              <p className="mt-8 max-w-2xl border-t border-(--line) pt-8 text-base leading-7 text-(--ink-muted) sm:mt-10 sm:pt-10 sm:text-lg sm:leading-8">
                {review.body}
              </p>
            </div>
            <Card className="rounded-2xl p-5 sm:p-6 lg:sticky lg:top-24">
              <p className="eyebrow">Sobre o jogo</p>
              <h2 className="display mt-4 text-4xl leading-none">
                {game.title}
              </h2>
              <p className="mt-3 text-sm leading-6 text-(--ink-muted)">
                {game.studio} · {game.year}
              </p>
              <div className="mt-6 border-t border-(--line) pt-5">
                <p className="text-xs uppercase tracking-[.12em] text-(--ink-muted)">
                  Nota da comunidade
                </p>
                <p className="display mt-2 text-4xl leading-none">{game.score.toFixed(1)}</p>
              </div>
              <Link
                href={`/discover/games/${game.slug}`}
                className="mt-7 inline-flex items-center gap-2 text-sm font-semibold underline underline-offset-4 hover:text-(--accent)"
              >
                Ver jogo <ArrowUpRight aria-hidden="true" size={16} />
              </Link>
            </Card>
          </div>
        </article>
      </Container>
    </DetailLayout>
  );
}
