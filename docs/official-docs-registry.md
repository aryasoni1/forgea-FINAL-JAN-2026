# Official Documentation Registry (Authoritative)

This file defines **all official documentation** relied upon for
design, verification, planning, and enforcement decisions.

---

## 🚨 RULES (NON-NEGOTIABLE)

- **Only official documentation is allowed**
- **Versions MUST be explicit**
- **Links MUST be stable**
- If a required doc is missing or unverified → **Docs Gatekeeper MUST BLOCK planning**
- Internal docs under `/docs/official-docs/EPIC-A/` are considered
  authoritative **only when backed by entries here**

---

## 🧠 Runtime

### Node.js

- **Technology:** Node.js
- **Version:** 20.x LTS
  **Allowed range:** `>=20.11.0 <21.0.0`
- **Official source:** https://nodejs.org/en/about/releases/
- **Used for:**
  - Runtime execution
  - CI images
  - pnpm and Turborepo compatibility
- **Internal doc:** `/docs/official-docs/EPIC-A/node-version-policy.md`
- **Status:** VERIFIED

---

## 📦 Package Manager

### pnpm

- **Technology:** pnpm
- **Version:** 10.x
  **Primary pin:** 10.4.x
- **Official source:** https://pnpm.io/
- **Used for:**
  - Workspace package discovery
  - Deterministic installs
  - CI frozen-lockfile semantics
- **Internal docs:**
  - `/docs/official-docs/EPIC-A/pnpm-workspaces.md`
  - `/docs/official-docs/EPIC-A/pnpm-workspace-policy.md`
  - `/docs/official-docs/EPIC-A/pnpm-ci-guidelines.md`
- **Status:** VERIFIED

---

## 🏗️ Build & Orchestration

### Turborepo

- **Technology:** Turborepo
- **Version:** 2.x
  **Primary pin:** 2.1.x
- **Official sources:**
  - https://turborepo.org/docs
  - https://turborepo.org/docs/reference/configuration
  - https://turborepo.org/docs/features/caching
  - https://turborepo.org/schema.json
- **Used for:**
  - Pipeline orchestration
  - Task dependency graph
  - Build caching & CI determinism
- **Internal docs:**
  - `/docs/official-docs/EPIC-A/A3_turborepo_official.md`
  - `/docs/official-docs/EPIC-A/turborepo.md`
  - `/docs/official-docs/EPIC-A/turbo_pipeline_guidelines.md`
- **Status:** VERIFIED

---

## 🧹 Formatting

### Prettier

- **Technology:** Prettier
- **Version:** 3.x
  **Primary pin:** 3.2.x
- **Official source:** https://prettier.io/docs/en/index.html
- **Used for:**
  - Canonical formatting rules
  - CI formatting checks
- **Internal docs:**
  - `/docs/official-docs/EPIC-A/prettier.md`
  - `/docs/official-docs/EPIC-A/prettier-ci-guidelines.md`
- **Status:** VERIFIED

---

## 🧪 Linting & Boundaries

### ESLint

- **Technology:** ESLint
- **Version:** 9.x
  **Primary pin:** 9.39.x
- **Official source:** https://eslint.org/docs/latest
- **Used for:**
  - Static analysis
  - Flat Config–based enforcement
- **Internal docs:**
  - `/docs/official-docs/EPIC-A/eslint-ci-guidelines.md`
- **Status:** VERIFIED

---

### eslint-plugin-boundaries

- **Technology:** eslint-plugin-boundaries
- **Version:** 4.x
  **Primary pin:** 4.2.x
- **Official source:** https://github.com/bryanrsmith/eslint-plugin-boundaries
- **Used for:**
  - Enforcing repository import boundaries
- **Internal docs:**
  - `/docs/official-docs/EPIC-A/eslint-boundaries.md`
  - `/docs/official-docs/EPIC-A/repo-boundaries.md`
- **Status:** VERIFIED

---

## 🌍 Environment Handling

### dotenv

- **Technology:** dotenv
- **Version:** 16.x
  **Primary pin:** 16.4.x
- **Official source:** https://github.com/motdotla/dotenv
- **Used for:**
  - `.env` loading in non-Next runtimes
- **Internal docs:**
  - `/docs/official-docs/EPIC-A/dotenv.md`
- **Status:** VERIFIED

---

### Next.js — Environment Variables

- **Technology:** Next.js (App Router)
- **Version:** 15.x
  **Primary pin:** 15.1.x
- **Official source:**
  https://nextjs.org/docs/app/building-your-application/environment-variables
- **Used for:**
  - `.env.*` resolution rules
  - `NEXT_PUBLIC_` exposure semantics
- **Internal docs:**
  - `/docs/official-docs/EPIC-A/nextjs-environment-variables.md`
- **Status:** VERIFIED

---

## 🧠 Language

### TypeScript

- **Technology:** TypeScript
- **Version:** 5.9.3
- **Official sources:**
  - https://www.typescriptlang.org/tsconfig
  - https://www.typescriptlang.org/docs/handbook/project-references.html
- **Used for:**
  - Compiler behavior
  - Project references
  - Module resolution semantics
- **Internal docs:**
  - `/docs/official-docs/EPIC-A/A4_typescript_official.md`
- **Status:** VERIFIED

---

## 🗂️ Repository Governance

### Git & .gitignore

- **Technology:** Git
- **Version:** N/A
- **Official source:** https://git-scm.com/docs
- **Used for:**
  - Source control semantics
  - Ignore rules
- **Internal docs:**
  - `/docs/official-docs/EPIC-A/git-and-gitignore.md`
- **Status:** VERIFIED

---

### EditorConfig

- **Technology:** EditorConfig
- **Version:** Spec-based (no pin)
- **Official source:** https://editorconfig.org
- **Used for:**
  - Editor-level formatting guarantees
- **Internal docs:**
  - `/docs/official-docs/EPIC-A/editorconfig.md`
- **Status:** VERIFIED

---

## 🧭 Version Authority

### Toolchain Versions (Global)

- **Document:** `/docs/toolchain-versions.md`
- **Role:** Single source of truth for all tool versions
- **Used by:**
  - Docs Gatekeeper
  - Planner / Architect
  - CI enforcement
- **Status:** VERIFIED

---

## ✅ FINAL STATE

- All tools **version-pinned**
- All EPIC-A internal docs **backed by official sources**
- No `VERSION UNKNOWN`
- No `REQUIRED`
- Docs Gatekeeper **unblocked**
- Planner can proceed **without ambiguity**
