"use client";

import Link from "next/link";
import { Cookie } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { useCookieConsent } from "@/hooks/use-cookie-consent";

export function CookieConsent() {
  const { hasHydrated, hasChoice, saveConsent } = useCookieConsent();
  const [analyticsEnabled, setAnalyticsEnabled] = useState(false);

  if (!hasHydrated || hasChoice) return null;

  return (
    <aside
      aria-label="Preferências de cookies"
      className="fixed inset-x-3 bottom-3 z-50 mx-auto max-h-[calc(100dvh-1.5rem)] max-w-xl overflow-y-auto border border-(--line) bg-(--surface-inverse) p-4 text-(--on-surface-inverse) shadow-2xl sm:inset-x-auto sm:right-6 sm:bottom-6 sm:p-6"
    >
      <div className="flex items-start gap-3">
        <Cookie
          aria-hidden="true"
          className="mt-0.5 shrink-0 text-(--accent)"
          size={20}
        />
        <div>
          <p className="eyebrow text-(--on-surface-inverse-muted)">
            Uma escolha rápida
          </p>
          <h2 className="display mt-2 text-2xl">Cookies no seu ritmo.</h2>
          <p className="mt-2 text-sm leading-6 text-(--on-surface-inverse-muted)">
            Usamos cookies necessários para manter o Backbit funcionando. Os
            cookies opcionais ajudam a entender o uso do produto, sem guardar o
            conteúdo do seu diário.
          </p>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between gap-4 border-t border-(--line-inverse) pt-4">
        <div>
          <p className="text-sm font-semibold">Cookies opcionais</p>
          <p className="mt-1 text-xs text-(--on-surface-inverse-muted)">
            Analíticos e não essenciais
          </p>
        </div>
        <button
          type="button"
          role="switch"
          aria-checked={analyticsEnabled}
          aria-label="Permitir cookies opcionais"
          onClick={() => setAnalyticsEnabled((enabled) => !enabled)}
          className={`relative h-7 w-12 shrink-0 rounded-full border transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--accent) ${analyticsEnabled ? "border-(--accent) bg-(--accent)" : "border-(--line-inverse) bg-transparent"}`}
        >
          <span
            className={`absolute top-1 size-5 rounded-full bg-(--on-surface-inverse) transition-[left] ${analyticsEnabled ? "left-6" : "left-1"}`}
          />
        </button>
      </div>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Link
          href="/privacidade"
          className="text-xs text-(--on-surface-inverse-muted) underline underline-offset-4 hover:text-(--on-surface-inverse)"
        >
          Ler política de privacidade
        </Link>
        <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
          <Button
            variant="secondary"
            onClick={() => saveConsent(false)}
            className="min-h-10 w-full border-(--line-inverse) px-4 text-xs text-(--on-surface-inverse) hover:bg-(--on-surface-inverse) hover:text-(--surface-inverse) sm:w-auto"
          >
            Apenas necessários
          </Button>
          <Button
            onClick={() => saveConsent(analyticsEnabled)}
            className="min-h-10 w-full bg-(--on-surface-inverse) px-4 text-xs text-(--surface-inverse) hover:bg-(--accent) hover:text-(--accent-ink) sm:w-auto"
          >
            Salvar escolha
          </Button>
        </div>
      </div>
    </aside>
  );
}
