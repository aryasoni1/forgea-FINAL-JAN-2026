### FEATURE ANALYSIS

- Feature Type: code (auth flow logic)
- Risk Level: Medium
- Touches HARD LOCK: No

### REQUIRED AGENTS

- Forgea Code Scout — Find signup/login hooks and user-upsert logic.
- Docs Gatekeeper — Ensure provisioning behavior complies with privacy and data policies.
- Planner / Architect — Specify exact provisioning rules (default role, sync behavior, role-protection rules).

### NOT REQUIRED AGENTS

- Integration Checker — Not required until implementation is ready for integration testing.

### MISSING AGENT

- None.

### EXECUTION PLAN

- Step 1: Forgea Code Scout — inventory current login/signup handlers (sequential).
- Step 2: Docs Gatekeeper — validate policy alignment (sequential).
- Step 3: Planner / Architect — produce task describing upsert behavior and role handling (sequential).

### USER PROMPTS

- Forgea Code Scout Prompt:

  Locate code paths that create or update `User` records on auth events. Report any existing upsert logic and whether roles can be overwritten.

- Docs Gatekeeper Prompt:

  Confirm that auto-provisioning and default-role assignment align with documented privacy and role policies.

- Planner / Architect Prompt:

  Produce a task that specifies: when to create users, default role assignment, fields to sync on login, and protections against overwriting roles.

### ORCHESTRATOR IMPROVEMENT NOTES

- Recommend a short checklist template for Planner tasks that covers upsert idempotency and role immutability tests.
