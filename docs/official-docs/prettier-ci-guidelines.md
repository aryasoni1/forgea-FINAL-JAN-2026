# Prettier CI Guidelines

## CI command (recommended)

```
pnpm install --frozen-lockfile
pnpm -w exec prettier --check "**/*.{js,ts,tsx,jsx,json,md,css,scss,html}"
```

## Rationale

- `pnpm install --frozen-lockfile` ensures CI uses the exact lockfile.
- `pnpm -w exec` runs the workspace-installed, pinned Prettier binary.

## Remediation (developer steps)

1. `pnpm install`
2. `pnpm -w exec prettier --write "**/*.{js,ts,tsx,jsx,json,md,css,scss,html}"`
3. Review, `git add`, and `git commit`, then push.

## Alternative (if you must avoid installing devDependencies)

- `pnpm -w dlx --package prettier@3.2.0 prettier --check ...` — **not recommended** because it defeats repository pinning and introduces external network fetches.

## Caching / performance notes

- Prettier is CPU-bound; prefer targeting source directories in CI if run-time becomes a problem (e.g., `apps/**/src`, `packages/**/src`).
