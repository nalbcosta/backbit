import type { ComponentPropsWithoutRef } from "react";

type InputProps = ComponentPropsWithoutRef<"input"> & {
  id: string;
  label: string;
  hint?: string;
  error?: string;
};

export function Input({
  id,
  label,
  hint,
  error,
  className = "",
  ...props
}: InputProps) {
  const descriptionId = hint || error ? `${id}-description` : undefined;

  return (
    <div>
      <label htmlFor={id} className="text-sm font-semibold text-(--ink)">
        {label}
      </label>
      <input
        id={id}
        aria-describedby={descriptionId}
        aria-invalid={error ? "true" : undefined}
        className={`mt-2 min-h-13 w-full rounded-xl border border-(--line) bg-(--surface) px-4 text-sm text-(--ink) outline-none transition-colors placeholder:text-(--ink-muted) focus:border-(--accent) focus:ring-2 focus:ring-(--accent)/20 ${className}`}
        {...props}
      />
      {(hint || error) && (
        <p
          id={descriptionId}
          className={`mt-2 text-xs leading-5 ${error ? "text-(--accent)" : "text-(--ink-muted)"}`}
        >
          {error ?? hint}
        </p>
      )}
    </div>
  );
}
