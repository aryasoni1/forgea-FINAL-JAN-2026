### FEATURE CONTEXT

- Epic: EPIC-E — LAB CREATION SYSTEM (MANUAL + AI)
- Feature: E12_Storage_and_Organization (Storage and Organization for Lab Definitions)
- Exact input files read:
  - /Users/aryasoni/Desktop/Forgea/docs/agent_orchestrator_output/EPIC-E — LAB CREATION SYSTEM (MANUAL + AI)/E12_Storage_and_Organization.md
  - /Users/aryasoni/Desktop/Forgea/docs/code-scout/EPIC-E — LAB CREATION SYSTEM (MANUAL + AI)/E12_Storage_and_Organization.md


### REQUIRED OFFICIAL DOCUMENTATION

1) Technology: PostgreSQL (JSONB storage)
   - Concept: Relational primary datastore with JSONB columns for full lab definition payloads
   - Official source: https://www.postgresql.org/docs/
   - Exact version requirement: 18.1
   - Why required: Canonical guidance for JSONB indexing, functional indexes, concurrency, and migrations.
   - Decision it informs: Table design, index strategy, and migration patterns.
   - What breaks without it: Poor indexing/performance, incompatible JSONB assumptions, or unsafe migration practices.

2) Technology: JSON Schema (machine-readable schema)
   - Concept: Schema contract for lab definition payloads (validation and example shapes)
   - Official source: https://json-schema.org/specification-links.html#2020-12
   - Exact version requirement: 2020-12
   - Why required: Ensures validator interoperability and precise data contract for API and storage.
   - Decision it informs: Validator implementation, QA tests, and CI schema checks.
   - What breaks without it: Inconsistent validation across services and increased runtime errors.

3) Technology: OpenAPI / REST API contract
   - Concept: API specification for create/read/list/delete operations and pagination
   - Official source: https://spec.openapis.org/oas/v3.1.0
   - Exact version requirement: OpenAPI 3.1.0
   - Why required: Provides canonical request/response shapes, pagination semantics, and example payloads for implementers and clients.
   - Decision it informs: API design, client integration, and automated contract tests.
   - What breaks without it: Divergent API implementations and fragile integrations.

4) Technology: Backup & Restore / DB Migrations Guidance
   - Concept: Backup, restore, and safe migration patterns for Postgres
   - Official source: https://www.postgresql.org/docs/current/backup.html
   - Exact version requirement: Follow Postgres vendor docs matching deployed version (18.1)
   - Why required: Ensures safe schema evolution and recovery strategies for immutable/published lab artifacts.
   - Decision it informs: Migration cadence, rolling changes, and disaster recovery.
   - What breaks without it: Data loss risk and migration-induced downtime.

5) Technology: Data Protection & Retention (legal)
   - Concept: PII handling, retention windows, and access control guidance (GDPR/CCPA)
   - Official source: Organization legal policy / GDPR guidance (pin exact doc)
   - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
   - Why required: Governs retention, access controls, and purge policies for stored lab definitions and snapshots.
   - Decision it informs: Retention periods, access roles, and audit logging requirements.
   - What breaks without it: Compliance risk and unclear retention semantics.


### EXISTING INTERNAL DOCS (VERIFIED)

- Doc path: /Users/aryasoni/Desktop/Forgea/docs/agent_orchestrator_output/EPIC-E — LAB CREATION SYSTEM (MANUAL + AI)/E12_Storage_and_Organization.md
  - Coverage status: PARTIAL
  - Exact gaps: Orchestrator output defines scope and tasks but lacks concrete data model, API contracts, and migration placement guidance.

- Doc path: /Users/aryasoni/Desktop/Forgea/docs/code-scout/EPIC-E — LAB CREATION SYSTEM (MANUAL + AI)/E12_Storage_and_Organization.md
  - Coverage status: PARTIAL
  - Exact gaps: Code-scout summary highlights missing implementer artifacts: DB schema, CRUD APIs, indexing strategy, and CI integration.


### DOCUMENTATION COVERAGE DECISION

⚠️ DOCUMENTATION PARTIAL — EXTENSION REQUIRED

- Docs to add/extend:
  - `/docs/official-docs/EPIC-E/storage_model_v1.md` — human-readable data model and rationale.
  - `/docs/official-docs/EPIC-E/canonical_lab_schema_v1.json` — machine-readable JSON Schema (2020-12) (if not present already).
  - `/docs/official-docs/EPIC-E/api_contracts_openapi_v1.yaml` — OpenAPI 3.1.0 contract for CRUD operations, pagination, and filtering.
  - `/docs/official-docs/EPIC-E/migrations_and_ci.md` — migration placement conventions, example migration file paths, and CI checks to run migrations/tests.
  - `/docs/official-docs/EPIC-E/indexing_and_search.md` — recommended Postgres indexes, JSONB GIN/GIN+expression indexes, and search integration notes.
  - `/docs/official-docs/EPIC-E/cache_and_retention.md` — cache recommendations, snapshot retention, and purge workflows.

Reason: Orchestrator and code-scout outputs identify required implementer deliverables but do not provide the concrete data model, API contracts, or CI/migration guidance necessary for safe implementation and integration.


### STUDY GUIDE FOR HUMAN

- PostgreSQL & JSONB: Why — flexible storage for structured metadata plus full lab JSON; Alternatives — document stores (MongoDB) or object storage with metadata indexing. When NOT to use — extremely high write-throughput small-doc workloads better suited for specialized stores. Common mistakes — missing appropriate GIN indexes, storing large unindexed blobs, and placing mutable fields inside JSON without care for migrations.

- JSON Schema (2020-12): Why — canonical validation contract for lab JSON; Alternatives — Protobufs or strict SQL schemas. When NOT to use — when binary formats or high-performance typed contracts are required. Common mistakes — allowing `additionalProperties` and not pinning versions.

- OpenAPI 3.1.0: Why — machine-readable API contract for client/server interoperability and contract testing. Alternatives — GraphQL or gRPC; choose based on org conventions. Common mistakes — underspecified pagination and omission of error shapes.

- Backup & Migrations: Why — avoid data loss and support schema evolution. Common mistakes — running destructive migrations without backfills or insufficiently tested migration rollbacks.


### INTERNAL DOCS TO ADD OR EXTEND

(Under `/docs/official-docs/EPIC-E/`)

- Path: storage_model_v1.md
  - Purpose: Human-readable data model: tables/columns, JSONB fields, indexes, cardinality, and rationale.
  - Exact knowledge to add: `labs` table schema (id, version, status, metadata JSONB, created_at, published_at), indexes, foreign-key links to `concepts` and `lessons`, and cardinality assumptions.
  - Required version pin: PostgreSQL 18.1

- Path: api_contracts_openapi_v1.yaml
  - Purpose: OpenAPI 3.1.0 contract for CRUD endpoints, listing, filtering, and pagination.
  - Exact knowledge to add: `POST /labs`, `GET /labs/{id}`, `GET /labs?cursor=...&limit=...&filter=...`, `DELETE /labs/{id}`, request/response examples and error shapes.
  - Required version pin: OpenAPI 3.1.0

- Path: migrations_and_ci.md
  - Purpose: Migration file locations, naming conventions (e.g., `migrations/packages/lab-schema/`), and CI checks to run migrations and smoke tests.
  - Exact knowledge to add: migration tooling used (e.g., Prisma/migrations or raw SQL), example migration, and CI job names.
  - Required version pin: Postgres 18.1 guidance

- Path: indexing_and_search.md
  - Purpose: Recommended index recipes for JSONB fields, GIN index patterns, and search integration hooks.
  - Exact knowledge to add: example `CREATE INDEX` statements, index maintenance guidance, and cost/size tradeoffs.
  - Required version pin: Postgres 18.1

- Path: cache_and_retention.md
  - Purpose: Caching layers (short-term cache TTLs), snapshot retention policy, and purge workflows tied to legal retention.
  - Exact knowledge to add: TTL defaults, S3 retention classes, and periodic purge cron jobs.
  - Required version pin: Data Protection & Retention guidance (legal doc)


### OPEN QUESTIONS / AMBIGUITIES (BLOCKERS)

- Preferred primary datastore: Postgres (recommended) vs document store — who signs off on the datastore choice?
- Which migration tool is canonical (Prisma, Flyway, Liquibase)? This affects file locations and CI checks.
- Who owns the `packages/lab-schema` repo area and the migration approval gate for HARD LOCKed artifacts?


### MASTER DOCS REGISTRY ACTION

Append the following entry to `/docs/master_docs.md`:

- Date: 2026-02-14
  - Epic / Feature: EPIC-E / E12 — Storage & Organization
  - Doc path: /docs/docs-gatekeeper/EPIC-E — LAB CREATION SYSTEM (MANUAL + AI)/E12_Storage_and_Organization.md
  - Status: ADDED (EXTEND)
  - Reason: Docs Gatekeeper brief enumerating required official docs and internal doc gaps for lab storage model, API contracts, migrations, and retention.


---
