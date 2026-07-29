import { Compass } from "lucide-react";
import { APP_NAME } from "@/config/app";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export function DiscoverHeader() {
  return <header className="sticky top-0 z-30 border-b border-(--line) bg-(--canvas)/95 backdrop-blur"><Container className="flex min-h-16 items-center justify-between gap-3"><a href="/" className="text-sm font-bold tracking-[-.04em]">{APP_NAME}</a><nav aria-label="Navegação da descoberta" className="hidden items-center gap-5 text-sm text-(--ink-muted) sm:flex"><a href="/discover" aria-current="page" className="font-semibold text-(--ink)">Descobrir</a><a href="/register" className="hover:text-(--ink)">Criar conta</a></nav><div className="flex items-center gap-2"><ThemeToggle /><Button href="/register" className="min-h-10 px-4 text-xs"><Compass aria-hidden="true" size={14} /> Começar</Button></div></Container></header>;
}
