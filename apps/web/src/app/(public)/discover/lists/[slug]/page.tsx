import { notFound } from "next/navigation";
import { CollectionDetailPage } from "@/components/discover/detail-page";
import { discoverCollections, discoverGames } from "@/lib/discover/content";

type ListPageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ from?: string }>;
};
export default async function ListPage({
  params,
  searchParams,
}: ListPageProps) {
  const { slug } = await params;
  const collection = discoverCollections.find((item) => item.slug === slug);
  if (!collection) notFound();
  const games = collection.gameIds
    .map((id) => discoverGames.find((game) => game.id === id))
    .filter((game): game is (typeof discoverGames)[number] => Boolean(game));
  const requestedOrigin = (await searchParams).from;
  const backHref =
    requestedOrigin === "/discover/lists" ? requestedOrigin : "/discover";
  return (
    <CollectionDetailPage
      collection={collection}
      games={games}
      backHref={backHref}
    />
  );
}
