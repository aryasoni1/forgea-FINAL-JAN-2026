# FEATURE CONTEXT

- Epic: EPIC-B — DATABASE CORE & HARDENING
- Feature: B15 — Testing & Verification
- Source: /docs/agent_orchestrator_output/EPIC-B — DATABASE CORE & HARDENING/B15_Testing & Verification.md

---

### TASKS CHECKED

- Step 1: Code scout to map verification targets and existing tests.
- Step 2: Planner writes task doc binding verification scope, test types (unit, integration, manual SQL checks), and success criteria.
- Step 3: Implementer produces `/docs/tests/task-B15-tests.md` alongside any required test scaffolding.
- Step 4: QA produces detailed test checklist.

---

### WHAT ALREADY EXISTS

- `packages/schema/prisma/migrations/*` — Migration SQL files present, including:
  - `20260124065750_init_trust_schema/migration.sql`
  - `20260124070452_add_immutability_triggers/migration.sql`
  - `20260124170000_add_auditlog_immutability_trigger/migration.sql`
  - `20260126160143_auditlog_actor_support/migration.sql`
  - `20260128113000_lab_session_lifecycle_guard/migration.sql`
    (These indicate DB-level immutability/trigger work already applied in schema migrations.)

- `packages/schema/prisma/seed.ts` — DB seed script that inserts test user, lab, labSession and calls `transitionLabSession(...)` (exercise paths that touch `Audit` actor code).

- `packages/audit/src/audit.service.ts` — Audit write logic exists (observed earlier) and will be a target for verification (writes to `db.auditLog.create`).

- Docs-level test artifacts: `/docs/tests/*.md` contain test templates for other tasks (task-A3, task-A4, task-36) — shows documentation of test artifacts exists but not for B15.

- `pnpm-lock.yaml` lists `@playwright/test` as a dependency in the lockfile (evidence of an optional e2e tool in the dependency graph), but no project-level Playwright config or scripts found.

---

### WHAT IS PARTIALLY IMPLEMENTED

- Migrations add immutability triggers and auditlog support, but there are no observable automated tests exercising those migrations or triggers.
- `seed.ts` provides a basic fixture for dev data but is not documented as a test fixture or CI-seed step.
- Docs contain test templates elsewhere, but no `/docs/tests/task-B15-tests.md` or verification task doc exists for B15.

---

### WHAT IS MISSING

- No repository-level test harness files discovered for unit/integration tests targeting DB triggers (no `*.test.*` or `*.spec.*` files found in source packages).
- No CI pipeline test script or monorepo `test` script in root `package.json` (root scripts: `build`, `dev`, `lint` only).
- No documented test plan for DB-level verification of immutability triggers, audit writes, or retention/archival checks.
- No automated SQL-check scripts or test fixtures explicitly validating Prisma/DB triggers (no `task-B15-tests.md`).
- No Playwright/Jest/Vitest config files found at repo level (though lockfile shows Playwright in dependencies).

---

### RISKS OR CONFLICTS

- DB-level immutability and audit triggers exist in migrations without automated verification; trigger regressions could silently break audit invariants.
- `seed.ts` invokes `transitionLabSession(...)` which touches audit-related code; without test assertions, behavior is not verified in CI.
- Lack of a monorepo `test` pipeline risks inconsistent or missing verification runs across apps/services.

---

### QUESTIONS FOR CLARIFICATION

- None strictly required for the planner step; planner may request policy/acceptance choices (e.g., retention windows, required invariant fields).

---

### NEXT AGENT HANDOFF PROMPT (MANDATORY)

Agent role: planner-architect

Please produce a draft task document at `/docs/tasks/task-B15-<YYYY-MM-DD>.md` following this code-scout report as the source-of-truth: `/docs/code-scout/EPIC-B — DATABASE CORE & HARDENING/B15_Testing & Verification.md`.

Include the following, strictly as a task specification (do not implement):

1. Verification goals: clearly list what must be verified (immutability triggers, audit writes present on critical flows, seed/fixture correctness, retention and truncation behavior).
2. Test categories required: unit tests, integration tests, manual SQL trigger checks, end-to-end flows (webhooks/auth flows that write audit entries), and CI orchestration steps.
3. Required test assets: DB fixtures (seed script usage / modifications), example SQL scripts to validate triggers, lists of critical actions that must emit audit events (auth hooks, webhooks, lab session transitions), and expected assertion points.
4. Test data preconditions and safety: which env variables, test DB isolate strategy (shadow DB or transaction rollback), and whether tests may truncate or reset DB.
5. Acceptance criteria: concrete pass/fail rules for each test type (e.g., immutability trigger prevents UPDATE/DELETE, audit row contains fields X,Y,Z, truncation behavior documented), plus required test coverage/guardrails.
6. Deliverables: path for the implementer to add `/docs/tests/task-B15-tests.md`, any test scaffolding requirements, and recommended non-blocking vs blocking checks for CI.

Reference this code-scout report in your draft and do not change scope or implement tests — only produce the task doc. Reply with the created file path once done.

Handoff complete. Provide this report verbatim to the next agent.
