### FEATURE ANALYSIS

- Feature Type: schema / data verification
- Risk Level: Low
- Touches HARD LOCK: No

### REQUIRED AGENTS

- Forgea Code Scout — Verify DB schema definitions and ORM models for `User` table.
- Docs Gatekeeper — Confirm schema requirements align with documented data policies.
- Planner / Architect — Create task specifying exact DB checks, migrations, and constraints.

### NOT REQUIRED AGENTS

- Security Sentinel — Not required for read-only verification; implementer will engage if changes needed.

### MISSING AGENT

- None.

### EXECUTION PLAN

- Step 1: Forgea Code Scout — Inventory `User` table, model files, and migrations (sequential).
- Step 2: Docs Gatekeeper — Validate schema against policy (sequential).
- Step 3: Planner / Architect — Produce migration plan if issues found (sequential).

### USER PROMPTS

- Forgea Code Scout Prompt:

  Locate all `User` table definitions (migrations, ORM models, SQL files). For each, report whether `id` is PK, `email` unique, and presence of `name`, `image`, `role`, and timestamps.

- Docs Gatekeeper Prompt:

  Confirm these schema fields meet official data-model policy; if not, specify required constraints and acceptable alternatives.

- Planner / Architect Prompt:

  Produce a migration task (if needed) with exact SQL/ORM change steps, backward-compatibility notes, and verification steps.

### ORCHESTRATOR IMPROVEMENT NOTES

- Recommend agent output include sample SQL snippets for common ORMs used in the repo to speed migration planning.
