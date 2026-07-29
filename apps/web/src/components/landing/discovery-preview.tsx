import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
const picks = [
  {
    title: "Para terminar em um fim de semana",
    detail: "6–8 horas · aventura intimista",
  },
  {
    title: "Se você quer algo contemplativo",
    detail: "Exploração lenta · sem combate",
  },
  {
    title: "Para depois de um jogo longo",
    detail: "2 horas · narrativa fechada",
  },
];
export function DiscoveryPreview() {
  return (
    <section id="descobrir" className="theme-inverse section">
      <Container>
        <div className="grid gap-12 lg:grid-cols-2 lg:items-end">
          <SectionHeading
            eyebrow="O próximo jogo"
            title="Descoberta que entende o momento."
            description="Não é só uma lista de lançamentos. É uma escolha que cabe no seu tempo e no seu humor."
          />
          <div className="space-y-px border-y border-(--line)">
            {picks.map((pick, index) => (
              <Card
                key={pick.title}
                className="flex items-center gap-5 border-x-0 border-y-0 bg-transparent px-0 py-5"
              >
                <span className="display text-3xl text-(--ink-muted)">
                  0{index + 1}
                </span>
                <div>
                  <h3 className="display text-2xl">{pick.title}</h3>
                  <p className="mt-1 text-sm text-(--ink-muted)">
                    {pick.detail}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
        <Button href="/discover" variant="secondary" className="mt-9 border-(--line) text-(--ink) hover:bg-(--surface) hover:text-(--ink)">Explorar descobertas</Button>
      </Container>
    </section>
  );
}
