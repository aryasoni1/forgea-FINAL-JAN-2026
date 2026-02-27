## FEATURE CONTEXT

- Epic: EPIC-I — ANTI-CHEAT & ABUSE CONTROL SYSTEM
- Feature: I7*Rate_Limiting*&\_Abuse_Protection
- Exact input files read:
  - /docs/agent*orchestrator_output/EPIC-I — ANTI-CHEAT & ABUSE CONTROL SYSTEM/I7_Rate_Limiting*&\_Abuse_Protection.md
  - /docs/code-scout/EPIC-I — ANTI-CHEAT & ABUSE CONTROL SYSTEM/I7*Rate_Limiting*&\_Abuse_Protection.md

---

### REQUIRED OFFICIAL DOCUMENTATION

1. Technology: HTTP semantics — Retry and rate-related headers

- Concept: `Retry-After`, status codes for throttling (429)
- Official source: https://datatracker.ietf.org/doc/html/rfc7231#section-7.1.3
- Exact version requirement: RFC 7231 (June 2014)
- Why required: Standardizes client-visible retry guidance and canonical status codes used by enforcement layers.
- Decision it informs: Response codes and headers emitted by edge and service middleware when limits are enforced.
- What breaks without it: Inconsistent client behavior and incompatible retry/backoff semantics across integrations.

2. Technology: Rate-limiting algorithm specification

- Concept: Token-bucket / leaky-bucket behavior and parameter definitions (burst, refill)
- Official source: VERSION UNKNOWN — authoritative algorithm descriptions must be pinned (e.g., vendor alg docs or RFC if available)
- Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- Why required: Defines how enforcement behaves under burst vs steady load and how refill intervals map to numeric limits.
- Decision it informs: Burst allowances, refill intervals, and enforcement fidelity at scale.
- What breaks without it: Divergent implementations causing inconsistent user experience and possible DoS amplification.

3. Technology: Edge / CDN rate-limiting (example implementations)

- Concept: Enforcement at CDN/edge to reduce upstream load (Cloudflare, Fastly, AWS WAF rate limiting guidance)
- Official source: https://developers.cloudflare.com/rate-limiting/
- Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- Why required: Informs where to apply coarse-grained enforcement and what constraints are available at the edge.
- Decision it informs: Whether to block at CDN vs service, and how to cascade enforcement.
- What breaks without it: Overloading origin services or duplicate/conflicting enforcement rules.

4. Technology: Service-side rate limit middleware (Envoy / NGINX / ALB)

- Concept: Config patterns for per-IP/per-account limits and integration with external rate-limit services
- Official source: https://www.envoyproxy.io/docs/envoy/latest/configuration/http/http_filters/ratelimit_filter and https://nginx.org/en/docs/http/ngx_http_limit_req_module.html
- Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- Why required: Provides canonical implementation patterns for enforcing limits at the service mesh or ingress.
- Decision it informs: Enforcement location choices and telemetry integration points.
- What breaks without it: Mismatched enforcement semantics causing bypass or inconsistent throttling.

5. Technology: Telemetry & audit schema

- Concept: Metrics and audit events required for approaching/exceeding limits (OpenTelemetry recommended)
- Official source: https://opentelemetry.io/docs/specs/
- Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- Why required: Ensures consistent observability, retention, and alerting for abuse and operational thresholds.
- Decision it informs: What events/fields to emit, retention, and alert thresholds.
- What breaks without it: Insufficient signal to detect or investigate abuse; missed alerts.

6. Technology: DoS amplification and mitigation guidance

- Concept: Threat analysis and mitigations for amplification vectors (OWASP guidance)
- Official source: https://cheatsheetseries.owasp.org/cheatsheets/Denial_of_Service.html
- Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- Why required: Identifies attack vectors that naive rate-limits can amplify (e.g., CPU-heavy validation under small request load).
- Decision it informs: Safe enforcement patterns and hardening requirements.
- What breaks without it: Deploying throttles that inadvertently increase attack surface.

7. Technology: Load & simulation tooling

- Concept: Standardized load-test scenarios and tooling (k6, locust, or equivalent)
- Official source: https://k6.io/docs/
- Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- Why required: Provides canonical test harness and patterns for QA `rate-limit-simulation` deliverable.
- Decision it informs: Test scripts and acceptance criteria for QA and security validation.
- What breaks without it: Inability to reproduce edge-case behaviors and validate thresholds under adversarial load.

---

### EXISTING INTERNAL DOCS (VERIFIED)

- /docs/agent*orchestrator_output/EPIC-I — ANTI-CHEAT & ABUSE CONTROL SYSTEM/I7_Rate_Limiting*&\_Abuse_Protection.md
  - Coverage status: PARTIAL
  - Exact gaps: Contains feature analysis and recommended artifacts but does not specify approved numeric values, token-bucket params, cooldown durations, enforcement locations with exact config hooks, or approvals.

- /docs/code-scout/EPIC-I — ANTI-CHEAT & ABUSE CONTROL SYSTEM/I7*Rate_Limiting*&\_Abuse_Protection.md
  - Coverage status: PARTIAL
  - Exact gaps: Identifies missing implementations and simulation artifacts; does not provide the required approved policy document or telemetry schema.

- /docs/official-docs-registry.md
  - Coverage status: PARTIAL
  - Exact gaps: Cross-EPIC rate-limit guidance entries exist but are not feature-scoped to EPIC-I with numeric values and required approvals pinned.

---

### DOCUMENTATION COVERAGE DECISION

⚠️ DOCUMENTATION PARTIAL — EXTENSION REQUIRED

Docs to extend:

- `/docs/agent_orchestrator_output/EPIC-I — ANTI-CHEAT & ABUSE CONTROL SYSTEM/I7_Rate_Limiting_&_Abuse_Protection.md` — add the approved numeric policy and token-bucket parameters, and an explicit QA `rate-limit-simulation` checklist.
- `/docs/code-scout/EPIC-I — ANTI-CHEAT & ABUSE CONTROL SYSTEM/I7_Rate_Limiting_&_Abuse_Protection.md` — add security-sentinel review artifacts and explicit DoS mitigation notes.
- `/docs/official-docs-registry.md` — append pinned external references and versions used for implementation.

---

### STUDY GUIDE FOR HUMAN

- **Token-bucket algorithm:** Why — provides burst handling; Alternatives — fixed-window counters (simpler but prone to boundary bursts); When NOT to use — when extremely simple per-minute quotas are sufficient and low jitter is required; Common mistakes — confusing refill interval units, allowing unbounded burst size.
- **Edge enforcement (CDN):** Why — reduces origin load and blocks obvious abuse early; Alternatives — only service-side enforcement (higher origin cost); When NOT to use — when per-account identity is required but not available at edge; Common mistakes — applying too-strict global rules that block legitimate traffic.
- **Service middleware (Envoy/NGINX):** Why — fine-grained per-actor limits; Alternatives — application-layer checks (more flexible but heavier); When NOT to use — when limits must account for business logic state; Common mistakes — double-counting requests across cascaded layers.
- **Telemetry & Audit:** Why — detect and investigate abuse and tuning; Alternatives — ad-hoc logs (insufficient at scale); When NOT to use — none — always needed; Common mistakes — missing identity fields, inconsistent timestamps, insufficient retention for incident investigation.
- **Rate-limit simulation:** Why — validates real-world behavior and adversarial patterns; Alternatives — analytical models only (insufficient); When NOT to use — never for production rollouts; Common mistakes — failing to include low-volume high-cost request patterns and not simulating client backoff.

---

### INTERNAL DOCS TO ADD OR EXTEND

Only include these if coverage is PARTIAL (see above):

1. Path: /docs/official-docs/EPIC-I-rate-limits-policy.md

- Purpose: Canonical, approved I7 rate-limit policy authored by `planner-architect` and signed-off by `security-sentinel`.
- Exact knowledge to add: Numeric limits (see Required Items below), token-bucket params (burst size, refill interval), cooldown/backoff rules, enforcement locations, telemetry fields, retention and alert thresholds, QA `rate-limit-simulation` scenarios, list of required approvals.
- Required version pin: Pin the exact vendor docs and OpenTelemetry spec versions referenced in the policy.

2. Path: /docs/official-docs/rate-limit-simulations/EPIC-I-simulations.md

- Purpose: QA test harness and scripts for `rate-limit-simulation` deliverable.
- Exact knowledge to add: k6 or locust scripts, load profiles (see Required Items below), pass/fail criteria, data collection points.
- Required version pin: Pin k6/locust versions.

3. Path: /docs/official-docs/security-reviews/EPIC-I-rate-limit-security-review.md

- Purpose: Security-sentinel findings and mitigations for DoS amplification and bypass.
- Exact knowledge to add: threat model, tests performed, residual risk, required deployment constraints.
- Required version pin: OWASP guidance version used for the review.

---

### REQUIRED ITEMS (TO BE AUTHORITATIVELY FILLED BY `planner-architect` / APPROVALS)

The implementer must not proceed until the following are provided and approved. This file records the required fields (values below are placeholders that MUST be filled by `planner-architect`):

- Exact rate-limit values per resource and actor:
  - Per IP: 120 requests/minute
  - Per account (authenticated): 600 requests/minute
  - Per workspace: 3000 requests/minute
  - Job-creation endpoint (protected): 10 requests/hour per account
  - Snapshot preview path: 30 previews/hour per account

- Burst allowances and token-bucket parameters (examples — MUST BE PINNED):
  - Burst size: 2x base rate (token-bucket capacity = base_rate \* 2)
  - Refill interval: tokens added every 1 second (refill rate = base_rate / 60 per second)

- Cooldown and backoff policies after enforcement:
  - First exceed: soft-throttle response (HTTP 429) with `Retry-After: 60`
  - Repeated exceed within 15 minutes: temporary block 5 minutes
  - Exponential backoff for repeated abuse: block duration doubles up to 1 hour

- Enforcement locations and scopes:
  - Edge/CDN: coarse global per-IP limits and blocking of high-rate abusive IPs
  - Service middleware (ingress/Envoy/NGINX): per-account and per-workspace enforcement
  - Job-creation endpoint: application-layer enforcement with strict limits
  - Snapshot preview path: application-layer throttles with separate counters

- Telemetry and audit events (minimum fields):
  - Event types: `rate_limit.approach`, `rate_limit.exceeded`, `rate_limit.blocked`
  - Fields: timestamp, actor_id (account/workspace/IP), resource, limit, current_count, burst_used, enforcement_location, request_id
  - Retention: metrics retained 90 days; raw audit logs retained 365 days (subject to privacy review)
  - Alert thresholds: sustained exceed rate > 1% of requests for 5m => pager

- Required `rate-limit-simulation` scenarios for QA:
  - Nominal: steady traffic at 80% of limit for 30 minutes
  - Burst: short burst at 5x limit for 30s followed by normal traffic
  - Adversarial: many IPs spoofing per-account usage to try to bypass per-IP limits
  - Low-volume high-cost: low QPS but expensive per-request CPU/DB usage
  - Backoff behavior: clients respecting `Retry-After` vs non-compliant clients

- Approvals and gating requirements:
  - Security-sentinel signoff required for DoS risk mitigation (explicit review artifact needed)
  - Hard-lock approval required before rollout to production (per repo HARD LOCK policy)
  - Deployment windows: high-risk changes must deploy during approved maintenance windows and be accompanied by rollback playbook.

Missing approvals/dependencies blocking implementer stage:

- Approved numeric values and token-bucket parameters authored and signed by `planner-architect`.
- Security-sentinel signoff with documented mitigation and tests.
- `rate-limit-simulation` artifacts in `/docs/official-docs/rate-limit-simulations/` and QA acceptance criteria.

---

### OPEN QUESTIONS / AMBIGUITIES (BLOCKERS)

- Which exact vendor edge/CDN(s) will be authoritative for global blocking (Cloudflare, Fastly, or AWS)?
- Which telemetry retention and PII rules must be applied to `actor_id` fields (privacy review required)?
- Confirm hard-lock approval flow and the identity of approvers for EPIC-I changes.

---

### MASTER DOCS REGISTRY ACTION

Append the following entry to `/docs/master_docs.md` (exact line to append shown below):

- EPIC-I — I7 Rate Limiting & Abuse Protection: /docs/docs-gatekeeper/EPIC-I — ANTI-CHEAT & ABUSE CONTROL SYSTEM/I7*Rate_Limiting*&\_Abuse_Protection.md

---

Handoff: This brief records the required documentation gaps and the exact fields that must be filled and approved before `implementer` begins work. Do not proceed without filling the required items and securing the approvals listed above.
