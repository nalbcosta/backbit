"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Compass,
  House,
  LayoutGrid,
  UserRound,
  type LucideIcon,
} from "lucide-react";

type NavigationItem = {
  label: string;
  icon: LucideIcon;
  href?: string;
};

const navigationItems: readonly NavigationItem[] = [
  { label: "Início", icon: House, href: "/app" },
  { label: "Board", icon: LayoutGrid, href: "/board" },
  { label: "Descobrir", icon: Compass, href: "/app/discover" },
  { label: "Perfil", icon: UserRound, href: "/profile" },
] as const;

export function AppNavigation() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Navegação do aplicativo"
      className="fixed inset-x-0 bottom-0 z-20 border-t border-(--line) bg-(--surface)/95 pb-[env(safe-area-inset-bottom)] backdrop-blur"
    >
      <ul className="mx-auto grid max-w-md grid-cols-4 px-2">
        {navigationItems.map(({ label, icon: Icon, href }) => {
          const active = href === pathname;

          return (
            <li key={label}>
              {href ? (
                <Link
                  href={href}
                  aria-current={active ? "page" : undefined}
                  className={`flex min-h-16 flex-col items-center justify-center gap-1 text-xs transition-colors focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-(--accent) ${active ? "font-semibold text-(--ink)" : "text-(--ink-muted) hover:text-(--ink)"}`}
                >
                  <Icon
                    aria-hidden="true"
                    size={18}
                    strokeWidth={active ? 1.8 : 1.6}
                  />
                  {label}
                </Link>
              ) : (
                <span
                  aria-disabled="true"
                  className="flex min-h-16 flex-col items-center justify-center gap-1 text-xs text-(--ink-muted)"
                >
                  <Icon aria-hidden="true" size={18} strokeWidth={1.6} />
                  {label}
                </span>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
