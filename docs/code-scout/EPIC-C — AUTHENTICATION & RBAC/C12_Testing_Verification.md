## FEATURE CONTEXT

- Epic: EPIC-C — AUTHENTICATION & RBAC
- Feature: C12_Testing_Verification
- Source: docs/agent_orchestrator_output/EPIC-C — AUTHENTICATION & RBAC/C12_Testing_Verification.md


### TASKS CHECKED

- List existing test suites or CI jobs that exercise auth flows.
- Provide file paths and scope covered (unit, integration, e2e).
- Identify missing test harnesses required for auth/provider/session flows.


### WHAT ALREADY EXISTS

- CI workflow: `.github/workflows/verification-and-quality-gates.yml` runs `pnpm turbo run verify-and-lint` and `pnpm turbo run build` on Node.js 20.x. Evidence: [forgea-monorepo/.github/workflows/verification-and-quality-gates.yml](forgea-monorepo/.github/workflows/verification-and-quality-gates.yml#L1-L40).

- Monorepo tasks: Root `package.json` defines `test` as `turbo run test` (monorepo-level entrypoint). Evidence: [forgea-monorepo/package.json](forgea-monorepo/package.json#L1-L80).

- Dependency evidence: `pnpm-lock.yaml` includes `@playwright/test` in the lockfile (dependency present in repo lockfile). Evidence: [forgea-monorepo/pnpm-lock.yaml](forgea-monorepo/pnpm-lock.yaml#L2270-L2285).

- Documentation references: multiple doc files reference testing tools and migration plans (mentions of Vitest, Jest, Playwright, and test-related guidance). Examples:
  - `docs/RAW FILES BY USER/DOCSGATEKEEPER/...` (mentions Vitest migration and Playwright)
  - `docs/code-scout/EPIC-B — DATABASE CORE & HARDENING/B15_Testing & Verification.md` notes presence of Playwright in lockfile but missing configs.


### WHAT IS PARTIALLY IMPLEMENTED

- Turborepo verification traces and build traces mention `verify-and-lint` and `verify-typescript-setup` in build artifacts, indicating intended verification steps are integrated into local builds, but these are not evidence of committed test suites exercising auth flows.

- Some app bundles / compiled artifacts contain embedded `package.json` snippets or `test` script hints (e.g., `test: jest`) inside built artifacts (.next) — this is not authoritative for source-level test configuration.


### WHAT IS MISSING

- No source-level Playwright/Jest/Vitest configuration files located at repository root or obvious packages (no `playwright.config.*`, `vitest.config.*`, `jest.config.*` found).

- No test files discovered by pattern search (`**/*.test.*`, `**/*.spec.*`) in repository source—no unit/integration/e2e test suites directly exercising auth/provider/session flows were found.

- No package-level `scripts` that run provider-login e2e or auth-specific tests were found; `turbo run test` exists but no downstream test tasks or implementations detected.

- No test harness to simulate provider callbacks, session expiry, or deterministic session rotations was found.

- No CI job specifically exercising auth flows (provider logins, session lifecycle, forced-logout) was found in workflows — CI only runs verification/lint and build.


### RISKS OR CONFLICTS

- Repo claims/testing dependencies exist in lockfile (Playwright) but absent config and test files mean end-to-end auth coverage is likely missing or incomplete.

- Without deterministic harnesses for provider callbacks and session expiry, tests for login/logout/session revocation and admin-route protections will be flaky or manual.

- CI currently enforces lint/build but not auth functional tests; regressions in auth flows may reach staging/production undetected.


### QUESTIONS FOR CLARIFICATION

- Which environments are available for E2E testing (local mock provider, staging with live provider credentials, or a test OAuth client)?
- Is there an approved e2e tool preference (Playwright vs Cypress) for browser-driven auth flows? Documentation hints at Playwright but no config exists.
- Should the test harness simulate provider callbacks (recommended for deterministic CI) or use real provider endpoints in staging?


### NEXT AGENT HANDOFF PROMPT (MANDATORY)

Reference this report at docs/code-scout/EPIC-C — AUTHENTICATION & RBAC/C12_Testing_Verification.md.

QA / Tester (role):
- Review this code-scout report and produce `task-C12-qa-testplan.md` under `/docs/tasks/` containing copy-paste-ready test cases that cover:
  - Provider login flows (GitHub OAuth happy/failure paths).
  - Logout flow and `signOut()` behavior (DB session deletion + cookie clearing).
  - Session refresh and expiry (maxAge/updateAge semantics) including sliding refresh behavior.
  - Admin and recruiter route protections (unauthorized/forbidden responses tested).
  - Forced-logout / revocation scenarios (admin revokes user, delete user behavior).
- For each test case include: prerequisites (env vars, test OAuth client), test data, exact HTTP/API calls or Playwright steps, expected assertions, and cleanup steps.
- Do NOT implement code in this step; produce acceptance criteria and runnable test definitions (snippets or shell commands acceptable).

Integration Checker (role):
- Using this report, validate whether a staging environment can be used for end-to-end verification. Produce `task-C12-integration-check.md` listing required staging resources (test OAuth client, test DB, feature flags), and an execution checklist for running the QA test plan end-to-end.
- Confirm whether provider callbacks can be simulated locally (e.g., via wiremock or Playwright intercepts) or if real provider credentials are required.

Planner / Architect (role):
- Using this report, add a short implementation task `task-C12-setup-harness.md` that specifies: test tool choice (Playwright or equivalent), CI workflow additions (exact workflow file path to update), and required configs (playwright.config.ts or vitest config). Provide acceptance tests that QA will run.
- Do NOT write configs or SQL; list exact files to create and exact CI steps to add (e.g., add `pnpm --filter=... test:e2e` to `.github/workflows/verification-and-quality-gates.yml`).

Deliverables (each agent):
- A single-line summary referencing this report and the produced task file path.
- QA: `task-C12-qa-testplan.md` (test cases + env/setup).
- Integration Checker: `task-C12-integration-check.md` (staging checklist).
- Planner: `task-C12-setup-harness.md` (implementation checklist for CI + harness).

Context constraints: use only repository evidence in this report (CI workflow, root package.json, lockfile entries, and absence of test files/configs). Avoid adding or modifying source code in this handoff.

Handoff complete. Provide this report verbatim to the next agent.