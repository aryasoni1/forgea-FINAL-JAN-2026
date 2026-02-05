# Feature Report: A4 — TypeScript Base Configuration

**FEATURE CONTEXT**

- Epic: EPIC-A — MONOREPO & DEVELOPER TOOLING FOUNDATION
- Feature: A4 — TypeScript Base Configuration
- Source: docs/agent_orchestrator_output/EPIC-A — MONOREPO & DEVELOPER TOOLING FOUNDATION/A4_TypeScript Base Configuration.md

**TASKS CHECKED**

- forgea-code-scout: Identify existing `tsconfig.base.json`, root `tsconfig.json`, and per-app `tsconfig.json` files that extend the base; report existence/partials/missing items.

**WHAT ALREADY EXISTS**

- /forgea-monorepo/packages/config/tsconfig.base.json
  - Description: Repository base config used by other configs. Key compilerOptions observed:
    - `target`: "ES2022"
    - `module`: "ESNext"
    - `moduleResolution`: "Bundler"
    - `jsx`: "react-jsx"
    - `types`: ["node","react","react-dom"]
    - `strict`: true, `noImplicitAny`: true, `isolatedModules`: true, `forceConsistentCasingInFileNames`: true, `skipLibCheck`: true

- /forgea-monorepo/tsconfig.json
  - Description: Root tsconfig that `extends` `./packages/config/tsconfig.base.json`; adds repo `paths`, `baseUrl`, and `include` for packages and services.

- /forgea-monorepo/apps/forgea-admin/tsconfig.json
  - Description: App-level config that `extends` `../../packages/config/tsconfig.base.json`; overrides `jsx`, `allowJs`, `noEmit`, `incremental`, `resolveJsonModule`, `esModuleInterop`, `lib`, and `paths` for app aliases.

- /forgea-monorepo/apps/forgea-lessons/tsconfig.json
  - Description: Same pattern as `forgea-admin`; `extends` the same base and applies Next.js-specific options and plugins.

- /forgea-monorepo/apps/forgea-labs/tsconfig.json
  - Description: Extends the same base; sets many `paths`, `lib`, `allowJs`, `noEmit`, `incremental`, `esModuleInterop`, `moduleResolution`: "bundler" (lowercase), and Next.js plugin.

- /forgea-monorepo/packages/audit/tsconfig.json
  - Description: Package-level config extending `../config/tsconfig.base.json`; sets `types`, `baseUrl`, `paths` and includes `src/**/*.ts`.

- /forgea-monorepo/package.json (root)
  - Description: Dev dependency pins `typescript`: "5.9.3" (devDependencies).

**WHAT IS PARTIALLY IMPLEMENTED**

- Base location: A canonical base configuration file exists but is located at `packages/config/tsconfig.base.json` rather than a top-level `tsconfig.base.json` at the repository root. The monorepo root `tsconfig.json` properly extends this base.
- Per-app extension: All sampled app and package `tsconfig.json` files extend the base file and set app-specific `compilerOptions`, `include`, and `exclude` clauses. That pattern is implemented consistently across the sampled apps/packages.
- `moduleResolution` casing difference: The base file uses `"Bundler"` (capitalized), while `apps/forgea-labs/tsconfig.json` sets `"bundler"` (lowercase). This is an observed inconsistency in the code.

**WHAT IS MISSING**

- No `tsconfig.base.json` placed at the repository root (the single canonical base exists under `packages/config`).
- No explicit repository documentation file (in this scan) describing the intended canonical location for the base config or guidance for per-app overrides — only code-level evidence was observed.
- Not all packages in the monorepo were exhaustively checked; this report lists files found by pattern search and contents for the files explicitly read.

**RISKS OR CONFLICTS**

- Casing inconsistency for `moduleResolution` observed (`Bundler` vs `bundler`) — this may produce confusion or subtle differences depending on tooling version or linter rules.
- Base config is inside `packages/config` (not root). Consumers use relative `extends` paths; moving the base later could require updating many `extends` paths.
- No contradictions observed between `strict` settings: base sets `strict: true` and apps do not disable it in the sampled configs.

**QUESTIONS FOR CLARIFICATION**

- Should the canonical `tsconfig.base.json` remain under `packages/config/` or be relocated to the repo root? (Only ask if the next agent needs to know.)

**NEXT AGENT HANDOFF PROMPT (for docs-gatekeeper)**
Use this exact prompt when running the next agent (docs-gatekeeper). Do NOT change wording.

--- COPY-PASTE PROMPT START ---
I am handing you the code-scout findings for Feature A4 — TypeScript Base Configuration (see this report: /docs/code-scout/EPIC-A — MONOREPO & DEVELOPER TOOLING FOUNDATION/A4_TypeScript Base Configuration.md).

Findings you must use (facts only):

- Canonical base config file found: `packages/config/tsconfig.base.json` (contains `target: ES2022`, `moduleResolution: "Bundler"`, and `strict: true`).
- Root `tsconfig.json` extends `./packages/config/tsconfig.base.json`.
- Apps and packages sampled extend that base (apps/forgea-admin, apps/forgea-lessons, apps/forgea-labs, packages/audit).
- Root `package.json` pins `typescript` at `5.9.3` in `devDependencies`.
- Observed inconsistency: `moduleResolution` uses `"Bundler"` in the base, while one app uses `"bundler"` lowercase.

Your role: Verify official, version-pinned TypeScript documentation that authoritatively covers the following items for this feature: `tsconfig` base settings, `strict` options, `target: ES2022`, and `moduleResolution` (including the "bundler" option). Use `/docs/official-docs-registry.md` first.

Deliverable (strict): A small verification report that:

- Confirms whether official TypeScript docs (with explicit version numbers) exist and cover all required topics listed above.
- If confirmed, provide the exact official links (pinned to the TypeScript version `5.9.x` or a compatible stable release) and the specific doc sections that map to each required item.
- If not confirmed, list exactly which required items are not covered by the official links found and request the exact official links (with versions) needed.

Constraints:

- Do not edit or move repository files.
- Do not propose fixes or configuration changes — only verify documentation coverage and provide links/section references.

--- COPY-PASTE PROMPT END ---

Handoff complete. Provide this report verbatim to the next agent.
