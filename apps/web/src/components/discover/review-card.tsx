import { Quote } from "lucide-react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import type { DiscoverGame, DiscoverReview } from "@/lib/discover/types";
import {
  getDiscoverRoutes,
  type DiscoverScope,
} from "@/lib/discover/discover-routes";
type ReviewCardProps = {
  review: DiscoverReview;
  game: DiscoverGame;
  scope: DiscoverScope;
};
export function ReviewCard({ review, game, scope }: ReviewCardProps) {
  return (
    <Card className="flex h-full min-h-80 flex-col rounded-2xl p-5">
      <Quote aria-hidden="true" size={22} className="text-(--accent)" />
      <blockquote className="display mt-5 flex-1 text-2xl leading-[1.05]">
        “{review.excerpt}”
      </blockquote>
      <div className="mt-6 flex items-end justify-between gap-3 border-t border-(--line) pt-4">
        <div>
          <p className="text-sm font-semibold">{review.author}</p>
          <p className="mt-1 text-xs text-(--ink-muted)">
            {game.title} · {review.publishedAt}
          </p>
        </div>
        <Link
          href={getDiscoverRoutes(scope).review(review.slug)}
          className="text-sm font-semibold underline underline-offset-4 hover:text-(--accent)"
        >
          Ler
        </Link>
      </div>
    </Card>
  );
}
