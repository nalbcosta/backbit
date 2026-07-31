import Link from "next/link";
import { ForgotPasswordForm } from "@/components/auth/forgot-password-form";
import { ForgotPasswordHero } from "@/components/auth/forgot-password-hero";
import { APP_NAME } from "@/config/app";

export default function ForgotPasswordPage() {
  return (
    <main className="min-h-dvh lg:grid lg:h-dvh lg:grid-cols-[1.05fr_.95fr] lg:overflow-hidden">
      <ForgotPasswordHero />
      <section className="flex min-h-dvh items-center px-5 py-10 sm:px-8 lg:min-h-0 lg:overflow-y-auto lg:px-16">
        <div className="mx-auto w-full max-w-sm">
          <Link href="/" className="text-sm font-bold tracking-[-.04em]">
            {APP_NAME}
          </Link>
          <div className="mt-10 sm:mt-12 xl:mt-14">
            <p className="eyebrow">Recuperar acesso</p>
            <h2 className="display mt-4 text-4xl leading-[.95] lg:text-[2.5rem] xl:text-5xl">
              Vamos colocar você de volta no jogo.
            </h2>
            <p className="mt-4 text-sm leading-6 text-(--ink-muted)">
              Informe o e-mail da sua conta. Enviaremos um link para criar uma nova senha.
            </p>
          </div>
          <div className="mt-8">
            <ForgotPasswordForm />
          </div>
          <p className="mt-8 text-xs leading-5 text-(--ink-muted)">
            O link pode levar alguns minutos. Se não chegar, confira a caixa de spam.
          </p>
        </div>
      </section>
    </main>
  );
}
