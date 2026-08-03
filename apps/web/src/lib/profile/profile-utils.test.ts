import { describe, expect, it } from "vitest";
import { createProfileFromOnboarding } from "./mock-profile";
import { getProfileStats } from "./get-profile-stats";
import { getProfileTags } from "./get-profile-tags";
import { parseStoredProfile } from "./profile-storage";

describe("perfil local", () => {
  it("aproveita o onboarding e remove preferências duplicadas", () => {
    const profile = createProfileFromOnboarding({ nickname: "Nina", preferredGenres: ["RPG", "RPG"], preferredPlatforms: ["PC", "PC"] });
    expect(profile.displayName).toBe("Nina");
    expect(getProfileTags(profile)).toMatchObject({ genres: ["RPG"], platforms: ["PC"] });
  });

  it("deriva métricas da estrutura do perfil", () => {
    const profile = createProfileFromOnboarding();
    expect(getProfileStats(profile)).toHaveLength(3);
    expect(getProfileStats(profile)[0]?.value).toBe("2");
  });

  it("rejeita armazenamento inválido ou de outra versão", () => {
    expect(parseStoredProfile("não é json")).toBeNull();
    expect(parseStoredProfile(JSON.stringify({ version: 0 }))).toBeNull();
  });
});
