import { Container } from "@/components/ui/container";
import { KanbanBoard, type KanbanColumn } from "@/components/ui/kanban";
import { SectionHeading } from "@/components/ui/section-heading";

const columns: readonly KanbanColumn[] = [
  {
    id: "queue",
    label: "Na fila",
    description: "O que vem depois",
    items: [
      {
        id: "salt-road",
        title: "A estrada de sal",
        meta: "12–16 horas",
        note: "Para uma semana calma.",
      },
      {
        id: "survival-manual",
        title: "Manual de sobrevivência",
        meta: "Indie · puzzle",
        note: "Voltar quando sobrar foco.",
      },
    ],
  },
  {
    id: "playing",
    label: "Jogando",
    description: "Seu momento atual",
    items: [
      {
        id: "rain-city",
        title: "A cidade que chove",
        meta: "6h 18m · Sessão 4",
        note: "Ainda pensando naquele final.",
      },
    ],
  },
  {
    id: "finished",
    label: "Terminados",
    description: "O que ficou",
    items: [
      {
        id: "after-winter",
        title: "Depois do inverno",
        meta: "Nota 4,5",
        note: "Pequeno, estranho, inesquecível.",
      },
    ],
  },
];

export function BoardPreview() {
  return (
    <section className="section">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:items-start">
          <SectionHeading
            eyebrow="Seu ritmo"
            title="Veja o que está em jogo."
            description="Um board claro para o seu backlog não virar uma pilha de intenções."
          />
          <KanbanBoard columns={columns} />
        </div>
      </Container>
    </section>
  );
}
