import { discoverGames } from "@/lib/discover/content";
import type { DiscoverReview } from "@/lib/discover/types";
import { ReviewCard } from "@/components/discover/review-card";
type TrendingSectionProps = { reviews: readonly DiscoverReview[] };
export function TrendingSection({ reviews }: TrendingSectionProps) { return <section aria-labelledby="reviews-title"><p className="eyebrow">Quem jogou deixou anotado</p><h2 id="reviews-title" className="display mt-3 text-4xl leading-none">Reviews que valem a leitura.</h2><div className="mt-7 grid gap-4 lg:grid-cols-3">{reviews.map((review) => { const game = discoverGames.find((item) => item.id === review.gameId); return game ? <ReviewCard key={review.id} review={review} game={game} /> : null; })}</div></section>; }
