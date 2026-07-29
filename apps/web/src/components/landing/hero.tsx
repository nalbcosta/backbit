import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { GameCardCarousel } from "@/components/ui/game-card-carousel";

const heroGames = [
  { status: "Em jogo", meta: "12h 34m", title: "Noite sem mapa.", description: "Uma sessão curta também conta. Continue de onde parou." },
  { status: "Em jogo", meta: "Sessão 04", title: "A cidade que chove.", description: "Registre o que ficou na cabeça antes de fechar o jogo." },
  { status: "Na fila", meta: "6–8 horas", title: "Depois do inverno.", description: "Um jogo para terminar em um fim de semana sem pressa." },
] as const;
export function Hero() {
  return (
    <section id="inicio" className="overflow-hidden">
      <Container className="grid gap-12 py-16 sm:py-24 lg:grid-cols-[1.1fr_.9fr] lg:items-end lg:py-32">
        <div>
          <Badge>Game tracker, sem ruído</Badge>
          <h1 className="display mt-7 max-w-3xl text-6xl leading-[.88] sm:text-7xl lg:text-8xl">
            Seu backlog,
            <br />
            finalmente jogável.
          </h1>
          <p className="mt-7 max-w-lg text-base leading-7 text-(--ink-muted) sm:text-lg">
            Organize o que você quer jogar, acompanhe suas sessões e guarde o
            que cada jogo deixou em você.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href="/login">Acessar o Backbit</Button>
            <Button href="#como-funciona" variant="secondary">
              Ver por dentro
            </Button>
          </div>
        </div>
        <GameCardCarousel items={heroGames} />
      </Container>
    </section>
  );
}
