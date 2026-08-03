import { discoverGames } from "@/lib/discover/content";
import type { DiscoverReview } from "@/lib/discover/types";
import { ReviewCard } from "@/components/discover/review-card";
import type { DiscoverScope } from "@/lib/discover/discover-routes";
type TrendingSectionProps = {
  reviews: readonly DiscoverReview[];
  scope: DiscoverScope;
};
export function TrendingSection({ reviews, scope }: TrendingSectionProps) {
  return (
    <section
      className="discover-section border-t border-(--line) pt-14"
      aria-labelledby="reviews-title"
    >
      <p className="eyebrow">Quem jogou deixou anotado</p>
      <h2 id="reviews-title" className="display mt-3 text-4xl leading-none">
        Reviews que valem a leitura.
      </h2>
      <div className="mt-7 grid items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {reviews.map((review) => {
          const game = discoverGames.find((item) => item.id === review.gameId);
          return game ? (
            <ReviewCard
              key={review.id}
              review={review}
              game={game}
              scope={scope}
            />
          ) : null;
        })}
      </div>
    </section>
  );
}
