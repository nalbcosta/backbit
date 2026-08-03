# Codex Implementation Rules

Use this file as the implementation guardrail for Backbit.
The goal is to keep generated code aligned with the design system, avoid generic UI patterns, and preserve a clean product-first style.

## Tailwind conventions

- Prefer Tailwind v4 CSS variable shorthand syntax whenever a design token is backed by a CSS custom property.
- Use `bg-(--token)` instead of `bg-[var(--token)]`.
- Use `text-(--token)` instead of `text-[var(--token)]`.
- Use `border-(--token)` instead of `border-[var(--token)]`.
- Use `ring-(--token)` instead of `ring-[var(--token)]`.
- Use `shadow-(--token)` instead of `shadow-[var(--token)]` when supported by the utility.
- Use bracket arbitrary values only when no shorthand syntax exists.
- Do not introduce `var()` inside square brackets if a Tailwind shorthand exists.

## Design rules

- Keep the interface cinematic, editorial, minimal, and human.
- Use the serif font only for large, expressive, high-impact moments.
- Use the sans-serif font for UI, metadata, forms, navigation, and supporting text.
- Avoid generic SaaS gradients, default blue-violet styling, and template-like layouts.
- Keep layouts mobile-first and strongly componentized.
- Prefer clear hierarchy, restrained motion, and clean spacing.

## Componentization rules

- Split landing sections into separate components.
- Keep shared UI primitives reusable and typed.
- Prefer composition over monolithic components.
- Keep props minimal and explicit.
- Create new components only when the structure or behavior justifies them.

## Copy rules

- Write in English.
- Keep copy product-led, direct, and natural.
- Avoid hype words like "revolutionize", "next-gen", "unlock", and similar phrases.
- Avoid generic AI-sounding language.
- Make every sentence earn its place.

## Product direction

Backbit is a mobile-first game tracker for backlog management, reviews, play sessions, and smarter discovery.
The landing page and UI should communicate that clearly and quickly.

## Implementation preference

- Favor semantic HTML.
- Favor accessible interactions.
- Favor small reusable components over large page-only files.
- Favor clarity over novelty.
