import type { ProfileData } from "./profile.types";

export function getProfileTags(profile: ProfileData) {
  return {
    genres: [...new Set(profile.preferredGenres)],
    playStyles: [...new Set(profile.preferredPlayStyles)],
    platforms: [...new Set(profile.favoritePlatforms)],
  };
}
