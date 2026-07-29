import { Bell } from "lucide-react";

import { ThemeToggle } from "@/components/ui/theme-toggle";
import { APP_NAME } from "@/config/app";

export function AppHeader() {
  return (
    <header className="sticky top-0 z-10 border-b border-(--line) bg-(--canvas)/95 backdrop-blur">
      <div className="mx-auto flex min-h-16 w-full max-w-6xl items-center justify-between px-5 sm:px-8">
        <a href="/app" className="text-sm font-bold tracking-[-.04em]">{APP_NAME}</a>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button type="button" aria-label="Notificações indisponíveis nesta versão" disabled className="inline-flex min-h-10 min-w-10 items-center justify-center rounded-full border border-(--line) text-(--ink-muted) disabled:cursor-not-allowed">
            <Bell aria-hidden="true" size={17} strokeWidth={1.75} />
          </button>
        </div>
      </div>
    </header>
  );
}
