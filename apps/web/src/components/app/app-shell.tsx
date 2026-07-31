import type { ReactNode } from "react";

import { AppHeader } from "@/components/app/app-header";
import { AppNavigation } from "@/components/app/app-navigation";

type AppShellProps = { children: ReactNode };

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-dvh">
      <AppHeader />
      <main className="mx-auto w-full max-w-6xl px-5 pb-28 pt-9 sm:px-8 sm:pt-12">{children}</main>
      <AppNavigation />
    </div>
  );
}
