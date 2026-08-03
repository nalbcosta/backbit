import { Chip } from "@/components/ui/chip";
import { SectionHeading } from "@/components/ui/section-heading";
import type { ProfileData } from "@/lib/profile/profile.types";

type ProfilePreferencesProps = {
  profile: ProfileData;
  onTogglePlatform: (value: string) => void;
  onToggleGenre: (value: string) => void;
  onTogglePlayStyle: (value: string) => void;
};

const platformOptions = ["PC", "PlayStation", "Xbox", "Nintendo Switch", "Steam Deck", "Mobile"];
const genreOptions = ["Narrativo", "Aventura", "RPG", "Puzzle", "Terror", "Indie"];
const playStyleOptions = ["Sem pressa", "Sessões curtas", "Exploração", "Com amigos"];

function PreferenceGroup({ label, options, selected, onToggle }: { label: string; options: readonly string[]; selected: readonly string[]; onToggle: (value: string) => void }) {
  return <div><h3 className="text-sm font-semibold">{label}</h3><div className="mt-3 flex flex-wrap gap-2">{options.map((option) => <Chip key={option} selected={selected.includes(option)} onClick={() => onToggle(option)}>{option}</Chip>)}</div></div>;
}

export function ProfilePreferences(props: ProfilePreferencesProps) {
  return (
    <section aria-labelledby="profile-preferences-title">
      <SectionHeading eyebrow="Seu jeito de jogar" title="O que te move." description="Ajuste o que o Backbit usa para deixar seu espaço mais seu." />
      <div id="profile-preferences-title" className="mt-8 space-y-7">
        <PreferenceGroup label="Plataformas favoritas" options={platformOptions} selected={props.profile.favoritePlatforms} onToggle={props.onTogglePlatform} />
        <PreferenceGroup label="Gêneros" options={genreOptions} selected={props.profile.preferredGenres} onToggle={props.onToggleGenre} />
        <PreferenceGroup label="Ritmo e estilo" options={playStyleOptions} selected={props.profile.preferredPlayStyles} onToggle={props.onTogglePlayStyle} />
      </div>
    </section>
  );
}
