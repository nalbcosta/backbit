import { ArrowUpRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import type { DiscoverCollection } from "@/lib/discover/types";
type ListCardProps = { collection: DiscoverCollection };
export function ListCard({ collection }: ListCardProps) { return <Card className="flex min-h-60 flex-col justify-between rounded-2xl p-5"><div><p className="eyebrow">{collection.mood} · {collection.gameIds.length} jogos</p><h3 className="display mt-4 text-3xl leading-[.95]">{collection.title}</h3><p className="mt-4 text-sm leading-6 text-(--ink-muted)">{collection.description}</p></div><a href={`/discover/lists/${collection.slug}`} className="mt-6 inline-flex items-center gap-2 self-start text-sm font-semibold hover:text-(--accent)">Abrir lista <ArrowUpRight aria-hidden="true" size={16} /></a></Card>; }
