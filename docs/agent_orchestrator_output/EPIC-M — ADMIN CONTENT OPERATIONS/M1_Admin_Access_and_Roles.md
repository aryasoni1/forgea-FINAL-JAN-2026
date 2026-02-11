### FEATURE ANALYSIS

- Feature Type: Code + Security (Admin access control)
- Risk Level: High
- Touches HARD LOCK: No

### REQUIRED AGENTS

- planner-architect — Produce an approved task document and locked decisions for access rules.
- docs-gatekeeper — Verify required official/internal docs and registry entries before implementation.
- implementer — Implement role, guards, and audit hooks per approved task doc.
- security-sentinel — Review auth, RBAC, audit, and failure modes.
- qa-tester — Validate invariants, unauthorized access rejection, and audit logging.
- integration-checker — Final end-to-end approval before merge.

### NOT REQUIRED AGENTS

- forgea-code-scout — (Optional) Repo facts only; not required for orchestration.
- documenter-historian — Post-approval; not required now.

### MISSING AGENT

- None.

### EXECUTION PLAN

- Step 1: Planner-Architect — Create `/docs/tasks/task-M1-<YYYY-MM-DD>.md` with exact scope, APIs, invariants, and required outputs. (sequential)
- Step 2: Docs-Gatekeeper — Validate documentation coverage and registry updates. (sequential)
- Step 3: Implementer — Implement code and produce required artifacts (`/docs/manual-checks/...`, `/docs/guides/...`). (sequential)
- Step 4: Security-Sentinel — Security review of implementation. (parallel with QA after implementer)
- Step 5: QA-Tester — Run validation against task and test artifacts. (parallel with Security)
- Step 6: Integration-Checker — Final approval (sequential)

### ORCHESTRATOR IMPROVEMENT NOTES

- Suggest adding a standard RBAC test matrix template to speed QA.

### AGENT PROMPTS (COPY-PASTE READY)

- Planner-Architect:

Please produce one task document at `/docs/tasks/task-M1-<YYYY-MM-DD>.md` for EPIC-M FEATURE M1 (Admin Access & Roles). Deliverables:
- Precise scope and APIs to add `ADMIN` role and guard middleware.
- Locked decisions for where roles are stored (DB table vs external), audit requirements, and routes to protect.
- Preconditions, invariants (no admin route accessible without `ADMIN`), rollback plan, and file paths to change (`apps/admin/**`, `services/admin-content/**`).
- List required docs or missing registry entries.

- Docs-Gatekeeper:

Validate documentation for the planned M1 changes. Read `/docs/tasks/task-M1-*.md` once produced and produce `/docs/docs-gatekeeper/EPIC-M/M1_Docs_Brief.md`. Ensure official docs/reg entries exist for auth libraries and RBAC patterns; list gaps with required doc paths.

- Implementer:

Implement exactly what's in `/docs/tasks/task-M1-<date>.md` after it is APPROVED. Produce mandatory artifacts: `/docs/manual-checks/task-M1-manual-checks.md` and `/docs/guides/task-M1-how-to.md`. Do not proceed without approval.

- Security-Sentinel:

After implementation, perform attacker-minded review focusing on admin route auth, privilege escalation, audit log integrity, and failure modes. Provide an `Attack Surface` and `Required Fixes` report.

- QA-Tester:

After implementer produces code and test artifacts (if any), validate unauthorized access is impossible, concurrency behavior for role changes, audit logging for all admin actions, and that published invariants hold. Report blockers if evidence is missing.

- Integration-Checker:

Run final end-to-end verification and decide APPROVE or BLOCK. Verify all invariants, documentation updates, and that deliverables exist.
