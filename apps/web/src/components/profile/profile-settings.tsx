import { Bell, LockKeyhole } from "lucide-react";
import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/section-heading";
import type { ProfileSettings } from "@/lib/profile/profile.types";

type SettingRowProps = { label: string; description: string; checked: boolean; icon: typeof Bell; onChange: () => void };
function SettingRow({ label, description, checked, icon: Icon, onChange }: SettingRowProps) {
  return <Card className="flex items-center gap-4 rounded-2xl p-4"><Icon aria-hidden="true" size={20} className="shrink-0 text-(--ink-muted)" /><div className="min-w-0 flex-1"><h3 className="font-semibold">{label}</h3><p className="mt-1 text-sm leading-5 text-(--ink-muted)">{description}</p></div><button type="button" role="switch" aria-checked={checked} aria-label={label} onClick={onChange} className={`relative h-7 w-12 shrink-0 rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--accent) ${checked ? "bg-(--action-bg)" : "bg-(--surface-muted)"}`}><span className={`absolute top-1 size-5 rounded-full bg-(--surface) transition-transform ${checked ? "translate-x-6" : "translate-x-1"}`} /></button></Card>;
}
export function ProfileSettings({ settings, onChange }: { settings: ProfileSettings; onChange: (update: Partial<ProfileSettings>) => void }) {
  return <section aria-labelledby="profile-settings-title"><SectionHeading eyebrow="Conta" title="Do seu jeito." />
    <div id="profile-settings-title" className="mt-8 space-y-3"><SettingRow label="Lembrete semanal" description="Uma pausa curta para olhar o que está em jogo." checked={settings.weeklyReminder} icon={Bell} onChange={() => onChange({ weeklyReminder: !settings.weeklyReminder })} /><SettingRow label="Perfil privado" description="Suas escolhas ficam apenas no seu espaço." checked={settings.privateProfile} icon={LockKeyhole} onChange={() => onChange({ privateProfile: !settings.privateProfile })} /></div>
  </section>;
}
