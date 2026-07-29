type StepWelcomeProps = Record<string, never>;

export function StepWelcome(_: StepWelcomeProps) {
  return <section aria-labelledby="onboarding-welcome-title">
    <p className="eyebrow">Bem-vindo ao Backbit</p>
    <h1 id="onboarding-welcome-title" className="display mt-5 max-w-xl text-5xl leading-[.9] sm:text-6xl">Vamos dar um pouco de contexto ao seu espaço.</h1>
    <p className="mt-6 max-w-md text-base leading-7 text-(--ink-muted)">Leva só alguns minutos. Você pode ajustar tudo depois.</p>
  </section>;
}
