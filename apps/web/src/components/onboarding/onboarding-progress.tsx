type OnboardingProgressProps = {
  currentStep: number;
  totalSteps: number;
  onBack?: () => void;
};

export function OnboardingProgress({ currentStep, totalSteps, onBack }: OnboardingProgressProps) {
  const progress = `${(currentStep / totalSteps) * 100}%`;

  return <header aria-label={`Etapa ${currentStep} de ${totalSteps}`}>
    <div className="flex min-h-11 items-center justify-between gap-3 text-xs font-semibold uppercase tracking-[.12em] text-(--ink-muted)">
      <div className="flex min-w-0 items-center gap-2">
        {onBack ? <button type="button" onClick={onBack} aria-label="Voltar" className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-(--ink-muted) hover:bg-(--surface-muted) hover:text-(--ink) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--accent)"><ArrowLeft aria-hidden="true" size={18} strokeWidth={1.8} /></button> : null}
        <span>Seu começo</span>
      </div>
      <span className="shrink-0">{currentStep} de {totalSteps}</span>
    </div>
    <div className="mt-1 h-px bg-(--line)"><div className="h-px bg-(--ink) transition-all" style={{ width: progress }} /></div>
  </header>;
}
import { ArrowLeft } from "lucide-react";
