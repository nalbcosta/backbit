import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

export function LoginHero() {
  return (
    <section className="art relative hidden overflow-hidden px-6 py-10 sm:px-10 sm:py-14 lg:flex lg:min-h-dvh lg:items-center lg:px-16">
      <div className="mx-auto w-full max-w-xl">
        <Badge variant="inverse">Seu diário de jogos</Badge>
        <h1 className="display mt-7 max-w-lg text-5xl leading-[.9] sm:text-6xl lg:text-7xl">
          Volte para o que importa jogar.
        </h1>
        <p className="art-muted mt-6 max-w-md text-base leading-7 sm:text-lg">
          Seu backlog, suas sessões e as histórias que ficam depois de cada jogo.
        </p>

        <Card className="mt-10 border-(--line-art) bg-transparent p-5 text-(--on-art) sm:p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[.13em] text-(--on-art-muted)">
                Em jogo agora
              </p>
              <h2 className="display mt-3 text-3xl leading-none">
                Depois do inverno.
              </h2>
            </div>
            <span className="rounded-full border border-(--line-art) px-3 py-1 text-xs font-semibold">
              62%
            </span>
          </div>
          <div className="mt-8 h-1.5 overflow-hidden rounded-full bg-white/20">
            <div className="h-full w-[62%] rounded-full bg-(--on-art)" />
          </div>
          <p className="art-muted mt-3 text-sm">Sessão 04 · 12h 34m</p>
        </Card>
      </div>
    </section>
  );
}
