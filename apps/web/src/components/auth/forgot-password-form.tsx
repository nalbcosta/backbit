"use client";

import { MailCheck } from "lucide-react";
import Link from "next/link";
import { useState, type FormEvent } from "react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!event.currentTarget.reportValidity()) return;
    setIsSubmitted(true);
  }

  if (isSubmitted) {
    return (
      <div aria-live="polite" className="w-full max-w-sm">
        <Card className="rounded-2xl p-6">
          <span className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full bg-(--surface-muted) text-(--accent)">
            <MailCheck aria-hidden="true" size={20} strokeWidth={1.75} />
          </span>
          <h3 className="display mt-6 text-3xl leading-none">Confira seu e-mail.</h3>
          <p className="mt-4 text-sm leading-6 text-(--ink-muted)">
            Enviaremos o link de redefinição para {email}. Se ele não aparecer em alguns minutos, vale olhar o spam.
          </p>
          <Link href="/login" className="mt-7 inline-flex text-sm font-semibold text-(--ink) underline underline-offset-4 hover:text-(--accent)">
            Voltar para entrar
          </Link>
        </Card>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-5">
      <Input
        id="email"
        name="email"
        type="email"
        autoComplete="email"
        label="E-mail da sua conta"
        placeholder="voce@email.com"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        required
      />
      <Button type="submit" fullWidth>
        Enviar link de recuperação
      </Button>
      <p className="text-center text-sm leading-6 text-(--ink-muted)">
        Lembrou sua senha?{" "}
        <Link href="/login" className="font-semibold text-(--ink) underline underline-offset-4 hover:text-(--accent)">
          Voltar para entrar
        </Link>
      </p>
    </form>
  );
}
