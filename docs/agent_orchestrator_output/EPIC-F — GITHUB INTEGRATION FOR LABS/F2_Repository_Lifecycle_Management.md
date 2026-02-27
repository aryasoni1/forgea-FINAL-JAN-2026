### FEATURE ANALYSIS

- Feature Type: infra / code
- Risk Level: Medium
- Touches HARD LOCK: No

### REQUIRED AGENTS

- Planner / Architect — Define repository naming convention, ownership model, and rollback criteria.
- Implementer — Implement repository creation via GitHub App, enforce org ownership, and implement rollback on failure.
- Security Sentinel — Ensure repo defaults (private), prevent public creation, and validate creation policies.
- Integration Checker — Validate API calls, confirm repo ownership and visibility, and test failure scenarios.
- Documenter — Document lifecycle and rollback behavior.

### NOT REQUIRED AGENTS

- QA / Tester — Not required for basic lifecycle implementation; can be engaged for broadened e2e scenarios.

### MISSING AGENT (ONLY IF NEEDED)

- None.

### EXECUTION PLAN

- Step 1: Planner — Define naming convention, metadata to store, and failure rollback requirements.
- Step 2: Implementer — Implement create-repo API via GitHub App, enforce private visibility and org ownership.
- Step 3: Security Sentinel — Verify prevention of public repo creation and permission boundaries.
- Step 4: Integration Checker — Simulate failures and validate rollback/cleanup behavior.
- Step 5: Documenter — Publish repo lifecycle and rollback docs.

### AGENT PROMPTS

- Planner:
  "Define lab repository naming convention, required repo settings (private, owner), and rollback/cleanup conditions for partial failures. Provide examples."

- Implementer:
  "Implement API to create private lab repositories under the Forgea org using the GitHub App. Enforce naming conventions and return deterministic errors that allow safe rollback."

- Security Sentinel:
  "Validate repository defaults and enforcement to ensure no public repos are created and permissions are restricted as per policy."

- Integration Checker:
  "Exercise the create-repo flow with valid and failure-inducing inputs. Verify rollback happens and no orphaned resources remain."

- Documenter:
  "Document the repository lifecycle, naming rules, failure modes, and rollback steps for operators."

### ORCHESTRATOR IMPROVEMENT NOTES

- Consider adding a "Repository Policy" agent to centralize naming and visibility rules across epics.
