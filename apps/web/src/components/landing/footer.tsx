import { ArrowUp } from "lucide-react";

import { APP_NAME, APP_TAGLINE } from "@/config/app";
import { Container } from "@/components/ui/container";

export function Footer() {
  return (
    <footer className="border-t border-(--line) py-8">
      <Container>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <a href="#inicio" className="text-sm font-semibold tracking-[-.02em] text-(--ink)">
              {APP_NAME}
            </a>
            <p className="mt-2 max-w-xs text-xs leading-5 text-(--ink-muted)">{APP_TAGLINE}</p>
          </div>
          <nav aria-label="Links do rodapé" className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-(--ink-muted)">
            <a className="hover:text-(--ink)" href="#como-funciona">Como funciona</a>
            <a className="hover:text-(--ink)" href="#descobrir">Descobrir</a>
            <a className="hover:text-(--ink)" href="#waitlist">Lista de espera</a>
          </nav>
        </div>
        <div className="mt-8 flex items-center justify-between border-t border-(--line) pt-4 text-xs text-(--ink-muted)">
          <span>© {new Date().getFullYear()} {APP_NAME}</span>
          <a href="#inicio" className="inline-flex items-center gap-1 hover:text-(--ink)">
            Voltar ao topo <ArrowUp aria-hidden="true" size={13} />
          </a>
        </div>
      </Container>
    </footer>
  );
}
