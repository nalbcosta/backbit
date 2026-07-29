"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

import { PasswordVisibilityToggle } from "@/components/auth/password-visibility-toggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function LoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!event.currentTarget.reportValidity()) return;
    router.push("/onboarding");
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-5">
      <Input id="email" name="email" type="email" autoComplete="email" label="E-mail" placeholder="voce@email.com" required />
      <div>
        <Input
          id="password"
          name="password"
          type={showPassword ? "text" : "password"}
          autoComplete="current-password"
          label="Senha"
          placeholder="Sua senha"
          required
          trailingAction={
            <PasswordVisibilityToggle
              isVisible={showPassword}
              onToggle={() => setShowPassword((visible) => !visible)}
            />
          }
        />
        <p className="mt-2 text-right text-xs text-(--ink-muted)">
          <a href="/forgot-password" className="underline underline-offset-4 hover:text-(--ink)">
            Esqueceu a senha?
          </a>
        </p>
      </div>
      <Button type="submit" fullWidth>Entrar no Backbit</Button>
      <p className="text-center text-sm leading-6 text-(--ink-muted)">
        Ainda não tem conta?{" "}
        <a href="/register" className="font-semibold text-(--ink) underline underline-offset-4 hover:text-(--accent)">
          Criar conta
        </a>
      </p>
    </form>
  );
}
