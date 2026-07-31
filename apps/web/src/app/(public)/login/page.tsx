import Link from "next/link";
import { LoginForm } from "@/components/auth/login-form";
import { LoginHero } from "@/components/auth/login-hero";
import { APP_NAME } from "@/config/app";

export default function LoginPage() {
  return (
    <main className="min-h-dvh lg:grid lg:h-dvh lg:grid-cols-[1.05fr_.95fr] lg:overflow-hidden">
      <LoginHero />
      <section className="flex min-h-dvh items-center px-5 py-10 sm:px-8 lg:min-h-0 lg:overflow-y-auto lg:px-16">
        <div className="mx-auto w-full max-w-sm">
          <Link href="/" className="text-sm font-bold tracking-[-.04em]">{APP_NAME}</Link>
          <div className="mt-10 sm:mt-12 xl:mt-14">
            <p className="eyebrow">Acessar sua conta</p>
            <h2 className="display mt-4 text-4xl leading-[.95] lg:text-[2.5rem] xl:text-5xl">Seu próximo jogo está aqui.</h2>
            <p className="mt-4 text-sm leading-6 text-(--ink-muted)">Entre para retomar seu ritmo, sem perder o fio do que está jogando.</p>
          </div>
          <div className="mt-8"><LoginForm /></div>
          <p className="mt-8 text-xs leading-5 text-(--ink-muted)">Backbit é um lugar pessoal para organizar jogos, sessões e memórias de jogo.</p>
        </div>
      </section>
    </main>
  );
}
