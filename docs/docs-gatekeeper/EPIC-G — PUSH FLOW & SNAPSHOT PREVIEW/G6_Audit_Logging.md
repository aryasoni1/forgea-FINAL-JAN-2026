FEATURE CONTEXT

- Epic: EPIC-G — PUSH FLOW & SNAPSHOT PREVIEW
- Feature: G6 — Audit Logging
- Exact input files read:
  - /Users/aryasoni/Desktop/Forgea/docs/code-scout/EPIC-G — PUSH FLOW & SNAPSHOT PREVIEW/G6_Audit_Logging.md
  - /Users/aryasoni/Desktop/Forgea/docs/agent_orchestrator_output/EPIC-G — PUSH FLOW & SNAPSHOT PREVIEW/G6_Audit_Logging.md
  - /Users/aryasoni/Desktop/Forgea/forgea-monorepo/packages/audit/src/audit.service.ts
  - /Users/aryasoni/Desktop/Forgea/docs/docs-gatekeeper/EPIC-F — GITHUB INTEGRATION FOR LABS/F8*Push_Tracking*&\_Audit.md
  - /Users/aryasoni/Desktop/Forgea/docs/docs-gatekeeper/EPIC-B — DATABASE CORE & HARDENING/B12_Audit Infrastructure.md
  - /Users/aryasoni/Desktop/Forgea/docs/official-docs-registry.md

REQUIRED OFFICIAL DOCUMENTATION

1. JSON Schema for audit events (event contract)

- Technology: JSON Schema
- Concept: Canonical, versioned JSON Schema for `AuditLog.metadata` and audit events
- Official source: https://json-schema.org/
- Exact version requirement: JSON Schema Draft 2020-12 (must be pinned to this draft)
- Why required: Provides machine-validated, versioned contracts so producers/consumers cannot write incompatible shapes to the audit store.
- Decision it informs: Field-level types, required fields, schema_version bump procedure, size limits, and validator implementation.
- What breaks without it: Cross-service ingestion, analytics pipelines, and forensic tooling will receive inconsistent event shapes leading to processing failures and increased manual triage.

2. Database migration & immutable storage patterns (Prisma / Postgres guidance)

- Technology: Prisma Migrate / PostgreSQL (or repo DB)
- Concept: Safe DDL patterns for append-only tables, backfill/migration guidance, delivery-id deduplication index design
- Official source: https://www.prisma.io/docs/concepts/components/prisma-migrate and https://www.postgresql.org/docs/
- Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION (pin Prisma and Postgres versions used by repo)
- Why required: Ensures migrations preserve append-only guarantees and provide index/constraints needed for deduplication and query performance.
- What breaks without it: Risk of accidental destructive DDL, loss of immutability guarantees, and duplicate audit rows causing forensic ambiguity.

3. Retention & archival policy (legal/compliance guidance + archival tech)

- Technology: Data retention / archival (S3 Glacier or equivalent), organizational compliance rules
- Concept: Retention windows by `AuditAction` class, permitted redaction patterns, archival/export runbook
- Official source: Organizational retention policy or applicable law (e.g., GDPR guidance) and S3/Glacier docs: https://aws.amazon.com/s3/ and https://aws.amazon.com/glacier/
- Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- Why required: Defines how long raw audit events are retained, when they are archived, and what redaction is permitted for PII.
- What breaks without it: Compliance risk, inability to satisfy auditors, and inconsistent retention across EPICs.

4. Sink specification & onboarding (how to deliver audit events to sinks)

- Technology: Internal audit sink interface + any external sinks (S3, SIEM)
- Concept: Audit sink spec describing required fields, delivery semantics, batching, retry/backpressure
- Official source: Internal spec to be created under `/docs/official-docs/EPIC-B/` and any external sink docs (e.g., Splunk, S3)
- Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- Why required: Ensures all sinks receive the canonical minimal fields needed for retention, replay, and forensic analysis.
- What breaks without it: Inconsistent ingestion to downstream analytics and loss of critical fields in exported archives.

5. Rejection / reason codes registry

- Technology: Internal canonical registry (JSON or YAML)
- Concept: Shared registry of rejection and reason codes used by producers and consumers
- Official source: Internal doc to be created under `/docs/official-docs/EPIC-B/audit_reason_codes.md`
- Exact version requirement: N/A (internal)
- Why required: Standardizes semantics for accepted/rejected events and guarantees interpretable reason codes across services.
- What breaks without it: Consumers will misinterpret reasons, tests and alerting will diverge.

EXISTING INTERNAL DOCS (VERIFIED)

- /Users/aryasoni/Desktop/Forgea/forgea-monorepo/packages/audit/src/audit.service.ts — PARTIAL
  - Gap: Implements append-only write primitives and typed `AuditMetadataMap`/`AuditLog` usage, but does not export a versioned JSON Schema or canonical event contract for cross-service enforcement.

- /Users/aryasoni/Desktop/Forgea/docs/docs-gatekeeper/EPIC-F — GITHUB INTEGRATION FOR LABS/F8*Push_Tracking*&\_Audit.md — PARTIAL
  - Gap: Notes webhook and delivery-ID handling but lacks canonical metadata contract and delivery-id deduplication index spec.

- /Users/aryasoni/Desktop/Forgea/docs/docs-gatekeeper/EPIC-B — DATABASE CORE & HARDENING/B12_Audit Infrastructure.md — PARTIAL
  - Gap: Identifies need for canonical schema and retention guidance but does not contain the versioned JSON Schema or migration runbook.

- /Users/aryasoni/Desktop/Forgea/docs/official-docs-registry.md — PARTIAL
  - Gap: Registry references audit policy and retention but lists many items as "to be created"; lacks entries for canonical audit schema, retention runbook, sink spec, and reason-code registry.

DOCUMENTATION COVERAGE DECISION

⚠️ DOCUMENTATION PARTIAL — EXTENSION REQUIRED

List of docs to extend and why:

- `/docs/official-docs/EPIC-B/` must be extended with `audit-log-guidelines.md` (adds canonical, versioned JSON Schema and examples).
- `/docs/official-docs/EPIC-C/` must be extended with `audit_retention_and_archival.md` (retention windows, redaction rules, archival runbook).
- `/docs/official-docs/EPIC-B/` must be extended with `prisma_migrations.md` or `audit_immutable_storage.md` (safe DDL, indexes, backfill strategy).
- `/docs/official-docs/EPIC-B/` must add `audit_sink_spec.md` and `audit_reason_codes.md` (sink onboarding and shared reason code registry).

STUDY GUIDE FOR HUMAN

- `Audit event JSON Schema`:
  - Why this exists: Guarantees a machine-checked contract for producers and consumers.
  - Why alternatives exist: Lightweight ad-hoc validation or TypeScript types exist but are insufficient for cross-service validation.
  - When NOT to use: Don’t replace schema validation with only runtime ad-hoc parsing in critical audit paths.
  - Common mistakes: Not versioning schema, ignoring size limits, embedding PII without redaction rules.

- `Retention & archival policy`:
  - Why this exists: Ensures legal/compliance alignment and reproducible archival procedures.
  - Why alternatives exist: Manual ad-hoc deletion is quicker but non-compliant.
  - When NOT to use: Don’t rely on manual processes for long-term retention.
  - Common mistakes: Missing per-action retention differentiation, no proven restore path.

- `Immutable storage & migrations`:
  - Why this exists: Preserve append-only guarantees, prevent accidental destructive DDL.
  - Why alternatives exist: Soft-delete tables or event stores; but those have different query and retention semantics.
  - When NOT to use: Don’t use mutable update patterns for audit rows.
  - Common mistakes: Missing deduplication indexes, not planning backfills, running destructive ALTERs on production without rollback.

- `Sink spec & onboarding`:
  - Why this exists: Ensure sinks receive the minimal required fields and retry semantics.
  - Why alternatives exist: Custom exporter code per sink (leads to divergence).
  - When NOT to use: Don’t handwave sink contracts for high-integrity exports.
  - Common mistakes: Not specifying delivery semantics, omitting delivery-id, or failing to indicate required schema_version field.

- `Rejection/Reason codes`:
  - Why this exists: Shared semantics for why an event was accepted or rejected.
  - Why alternatives exist: Freeform text reasons (hard to parse/route).
  - When NOT to use: Avoid duplicative, overlapping codes across EPICs.
  - Common mistakes: Re-using numeric codes without registry, lacking human-readable description.

INTERNAL DOCS TO ADD OR EXTEND

1. /docs/official-docs/EPIC-B/audit-log-guidelines.md

- Purpose: Publish canonical, versioned JSON Schema for `AuditLog.metadata`, examples, `schema_version`, and size limits.
- Exact knowledge to add:
  - Full JSON Schema (Draft 2020-12) with `schema_version` top-level property
  - Required top-level fields and typed examples for common `AuditAction` classes
  - Max size guidance for `metadata` (e.g., 64KB suggested) and rationale
  - Schema bump procedure and owner/approval gates
- Required version pin: JSON Schema Draft 2020-12

2. /docs/official-docs/EPIC-C/audit_retention_and_archival.md

- Purpose: Define retention windows, permitted redaction, archival triggers, and restore runbook.
- Exact knowledge to add:
  - Retention table mapping `AuditAction` → retention window (e.g., 90d, 1y, 7y)
  - Redaction rules and allowed PII patterns (what must be hashed/removed)
  - Archival pipeline (S3 prefix layout, encryption requirements, verifiability checks)
  - Owner and compliance sign-off procedure
- Required version pin: Organization retention policy or legal requirement (VERSION UNKNOWN — MUST BE PINNED)

3. /docs/official-docs/EPIC-B/audit_immutable_storage.md (or prisma_migrations.md)

- Purpose: Describe append-only guarantees, DDL constraints, required DB indexes (delivery-id dedup), and backfill/migration plan.
- Exact knowledge to add:
  - Required DB indexes, unique constraints for `delivery_id` and event deduplication
  - Safe DDL recipe (create new table + write-switch, validate, drop old) and sample Prisma migration snippets
  - Backfill strategy and verification queries
  - Owner/approval gates for destructive operations
- Required version pin: Prisma and Postgres versions (VERSION UNKNOWN — MUST BE PINNED)

4. /docs/official-docs/EPIC-B/audit_sink_spec.md

- Purpose: Define how services export events to external sinks and the minimal field set required.
- Exact knowledge to add:
  - Required envelope fields: `schema_version`, `audit_action`, `timestamp`, `service`, `delivery_id`, `metadata`
  - Delivery semantics, batching, retry and DLQ guidance
  - Example sink payloads and subscription onboarding checklist
- Required version pin: N/A (internal)

5. /docs/official-docs/EPIC-B/audit_reason_codes.md

- Purpose: Canonical registry for rejection/reason codes.
- Exact knowledge to add:
  - JSON/YAML registry format, numeric code, short string, description, and consumer impact
  - Owners and process to add new codes
- Required version pin: N/A (internal)

OPEN QUESTIONS / AMBIGUITIES

- What is the production DB vendor and exact versions (Postgres/Prisma versions)? (Blocker for migration recipes)
- Which compliance regimes apply (GDPR, CCPA, other country-specific laws)? (Blocks retention windows)
- Who is the canonical owner for the audit schema and the approval gate for schema_version bumps?
- Which external sinks (SIEM, S3, Splunk) must be supported and what are their ingest constraints?

MASTER DOCS REGISTRY ACTION

Append the following entries to `/docs/master_docs.md` (new entries only):

- /docs/official-docs/EPIC-B/audit-log-guidelines.md — Canonical JSON Schema & examples for `AuditLog.metadata`.
- /docs/official-docs/EPIC-C/audit_retention_and_archival.md — Retention windows, redaction rules, archival runbook.
- /docs/official-docs/EPIC-B/audit_immutable_storage.md — Immutable-storage requirements, Prisma/Postgres migration recipes, dedup indexes.
- /docs/official-docs/EPIC-B/audit_sink_spec.md — Audit sink spec and onboarding checklist.
- /docs/official-docs/EPIC-B/audit_reason_codes.md — Shared rejection/reason code registry.

END OF BRIEF
