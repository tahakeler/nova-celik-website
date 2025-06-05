# Style Guide

This document summarizes the design conventions used throughout the NovaCelik website.

## Colors and Typography

- **Primary Color**: `#1d4ed8` (`blue-700` in Tailwind) for accents and buttons.
- **Neutral Palette**: gray shades for text and backgrounds.
- **Font**: [Inter](https://github.com/vercel/next.js/tree/canary/packages/font) loaded through Next.js font optimization.
- Headings use bold weights and scale responsively.

Code is formatted with Prettier using `.prettierrc` settings. Run `npx prettier --write .` before committing.

## Layout

- Wrap content in containers with `max-w-7xl` and responsive padding.
- Apply generous vertical spacing (`py` classes) between sections.
- Use `flex` and `grid` utilities to create responsive layouts.

## Components

- Place reusable components in `src/components`. Mark them as client components only when they require browser interaction.
- Shared animation variants live in `src/utils/animations.ts`.
- Buttons follow the gradient style defined in `Button.tsx` for consistency.

## Accessibility

- Provide meaningful `alt` text for images.
- Associate labels with form controls and ensure focus styles are visible.
- Maintain WCAG AA contrast ratios for text against backgrounds.

## Performance

- Use Next.js `<Image>` for optimized, lazy-loaded images.
- Keep chart and blog data in static files to minimize runtime requests.

Adhering to these guidelines ensures a consistent and performant user experience.
