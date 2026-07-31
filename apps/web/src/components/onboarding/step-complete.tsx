type StepCompleteProps = { nickname: string };
export function StepComplete({ nickname }: StepCompleteProps) {
  return (
    <section aria-labelledby="onboarding-complete-title">
      <p className="eyebrow">Pronto para começar</p>
      <h1
        id="onboarding-complete-title"
        className="display mt-5 max-w-xl text-5xl leading-[.9] sm:text-6xl"
      >
        Seu espaço está pronto{nickname ? `, ${nickname}` : ""}.
      </h1>
      <p className="mt-6 max-w-md text-base leading-7 text-(--ink-muted)">
        Agora você tem um lugar para guardar o que quer jogar e seguir o que
        está vivendo.
      </p>
    </section>
  );
}
