# Test Plan — Task A4 (TypeScript Base Configuration)

## Test Scope

- TypeScript documentation pinning and policy updates.
- tsconfig inheritance and override policy compliance.
- moduleResolution casing consistency.

## Happy Paths

1. Internal TypeScript docs are pinned to 5.9.3.
2. Base config location is documented as packages/config/tsconfig.base.json.
3. App and package tsconfig files extend the base config.
4. moduleResolution is consistently set to "Bundler".
5. App tsconfig files only include allowed overrides.

## Failure Cases

1. Any internal TypeScript doc remains BLOCKED or unpinned.
2. A tsconfig file overrides forbidden options (target, module, moduleResolution, strict, noEmit, useDefineForClassFields, skipLibCheck, incremental).
3. moduleResolution appears with lowercase or alternate casing.
4. A tsconfig does not extend the canonical base.

## Abuse / Bypass Cases

1. Adding forbidden overrides to an app config without documentation.
2. Moving the base config to the repo root and updating extends paths.
3. Introducing a second base config to bypass policy.

## Invariants

- Type-checking remains deterministic across the monorepo.
- No application runtime behavior changes.
- TypeScript version pin remains aligned with toolchain policy.
