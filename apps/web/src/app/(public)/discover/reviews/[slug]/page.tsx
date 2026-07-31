import { notFound } from "next/navigation";
import { ReviewDetailPage } from "@/components/discover/detail-page";
import { discoverGames, discoverReviews } from "@/lib/discover/content";

type ReviewPageProps = { params: Promise<{ slug: string }> };
export default async function ReviewPage({ params }: ReviewPageProps) {
  const { slug } = await params;
  const review = discoverReviews.find((item) => item.slug === slug);
  const game = review
    ? discoverGames.find((item) => item.id === review.gameId)
    : undefined;
  if (!review || !game) notFound();
  return <ReviewDetailPage review={review} game={game} />;
}
