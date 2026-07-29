import { RegisterForm } from "@/components/auth/register-form";
import { RegisterHero } from "@/components/auth/register-hero";
import { APP_NAME } from "@/config/app";

export default function RegisterPage() {
  return (
    <main className="min-h-dvh lg:grid lg:h-dvh lg:grid-cols-[1.05fr_.95fr] lg:overflow-hidden">
      <RegisterHero />
      <section className="flex min-h-dvh items-center px-5 py-10 sm:px-8 lg:min-h-0 lg:overflow-y-auto lg:px-16">
        <div className="mx-auto w-full max-w-sm">
          <a href="/" className="text-sm font-bold tracking-[-.04em]">
            {APP_NAME}
          </a>
          <div className="mt-10 sm:mt-12 xl:mt-14">
            <p className="eyebrow">Criar sua conta</p>
            <h2 className="display mt-4 text-4xl leading-[.95] lg:text-[2.5rem] xl:text-5xl">
              Seu backlog, do seu jeito.
            </h2>
            <p className="mt-4 text-sm leading-6 text-(--ink-muted)">
              Comece a acompanhar jogos, sessões, reviews e a próxima escolha com mais contexto.
            </p>
          </div>
          <div className="mt-8">
            <RegisterForm />
          </div>
          <p className="mt-8 text-xs leading-5 text-(--ink-muted)">
            Você pode ajustar seu perfil e organizar sua lista no seu próprio ritmo.
          </p>
        </div>
      </section>
    </main>
  );
}
