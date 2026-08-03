import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { GameCardCarousel } from "@/components/ui/game-card-carousel";

const heroGames = [
  {
    status: "Em jogo",
    meta: "12h 34m",
    title: "Noite sem mapa.",
    description: "Uma sessão curta também conta. Continue de onde parou.",
  },
  {
    status: "Em jogo",
    meta: "Sessão 04",
    title: "A cidade que chove.",
    description: "Registre o que ficou na cabeça antes de fechar o jogo.",
  },
  {
    status: "Na fila",
    meta: "6–8 horas",
    title: "Depois do inverno.",
    description: "Um jogo para terminar em um fim de semana sem pressa.",
  },
] as const;
export function Hero() {
  return (
    <section id="inicio" className="landing-section relative overflow-hidden">
      <div
        className="hero-contours pointer-events-none absolute inset-0"
        aria-hidden="true"
      >
        <svg
          className="h-full w-full"
          viewBox="0 0 1440 900"
          fill="none"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <path
              id="hero-contour"
              d="M110 470C65 365 145 275 260 268C352 262 365 165 475 148C590 130 625 230 730 244C850 260 905 160 1030 185C1150 210 1175 348 1270 390C1380 438 1460 358 1535 425C1604 488 1555 600 1450 626C1345 652 1337 747 1218 770C1098 794 1042 700 936 706C830 712 806 814 690 808C570 802 562 702 454 682C340 660 295 765 178 730C54 694 10 578 110 470Z"
            />
          </defs>
          <g className="hero-contours-motion">
            <use
              href="#hero-contour"
              className="hero-contour-line"
              transform="translate(720 450) scale(1.84) translate(-720 -450)"
            />
            <use
              href="#hero-contour"
              className="hero-contour-line"
              transform="translate(720 450) scale(1.68) translate(-720 -450)"
            />
            <use
              href="#hero-contour"
              className="hero-contour-line"
              transform="translate(720 450) scale(1.52) translate(-720 -450)"
            />
            <use
              href="#hero-contour"
              className="hero-contour-line"
              transform="translate(720 450) scale(1.36) translate(-720 -450)"
            />
            <use
              href="#hero-contour"
              className="hero-contour-line"
              transform="translate(720 450) scale(1.2) translate(-720 -450)"
            />
            <use
              href="#hero-contour"
              className="hero-contour-line"
              transform="translate(720 450) scale(1.04) translate(-720 -450)"
            />
            <use
              href="#hero-contour"
              className="hero-contour-line"
              transform="translate(720 450) scale(.88) translate(-720 -450)"
            />
            <use
              href="#hero-contour"
              className="hero-contour-line"
              transform="translate(720 450) scale(.72) translate(-720 -450)"
            />
            <use
              href="#hero-contour"
              className="hero-contour-line"
              transform="translate(720 450) scale(.56) translate(-720 -450)"
            />
            <use
              href="#hero-contour"
              className="hero-contour-line"
              transform="translate(720 450) scale(.4) translate(-720 -450)"
            />
          </g>
        </svg>
      </div>
      <Container className="relative z-10 grid gap-12 pt-20 pb-12 sm:py-24 lg:grid-cols-[1.1fr_.9fr] lg:items-end lg:py-20">
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
