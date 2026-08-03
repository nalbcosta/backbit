import { notFound } from "next/navigation";

import { ReviewDetailPage } from "@/components/discover/detail-page";
import { discoverGames, discoverReviews } from "@/lib/discover/content";

type PageProps = { params: Promise<{ slug: string }> };

export default async function PrivateReviewPage({ params }: PageProps) {
  const { slug } = await params;
  const review = discoverReviews.find((item) => item.slug === slug);
  const game = review
    ? discoverGames.find((item) => item.id === review.gameId)
    : undefined;
  if (!review || !game) notFound();
  return <ReviewDetailPage review={review} game={game} scope="private" />;
}
