import Link from "next/link";
import { Compass, House, LayoutGrid, UserRound, type LucideIcon } from "lucide-react";

type NavigationItem = {
  label: string;
  icon: LucideIcon;
  href?: string;
  active: boolean;
};

const navigationItems: readonly NavigationItem[] = [
  { label: "Início", icon: House, href: "/app", active: true },
  { label: "Board", icon: LayoutGrid, active: false },
  { label: "Descobrir", icon: Compass, active: false },
  { label: "Perfil", icon: UserRound, active: false },
] as const;

export function AppNavigation() {
  return (
    <nav aria-label="Navegação do aplicativo" className="fixed inset-x-0 bottom-0 z-20 border-t border-(--line) bg-(--surface)/95 pb-[env(safe-area-inset-bottom)] backdrop-blur">
      <ul className="mx-auto grid max-w-md grid-cols-4 px-2">
        {navigationItems.map(({ label, icon: Icon, href, active }) => (
          <li key={label}>
            {active && href ? (
              <Link href={href} aria-current="page" className="flex min-h-16 flex-col items-center justify-center gap-1 text-xs font-semibold text-(--ink)">
                <Icon aria-hidden="true" size={18} strokeWidth={1.8} />
                {label}
              </Link>
            ) : (
              <span aria-disabled="true" className="flex min-h-16 flex-col items-center justify-center gap-1 text-xs text-(--ink-muted)">
                <Icon aria-hidden="true" size={18} strokeWidth={1.6} />
                {label}
              </span>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
