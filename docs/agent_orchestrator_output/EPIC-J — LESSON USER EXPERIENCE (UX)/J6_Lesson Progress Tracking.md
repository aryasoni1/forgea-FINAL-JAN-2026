### FEATURE ANALYSIS

- Feature Type: Code / Backend Integration / UX
- Risk Level: Medium
- Touches HARD LOCK: No

### REQUIRED AGENTS

- Planner / Architect — Define progress model (section visibility thresholds, completion semantics, offline sync behavior, resume semantics, API contract).
- Implementer — Implement front-end tracking (IntersectionObserver), backend endpoints to persist progress, resume logic, and offline sync strategy.
- Integration Checker — Add tests ensuring progress persists across sessions and sync edge cases are handled in CI or integration tests.
- QA / Tester — Provide test scenarios (offline, partial sync, corrupted payloads) and validate correctness.
- Security Sentinel — Ensure progress endpoints are rate-limited and do not expose sensitive content.
- Documenter / Historian — Publish API contract and developer guidance for progress integration.

### NOT REQUIRED AGENTS

- Visual QA Agent — Not required for core progress logic.

### MISSING AGENT (ONLY IF NEEDED)

- None.

### EXECUTION PLAN

- Step 1: Planner / Architect — Define the data model for progress, thresholds, API schema, and offline-first sync behavior.
- Step 2: Implementer — Build frontend tracking with IntersectionObserver, implement backend endpoints (store per-user per-lesson progress), handle resume and offline sync. (Depends on Step 1)
- Step 3: Integration Checker — Create integration tests exercising persistence and sync under network flakiness. (After Step 2)
- Step 4: QA / Tester — Execute test matrix including offline and resume scenarios. (Parallel with Documenter)
- Step 5: Security Sentinel — Review endpoints for rate limiting, auth, and minimal exposure.
- Step 6: Documenter / Historian — Document API and front-end usage patterns.

### AGENT PROMPTS

- Planner / Architect:
  You are Planner. Define the lesson progress model (fields, thresholds, events), API contract (endpoints, payloads, auth), and offline sync conflict resolution. Deliver a small JSON schema and sequence diagrams.

- Implementer:
  You are Implementer. Implement IntersectionObserver-based tracking in `apps/lessons`, create authenticated backend endpoints to persist and retrieve progress, and implement offline sync logic. Provide a small integration test harness.

- Integration Checker:
  You are Integration Checker. Add automated tests to validate progress persistence and sync behavior; include CI guidance for running them.

- QA / Tester:
  You are QA. Exercise progress scenarios (online, offline, resume, partial sync) and report any inconsistencies.

- Security Sentinel:
  You are Security Sentinel. Review progress APIs for rate limiting, auth scopes, and ensure no content leakage through progress payloads.

- Documenter / Historian:
  You are Documenter. Produce clear API docs and front-end integration notes for developers.
