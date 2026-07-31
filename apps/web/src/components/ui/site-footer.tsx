import Link from "next/link";
import { ArrowUp } from "lucide-react";

import { Container } from "@/components/ui/container";
import { APP_NAME, APP_TAGLINE } from "@/config/app";
import type { SiteHeaderLink } from "@/components/ui/site-header";

type SiteFooterProps = {
  logoHref: string;
  links: readonly SiteHeaderLink[];
  backToTopHref: string;
  backToTopLabel?: string;
  navigationLabel?: string;
};

export function SiteFooter({
  logoHref,
  links,
  backToTopHref,
  backToTopLabel = "Voltar ao topo",
  navigationLabel = "Links do rodapé",
}: SiteFooterProps) {
  return (
    <footer className="border-t border-(--line) py-8">
      <Container>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <Link href={logoHref} className="text-sm font-semibold tracking-[-.02em] text-(--ink)">
              {APP_NAME}
            </Link>
            <p className="mt-2 max-w-xs text-xs leading-5 text-(--ink-muted)">
              {APP_TAGLINE}
            </p>
          </div>
          <nav
            aria-label={navigationLabel}
            className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-(--ink-muted)"
          >
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={link.current ? "page" : undefined}
                className="hover:text-(--ink)"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="mt-8 flex items-center justify-between border-t border-(--line) pt-4 text-xs text-(--ink-muted)">
          <span>© {new Date().getFullYear()} {APP_NAME}</span>
          <Link href={backToTopHref} className="inline-flex items-center gap-1 hover:text-(--ink)">
            {backToTopLabel} <ArrowUp aria-hidden="true" size={13} />
          </Link>
        </div>
      </Container>
    </footer>
  );
}
