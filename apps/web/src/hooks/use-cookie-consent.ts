"use client";

import { useCallback, useEffect, useState } from "react";

export type CookieConsent = {
  necessary: true;
  analytics: boolean;
  updatedAt: string;
};

const storageKey = "backbit-cookie-consent";

function readConsent(): CookieConsent | null {
  try {
    const stored = localStorage.getItem(storageKey);
    if (!stored) return null;

    const parsed: unknown = JSON.parse(stored);
    if (
      typeof parsed === "object" &&
      parsed !== null &&
      "analytics" in parsed &&
      typeof parsed.analytics === "boolean"
    ) {
      const record = parsed as Record<string, unknown>;
      return {
        necessary: true,
        analytics: record.analytics === true,
        updatedAt: typeof record.updatedAt === "string" ? record.updatedAt : new Date().toISOString(),
      };
    }
  } catch {
    return null;
  }

  return null;
}

export function useCookieConsent() {
  const [consent, setConsent] = useState<CookieConsent | null>(null);

  useEffect(() => {
    setConsent(readConsent());
  }, []);

  const saveConsent = useCallback((analytics: boolean) => {
    const nextConsent: CookieConsent = {
      necessary: true,
      analytics,
      updatedAt: new Date().toISOString(),
    };

    localStorage.setItem(storageKey, JSON.stringify(nextConsent));
    setConsent(nextConsent);
  }, []);

  return {
    consent,
    hasChoice: consent !== null,
    saveConsent,
  };
}
