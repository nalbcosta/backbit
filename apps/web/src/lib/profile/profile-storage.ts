import type { ProfileData } from "./profile.types";
import { PROFILE_STORAGE_KEY, PROFILE_VERSION } from "./profile.types";

export function parseStoredProfile(value: string | null): ProfileData | null {
  if (!value) return null;
  try {
    const parsed: unknown = JSON.parse(value);
    if (
      typeof parsed !== "object" ||
      parsed === null ||
      !("version" in parsed) ||
      parsed.version !== PROFILE_VERSION ||
      !("displayName" in parsed) ||
      typeof parsed.displayName !== "string" ||
      !("username" in parsed) ||
      typeof parsed.username !== "string" ||
      !("bio" in parsed) ||
      typeof parsed.bio !== "string" ||
      !("favoritePlatforms" in parsed) ||
      !Array.isArray(parsed.favoritePlatforms) ||
      !("preferredGenres" in parsed) ||
      !Array.isArray(parsed.preferredGenres) ||
      !("preferredPlayStyles" in parsed) ||
      !Array.isArray(parsed.preferredPlayStyles) ||
      !("connectedPlatforms" in parsed) ||
      !Array.isArray(parsed.connectedPlatforms) ||
      !("recentGames" in parsed) ||
      !Array.isArray(parsed.recentGames) ||
      !("savedCollections" in parsed) ||
      !Array.isArray(parsed.savedCollections) ||
      !("settings" in parsed) ||
      typeof parsed.settings !== "object" ||
      parsed.settings === null ||
      !("weeklyReminder" in parsed.settings) ||
      typeof parsed.settings.weeklyReminder !== "boolean" ||
      !("privateProfile" in parsed.settings) ||
      typeof parsed.settings.privateProfile !== "boolean"
    ) return null;
    return parsed as ProfileData;
  } catch {
    return null;
  }
}

export function readStoredProfile(): ProfileData | null {
  if (typeof window === "undefined") return null;
  return parseStoredProfile(window.localStorage.getItem(PROFILE_STORAGE_KEY));
}

export function writeStoredProfile(profile: ProfileData) {
  window.localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profile));
}
