import { notFound } from "next/navigation";

import { CollectionDetailPage } from "@/components/discover/detail-page";
import { discoverCollections, discoverGames } from "@/lib/discover/content";
import { getDiscoverBackHref } from "@/lib/discover/discover-routes";

type PageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ from?: string }>;
};

export default async function PrivateListPage({
  params,
  searchParams,
}: PageProps) {
  const { slug } = await params;
  const collection = discoverCollections.find((item) => item.slug === slug);
  if (!collection) notFound();
  const games = collection.gameIds
    .map((id) => discoverGames.find((game) => game.id === id))
    .filter((game): game is (typeof discoverGames)[number] => Boolean(game));
  const backHref = getDiscoverBackHref(
    "private",
    (await searchParams).from,
    "lists",
  );
  return (
    <CollectionDetailPage
      collection={collection}
      games={games}
      backHref={backHref}
      scope="private"
    />
  );
}
