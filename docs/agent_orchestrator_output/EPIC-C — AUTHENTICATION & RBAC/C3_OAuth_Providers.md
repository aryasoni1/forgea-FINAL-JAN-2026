### FEATURE ANALYSIS

- Feature Type: code + infra + security
- Risk Level: High
- Touches HARD LOCK: No (provider config is soft-lock after completion)

### REQUIRED AGENTS

- Forgea Code Scout — Locate current provider configs, env usage, and auth config files.
- Docs Gatekeeper — Ensure provider setup meets official docs and secret-handling policies.
- Planner / Architect — Produce explicit tasks for provider registration, env secret names, and scope limits.

### NOT REQUIRED AGENTS

- Integration Checker — Not until provider endpoints and redirect URIs are configured.

### MISSING AGENT

- None.

### EXECUTION PLAN

- Step 1: Forgea Code Scout (sequential).
- Step 2: Docs Gatekeeper (sequential).
- Step 3: Planner / Architect (sequential).
- Step 4: Implementer (after Planner).

### USER PROMPTS

- Forgea Code Scout Prompt:

  Find existing OAuth provider usage (GitHub, Google, etc.), env var names, and where secrets are read. List endpoints and redirect URIs currently in code/config.

- Docs Gatekeeper Prompt:

  Validate that secrets are managed per `GLOBAL-POLICY.md` and recommend secret names and storage locations (e.g., vault, platform env). Confirm OAuth scope restrictions.

- Planner / Architect Prompt:

  Produce a step-by-step task for registering GitHub and Google apps, env var names, required scopes, server-side config changes, and verification steps.

### ORCHESTRATOR IMPROVEMENT NOTES

- Suggest adding an agent that can validate redirect URIs against deployed environment URLs automatically.
