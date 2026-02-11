### FEATURE ANALYSIS

- Feature Type: runtime-resilience & session lifecycle
- Risk Level: Medium
- Touches HARD LOCK: No

### REQUIRED AGENTS

- Forgea Code Scout — Inventory session refresh paths, session-store behavior, and any code handling deleted users or session revocation.
- Security Sentinel — Analyze risks around stale roles, session fixation, and forced logout strategies.
- Planner / Architect — Produce a task specifying refresh semantics, revocation mechanisms, and required schema/infra changes.
- QA / Tester — Validate edge-case behavior in test plans (refresh, revocation, deleted-user flows).

### NOT REQUIRED AGENTS

- Implementer — Not at this stage; Implementer acts after Planner produces tasks.

### MISSING AGENT

- None.

### EXECUTION PLAN

- Step 1: Forgea Code Scout — inventory session refresh endpoints, session storage, and delete-user flows (sequential).
- Step 2: Planner / Architect — define refresh semantics, revocation API, and acceptance tests (sequential).
- Step 3: Security Sentinel — review planned revocation and forced-logout mechanisms (sequential).
- Step 4 (parallel): Implementer & QA — implement revocation and run automated/manual tests (parallel after Planner and Security review).

### USER PROMPTS

- Forgea Code Scout Prompt:

  Locate code that issues, refreshes, or validates sessions. Report any scheduled background jobs, session-cleanup tasks, and where deleted-user actions touch session data. Provide exact file paths and migration files if present.

- Planner / Architect Prompt:

  Produce `task-C11.md` specifying: session refresh flow, idle vs absolute timeout behavior, steps to force-log-out deleted users, concurrent session policy, and any DB schema changes needed. Include acceptance criteria and rollback steps.

- Security Sentinel Prompt:

  Review the task produced by Planner and identify exploitable flows (e.g., stale-role use, session fixation, race conditions) and required mitigations.

### ORCHESTRATOR IMPROVEMENT NOTES

- Recommend a small automated check agent that verifies session-cleanup jobs run and that deleted users have no active sessions.
