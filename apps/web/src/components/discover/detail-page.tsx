import { ArrowLeft } from "lucide-react";
import { Container } from "@/components/ui/container";
import { DiscoverHeader } from "@/components/discover/discover-header";
import { Badge } from "@/components/ui/badge";
import type {
  DiscoverCollection,
  DiscoverGame,
  DiscoverReview,
} from "@/lib/discover/types";

export function GameDetailPage({ game }: { game: DiscoverGame }) {
  return (
    <>
      <DiscoverHeader />
      <main>
        <Container className="py-8 sm:py-12">
          <a
            href="/discover"
            className="inline-flex items-center gap-2 text-sm font-semibold hover:text-(--accent)"
          >
            <ArrowLeft aria-hidden="true" size={16} /> Voltar para descobrir
          </a>
          <div className="mt-8 grid gap-8 lg:grid-cols-[1.05fr_.95fr] lg:items-end">
            <div
              className={`discover-cover discover-cover-${game.coverTone} min-h-80 rounded-3xl p-6 text-white`}
            >
              <Badge variant="inverse">
                {game.score.toFixed(1)} no Backbit
              </Badge>
            </div>
            <div>
              <p className="eyebrow">
                {game.studio} · {game.year}
              </p>
              <h1 className="display mt-4 text-6xl leading-[.86]">
                {game.title}
              </h1>
              <p className="mt-6 text-base leading-7 text-(--ink-muted)">
                {game.summary}
              </p>
              <dl className="mt-8 grid grid-cols-2 gap-5 border-y border-(--line) py-5 text-sm">
                <div>
                  <dt className="text-(--ink-muted)">Duração</dt>
                  <dd className="mt-1 font-semibold">{game.duration}</dd>
                </div>
                <div>
                  <dt className="text-(--ink-muted)">Onde jogar</dt>
                  <dd className="mt-1 font-semibold">
                    {game.platforms.join(", ")}
                  </dd>
                </div>
              </dl>
              <a
                href="/register"
                className="mt-7 inline-flex min-h-12 items-center justify-center rounded-full bg-(--action-bg) px-5 text-sm font-semibold text-(--action-fg)"
              >
                Salvar no meu Backbit
              </a>
            </div>
          </div>
        </Container>
      </main>
    </>
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
    <>
      <DiscoverHeader />
      <main>
        <Container className="py-8 sm:py-12">
          <a
            href="/discover"
            className="inline-flex items-center gap-2 text-sm font-semibold hover:text-(--accent)"
          >
            <ArrowLeft aria-hidden="true" size={16} /> Voltar para descobrir
          </a>
          <p className="eyebrow mt-10">{collection.mood}</p>
          <h1 className="display mt-4 max-w-3xl text-6xl leading-[.86]">
            {collection.title}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-(--ink-muted)">
            {collection.description}
          </p>
          <ol className="mt-10 space-y-px border-y border-(--line)">
            {games.map((game, index) => (
              <li key={game.id} className="flex items-center gap-5 py-5">
                <span className="display text-3xl text-(--ink-muted)">
                  0{index + 1}
                </span>
                <div>
                  <a
                    href={`/discover/games/${game.slug}`}
                    className="display text-3xl hover:text-(--accent)"
                  >
                    {game.title}
                  </a>
                  <p className="mt-1 text-sm text-(--ink-muted)">
                    {game.duration} · {game.note}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </main>
    </>
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
    <>
      <DiscoverHeader />
      <main>
        <Container className="py-8 sm:py-12">
          <a
            href="/discover"
            className="inline-flex items-center gap-2 text-sm font-semibold hover:text-(--accent)"
          >
            <ArrowLeft aria-hidden="true" size={16} /> Voltar para descobrir
          </a>
          <article className="mx-auto mt-12 max-w-3xl">
            <p className="eyebrow">
              Review de {game.title} · {review.publishedAt}
            </p>
            <h1 className="display mt-4 text-5xl leading-[.9]">
              {review.slug.replaceAll("-", " ")}
            </h1>
            <p className="mt-7 text-sm font-semibold">
              Por {review.author} · {review.rating}/5
            </p>
            <blockquote className="display mt-10 border-l-2 border-(--accent) pl-6 text-4xl leading-[1.02]">
              “{review.excerpt}”
            </blockquote>
            <p className="mt-10 text-lg leading-8 text-(--ink-muted)">
              {review.body}
            </p>
          </article>
        </Container>
      </main>
    </>
  );
}
