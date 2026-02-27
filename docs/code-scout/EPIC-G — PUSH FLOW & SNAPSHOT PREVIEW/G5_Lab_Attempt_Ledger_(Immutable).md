FEATURE CONTEXT

- Epic: EPIC-G — PUSH FLOW & SNAPSHOT PREVIEW
- Feature: G5 — Lab Attempt Ledger (Immutable)
- Source: Agent Orchestrator Output: docs/agent_orchestrator_output/EPIC-G — PUSH FLOW & SNAPSHOT PREVIEW/G5_Lab_Attempt_Ledger_(Immutable).md


TASKS CHECKED

(Listing only tasks from the EPIC file that belong to this feature)

- 26. Create LabAttempt per commit
- 27. Link LabAttempt to LabSession
- 28. Store commit SHA
- 29. Store author identity
- 30. Store branch name
- 31. Store changed file list
- 32. Store push timestamp
- 33. Prevent duplicate LabAttempt creation
- 34. Enforce append-only behavior


WHAT ALREADY EXISTS

- docs/agent_orchestrator_output/EPIC-G — PUSH FLOW & SNAPSHOT PREVIEW/G5_Lab_Attempt_Ledger_(Immutable).md — Orchestrator output for this feature listing required agents (planner-architect, implementer, security-sentinel, integration-checker) and an execution plan.
- docs/tasks/master_tasks_V1/EPIC-G— PUSH FLOW & SNAPSHOT PREVIEW.md — Epic task list that includes Feature G5 tasks (26–34).
- docs/code-scout/EPIC-F — GITHUB INTEGRATION FOR LABS/F8_Push_Tracking_&_Audit.md — Code-scout notes and references indicating `AuditLog`/`AuditService` and `VerificationLog` exist and describing missing `LabAttempt` artifacts (used here as corroborating evidence in repo docs).
- docs/agent_orchestrator_output/EPIC-F — GITHUB INTEGRATION FOR LABS/F8_Push_Tracking_&_Audit.md — Orchestrator steps for webhook & audit that reference the need for a `LabAttempt` model and idempotency.


WHAT IS PARTIALLY IMPLEMENTED

- `AuditLog` / `AuditService` presence is referenced in repository documentation and code-scout reports as append-only; webhook handlers are documented to call `AuditService.log(...)` (documented behavior, not validated by source code scan here).
- `VerificationLog` exists in docs as the existing verification result store (documented, requires reconciliation with `LabAttempt`).


WHAT IS MISSING

- No persistent schema/model for `LabAttempt` was found in source or schema docs (no Prisma `model LabAttempt` in repository docs or migrations).
- No DB migration or table for `LabAttempt` detected.
- No explicit idempotency storage or handling (e.g., GitHub delivery ID persisted) found in code or schema artifacts.
- No retention / archival policy document specific to the LabAttempt ledger (explicit retention guidance not present).
- No DB-level unique indexes or constraints for deduplication (not found in schema artifacts).
- No integration/unit tests asserting `LabAttempt` creation, idempotency, or append-only guarantees located in tests.
- No implementation code in services identified that creates `LabAttempt` records on webhook processing.
- No documented storage protections (e.g., object storage or DB immutability controls) tied to the ledger in repo source files.


RISKS OR CONFLICTS

- Duplicate records risk: Without idempotency (delivery ID) persisted and enforced, webhook retries could create duplicate `LabAttempt` rows.
- Responsibility overlap: `VerificationLog` and a new `LabAttempt` store may overlap; the repo contains mentions of both and requires reconciliation to avoid duplicated responsibilities.
- Retention ambiguity: Missing retention rules risk inconsistent deletion/archival behavior and potential privacy/compliance exposure.
- Immutability enforcement: Append-only intent exists in docs, but no concrete DB or storage-level protections were found in repository artifacts.


QUESTIONS FOR CLARIFICATION

- None strictly required to proceed with the planner-architect role; all clarifying inputs should come from the planner as part of schema definition if needed.


NEXT AGENT HANDOFF PROMPT (FOR `planner-architect`) — COPY-PASTE READY

You are the `planner-architect` assigned by the orchestrator. Use this report (docs/code-scout/EPIC-G — PUSH FLOW & SNAPSHOT PREVIEW/G5_Lab_Attempt_Ledger_(Immutable).md) and the orchestrator output at docs/agent_orchestrator_output/EPIC-G — PUSH FLOW & SNAPSHOT PREVIEW/G5_Lab_Attempt_Ledger_(Immutable).md as authoritative context.

Your scope (no implementation):
- Precisely specify the persistent ledger schema for `LabAttempt` that satisfies tasks 26–34 in EPIC-G (see Tasks Checked section in this report).
- Enumerate required fields and data types (minimum: id, sessionId FK, commitSha, author, branch, changedFiles, attemptedAt/timestamp, deliveryId or equivalent idempotency key).
- Specify DB indexes and unique constraints required to prevent duplicates and support expected queries (by sessionId, commitSha, deliveryId, attemptedAt).
- State append-only invariants and how they must be enforced (e.g., DB constraints, access patterns, immutability policies) — do NOT implement, only specify required invariants and where enforcement must occur (DB, ORM, service layer, infra ACLs).
- Define idempotency contract (which external header/value to use as idempotency key, and expected behavior on duplicate delivery: return existing record, skip downstream work, and audit log the duplicate event).
- Specify retention and archival policy placeholders that implementer and security-sentinel will act on (durations, archival target recommendations, and required audit retention windows).
- List concrete deliverables for the next agent (`implementer`): Prisma `model` text to add, migration notes, example DB constraint SQL, example queries the model must support, and a minimal set of integration tests to validate idempotency and append-only behavior.
- Reference any related artifacts in the repository to reconcile with (`VerificationLog`, `AuditLog`, webhook handler) and call out expected integration points.

Deliver a concise, deterministic artifact (YAML/MD or schema snippet) containing the schema and the explicit invariants/constraints. Do NOT propose implementation code; stop at schema, contracts, constraints, and test requirements. Reference this report in your outputs.


Handoff complete. Provide this report verbatim to the next agent.