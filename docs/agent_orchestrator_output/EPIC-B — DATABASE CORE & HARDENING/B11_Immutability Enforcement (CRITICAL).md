### FEATURE ANALYSIS

- Feature Type: code / infra / security
- Risk Level: High
- Touches HARD LOCK: Yes

### REQUIRED AGENTS

- forgea-code-scout — Determine existing schema, triggers, and migrations
- docs-gatekeeper — Validate any referenced PostgreSQL or audit hardening docs
- planner-architect — Produce an approved, unambiguous task document for DB triggers
- implementer — Implement triggers and migrations per approved task doc
- security-sentinel — Review for attacker paths and irreversible-data risks
- qa-tester — Define and verify test cases for immutability enforcement
- integration-checker — Final end-to-end approval
- documenter-historian — Capture decisions, branch and commit guidance

### NOT REQUIRED AGENTS

- Any UI/UX agent — Reason: no UI work

### MISSING AGENT

- None — existing agents cover required capabilities

### EXECUTION PLAN

- Step 1 (parallel): Code scout & Docs gatekeeper run to gather facts and required references. (parallel)
- Step 2: Planner produces a task document anchored to scout findings and approved docs.
- Step 3: Security sentinel reviews the plan and flags hardening or rollback constraints.
- Step 4: On planner approval, Implementer implements migrations and triggers; produce a test plan file.
- Step 5 (parallel): QA reviews test plan while Implementer finishes implementation. (parallel)
- Step 6: Integration checker performs end-to-end gate; Documenter records decisions and commit guidance.

### USER PROMPTS

- forgea-code-scout (copy/paste):
  "Task: FEATURE B11 — Immutability Enforcement (DB triggers)
  Please scan the repo for existing DB schema, Prisma models, and any current triggers or migration files related to `AuditLog`, `ProofArtifact`, and `VerificationAttempt`. Report: what exists (file paths), what is partially implemented, and explicit missing pieces. Output must end with: 'Handoff complete. Provide this report verbatim to the next agent.'"

- docs-gatekeeper (copy/paste):
  "Task: FEATURE B11 — Immutability Enforcement
  Verify official PostgreSQL or audit-hardening documentation referenced by the planner. Check `/docs/official-docs-registry.md` for required links; if missing, list exactly which official docs and version strings are required to proceed. Do NOT proceed without registry-approved docs."

- planner-architect (copy/paste):
  "Produce `/docs/tasks/task-B11-<YYYY-MM-DD>.md` (DRAFT) for Immutability Enforcement. Use Code Scout and Doc Gatekeeper outputs. The document must: define Goal, Scope, Preconditions, Invariants (immutable tables, fail-closed behavior), Step-by-step plan (no SQL code), Files to modify (prisma/schema.prisma, migrations, db/triggers), Verification Criteria, and Files NOT to touch (locked schemas). Stop and await explicit user approval."

- security-sentinel (copy/paste):
  "Review the planner draft for B11. Deliver: Attack surface, exploit paths, severity rating, and mandatory fixes before implementation (especially rollback/repair risks). Block if any immutable data path allows silent mutation or unknown rollback."

- implementer (copy/paste):
  "On approved task doc for B11, implement DB triggers and migrations exactly per the document. Produce `/docs/tests/task-B11-tests.md` test plan (mandatory) and list exact files touched and a suggested branch name and commit messages. Do NOT execute tests."

- qa-tester (copy/paste):
  "When `/docs/tests/task-B11-tests.md` and implementation are available, produce a QA validation checklist covering happy paths, failure paths, direct DB bypass attempts, concurrency/replay scenarios, and invariant enforcement. Stop if any test is ambiguous or missing."

- integration-checker (copy/paste):
  "After implementation and QA artifacts exist, run end-to-end checks (by inspection): confirm migrations, triggers, and test plan cover required invariants. Output APPROVE or BLOCK with rationale and follow-ups."

- documenter-historian (copy/paste):
  "When B11 is implemented, capture: suggested branch name, commit messages, summary of what was built, decision log (why triggers chosen), rollback implications, and docs to update."

### ORCHESTRATOR IMPROVEMENT NOTES

- Suggest clarifying `agent-capabilities.md` with concise capability matrices per agent.
- Consider an explicit 'DB-Infra' agent for complex trigger/migration tasks (advisory only).

### STOP CONDITION

Stop after agents are selected and prompts generated. Do not proceed to planning or implementation without planner output and explicit approvals.
