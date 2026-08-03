import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

export function RegisterHero() {
  return (
    <section className="art relative hidden overflow-hidden px-6 py-10 sm:px-10 sm:py-14 lg:flex lg:min-h-dvh lg:items-center lg:px-16">
      <div className="mx-auto w-full max-w-xl">
        <Badge variant="inverse">Comece pelo seu ritmo</Badge>
        <h1 className="display mt-7 max-w-lg text-5xl leading-[.9] sm:text-6xl lg:text-7xl">
          Uma lista que parece sua.
        </h1>
        <p className="art-muted mt-6 max-w-md text-base leading-7 sm:text-lg">
          Guarde o que quer jogar, o que está vivendo agora e o que cada jogo deixou.
        </p>

        <Card className="mt-10 border-(--line-art) bg-transparent p-5 text-(--on-art) sm:p-6">
          <p className="text-xs font-semibold uppercase tracking-[.13em] text-(--on-art-muted)">
            O começo do seu espaço
          </p>
          <ol className="mt-6 space-y-4">
            <li className="flex items-center gap-4 border-t border-(--line-art) pt-4">
              <span className="display text-2xl">01</span>
              <span className="text-sm">Organize o que ainda quer jogar.</span>
            </li>
            <li className="flex items-center gap-4 border-t border-(--line-art) pt-4">
              <span className="display text-2xl">02</span>
              <span className="text-sm">Continue sem perder o contexto.</span>
            </li>
          </ol>
        </Card>
      </div>
    </section>
  );
}
