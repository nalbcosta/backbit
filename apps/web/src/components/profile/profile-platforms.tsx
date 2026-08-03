import { Link2, Unlink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { SectionHeading } from "@/components/ui/section-heading";
import type { ProfilePlatform } from "@/lib/profile/profile.types";

export function ProfilePlatforms({ platforms, onToggle }: { platforms: readonly ProfilePlatform[]; onToggle: (id: string) => void }) {
  const hasPlatforms = platforms.length > 0;
  return <section aria-labelledby="profile-platforms-title"><SectionHeading eyebrow="Suas plataformas" title="Onde você joga." />
    <div id="profile-platforms-title" className="mt-8 space-y-3">{hasPlatforms ? platforms.map((platform) => <Card key={platform.id} className="flex items-center justify-between gap-4 rounded-2xl p-4"><div><p className="font-semibold">{platform.label}</p><p className="mt-1 text-sm text-(--ink-muted)">{platform.connected ? platform.accountLabel ?? "Conectada" : "Ainda não conectada"}</p></div><Button variant="secondary" className="min-h-11 px-4" onClick={() => onToggle(platform.id)}>{platform.connected ? <><Unlink aria-hidden="true" size={16} /> <span className="ml-2">Desconectar</span></> : <><Link2 aria-hidden="true" size={16} /> <span className="ml-2">Conectar</span></>}</Button></Card>) : <EmptyState title="Nenhuma plataforma disponível" description="Quando houver uma integração, ela aparece aqui." />}</div>
  </section>;
}
