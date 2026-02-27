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
