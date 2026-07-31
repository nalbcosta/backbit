import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
const features = [
  {
    number: "01",
    title: "Backlog que anda",
    text: "Dê um lugar aos jogos que você quer jogar — e veja o que continua esperando.",
  },
  {
    number: "02",
    title: "Jogue com memória",
    text: "Registre sessões, momentos e impressões enquanto o jogo ainda está fresco.",
  },
  {
    number: "03",
    title: "Reviews suas",
    text: "Notas curtas ou reviews completas. Um histórico que cresce com você.",
  },
  {
    number: "04",
    title: "Descoberta com contexto",
    text: "Encontre o próximo jogo pelo seu tempo, humor e jeito de jogar.",
  },
];
export function Features() {
  return (
    <section className="landing-section section">
      <Container>
        <SectionHeading
          eyebrow="Feito para voltar"
          title="O que você precisa, quando precisa."
        />
        <div className="mt-12 grid gap-px overflow-hidden border border-(--line) bg-(--line) sm:grid-cols-2">
          {features.map((feature) => (
            <Card key={feature.number} className="min-h-52 border-0 p-6 sm:p-8">
              <span className="eyebrow">{feature.number}</span>
              <h3 className="display mt-10 text-3xl">{feature.title}</h3>
              <p className="mt-3 max-w-xs text-sm leading-6 text-(--ink-muted)">
                {feature.text}
              </p>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
