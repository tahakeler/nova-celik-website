# Architecture Overview

The project follows a modular layout. Feature modules live under `src/modules` and contain their own `components`, `data` and tests. Shared UI elements are placed in `src/components`.

Static assets are organized by type under `public/images`, `public/svgs` and `public/excel`.

Each folder containing components or data includes an `index.ts` barrel file that re-exports its contents for cleaner imports.

Tests are colocated inside each module's `__tests__` directory and run with Jest.
