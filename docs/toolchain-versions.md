```md
# Toolchain Versions

**Status:** ACTIVE
**Owner:** Platform / Architecture
**Last Updated:** 2026-02-04

This document is the **single source of truth** for all runtime, CI,
build, caching, formatting, linting, and execution-affecting tools.

All Planners, Implementers, CI pipelines, and automation **MUST**
derive version assumptions from this file.

If a tool is not listed here, it is considered **BLOCKED** and must not
be used for planning or implementation.

---

## 🔒 Global Version Stability Rules

- All **runtimes, build tools, and CI-enforced tools MUST be pinned**
  to a stable major version.
- **Patch updates are auto-allowed**.
- **Minor updates require review** if they affect semantics, caching,
  or runtime behavior.
- **Major upgrades require a policy revision** and explicit approval.
- Tools marked **BLOCKED** represent an intentional non-decision.

---

## 🧠 Runtime

### Node.js

- **Major:** 20.x (LTS)
- **Primary pin:** 20.11.x
- **Allowed range:** `>=20.11.0 <21.0.0`
- **Disallowed:** `<20`, `>=21`

#### Why

- Default runtime on Vercel, AWS Lambda, GitHub Actions
- pnpm v10 is primarily tested on Node 20
- Stable ESM, native fetch, Web Streams

#### Enforcement

- `.nvmrc`
```

20

````

- `package.json`
```json
{
  "engines": {
    "node": ">=20.11.0 <21"
  }
}
````

---

## 📦 Package Manager

### pnpm

- **Major:** 10.x
- **Primary pin:** 10.4.x
- **Allowed range:** `>=10.0.0 <11.0.0`
- **Patch updates:** AUTO-ALLOWED

#### Why

- Workspace semantics stabilized
- Deterministic installs
- Mature CI frozen-lockfile behavior

#### Enforcement

```json
{
  "packageManager": "pnpm@10.4.0"
}
```

---

## 🏗️ Build & Orchestration

### Turborepo

- **Major:** 2.x
- **Primary pin:** 2.1.x
- **Allowed range:** `>=2.0.0 <3.0.0`
- **Patch updates:** ALLOWED
- **Minor updates:** REVIEW REQUIRED

#### Why

- Strict env mode introduced in v2
- Stable schema and pipeline semantics
- Safe runway before v3

#### Enforcement

```json
{
  "devDependencies": {
    "turbo": "2.1.x"
  }
}
```

---

## 🧹 Formatting

### Prettier

- **Major:** 3.x
- **Primary pin:** 3.2.x
- **Allowed range:** `>=3.0.0 <4.0.0`
- **Patch updates:** ALLOWED
- **Minor updates:** ALLOWED (options frozen)

#### Why

- Legacy APIs removed
- Deterministic formatting output
- No new style-affecting options

#### Enforcement

```json
{
  "devDependencies": {
    "prettier": "3.2.5"
  }
}
```

---

## 🧪 Linting & Static Analysis

### ESLint

- **Major:** 9.x
- **Primary pin:** 9.39.x
- **Allowed range:** `>=9.0.0 <10.0.0`
- **Patch updates:** ALLOWED
- **Minor updates:** REVIEW REQUIRED

#### Why

- Flat Config is the enforced future
- Legacy `.eslintrc` effectively deprecated
- Ecosystem converging on v9

#### Enforcement

```json
{
  "devDependencies": {
    "eslint": "9.39.2"
  }
}
```

---

### eslint-plugin-boundaries

- **Major:** 4.x
- **Primary pin:** 4.2.x
- **Allowed range:** `>=4.0.0 <5.0.0`
- **Patch updates:** ALLOWED
- **Minor updates:** REVIEW REQUIRED

#### Why

- Enforces architectural boundaries
- Stable rule semantics in v4

#### Enforcement

```json
{
  "devDependencies": {
    "eslint-plugin-boundaries": "4.2.1"
  }
}
```

---

## 🌍 Environment Loading

### dotenv

- **Major:** 16.x
- **Primary pin:** 16.4.x
- **Allowed range:** `>=16.0.0 <17.0.0`
- **Patch updates:** ALLOWED

#### Why

- Stable parsing semantics
- Widely adopted
- Used only in non-Next runtimes

#### Enforcement

```json
{
  "devDependencies": {
    "dotenv": "16.4.7"
  }
}
```

---

## 🧠 Language

### TypeScript

- **Major:** 5.x
- **Exact pin:** 5.9.3
- **Allowed range:** `>=5.9.3 <6.0.0`

#### Why

- Project references semantics fixed
- Compiler behavior stable
- Matches internal `tsconfig` expectations

---

## ⚛️ Framework

### Next.js (App Router)

- **Major:** 15.x
- **Primary pin:** 15.1.x
- **Allowed range:** `>=15.1.0 <16.0.0`

#### Why

- Improved RSC + caching
- Environment variable semantics unchanged
- Slightly higher upgrade churn

#### Enforcement

```json
{
  "dependencies": {
    "next": "15.1.x"
  }
}
```

---

## 🚫 Explicitly Disallowed

- Node `<20`
- pnpm `<10`
- Turborepo `1.x` or `>=3.x`
- ESLint `<9`
- Prettier `<3`
- Next.js `16.x` (until policy revision)

---

## 🧭 Planner Enforcement Rule

If any required tool:

- Is missing from this file
- Is outside the allowed range
- Is marked **BLOCKED**

➡️ **Planner / Architect MUST STOP**
➡️ No assumptions, no substitutions, no upgrades

---

## 📌 Change Policy

Any change to this file requires:

- Policy update
- Registry update
- Explicit approval

This document is intentionally boring.
That is a feature, not a bug.

```

```
