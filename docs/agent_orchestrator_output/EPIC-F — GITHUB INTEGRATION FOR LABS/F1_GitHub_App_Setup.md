### FEATURE ANALYSIS

- Feature Type: integration / infra
- Risk Level: Medium
- Touches HARD LOCK: No

### REQUIRED AGENTS

- Planner / Architect — Define GitHub App permission model and constraints.
- Implementer — Create GitHub App, generate private key, configure webhooks, and store secrets.
- Security Sentinel — Review permissions, ensure secure secret storage (vault/KMS), validate webhook signing approach.
- Integration Checker — Install app into org, verify webhook deliveries and permissions at repo-level.
- Documenter / Historian — Produce operational and runbook docs for app lifecycle and permissions.

### NOT REQUIRED AGENTS

- QA / Tester — Not required for initial setup (operational checks handled by Integration Checker); may be engaged later for e2e tests.

### MISSING AGENT (ONLY IF NEEDED)

- None.

### EXECUTION PLAN

- Step 1: Planner / Architect — Produce permission matrix, required webhook events, and install footprint.
- Step 2: Implementer — Create GitHub App, generate private key, add webhook secret, programmatic install flow.
- Step 3: Security Sentinel — Review and approve permission matrix and secret storage implementation. (sequential sign-off)
- Step 4: Integration Checker — Install into org, validate deliveries, confirm minimal permissions.
- Step 5: Documenter — Publish app permissions, install guide, and rollback steps.

### AGENT PROMPTS

- Planner / Architect:
  "Design the Forgea GitHub App: list required permissions (repo, contents, webhooks), minimal scopes, webhook events, and an install/uninstall workflow. Provide a permission matrix and rationale for each permission."

- Implementer:
  "Create the Forgea GitHub App with the Planner's permission matrix, generate the private key, configure webhook secret, and document how secrets are stored. Provide the App ID and storage location (vault/KMS) details."

- Security Sentinel:
  "Review the GitHub App permission matrix and secret storage plan. Validate that webhook secret is HMAC-signed, keys are rotated plan, and least privilege is enforced. Approve or list changes."

- Integration Checker:
  "Install the GitHub App into the Forgea organization, verify webhook deliveries to the backend endpoint, and confirm the app cannot perform elevated actions beyond the defined scopes. Report delivery success and any permission gaps."

- Documenter / Historian:
  "Write operational docs: App creation steps, permissions list, where secrets live, install/uninstall steps, and rollback instructions. Include expected webhook payload shapes and sample HMAC verification snippet."

### ORCHESTRATOR IMPROVEMENT NOTES

- Add a specialized "Secrets Manager" agent contract if secret storage reviews become a recurring cross-epic task.
