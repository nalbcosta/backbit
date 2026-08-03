"use client";

import { Eye, EyeOff } from "lucide-react";

type PasswordVisibilityToggleProps = {
  isVisible: boolean;
  onToggle: () => void;
};

export function PasswordVisibilityToggle({
  isVisible,
  onToggle,
}: PasswordVisibilityToggleProps) {
  return (
    <button
      type="button"
      aria-label={isVisible ? "Esconder senha" : "Mostrar senha"}
      aria-pressed={isVisible}
      onClick={onToggle}
      className="absolute inset-y-0 right-2 inline-flex w-9 items-center justify-center text-(--ink-muted) transition-colors hover:text-(--ink) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--accent)"
    >
      {isVisible ? (
        <EyeOff aria-hidden="true" size={18} />
      ) : (
        <Eye aria-hidden="true" size={18} />
      )}
    </button>
  );
}
