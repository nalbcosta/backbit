"use client";

import { useCallback, useEffect, useState } from "react";
import { type OnboardingData, ONBOARDING_STORAGE_KEY } from "@/components/onboarding/types";
import { createProfileFromOnboarding } from "@/lib/profile/mock-profile";
import { readStoredProfile, writeStoredProfile } from "@/lib/profile/profile-storage";
import type { ProfileData } from "@/lib/profile/profile.types";

function readOnboarding(): Partial<OnboardingData> | undefined {
  try {
    const value = window.localStorage.getItem(ONBOARDING_STORAGE_KEY);
    return value ? (JSON.parse(value) as Partial<OnboardingData>) : undefined;
  } catch {
    return undefined;
  }
}

export function useProfileState() {
  const [profile, setProfile] = useState<ProfileData | null>(null);

  useEffect(() => {
    setProfile(readStoredProfile() ?? createProfileFromOnboarding(readOnboarding()));
  }, []);

  const updateProfile = useCallback((update: Partial<ProfileData>) => {
    setProfile((current) => {
      if (!current) return current;
      const next = { ...current, ...update, updatedAt: new Date().toISOString() };
      writeStoredProfile(next);
      return next;
    });
  }, []);

  const toggleConnection = useCallback((platformId: string) => {
    setProfile((current) => {
      if (!current) return current;
      const connectedPlatforms = current.connectedPlatforms.map((platform) =>
        platform.id === platformId
          ? { ...platform, connected: !platform.connected, accountLabel: !platform.connected ? "Conta local" : undefined }
          : platform,
      );
      const next = { ...current, connectedPlatforms, updatedAt: new Date().toISOString() };
      writeStoredProfile(next);
      return next;
    });
  }, []);

  return { profile, updateProfile, toggleConnection };
}
