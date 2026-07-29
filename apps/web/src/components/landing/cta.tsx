import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { APP_NAME } from "@/config/app";
export function Cta() {
  return (
    <section className="section border-t border-(--line)">
      <Container>
        <div className="art px-6 py-14 sm:px-12 sm:py-20">
          <p className="eyebrow">Seu espaço de jogo</p>
          <h2 className="display mt-5 max-w-xl text-5xl leading-[.92] sm:text-6xl">
            Um lugar melhor para voltar aos jogos.
          </h2>
          <p className="art-muted mt-5 max-w-md text-sm leading-6">
            Entre para organizar seu backlog, registrar sessões e escolher o
            próximo jogo com mais contexto.
          </p>
          <Button
            href="/login"
            className="mt-8 bg-(--on-art) text-(--art-end) hover:bg-(--surface)"
          >
            Entrar no {APP_NAME}
          </Button>
        </div>
      </Container>
    </section>
  );
}
