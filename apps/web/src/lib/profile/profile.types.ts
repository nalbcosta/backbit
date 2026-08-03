import type { BoardGame } from "@/lib/board/board.types";

export const PROFILE_VERSION = 1;
export const PROFILE_STORAGE_KEY = `backbit-profile-v${PROFILE_VERSION}`;

export type ProfilePlatform = {
  id: string;
  label: string;
  connected: boolean;
  accountLabel?: string;
};

export type ProfileSettings = {
  weeklyReminder: boolean;
  privateProfile: boolean;
};

export type ProfileGame = Pick<
  BoardGame,
  "id" | "title" | "coverTone" | "coverUrl" | "platform" | "status" | "updatedAt" | "progressPercent"
>;

export type SavedCollection = {
  id: string;
  title: string;
  description: string;
  games: readonly ProfileGame[];
};

export type ProfileData = {
  version: number;
  id: string;
  displayName: string;
  username: string;
  bio: string;
  avatarUrl?: string;
  favoritePlatforms: readonly string[];
  preferredGenres: readonly string[];
  preferredPlayStyles: readonly string[];
  connectedPlatforms: readonly ProfilePlatform[];
  recentGames: readonly ProfileGame[];
  savedCollections: readonly SavedCollection[];
  settings: ProfileSettings;
  onboardingComplete: boolean;
  updatedAt: string;
};

export type ProfileMetric = {
  label: string;
  value: string;
  detail: string;
};

export type ProfileIdentityInput = Pick<
  ProfileData,
  "displayName" | "username" | "bio"
>;
