### FEATURE ANALYSIS

- Feature Type: verification + QA
- Risk Level: Low
- Touches HARD LOCK: No

### REQUIRED AGENTS

- QA / Tester — Define and implement tests: E2E (Playwright/Cypress), integration, and unit tests for auth flows.
- Implementer — Provide testable hooks and test accounts; instrument code for testability.
- Integration Checker — Run end-to-end verification across apps and services.
- Planner / Architect — Approve test scope and success criteria.

### NOT REQUIRED AGENTS

- Documenter / Historian — Document test runs after they're stable.

### MISSING AGENT

- None.

### EXECUTION PLAN

- Step 1: QA defines test matrix: GitHub/Google login, logout, session persistence, admin protection, recruiter restrictions, and API auth failures.
- Step 2: Implementer adds test accounts and deterministic test flows; expose test hooks where needed.
- Step 3: Integration Checker executes E2E tests across `apps/*` and reports failures.
- Step 4: QA verifies test stability and documents flaky cases.

### USER PROMPTS

- QA / Tester:
"Create a test matrix and automated tests covering: provider logins, logout flow, session persistence on refresh, admin route protection, recruiter access restrictions, and API auth failure modes. Prefer Playwright for cross-app E2E tests."

- Implementer:
"Add test accounts/fixtures and any necessary test-only endpoints or environment flags to allow automated auth flows in CI. Ensure secrets used for testing are isolated from production."

- Integration Checker:
"Run the E2E suite across the monorepo apps and report any cross-service auth or session issues."

### ORCHESTRATOR IMPROVEMENT NOTES

- Provide a shared auth-test fixture repository or helper to speed QA across apps.
