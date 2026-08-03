import { Pencil } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import type { ProfileData } from "@/lib/profile/profile.types";

type ProfileHeaderProps = { profile: ProfileData; onEdit: () => void };

export function ProfileHeader({ profile, onEdit }: ProfileHeaderProps) {
  return (
    <section aria-labelledby="profile-title" className="border-b border-(--line) pb-10">
      <p className="eyebrow">Seu perfil</p>
      <div className="mt-5 flex items-start gap-4 sm:items-center">
        <Avatar name={profile.displayName} src={profile.avatarUrl} className="size-20 text-3xl sm:size-24" />
        <div className="min-w-0 flex-1">
          <h1 id="profile-title" className="display text-4xl leading-[.9] sm:text-5xl">{profile.displayName}</h1>
          <p className="mt-2 text-sm text-(--ink-muted)">{profile.username}</p>
        </div>
        <Button variant="secondary" className="min-h-11 shrink-0 px-4" onClick={onEdit}>
          <Pencil aria-hidden="true" size={16} /> <span className="sr-only sm:not-sr-only sm:ml-2">Editar</span>
        </Button>
      </div>
      <p className="mt-6 max-w-xl text-base leading-7 text-(--ink-muted)">{profile.bio}</p>
    </section>
  );
}
