## FEATURE CONTEXT

- Epic: EPIC-C — AUTHENTICATION & RBAC
- Feature: C12_Testing_Verification
- Exact input files read:
  - /Users/aryasoni/Desktop/Forgea/docs/agent_orchestrator_output/EPIC-C — AUTHENTICATION & RBAC/C12_Testing_Verification.md
  - /Users/aryasoni/Desktop/Forgea/docs/code-scout/EPIC-C — AUTHENTICATION & RBAC/C12_Testing_Verification.md
  - /Users/aryasoni/Desktop/Forgea/forgea-monorepo/.github/workflows/verification-and-quality-gates.yml
  - /Users/aryasoni/Desktop/Forgea/forgea-monorepo/package.json
  - /Users/aryasoni/Desktop/Forgea/forgea-monorepo/pnpm-lock.yaml

### REQUIRED OFFICIAL DOCUMENTATION

- Technology: Playwright
  - Concept: E2E browser testing for auth/provider flows
  - Official source: https://playwright.dev/
  - Exact version requirement: VERSION UNKNOWN — PRESENT IN `pnpm-lock.yaml` BUT MUST BE PINNED (e.g., Playwright X.Y.Z)
  - Why required: Defines how to simulate provider logins, intercept network, and run headless browser tests in CI.
  - Decision it informs: Test harness choice and CI workflow additions for auth E2E.
  - What breaks without it: Missing config leads to non-deterministic or non-runnable e2e tests in CI.

- Technology: Test runner (Vitest / Jest)
  - Concept: Unit/integration test execution and config
  - Official source: https://vitest.dev/ or https://jestjs.io/
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: Provides conventions for unit/integration test setup and runner semantics for auth logic.
  - Decision it informs: Which test runner to adopt and how to structure monorepo test scripts.
  - What breaks without it: `turbo run test` in CI will be a no-op or fail if no downstream test scripts exist.

### EXISTING INTERNAL DOCS (VERIFIED)

- `/forgea-monorepo/.github/workflows/verification-and-quality-gates.yml`
  - Coverage status: PARTIAL
  - Exact gaps: CI runs `verify-and-lint` and `build` but does not run e2e/auth tests. No `test:e2e` step present.

- `/forgea-monorepo/package.json`
  - Coverage status: PARTIAL
  - Exact gaps: Root script `test` delegates to `turbo run test`, but no package-level `test` tasks or `test:e2e` tasks were found.

- `/forgea-monorepo/pnpm-lock.yaml`
  - Coverage status: PARTIAL
  - Exact gaps: Contains `@playwright/test` in lockfile, but no source-level `playwright.config.*` or test files exist.

### DOCUMENTATION COVERAGE DECISION

⚠️ DOCUMENTATION PARTIAL — EXTENSION REQUIRED

- Rationale: Testing tools appear in lockfile and CI pipeline exists, but the repository lacks pinned official-doc entries for Playwright/test runner and lacks internal test-config docs and E2E harness artifacts. These must be added before QA/Planner can implement tests safely.

### STUDY GUIDE FOR HUMAN

- `Playwright` — Why: deterministic browser automation for OAuth/provider flows; Alternatives: Cypress (not present); When NOT to use: when tests can be pure API level; Common mistakes: relying on real provider endpoints in CI without test OAuth clients.
- `Vitest/Jest` — Why: unit/integration testing; Alternatives: other runners; When NOT to use: avoid mixing multiple runners in same package unless necessary; Common mistakes: missing global setup to mock provider callbacks.

### INTERNAL DOCS TO ADD OR EXTEND

- Path: /docs/official-docs/EPIC-C/testing_policy.md
  - Purpose: Project testing policy for auth flows (which flows require E2E vs integration tests, staging vs local simulation guidance).
  - Exact knowledge to add: Test environment requirements, test OAuth client provisioning steps, and staging resource checklist.
  - Required version pin: reference Playwright version and Node.js 20.x.

- Path: /docs/official-docs/EPIC-C/playwright_config_and_harness.md
  - Purpose: Playwright config and recommended harness (local provider mocks, intercepts, and CI headless settings).
  - Exact knowledge to add: Example `playwright.config.ts`, test account provisioning steps, and sample Playwright test for GitHub OAuth happy path.
  - Required version pin: Playwright exact version.

- Path: /docs/official-docs/EPIC-C/ci_test_workflow.md
  - Purpose: CI workflow snippets to run unit and e2e tests (`verification-and-quality-gates.yml` additions), artifact storage, and failure handling.
  - Exact knowledge to add: Changes to `.github/workflows/verification-and-quality-gates.yml` to include `pnpm --filter ... test:e2e` and required secrets (test OAuth client credentials).
  - Required version pin: Node.js 20.x.

### OPEN QUESTIONS / AMBIGUITIES

- Which environments will be used for E2E (local mock, staging with test OAuth client, or production provider)?
- Which test runner is preferred (Playwright for E2E; Vitest vs Jest for unit)?
- Are test OAuth clients / staging credentials available or must infra provision them?

### MASTER DOCS REGISTRY ACTION

Append the following entry to `/docs/master_docs.md`:

- Date: 2026-02-11
  - Epic / Feature: EPIC-C / C12 — Testing & Verification
  - Doc path: /docs/docs-gatekeeper/EPIC-C — AUTHENTICATION & RBAC/C12_Testing_Verification.md
  - Status: ADDED
  - Reason: Docs Gatekeeper brief created to enumerate required official docs and internal doc gaps for auth testing and CI harness.

---

End of brief.
