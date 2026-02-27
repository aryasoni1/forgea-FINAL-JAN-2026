### FEATURE ANALYSIS

- Feature Type: infra / reliability
- Risk Level: Medium
- Touches HARD LOCK: No

### REQUIRED AGENTS

- Planner / Architect — Define retry, backoff, and cleanup semantics for GitHub API interactions and webhook processing.
- Implementer — Implement retries, idempotency, safe cleanup on partial failures (repo/template injection), and webhook delivery handling.
- QA / Tester — Validate retry behavior, rate-limit handling, and cleanup paths under partial failure scenarios.
- Integration Checker — Simulate GitHub API rate limits, transient failures, and webhook retries in staging.
- Documenter — Document recovery workflows and operator runbooks.

### NOT REQUIRED AGENTS

- Security Sentinel — Not required for generic retry/cleanup logic, but should be consulted if secrets or escalations are part of recovery.

### MISSING AGENT (ONLY IF NEEDED)

- None.

### EXECUTION PLAN

- Step 1: Planner — Define failure modes (rate limits, partial repo creation, webhook retries) and intended safe outcomes (retry, rollback, dead-lettering).
- Step 2: Implementer — Implement exponential backoff, idempotency keys, transactional cleanup on partial failures, and dead-letter queue for unrecoverable webhooks.
- Step 3: QA / Tester — Create tests for rate limiting, API transient errors, and partial injection failures to verify retry and cleanup correctness.
- Step 4: Integration Checker — Validate behavior in staging with simulated rate limits and failure injections.
- Step 5: Documenter — Publish error handling patterns, retry parameters, and operator recovery steps.

### AGENT PROMPTS

- Planner:
  "Enumerate all expected GitHub-related failure modes (rate limits, 5xx, partial resource creation) and propose deterministic recovery actions and invariants for rollback."

- Implementer:
  "Implement robust retry/backoff for GitHub API calls, ensure idempotency via request keys, implement cleanup for partially created resources, and route unrecoverable webhook payloads to a dead-letter queue with audit info."

- QA / Tester:
  "Validate retries, idempotency, and cleanup logic by simulating transient and permanent failures; verify no resource leaks and clear audit trails for failures."

- Integration Checker:
  "Simulate GitHub API rate limiting and partial failures in staging; confirm system respects backoff, retries correctly, and cleans up partial state."

- Documenter:
  "Document error handling behavior, retry/backoff settings, dead-letter procedures, and operator runbook for common failures."

### ORCHESTRATOR IMPROVEMENT NOTES

- Recommend a reusable "Resilience" agent that standardizes retry/backoff, idempotency keys, and dead-letter queue patterns across epics.
