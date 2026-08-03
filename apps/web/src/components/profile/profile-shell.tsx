"use client";

import { useEffect, useState } from "react";
import { ProfileHeader } from "@/components/profile/profile-header";
import { ProfilePlatforms } from "@/components/profile/profile-platforms";
import { ProfilePreferences } from "@/components/profile/profile-preferences";
import { ProfileRecentActivity } from "@/components/profile/profile-recent-activity";
import { ProfileSavedItems } from "@/components/profile/profile-saved-items";
import { ProfileSettings } from "@/components/profile/profile-settings";
import { ProfileStats } from "@/components/profile/profile-stats";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useProfilePreferences } from "@/hooks/use-profile-preferences";
import { useProfileState } from "@/hooks/use-profile-state";
import { getProfileStats } from "@/lib/profile/get-profile-stats";
import type { ProfileIdentityInput } from "@/lib/profile/profile.types";

const emptyIdentity: ProfileIdentityInput = { displayName: "", username: "", bio: "" };

export function ProfileShell() {
  const { profile, updateProfile, toggleConnection } = useProfileState();
  const [editing, setEditing] = useState(false);
  const [identity, setIdentity] = useState<ProfileIdentityInput>(emptyIdentity);
  const [nameError, setNameError] = useState<string>();
  const preferences = useProfilePreferences(profile ?? { favoritePlatforms: [], preferredGenres: [], preferredPlayStyles: [] }, updateProfile);

  useEffect(() => {
    if (profile) setIdentity({ displayName: profile.displayName, username: profile.username, bio: profile.bio });
  }, [profile]);

  if (!profile) return <div className="py-12 text-sm text-(--ink-muted)">Preparando seu perfil…</div>;

  function saveIdentity() {
    const displayName = identity.displayName.trim();
    if (!displayName) { setNameError("Escolha um nome para o seu perfil."); return; }
    updateProfile({ ...identity, displayName, username: identity.username.trim() || "@jogador", bio: identity.bio.trim() });
    setEditing(false);
  }

  return <>
    <ProfileHeader profile={profile} onEdit={() => setEditing(true)} />
    <div className="mt-10"><ProfileStats items={getProfileStats(profile)} /></div>
    <div className="mt-16 grid gap-16 lg:grid-cols-[1.08fr_.92fr] lg:items-start"><ProfileRecentActivity games={profile.recentGames} /><ProfilePlatforms platforms={profile.connectedPlatforms} onToggle={toggleConnection} /></div>
    <div className="mt-16"><ProfilePreferences profile={profile} onTogglePlatform={preferences.togglePlatform} onToggleGenre={preferences.toggleGenre} onTogglePlayStyle={preferences.togglePlayStyle} /></div>
    <div className="mt-16"><ProfileSavedItems collections={profile.savedCollections} /></div>
    <div className="mt-16"><ProfileSettings settings={profile.settings} onChange={(settings) => updateProfile({ settings: { ...profile.settings, ...settings } })} /></div>
    <Dialog open={editing} onClose={() => setEditing(false)} title="Editar perfil" description="Atualize como o Backbit apresenta seu espaço.">
      <form className="space-y-5" onSubmit={(event) => { event.preventDefault(); saveIdentity(); }}>
        <Input id="profile-display-name" label="Nome ou apelido" value={identity.displayName} error={nameError} onChange={(event) => { setNameError(undefined); setIdentity({ ...identity, displayName: event.target.value }); }} required />
        <Input id="profile-username" label="Usuário" value={identity.username} hint="Use um identificador curto, como @seu.nome." onChange={(event) => setIdentity({ ...identity, username: event.target.value })} />
        <div><label htmlFor="profile-bio" className="text-sm font-semibold text-(--ink)">Bio</label><textarea id="profile-bio" value={identity.bio} onChange={(event) => setIdentity({ ...identity, bio: event.target.value })} maxLength={180} rows={4} className="mt-2 w-full rounded-xl border border-(--line) bg-(--surface) px-4 py-3 text-sm leading-6 outline-none transition-colors focus:border-(--accent) focus:ring-2 focus:ring-(--accent)/20" /></div>
        <div className="flex justify-end gap-3 pt-2"><Button type="button" variant="secondary" onClick={() => setEditing(false)}>Cancelar</Button><Button type="submit">Salvar perfil</Button></div>
      </form>
    </Dialog>
  </>;
}
