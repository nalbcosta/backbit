import { BacklogSnapshot } from "@/components/app/backlog-snapshot";
import { ContinuePlaying } from "@/components/app/continue-playing";
import { DiscoverNext } from "@/components/app/discover-next";
import { RecentActivity } from "@/components/app/recent-activity";
import { SummaryCards } from "@/components/app/summary-cards";
import type {
  ActivityItem,
  ContinuePlayingGame,
  DiscoveryGame,
  GameSnapshot,
  SummaryMetric,
} from "@/components/app/types";

const summary: readonly SummaryMetric[] = [
  { label: "Em jogo", value: "2", detail: "uma boa pausa entre eles" },
  { label: "Sessões no mês", value: "8", detail: "12h 34m registradas" },
  { label: "Na fila", value: "17", detail: "três já chamam atenção" },
];

const backlog: readonly GameSnapshot[] = [
  {
    title: "A cidade que chove.",
    meta: "6–8 horas",
    note: "Para uma noite longa, sem mapa e sem pressa.",
  },
  {
    title: "Pequenos sóis.",
    meta: "Na sua lista",
    note: "Você salvou depois de terminar algo parecido.",
  },
  {
    title: "Mar aberto.",
    meta: "Fim de semana",
    note: "Curto o bastante para voltar a sentir ritmo.",
  },
];

const currentGame: ContinuePlayingGame = {
  title: "Depois do inverno.",
  meta: "Em jogo",
  note: "A história está ficando mais íntima. Vale anotar o que mudou antes da próxima sessão.",
  session: "Sessão 04 · 12h 34m",
  progress: 62,
};

const discoveries: readonly DiscoveryGame[] = [
  {
    title: "Luz de saída.",
    meta: "4–5 horas",
    note: "Uma aventura compacta de exploração.",
    reason: "Cabe no tempo que você costuma ter durante a semana.",
  },
  {
    title: "De volta ao lago.",
    meta: "Narrativo",
    note: "Um mistério pequeno, mas atento aos detalhes.",
    reason: "Conversa com os jogos que você marcou como favoritos.",
  },
];

const activity: readonly ActivityItem[] = [
  {
    title: "Sessão registrada",
    detail: "Você jogou 1h 20m de Depois do inverno.",
    time: "Hoje",
  },
  {
    title: "Jogo salvo",
    detail: "Pequenos sóis entrou na sua fila.",
    time: "Ontem",
  },
  {
    title: "Nota adicionada",
    detail: "Você guardou uma impressão sobre A cidade que chove.",
    time: "Seg",
  },
];

export default function AppHomePage() {
  return (
    <>
      <section aria-labelledby="app-home-title">
        <p className="eyebrow">Seu espaço</p>
        <h1
          id="app-home-title"
          className="display mt-4 max-w-xl text-5xl leading-[.9] sm:text-6xl"
        >
          Bom ter um lugar para continuar.
        </h1>
        <p className="mt-5 max-w-lg text-base leading-7 text-(--ink-muted)">
          Um retrato curto do que está em jogo e do que pode vir depois.
        </p>
      </section>
      <div className="mt-10">
        <SummaryCards items={summary} />
      </div>
      <div className="mt-16 grid gap-16 lg:grid-cols-[1.08fr_.92fr] lg:items-start">
        <ContinuePlaying game={currentGame} />
        <RecentActivity items={activity} />
      </div>
      <div className="mt-16">
        <BacklogSnapshot games={backlog} />
      </div>
      <div className="mt-16">
        <DiscoverNext games={discoveries} />
      </div>
    </>
  );
}
