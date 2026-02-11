### FEATURE ANALYSIS

- Feature Type: testing & verification
- Risk Level: Low
- Touches HARD LOCK: No

### REQUIRED AGENTS

- QA / Tester — Design and execute test plans for provider logins, logout, session persistence, and route protections.
- Integration Checker — Validate end-to-end flows across services and session stores.
- Forgea Code Scout — Identify test entry points and existing test harnesses.
- Planner / Architect — Author acceptance criteria and required test environments (mocks, staging envs).

### NOT REQUIRED AGENTS

- Docs Gatekeeper — Not required for writing tests, but may be useful for documentation-related checks.

### MISSING AGENT

- None.

### EXECUTION PLAN

- Step 1: Forgea Code Scout — report existing tests, test frameworks, and CI pipelines that run them (sequential).
- Step 2: Planner / Architect — produce a test plan document with test cases mapped to acceptance criteria (sequential).
- Step 3: QA / Tester & Integration Checker — implement and run tests in staging (parallel).
- Step 4: Report results and required fixes back to Planner (sequential).

### USER PROMPTS

- Forgea Code Scout Prompt:

  List existing test suites or CI jobs that exercise auth flows. Provide file paths and the scope they cover (unit, integration, e2e).

- QA / Tester Prompt:

  Create a copy-paste-ready test plan that covers: GitHub/Google login flows, logout flow, session refresh and expiry, admin route protection, recruiter restrictions, and API auth failures. Include test data and environment setup steps.

- Integration Checker Prompt:

  Validate end-to-end scenarios in a staging-like environment and report any cross-service session or auth failures.

### ORCHESTRATOR IMPROVEMENT NOTES

- Propose a reusable auth test harness that can simulate provider callbacks and session expiry for deterministic tests.
