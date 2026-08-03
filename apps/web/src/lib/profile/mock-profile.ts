import type { OnboardingData, OnboardingGame } from "@/components/onboarding/types";
import { mockBoardGames } from "@/lib/board/mock-board-games";
import type { ProfileData, ProfileGame, SavedCollection } from "./profile.types";
import { PROFILE_VERSION } from "./profile.types";

const defaultPlatforms = ["PC", "PlayStation", "Nintendo Switch"] as const;

function toProfileGame(game: (typeof mockBoardGames)[number]): ProfileGame {
  return {
    id: game.id,
    title: game.title,
    coverTone: game.coverTone,
    coverUrl: game.coverUrl,
    platform: game.platform,
    status: game.status,
    updatedAt: game.updatedAt,
    progressPercent: game.progressPercent,
  };
}

function fromOnboardingGame(game: OnboardingGame): ProfileGame {
  return {
    id: game.id,
    title: game.title,
    coverTone: "smoke",
    platform: "Não informado",
    status: "wishlist",
    updatedAt: "2026-08-03",
  };
}

function unique(values: readonly string[]) {
  return [...new Set(values.map((value) => value.trim()).filter(Boolean))];
}

export function createProfileFromOnboarding(onboarding?: Partial<OnboardingData>): ProfileData {
  const favoriteGames = onboarding?.favoriteGames?.map(fromOnboardingGame) ?? [];
  const desiredGames = onboarding?.desiredGames?.map(fromOnboardingGame) ?? [];
  const boardGames = mockBoardGames.map(toProfileGame);
  const savedCollections: readonly SavedCollection[] = [
    {
      id: "favorites",
      title: "Para guardar",
      description: "Jogos que continuam por perto.",
      games: favoriteGames,
    },
    {
      id: "wishlist",
      title: "Na próxima curva",
      description: "O que você quer conhecer depois.",
      games: desiredGames,
    },
  ];
  const displayName = onboarding?.nickname?.trim() || "Seu perfil";
  const preferredPlatforms = unique(onboarding?.preferredPlatforms ?? defaultPlatforms);

  return {
    version: PROFILE_VERSION,
    id: "local-profile",
    displayName,
    username: `@${displayName.toLocaleLowerCase("pt-BR").replace(/[^a-z0-9]+/g, ".").replace(/^\.|\.$/g, "") || "jogador"}`,
    bio: "Um espaço para guardar o que está em jogo e o que fica depois.",
    favoritePlatforms: preferredPlatforms,
    preferredGenres: unique(onboarding?.preferredGenres ?? ["Narrativo", "Aventura"]),
    preferredPlayStyles: unique(onboarding?.preferredPlayStyles ?? ["Sem pressa"]),
    connectedPlatforms: [
      { id: "steam", label: "Steam", connected: false },
      { id: "playstation", label: "PlayStation Network", connected: false },
      { id: "xbox", label: "Xbox", connected: false },
    ],
    recentGames: boardGames.filter((game) => game.status === "playing" || game.status === "paused"),
    savedCollections,
    settings: { weeklyReminder: true, privateProfile: true },
    onboardingComplete: Boolean(onboarding?.onboardingCompleted),
    updatedAt: new Date().toISOString(),
  };
}
