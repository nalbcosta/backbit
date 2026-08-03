import { BoardCover } from "@/components/board/board-cover";
import { Card } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { SectionHeading } from "@/components/ui/section-heading";
import type { SavedCollection } from "@/lib/profile/profile.types";

export function ProfileSavedItems({ collections }: { collections: readonly SavedCollection[] }) {
  return <section aria-labelledby="profile-saved-title"><SectionHeading eyebrow="Coleções salvas" title="O que fica com você." />
    <div id="profile-saved-title" className="mt-8 grid gap-4 sm:grid-cols-2">{collections.map((collection) => <Card key={collection.id} className="rounded-2xl p-5"><h3 className="display text-2xl">{collection.title}</h3><p className="mt-2 text-sm leading-6 text-(--ink-muted)">{collection.description}</p>{collection.games.length ? <div className="mt-5 flex -space-x-2">{collection.games.slice(0, 4).map((game) => <BoardCover key={game.id} game={game} className="h-16 w-11 ring-2 ring-(--surface)" />)}</div> : <div className="mt-5"><EmptyState title="Ainda vazia" description="Escolha jogos no onboarding para preencher esta coleção." /></div>}</Card>)}</div>
  </section>;
}
