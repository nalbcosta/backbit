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

  useEffect(() => {
    const savedTheme = localStorage.getItem(storageKey);
    if (savedTheme === "dark" || savedTheme === "light") {
      setTheme(savedTheme);
      document.documentElement.dataset.theme = savedTheme;
    }
  }, []);

  const nextTheme: Theme = theme === "light" ? "dark" : "light";
  const label = theme === "light" ? "Ativar modo escuro" : "Ativar modo claro";
  const ThemeIcon = theme === "light" ? Moon : Sun;

  function toggleTheme() {
    setTheme(nextTheme);
    applyTheme(nextTheme);
  }

  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={theme === "dark"}
      onClick={toggleTheme}
      className="inline-flex min-h-10 items-center gap-2 rounded-full border border-[var(--line)] px-3 text-xs font-semibold text-[var(--ink)] transition-colors hover:border-[var(--ink)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
    >
      <ThemeIcon aria-hidden="true" size={16} strokeWidth={1.75} />
    </button>
  );
}
