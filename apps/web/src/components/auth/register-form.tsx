"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState, type FormEvent } from "react";

import { PasswordVisibilityToggle } from "@/components/auth/password-visibility-toggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function RegisterForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const confirmationField = event.currentTarget.elements.namedItem("confirmPassword");

    if (!(confirmationField instanceof HTMLInputElement)) return;

    confirmationField.setCustomValidity(
      password === confirmPassword ? "" : "As senhas precisam ser iguais.",
    );

    if (!event.currentTarget.reportValidity()) return;
    router.push("/onboarding");
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-5">
      <Input
        id="name"
        name="name"
        autoComplete="name"
        label="Como você quer ser chamado?"
        placeholder="Seu nome"
        required
      />
      <Input
        id="email"
        name="email"
        type="email"
        autoComplete="email"
        label="E-mail"
        placeholder="voce@email.com"
        required
      />
      <Input
        id="password"
        name="password"
        type={showPassword ? "text" : "password"}
        autoComplete="new-password"
        label="Senha"
        placeholder="Pelo menos 8 caracteres"
        minLength={8}
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        required
        trailingAction={
          <PasswordVisibilityToggle
            isVisible={showPassword}
            onToggle={() => setShowPassword((visible) => !visible)}
          />
        }
      />
      <Input
        id="confirm-password"
        name="confirmPassword"
        type={showConfirmation ? "text" : "password"}
        autoComplete="new-password"
        label="Confirme a senha"
        placeholder="Repita sua senha"
        minLength={8}
        value={confirmPassword}
        onChange={(event) => {
          event.currentTarget.setCustomValidity("");
          setConfirmPassword(event.target.value);
        }}
        required
        trailingAction={
          <PasswordVisibilityToggle
            isVisible={showConfirmation}
            onToggle={() => setShowConfirmation((visible) => !visible)}
          />
        }
      />
      <Button type="submit" fullWidth>
        Criar minha conta
      </Button>
      <p className="text-center text-sm leading-6 text-(--ink-muted)">
        Já tem conta?{" "}
        <Link href="/login" className="font-semibold text-(--ink) underline underline-offset-4 hover:text-(--accent)">
          Entrar
        </Link>
      </p>
    </form>
  );
}
