FEATURE CONTEXT

- Epic: EPIC-G — PUSH FLOW & SNAPSHOT PREVIEW
- Feature: G8 — Verification Result Intake
- Source: Agent Orchestrator output: docs/agent_orchestrator_output/EPIC-G — PUSH FLOW & SNAPSHOT PREVIEW/G8_Verification_Result_Intake.md

TASKS CHECKED

- planner-architect: specify result payload, status transitions, and log retention rules (execution plan step 1)
- implementer: implement verification result endpoint/consumer, status updates, and truncated log persistence (execution plan step 2)
- qa-tester: validate status transitions and edge cases (retries, partial logs) (execution plan step 3)
- security-sentinel: review log content sanitization and integrity checks (execution plan step 4)

WHAT ALREADY EXISTS

- docs/agent_orchestrator_output/EPIC-G — PUSH FLOW & SNAPSHOT PREVIEW/G8_Verification_Result_Intake.md — Orchestrator feature analysis with required agents and execution plan (source for this scout).
- docs/code-scout/EPIC-G — PUSH FLOW & SNAPSHOT PREVIEW/G5*Lab_Attempt_Ledger*(Immutable).md — Notes `VerificationLog` exists as an immutable verification result store and needs reconciliation with `LabAttempt` ledger.
- docs/code-scout/EPIC-F — GITHUB INTEGRATION FOR LABS/F8*Push_Tracking*&\_Audit.md — Documentation references `VerificationLog` storing `commitSha`, `ciOutput`, and `sessionId` and highlights partial coverage for CI verification results.
- docs/tasks/task-B6-2026-02-13.md — Task notes proposing rename/extension from `VerificationLog` to `VerificationAttempt` with schema suggestions: `VerificationResult` enum (`PASS`, `FAIL`), `logs Json @db.JsonB`, `createdAt DateTime`, index on `[sessionId, createdAt]`, and commitSha identity preservation.
- docs/tasks/master_tasks_V1/EPIC-H — LAB TESTING & VERIFICATION ENGINE.md and other master task lists — include items to persist verification results and display per attempt.
- docs/agent_orchestrator_output/EPIC-O — ADMIN SESSION OPERATIONS/O4\*Attempt Ledger (Immutable).md — Orchestrator notes about append-only attempt ledger schema and audit fields (timestamp, commit SHA, verification result, duration).
- tests and task files referencing „Verification Results” (docs/tests/task-36-tests.md and related tasks indicate testing area exists).

WHAT IS PARTIALLY IMPLEMENTED

- Persistent verification record concept exists (`VerificationLog`) and there are tasks describing a migration/rename to `VerificationAttempt` with richer fields.
- Enum for stored verification outcomes is constrained to `PASS`/`FAIL` in task notes; pending/intermediate states are described as belonging to the job queue rather than the persistent model.
- Audit/append-only ledger concept for attempts is present in admin orchestrator notes, but reconciliation mechanics between `LabAttempt` and `VerificationLog`/`VerificationAttempt` are not defined.

WHAT IS MISSING

- Canonical, machine-readable schema for verification result intake payloads (endpoint consumer input) and the persistent `VerificationAttempt` record.
- A shared, centralized `VerificationResult` enum (and its canonical location) referenced across services to avoid drift.
- A formal state transition diagram or table defining allowed status transitions for verification flows (including transient job states versus persisted terminal states).
- Clear retention, truncation, and sanitization rules for verification logs (what is truncated vs stored, TTLs, export/archival rules).
- An intake endpoint contract (HTTP route/consumer contract) that specifies authentication, idempotency, required headers, request shape, and expected responses for duplicate/retry deliveries.
- Acceptance criteria and test cases for implementer/qa: edge cases, retries, partial logs, and status transition tests are not present as a single spec.
- Security guidance for log content sanitization and integrity (where `security-sentinel` will need to act) is not found as a canonical spec.

RISKS OR CONFLICTS

- Overlap/duplication risk: `VerificationLog` and the proposed `VerificationAttempt`/`LabAttempt` responsibilities are not reconciled; multiple services may write similar artifacts, causing duplication or inconsistent truth.
- State model ambiguity: Persistent model limited to `PASS`/`FAIL` while job queues surface transient states — without a transition contract, services may mis-handle retries or partial results.
- Enum drift: No single source-of-truth for `VerificationResult` enum increases risk of mismatched values across services and migrations.
- Sensitive content risk: Verification logs (`logs Json`) may contain secrets or user data; lack of sanitization rules creates security/PII risk.
- Retention ambiguity: Absence of TTL/archival rules may lead to unbounded storage growth or premature deletion of audit data.

QUESTIONS FOR CLARIFICATION

- None strictly required from a scouting perspective. If the orchestrator expects a different next agent than `planner-architect`, please clarify.

NEXT AGENT HANDOFF PROMPT (MANDATORY)

You are the planner-architect agent. Use this repository report at docs/code-scout/EPIC-G — PUSH FLOW & SNAPSHOT PREVIEW/G8_Verification_Result_Intake.md as the authoritative input.

Task:

- Produce the canonical verification result intake contracts and policy documents required by implementers, QA, and security reviewers.

Deliverables (copy-paste-ready):

1. A formal JSON Schema (or equivalent machine-readable schema) named `verification_result_intake.schema.json` that defines the verification result intake request payload shape (fields, types, required/optional) and an example payload.
2. A persistent record schema `VerificationAttempt` (machine-readable or Prisma/DDL) that specifies stored fields, indexes, and immutability/append-only constraints.
3. A `VerificationResult` enum spec placed in a canonical repo location and referenced by other services (list of allowed values and semantics for each value).
4. A status transition spec (table or state diagram) that distinguishes transient job states (queued, running, timed_out, errored) from persisted terminal states (PASS, FAIL), and enumerates allowed transitions and handling on retries/duplicates.
5. An intake endpoint contract document specifying: expected headers/auth, idempotency semantics, required verification of payload (e.g., HMAC or broker auth), response codes on duplicate/retry, and example HTTP request/response pairs.
6. A log retention and truncation policy document that defines what parts of `logs Json` are stored versus truncated, TTLs for retention, archival/export rules, and mandatory sanitization steps before persistence.
7. Acceptance criteria and test cases for implementer and QA (edge cases: retries, partial logs, duplicate deliveries, race conditions, and status transition validation).

Constraints:

- Reference this code-scout report for existing facts only. Do not implement code or prescribe specific implementation libraries.
- Do not reorder agents or modify task scope.

Outputs should be written as files under the feature folder (for example, `docs/schemas/verification_result_intake.schema.json`, `docs/specs/verification_attempt.md`, and `docs/specs/verification_status_transitions.md`) and should reference existing docs cited in this report.

Handoff complete. Provide this report verbatim to the next agent.
