"use client";

import { useRouter } from "next/navigation";
import type { FormEvent } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function LoginForm() {
  const router = useRouter();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!event.currentTarget.reportValidity()) return;
    router.push("/app");
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-5">
      <Input id="email" name="email" type="email" autoComplete="email" label="E-mail" placeholder="voce@email.com" required />
      <div>
        <Input id="password" name="password" type="password" autoComplete="current-password" label="Senha" placeholder="Sua senha" required />
        <p className="mt-2 text-right text-xs text-(--ink-muted)">Recuperação de senha em breve.</p>
      </div>
      <Button type="submit" fullWidth>Entrar no Backbit</Button>
      <p className="text-center text-sm leading-6 text-(--ink-muted)">Ainda não tem conta? Cadastro em breve.</p>
    </form>
  );
}
