"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  featuredMockGames,
  mockGameSearchSource,
} from "@/components/onboarding/game-search";
import { OnboardingProgress } from "@/components/onboarding/onboarding-progress";
import { StepComplete } from "@/components/onboarding/step-complete";
import { StepGenres } from "@/components/onboarding/step-genres";
import { StepGoal } from "@/components/onboarding/step-goal";
import { StepPlatforms } from "@/components/onboarding/step-platforms";
import { StepProfile } from "@/components/onboarding/step-profile";
import { StepReferenceGames } from "@/components/onboarding/step-reference-games";
import { StepWelcome } from "@/components/onboarding/step-welcome";
import {
  defaultOnboardingData,
  ONBOARDING_STORAGE_KEY,
  ONBOARDING_VERSION,
  type GameCollection,
  type OnboardingData,
  type OnboardingGame,
} from "@/components/onboarding/types";
import { Container } from "@/components/ui/container";

const totalSteps = 7;

function toggleItem(items: readonly string[], item: string) {
  return items.includes(item)
    ? items.filter((value) => value !== item)
    : [...items, item];
}
function readStoredData(): OnboardingData | null {
  try {
    const value = localStorage.getItem(ONBOARDING_STORAGE_KEY);
    if (!value) return null;
    const parsed: unknown = JSON.parse(value);
    if (
      typeof parsed !== "object" ||
      parsed === null ||
      !("onboardingVersion" in parsed) ||
      parsed.onboardingVersion !== ONBOARDING_VERSION
    )
      return null;
    return { ...defaultOnboardingData, ...parsed } as OnboardingData;
  } catch {
    return null;
  }
}

export function OnboardingShell() {
  const router = useRouter();
  const [data, setData] = useState<OnboardingData>(defaultOnboardingData);
  const [step, setStep] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [profileError, setProfileError] = useState<string>();
  const [activeCollection, setActiveCollection] =
    useState<GameCollection>("favorite");
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<readonly OnboardingGame[]>([]);

  useEffect(() => {
    const stored = readStoredData();
    if (stored) {
      if (stored.onboardingCompleted || stored.onboardingSkippedAt) {
        router.replace("/app");
        return;
      }
      setData(stored);
      setStep(Math.min(Math.max(stored.lastStep, 0), totalSteps - 1));
    }
    setIsReady(true);
  }, [router]);
  useEffect(() => {
    let active = true;
    void mockGameSearchSource.search(query).then((items) => {
      if (active) setResults(items);
    });
    return () => {
      active = false;
    };
  }, [query]);

  function persist(nextData: OnboardingData) {
    localStorage.setItem(ONBOARDING_STORAGE_KEY, JSON.stringify(nextData));
    setData(nextData);
  }
  function moveTo(nextStep: number) {
    const nextData = { ...data, lastStep: nextStep };
    persist(nextData);
    setStep(nextStep);
  }
  function continueFromProfile() {
    if (!data.nickname.trim()) {
      setProfileError("Escolha um nome ou apelido para continuar.");
      return;
    }
    setProfileError(undefined);
    moveTo(2);
  }
  function saveAndLeave() {
    persist({ ...data, lastStep: step });
    router.push("/app");
  }
  function skipFlow() {
    persist({
      ...data,
      onboardingSkippedAt: new Date().toISOString(),
      lastStep: step,
    });
    router.push("/app");
  }
  function complete() {
    const nextData = {
      ...data,
      nickname: data.nickname.trim(),
      onboardingCompleted: true,
      onboardingSkippedAt: undefined,
      lastStep: totalSteps - 1,
    };
    persist(nextData);
    setStep(totalSteps - 1);
  }
  function toggleDataList(
    key: "preferredPlatforms" | "preferredGenres" | "preferredPlayStyles",
    value: string,
  ) {
    persist({ ...data, [key]: toggleItem(data[key], value) });
  }
  function addGame(game: OnboardingGame) {
    const key =
      activeCollection === "favorite" ? "favoriteGames" : "desiredGames";
    if (data[key].some((item) => item.id === game.id)) return;
    persist({ ...data, [key]: [...data[key], game] });
  }
  function removeGame(gameId: string, collection: GameCollection) {
    const key = collection === "favorite" ? "favoriteGames" : "desiredGames";
    persist({ ...data, [key]: data[key].filter((game) => game.id !== gameId) });
  }

  if (!isReady) return null;
  const content = (() => {
    switch (step) {
      case 0:
        return <StepWelcome />;
      case 1:
        return (
          <StepProfile
            nickname={data.nickname}
            error={profileError}
            onNicknameChange={(nickname) => {
              setProfileError(undefined);
              setData({ ...data, nickname });
            }}
            onContinue={continueFromProfile}
          />
        );
      case 2:
        return (
          <StepPlatforms
            selected={data.preferredPlatforms}
            onToggle={(value) => toggleDataList("preferredPlatforms", value)}
          />
        );
      case 3:
        return (
          <StepGenres
            genres={data.preferredGenres}
            playStyles={data.preferredPlayStyles}
            onToggleGenre={(value) => toggleDataList("preferredGenres", value)}
            onTogglePlayStyle={(value) =>
              toggleDataList("preferredPlayStyles", value)
            }
          />
        );
      case 4:
        return (
          <StepReferenceGames
            activeCollection={activeCollection}
            query={query}
            results={results}
            featuredGames={featuredMockGames}
            favoriteGames={data.favoriteGames}
            desiredGames={data.desiredGames}
            onCollectionChange={setActiveCollection}
            onQueryChange={setQuery}
            onAddGame={addGame}
            onRemoveGame={removeGame}
          />
        );
      case 5:
        return (
          <StepGoal
            selectedGoal={data.mainGoal}
            onSelectGoal={(mainGoal) => persist({ ...data, mainGoal })}
          />
        );
      default:
        return <StepComplete nickname={data.nickname} />;
    }
  })();
  const isWelcome = step === 0;
  const isComplete = step === totalSteps - 1;
  const primaryAction =
    step === 1
      ? continueFromProfile
      : step === 5
        ? complete
        : () => moveTo(step + 1);
  return (
    <main className="min-h-dvh">
      <Container className="flex min-h-dvh max-w-3xl flex-col py-5 sm:py-8">
        {!isComplete && (
          <OnboardingProgress
            currentStep={step + 1}
            totalSteps={totalSteps}
            onBack={
              step > 0 ? () => setStep((current) => current - 1) : undefined
            }
          />
        )}
        <div
          className={`flex flex-1 flex-col justify-center ${isWelcome || isComplete ? "py-12 sm:py-16" : "py-10 pb-28 sm:py-14"}`}
        >
          {content}
        </div>
        <footer className="sticky bottom-0 -mx-5 border-t border-(--line) bg-(--canvas)/95 px-5 py-3 pb-[calc(.75rem+env(safe-area-inset-bottom))] backdrop-blur sm:mx-0 sm:px-0 sm:py-4">
          {isWelcome ? (
            <div className="space-y-3 sm:flex sm:items-center sm:gap-3 sm:space-y-0">
              <button
                type="button"
                onClick={skipFlow}
                className="block min-h-9 text-sm font-semibold text-(--ink-muted) underline underline-offset-4 hover:text-(--ink) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--accent)"
              >
                Pular por enquanto
              </button>
              <button
                type="button"
                onClick={() => moveTo(1)}
                className="min-h-12 w-full rounded-full bg-(--action-bg) px-5 text-sm font-semibold text-(--action-fg) transition-colors hover:bg-(--accent) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--accent) sm:w-auto"
              >
                Começar
              </button>
            </div>
          ) : isComplete ? (
            <button
              type="button"
              onClick={() => router.push("/app")}
              className="min-h-12 w-full rounded-full bg-(--action-bg) px-5 text-sm font-semibold text-(--action-fg) transition-colors hover:bg-(--accent) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--accent) sm:w-auto"
            >
              Entrar no meu espaço
            </button>
          ) : (
            <div className="space-y-3 sm:flex sm:items-center sm:justify-between sm:space-y-0">
              <div className="flex min-h-8 items-center justify-between gap-3 sm:contents">
                <button
                  type="button"
                  onClick={saveAndLeave}
                  className="text-xs font-semibold text-(--ink-muted) underline underline-offset-4 hover:text-(--ink) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--accent)"
                >
                  <span className="sm:hidden">Salvar depois</span>
                  <span className="hidden sm:inline">
                    Salvar e continuar depois
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => moveTo(step + 1)}
                  className="text-xs font-semibold text-(--ink-muted) underline underline-offset-4 hover:text-(--ink) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--accent) sm:order-2"
                >
                  <span className="sm:hidden">Pular etapa</span>
                  <span className="hidden sm:inline">Pular esta etapa</span>
                </button>
              </div>
              <button
                type="button"
                onClick={primaryAction}
                className="min-h-12 w-full rounded-full bg-(--action-bg) px-5 text-sm font-semibold text-(--action-fg) transition-colors hover:bg-(--accent) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--accent) sm:order-3 sm:w-auto"
              >
                {step === 5 ? "Concluir" : "Continuar"}
              </button>
            </div>
          )}
        </footer>
      </Container>
    </main>
  );
}
