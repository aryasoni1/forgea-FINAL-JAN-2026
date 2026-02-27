## FEATURE CONTEXT

- Epic: EPIC-I — ANTI-CHEAT & ABUSE CONTROL SYSTEM
- Feature: I7_Rate_Limiting_&_Abuse_Protection
- Source: docs/agent_orchestrator_output/EPIC-I — ANTI-CHEAT & ABUSE CONTROL SYSTEM/I7_Rate_Limiting_&_Abuse_Protection.md

### TASKS CHECKED

- Planner-Architect: define rate limits, cooldown policies, and throttling boundaries.
- Security-Sentinel: review for bypass and DoS amplification risks.
- Implementer: implement throttles at service and job-creation boundaries, and snapshot preview limits.
- QA-Tester: validate throttling behavior under load and edge cases.
- Documenter-Historian: record policies and thresholds.

### WHAT ALREADY EXISTS

- docs/agent_orchestrator_output/EPIC-I — ANTI-CHEAT & ABUSE CONTROL SYSTEM/I7_Rate_Limiting_&_Abuse_Protection.md — Contains feature analysis, required agents, execution plan, and an improvement note recommending a `rate-limit-simulation` requirement.
- Multiple documentation references across the repo mention "rate-limit" guidance and use (e.g., docs/docs-gatekeeper and docs/official-docs-registry), but these are cross-cutting guidance items, not approved, feature-scoped policy documents for EPIC-I.

### WHAT IS PARTIALLY IMPLEMENTED

- No service-level implementation files were discovered under `forgea-monorepo/services/anti-cheat/**` or `forgea-monorepo/services/**` specifically implementing global or feature-scoped rate-limiting/throttles for the anti-cheat system (search for `rate limit|rate-limit|throttle|throttl` returned documentation and compiled JS artifacts but no canonical source policy or service middleware located in source folders).
- Repo contains documentation mentioning rate-limits in other EPICs (e.g., GitHub integrations), indicating organizational awareness, but not the EPIC-I-specific values, cooldown rules, or simulation artifacts required by the orchestrator.

### WHAT IS MISSING

- Approved, feature-scoped rate-limit policy authored by `planner-architect` specifying exact numeric values, cooldown rules, burst allowances, per-actor and per-resource boundaries, and enforcement locations.
- Implementation code for throttles at service and job-creation boundaries under `forgea-monorepo/services/**` (not found).
- `rate-limit-simulation` artifacts or test harnesses to reproduce load scenarios for QA (orchestrator recommends adding this; not found).
- Security review artifacts (by `security-sentinel`) assessing bypass vectors and DoS amplification risks (not found).
- QA test cases and load validation harnesses demonstrating throttling behavior under expected and adversarial load (not found).
- Documenter notes and finalized thresholds stored in decision logs (not found).

### RISKS OR CONFLICTS

- Feature marked as "Touches HARD LOCK: Yes" — changes require gating and approvals before implementation and deployment.
- Lack of a `rate-limit-simulation` requirement and absence of explicit rate-limit values creates risk of under/over-throttling and potential DoS amplification if implementers guess defaults.
- Cross-EPIC documentation referencing rate-limits exists (e.g., GitHub integration), but there is no single source-of-truth policy for EPIC-I; this may cause inconsistent enforcement across services.

### QUESTIONS FOR CLARIFICATION

- Confirm the immediate next agent to act (planner-architect is listed first by orchestrator). If approvals or security signoffs are required before drafting, indicate where they should be recorded.

### NEXT AGENT HANDOFF PROMPT (MANDATORY)

You are `planner-architect`. Use this report at `docs/code-scout/EPIC-I — ANTI-CHEAT & ABUSE CONTROL SYSTEM/I7_Rate_Limiting_&_Abuse_Protection.md` and the orchestrator source at `docs/agent_orchestrator_output/EPIC-I — ANTI-CHEAT & ABUSE CONTROL SYSTEM/I7_Rate_Limiting_&_Abuse_Protection.md` as the authoritative context. Your task: produce an approved task document that includes only the following factual items for the I7 feature (do not provide implementation code or design):

- exact rate-limit values per resource and actor (e.g., `requests/minute` per IP, per account, per workspace)
- burst allowances and token-bucket parameters (burst size, refill interval) where applicable
- cooldown and backoff policies after enforcement (temporary block durations, exponential backoff policies)
- enforcement locations and scopes (edge/CDN, service middleware, job-creation endpoint, snapshot preview path)
- telemetry and audit events required when limits are approached/exceeded (fields, retention, and alert thresholds)
- required `rate-limit-simulation` scenarios for QA (load profiles, concurrency, adversarial patterns)
- approvals and gating requirements (security-sentinel signoff, deployment windows, hard-lock approvals)

List any missing approvals or dependencies that would block movement to the `implementer` stage. Do not propose code-level solutions or changes — produce only the specification/approval document required for downstream agents.

Handoff complete. Provide this report verbatim to the next agent.