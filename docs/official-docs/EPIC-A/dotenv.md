---
doc_id: dotenv-usage
tool: dotenv
version_pinned: true
change_sensitivity: MEDIUM
lifecycle: ACTIVE
---

# dotenv — Usage Policy

## Purpose

Governs the loading of environment variables from `.env` files into `process.env` for Node.js applications, defining parsing rules, configuration options, and initialization patterns.

## Status

- Doc type: INTERNAL / AUTHORITATIVE
- Evidence basis: Official vendor documentation only
- Version status: PINNED (v16.x)

## Scope

- Applies to: Node.js processes using the `dotenv` library directly.
- Does NOT apply to: Next.js applications (which use internal loaders), or frontend bundles (Webpack/Vite) unless polyfilled.

## Official Sources (Binding)

- https://github.com/motdotla/dotenv (v16.x)

## Evidence Coverage Matrix

| Policy Area              | Source URL | Version Covered | Status  |
| ------------------------ | ---------- | --------------- | ------- |
| Initialization / Loading | dotenv.md  | v16.x           | COVERED |
| Parsing Rules            | dotenv.md  | v15.0.0+        | COVERED |
| Configuration Options    | dotenv.md  | v16.x           | COVERED |
| Preloading (CLI)         | dotenv.md  | v16.x           | COVERED |
| ES6/ESM Usage            | dotenv.md  | v16.x           | COVERED |

## Version & Compatibility

- **Tool version:** v16.x (Primary pin: 16.4.x),.
- **Feature Availability:**
  - Multiline values supported since v15.0.0.
  - Multiline comments supported since v15.0.0.

## Forgea Usage Notes

- Forgea uses dotenv only in non-Next.js runtimes that explicitly opt in.
- The canonical list of env variables is maintained in `/forgea-monorepo/.env.example`.
- Next.js apps MUST rely on Next.js built-in env loading instead of `dotenv`.

## Canonical Rules (Non-Negotiable)

- **Initialization Timing:** `dotenv.config()` MUST be called as early as possible in the application, before any other imports access `process.env`.
- **No Overwrite by Default:** `dotenv` will NOT modify environment variables that are already set in the environment unless `override: true` is explicitly passed,.
- **Parsing Logic:**
  - **Comments:** Lines beginning with `#` are treated as comments. Inline comments are supported but MUST start with `#`,.
  - **Whitespace:** Whitespace is removed from both ends of unquoted values.
  - **Quotes:** Single or double quotes are supported; inner quotes are maintained.
  - **Expansion:** Variable expansion (e.g., `process.env.VAR` inside `.env`) is **NOT** supported natively; `dotenv-expand` or `dotenvx` is required,.
- **ESM Usage:** When using ES modules (`import`), you MUST use `import 'dotenv/config'` to ensure configuration loads before dependent imports are executed (due to hoisting),.
- **Environment Separation:** A single `.env` file per environment is recommended (e.g., `.env.production`). Inheritance/cascading between files is discouraged in favor of duplication.

## Prohibited Configurations

- ❌ **Committing `.env`:** The `.env` file MUST NOT be committed to version control.
- ❌ **Implicit Expansion:** Do NOT assume variables defined in `.env` can reference other variables (e.g., `URL=${HOST}/api`) without additional tooling.
- ❌ **Incorrect ESM Import:** Using `import dotenv from 'dotenv'; dotenv.config()` in the same file as imports that rely on env vars is PROHIBITED because the dependent imports will evaluate _before_ `dotenv.config()` executes.

## Enforcement

- **Runtime Loading:**
  - **CommonJS:** `require('dotenv').config()`.
  - **ESM:** `import 'dotenv/config'`.
- **Preloading:** Use `node -r dotenv/config script.js` to load variables without modifying code.
- **Options via CLI:** Configuration options can be passed via command line arguments when preloading (e.g., `dotenv_config_path=/custom/.env`).

## Failure Modes

- **Silent Failure (Default):** If the `.env` file is missing, `dotenv` fails silently unless `debug: true` is set.
- **Import Hoisting:** Accessing `process.env.KEY` returns `undefined` if the consuming module is imported before `dotenv` is configured.
- **Frontend Polyfills:** Usage in frontend environments (Webpack < 5) fails with "Module not found: crypto|os|path" unless polyfilled or `dotenv-webpack` is used.

## Cross-Doc Dependencies

- Depends on:
  - `/docs/official-docs/node-runtime-policy.md`
- Conflicts with:
  - Next.js Internal Loading (If `dotenv` is used manually in a Next.js app, it may conflict or run redundantly with Next.js's native environment loading).

## Planner Extraction Hints (Non-Human)

- If `override` is undefined -> Default is `FALSE`.
- If environment is "ESM" -> Pattern MUST be `import 'dotenv/config'`.
- If `multiline` content is required -> Version MUST be >= 15.0.0.
- If `debug` is set to `true` -> Logs explain why keys are not set.

## Verification Checklist

- [ ] `.env` is listed in `.gitignore`.
- [ ] `dotenv.config()` is the first executable statement (CommonJS).
- [ ] `import 'dotenv/config'` is used for ESM projects.
- [ ] Variable expansion logic is handled by external libraries if needed.

## Non-Decisions

- This document does not cover `dotenvx` (the tool recommended by the author for encryption/syncing) except to note it exists.
- This document does not define specific variable naming conventions (e.g., `SCREAMING_SNAKE_CASE`).

## Notes

- The author formally recommends using `dotenvx` instead of preloading `dotenv` for better debugging and cross-platform support.
- `dotenv.config()` returns an object with a `parsed` key containing the loaded variables or an `error` key on failure.
- Pass an array to `path` (`path: ['.env.local', '.env']`) to load multiple files; first value wins unless `override: true` is set, in which case the last value wins,.
