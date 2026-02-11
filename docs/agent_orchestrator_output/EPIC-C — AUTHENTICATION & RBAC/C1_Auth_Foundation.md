### FEATURE ANALYSIS

- Feature Type: code + infra (auth dependencies and configuration)
- Risk Level: Medium
- Touches HARD LOCK: No

### REQUIRED AGENTS

- Forgea Code Scout — Establish current auth-related files, packages, and code locations.
- Docs Gatekeeper — Verify proposed auth approach aligns with pinned official docs/standards.
- Planner / Architect — Produce the `task-C1.md` spec and constraints for implementer.

### NOT REQUIRED AGENTS

- QA / Tester — Not yet; tests are an implementer responsibility after implementation.
- Integration Checker — Not needed until implementation and infra changes exist.

### MISSING AGENT

- None.

### EXECUTION PLAN

- Step 1: Forgea Code Scout — run first to produce ground-truth (sequential).
- Step 2: Docs Gatekeeper — run second to validate approach against docs (sequential).
- Step 3: Planner / Architect — produce authoritative task spec (sequential).
- Step 4: Implementer — implement per task (starts after Planner completes).

### USER PROMPTS

- Forgea Code Scout Prompt:

  Please scan the repository for any existing auth-related code (files, middleware, services, env keys, and package.json deps), list locations, and call out potential conflicts with adding Auth.js or NextAuth. Output must reference exact file paths.

- Docs Gatekeeper Prompt:

  Validate that choosing Auth.js or NextAuth conforms to `docs/toolchain-versions.md` and `official-docs-registry.md` pinned versions. Flag any policy conflicts and required version pins.

- Planner / Architect Prompt:

  Produce `task-C1.md` describing chosen auth approach, precise implementation steps, required env inputs, DB schema changes (if any), migration plan, and rollout/rollback strategy. Include acceptance criteria.

### ORCHESTRATOR IMPROVEMENT NOTES

- Suggest adding a small agent that verifies env-secret storage policies across environments.
