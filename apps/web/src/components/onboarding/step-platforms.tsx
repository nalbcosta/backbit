import { Chip } from "@/components/ui/chip";
import { Gamepad2, Laptop, Monitor, Smartphone } from "lucide-react";

type StepPlatformsProps = {
  selected: readonly string[];
  onToggle: (platform: string) => void;
};
const platforms = [
  { label: "PC", icon: Monitor },
  { label: "PlayStation", icon: Gamepad2 },
  { label: "Xbox", icon: Gamepad2 },
  { label: "Nintendo Switch", icon: Gamepad2 },
  { label: "Steam Deck", icon: Laptop },
  { label: "Mobile", icon: Smartphone },
] as const;
export function StepPlatforms({ selected, onToggle }: StepPlatformsProps) {
  return (
    <section aria-labelledby="onboarding-platforms-title">
      <p className="eyebrow">Seu jeito de jogar</p>
      <h1
        id="onboarding-platforms-title"
        className="display mt-4 text-4xl leading-[.95] sm:text-5xl"
      >
        Onde seus jogos acontecem?
      </h1>
      <p className="mt-4 max-w-md text-sm leading-6 text-(--ink-muted)">
        Escolha todas as plataformas que fazem parte do seu ritmo.
      </p>
      <fieldset className="mt-10">
        <legend className="sr-only">Plataformas preferidas</legend>
        <div className="grid grid-cols-2 gap-3 sm:flex sm:flex-wrap">
          {platforms.map(({ label, icon: Icon }) => (
            <Chip
              key={label}
              className="gap-2 sm:w-auto"
              selected={selected.includes(label)}
              onClick={() => onToggle(label)}
            >
              <Icon aria-hidden="true" size={17} strokeWidth={1.8} />
              {label}
            </Chip>
          ))}
        </div>
      </fieldset>
    </section>
  );
}
