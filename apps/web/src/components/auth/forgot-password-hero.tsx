import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

export function ForgotPasswordHero() {
  return (
    <section className="art relative hidden overflow-hidden px-6 py-10 sm:px-10 sm:py-14 lg:flex lg:min-h-dvh lg:items-center lg:px-16">
      <div className="mx-auto w-full max-w-xl">
        <Badge variant="inverse">Um caminho de volta</Badge>
        <h1 className="display mt-7 max-w-lg text-5xl leading-[.9] sm:text-6xl lg:text-7xl">
          Seu espaço continua aqui.
        </h1>
        <p className="art-muted mt-6 max-w-md text-base leading-7 sm:text-lg">
          Um link basta para voltar ao seu backlog, às sessões e aos jogos que ficaram esperando.
        </p>

        <Card className="mt-10 border-(--line-art) bg-transparent p-5 text-(--on-art) sm:p-6">
          <p className="text-xs font-semibold uppercase tracking-[.13em] text-(--on-art-muted)">
            Sem pressa
          </p>
          <p className="display mt-4 max-w-md text-3xl leading-[1.05]">
            Recuperar o acesso também faz parte de continuar.
          </p>
        </Card>
      </div>
    </section>
  );
}
