### FEATURE ANALYSIS

- Feature Type: code + security + operations
- Risk Level: Medium
- Touches HARD LOCK: No

### REQUIRED AGENTS

- Implementer — Implement session refresh, stale-role handling, deletion flows, and session revocation hooks.
- Planner / Architect — Define desired behavior for session refresh, concurrent sessions, and forced logout scenarios.
- Security Sentinel — Validate forced logout, stale-role mitigation, and session revocation mechanisms.
- QA / Tester — Test session refresh, stale role handling, deleted user behavior, and concurrent sessions.

### NOT REQUIRED AGENTS

- Documenter / Historian — Document after behaviors are finalized.

### MISSING AGENT

- None.

### EXECUTION PLAN

- Step 1: Architect specifies policies for session refresh, stale roles, and forced logout (e.g., on user deletion).
- Step 2: Implementer adds session-refresh flow, checks for role freshness on critical actions, and enforces logout for deleted users.
- Step 3: Security Sentinel reviews revocation and refresh semantics for safety.
- Step 4: QA tests concurrency, session refresh, stale-role scenarios, and forced logout paths.

### USER PROMPTS

- Implementer:
"Implement session refresh and revocation: support idle and absolute timeouts, enforce logout when user record is deleted, and ensure role changes are reflected or require reauthentication for critical operations. Allow multiple concurrent sessions unless Architect disallows it."

- Planner / Architect:
"Define the allowed concurrent session policy, whether role changes require active session invalidation, and how to handle session refresh (refresh token or sliding window)."

- Security Sentinel:
"Review revocation and refresh implementation for replay, session fixation, and ensure user deletion triggers immediate session invalidation."

- QA / Tester:
"Test session refresh, multiple concurrent sessions, behavior after role change or user deletion, and ensure no stale role usage on privileged operations."

### ORCHESTRATOR IMPROVEMENT NOTES

- Consider adding a small 'session-revocation' checklist to the Security Sentinel contract to standardize reviews.
