import { notFound } from "next/navigation";
import { GameDetailPage } from "@/components/discover/detail-page";
import { getGameBySlug } from "@/lib/discover/selectors";
import { getDiscoverBackHref } from "@/lib/discover/discover-routes";

type GamePageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ from?: string }>;
};
export default async function GamePage({
  params,
  searchParams,
}: GamePageProps) {
  const game = getGameBySlug((await params).slug);
  if (!game) notFound();
  const requestedOrigin = (await searchParams).from;
  const backHref = getDiscoverBackHref("public", requestedOrigin, "games");
  return <GameDetailPage game={game} backHref={backHref} scope="public" />;
}
