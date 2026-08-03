"use client";

import type { ProfileData } from "@/lib/profile/profile.types";

type PreferenceKey = "favoritePlatforms" | "preferredGenres" | "preferredPlayStyles";

function toggle(values: readonly string[], value: string) {
  const normalized = value.trim();
  if (!normalized) return values;
  return values.includes(normalized)
    ? values.filter((item) => item !== normalized)
    : [...values, normalized];
}

export function useProfilePreferences(
  profile: Pick<ProfileData, PreferenceKey>,
  onChange: (update: Partial<ProfileData>) => void,
) {
  function togglePreference(key: PreferenceKey, value: string) {
    onChange({ [key]: toggle(profile[key], value) });
  }

  return {
    togglePlatform: (value: string) => togglePreference("favoritePlatforms", value),
    toggleGenre: (value: string) => togglePreference("preferredGenres", value),
    togglePlayStyle: (value: string) => togglePreference("preferredPlayStyles", value),
  };
}
