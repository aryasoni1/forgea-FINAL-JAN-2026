# FEATURE CONTEXT

- Epic: EPIC-G — PUSH FLOW & SNAPSHOT PREVIEW
- Feature: G3 — Repo → Session Binding
- Source: docs/agent_orchestrator_output/EPIC-G — PUSH FLOW & SNAPSHOT PREVIEW/G3_Repo_→_Session_Binding.md

---

### TASKS CHECKED
- Feature listing and tasks found in: docs/tasks/master_tasks_V1/EPIC-G— PUSH FLOW & SNAPSHOT PREVIEW.md
  - Feature G3 present under EPIC-G (Feature G3 — Repo → Session Binding)
  - Task found: "20. Audit rejected session bindings"

---

### WHAT ALREADY EXISTS
- docs/agent_orchestrator_output/EPIC-G — PUSH FLOW & SNAPSHOT PREVIEW/G3_Repo_→_Session_Binding.md
  - Agent Orchestrator output for this feature: contains Feature Analysis, Required Agents (planner-architect, implementer, qa-tester), Execution Plan, and an improvement note recommending TTLs/caching guidance.

- docs/tasks/master_tasks_V1/EPIC-G— PUSH FLOW & SNAPSHOT PREVIEW.md
  - Epic-level task file that lists Feature G3 and at least one task (audit rejected session bindings).

- forgea-monorepo/packages/schema/prisma/schema.prisma
  - `Lab` model includes `baseRepoUrl` and `repoVersion`; `LabSession` model exists with `userForkUrl`, `status`, timestamps. These DB fields are present and used by existing flows.

- forgea-monorepo/packages/schema/prisma/seed.ts
  - Seed data contains example `baseRepoUrl` values used by sample sessions.

- Built frontend artifacts (apps/forgea-admin/.next/*)
  - Built admin UI includes a "Live Session Monitor" view and a "Lab Authoring Form" with a `Base Repository URL` field (example placeholder `https://github.com/forgea/lab-template`). These are visible in built assets, indicating UI-level expectations for repo↔session linkage.

- Multiple design/docs references
  - Several docs reference the need for `GitHubRepoMapping`, `GitHubAccount`, `LabVersion`, and backfill/migration plans (EPIC-B and EPIC-F code-scout/docs entries). Those tasks and guidance are present in docs/tasks and docs/code-scout but not implemented as schema code.

---

### WHAT IS PARTIALLY IMPLEMENTED
- UI: Admin UI field `Base Repository URL` and Live Session Monitor are present in built frontend artifacts, but the canonical source for the UI component(s) was not found in repository source paths (built artifacts exist; corresponding source entry for the specific page component could not be located under apps/forgea-admin/app in this scan).

- Schema: `Lab.baseRepoUrl` and `LabSession.userForkUrl` exist, so ad-hoc repo/session linkage via URL strings is possible today.

- Documentation: Orchestrator output and Epic/task documents define the work and expected agents; they do not contain binding rules or an exact repo->session lookup algorithm.

---

### WHAT IS MISSING
- Planner-produced binding rules/spec (exact lookup keys, rejection conditions, race-condition preconditions). — Not found
- Implementer code: the repo->session lookup implementation, session-status checks, atomic rejection logic, and rejection auditing endpoints/records. — Not found
- Canonical mapping tables and models: `GitHubAccount` and `GitHubRepoMapping` Prisma models are not present in `packages/schema/prisma/schema.prisma`. — Not found
- `LabVersion` model and session → lab-version FK (recommended in EPIC-B) for canonical snapshot linkage. — Not found
- Migration/backfill scripts to seed mapping tables from `User.githubId`, `Lab.baseRepoUrl`, and `LabSession.userForkUrl`. — Not found
- Webhook handler changes: webhook route updates to resolve sessions via `providerRepoId`/`GitHubRepoMapping` instead of brittle string matching. — Not found
- QA test plans and targeted edge-case tests for session-state race conditions. — Not found
- Canonical base template repository or template artifacts referenced by the UI (UI shows placeholder but no canonical template repo artifact discovered). — Not found

---

### RISKS OR CONFLICTS (observed in repo)
- Data migration risk: introducing `GitHubRepoMapping` / `GitHubAccount` and backfilling from `User.githubId`/`userForkUrl` will require careful migration to avoid downtime or inconsistent lookups.
- Stale or ambiguous bindings: Orchestrator recommends TTLs/caching guidance; without TTLs, lookups may match stale repo→session relationships.
- UI/UX mismatch: Admin UI exposes `Base Repository URL` input while no canonical template repo is enforced; risk of exposing non-existent repos to users.
- Partial implementation: existing flows rely on ad-hoc string matching (`userForkUrl`) which is brittle compared to providerRepoId-based lookups described in docs/tasks; switching without backfill could break webhook resolution.

---

### QUESTIONS FOR CLARIFICATION
- None strictly required by the scout; planner should clarify required deliverables below if needed.

---

### NEXT AGENT HANDOFF PROMPT (for `planner-architect`)

Planner-architect — use this report at docs/code-scout/EPIC-G — PUSH FLOW & SNAPSHOT PREVIEW/G3_Repo_→_Session_Binding.md as the source of truth and produce the binding specification required by the Orchestrator.

Deliverables (copy/paste-ready):
- A binding rules document that defines the exact repo→session lookup algorithm (primary/secondary lookup keys, tie-breakers), explicit rejection conditions (when a mapping must be rejected), and the required audit events/fields that must be emitted on rejection.
- Race-condition preconditions and invariants that implementers must rely on (including any locking or atomic-update requirements) and explicit TTL/caching guidance for repo→session mappings.
- A concise list of DB schema additions required (names only: e.g., GitHubRepoMapping, GitHubAccount, LabVersion) and the minimal fields each mapping must expose to support the lookup and auditing (no SQL or migration code, only schema-level names/fields to be implemented by the next agent).
- A failure/retry policy and operational guidance for safely rolling out mapping changes (including backfill safety checks and a short checklist for verification before cutover).

Reference files and findings embedded in this report (do NOT modify):
- docs/agent_orchestrator_output/EPIC-G — PUSH FLOW & SNAPSHOT PREVIEW/G3_Repo_→_Session_Binding.md
- docs/tasks/master_tasks_V1/EPIC-G— PUSH FLOW & SNAPSHOT PREVIEW.md (Feature G3 listing, task 20)
- forgea-monorepo/packages/schema/prisma/schema.prisma (current `Lab` / `LabSession` fields like `baseRepoUrl`, `userForkUrl`)
- docs/code-scout and task documents under EPIC-B and EPIC-F that reference `GitHubRepoMapping`, `LabVersion`, and backfill steps.

Scope constraints: produce only the specification and preconditions; do not implement code, migrations, or tests in this step.

---

Handoff complete. Provide this report verbatim to the next agent.
