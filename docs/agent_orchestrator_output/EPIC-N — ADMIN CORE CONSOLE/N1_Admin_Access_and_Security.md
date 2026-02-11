### FEATURE ANALYSIS

- Feature Type: code + security + admin UI
- Risk Level: High
- Touches HARD LOCK: No

### REQUIRED AGENTS

- planner-architect — Produce an approval-gated task document with explicit scope, invariants, preconditions, and locked decisions.
- docs-gatekeeper — Verify required documentation and registry entries before implementation.
- security-sentinel — Perform threat modeling and surface any blockers.
- implementer — Implement the approved task document exactly and produce required artifacts.
- qa-tester — Validate abuse/failure cases and ensure invariants hold.
- integration-checker — Provide final end-to-end APPROVE/BLOCK decision.
- documenter-historian — Capture decision log, suggested commit messages, and docs updates.

### NOT REQUIRED AGENTS

- forgea-code-scout — Repository scanning is useful but optional; not required for initial planning.

### MISSING AGENT (ONLY IF NEEDED)

- None identified.

### EXECUTION PLAN

- Step 1: Planner/Architect — produce `/docs/tasks/task-N1-2026-02-10.md` (sequential)
- Step 2 (parallel): Docs Gatekeeper — validate docs; Security Sentinel — perform security review (parallel)
- Step 3: Implementer — implement per approved task doc (sequential)
- Step 4: QA/Tester — run validation against approved test artifacts (sequential)
- Step 5: Integration Checker — final end-to-end APPROVE or BLOCK (sequential)
- Step 6: Documenter/Historian — record decisions and update docs registry (sequential)

### ORCHESTRATOR IMPROVEMENT NOTES

- Encourage Planner to include explicit DB schema and auth flow diagrams to speed Security Sentinel review.

### AGENT PROMPTS (copy-paste-ready)

- Planner/Architect:
Produce an approval-gated task document for FEATURE N1 — Admin Access & Security. Inputs: `/docs/tasks/master_tasks_V1/EPIC-N — ADMIN CORE CONSOLE.md`. Output path: `/docs/tasks/task-N1-2026-02-10.md`. Include: scope, invariants, required deliverables, locked decisions, preconditions, and explicit open questions.

- Docs Gatekeeper:
Validate documentation coverage for FEATURE N1. Read the orchestrator output at `/docs/agent_orchestrator_output/EPIC-N — ADMIN CORE CONSOLE/N1_Admin_Access_and_Security.md` and produce `/docs/docs-gatekeeper/EPIC-N/N1_docs.md` with coverage decision and registry updates.

- Security Sentinel:
Perform threat modeling for admin authentication, session validation, and audit logging. Base findings on the Planner task doc at `/docs/tasks/task-N1-2026-02-10.md` and report Attack Surface, Exploitable Paths, Severity, and Required Fixes.

- Implementer:
Implement only what the approved task doc `/docs/tasks/task-N1-2026-02-10.md` specifies. Produce required artifacts per implementer contract (manual-checks, how-to guide). Do NOT proceed without APPROVAL.

- QA/Tester:
Prepare a test verification document `/docs/tests/task-N1-tests.md` and validate the implementation against it. Focus on authentication bypass, session replay, privilege escalation, and audit logging.

- Integration Checker:
After QA, run end-to-end review and respond APPROVE or BLOCK. Verify invariants and integration risks.

- Documenter/Historian:
Record final decisions, branch/commit suggestions, and docs to update. Produce a decision log entry referencing the task and integration outcome.
