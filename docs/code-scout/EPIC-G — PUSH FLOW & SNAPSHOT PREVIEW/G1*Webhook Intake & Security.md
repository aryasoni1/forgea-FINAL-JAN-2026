## FEATURE CONTEXT

- Epic: EPIC-G — PUSH FLOW & SNAPSHOT PREVIEW
- Feature: G1 — Webhook Intake & Security
- Source: docs/agent_orchestrator_output/EPIC-G — PUSH FLOW & SNAPSHOT PREVIEW/G1_Webhook_Intake_&_Security.md

### TASKS CHECKED

- planner-architect: produce implementation plan and preconditions
- implementer: implement endpoint, raw-body handling, HMAC verification, push-only acceptance
- security-sentinel: threat modelling and signature verification review
- integration-checker: validate infra/contract compatibility

### WHAT ALREADY EXISTS

- docs/agent_orchestrator_output/EPIC-G — PUSH FLOW & SNAPSHOT PREVIEW/G1_Webhook_Intake_&_Security.md — Orchestrator output containing feature analysis, required agents, a noted missing agent (`webhook-perf-auditor`), execution plan, and improvement notes.
- docs/official-docs-registry.md — Registry entries referencing GitHub Webhooks, retry/idempotency patterns, and durable queue options (SQS, Redis Streams, Postgres job table) relevant to webhook processing.
- apps/forgea-labs/app/api/webhooks/github/route.ts — existing Next.js App Route handler for GitHub webhooks (handler present in repository; verifies `x-hub-signature-256`, filters for `push` events, looks up `LabSession` and updates session status).
- .env / .env.example entries: `GITHUB_WEBHOOK_SECRET` present in multiple locations (example and local env files).

### WHAT IS PARTIALLY IMPLEMENTED

- The repository contains an App Route at `apps/forgea-labs/app/api/webhooks/github/route.ts` which:
  - reads raw request body via `arrayBuffer()` and computes HMAC (`sha256`) against `GITHUB_WEBHOOK_SECRET`.
  - filters only `push` events and returns early for other event types.
  - parses payload, locates `LabSession` by `userForkUrl`, writes an audit entry, and updates session status.
  - logs failures and returns HTTP 200 for processing failures in several cases.

  Missing/unclear within that implementation (observed from compiled `.next` artifacts and source references):
  - Explicit replay protection (e.g., `X-GitHub-Delivery` deduplication) not found.
  - Rate limiting, quota enforcement, and burst handling not present.
  - Durable enqueue-first pattern (ack after enqueue) and DLQ integration are not implemented in the handler codebase.
  - Idempotency key storage / deduplication lifetime not present.

### WHAT IS MISSING

- `webhook-perf-auditor` agent: noted by orchestrator as missing.
- A documented, pinned list of authoritative external references and specific version pins (orchestrator and registry mark versions as UNKNOWN and must be pinned).
- Dedicated infra checklist for load-balancer / proxy header behavior and any platform-specific raw-body passthrough requirements (not found in repo docs).
- Formal runbook or operator playbook covering retry handling, DLQ operations, and secret rotation (docs reference this requirement but canonical runbook not found).

### RISKS OR CONFLICTS

- Risk Level: High (as called out by orchestrator output).
- Versioning ambiguity: multiple registry entries mark required technology versions as "VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION" — this is a blocking precondition for security-auditable work.
- Scope ambiguity: `integration-checker` contract is noted as unclear in the orchestrator notes (whether infra LB/header changes are in-scope). This can cause integration regressions if not clarified.
- Missing performance audit: high-throughput webhook intake has no dedicated perf auditor; scaling risks exist (burst handling, queueing, DLQ behavior).

### QUESTIONS FOR CLARIFICATION

- Not found: precise list of webhook providers to support beyond GitHub (or confirm GitHub-only).
- Not found: required throughput targets / SLA for webhook intake (events/sec, burst sizes) — needed before performance design.

### NEXT AGENT HANDOFF PROMPT (MANDATORY)

You are `planner-architect`. Use this code-scout report (this file) as the single source of truth about repository truth for the G1 Webhook Intake & Security feature.

Produce a secure, actionable implementation plan for webhook intake that includes only the following (do not implement):
- Preconditions and blocking items drawn directly from this report (explicitly list items that must be resolved before implementation, e.g., version pins, missing agents).
- The exact set of authoritative external references to cite (URLs and specific version or snapshot date) that the implementer must follow for HMAC signature verification, retry semantics, and durable queue choices.
- A clear list of required artifacts for the `implementer` (file paths to add or modify, required env vars, expected unit/integration tests, and evidence the `security-sentinel` will need to validate).
- A minimal infra checklist for the `integration-checker` to validate (load-balancer and proxy header rules, raw-body passthrough, secrets storage location, and DLQ/queue config pointers).
- Acceptance criteria for `security-sentinel` (what to validate in threat modelling, replay protection, timing-safe comparison, logging/audit, and required mitigations).
- A statement about whether `webhook-perf-auditor` must be added before implementation begins (YES/NO) and why, based only on facts in this report.

Do NOT reorder agents, propose implementation details beyond naming required artifacts and references, or modify repository files. Return the plan as a concise checklist and a prioritized list of blocking preconditions.

Handoff complete. Provide this report verbatim to the next agent.
