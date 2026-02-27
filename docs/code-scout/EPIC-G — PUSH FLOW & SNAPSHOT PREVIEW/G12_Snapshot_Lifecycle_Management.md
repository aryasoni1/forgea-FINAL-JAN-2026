FEATURE CONTEXT

- Epic: EPIC-G — PUSH FLOW & SNAPSHOT PREVIEW
- Feature: G12 — Snapshot Lifecycle Management
- Source: docs/agent_orchestrator_output/EPIC-G — PUSH FLOW & SNAPSHOT PREVIEW/G12_Snapshot_Lifecycle_Management.md (Agent Orchestrator output attached to this report)


TASKS CHECKED

- planner-architect — Define snapshot metadata schema, retention policy, and deletion safety rules.
- implementer — Implement snapshot metadata persistence, retention enforcement, and safe deletion procedures.
- integration-checker — Verify storage lifecycle APIs and scheduled job requirements for retention enforcement.
- security-sentinel — Ensure deletion audits are tamper-evident and handle orphaned-preview cleanup safely.
- documenter-historian — Document retention policy, deletion process, and audit fields.


WHAT ALREADY EXISTS

- docs/agent_orchestrator_output/EPIC-G — PUSH FLOW & SNAPSHOT PREVIEW/G12_Snapshot_Lifecycle_Management.md — Orchestrator output describing required agents, execution plan, and recommendations (source for this report).
- docs/docs-gatekeeper/EPIC-E — LAB CREATION SYSTEM (MANUAL + AI)/E7_Snapshot_and_Preview_Planning_Lab-Side.md — Gatekeeper brief naming snapshot semantics, masking, retention and QA docs required; references required official docs paths.
- docs/docs-gatekeeper/EPIC-E — LAB CREATION SYSTEM (MANUAL + AI)/E12_Storage_and_Organization.md — References cache/retention and snapshot storage items; calls out `/docs/official-docs/EPIC-E/cache_and_retention.md`.
- docs/docs-gatekeeper/EPIC-E — LAB CREATION SYSTEM (MANUAL + AI)/E13_Regression_Safety.md — Notes snapshot storage & immutability concerns and required `/docs/official-docs/EPIC-E/snapshot-storage.md` (registry entry present).
- docs/master_docs.md — References EPIC-E / Snapshot & Preview Planning entries and decisions to be made.
- docs/official-docs-registry.md — Registry contains snapshot & artifact storage section and references required official docs (snapshot-storage.md, snapshot retention entries).
- docs/code-scout/EPIC-G — PUSH FLOW & SNAPSHOT PREVIEW/* — Multiple code-scout notes for push/preview flows (G2, G3, G4, G5, G6, G8) that reference snapshot/preview needs and adjacent concerns (audit, immutable ledgers, attempt linkage).
- Docs/gatekeeper and B4/B5 (EPIC-B DB docs) — references to `LabVersion` / `LessonVersion` as patterns for immutable snapshots (schema guidance present in the gatekeeper notes).


WHAT IS PARTIALLY IMPLEMENTED

- Snapshot planning guidance: Gatekeeper briefs and EPIC-E docs define required topics (semantics, masking, retention, QA) but are proposals/requirements rather than canonical, versioned specs.
- Data model suggestions: `LabVersion` / `LessonVersion` concepts appear in docs (recommended fields: id, fk, snapshot JSON, createdAt) but there is no single, approved Prisma/DB migration or canonical schema file in `/docs/official-docs/`.
- Registry entries: `docs/official-docs-registry.md` includes snapshot storage and retention placeholders and required internal doc paths, but the canonical documents referenced are not present or are only referenced as required.


WHAT IS MISSING

(Explicitly not found in scanned repository files and referenced gatekeeper/orchestrator outputs)

- Canonical snapshot semantics spec (`/docs/official-docs/EPIC-E/snapshot_semantics_v1.md`) — Not found.
- Canonical snapshot storage & retention doc (`/docs/official-docs/EPIC-E/snapshot_storage.md` or `/docs/official-docs/EPIC-E/snapshot_storage_and_retention.md`) — Not found.
- Deletion safety, audit, and orphan-preview cleanup runbook (`/docs/official-docs/EPIC-E/snapshot_deletion_and_audit.md`) — Not found.
- QA acceptance tests / CI job definitions for snapshot determinism and masking (`/docs/official-docs/EPIC-E/qa_snapshot_tests.md`) — Not found.
- Implementation of retention enforcement jobs / scheduled purge automation in services or infra code — Not found.
- Ownership / HARD LOCK approval artifact for snapshot retention/storage decisions — Not found.
- Shared retention-policy utility across EPICs (central TTL config) recommended by orchestrator — Not found.


RISKS OR CONFLICTS

- Without a canonical snapshot schema and masking rules, different producers may capture sensitive data (secrets, tokens, PII) in snapshots, increasing leakage risk.
- Missing retention and deletion runbooks create compliance risk and operational ambiguity for long-term stored snapshots and previews.
- Lack of a storage-backend decision (S3 vs internal blobstore) risks divergent implementations and incompatible immutability semantics.
- No documented deletion audit semantics or tamper-evidence requirements increases risk during forensic investigation or regulatory review.
- If `LabVersion` / `LessonVersion` patterns are implemented inconsistently, reproducibility and rollback guarantees will be weakened.


QUESTIONS FOR CLARIFICATION

- None strictly required by the repository scan; planner-architect should confirm storage backend and HARD LOCK owners when producing artifacts.


NEXT AGENT HANDOFF PROMPT (MANDATORY)

Planner-Architect (next agent):

You are the `planner-architect` for G12 — Snapshot Lifecycle Management. Use this code-scout report (located at `docs/code-scout/EPIC-G — PUSH FLOW & SNAPSHOT PREVIEW/G12_Snapshot_Lifecycle_Management.md`) and the referenced docs/gatekeeper artifacts as the canonical repository findings. Do NOT implement code. Produce the following deliverables and place them at the exact doc paths below:

1) `/docs/official-docs/EPIC-E/snapshot_semantics_v1.md` — Versioned snapshot metadata schema and semantics.
   - Include: top-level fields, `schema_version`, deterministic-capture rules (timestamps, seeds), what constitutes `broken` vs `fixed` snapshots, example JSON metadata, and producer acceptance criteria.

2) `/docs/official-docs/EPIC-E/snapshot_storage_and_retention.md` — Storage & retention policy.
   - Include: approved storage backend(s) (S3-compatible or internal blobstore), retention windows by snapshot class, archival/export runbook, access controls, and owner/HARD LOCK fields.

3) `/docs/official-docs/EPIC-E/snapshot_deletion_and_audit.md` — Deletion safety and audit runbook.
   - Include: safe deletion criteria, tamper-evident audit fields, required audit events for deletion/orphan cleanup, scheduled retention job behavior, and acceptance tests to validate deletion auditing.

4) `/docs/official-docs/EPIC-E/qa_snapshot_tests.md` — QA acceptance tests for determinism and masking.
   - Include: CI job names, test vectors, failure semantics, and example snapshots to validate masking and determinism.

5) A small registry/manifest (path of your choice under `/docs/official-docs/`) listing `schema_version` values and owners for the snapshot docs above, plus a clear HARD LOCK owner for publishing the schema.

Acceptance criteria (must be present in each doc):
- Explicit `schema_version` and bump procedure.
- Required top-level metadata fields and allowed redaction rules for PII/secrets.
- Clear retention windows and the scheduled job spec (cron, retry, failure handling) for enforcement.
- Storage-backend decision and immutability semantics (write-once, content-hash addressing if required).
- Owner and approval gate (HARD LOCK) documented.
- A short list of implementer acceptance checks (what implementer must confirm before implementation).

Reference: This report and `docs/docs-gatekeeper/EPIC-E — LAB CREATION SYSTEM (MANUAL + AI)/E7_Snapshot_and_Preview_Planning_Lab-Side.md` and related EPIC-B gatekeeper notes contain context and requirement pointers. Do NOT change or implement code; produce only the docs and acceptance criteria so implementer, integration-checker, security-sentinel, and documenter-historian can proceed.

[end of report]
