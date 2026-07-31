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

function BackToDiscover() {
  return (
    <Link
      href="/discover"
      className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-(--ink-muted) transition-colors hover:text-(--ink) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--accent)"
    >
      <ArrowLeft aria-hidden="true" size={17} /> Voltar para descobrir
    </Link>
  );
}

function DetailLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <DiscoverHeader />
      <main className="min-h-[calc(100svh-4rem)]">{children}</main>
      <DiscoverFooter />
    </>
  );
}

export function GameDetailPage({ game }: { game: DiscoverGame }) {
  return (
    <DetailLayout>
      <Container className="py-6 sm:py-10">
        <BackToDiscover />
        <section className="mt-8 grid gap-8 lg:grid-cols-[.85fr_1.15fr] lg:items-center lg:gap-16">
          <div
            className={`discover-cover discover-cover-${game.coverTone} relative min-h-104 overflow-hidden rounded-3xl p-5 text-white sm:min-h-136`}
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
              <p className="display mt-2 text-4xl leading-none sm:text-5xl">
                {game.note}
              </p>
            </div>
            <div className="pointer-events-none absolute -bottom-24 -right-16 size-64 rounded-full border border-white/15" />
            <div className="pointer-events-none absolute -bottom-16 -right-8 size-44 rounded-full border border-white/15" />
          </div>

          <div>
            <p className="eyebrow">
              {game.studio} · {game.year}
            </p>
            <h1 className="display mt-4 max-w-2xl text-6xl leading-[.88] sm:text-7xl">
              {game.title}
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-(--ink-muted) sm:text-lg">
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
              <div>
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
              className="mt-7 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-(--action-bg) px-5 text-sm font-semibold text-(--action-fg) transition-colors hover:bg-(--accent) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--accent)"
            >
              <BookmarkPlus aria-hidden="true" size={17} />
              Salvar no meu Backbit
            </Link>
          </div>
        </section>

        <section className="mt-14 grid gap-8 border-t border-(--line) pt-8 sm:mt-20 sm:grid-cols-[.8fr_1.2fr] sm:gap-16">
          <div>
            <p className="eyebrow">O que fica</p>
            <h2 className="display mt-3 text-4xl leading-[.95]">
              Um jogo para lembrar do ritmo.
            </h2>
          </div>
          <p className="max-w-2xl text-base leading-7 text-(--ink-muted)">
            {game.note} {game.summary}
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
      <Container className="py-6 sm:py-10">
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
      <Container className="py-6 sm:py-10">
        <BackToDiscover />
        <article className="mx-auto mt-10 max-w-5xl">
          <header className="max-w-3xl">
            <p className="eyebrow">
              Review de {game.title} · {review.publishedAt}
            </p>
            <h1 className="display mt-4 text-5xl leading-[.9] sm:text-7xl">
              {review.slug.replaceAll("-", " ")}
            </h1>
            <p className="mt-6 text-sm font-semibold">
              Por {review.author} · {review.rating}/5
            </p>
          </header>

          <div className="mt-12 grid gap-10 lg:grid-cols-[1.2fr_.8fr] lg:items-start lg:gap-20">
            <div>
              <blockquote className="display border-l-2 border-(--accent) pl-6 text-4xl leading-[1.02] sm:text-5xl">
                “{review.excerpt}”
              </blockquote>
              <p className="mt-10 max-w-2xl text-lg leading-8 text-(--ink-muted)">
                {review.body}
              </p>
            </div>
            <Card className="rounded-2xl p-5 sm:p-6">
              <p className="eyebrow">Sobre o jogo</p>
              <h2 className="display mt-4 text-4xl leading-none">
                {game.title}
              </h2>
              <p className="mt-3 text-sm leading-6 text-(--ink-muted)">
                {game.studio} · {game.year}
              </p>
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
