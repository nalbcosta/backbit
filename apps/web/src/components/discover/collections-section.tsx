import type { DiscoverCollection } from "@/lib/discover/types";
import { ListCard } from "@/components/discover/list-card";
type CollectionsSectionProps = { collections: readonly DiscoverCollection[] };
export function CollectionsSection({ collections }: CollectionsSectionProps) { return <section aria-labelledby="collections-title"><p className="eyebrow">Listas com ponto de vista</p><h2 id="collections-title" className="display mt-3 text-4xl leading-none">Escolhas que já vêm com contexto.</h2><div className="mt-7 grid gap-4 md:grid-cols-3">{collections.map((collection) => <ListCard key={collection.id} collection={collection} />)}</div></section>; }
