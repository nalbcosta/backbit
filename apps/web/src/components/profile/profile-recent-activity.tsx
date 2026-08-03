import { BoardCover } from "@/components/board/board-cover";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { SectionHeading } from "@/components/ui/section-heading";
import type { ProfileGame } from "@/lib/profile/profile.types";

const statusLabels = { playing: "Em jogo", paused: "Em pausa", backlog: "Backlog", completed: "Terminado", dropped: "Deixado", wishlist: "Na mira" } as const;

export function ProfileRecentActivity({ games }: { games: readonly ProfileGame[] }) {
  return <section aria-labelledby="profile-recent-title"><SectionHeading eyebrow="Movimento recente" title="O que está por perto." description="Jogos que você atualizou ou deixou em pausa para voltar depois." />
    <div id="profile-recent-title" className="mt-8 space-y-3">{games.length ? games.map((game) => <Card key={game.id} className="flex gap-4 rounded-2xl p-3"><BoardCover game={game} className="h-20 w-14" /><div className="min-w-0 flex-1 py-1"><div className="flex items-start justify-between gap-3"><h3 className="font-semibold">{game.title}</h3><Badge>{statusLabels[game.status]}</Badge></div><p className="mt-2 text-sm text-(--ink-muted)">{game.platform}{game.progressPercent !== undefined ? ` · ${game.progressPercent}%` : ""}</p></div></Card>) : <EmptyState title="Nada recente por aqui" description="Registre uma sessão ou mova um jogo no board para começar a compor seu histórico." />}</div>
  </section>;
}
