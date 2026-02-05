### FEATURE ANALYSIS

- Feature Type: code + documentation
- Risk Level: Medium
- Touches HARD LOCK: No

### REQUIRED AGENTS

- Planner / Architect — Choose auth approach (Auth.js vs NextAuth), shape integration points, and define scope.
- Implementer — Install and configure auth provider, add service scaffolding in `services/auth/**` and `middleware/auth.ts`.
- Security Sentinel — Review secrets handling, cookie/session security, and provide guidance on secure defaults.
- QA / Tester — Define verification tests for sign-in/sign-up flows and session behavior.
- Documenter / Historian — Produce short decision doc explaining chosen approach and rationale.

### NOT REQUIRED AGENTS

- Integration Checker — Not required for selection/initial config; may be used later for end-to-end validation.
- Forgea Code Scout — Not required now; can be engaged for later code-review automation.

### MISSING AGENT (ONLY IF NEEDED)

- Name: —
- Responsibility: —
- Why existing agents are insufficient: —

### EXECUTION PLAN

- Step 1: Architect compares Auth.js vs NextAuth and picks a strategy; produce <1-page> decision note.
- Step 2: Implementer locks package versions and adds minimal auth scaffold in `services/auth` and `middleware/auth.ts`.
- Step 3: Security Sentinel reviews environment & cookie settings and approves defaults for prod.
- Step 4: QA creates basic end-to-end tests for login flow and session creation.
- Step 5: Documenter publishes the decision note and developer setup steps.

(Parallel steps: Step 3 can run in parallel with Step 2 once scaffold exists.)

### USER PROMPTS

- Planner / Architect:
  "You are the Planner/Architect. Decide between Auth.js and NextAuth for the Forgea monorepo. Consider: Next.js integration across `apps/*`, DB-backed sessions (Prisma), extensibility for OAuth providers, and minimal runtime complexity. Produce a 1-page decision: chosen approach, trade-offs, required package list, and a short migration/rollback note. Files of interest: services/auth/\*\*, middleware/auth.ts, packages/schema/ (DB models)."

- Implementer:
  "You are the Implementer. Implement the chosen auth skeleton per the Architect decision: add dependencies (lock versions), create `services/auth/` with provider config stubs, add `middleware/auth.ts` that exports an auth guard, and wire minimal routes for login/logout. Use DB-backed sessions via Prisma if chosen. Commit changes to a feature branch."

- Security Sentinel:
  "You are the Security Sentinel. Review the proposed auth config and scaffold: verify cookie `HttpOnly`, `Secure` in prod, `SameSite` policy, session idle/absolute timeouts, and secure storage of client secrets (env usage). Provide a short checklist and required env vars."

- QA / Tester:
  "You are the QA Tester. Create test cases for sign-in, sign-up, session creation, and token/cookie attributes. Provide a checklist and at least one runnable E2E test outline (tools you prefer: Playwright / Cypress)."

- Documenter / Historian:
  "You are the Documenter. Draft the auth decision doc summarizing: chosen approach, rationale, installation steps, locked package versions, and example env vars. Place it under `docs/` and link from EPIC-C index."

### ORCHESTRATOR IMPROVEMENT NOTES

- Make agent capability files explicit about which agent owns environment/secret policies.
- Consider a small `secrets-handling` agent or checklist if security reviews become a bottleneck.
