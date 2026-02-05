### FEATURE ANALYSIS

- Feature Type: code + security
- Risk Level: High
- Touches HARD LOCK: No

### REQUIRED AGENTS

- Planner / Architect — Define role model and default-deny policy; choose role persistence strategy.
- Implementer — Implement role enum/storage, inject role into session, and create centralized auth helper.
- Security Sentinel — Review default-deny behavior and role elevation safeguards.
- QA / Tester — Test role enforcement and edge cases (stale roles, missing roles).
- Documenter / Historian — Document role model and usage patterns.

### NOT REQUIRED AGENTS

- Integration Checker — Not required for initial RBAC implementation.

### MISSING AGENT

- None.

### EXECUTION PLAN

- Step 1: Architect defines role enum (`FREE`, `PAID`, `ADMIN`, `RECRUITER`) and default-deny rules.
- Step 2: Implementer persists `role` on `User`, injects `id` and `role` into session, and provides `authorize()` helper.
- Step 3: Security Sentinel reviews keeper policies for role changes and enforces approval flows for elevated roles.
- Step 4: QA validates deny-by-default behavior across UI and APIs.

(Parallel: Step 3 may run alongside Step 2 after initial implementation.)

### USER PROMPTS

- Planner / Architect:
  "Define the role enum values and policy: what each role can/cannot do, expected storage (DB enum vs string), and default behavior (deny). Also state how role changes are audited."

- Implementer:
  "Add a role enum to the `User` model, ensure it's stored in DB, update session object to include `userId` and `role`, and implement a centralized `authorize(user, action)` helper that defaults to deny. Add unit tests."

- Security Sentinel:
  "Review the RBAC implementation for potential privilege escalation vectors. Recommend safeguards and audit hooks for role changes."

- QA / Tester:
  "Create tests verifying default-deny, role-based access to sample endpoints, and behavior when role is missing or stale."

### ORCHESTRATOR IMPROVEMENT NOTES

- Provide a small RBAC policy template to accelerate Architect/Implementer alignment.
