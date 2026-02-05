### FEATURE ANALYSIS

- Feature Type: code + infra + ops
- Risk Level: Medium
- Touches HARD LOCK: No

### REQUIRED AGENTS

- Implementer — Add provider configuration (GitHub, Google), wire env var usage, and limit scopes.
- Security Sentinel — Review OAuth client secret handling and recommend secret storage (Vault / env / CI secrets).
- Planner / Architect — Specify required OAuth scopes and verification requirements (e.g., Google verified email).
- QA / Tester — Validate OAuth flows for both providers in staging.
- Documenter / Historian — Document provider setup steps and required env variables.

### NOT REQUIRED AGENTS

- Integration Checker — Not required until full end-to-end app tests are run.

### MISSING AGENT

- None.

### EXECUTION PLAN

- Step 1: Planner lists required scopes and policy (e.g., GitHub minimal scopes, Google require `email` verified).
- Step 2: Implementer adds provider configs and environment variable placeholders; ensure secrets are not committed.
- Step 3: Security Sentinel validates secret storage and recommends rotation approach.
- Step 4: QA tests provider logins end-to-end.
- Step 5: Documenter writes setup steps for creating OAuth apps (GitHub/Google) and adding secrets to CI.

(Parallel: Steps 2 and 3 can proceed in parallel once Planner provides scopes.)

### USER PROMPTS

- Implementer:
  "Add GitHub and Google provider stubs to the auth config per the Architect decision. Use env vars `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`. Limit scopes to minimal required (e.g., `user:email` for GitHub). Ensure no secrets are committed."

- Security Sentinel:
  "Review OAuth secret handling and advise secure storage and access patterns for CI/CD. Confirm whether secret rotation guidance is needed."

- QA / Tester:
  "Validate OAuth flows in staging: successful login, email verification enforcement for Google, minimal scopes in use, and audit logging of provider info."

### ORCHESTRATOR IMPROVEMENT NOTES

- Provide standardized templates for provider setup to speed implementers (copy-paste app registration steps for GitHub/Google).
