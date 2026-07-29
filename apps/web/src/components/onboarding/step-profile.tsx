import { Input } from "@/components/ui/input";

type StepProfileProps = { nickname: string; error?: string; onNicknameChange: (nickname: string) => void; onContinue: () => void };

export function StepProfile({ nickname, error, onNicknameChange, onContinue }: StepProfileProps) {
  return <section aria-labelledby="onboarding-profile-title"><p className="eyebrow">Seu perfil</p><h1 id="onboarding-profile-title" className="display mt-4 text-4xl leading-[.95] sm:text-5xl">Como você quer ser chamado?</h1><p className="mt-4 max-w-md text-sm leading-6 text-(--ink-muted)">É assim que o Backbit vai falar com você por aqui.</p><form id="onboarding-profile-form" className="mt-10 max-w-md" onSubmit={(event) => { event.preventDefault(); onContinue(); }}><Input id="onboarding-nickname" name="nickname" label="Nome ou apelido" value={nickname} onChange={(event) => onNicknameChange(event.target.value)} autoComplete="nickname" placeholder="Seu nome" error={error} required autoFocus /></form></section>;
}
