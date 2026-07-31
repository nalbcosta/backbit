import { Card } from "@/components/ui/card";

type GoalOption = { value: string; title: string; description: string };
type StepGoalProps = {
  selectedGoal: string | null;
  onSelectGoal: (goal: string) => void;
};
const goals: readonly GoalOption[] = [
  {
    value: "organize-backlog",
    title: "Organizar meu backlog",
    description: "Ter clareza sobre o que ainda quero jogar.",
  },
  {
    value: "follow-playing",
    title: "Acompanhar o que jogo",
    description: "Não perder o fio das minhas partidas.",
  },
  {
    value: "keep-memories",
    title: "Guardar impressões",
    description: "Registrar sessões, notas e o que cada jogo deixou.",
  },
  {
    value: "choose-next",
    title: "Decidir o próximo",
    description: "Sair da dúvida quando for hora de começar algo novo.",
  },
];
export function StepGoal({ selectedGoal, onSelectGoal }: StepGoalProps) {
  return (
    <section aria-labelledby="onboarding-goal-title">
      <p className="eyebrow">Seu ponto de partida</p>
      <h1
        id="onboarding-goal-title"
        className="display mt-4 text-4xl leading-[.95] sm:text-5xl"
      >
        O que você quer resolver primeiro?
      </h1>
      <p className="mt-4 max-w-md text-sm leading-6 text-(--ink-muted)">
        Escolha a intenção que mais importa agora.
      </p>
      <fieldset className="mt-10">
        <legend className="sr-only">Objetivo principal</legend>
        <div className="grid gap-3 sm:grid-cols-2">
          {goals.map((goal) => (
            <button
              key={goal.value}
              type="button"
              aria-pressed={selectedGoal === goal.value}
              onClick={() => onSelectGoal(goal.value)}
              className="text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--accent)"
            >
              <Card
                className={`h-full p-5 transition-colors ${selectedGoal === goal.value ? "border-(--action-bg) bg-(--surface-muted)" : "hover:border-(--ink)"}`}
              >
                <h2 className="text-sm font-semibold">{goal.title}</h2>
                <p className="mt-2 text-sm leading-6 text-(--ink-muted)">
                  {goal.description}
                </p>
              </Card>
            </button>
          ))}
        </div>
      </fieldset>
    </section>
  );
}
