import { notFound } from "next/navigation";

import { GameDetailPage } from "@/components/discover/detail-page";
import { getDiscoverBackHref } from "@/lib/discover/discover-routes";
import { getGameBySlug } from "@/lib/discover/selectors";

type PageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ from?: string }>;
};

export default async function PrivateGamePage({
  params,
  searchParams,
}: PageProps) {
  const game = getGameBySlug((await params).slug);
  if (!game) notFound();
  const backHref = getDiscoverBackHref(
    "private",
    (await searchParams).from,
    "games",
  );
  return <GameDetailPage game={game} backHref={backHref} scope="private" />;
}
