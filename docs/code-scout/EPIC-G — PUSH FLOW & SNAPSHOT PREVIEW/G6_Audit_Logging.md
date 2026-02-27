FEATURE CONTEXT

- Epic: EPIC-G — PUSH FLOW & SNAPSHOT PREVIEW
- Feature: G6 — Audit Logging
- Source: docs/agent_orchestrator_output/EPIC-G — PUSH FLOW & SNAPSHOT PREVIEW/G6_Audit_Logging.md (Agent Orchestrator output attached to this report)


TASKS CHECKED

- planner-architect: define audit schema, retention, immutable storage requirements
- implementer: implement accepted/rejected logging, reason codes, append-only writes
- security-sentinel: review for PII/tamper-resistance
- documenter-historian: record schema and retention for investigators


WHAT ALREADY EXISTS

- docs/agent_orchestrator_output/EPIC-G — PUSH FLOW & SNAPSHOT PREVIEW/G6_Audit_Logging.md — Agent Orchestrator output describing feature analysis, required agents, and an execution plan.
- forgea-monorepo/packages/audit/src/audit.service.ts — Audit service implementing audit write primitives (typed metadata mapping and append-only write behavior noted in repo docs).
- docs/docs-gatekeeper/EPIC-F — GITHUB INTEGRATION FOR LABS/F8_Push_Tracking_&_Audit.md — Notes on push tracking, webhook audit needs, and references to `packages/audit` usage and gaps (delivery-ID handling, metadata contract).
- docs/docs-gatekeeper/EPIC-B — DATABASE CORE & HARDENING/B12_Audit Infrastructure.md — Gatekeeper notes identifying canonical schema and official docs that must be created; references to missing canonical JSON Schema and retention guidance.
- docs/official-docs-registry.md — Registry entries referencing audit policy, retention, and sink spec (many internal docs listed as "to be created").


WHAT IS PARTIALLY IMPLEMENTED

- forgea-monorepo/packages/audit/src/audit.service.ts: provides append-only write primitives and a typed `AuditMetadataMap`/`AuditLog` usage, but does not export a versioned JSON Schema or canonical event contract suitable for cross-service enforcement.
- Webhook handlers and producers: produce audit rows and verification logs but are missing documented metadata contracts, delivery-id deduplication indexes, and explicit backfill/migration plans for immutable audit tables (per docs-gatekeeper notes).


WHAT IS MISSING

(Explicitly not found in repository docs/source scanned)

- Canonical, versioned JSON Schema / canonical event contract for `AuditLog.metadata` (e.g., `/docs/official-docs/EPIC-B/audit-log-guidelines.md`) — Not found.
- Audit retention & archival policy / runbook (e.g., `/docs/official-docs/EPIC-C/audit_retention_and_archival.md`) — Not found.
- Audit sink specification and onboarding doc (e.g., `/docs/official-docs/EPIC-C/audit_sink_spec.md`) — Not found.
- Migration/backfill plan and safe-DDL patterns for turning existing tables into immutable append-only audit stores — Not found.
- Central registry for rejection/reason codes shared across EPICs — Not found.
- Formal planner-architect deliverables (approved schema, retention windows, immutable storage requirements) — Not found.


RISKS OR CONFLICTS

- Inconsistent event schemas across producers increase forensic and analytic toil and may break cross-service ingestion.
- Lack of a versioned schema or validator risks producers writing incompatible shapes into the audit table.
- Missing retention/archival policy and automation creates compliance risk (unable to demonstrate retention or purge behavior to auditors).
- No documented redaction/PII rules observed — risk of storing sensitive data without controls.
- Reliance on `AuditLog` for application deduplication (delivery-id) without DB indexes or deduplication design risks duplicate processing or missed deduplication guarantees.


QUESTIONS FOR CLARIFICATION

- None strictly required by the scan; the orchestrator design names `planner-architect` as the next agent.


NEXT AGENT HANDOFF PROMPT (MANDATORY)

Planner-Architect (next agent):

You are the `planner-architect` responsible for producing the canonical design artifacts required to enable implementers and reviewers for G6 — Audit Logging. Use this code-scout report located at `docs/code-scout/EPIC-G — PUSH FLOW & SNAPSHOT PREVIEW/G6_Audit_Logging.md` as your source of truth for repository findings.

Required outputs (produce these exact artifacts and place them in the doc paths below):
- A versioned, canonical JSON Schema for audit events and `AuditLog.metadata` (write to `/docs/official-docs/EPIC-B/audit-log-guidelines.md`). Include top-level required fields, size limits, example event shapes, and a `schema_version` value.
- A retention & archival policy document specifying retention windows per `AuditAction` class, allowed redaction rules, and archival/export runbook (write to `/docs/official-docs/EPIC-C/audit_retention_and_archival.md`).
- An immutable storage requirements doc describing append-only guarantees, DDL/migration constraints, required DB indexes (e.g., delivery-id deduplication), and backfill strategy for existing rows (write to `/docs/official-docs/EPIC-B/prisma_migrations.md` or explicit path you prefer).
- A shared registry file for rejection/reason codes referenced by producers and consumers (give canonical path and format).

Deliverables should explicitly reference this code-scout report and the existing `packages/audit/src/audit.service.ts` implementation. Do NOT implement code. Focus on schema, retention windows, immutable-storage invariants, and exact doc paths for implementers and security-sentinel to act on.

Include acceptance criteria for each deliverable so implementer and security-sentinel can validate completion (e.g., schema version bump procedure, required fields, allowed redaction patterns, required DB indexes, and owner/approval gates).



[end of report]
