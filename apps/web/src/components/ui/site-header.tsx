import type { ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { APP_NAME } from "@/config/app";

export type SiteHeaderLink = {
  href: string;
  label: string;
  current?: boolean;
};

type SiteHeaderProps = {
  logoHref: string;
  links: readonly SiteHeaderLink[];
  navigationLabel: string;
  action: {
    href: string;
    label: string;
    icon?: ReactNode;
  };
  className?: string;
  containerClassName?: string;
  navigationClassName?: string;
};

export function SiteHeader({
  logoHref,
  links,
  navigationLabel,
  action,
  className = "",
  containerClassName = "min-h-16",
  navigationClassName = "hidden items-center gap-5 text-sm text-(--ink-muted) sm:flex",
}: SiteHeaderProps) {
  return (
    <header className={`border-b border-(--line) ${className}`}>
      <Container className={`flex items-center justify-between gap-3 ${containerClassName}`}>
        <a href={logoHref} className="text-sm font-bold tracking-[-.04em]">
          {APP_NAME}
        </a>
        <nav aria-label={navigationLabel} className={navigationClassName}>
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              aria-current={link.current ? "page" : undefined}
              className={link.current ? "font-semibold text-(--ink)" : "hover:text-(--ink)"}
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button href={action.href} className="min-h-10 gap-2 px-4 text-xs">
            {action.icon}
            {action.label}
          </Button>
        </div>
      </Container>
    </header>
  );
}
