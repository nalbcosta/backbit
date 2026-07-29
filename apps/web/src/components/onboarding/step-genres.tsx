import { Chip } from "@/components/ui/chip";

type StepGenresProps = { genres: readonly string[]; playStyles: readonly string[]; onToggleGenre: (genre: string) => void; onTogglePlayStyle: (style: string) => void };
const genres = ["Aventura", "RPG", "Ação", "Estratégia", "Puzzle", "Terror", "Corrida", "Indie"];
const playStyles = ["Narrativo", "Exploração", "Competitivo", "Cooperativo", "Relaxado", "Desafiador"];
export function StepGenres({ genres: selectedGenres, playStyles: selectedPlayStyles, onToggleGenre, onTogglePlayStyle }: StepGenresProps) {
  return <section aria-labelledby="onboarding-genres-title"><p className="eyebrow">Seu gosto</p><h1 id="onboarding-genres-title" className="display mt-4 text-4xl leading-[.95] sm:text-5xl">O que costuma prender sua atenção?</h1><p className="mt-4 max-w-md text-sm leading-6 text-(--ink-muted)">Não precisa ser exato. Escolha o que volta para a sua lista.</p><div className="mt-10 space-y-8"><fieldset><legend className="text-sm font-semibold">Gêneros</legend><div className="mt-3 flex flex-wrap gap-3">{genres.map((genre) => <Chip key={genre} selected={selectedGenres.includes(genre)} onClick={() => onToggleGenre(genre)}>{genre}</Chip>)}</div></fieldset><fieldset><legend className="text-sm font-semibold">Estilos de jogo</legend><div className="mt-3 flex flex-wrap gap-3">{playStyles.map((style) => <Chip key={style} selected={selectedPlayStyles.includes(style)} onClick={() => onTogglePlayStyle(style)}>{style}</Chip>)}</div></fieldset></div></section>;
}
