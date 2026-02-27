FEATURE CONTEXT

- Epic: EPIC-G — PUSH FLOW & SNAPSHOT PREVIEW
- Feature: G12 — Snapshot Lifecycle Management
- Exact input files read:
  - /Users/aryasoni/Desktop/Forgea/docs/code-scout/EPIC-G — PUSH FLOW & SNAPSHOT PREVIEW/G12_Snapshot_Lifecycle_Management.md
  - /Users/aryasoni/Desktop/Forgea/docs/docs-gatekeeper/EPIC-E — LAB CREATION SYSTEM (MANUAL + AI)/E7_Snapshot_and_Preview_Planning_Lab-Side.md
  - /Users/aryasoni/Desktop/Forgea/docs/docs-gatekeeper/EPIC-E — LAB CREATION SYSTEM (MANUAL + AI)/E12_Storage_and_Organization.md
  - /Users/aryasoni/Desktop/Forgea/docs/master_docs.md
  - /Users/aryasoni/Desktop/Forgea/docs/official-docs-registry.md

REQUIRED OFFICIAL DOCUMENTATION

1. Snapshot metadata schema (canonical JSON Schema)

- Technology: JSON Schema
- Concept: Versioned snapshot metadata schema for deterministic capture and replay
- Official source: https://json-schema.org/
- Exact version requirement: JSON Schema Draft 2020-12 (must be pinned)
- Why required: Enforces deterministic metadata fields, seeds, timestamps, and allowed redaction so snapshots are reproducible and safe.
- Decision it informs: Field-level contract, `schema_version`, size limits, and producer validation rules.
- What breaks without it: Inconsistent snapshots, unreproducible previews, and risk of leaking secrets.

2. Storage backend decision & object-store guidance

- Technology: S3-compatible storage (or approved internal blobstore)
- Concept: Approved backend, encryption, immutability semantics, object layout, and lifecycle rules
- Official source: AWS S3 docs or chosen blobstore docs
- Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- Why required: Determines immutability guarantees, archival path, and access-control enforcement.
- What breaks without it: Divergent implementations, incompatible immutability semantics, and inconsistent archival.

3. Retention & deletion compliance guidance

- Technology: Data retention policy / legal guidance (GDPR, CCPA as applicable)
- Concept: Retention windows per snapshot class, redaction rules, and retention-runbook
- Official source: Internal retention policy / legal counsel & applicable regional laws
- Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- Why required: Sets retention windows and deletion obligations for compliance and operational safety.
- What breaks without it: Compliance risk and inability to provide legally-mandated deletion or retention evidence.

4. Migration & DB schema patterns for snapshot tables

- Technology: Prisma Migrate / PostgreSQL migration guidance
- Concept: Safe DDL patterns for write-once snapshot records, backfill strategies, and index recommendations
- Official source: Prisma docs and Postgres docs
- Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- Why required: Ensures DB-side immutability, efficient queries for snapshot lookup, and safe backfills.
- What breaks without it: Risk of accidental mutation of snapshot rows and operational danger during schema changes.

5. QA & CI test guidance for determinism and masking

- Technology: CI job definitions and test harness guidance
- Concept: CI job names, test vectors, and acceptance criteria to validate snapshot determinism and masking
- Official source: Internal CI policy (to be created) and existing CI conventions
- Exact version requirement: N/A (internal)
- Why required: Automates verification that snapshots are deterministic and sanitized before retention.
- What breaks without it: Undetected PII leaks and non-reproducible snapshots in production.

EXISTING INTERNAL DOCS (VERIFIED)

- /Users/aryasoni/Desktop/Forgea/docs/code-scout/EPIC-G — PUSH FLOW & SNAPSHOT PREVIEW/G12_Snapshot_Lifecycle_Management.md — PARTIAL
  - Gap: Identifies required deliverables and risks but does not provide canonical schemas or runbooks.

- /Users/aryasoni/Desktop/Forgea/docs/docs-gatekeeper/EPIC-E — LAB CREATION SYSTEM (MANUAL + AI)/E7_Snapshot_and_Preview_Planning_Lab-Side.md — PARTIAL
  - Gap: Planning guidance exists (semantics, masking, retention topics) but is not a pinned, versioned spec.

- /Users/aryasoni/Desktop/Forgea/docs/docs-gatekeeper/EPIC-E — LAB CREATION SYSTEM (MANUAL + AI)/E12_Storage_and_Organization.md — PARTIAL
  - Gap: References cache/retention topics; lacks storage-backend decision and runbooks.

- /Users/aryasoni/Desktop/Forgea/docs/master_docs.md — PARTIAL
  - Gap: Registry references snapshot docs but canonical files are missing.

- /Users/aryasoni/Desktop/Forgea/docs/official-docs-registry.md — PARTIAL
  - Gap: Snapshot storage and retention placeholders exist; required official docs are not yet authoritatively listed with versions.

DOCUMENTATION COVERAGE DECISION

⚠️ DOCUMENTATION PARTIAL — EXTENSION REQUIRED

List of docs to extend and why:

- `/docs/official-docs/EPIC-E/snapshot_semantics_v1.md` — Publish canonical, versioned snapshot metadata schema and deterministic-capture rules.
- `/docs/official-docs/EPIC-E/snapshot_storage_and_retention.md` — Record storage backend decision, retention windows, and archival/export runbook.
- `/docs/official-docs/EPIC-E/snapshot_deletion_and_audit.md` — Deletion safety, tamper-evident audit events, and scheduled purge behavior.
- `/docs/official-docs/EPIC-E/qa_snapshot_tests.md` — CI/QA acceptance tests for determinism and masking.
- `/docs/official-docs/EPIC-E/snapshot_registry.md` — Registry/manifest listing schema_versions and HARD LOCK owner.

STUDY GUIDE FOR HUMAN

- `Snapshot metadata schema`:
  - Why this exists: To ensure deterministic captures, reproducibility, and safe redaction.
  - Why alternatives exist: Lightweight ad-hoc formats exist but do not provide cross-service validation.
  - When NOT to use: Do not allow ad-hoc fields without schema_version; avoid embedding secrets.
  - Common engineering mistakes: Leaving unversioned metadata, no capture-seed, storing runtime secrets, or missing createdAt timestamps.

- `Storage & retention`:
  - Why this exists: To standardize immutability, archival, and access control.
  - Why alternatives exist: Local disk or database blobs; but these often lack durable lifecycle management.
  - When NOT to use: Don’t store long-lived snapshots in ephemeral storage or mutable tables.
  - Common mistakes: No encryption at rest, no object versioning, ambiguous ACLs.

- `Deletion & audit`:
  - Why this exists: To provide tamper-evident deletion records and safe orphan cleanup.
  - Why alternatives exist: Manual deletion logs (not recommended) — automation ensures consistency.
  - When NOT to use: Don’t rely solely on soft-delete flags without audit events and verification.
  - Common mistakes: Deleting without audit, incomplete orphan cleanup, missing verification of archive integrity.

- `QA / Determinism tests`:
  - Why this exists: To prevent regression where snapshots become non-deterministic or leak PII.
  - Why alternatives exist: Ad-hoc manual checks (insufficient at scale).
  - When NOT to use: Don’t skip CI checks for snapshot-producing changes.
  - Common mistakes: No seeded randomness, missing snapshot acceptance checks in PRs.

INTERNAL DOCS TO ADD OR EXTEND

1. /docs/official-docs/EPIC-E/snapshot_semantics_v1.md

- Purpose: Publish canonical, versioned snapshot metadata JSON Schema and deterministic-capture rules.
- Exact knowledge to add:
  - Full JSON Schema (Draft 2020-12) with `schema_version` top-level property
  - Top-level required fields: `schema_version`, `snapshot_id`, `source_service`, `source_id`, `capture_seed`, `captured_at`, `snapshot_class`, `metadata_size_bytes`
  - Deterministic-capture rules: seed usage, stable timestamps, and what constitutes `broken` vs `fixed` snapshots
  - Example JSON payloads for `preview`, `full_snapshot`, and `minimal_snapshot`
  - Producer acceptance criteria and schema bump procedure with HARD LOCK owner
- Required version pin: JSON Schema Draft 2020-12

2. /docs/official-docs/EPIC-E/snapshot_storage_and_retention.md

- Purpose: Define approved storage backend(s), object layout, immutability semantics, retention windows by snapshot class, and archival runbook.
- Exact knowledge to add:
  - Approved backend(s) and configuration (S3-compatible or internal blobstore), encryption, and object ACLs
  - Object layout and naming conventions (prefix, content-hash option, metadata file pairing)
  - Retention table mapping `snapshot_class` → retention window (e.g., `preview: 30d`, `full_snapshot: 365d`, `regulatory_snapshot: 7y`)
  - Archival/export runbook (cron, export path, verification, restore steps)
  - Owner and HARD LOCK approval process
- Required version pin: Storage backend docs (pin S3 API version or internal blobstore spec)

3. /docs/official-docs/EPIC-E/snapshot_deletion_and_audit.md

- Purpose: Describe safe deletion criteria, tamper-evident audit events for deletion, orphan-preview cleanup, and scheduled purge behavior.
- Exact knowledge to add:
  - Deletion acceptance criteria and approval gates (who can trigger hard-delete)
  - Required audit event fields to emit when snapshots are deleted or purged (`actor`, `reason_code`, `timestamp`, `snapshot_id`, `archive_location`)
  - Scheduled purge job spec (cron, retry, failure handling, alerting)
  - Verification queries and post-purge verification steps
  - Implementer acceptance checks and owner/HARD LOCK
- Required version pin: Internal retention policy / legal requirements

4. /docs/official-docs/EPIC-E/qa_snapshot_tests.md

- Purpose: Provide CI job names, test vectors, failure semantics, and example snapshots for determinism and masking validation.
- Exact knowledge to add:
  - CI job definitions (e.g., `ci:verify-snapshots`, cron schedule for nightly snapshot regression checks)
  - Seeded test vectors and example inputs with expected snapshot digests
  - Masking validation tests and disallowed patterns for PII/secrets
  - Failure handling and required remediation steps
- Required version pin: CI tooling (e.g., pinned GitHub Actions runner or workflow spec)

5. /docs/official-docs/EPIC-E/snapshot_registry.md

- Purpose: Registry manifest listing `schema_version` values for snapshot docs and HARD LOCK owner information.
- Exact knowledge to add:
  - `schema_version` → doc path mapping, owner, date, and approval gate for bumping
  - HARD LOCK owner contact and required sign-off process
- Required version pin: N/A (internal)

OPEN QUESTIONS / AMBIGUITIES

- Which storage backend is the canonical choice (S3-compatible or internal blobstore)?
- Which legal/compliance regimes apply (GDPR/CCPA/other) that influence retention windows?
- Who is the HARD LOCK owner for snapshot schema and retention decisions?
- Is content-hash addressing mandatory for immutability or optional?

MASTER DOCS REGISTRY ACTION

Append the following entries to `/docs/master_docs.md` (new entries only):

- /docs/docs-gatekeeper/EPIC-G — PUSH FLOW & SNAPSHOT PREVIEW/G12_Snapshot_Lifecycle_Management.md — Gatekeeper brief for snapshot lifecycle management.
- /docs/official-docs/EPIC-E/snapshot_semantics_v1.md — Required: canonical snapshot metadata schema and examples.
- /docs/official-docs/EPIC-E/snapshot_storage_and_retention.md — Required: storage backend decision, retention windows, archival runbook.
- /docs/official-docs/EPIC-E/snapshot_deletion_and_audit.md — Required: deletion safety runbook and tamper-evident audit spec.
- /docs/official-docs/EPIC-E/qa_snapshot_tests.md — Required: CI/QA acceptance tests for snapshots.
- /docs/official-docs/EPIC-E/snapshot_registry.md — Required: registry of schema_versions and HARD LOCK owner.

END OF BRIEF
