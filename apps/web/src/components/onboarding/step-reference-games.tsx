import type { GameCollection, OnboardingGame } from "@/components/onboarding/types";
import { Check, Plus, Search, X } from "lucide-react";

type StepReferenceGamesProps = {
  activeCollection: GameCollection;
  query: string;
  results: readonly OnboardingGame[];
  featuredGames: readonly OnboardingGame[];
  favoriteGames: readonly OnboardingGame[];
  desiredGames: readonly OnboardingGame[];
  onCollectionChange: (collection: GameCollection) => void;
  onQueryChange: (query: string) => void;
  onAddGame: (game: OnboardingGame) => void;
  onRemoveGame: (gameId: string, collection: GameCollection) => void;
};

function GameCover() {
  return <div className="art flex aspect-[3/4] w-full items-end p-3"><span className="text-[.62rem] font-semibold uppercase tracking-[.14em]">Backbit</span></div>;
}

function GameTile({ game, selected, onClick }: { game: OnboardingGame; selected: boolean; onClick: () => void }) {
  return <button type="button" onClick={onClick} className="group text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--accent)"><div className="relative overflow-hidden rounded-xl border border-(--line) bg-(--surface) transition-colors group-hover:border-(--ink)"><GameCover />{selected && <span className="absolute right-2 top-2 inline-flex h-7 w-7 items-center justify-center rounded-full bg-(--action-bg) text-(--action-fg)"><Check aria-hidden="true" size={15} /></span>}</div><p className="mt-2 truncate text-sm font-semibold">{game.title}</p>{game.releaseYear ? <p className="mt-0.5 text-xs text-(--ink-muted)">{game.releaseYear}</p> : null}</button>;
}

function SelectedGames({ games, collection, onRemove }: { games: readonly OnboardingGame[]; collection: GameCollection; onRemove: StepReferenceGamesProps["onRemoveGame"] }) {
  if (games.length === 0) return null;
  return <div className="mt-8 border-t border-(--line) pt-5"><p className="text-xs font-semibold uppercase tracking-[.12em] text-(--ink-muted)">Adicionados</p><ul className="mt-2 divide-y divide-(--line)">{games.map((game) => <li key={game.id} className="flex min-h-12 items-center justify-between gap-3 py-2"><span className="text-sm font-semibold">{game.title}{game.releaseYear ? <span className="ml-2 font-normal text-(--ink-muted)">{game.releaseYear}</span> : null}</span><button type="button" onClick={() => onRemove(game.id, collection)} aria-label={`Remover ${game.title}`} className="inline-flex min-h-10 min-w-10 items-center justify-center text-(--ink-muted) hover:text-(--ink) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--accent)"><X aria-hidden="true" size={17} /></button></li>)}</ul></div>;
}

export function StepReferenceGames({ activeCollection, query, results, featuredGames, favoriteGames, desiredGames, onCollectionChange, onQueryChange, onAddGame, onRemoveGame }: StepReferenceGamesProps) {
  const selectedGames = activeCollection === "favorite" ? favoriteGames : desiredGames;
  const selectedIds = new Set(selectedGames.map((game) => game.id));
  const hasQuery = query.trim().length > 0;

  return <section aria-labelledby="onboarding-games-title"><p className="eyebrow">Seus jogos</p><h1 id="onboarding-games-title" className="display mt-4 text-4xl leading-[.95] sm:text-5xl">O que já ficou com você?</h1><p className="mt-4 max-w-md text-sm leading-6 text-(--ink-muted)">Alguns títulos ajudam a deixar seu ponto de partida mais pessoal.</p><div className="mt-8 inline-flex w-full rounded-full border border-(--line) p-1 sm:w-auto" role="group" aria-label="Tipo de referência"><button type="button" aria-pressed={activeCollection === "favorite"} onClick={() => onCollectionChange("favorite")} className={`min-h-10 flex-1 rounded-full px-4 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--accent) sm:flex-none ${activeCollection === "favorite" ? "bg-(--action-bg) text-(--action-fg)" : "text-(--ink-muted)"}`}>Jogos que amo</button><button type="button" aria-pressed={activeCollection === "desired"} onClick={() => onCollectionChange("desired")} className={`min-h-10 flex-1 rounded-full px-4 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--accent) sm:flex-none ${activeCollection === "desired" ? "bg-(--action-bg) text-(--action-fg)" : "text-(--ink-muted)"}`}>Quero jogar</button></div><div className="relative mt-6 max-w-xl"><label htmlFor="onboarding-game-search" className="text-sm font-semibold">Buscar na biblioteca</label><div className="relative mt-2"><Search aria-hidden="true" size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-(--ink-muted)" /><input id="onboarding-game-search" value={query} onChange={(event) => onQueryChange(event.target.value)} role="combobox" aria-expanded={hasQuery} aria-controls="onboarding-game-suggestions" placeholder="Procure um jogo" autoComplete="off" className="min-h-13 w-full rounded-xl border border-(--line) bg-(--surface) py-3 pl-11 pr-4 text-sm text-(--ink) outline-none placeholder:text-(--ink-muted) focus:border-(--accent) focus:ring-2 focus:ring-(--accent)/20" /></div>{hasQuery && <div id="onboarding-game-suggestions" role="listbox" className="absolute z-10 mt-2 w-full overflow-hidden rounded-xl border border-(--line) bg-(--surface) shadow-lg">{results.length > 0 ? results.map((game) => <button key={game.id} type="button" role="option" aria-selected={selectedIds.has(game.id)} onClick={() => onAddGame(game)} className="flex min-h-15 w-full items-center gap-3 border-b border-(--line) px-3 text-left last:border-b-0 hover:bg-(--surface-muted) focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-(--accent)"><div className="art h-10 w-8 shrink-0" /><span className="min-w-0 flex-1"><span className="block truncate text-sm font-semibold">{game.title}</span>{game.releaseYear ? <span className="mt-0.5 block text-xs text-(--ink-muted)">{game.releaseYear}</span> : null}</span>{selectedIds.has(game.id) ? <Check aria-label="Já adicionado" size={17} /> : <Plus aria-hidden="true" size={17} />}</button>) : <p className="px-4 py-4 text-sm text-(--ink-muted)">Nenhum jogo encontrado nesta amostra.</p>}</div>}</div>{!hasQuery && <div className="mt-8"><div className="flex items-baseline justify-between gap-3"><h2 className="text-sm font-semibold">Alguns para começar</h2><p className="text-xs text-(--ink-muted)">Toque para adicionar</p></div><div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">{featuredGames.map((game) => <GameTile key={game.id} game={game} selected={selectedIds.has(game.id)} onClick={() => onAddGame(game)} />)}</div></div>}<SelectedGames games={selectedGames} collection={activeCollection} onRemove={onRemoveGame} /></section>;
}
