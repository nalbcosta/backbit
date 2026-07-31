import { notFound } from "next/navigation";
import { GameDetailPage } from "@/components/discover/detail-page";
import { getGameBySlug } from "@/lib/discover/selectors";

type GamePageProps = { params: Promise<{ slug: string }> };
export default async function GamePage({ params }: GamePageProps) {
  const game = getGameBySlug((await params).slug);
  if (!game) notFound();
  return <GameDetailPage game={game} />;
}
