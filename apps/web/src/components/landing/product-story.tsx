import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { TextBlock } from "@/components/ui/text-block";
import { APP_NAME } from "@/config/app";
export function ProductStory() {
  return (
    <section
      id="como-funciona"
      className="section border-y border-(--line) bg-(--surface-muted)"
    >
      <Container className="grid gap-10 lg:grid-cols-2 lg:gap-24">
        <SectionHeading
          eyebrow="Mais que uma lista"
          title="Um lugar para os jogos que importam."
        />
        <div className="space-y-5 pt-1">
          <TextBlock>
            {APP_NAME} reúne backlog, sessões, notas e reviews em um ritual simples
            de usar todos os dias.
          </TextBlock>
          <TextBlock>
            Menos abas abertas. Menos jogos esquecidos. Mais contexto quando
            chegar a hora de escolher.
          </TextBlock>
        </div>
      </Container>
    </section>
  );
}
