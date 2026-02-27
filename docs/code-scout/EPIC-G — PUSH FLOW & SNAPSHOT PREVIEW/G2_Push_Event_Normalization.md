FEATURE CONTEXT

- Epic: EPIC-G — PUSH FLOW & SNAPSHOT PREVIEW
- Feature: G2 — Push Event Normalization
- Source: Agent Orchestrator output: docs/agent_orchestrator_output/EPIC-G — PUSH FLOW & SNAPSHOT PREVIEW/G2_Push_Event_Normalization.md


TASKS CHECKED

- Planner-architect: define normalization schema, dedup rules, idempotency preconditions (execution plan step 1)
- Implementer: implement payload parsing, commit extraction, deduplication, retry-safe handling (execution plan step 2)
- Docs-gatekeeper: review and ensure required documentation exists alongside implementation (execution plan step 3)


WHAT ALREADY EXISTS

- docs/agent_orchestrator_output/EPIC-G — PUSH FLOW & SNAPSHOT PREVIEW/G2_Push_Event_Normalization.md — Orchestrator feature analysis, required agents, execution plan; explicitly recommends adding a standard JSON schema for normalized push events.
- docs/docs-gatekeeper/EPIC-F — GITHUB INTEGRATION FOR LABS/F7_Webhook_Handling.md — Guidance listing required webhook headers (`X-Hub-Signature-256`, `X-GitHub-Event`, `X-GitHub-Delivery`) and recommending storing `X-GitHub-Delivery` for deduplication and TTL-based retention.
- docs/docs-gatekeeper/EPIC-F — GITHUB INTEGRATION FOR LABS/F8_Push_Tracking_&_Audit.md — Concept and audit guidance for push events; notes gaps where handlers do not persist `X-GitHub-Delivery` or parse changed files.
- docs/docs-gatekeeper/EPIC-F — GITHUB INTEGRATION FOR LABS/F9_Forbidden_Change_Detection.md — Mentions `push_event` minimalized fields.
- docs/code-scout/EPIC-F — GITHUB INTEGRATION FOR LABS/F8_Push_Tracking_&_Audit.md — Scout observation: webhook handler does not read `X-GitHub-Delivery` header; delivery ID handling flagged as missing in implementation.
- docs/official-docs-registry.md — Contains a Webhooks & Retry Patterns section referencing GitHub webhook semantics and idempotency/retry guidance (recent addition in repo context).
- docs/tasks/master_tasks_V1/EPIC-G— PUSH FLOW & SNAPSHOT PREVIEW.md — Task entry for FEATURE G2 exists in master task listing.


WHAT IS PARTIALLY IMPLEMENTED

- Idempotency guidance exists in multiple docs (recommendation to use `X-GitHub-Delivery` as canonical idempotency key and suggestions for fallback keys).
- Audit and webhook handling guidance exists, but the repository (scoped docs) shows handlers do not yet consistently read/store `X-GitHub-Delivery` (observed in code-scout notes under EPIC-F).


WHAT IS MISSING

- Standardized JSON Schema for normalized push events (explicitly recommended by the orchestrator file but not found in repo).
- Formal, centralized deduplication rules and retention TTLs for delivery IDs (docs contain recommendations, but no single canonical spec file).
- A documented idempotency precondition spec that ties webhook headers, derived keys, and storage lifetime together for implementers.
- Implementation artifacts: parsing library, normalization code, integration tests, and example normalized payloads.
- Pinning of external technology versions in orchestrator notes (several entries state "VERSION UNKNOWN").


RISKS OR CONFLICTS

- Multiple docs recommend `X-GitHub-Delivery` as the canonical idempotency key, but there is no single source-of-truth schema or spec; this can lead to inconsistent implementations across teams.
- Orchestrator and docs reference external technologies without pinned versions (version pinning is missing), creating potential future compatibility risk.
- Observed doc/code gap: guidance exists but handlers are noted not to store `X-GitHub-Delivery`, meaning implementation risk of duplicate processing remains.


QUESTIONS FOR CLARIFICATION

- None required to proceed from a scouting perspective. (If the orchestrator expects a different next agent, clarify which agent is scheduled first.)


NEXT AGENT HANDOFF PROMPT (MANDATORY)

You are the planner-architect agent. Use this repository report at docs/code-scout/EPIC-G — PUSH FLOW & SNAPSHOT PREVIEW/G2_Push_Event_Normalization.md as the authoritative input.

Task:
- Produce the canonical normalization contract and dedup/idempotency specification required by the implementer.

Deliverables (copy-paste-ready):
1. A formal JSON Schema (or equivalent machine-readable schema) named `normalized_push_event.schema.json` that defines the normalized push event shape and required fields.
2. A deduplication rules document that specifies: primary idempotency key(s), fallbacks, retention TTL for recorded delivery IDs, and expected behavior on duplicates (e.g., return 200 but do not re-enqueue).
3. An idempotency preconditions spec listing what must be present on incoming deliveries (headers, HMAC verification, raw body availability), and how to derive fallback keys if headers missing.
4. Acceptance criteria for implementer work (what tests/examples are required to consider implementation complete).

Constraints:
- Reference this code-scout report for existing facts only. Do not implement code.
- Do not recommend concrete implementation libraries; provide schema and behavioural contracts only.

Outputs should be written as files under the feature folder (for example, a schema in `docs/schemas/` and the dedup/idempotency spec under `docs/specs/`) and should reference any existing docs cited in this report.


Handoff complete. Provide this report verbatim to the next agent.