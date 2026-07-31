import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { APP_NAME } from "@/config/app";

export function Header() {
  return (
    <header className="landing-header border-b border-(--line)">
      <Container className="flex min-h-18 items-center justify-between gap-3">
        <a href="#inicio" className="text-sm font-bold tracking-[-.04em]">
          {APP_NAME}
        </a>
        <nav
          aria-label="Navegação principal"
          className="hidden gap-6 text-sm text-(--ink-muted) md:flex"
        >
          <a className="hover:text-(--ink)" href="#como-funciona">
            Como funciona
          </a>
          <a className="hover:text-(--ink)" href="/discover">
            Descobrir
          </a>
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button href="/login" className="min-h-10 px-4 text-xs">
            Entrar
          </Button>
        </div>
      </Container>
    </header>
  );
}
