FEATURE CONTEXT

- Epic: EPIC-H — LAB TESTING & VERIFICATION ENGINE
- Feature: H2 — Job Queue & Scheduling
- Source: docs/agent_orchestrator_output/EPIC-H — LAB TESTING & VERIFICATION ENGINE/H2_Job Queue & Scheduling.md

### TASKS CHECKED

- Step 1: Planner-Architect defines queue contract: FIFO per session, locking mechanism, backpressure strategy, retry policy.
- Step 2: Security-Sentinel reviews contract for replay/DoS abuse and retry rules.
- Step 3: Implementer implements queue service, persistence hooks, locking to prevent parallel verification of same session.
- Step 4: Integration-Checker verifies interfaces with LabSession and Runner (mock endpoints) while Implementer produces API hooks.
- Step 5: Planner/Implementer add migration/operational notes.

### WHAT ALREADY EXISTS

- docs/agent_orchestrator_output/EPIC-H — LAB TESTING & VERIFICATION ENGINE/H2_Job Queue & Scheduling.md — Contains the feature analysis, required agents (planner-architect, implementer, integration-checker, security-sentinel), execution plan (Steps 1–5), risk classification (High), and notes about HARD LOCK impact and suggested checklists.

### WHAT IS PARTIALLY IMPLEMENTED

- Not found — No implementation artifacts or partial service code referenced in the orchestrator output for this feature. The orchestrator output lists roles and an execution plan but does not contain code, templates, or schema artifacts for the queue or locking semantics.

### WHAT IS MISSING

- A formal queue contract/template (locking semantics, backpressure guarantees, FIFO per-session semantics).
- Queue service implementation and API surface (enqueue, dequeue, status, cancel, DLQ handling).
- Persistence hooks or migration scripts for durable job storage.
- Locking/enforcement that guarantees one active job per LabSession.
- Integration tests and interface mocks for LabSession and Runner verifying single-active-job invariants.
- Security review artifacts: explicit retry rules, idempotency keys, abuse mitigation (rate limits, replay protection).
- Operational/runbook notes (migration steps, monitoring, alerting, scaling/backpressure behavior).

### RISKS OR CONFLICTS

- High risk: Orchestrator annotates this feature as High risk and touches a HARD LOCK — changes may be blocking for deployments.
- Concurrency risk: Without a lock/enforcement layer, there's a high chance of parallel verification runs for the same LabSession.
- Abuse surface: Retry policies may enable replay/DoS if not restricted to infra failures; orchestrator flags need for Security-Sentinel review.

### QUESTIONS FOR CLARIFICATION

- Not required / none.

### NEXT AGENT HANDOFF PROMPT (MANDATORY)

Role: planner-architect

Reference: This report (docs/code-scout/EPIC-H — LAB TESTING & VERIFICATION ENGINE/H2_Job Queue & Scheduling.md) and the original orchestrator output at docs/agent_orchestrator_output/EPIC-H — LAB TESTING & VERIFICATION ENGINE/H2_Job Queue & Scheduling.md

You are the planner-architect. Based on the findings in this report, produce the following artifacts (no implementation):

- A single, authoritative "Queue Contract" document that clearly states:
  - FIFO semantics scoped per LabSession
  - Locking/invariant that enforces one active verification job per LabSession
  - Retry policy distinguishing infra-retryable errors vs permanent failures
  - Backpressure strategy and expected behavior under overload (drop, delay, or scale)
  - DLQ semantics and idempotency key guidance

- A prioritized task breakdown for the implementer and integration-checker including deliverables:
  - API surface for queue service (list of endpoints/messages and schemas)
  - Persistence/migration tasks for durable job storage
  - Locking enforcement approach (required invariants to verify)
  - Integration test checklist for single-active-job invariants and interface contracts with LabSession and Runner
  - Security-Sentinel handoff checklist items

- Operational notes outline required for migration and monitoring (high-level bullets; not implementation)

Constraints: Do not implement code; do not propose specific library implementations. Reference only the facts recorded in this report and the orchestrator output. Keep the contract precise and actionable so the implementer can execute without architectural redesigns.

Place your output under docs/tasks or docs/specs as a named artifact and reference this code-scout report in the header.
