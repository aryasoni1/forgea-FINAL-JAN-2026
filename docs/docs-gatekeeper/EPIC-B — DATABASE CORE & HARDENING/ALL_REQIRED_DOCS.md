### REQUIRED OFFICIAL DOCUMENTATION

For safe, auditable Database Setup we require authoritative, version-pinned official docs for the technologies below. Where a version is unknown, implementation must pause until the version is pinned.

- Technology: PostgreSQL
  - Concept: Server provisioning, CREATE DATABASE, timezone configuration, extensions management (CREATE EXTENSION)
  - Official source: https://www.postgresql.org/docs/
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: Correct SQL syntax and supported extension names differ between server major versions; timezone behavior and extension packaging vary across Postgres releases.
  - What decision it informs: Which extension to enable (`pgcrypto` vs `uuid-ossp`), SQL to set `timezone = 'UTC'`, and supported features for triggers and functions.
  - What breaks without it: Migrations may fail, extensions may be unavailable, and timezone semantics may differ leading to production data errors.

- Technology: Prisma (migrations & schema)
  - Concept: Prisma Migrate, schema.prisma semantics, migration SQL generation
  - Official source: https://www.prisma.io/docs
  - Exact version requirement: 7.3.0 (repo dependency: `prisma` ^7.3.0 / `@prisma/client` ^7.3.0)
  - Why required: Planner needs exact Prisma behavior to author migration steps and to coordinate shadow DB creation and migration ordering.
  - What decision it informs: Migration strategy (SQL-first vs Prisma migrate), how to represent extensions or external pointers in schema, and how to generate safe DDL.
  - What breaks without it: Generated SQL may be incompatible with the DB server or with repo CI migration choreography.

- Technology: PostgreSQL extension docs (pgcrypto / uuid-ossp)
  - Concept: Server-side UUID generation and cryptographic functions
  - Official source: https://www.postgresql.org/docs/current/pgcrypto.html and https://www.postgresql.org/docs/current/uuid-ossp.html
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED TO THE POSTGRES MAJOR RELEASE CHOSEN
  - Why required: Planner must know extension names and function availability to write `CREATE EXTENSION` steps in migrations or provisioning.
  - What decision it informs: Whether to rely on DB-side UUID generation vs client-side, and whether migration scripts must include `CREATE EXTENSION`.
  - What breaks without it: Migration failure or runtime errors when calling unavailable extension functions.

- Technology: Infrastructure provisioning (Terraform / Docker Compose)
  - Concept: Infrastructure-as-code for creating Postgres instances and DBs (dev/prod), securing credentials
  - Official sources:
    - Terraform: https://www.terraform.io/docs
    - Docker Compose: https://docs.docker.com/compose/
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: Planner must prescribe reproducible provisioning steps and CI-run provisioning constraints.
  - What decision it informs: Whether to add a Terraform module, Docker Compose dev DB, or managed cloud DB operator; also influences secrets handling.
  - What breaks without it: Non-repeatable provisioning, drift between environments, and insecure secrets handling.

---

### DOCUMENTATION COVERAGE DECISION

⚠️ DOCUMENTATION PARTIAL — EXTENSION REQUIRED

Documents to extend or add:

- `/docs/official-docs/EPIC-B/postgresql.md` — pin PostgreSQL major version and include links to timezone configuration and extension management for that exact version.
- `/docs/official-docs/EPIC-B/prisma-migrations.md` — pin Prisma `7.3.0` and document migration workflow used by this repo (shadow DB behavior, migration SQL review steps).
- `/docs/official-docs/EPIC-B/db-provisioning.md` — include Terraform/Docker Compose patterns approved for dev/prod and exact pins for tooling.

Reason: Internal artifacts exist (Prisma schema + migrations), but authoritative official references for Postgres and extension behavior are missing or unpinned. Planner cannot safely author create-extension or timezone enforcement steps until versions are pinned.

### INTERNAL DOCS TO ADD OR EXTEND (required)

Only include these if coverage is PARTIAL or MISSING (it is).

- Path: /docs/official-docs/EPIC-B/postgresql.md
  - Purpose: Authoritative Postgres guidance for EPIC-B tasks: pin major version, include `CREATE EXTENSION` examples, timezone enforcement, and trigger semantics for that version.
  - Exact knowledge to add: Exact `CREATE EXTENSION` commands, sample `postgresql.conf` or `ALTER DATABASE ... SET timezone = 'UTC'`, and notes about managed DBs (RDS/Azure) differences.
  - Required version pin: VERSION REQUIRED — choose a minor/major (e.g., 15.x or 18.x) before planning.

- Path: /docs/official-docs/EPIC-B/prisma-migrations.md
  - Purpose: Document the repo's Prisma version (`7.3.0`) and the migration workflow (shadow DB, generate SQL review, apply order), and how to include raw SQL `CREATE EXTENSION` steps where needed.
  - Exact knowledge to add: `prisma migrate` commands, `schema.prisma` patterns for raw SQL migrations, and CI checks for migrations.
  - Required version pin: 7.3.0

- Path: /docs/official-docs/EPIC-B/db-provisioning.md
  - Purpose: Provide approved IaC patterns for dev/prod DB provisioning (Terraform module examples and Docker Compose dev setup), and secrets handling guidance.
  - Exact knowledge to add: sample Terraform module usage, required cloud provider IAM roles, dev `docker-compose.yml` snippet, and vault/secret rotation guidance.
  - Required version pin: VERSION UNKNOWN — MUST PIN Terraform and Docker Compose tool versions.

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

### DOCUMENTATION COVERAGE DECISION

⚠️ DOCUMENTATION PARTIAL — EXTENSION REQUIRED

Docs to extend:

- `/docs/official-docs/EPIC-B/prisma_official.md` — Add pinned official links and migration guidance.
- `/docs/official-docs/EPIC-B/prisma_migrations.md` — Document migration locking, shadow DB usage, and production promotion flow.

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

### REQUIRED OFFICIAL DOCUMENTATION

- Technology: Prisma
  - Concept: Schema modelling (enums, unique constraints, relations)
  - Official source: https://www.prisma.io/docs
  - Exact version requirement: 7.3.0
  - Why required: Ensures model definitions (enums, unique constraints, FK behavior) are implemented according to Prisma semantics; informs migration SQL generation.
  - Decision it informs: Whether to accept existing `Account`/`Session` naming vs the requested `AuthIdentity`/`AuthSession` naming and how to apply migrations safely.
  - What breaks without it: Misapplied migrations, duplicate tables, or broken auth flows.

---

### DOCUMENTATION COVERAGE DECISION

⚠️ DOCUMENTATION PARTIAL — EXTENSION REQUIRED

Docs to add/extend:

- `/docs/tasks/task-B3-<YYYY-MM-DD>.md` (planner) — Define required schema changes, migration strategy, and acceptance criteria.

---

### INTERNAL DOCS TO ADD OR EXTEND

- Path: `/docs/tasks/task-B3-<YYYY-MM-DD>.md`
  - Purpose: Planner task doc that prescribes exactly how to adapt `schema.prisma` to meet EPIC-B requirements (enum values, models, constraints), the migration steps (copy, backfill, swap, retire), and verification criteria.
  - Exact knowledge to add:
    - Decision: rename vs additive migration strategy with step-by-step SQL/Prisma migration guidance.
    - Required schema changes: Add `authProvider` enum (`EMAIL, GOOGLE, GITHUB`), ensure `UserRole` includes `USER` (rename `CANDIDATE`→`USER` if approved), add `createdAt`/`updatedAt` to `User`.
    - Migration safety: Preserve `Account`/`Session` data until new models are verified; provide rollback steps.
  - Required version pin: `prisma`/`@prisma/client` 7.3.0.

---

### REQUIRED OFFICIAL DOCUMENTATION

- Technology: Prisma
  - Concept: Schema modelling (JSON fields, enums, relations, migrations)
  - Official source: https://www.prisma.io/docs
  - Exact version requirement: 7.3.0
  - Why required: Guides correct modelling of JSON columns, enums, relations and migration-safe patterns for versioned content.
  - Decision it informs: Data modelling choices for `Lesson`/`LessonVersion`, whether to store immutable snapshots as JSONB, and how to enforce ordering.
  - What breaks without it: Misuse of JSON fields, incorrect migration SQL, or incompatible generated client behavior.

- Technology: PostgreSQL
  - Concept: JSONB column semantics and indexing
  - Official source: https://www.postgresql.org/docs/
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: Implementation choices (JSON vs JSONB, GIN indexes) depend on Postgres features and version; informs storage and query patterns.
  - What breaks without it: Suboptimal performance or invalid assumptions about JSON operator availability.

---

### DOCUMENTATION COVERAGE DECISION

⚠️ DOCUMENTATION PARTIAL — EXTENSION REQUIRED

Docs to add:

- `/docs/tasks/task-B4-<YYYY-MM-DD>.md` — Planner must author the task doc defining schema, enums, migration strategy, and verification criteria.

---

### INTERNAL DOCS TO ADD OR EXTEND

- Path: `/docs/tasks/task-B4-<YYYY-MM-DD>.md`
  - Purpose: Planner task doc to define `Lesson` and `LessonVersion` schema, enums, indexing (JSONB/Gin), migration steps, and acceptance criteria.
  - Exact knowledge to add:
    - Concrete Prisma model definitions for `Lesson` and `LessonVersion` (fields, enums, relations).
    - Indexing recommendations for `slug` uniqueness and JSONB query patterns.
    - Migration strategy: create new models, backfill existing data if any, and verify ordering and immutability invariants.
  - Required version pin: `prisma`/`@prisma/client` 7.3.0 and Postgres version pin (TBD).

### REQUIRED OFFICIAL DOCUMENTATION

- Technology: Prisma
  - Concept: Schema modelling, relations, enums, and migrations
  - Official source: https://www.prisma.io/docs
  - Exact version requirement: 7.3.0
  - Why required: Authoritative guidance for model design, migration-safe patterns (rename vs additive), and generated client compatibility.
  - Decision it informs: Whether to repurpose `constraints` -> `config`, how to add `LabVersion` snapshots safely, and migration strategies.
  - What breaks without it: Incorrect migrations, duplicate tables, or runtime client mismatches.

- Technology: PostgreSQL
  - Concept: JSONB storage, indexing, and constraints
  - Official source: https://www.postgresql.org/docs/
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: Decisions about JSONB vs JSON, GIN indexing, and performance characteristics depend on Postgres version.
  - What breaks without it: Suboptimal queries or use of unavailable JSON features.

---

### DOCUMENTATION COVERAGE DECISION

⚠️ DOCUMENTATION PARTIAL — EXTENSION REQUIRED

Docs to add:

- `/docs/tasks/task-B5-<YYYY-MM-DD>.md` — Planner must author the task doc defining exact schema changes, migration/backfill steps, triggers for immutability, and verification criteria.

### INTERNAL DOCS TO ADD OR EXTEND

- Path: `/docs/tasks/task-B5-<YYYY-MM-DD>.md`
  - Purpose: Planner task doc that prescribes exact Prisma model changes, migrations, backfill strategy, and acceptance tests.
  - Exact knowledge to add:
    - Concrete Prisma model updates (field names, types, enums, uniqueness constraints) including `slug`, `difficulty`, `estimatedTime`, `config: Json`, `createdAt`/`updatedAt`.
    - `LabVersion` model definition (id, labId FK, versionNumber, snapshot Json, createdAt) and constraints for ordering/uniqueness.
    - Migration/backfill steps: create new columns/models, backfill `slug` and `difficulty`, copy `constraints`->`config` if chosen, validate, then remove legacy artifacts if applicable.
    - DB triggers or constraints to enforce immutability of `LabVersion` (e.g., trigger preventing UPDATE/DELETE) and ordering (unique composite on `(labId, versionNumber)`).
  - Required version pin: `prisma`/`@prisma/client` 7.3.0; Postgres version pin (TBD).

### REQUIRED OFFICIAL DOCUMENTATION

- Technology: Prisma
  - Concept: Relations, uniqueness constraints, JSON storage and migrations
  - Official source: https://www.prisma.io/docs
  - Exact version requirement: 7.3.0
  - Why required: Guides safe schema changes (adding `LabVersion`, changing uniqueness), migration-safe patterns for renames vs additive changes, and appropriate JSON column usage.
  - Decision it informs: Whether to extend `VerificationLog` or create `VerificationAttempt`, how to remove unique constraints safely, and migration/backfill steps.
  - What breaks without it: Risky schema changes that break production invariants or generated client compatibility.

- Technology: PostgreSQL
  - Concept: JSONB vs Text for logs, indexing, and immutability enforcement via triggers
  - Official source: https://www.postgresql.org/docs/
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: Choosing JSONB for structured logs and indexing decisions depends on Postgres version and features.
  - What breaks without it: Incorrect assumptions about JSON functions, index availability, or performance characteristics.

---

### DOCUMENTATION COVERAGE DECISION

⚠️ DOCUMENTATION PARTIAL — EXTENSION REQUIRED

Docs to add:

- `/docs/tasks/task-B6-<YYYY-MM-DD>.md` — Planner must author task doc detailing schema changes, migration steps, and acceptance criteria.

---

### INTERNAL DOCS TO ADD OR EXTEND

- Path: `/docs/tasks/task-B6-<YYYY-MM-DD>.md`
  - Purpose: Planner task doc prescribing exact schema changes and migration strategy.
  - Exact knowledge to add:
    - Option A (extend): Remove unique constraint on `VerificationLog.sessionId`, add `result` enum (`PASS`, `FAIL`), add `createdAt` and optional `attemptNumber`, and retain table name.
    - Option B (new model): Create `VerificationAttempt` (id, sessionId FK, commitSha, result enum, logs Json/ Text, createdAt), migrate existing `VerificationLog` rows into attempts, and either retire or keep `VerificationLog` as an audit table.
    - Add `LabVersion` model and `labVersionId` FK on `LabSession`, with backfill guidance using `repoVersion`/`baseRepoUrl` mapping.
    - Migration safety notes: coordinate with immutability triggers (existing migrations add immutability), perform copy-backups, run migration in a maintenance window if required, and provide rollback SQL.
  - Required version pin: `prisma`/`@prisma/client` 7.3.0; Postgres version pin (TBD).

---

Referencing /docs/code-scout/EPIC-B — DATABASE CORE & HARDENING/B7_Proof & Evidence Storage.md

- `storage-options:` https://learn.microsoft.com/en-us/azure/architecture/guide/technology-choices/data-storage — `approved`
- `metadata-vs-payload:` https://docs.aws.amazon.com/AmazonS3/latest/userguide/UsingMetadata.html — `approved`
- `allowed-artifact-types:` missing — `missing`
- `compliance-retention:` https://docs.aws.amazon.com/AmazonS3/latest/userguide/object-lock.html — `approved`

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

### DOCUMENTATION COVERAGE DECISION

⚠️ DOCUMENTATION PARTIAL — EXTENSION REQUIRED

Docs to extend or add (brief):

- Extend `/docs/official-docs-registry.md` to include GitHub API/webhooks and Data Protection references with explicit version pins or notes.
- Add `/docs/official-docs/EPIC-B/postgresql.md` with the pinned Postgres version and required extensions.
- Add `/docs/official-docs/privacy-and-retention.md` with retention timelines, deletion semantics, and guidance on storing third-party account identifiers.

---

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

---

## REQUIRED OFFICIAL DOCUMENTATION

For each concept below I list the authoritative source and pinning requirement.

1. Technology: Prisma (schema & migrations)

- Concept: Prisma schema reference & Prisma Migrate migration patterns
- Official source: https://www.prisma.io/docs
- Exact version requirement: 7.3.0 (prisma/@prisma/client pin seen in registry)
- Why required: Defines canonical schema language, migration generation, and how `schema.prisma` maps to SQL (required for migration plan and safe DDL for immutable audit logs).
- What decision it informs: Migration ordering, safe `NOT NULL` additions, JSON storage mapping, and client usage for runtime feature checks.
- What breaks without it: Risky migration DDL, client/server mismatch, and unsafe schema evolution that could violate immutability triggers.

2. Technology: PostgreSQL (server semantics, triggers, JSONB behavior)

- Concept: PostgreSQL DDL, trigger behavior, JSON/JSONB storage semantics
- Official source: https://www.postgresql.org/docs/
- Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- Why required: Immutability enforcement uses DB triggers; exact trigger/transaction semantics vary by Postgres version and extensions.
- What decision it informs: Trigger implementation details, extension availability (pgcrypto, uuid), and backfill transaction strategy.
- What breaks without it: Trigger incompatibilities, migration failures, unexpected JSONB behavior during backfill.

3. Technology: Audit / Logging guidance

- Concept: Logging and audit best practices (what to capture, retention, immutability and redaction guidance)
- Official source: OWASP Logging Cheat Sheet — https://cheatsheetseries.owasp.org/cheatsheets/Logging_Cheat_Sheet.html
- Exact version requirement: NO FORMAL VERSION — review and accept before implementation
- Why required: Determines minimum fields, PII handling, retention and redaction policies for `AuditLog` metadata.
- What decision it informs: Fields to store, retention/archival policy, redaction rules, and compliance expectations.
- What breaks without it: Non-compliant logging, accidental PII exposure, or inconsistent audit records across producers.

4. Technology: Feature Flag / Toggle Patterns

- Concept: Canonical feature toggle patterns (release toggles, ops toggles, permission toggles) and rollout strategies
- Official source: Martin Fowler — Feature Toggles (https://martinfowler.com/articles/feature-toggles.html) and LaunchDarkly patterns (https://docs.launchdarkly.com/)
- Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- Why required: Defines runtime semantics for flags (boolean vs gradual), expected evaluation latency, and SDK vs DB-backed patterns.
- What decision it informs: Whether to implement a DB-backed `FeatureFlag` table vs adopt an external system, rollout strategies, and SDK integration points.
- What breaks without it: Confusion over semantics (per-user vs global), brittle rollouts, and inconsistent behavior across services.

---

---

## DOCUMENTATION COVERAGE DECISION

⚠️ DOCUMENTATION PARTIAL — EXTENSION REQUIRED

- Reason: Core canonical inputs (Prisma docs) exist, but internal docs and registry lack pinned Postgres version, a formal Feature Flag policy, a documented AuditLog event schema and retention policy, and a migration/backfill plan for immutable audit tables.
- Docs to extend: `/docs/official-docs/EPIC-B/prisma_migrations.md` (add immutable table & backfill patterns), add `/docs/official-docs/EPIC-B/feature-flags.md`, and `/docs/official-docs/EPIC-B/audit-log-guidelines.md`.

---

## INTERNAL DOCS TO ADD OR EXTEND (required items)

Only include these if coverage is PARTIAL or MISSING.

1. Path: /docs/official-docs/EPIC-B/feature-flags.md

- Purpose: Canonical Feature Flag policy for EPIC-B and consumers.
- Exact knowledge to add:
  - `FeatureFlag` schema (see task doc spec) and migration plan
  - Runtime evaluation semantics (global boolean, per-actor targeting, gradual rollout)
  - Recommendation on external solution vs DB-backed flags
  - SDK integration points and environment config keys
  - Rollout and rollback guidance
- Required version pin: `Postgres` version (see registry) and `Prisma 7.3.0`

2. Path: /docs/official-docs/EPIC-B/audit-log-guidelines.md

- Purpose: Standardize event schema, retention, redaction, and archival.
- Exact knowledge to add:
  - Canonical audit event JSON schema (top-level keys, size limits)
  - Redaction rules for PII
  - Retention and archival pipeline (how/where to archive older records)
  - Interaction with DB immutability triggers and restrictions for future migrations
- Required version pin: `Postgres` version, `Prisma 7.3.0`

3. Path: /docs/official-docs/EPIC-B/prisma_migrations.md (extend)

- Purpose: Add explicit guidance for modifications to immutable audit tables, safe backfills, and trigger-aware migrations.
- Exact knowledge to add:
  - Safe pattern for adding non-nullable columns (create nullable, backfill in batches, set NOT NULL)
  - How to alter triggers safely and migration ordering
  - Downgrade strategies
- Required version pin: `Prisma 7.3.0`, and pinned `Postgres` version.

---

### REQUIRED OFFICIAL DOCUMENTATION

For safe implementation, the following official sources must be read and pinned.

- Technology: PostgreSQL
  - Concept: Enum/Type migrations, transaction-safe DDL, backfill strategies
  - Official source: https://www.postgresql.org/docs/
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: Implements enum changes and data backfills required when moving `tier` from `User` to a new `Subscription` table; informs migration strategy and downtime risk.
  - Decision it informs: Safe migration steps, whether to use Postgres enum type or text-backed canonical values, and lock / downtime expectations.
  - What breaks without it: Risk of non-atomic enum changes, broken migrations in production, accidental data loss.

- Technology: Prisma (ORM & Migrations)
  - Concept: Schema modelling, enum mapping, migration SQL artifacts and backfill patterns
  - Official source: https://www.prisma.io/docs
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: Must coordinate Prisma schema changes, generate safe migrations, and understand how Prisma represents enums vs DB enums.
  - Decision it informs: Whether to change Prisma enum values vs mapping approach, and how to ship backfill SQL.
  - What breaks without it: Invalid client code, broken generated types, failed migrations.

- Technology: Billing Provider API (e.g., Stripe)
  - Concept: Subscription objects, webhook payloads, idempotency, reconciliation flows
  - Official source: https://stripe.com/docs/api
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: Webhook formats and reconciliation guidance determine what provider metadata to store and how to respond to events.
  - Decision it informs: Storage schema for provider IDs (e.g., `stripeSubscriptionId`), webhook handler shape, audit event hooks.
  - What breaks without it: Incorrect webhook handling, reconciliation errors, billing outages or double-charges.

- Technology: Data Protection / Privacy Regs (GDPR)
  - Concept: Retention rules for PII and external account metadata
  - Official source: https://eur-lex.europa.eu/eli/reg/2016/679/oj
  - Exact version requirement: N/A (regulation)
  - Why required: Determines what provider metadata may be stored, retention durations, and deletion policy.
  - Decision it informs: Metadata retention fields, purge flows, and audit requirements.
  - What breaks without it: Non-compliance risk.

---

--

### DOCUMENTATION COVERAGE DECISION

⚠️ DOCUMENTATION PARTIAL — EXTENSION REQUIRED

Docs to extend:

- `/docs/official-docs/EPIC-B/prisma_migrations.md` — add enum-change patterns, Prisma-to-DB enum mapping guidance, and safe backfill SQL templates.
- `/docs/official-docs/EPIC-B/postgresql.md` — pin supported Postgres version and include guidance for altering enums and zero-downtime strategies.
- `/docs/official-docs/billing-provider.md` — new doc to pin provider (e.g., Stripe) API version, webhook shape, and reconciliation guidance.

---

### INTERNAL DOCS TO ADD OR EXTEND

Only include when coverage is PARTIAL (see above).

- Canonical path: /Users/aryasoni/Desktop/Forgea/docs/official-docs/EPIC-B/prisma_migrations.md
  - Purpose: Document Prisma enum migration patterns, examples of adding/removing enum values, how to generate migration SQL, and backfill templates.
  - Exact knowledge to add: Example SQL for creating a `Subscription` table, backfill SQL from `User.tier`, transaction-safe steps, rollback guidance.
  - Required version pin: Prisma CLI & Client version used in repo (VERSION MUST BE PINNED).

- Canonical path: /Users/aryasoni/Desktop/Forgea/docs/official-docs/EPIC-B/postgresql.md
  - Purpose: Pin Postgres minor version and document DDL behavior, enum recommendations, and zero-downtime patterns.
  - Exact knowledge to add: `ALTER TYPE` behavior, using new table + FK swap pattern, trigger-based gradual migration.
  - Required version pin: PostgreSQL minor version in infra (VERSION MUST BE PINNED).

- Canonical path: /Users/aryasoni/Desktop/Forgea/docs/official-docs/billing-provider.md
  - Purpose: Pin provider (Stripe) API version, webhook spec, idempotency expectations, and recommended reconciliation flows.
  - Exact knowledge to add: Provider API base URL, required webhook signature verification steps, example event types to handle, and retention guidance for provider metadata.
  - Required version pin: Provider API version (VERSION MUST BE PINNED).

---

- `postgres-triggers:` missing — missing
- `append-only-patterns:` missing — missing
- `disaster-recovery:` missing — missing

Note: `/docs/official-docs-registry.md` contains a PostgreSQL entry (https://www.postgresql.org/docs/) but its version is `VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION` and must be pinned before the planner uses it verbatim.

Handoff complete. Provide this report verbatim to the next agent.

### REQUIRED OFFICIAL DOCUMENTATION

For safe, auditable implementation the following external references should be added to the official registry and pinned.

- Technology: NIST
  - Concept: Log management / audit logging guidance (NIST SP 800-92)
  - Official source: https://nvlpubs.nist.gov/nistpubs/Legacy/SP/nistspecialpublication800-92.pdf
  - Exact version requirement: NIST SP 800-92 (2006)
  - Why required: Authoritative guidance on collection, storage, and retention of system logs and audit telemetry.
  - Decision it informs: Log retention, secure storage, access controls, and reconstruction procedures for forensic audits.
  - What breaks without it: Weak or non-forensic log collection, unclear retention and access policies.

- Technology: PCI Council / PCI-DSS
  - Concept: Audit and logging requirements for payment card environments
  - Official source: https://www.pcisecuritystandards.org
  - Exact version requirement: PCI DSS v4.0 (pin before implementation)
  - Why required: If system processes cardholder data or billing touches card flows, PCI prescribes specific logging and retention controls.
  - Decision it informs: Which events must be logged, retention windows, and integrity controls for logs involving payments.
  - What breaks without it: Non-compliance risk and failed payment-card audits.

- Technology: AICPA / SOC 2
  - Concept: Trust Services Criteria for security, availability, and confidentiality (audit expectations)
  - Official source: https://www.aicpa.org/interestareas/frc/assuranceadvisoryservices/soc2report.html
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: Sets auditor expectations for audit log completeness, immutability, and access control for services subject to SOC 2.
  - Decision it informs: Minimum event types, segregation of duties, and retention required by auditors.
  - What breaks without it: Unexpected auditor findings; inability to demonstrate compliance.

- Technology: ISO / Information Security
  - Concept: Audit logging and monitoring controls (ISO/IEC 27001)
  - Official source: https://www.iso.org/standard/54534.html
  - Exact version requirement: ISO/IEC 27001:2013 (pin if another edition is required)
  - Why required: Organizational controls and policy baseline for security and audit requirements.
  - Decision it informs: Organizational retention, policy-driven access, and incident response requirements.
  - What breaks without it: Misaligned org-level policies and audit expectations.

- Technology: Elastic / Logging Schema
  - Concept: Canonical event schema for logs (Elastic Common Schema — ECS)
  - Official source: https://www.elastic.co/guide/en/ecs/current/index.html
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: Provides a practical JSON-schema-style field set for consistent event fields, easing search and cross-service correlation.
  - Decision it informs: Field names for `metadata`, timestamp conventions, and normalization rules for `AuditLog.metadata`.
  - What breaks without it: Inconsistent metadata shapes across producers, harder search and aggregation.

---

### DOCUMENTATION COVERAGE DECISION

⚠️ DOCUMENTATION PARTIAL — EXTENSION REQUIRED

Which docs must be extended:

- `/docs/official-docs/EPIC-B/audit-log-guidelines.md` — NEW (required): canonical JSON Schema for `AuditLog.metadata`, required top-level fields, field size limits, PII redaction rules, and severity mapping.
- `/docs/official-docs/EPIC-B/prisma_migrations.md` — EXTEND: add immutable audit table migration/backfill and retention/archival patterns.
- `/docs/official-docs/billing-provider.md` — EXTEND: call out PCI logging requirements for payment-related events if billing will handle cardholder data.

### INTERNAL DOCS TO ADD OR EXTEND

- Canonical path: /Users/aryasoni/Desktop/Forgea/docs/official-docs/EPIC-B/audit-log-guidelines.md
  - Purpose: Single source-of-truth JSON Schema (example .json) for `AuditLog.metadata`, required fields (`action`, `actor`, `resource`, `severity`, `timestamp`), field size limits, redaction rules, and sample producer code.
  - Exact knowledge to add: JSON Schema file, example Prisma audit model, recommended ECS mapping, truncation policy, and retention/archival steps.
  - Required version pin: Link to chosen ECS version and to NIST/PCI references (versions pinned above).

- Canonical path: /Users/aryasoni/Desktop/Forgea/docs/official-docs/EPIC-B/audit-compliance-refs.md
  - Purpose: Collect SOC2, PCI-DSS, NIST references with implementation notes and what to provide to auditors.
  - Exact knowledge to add: Exact sections of each external spec relevant to logging, sample evidence artifacts, and recommended retention durations.
  - Required version pin: PCI DSS v4.0 and pinned NIST/SOC2 references.

---

eference: /docs/code-scout/EPIC-B — DATABASE CORE & HARDENING/B13_Environment Safety.md

- `secrets-management:` https://www.vaultproject.io/docs — missing
- `env-manifest:` https://github.com/motdotla/dotenv — approved
- `credential-rotation:` https://docs.aws.amazon.com/secretsmanager/latest/userguide/rotate-secrets.html — missing

Handoff complete. Provide this report verbatim to the next agent.
