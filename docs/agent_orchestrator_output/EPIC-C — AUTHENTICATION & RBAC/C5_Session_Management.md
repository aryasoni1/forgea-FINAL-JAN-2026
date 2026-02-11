### FEATURE ANALYSIS

- Feature Type: code + infra (session storage and cookie policy)
- Risk Level: High
- Touches HARD LOCK: No

### REQUIRED AGENTS

- Forgea Code Scout — Identify existing session strategies (cookie, JWT, DB sessions) and `Session` model/migrations.
- Docs Gatekeeper — Verify session policies (cookie flags, idle/absolute expiry) against `GLOBAL-POLICY.md`.
- Planner / Architect — Produce migration/config tasks for chosen DB-backed session strategy and cookie settings.

### NOT REQUIRED AGENTS

- Documenter/Historian — Not required at this stage; documentation follows implementation.

### MISSING AGENT

- None.

### EXECUTION PLAN

- Step 1: Forgea Code Scout — inventory session handling and models (sequential).
- Step 2: Docs Gatekeeper — validate policy compliance (sequential).
- Step 3: Planner / Architect — produce concrete task (sequential).
- Step 4: Implementer — implement per planner outputs.

### USER PROMPTS

- Forgea Code Scout Prompt:

  Report current session implementation: whether sessions are stored in DB, cookie settings in code, and existence of `Session` table/migration files.

- Docs Gatekeeper Prompt:

  Confirm required cookie flags (`HttpOnly`, `Secure`, `SameSite`) and recommended idle/absolute timeout values per org policy.

- Planner / Architect Prompt:

  Produce a task that specifies DB-backed session schema, FK to `User`, cookie settings for prod vs dev, and upgrade/migration steps.

### ORCHESTRATOR IMPROVEMENT NOTES

- Propose a standard session-policy template agents can reuse (cookie settings + timeout defaults).
