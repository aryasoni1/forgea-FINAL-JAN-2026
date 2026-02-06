### FEATURE CONTEXT

- Epic: EPIC-B — DATABASE CORE & HARDENING
- Feature: B2 — Prisma Setup & Migrations
- Exact input files read:
  - /docs/agent_orchestrator_output/EPIC-B — DATABASE CORE & HARDENING/B2_Prisma Setup & Migrations.md
  - /docs/code-scout/EPIC-B — DATABASE CORE & HARDENING/B2_Prisma Setup & Migrations.md
  - /docs/master_docs.md
  - /docs/official-docs-registry.md

---

### REQUIRED OFFICIAL DOCUMENTATION

For safe, repeatable Prisma usage the following official documentation must be canonical and version-pinned in the registry.

- Technology: Prisma
  - Concept: CLI / project init (`prisma init`, schema bootstrapping)
  - Official source: https://www.prisma.io/docs
  - Exact version requirement: 7.3.0
  - Why required: Establishes canonical onboarding steps, where `schema.prisma` lives, and recommended project layout.
  - Decision it informs: Developer onboarding, CI seed/migrate steps, and where to run `prisma generate`.
  - What breaks without it: Contributors may run migrations or generate clients against incorrect schema files or wrong environment variables, causing inconsistent clients and failing builds.

- Technology: Prisma
  - Concept: `schema.prisma` datasource & generator conventions (datasource.url, environment loading, `prisma.config.mjs` alternatives)
  - Official source: https://www.prisma.io/docs
  - Exact version requirement: 7.3.0
  - Why required: Determines authoritative datasource configuration patterns and recommended secure ways to supply `DATABASE_URL`.
  - Decision it informs: Whether to accept the repo's `prisma.config.mjs` approach or to require `url = env("DATABASE_URL")` inside `schema.prisma` and associated onboarding docs.
  - What breaks without it: Mismatched expectations between local dev, CI, and migration tooling leading to missing/misapplied migrations.

- Technology: Prisma
  - Concept: Client generation (`prisma generate`, `@prisma/client` usage)
  - Official source: https://www.prisma.io/docs
  - Exact version requirement: 7.3.0
  - Why required: Ensures generated client compatibility with runtime packages and pinning policy across workspace packages that import `@prisma/client`.
  - Decision it informs: Project-level `package.json` pins, `tsconfig` path mapping policy, and whether to enforce a single generated-client location.
  - What breaks without it: Runtime type mismatches, broken imports, or divergent client code across services.

- Technology: Prisma
  - Concept: Migrations workflow (`prisma migrate dev` / SQL migrations and `migration_lock.toml` semantics)
  - Official source: https://www.prisma.io/docs
  - Exact version requirement: 7.3.0
  - Why required: Migration lifecycle must be consistent for hard-lock schema changes, immutability triggers, and deploy-time checks.
  - Decision it informs: CI migration gating, shadow DB usage, and safe migration promotion to production.
  - What breaks without it: Broken or non-deterministic schema migrations, lost migration metadata, or corrupt production schema state.

---

### EXISTING INTERNAL DOCS (VERIFIED)

- `/docs/official-docs/` — No existing internal docs were found that version-pin Prisma or provide canonical guidance for init, schema configuration, client generation, or migrate workflows. Coverage status: INSUFFICIENT.

Exact gaps:

- No internal, official-docs entry for Prisma init and migration workflows.
- No guidance reconciling `prisma.config.mjs` vs `schema.prisma` inline `env()` pattern.

---

### DOCUMENTATION COVERAGE DECISION

⚠️ DOCUMENTATION PARTIAL — EXTENSION REQUIRED

Docs to extend:

- `/docs/official-docs/EPIC-B/prisma_official.md` — Add pinned official links and migration guidance.
- `/docs/official-docs/EPIC-B/prisma_migrations.md` — Document migration locking, shadow DB usage, and production promotion flow.

---

### STUDY GUIDE FOR HUMAN

- `Prisma init`: Why — standardizes project layout. Alternatives — hand-rolled SQL migrations or other ORMs. When NOT to use — extremely minimal projects with raw SQL only. Common mistakes — forgetting to run `prisma generate` after schema changes.
- `schema.prisma datasource`: Why — single canonical datasource definition. Alternatives — supplying `datasource.url` via runtime config (works, but must be documented). When NOT to use inline `env()` — when intentionally centralizing config in `prisma.config.mjs` for multi-environment setups. Common mistakes — duplicate `DATABASE_URL` definitions and relying on checked-in `.env` files in production.
- `prisma generate`: Why — keeps client types in sync. Alternatives — shipping a compiled client artifact (rare). When NOT to use — only in CI when you guarantee generation at build time. Common mistakes — multiple packages generating clients to different locations causing duplicate types.
- `prisma migrate dev` / migrations: Why — deterministic, auditable schema changes. Alternatives — manual SQL or other migration tools. When NOT to use — experimental schemas where frequent destructive changes are expected (use dev-only branches). Common mistakes — running migrations against production without a shadow DB or without locked migration files.

---

### INTERNAL DOCS TO ADD OR EXTEND

Include only the minimal, exact knowledge required for safe implementation.

- Path: `/docs/official-docs/EPIC-B/prisma_official.md`
  - Purpose: Pin official Prisma doc links and state the repository's chosen pattern (prisma.config.mjs vs inline env()), with examples.
  - Exact knowledge to add:
    - Official links for init, schema conventions, and `prisma generate` (pinned to `7.3.0`).
    - Recommendation and rationale for chosen datasource pattern (e.g., accept `prisma.config.mjs` or require inline `env()`), plus migration implications.
  - Required version pin: `7.3.0`.

- Path: `/docs/official-docs/EPIC-B/prisma_migrations.md`
  - Purpose: Describe migration lifecycle, `migration_lock.toml` semantics, shadow DB usage for `prisma migrate dev`, and production promotion steps.
  - Exact knowledge to add:
    - CI steps to run migrations safely.
    - How to test immutability triggers included in migrations and recommended pre-production checks.
  - Required version pin: `7.3.0`.

---

### OPEN QUESTIONS / AMBIGUITIES

- Confirm exact Prisma CLI / `prisma` package version in `pnpm-lock.yaml` (lockfile shows `@prisma/client@7.3.0`, but ensure `prisma` CLI tooling matches). This must be pinned before implementation.
- Decide whether the repo will standardize on `schema.prisma` inline `url = env("DATABASE_URL")` or accept `prisma.config.mjs` as the canonical approach (planner decision).

---

### MASTER DOCS REGISTRY ACTION

Append the following entry to `/docs/master_docs.md`:

- Date: 2026-02-06
  - Epic / Feature: EPIC-B / B2 — Prisma Setup & Migrations
  - Doc path: /docs/docs-gatekeeper/EPIC-B — DATABASE CORE & HARDENING/B2_Prisma Setup & Migrations.md
  - Status: ADDED
  - Reason: Docs Gatekeeper brief created to verify official Prisma docs and capture registry updates.

---

Handoff complete. Provide this brief verbatim to the planner/architect agent and to the registry update step.
