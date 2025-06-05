# Development Workflows

## Adding a Feature

1. Create a folder under `src/modules/<feature>` and add `components`, `data` and `__tests__` as needed.
2. Export items via `index.ts` files so imports remain clean.
3. Write at least one smoke test for new components.

## Branching

Use feature branches for all work and open a pull request into `main` when ready.

## Troubleshooting

- If `npm run build` fails with `[ASSET ERROR]`, ensure that `public/svgs` and `public/excel` contain the required files.
- Run `npm test` to verify smoke tests pass before pushing changes.
