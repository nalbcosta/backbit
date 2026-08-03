import type { OnboardingGame } from "@/components/onboarding/types";

export type GameSearchSource = {
  search(query: string): Promise<readonly OnboardingGame[]>;
};

const mockGames: readonly OnboardingGame[] = [
  { id: "mock-disco-elysium", title: "Disco Elysium", releaseYear: 2019 },
  { id: "mock-outer-wilds", title: "Outer Wilds", releaseYear: 2019 },
  { id: "mock-hades", title: "Hades", releaseYear: 2020 },
  { id: "mock-celeste", title: "Celeste", releaseYear: 2018 },
  { id: "mock-baldurs-gate-3", title: "Baldur's Gate 3", releaseYear: 2023 },
  { id: "mock-alan-wake-2", title: "Alan Wake 2", releaseYear: 2023 },
  { id: "mock-hollow-knight", title: "Hollow Knight", releaseYear: 2017 },
  { id: "mock-death-stranding", title: "Death Stranding", releaseYear: 2019 },
];

export const featuredMockGames = mockGames.slice(0, 4);

export const mockGameSearchSource: GameSearchSource = {
  async search(query) {
    const normalizedQuery = query.trim().toLocaleLowerCase("pt-BR");
    if (normalizedQuery.length < 1) return [];

    return mockGames.filter((game) =>
      game.title.toLocaleLowerCase("pt-BR").includes(normalizedQuery),
    );
  },
};
