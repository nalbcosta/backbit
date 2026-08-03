"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

type Theme = "light" | "dark";
const storageKey = "backbit-theme";

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  localStorage.setItem(storageKey, theme);
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem(storageKey);
    if (savedTheme === "dark" || savedTheme === "light") {
      setTheme(savedTheme);
      document.documentElement.dataset.theme = savedTheme;
    }
    setHasHydrated(true);
  }, []);

  const nextTheme: Theme = theme === "light" ? "dark" : "light";
  const label = theme === "light" ? "Ativar modo escuro" : "Ativar modo claro";

  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={theme === "dark"}
      disabled={!hasHydrated}
      onClick={() => {
        setTheme(nextTheme);
        applyTheme(nextTheme);
      }}
      className="inline-flex min-h-10 w-auto p-3 items-center gap-2 rounded-full aspect-auto border border-(--line) text-xs font-semibold text-(--ink) transition-colors hover:border-(--ink) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--accent)"
    >
      <span className="relative size-4.5" aria-hidden="true">
        <Moon
          size={18}
          strokeWidth={1.25}
          className={`absolute inset-0 transition-all duration-300 ease-out ${
            theme === "light"
              ? "rotate-0 scale-100 opacity-100"
              : "rotate-90 scale-0 opacity-0"
          }`}
        />
        <Sun
          size={18}
          strokeWidth={1.25}
          className={`absolute inset-0 transition-all duration-300 ease-out ${
            theme === "dark"
              ? "rotate-0 scale-100 opacity-100"
              : "-rotate-90 scale-0 opacity-0"
          }`}
        />
      </span>
    </button>
  );
}
