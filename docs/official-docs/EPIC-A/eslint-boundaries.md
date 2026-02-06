---
doc_id: eslint-boundaries
tool: ESLint
version_pinned: true
change_sensitivity: HIGH
lifecycle: ACTIVE
---

# ESLint — Boundary Enforcement

## Purpose

Governs the enforcement of configuration scopes and directory-based rules using the Flat Config system (`eslint.config.js`) to ensure specific rules apply only to appropriate file subsets (e.g., tests vs. source).

## Status

- Doc type: INTERNAL / AUTHORITATIVE
- Evidence basis: Official vendor documentation only
- Version status: ACTIVE (v9.x+)

## Scope

- Applies to: `eslint.config.js` (Flat Config), file globbing patterns, configuration cascading, and ignore logic.
- Does NOT apply to: Legacy `.eslintrc` formats (deprecated), or logical dependency boundaries (e.g., "no-restricted-imports") unless strictly implemented via config scopes.

## Official Sources (Binding)

- eslint-configure.md
- eslint.md

## Evidence Coverage Matrix

| Policy Area              | Source URL          | Version Covered | Status  |
| ------------------------ | ------------------- | --------------- | ------- |
| Flat Config Structure    | eslint-configure.md | v9.39.2         | COVERED |
| File Scoping (`files`)   | eslint-configure.md | v9.x            | COVERED |
| Cascading Logic          | eslint-configure.md | v9.x            | COVERED |
| Global vs. Local Ignores | eslint-configure.md | v9.x            | COVERED |
| Inline Config boundaries | eslint-configure.md | v9.x            | COVERED |

## Version & Compatibility

- **Tool version:** v9.39.2 (Current documentation context).
- **Boundary plugin:** eslint-plugin-boundaries v4.2.x (version pinned by toolchain policy).
- **Configuration Format:** Flat Config (`eslint.config.js`) is the standard; Legacy Config is deprecated.
- **Related tooling compatibility:**
  - **Node.js:** Requires `^18.18.0`, `^20.9.0`, or `>=21.1.0`.
  - **TypeScript Configs:** Native support available in Node.js >= 22.10.0 with flags; otherwise requires `jiti`.

## Forgea Policy Additions (Binding)

- **Pinned versions:**
  - ESLint **9.39.x** (toolchain authority).
  - eslint-plugin-boundaries **4.2.x** (toolchain authority).
- **Canonical config location:** The shared Flat Config MUST live at:
  - `forgea-monorepo/packages/config/eslint.config.js`
- **No independent configs:** Apps and packages MUST reference the shared config and must NOT define separate rule sets.

## CI Enforcement & Failure Semantics

- **CI invocation:** Run ESLint through Turborepo in the verification workflow using `pnpm turbo run verify-and-lint` (or the equivalent lint task defined in `turbo.json`).
- **Pinned tooling:** CI MUST use ESLint **9.39.x** and eslint-plugin-boundaries **4.2.x**, aligned with the toolchain policy.
- **Failure behavior:** Any lint errors or non-zero exit codes MUST fail the workflow and block merges.

## Canonical Rules (Non-Negotiable)

- **Flat Configuration Mandate:** Projects MUST use `eslint.config.js`, `.mjs`, or `.cjs` in the root directory, exporting an array of configuration objects.
- **Default Match Scope:** Configuration objects without `files` or `ignores` apply to **ALL** files matched by _any_ other configuration object.
- **Explicit Scoping:** To restrict rules/plugins to specific boundaries (e.g., `tests/`), the configuration object MUST explicitly define a `files` array using glob patterns (e.g., `["tests/**/*.js"]`).
- **Cascading Precedence:** When multiple configuration objects match a file, they merge; later objects in the array override properties of earlier objects.
- **Ignore Logic:**
  - `ignores` used **without** other keys acts as **Global Ignores** (applies to every config object).
  - `ignores` used **with** other keys acts as **Non-Global Ignores** (filters only that specific config object).
- **Extension Matching:**
  - Default matching covers `*.js`, `*.cjs`, and `*.mjs`.
  - Arbitrary extensions (e.g., `*.ts`) MUST be explicitly listed in `files` to be linted.

## Prohibited Configurations

- ❌ **Ambiguous Global Application:** Extending configurations (e.g., `extends: ["example/recommended"]`) WITHOUT a `files` key is prohibited if the intent is not global, as it applies to all files.
- ❌ **Non-Global Directory Ignores:** Using a directory pattern like `"dir-to-exclude/"` in a **non-global** `ignores` list is invalid; it must be `"dir-to-exclude/**"`.
- ❌ **Unintentional Global Ignores:** Defining `ignores` alone in an object when the intent is local exclusion (requires `files` or other keys to be local).
- ❌ **Inline Configuration (Strict Mode):** If `noInlineConfig` is set to `true`, `/* eslint ... */` comments in source code are prohibited and ignored.

## Enforcement

- **Configuration Resolution:** ESLint automatically searches for `eslint.config.js` variants in the current working directory, then looks up ancestor directories.
- **Linter Options:**
  - `noInlineConfig: true` disables inline rule modification.
  - `reportUnusedDisableDirectives: "error"` enforces removal of stale `eslint-disable` comments.
- **Config Inspector:** Use `--inspect-config` to verify which config objects apply to specific files.
- **Error on Unmatched:** By default, `eslint` throws an error if patterns in `files` do not match any files (unless `errorOnUnmatchedPattern` is false).

## Failure Modes

- **Implicit Global Leak:** A rule intended for `src` applies to `test` because the config object lacked a `files` key.
- **Ignored File Warnings:** If a file is explicitly ignored but passed to the CLI, ESLint returns a warning (if `warnIgnored` is true).
- **Circular Fixes:** Conflicting rules in the cascade can cause "Circular fixes detected" errors.
- **Missing TypeScript Config:** Using `.ts` config files without `jiti` (pre-Node 22.10) causes runtime errors.

## Cross-Doc Dependencies

- Depends on:
  - `/docs/official-docs/node-runtime-policy.md` (Node.js version requirements for ESLint v9).
- Conflicts with:
  - Legacy `.eslintrc` documentation/policies (Deprecation confirmed in).

## Planner Extraction Hints (Non-Human)

- If `eslint.config.js` is absent, the project is non-compliant with v9 standards.
- If `ignores` key exists in an object with NO other keys, treat as GLOBAL IGNORE.
- If `files` key is missing, treat rules as GLOBAL (affecting `*.js`, `*.cjs`, `*.mjs` + any explicitly matched extensions).
- "Cascading" means index `N` overrides index `N-1`.

## Verification Checklist

- [ ] Configuration file is `eslint.config.js` (Flat Config).
- [ ] Directory-specific rules (e.g., `tests/`) use `files` globs.
- [ ] Global ignores are clearly separated (or use `globalIgnores` helper).
- [ ] `noInlineConfig` is configured if strict boundaries are required.

## Non-Decisions

- This document does not define specific logical rules (e.g., "no-restricted-imports") as those are rule-specific, not config-structure specific.
- This document does not select a specific parser (e.g., `@typescript-eslint/parser`).

## Notes

- `files` patterns use minimatch syntax relative to the config file location.
- `basePath` can be used to relocate the resolution root for a config object.
- Feature Flag `v10_config_lookup_from_file` changes resolution to start from the linted file's directory (Monorepo friendly).
