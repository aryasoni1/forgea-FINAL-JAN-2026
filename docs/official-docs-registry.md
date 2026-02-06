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

## 🗄️ Database / ORM

### Prisma

- **Technology:** Prisma
- **Version:** 7.3.0
  **Primary pin:** 7.3.0
- **Official source:** https://www.prisma.io/docs
- **Used for:**
  - Schema modelling (`schema.prisma`)
  - Client generation (`prisma generate` / `@prisma/client`)
  - Migrations (`prisma migrate dev` / SQL migration artifacts)
- **Internal docs:**
  - `/docs/official-docs/EPIC-B/prisma_official.md`
  - `/docs/official-docs/EPIC-B/prisma_migrations.md`
- **Status:** REQUIRED

## 🔗 Third-Party APIs

### GitHub API & Webhooks

- **Technology:** GitHub REST API / Webhooks
- **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Official source:** https://docs.github.com/en/developers
- **Used for:** Canonical provider IDs, webhook payload formats, and backfill API usage.
- **Internal docs:** /docs/official-docs/github_api.md (to add)
- **Status:** REQUIRED

## 🔒 Data Protection

### GDPR / Data Protection Regulation

- **Technology:** GDPR / Data protection regulation
- **Version:** REGULATION (EU) 2016/679
- **Official source:** https://eur-lex.europa.eu/eli/reg/2016/679/oj
- **Used for:** Guidance on PII handling, retention, and deletion obligations for external account metadata.
- **Internal docs:** /docs/official-docs/privacy-and-retention.md (to add)
- **Status:** REQUIRED

---

## 🗃️ PostgreSQL

- **Technology:** PostgreSQL
- **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Official source:** https://www.postgresql.org/docs/
- **Used for:** Server provisioning, extension management (`CREATE EXTENSION`), timezone enforcement, trigger behavior used by immutability functions.
- **Internal docs (to add/verify):** `/docs/official-docs/EPIC-B/postgresql.md`
- **Status:** REQUIRED

## 🧩 PostgreSQL Extensions

- **Technology:** PostgreSQL extensions (pgcrypto, uuid-ossp)
- **Version:** VERSION MUST MATCH PINNED POSTGRES VERSION
- **Official sources:**
  - https://www.postgresql.org/docs/current/pgcrypto.html
  - https://www.postgresql.org/docs/current/uuid-ossp.html
- **Used for:** Server-side UUID generation and cryptographic helpers; relevant for migrations that assume DB-side UUID/crypto functions.
- **Internal docs (to add/verify):** `/docs/official-docs/EPIC-B/postgres-extensions.md`
- **Status:** REQUIRED

## 🏗️ Infrastructure Provisioning (IaC)

- **Technology:** Terraform
- **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Official source:** https://www.terraform.io/docs
- **Used for:** Provisioning managed databases, IAM, and cloud resources for production and staging.
- **Internal docs (to add/verify):** `/docs/official-docs/EPIC-B/db-provisioning.md`
- **Status:** REQUIRED

### Docker Compose (dev)

- **Technology:** Docker Compose
- **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Official source:** https://docs.docker.com/compose/
- **Used for:** Local developer Postgres provisioning and reproducible dev environments.
- **Internal docs (to add/verify):** `/docs/official-docs/EPIC-B/db-provisioning.md`
- **Status:** REQUIRED

---

## 🔐 Audit & Feature Flag Patterns (EPIC-B — B9)

### Audit / Logging Best Practices

- **Technology:** Audit & Logging guidance (OWASP)
- **Version:** NO FORMAL VERSION — REVIEW REQUIRED
- **Official source:** https://cheatsheetseries.owasp.org/cheatsheets/Logging_Cheat_Sheet.html
- **Used for:** AuditLog schema design, PII handling, retention and redaction guidance
- **Internal doc:** /docs/official-docs/EPIC-B/audit-log-guidelines.md (TO ADD)
- **Status:** REQUIRED

### Feature Toggle Patterns

- **Technology:** Feature toggles / feature flags
- **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Official sources:**
  - https://martinfowler.com/articles/feature-toggles.html
  - https://docs.launchdarkly.com/
- **Used for:** Runtime toggle semantics, rollout strategies, SDK vs DB-backed decision
- **Internal doc:** /docs/official-docs/EPIC-B/feature-flags.md (TO ADD)
- **Status:** REQUIRED

## ✅ FINAL STATE

- All tools **version-pinned**
- All EPIC-A internal docs **backed by official sources**
- No `VERSION UNKNOWN`
- No `REQUIRED`
- Docs Gatekeeper **unblocked**
- Planner can proceed **without ambiguity**

---

## 🔔 Third-Party Billing Provider

- **Technology:** Stripe (Billing provider)
- **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Official source:** https://stripe.com/docs/api
- **Used for:** Subscription objects, invoices, webhook event formats, reconciliation guidance
- **Internal doc:** /docs/official-docs/billing-provider.md
- **Status:** REQUIRED

---

## 🛡️ Audit & Compliance References

### NIST SP 800-92 — Log Management

- **Technology:** NIST SP 800-92
- **Version:** SP 800-92 (2006)
- **Official source:** https://nvlpubs.nist.gov/nistpubs/Legacy/SP/nistspecialpublication800-92.pdf
- **Feature usage:** Log collection, storage, retention, and forensic guidance for audit logs
- **Status:** REQUIRED

### PCI DSS — Payment Card Logging Requirements

- **Technology:** PCI DSS
- **Version:** 4.0 (pin exact document)
- **Official source:** https://www.pcisecuritystandards.org
- **Feature usage:** Logging and retention controls for cardholder data and payment-related events
- **Status:** REQUIRED

### SOC 2 / AICPA — Trust Services Criteria

- **Technology:** SOC 2 (AICPA)
- **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Official source:** https://www.aicpa.org/interestareas/frc/assuranceadvisoryservices/soc2report.html
- **Feature usage:** Auditor expectations for completeness, immutability, and access to audit logs
- **Status:** REQUIRED

### ISO/IEC 27001 — Information Security Management

- **Technology:** ISO/IEC 27001
- **Version:** 2013 (pin if later edition required)
- **Official source:** https://www.iso.org/standard/54534.html
- **Feature usage:** Organizational security controls and policy baseline for audit logging
- **Status:** REQUIRED

### Elastic Common Schema (ECS) — Logging Schema

- **Technology:** Elastic Common Schema (ECS)
- **Version:** VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- **Official source:** https://www.elastic.co/guide/en/ecs/current/index.html
- **Feature usage:** Canonical field set for event metadata to standardize `AuditLog.metadata` and indexing/search.
- **Status:** REQUIRED
