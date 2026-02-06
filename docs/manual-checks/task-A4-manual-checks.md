# Manual Checks — Task A4

## 1) Verify canonical base location

- Open [forgea-monorepo/packages/config/tsconfig.base.json](forgea-monorepo/packages/config/tsconfig.base.json).
- Confirm this file contains the base compiler options and is referenced by other tsconfig files.

## 2) Verify tsconfig inheritance

- Open [forgea-monorepo/tsconfig.json](forgea-monorepo/tsconfig.json).
- Confirm it extends ./packages/config/tsconfig.base.json.
- Open [forgea-monorepo/apps/forgea-labs/tsconfig.json](forgea-monorepo/apps/forgea-labs/tsconfig.json).
- Confirm it extends ../../packages/config/tsconfig.base.json.

## 3) Verify moduleResolution casing

- Open [forgea-monorepo/packages/config/tsconfig.base.json](forgea-monorepo/packages/config/tsconfig.base.json).
- Confirm moduleResolution is set to "Bundler" (capital B).
- Confirm no other tsconfig files set a different casing.

## 4) Verify allowed overrides in app config

- Open [forgea-monorepo/apps/forgea-labs/tsconfig.json](forgea-monorepo/apps/forgea-labs/tsconfig.json).
- Confirm only allowed overrides remain (lib, jsx, types, baseUrl, paths, outDir/rootDir/references if present).
- Confirm forbidden overrides (target, module, moduleResolution, strict, noEmit, useDefineForClassFields, skipLibCheck, incremental) are not present.

## 5) Verify internal docs are pinned

- Open [docs/official-docs/EPIC-A/A4_typescript_official.md](docs/official-docs/EPIC-A/A4_typescript_official.md).
- Confirm version status is pinned to TypeScript 5.9.3 and the canonical base location is documented.
- Open [docs/official-docs/EPIC-A/typescript-tsconfig-guidelines.md](docs/official-docs/EPIC-A/typescript-tsconfig-guidelines.md).
- Confirm version status is pinned to TypeScript 5.9.3 and the allowed overrides policy is documented.
