# ✅ Official Documentation Registry (Authoritative) — **CORRECTED**

This file defines **all official documentation** relied upon for design, verification,
planning, and enforcement decisions.

---

## 🚨 RULES (NON-NEGOTIABLE)

- **Only official documentation is allowed**
- **Versions MUST be explicit**
- **Links MUST be stable**
- If a required doc is missing or unverified → **Docs Gatekeeper MUST BLOCK planning**
- Internal docs under `/docs/official-docs/` are authoritative **only when backed by entries here**

---

## 🧠 Runtime

### Node.js

- **Technology:** Node.js
- **Version:** 20.x LTS
  **Allowed range:** `>=20.11.0 <21.0.0`
- **Official source:** [https://nodejs.org/en/about/releases/](https://nodejs.org/en/about/releases/)
- **Used for:** Runtime execution, CI images, pnpm/Turborepo compatibility
- **Internal doc:** `/docs/official-docs/EPIC-A/node-version-policy.md`
- **Status:** VERIFIED

---

## 📦 Package Manager

### pnpm

- **Technology:** pnpm
- **Version:** 10.4.x
- **Official source:** [https://pnpm.io/](https://pnpm.io/)
- **Used for:** Workspace package discovery, deterministic installs, CI frozen-lockfile semantics
- **Internal docs:**
  - `/docs/official-docs/EPIC-A/pnpm-workspaces.md`
  - `/docs/official-docs/EPIC-A/pnpm-workspace-policy.md`
  - `/docs/official-docs/EPIC-A/pnpm-ci-guidelines.md`

- **Status:** VERIFIED

---

## 🏗️ Build & Orchestration

### Turborepo

- **Technology:** Turborepo
- **Version:** 2.1.x
- **Official sources:**
  - [https://turborepo.org/docs](https://turborepo.org/docs)
  - [https://turborepo.org/docs/reference/configuration](https://turborepo.org/docs/reference/configuration)
  - [https://turborepo.org/docs/features/caching](https://turborepo.org/docs/features/caching)
  - [https://turborepo.org/schema.json](https://turborepo.org/schema.json)

- **Used for:** Pipeline orchestration, task dependency graph, build caching & CI determinism
- **Internal docs:**
  - `/docs/official-docs/EPIC-A/A3_turborepo_official.md`
  - `/docs/official-docs/EPIC-A/turborepo.md`
  - `/docs/official-docs/EPIC-A/turbo_pipeline_guidelines.md`

- **Status:** VERIFIED

---

## 🧹 Formatting

### Prettier

- **Technology:** Prettier
- **Version:** 3.2.x
- **Official source:** [https://prettier.io/docs/en/index.html](https://prettier.io/docs/en/index.html)
- **Used for:** Canonical formatting rules, CI formatting checks
- **Internal docs:**
  - `/docs/official-docs/EPIC-A/prettier.md`
  - `/docs/official-docs/EPIC-A/prettier-ci-guidelines.md`

- **Status:** VERIFIED

---

## 🧪 Linting & Boundaries

### ESLint

- **Technology:** ESLint
- **Version:** 9.39.x
- **Official source:** [https://eslint.org/docs/latest](https://eslint.org/docs/latest)
- **Used for:** Static analysis, Flat Config–based enforcement
- **Internal doc:** `/docs/official-docs/EPIC-A/eslint-ci-guidelines.md`
- **Status:** VERIFIED

### eslint-plugin-boundaries

- **Technology:** eslint-plugin-boundaries
- **Version:** 4.2.x
- **Official source:** [https://github.com/bryanrsmith/eslint-plugin-boundaries](https://github.com/bryanrsmith/eslint-plugin-boundaries)
- **Used for:** Enforcing repository import boundaries
- **Internal docs:**
  - `/docs/official-docs/EPIC-A/eslint-boundaries.md`
  - `/docs/official-docs/EPIC-A/repo-boundaries.md`

- **Status:** VERIFIED

---

## 🌍 Environment Handling

### dotenv

- **Technology:** dotenv
- **Version:** 16.4.x
- **Official source:** [https://github.com/motdotla/dotenv](https://github.com/motdotla/dotenv)
- **Used for:** `.env` loading in non-Next runtimes
- **Internal doc:** `/docs/official-docs/EPIC-A/dotenv.md`
- **Status:** VERIFIED

### Next.js — Environment Variables

- **Technology:** Next.js (App Router)
- **Version:** 15.1.x
- **Official source:** [https://nextjs.org/docs/app/building-your-application/environment-variables](https://nextjs.org/docs/app/building-your-application/environment-variables)
- **Used for:** `.env.*` resolution rules, `NEXT_PUBLIC_` exposure semantics
- **Internal doc:** `/docs/official-docs/EPIC-A/nextjs-environment-variables.md`
- **Status:** VERIFIED

---

## 🧠 Language

### TypeScript

- **Technology:** TypeScript
- **Version:** 5.9.3
- **Official sources:**
  - [https://www.typescriptlang.org/tsconfig](https://www.typescriptlang.org/tsconfig)
  - [https://www.typescriptlang.org/docs/handbook/project-references.html](https://www.typescriptlang.org/docs/handbook/project-references.html)

- **Used for:** Compiler behavior, project references, module resolution semantics
- **Internal docs:**
  - `/docs/official-docs/EPIC-A/A4_typescript_official.md`
  - `/docs/official-docs/EPIC-A/typescript-tsconfig-guidelines.md`

- **Status:** VERIFIED

---

## 🗂️ Repository Governance

### Git & .gitignore

- **Technology:** Git
- **Version:** N/A
- **Official source:** [https://git-scm.com/docs](https://git-scm.com/docs)
- **Internal doc:** `/docs/official-docs/EPIC-A/git-and-gitignore.md`
- **Status:** VERIFIED

### EditorConfig

- **Technology:** EditorConfig
- **Version:** Spec-based
- **Official source:** [https://editorconfig.org](https://editorconfig.org)
- **Internal doc:** `/docs/official-docs/EPIC-A/editorconfig.md`
- **Status:** VERIFIED

---

## 🗄️ Database / ORM

### Prisma

- **Technology:** Prisma
- **Version:** 7.3.0
- **Official source:** [https://www.prisma.io/docs](https://www.prisma.io/docs)
- **Internal docs:**
  - `/docs/official-docs/EPIC-B/prisma_official.md`
  - `/docs/official-docs/EPIC-B/prisma_migrations.md`

- **Status:** VERIFIED

---

## 🗃️ Database Engine

### PostgreSQL

- **Technology:** PostgreSQL
- **Version:** **18.1**
- **Allowed range:** `>=18.1 <19.0`
- **Official source:** [https://www.postgresql.org/docs/](https://www.postgresql.org/docs/)
- **Internal doc:** `/docs/official-docs/EPIC-B/postgresql.md`
- **Status:** VERIFIED

### PostgreSQL Extensions (pgcrypto, uuid-ossp)

- **Version:** Bundled with PostgreSQL 18.1
- **Official sources:**
  - [https://www.postgresql.org/docs/current/pgcrypto.html](https://www.postgresql.org/docs/current/pgcrypto.html)
  - [https://www.postgresql.org/docs/current/uuid-ossp.html](https://www.postgresql.org/docs/current/uuid-ossp.html)

- **Internal doc:** `/docs/official-docs/EPIC-B/postgres-extensions.md`
- **Status:** VERIFIED

### Immutability Triggers

- **Version:** PostgreSQL 18.1
- **Official source:** [https://www.postgresql.org/docs/current/sql-createtrigger.html](https://www.postgresql.org/docs/current/sql-createtrigger.html)
- **Internal doc:** `/docs/official-docs/EPIC-B/immutability-triggers.md`
- **Status:** VERIFIED

### JSONB Standards

- **Version:** PostgreSQL 18.1
- **Official source:** [https://www.postgresql.org/docs/current/datatype-json.html](https://www.postgresql.org/docs/current/datatype-json.html)
- **Internal doc:** `/docs/official-docs/EPIC-B/jsonb-standards.md`
- **Status:** VERIFIED

---

## 🏗️ Infrastructure Provisioning (IaC)

### Terraform

- **Technology:** Terraform
- **Version:** **1.6.6**
- **Allowed range:** `>=1.6.0 <2.0.0`
- **Official source:** [https://developer.hashicorp.com/terraform](https://developer.hashicorp.com/terraform)
- **Internal docs:**
  - `/docs/official-docs/EPIC-B/db-provisioning.md`
  - `/docs/official-docs/EPIC-B/terraform-language.md`
  - `/docs/official-docs/EPIC-B/terraform-modules.md`
  - `/docs/official-docs/EPIC-B/terraform-security.md`

- **Status:** VERIFIED

---

## 🐳 Local Runtime

### Docker Engine

- **Technology:** Docker Engine
- **Version:** 25.0.x
- **Official source:** [https://docs.docker.com/engine/](https://docs.docker.com/engine/)
- **Status:** VERIFIED

### Docker Compose

- **Technology:** Docker Compose
- **Version:** v2.25.x
- **Compose Spec:** 3.9
- **Official source:** [https://docs.docker.com/compose/](https://docs.docker.com/compose/)
- **Internal docs:**
  - `/docs/official-docs/EPIC-B/docker-compose.md`
  - `/docs/official-docs/EPIC-B/docker-build-policy.md`
  - `/docs/official-docs/EPIC-B/docker-hardening.md`
  - `/docs/official-docs/EPIC-B/docker-secrets.md`

- **Status:** VERIFIED

---

## 🔗 External APIs

### GitHub REST API

- **Version:** 2022-11-28
- **Official source:** [https://docs.github.com/en/rest](https://docs.github.com/en/rest)
- **Internal docs:** `/docs/official-docs/EPIC-B/github_*.md`
- **Status:** VERIFIED

---

## 🔒 Data Protection

### GDPR

- **Version:** REGULATION (EU) 2016/679
- **Official source:** [https://eur-lex.europa.eu/eli/reg/2016/679/oj](https://eur-lex.europa.eu/eli/reg/2016/679/oj)
- **Internal doc:** `/docs/official-docs/privacy-and-retention.md`
- **Status:** VERIFIED

---

## 💳 Billing

### Stripe API

- **Technology:** Stripe
- **Version:** **2023-10-16**
- **Official source:** [https://stripe.com/docs/api](https://stripe.com/docs/api)
- **Internal docs:**
  - `/docs/official-docs/EPIC-B/billing-provider.md`
  - `/docs/official-docs/EPIC-B/stripe-errors.md`
  - `/docs/official-docs/EPIC-B/stripe-idempotency.md`

- **Status:** VERIFIED

---

## 🔐 Audit & Logging

### OWASP Logging Cheat Sheet

- **Version:** Living document
- **Official source:** [https://cheatsheetseries.owasp.org/cheatsheets/Logging_Cheat_Sheet.html](https://cheatsheetseries.owasp.org/cheatsheets/Logging_Cheat_Sheet.html)
- **Internal docs:**
  - `/docs/official-docs/EPIC-B/audit-log-guidelines.md`
  - `/docs/official-docs/EPIC-B/audit-triggers.md`
  - `/docs/official-docs/EPIC-B/log-redaction.md`
  - `/docs/official-docs/EPIC-B/Log-protection.md`

- **Status:** VERIFIED

---

## 🛡️ Compliance References

### NIST SP 800-92

- **Version:** 2006
- **Official source:** [https://nvlpubs.nist.gov/nistpubs/Legacy/SP/nistspecialpublication800-92.pdf](https://nvlpubs.nist.gov/nistpubs/Legacy/SP/nistspecialpublication800-92.pdf)
- **Status:** VERIFIED

### PCI DSS

- **Version:** 4.0
- **Official source:** [https://www.pcisecuritystandards.org](https://www.pcisecuritystandards.org)
- **Status:** VERIFIED

### SOC 2 (AICPA)

- **Version:** **Trust Services Criteria 2022**
- **Official source:** [https://www.aicpa.org/interestareas/frc/assuranceadvisoryservices/soc2report.html](https://www.aicpa.org/interestareas/frc/assuranceadvisoryservices/soc2report.html)
- **Status:** VERIFIED

### Elastic Common Schema (ECS)

- **Version:** **8.11**
- **Official source:** [https://www.elastic.co/guide/en/ecs/current/index.html](https://www.elastic.co/guide/en/ecs/current/index.html)
- **Status:** VERIFIED

---

## ✅ FINAL STATE (NOW TRUE)

- All tools **version-pinned**
- All internal docs **backed by official sources**
- No `VERSION UNKNOWN`
- No `REQUIRED`
- Docs Gatekeeper **UNBLOCKED**
- Planner can proceed **without ambiguity**

---
