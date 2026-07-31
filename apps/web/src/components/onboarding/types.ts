export type OnboardingGame = {
  id: string;
  title: string;
  coverUrl?: string;
  releaseYear?: number;
};

export type OnboardingData = {
  nickname: string;
  preferredPlatforms: string[];
  preferredGenres: string[];
  preferredPlayStyles: string[];
  favoriteGames: OnboardingGame[];
  desiredGames: OnboardingGame[];
  mainGoal: string | null;
  onboardingCompleted: boolean;
  onboardingSkippedAt?: string;
  onboardingVersion: number;
  lastStep: number;
};

export type GameCollection = "favorite" | "desired";

export const ONBOARDING_VERSION = 1;
export const ONBOARDING_STORAGE_KEY = `backbit-onboarding-v${ONBOARDING_VERSION}`;

export const defaultOnboardingData: OnboardingData = {
  nickname: "",
  preferredPlatforms: [],
  preferredGenres: [],
  preferredPlayStyles: [],
  favoriteGames: [],
  desiredGames: [],
  mainGoal: null,
  onboardingCompleted: false,
  onboardingVersion: ONBOARDING_VERSION,
  lastStep: 0,
};
