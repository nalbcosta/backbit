import Link from "next/link";
import { NotificationCenter } from "@/components/notifications/notification-center";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { APP_NAME } from "@/config/app";

export function AppHeader() {
  return (
    <header className="sticky top-0 z-10 border-b border-(--line) bg-(--canvas)/95 backdrop-blur">
      <div className="mx-auto flex min-h-16 w-full max-w-6xl items-center justify-between px-5 sm:px-8">
        <Link href="/app" className="text-sm font-bold tracking-[-.04em]">{APP_NAME}</Link>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <NotificationCenter />
        </div>
      </div>
    </header>
  );
}
