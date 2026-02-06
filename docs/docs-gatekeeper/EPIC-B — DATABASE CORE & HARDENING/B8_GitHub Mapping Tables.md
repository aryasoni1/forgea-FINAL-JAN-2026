### FEATURE CONTEXT

- Epic: EPIC-B — DATABASE CORE & HARDENING
- Feature: B8 — GitHub Mapping Tables
- Exact input files read:
  - /docs/agent_orchestrator_output/EPIC-B — DATABASE CORE & HARDENING/B8_GitHub Mapping Tables.md
  - /docs/code-scout/EPIC-B — DATABASE CORE & HARDENING/B8_GitHub Mapping Tables.md
  - /forgea-monorepo/packages/schema/prisma/schema.prisma
  - /forgea-monorepo/packages/schema/prisma/migrations/20260124065750_init_trust_schema/migration.sql
  - /forgea-monorepo/apps/forgea-labs/auth.config.ts
  - /forgea-monorepo/apps/forgea-labs/app/api/webhooks/github/route.ts
  - /forgea-monorepo/packages/schema/prisma/seed.ts

---

### REQUIRED OFFICIAL DOCUMENTATION

1. Technology: GitHub REST API / Webhooks
   - Concept: Canonical provider IDs, repo IDs, webhook payload formats, rate limits, allowed token scopes for metadata backfills
   - Official source: https://docs.github.com/en/developers
   - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
   - Why required: To define canonical `providerId` semantics, safely call APIs during backfill, and interpret webhook payload fields reliably.
   - Decision it informs: Whether backfill can rely on stable `repo_id` fields, which webhook fields map to repo URLs, and what token scopes are minimally required.
   - What breaks without it: Backfill scripts or webhook parsers may rely on incorrect fields, causing silent mismatches or rate-limit failures.

2. Technology: Prisma (ORM & Migrations)
   - Concept: Schema modelling, migration artifacts, generated client behavior
   - Official source: https://www.prisma.io/docs
   - Exact version requirement: 7.3.0 (per registry)
   - Why required: To author correct `schema.prisma` models, generate migrations, and ensure migration SQL semantics match expectations.
   - Decision it informs: Model declarations, use of `dbgenerated()` / UUID helpers, and migration workflow.
   - What breaks without it: Incorrect Prisma usage can produce non-portable SQL or broken client code.

3. Technology: PostgreSQL DDL & Extensions
   - Concept: DDL syntax, UUID helper availability (pgcrypto / uuid-ossp), referential action semantics
   - Official source: https://www.postgresql.org/docs/
   - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
   - Why required: Migration SQL examples use `gen_random_uuid()` and rely on exact `ON DELETE` behaviors; these vary by Postgres version and extension availability.
   - Decision it informs: Which SQL functions to use, migration compatibility, and availability of index/expression support.
   - What breaks without it: Migrations may fail or behave incorrectly (missing functions, different constraint behaviors).

4. Technology: Data Protection / Privacy Regulation (PII handling)
   - Concept: Jurisdictional rules for storing user identifiers and profile data (e.g., GDPR), retention and deletion obligations
   - Official source: REGULATION (EU) 2016/679 (GDPR) — https://eur-lex.europa.eu/eli/reg/2016/679/oj
   - Exact version requirement: 2016/679 (regulation identifier)
   - Why required: Storing GitHub usernames, profile URLs, and other metadata may be subject to privacy laws; retention/deletion semantics must be followed.
   - Decision it informs: Retention windows, anonymization, encryption, and whether to store usernames/profile URLs at all.
   - What breaks without it: Non-compliance risk, legal exposure, or need to remove collected data requiring complex migrations.

---

### EXISTING INTERNAL DOCS (VERIFIED)

1. /docs/official-docs-registry.md
   - Coverage status: PARTIAL
   - Exact gaps: PostgreSQL is marked `VERSION UNKNOWN — MUST BE PINNED`; GitHub API and Data Protection guidance are not present and must be added or referenced.

2. /docs/official-docs/EPIC-B/prisma_official.md
   - Coverage status: SUFFICIENT
   - Exact gaps: N/A for Prisma-specific usage; ensure migrations workflow mentions `dbgenerated()` and UUID helpers used in our migration examples.

3. /docs/official-docs/EPIC-B/postgresql.md (expected)
   - Coverage status: INSUFFICIENT (missing)
   - Exact gaps: Canonical Postgres version pin, required extensions (`pgcrypto`/`uuid-ossp`), and DDL compatibility notes are missing.

4. /docs/official-docs/privacy-and-retention.md (expected)
   - Coverage status: INSUFFICIENT (missing)
   - Exact gaps: No canonical retention or PII handling guidance for external account metadata; Docs Gatekeeper must approve a PII policy before implementation.

---

### DOCUMENTATION COVERAGE DECISION

⚠️ DOCUMENTATION PARTIAL — EXTENSION REQUIRED

Docs to extend or add (brief):
- Extend `/docs/official-docs-registry.md` to include GitHub API/webhooks and Data Protection references with explicit version pins or notes.
- Add `/docs/official-docs/EPIC-B/postgresql.md` with the pinned Postgres version and required extensions.
- Add `/docs/official-docs/privacy-and-retention.md` with retention timelines, deletion semantics, and guidance on storing third-party account identifiers.

---

### STUDY GUIDE FOR HUMAN

For each required concept below, study these points before implementation.

- GitHub REST API / Webhooks:
  - Why: Defines canonical fields (`repo.id`, `repository.html_url`, `sender.id`) used to map webhooks to internal rows.
  - Alternatives: Use only URL matching (fragile) or require user-supplied repository config (manual). Both reduce automation.
  - When NOT to use: If policy forbids storing external IDs or calls to GitHub API for enrichment.
  - Common mistakes: Relying on mutable fields (e.g., `repository.full_name`) instead of stable `repo.id`, ignoring rate limits, or using over-privileged tokens.

- PostgreSQL DDL & Extensions:
  - Why: Migration SQL uses DB functions and specific constraint behaviors—pin to avoid migration-time surprises.
  - Alternatives: Use UUID generation in application layer; this reduces DB portability but avoids extension dependencies.
  - When NOT to use: If the infra team restricts DB extensions; then app-side UUIDs and compatible DDL must be used.
  - Common mistakes: Assuming `gen_random_uuid()` exists, choosing `ON DELETE CASCADE` without audit considerations.

- Data Protection / Privacy Regulation:
  - Why: Determines whether GitHub usernames and profile URLs are allowed to be stored and for how long.
  - Alternatives: Store only provider IDs (non-human-readable) or store hashes of usernames to reduce PII exposure.
  - When NOT to use: Never store profile images or profile URLs if policy requires strict data minimization.
  - Common mistakes: Treating public profile data as unconstrained; forgetting deletion obligations upon user request.

---

### INTERNAL DOCS TO ADD OR EXTEND

Only add these if Docs Gatekeeper approves PARTIAL coverage extension.

1. Path: /docs/official-docs/EPIC-B/postgresql.md
   - Purpose: Pin the supported PostgreSQL version and list required extensions and DDL compatibility notes.
   - Exact knowledge to add: Postgres version (e.g., 15.x), required extensions (`pgcrypto`/`uuid-ossp`), migration best-practices for `dbgenerated()` usage.
   - Required version pin: e.g., 15.x (to be confirmed by infra). Mark as REQUIRED until pinned.

2. Path: /docs/official-docs/github_api.md
   - Purpose: Canonical reference to GitHub webhook payload fields used by Forgea and token scope requirements for backfills.
   - Exact knowledge to add: Which webhook fields are canonical (`repository.id`, `repository.html_url`, `sender.id`), recommended token scopes (read:org?, repo?), rate-limit handling guidance.
   - Required version pin: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION.

3. Path: /docs/official-docs/privacy-and-retention.md
   - Purpose: Policy for storing third-party account metadata and retention/deletion steps.
   - Exact knowledge to add: Retention window, anonymization strategy, allowed fields to store, access controls, and audit logging requirements.
   - Required version pin: N/A (internal policy) — Docs Gatekeeper to approve content.

---

### OPEN QUESTIONS / AMBIGUITIES (BLOCKERS)

1. Which PostgreSQL major version is authoritative for migrations (infra answer required).
2. Which exact GitHub docs/variant should be treated as canonical for webhook payloads and API behavior (Docs Gatekeeper to pin official URLs).
3. Official retention / deletion policy for external account metadata (Docs Gatekeeper / Legal input required).

---

### MASTER DOCS REGISTRY ACTION

Append the following entry to `/docs/master_docs.md`:

- Date: 2026-02-06
  - Epic / Feature: EPIC-B / B8 — GitHub Mapping Tables
  - Doc path: /docs/docs-gatekeeper/EPIC-B — DATABASE CORE & HARDENING/B8_GitHub Mapping Tables.md
  - Status: ADDED
  - Reason: Docs Gatekeeper brief created to enumerate required official docs and internal doc gaps for GitHub account and repo mapping implementation.
