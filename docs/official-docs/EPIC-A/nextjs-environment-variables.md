---
doc_id: nextjs-environment-variables
tool: Next.js
version_pinned: true
change_sensitivity: HIGH
lifecycle: ACTIVE
---

# Next.js — Environment Variable Policy

## Purpose

Governs the loading mechanism, scoping rules, build-time inlining behavior, and resolution precedence of environment variables within the Next.js application runtime and build process.

## Status

- Doc type: INTERNAL / AUTHORITATIVE
- Evidence basis: Official vendor documentation only
- Version status: PINNED (v15.1.0)

## Scope

- Applies to: `.env` file handling, `process.env` access, `NEXT_PUBLIC_` prefix logic, and testing environments.
- Does NOT apply to: External secret management systems (e.g., Vault) unless injected into the process environment.

## Official Sources (Binding)

- https://nextjs.org/docs/app/building-your-application/environment-variables (v15.1.0)

## Evidence Coverage Matrix

| Policy Area                       | Source URL  | Version Covered | Status  |
| --------------------------------- | ----------- | --------------- | ------- |
| File Loading & Location           | Next.js Env | v15.1.0         | COVERED |
| Browser Exposure (`NEXT_PUBLIC_`) | Next.js Env | v15.1.0         | COVERED |
| Build-time Inlining               | Next.js Env | v15.1.0         | COVERED |
| Load Order Precedence             | Next.js Env | v15.1.0         | COVERED |
| Test Environment                  | Next.js Env | v15.1.0         | COVERED |
| External Tooling (`@next/env`)    | Next.js Env | v15.1.0         | COVERED |

## Version & Compatibility

- **Tool version:** v15.1.0.
- **Feature Availability:** Support for `.env` files and `NEXT_PUBLIC_` prefix was introduced in v9.4.0.

## Forgea Environment Manifest (Canonical)

This manifest is the authoritative list of environment variables referenced in the Forgea monorepo.
The canonical example file is at `/forgea-monorepo/.env.example`.

| Variable                         | Required         | Scope       | Notes                                                      |
| -------------------------------- | ---------------- | ----------- | ---------------------------------------------------------- |
| `DATABASE_URL`                   | Yes              | Server-only | Prisma / DB connectivity. Must fail-closed if missing.     |
| `FORGEA_AUDIT_SINK_URL`          | No               | Server-only | Optional audit sink endpoint. No-op if unset.              |
| `FORGEA_SECURITY_ALERT_SINK_URL` | No               | Server-only | Optional security alert sink endpoint. No-op if unset.     |
| `GITHUB_ID`                      | No               | Server-only | GitHub OAuth client ID for Forgea Labs.                    |
| `GITHUB_SECRET`                  | No               | Server-only | GitHub OAuth client secret for Forgea Labs.                |
| `GITHUB_WEBHOOK_SECRET`          | No               | Server-only | GitHub webhook signature secret.                           |
| `NODE_ENV`                       | Runtime-provided | Server-only | Provided by Node.js/Next.js; do not expose to the browser. |

### Client Exposure

- No Forgea variables are intended for client exposure at this time.
- If a variable ever must be client-visible, it MUST be prefixed with `NEXT_PUBLIC_` and documented here.

## Canonical Rules (Non-Negotiable)

- **File Location:** Environment variable files (e.g., `.env`, `.env.local`) MUST be placed in the **root** of the project; they are ignored if placed inside the `/src` directory,.
- **Browser Exposure:** Variables intended for the browser (client-side) MUST be prefixed with `NEXT_PUBLIC_`,.
- **Build-Time Inlining:** `NEXT_PUBLIC_` variables are replaced with their actual values and inlined into the JavaScript bundle at **build time**, NOT runtime,.
- **Static Access Syntax:** References to public environment variables MUST be explicit (e.g., `process.env.NEXT_PUBLIC_ID`) to trigger inlining. Dynamic lookups (e.g., `process.env[varName]` or destructuring) prevents inlining and leaves the value undefined in the browser,.
- **Server-Side Isolation:** Non-public variables (without the prefix) are available ONLY in the Node.js environment.
- **Test Environment Isolation:** When `NODE_ENV` is set to `test`, Next.js loads `.env.test` but explicitly **ignores** `.env.local` to ensure deterministic execution,.
- **Variable Expansion:** Variables referencing other variables via `$` (e.g., `$VAR`) are automatically expanded. Literal `$` characters must be escaped as `\$`.

## Prohibited Configurations

- ❌ **Committing Local Overrides:** `.env*.local` files MUST NOT be committed to version control,.
- ❌ **Runtime Public Variable Assumption:** Do NOT rely on `NEXT_PUBLIC_` variables changing between environments (e.g., Staging -> Prod) if promoting a built artifact (Docker image); the values are frozen at build time.
- ❌ **Dynamic Access of Public Vars:** Code MUST NOT use `process.env[key]` or `const { KEY } = process.env` for client-side variables,.

## Enforcement

- **Load Order Precedence:** Variables are resolved in the following order, stopping once found:
  1. `process.env` (Shell/System environment)
  2. `.env.$(NODE_ENV).local`
  3. `.env.local` (Check skipped if `NODE_ENV` is `test`)
  4. `.env.$(NODE_ENV)`
  5. `.env`
- **Compiler Behavior:** The Next.js compiler performs static text replacement for `process.env.NEXT_PUBLIC_` strings during the `next build` process.
- **External Loading:** Tools outside the Next.js runtime (e.g., ORM configs, Jest) MUST use `@next/env` and `loadEnvConfig` to replicate Next.js loading logic,.

## Failure Modes

- **Stale Configuration:** Promoting a Docker image built with `NEXT_PUBLIC_API_URL=staging` to production results in the client app still hitting staging, because the value was inlined at build time.
- **Undefined Variables (Client):** Accessing a variable without `NEXT_PUBLIC_` in a client component results in `undefined`.
- **Undefined Variables (Dynamic):** Accessing a public variable dynamically (`process.env[name]`) results in `undefined` in the browser because the compiler cannot statically locate the replacement target.

## Cross-Doc Dependencies

- Depends on:
  - `/docs/official-docs/node-runtime-policy.md` (Runtime environment governs `process.env`)
- Conflicts with:
  - NONE

## Planner Extraction Hints (Non-Human)

- If `NODE_ENV` == "test", `LOAD_ENV_LOCAL` = `FALSE`.
- If variable starts with `NEXT_PUBLIC_`, `EVALUATION_TIME` = `BUILD_TIME`.
- If `process.env` access is dynamic (`[]`), `BROWSER_AVAILABILITY` = `FALSE`.
- `.env` files located in `/src` are INVALID.

## Verification Checklist

- [ ] `.env` files are in the project root (parent of `src`).
- [ ] `.env*.local` is listed in `.gitignore`.
- [ ] Client-side variables utilize `NEXT_PUBLIC_` prefix.
- [ ] Code accessing public variables uses full static path `process.env.NEXT_PUBLIC_VAR`.
- [ ] `@next/env` is used for external scripts (Jest/ORM).

## Non-Decisions

- This document does not define specific values for `NODE_ENV` (development/production/test).
- This document does not mandate a specific secrets management platform.

## Notes

- Server components can read runtime environment variables safely during dynamic rendering, opting out of build-time freezing for those specific values,.
- `.env.test` should be committed to the repository to provide defaults for testing.
- `next dev` automatically sets `NODE_ENV=development`.
