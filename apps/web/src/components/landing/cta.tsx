import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { APP_NAME } from "@/config/app";
export function Cta() {
  return (
    <section id="waitlist" className="section border-t border-(--line)">
      <Container>
        <div className="art px-6 py-14 sm:px-12 sm:py-20">
          <p className="eyebrow">Em breve</p>
          <h2 className="display mt-5 max-w-xl text-5xl leading-[.92] sm:text-6xl">
            Um lugar melhor para voltar aos jogos.
          </h2>
          <p className="art-muted mt-5 max-w-md text-sm leading-6">
            Entre na lista de espera e saiba quando o {APP_NAME} estiver pronto
            para o seu backlog.
          </p>
          <Button
            href="mailto:hello@backbit.app?subject=Lista%20de%20espera"
            className="mt-8 bg-(--on-art) text-(--art-end) hover:bg-(--surface)"
          >
            Quero receber novidades
          </Button>
        </div>
      </Container>
    </section>
  );
}
