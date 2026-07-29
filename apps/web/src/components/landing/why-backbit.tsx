import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
const reasons = [
  "Feito para uma mão e uma pausa curta.",
  "Seu histórico é seu, não só mais uma lista.",
  "Contexto antes de recomendação.",
];
export function WhyBackbit() {
  return (
    <section className="section">
      <Container className="grid gap-10 lg:grid-cols-2">
        <SectionHeading
          eyebrow="Por que Backbit?"
          title="Para quem leva seus jogos a sério — sem tornar isso um trabalho."
        />
        <ul className="divide-y divide-(--line) border-y border-(--line)">
          {reasons.map((reason, index) => (
            <li key={reason} className="flex gap-5 py-5">
              <span className="eyebrow pt-1">0{index + 1}</span>
              <p className="display text-2xl leading-tight sm:text-3xl">
                {reason}
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
