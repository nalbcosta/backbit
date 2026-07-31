import { notFound } from "next/navigation";
import { CollectionDetailPage } from "@/components/discover/detail-page";
import { discoverCollections, discoverGames } from "@/lib/discover/content";

type ListPageProps = { params: Promise<{ slug: string }> };
export default async function ListPage({ params }: ListPageProps) {
  const { slug } = await params;
  const collection = discoverCollections.find((item) => item.slug === slug);
  if (!collection) notFound();
  const games = collection.gameIds
    .map((id) => discoverGames.find((game) => game.id === id))
    .filter((game): game is (typeof discoverGames)[number] => Boolean(game));
  return <CollectionDetailPage collection={collection} games={games} />;
}
