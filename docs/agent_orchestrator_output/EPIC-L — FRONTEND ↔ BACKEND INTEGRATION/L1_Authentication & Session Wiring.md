### FEATURE ANALYSIS

- Feature Type: integration
- Risk Level: High
- Touches HARD LOCK: No

### REQUIRED AGENTS

- planner-architect — Produce an authoritative, doc-anchored task document describing exact preconditions, locked decisions, and implementation constraints.
- docs-gatekeeper — Verify required official/internal documentation and registry updates for safe auth/session work.
- forgea-code-scout — Report repository truth about existing auth endpoints, session stores, and related UI hooks.
- security-sentinel — Perform attacker-minded review of proposed session flows and token handling.
- implementer — Implement approved task document and produce required deliverables.
- qa-tester — Validate behavior, failure modes, and abuse cases once implementation and tests exist.
- integration-checker — Final end-to-end approval gate.
- documenter-historian — Record decisions, branch/commit suggestions, and docs to update.

### NOT REQUIRED AGENTS

- agent orchestrator — Not required to act beyond this file creation.

### MISSING AGENT (ONLY IF NEEDED)

- Name: session-emulator
- Responsibility: Provide reproducible session emulation stubs for offline frontend verification (non-production mocks).
- Why existing agents are insufficient: Current agent contracts do not include a dedicated actor to produce safe, reproducible session emulators for frontend dev/test teams. This is advisory only.

### EXECUTION PLAN

- Step 1 (parallel): Run `docs-gatekeeper` and `forgea-code-scout` to gather required docs and repository facts. (parallel)
- Step 2: `planner-architect` consumes those findings and writes an approved task document with Locked Decisions and Preconditions.
- Step 3: After user approval, `implementer` executes the task and creates required artifacts (`/docs/manual-checks`, `/docs/guides`, etc.).
- Step 4 (parallel): `security-sentinel` and `qa-tester` review the implementation and test artifacts. (parallel)
- Step 5: `integration-checker` performs final end-to-end verification and returns APPROVE or BLOCK.
- Step 6: `documenter-historian` records decisions and suggests registry updates.

### ORCHESTRATOR IMPROVEMENT NOTES

- Consider adding a `session-emulator` agent to produce safe frontend stubs for session flows.
- Ensure `planner-architect` receives docs-gatekeeper output as advisory input to avoid missing doc-level preconditions.

### AGENT PROMPTS (COPY-PASTE READY)

- planner-architect:
	Please produce an authoritative task document for FEATURE L1 (Authentication & Session Wiring) using the EPIC task at `/docs/tasks/master_tasks_V1/EPIC-L — FRONTEND ↔ BACKEND INTEGRATION.md` and this Orchestrator output located at `/docs/agent_orchestrator_output/EPIC-L — FRONTEND ↔ BACKEND INTEGRATION/L1_Authentication & Session Wiring.md`. Deliver `/docs/tasks/task-L1-<YYYY-MM-DD>.md` that includes: preconditions, Locked Decisions (with exact doc citations), API contracts to be relied upon, failure modes and rollback behavior, required manual-checks and guides placeholders, and an explicit list of open questions. Do NOT implement code. Stop and request user approval when complete.

- forgea-code-scout:
	Scan repository source files (apps/web/**, apps/lab-ui/**, services/api/**) for existing auth/session implementations relevant to L1. Produce `/docs/code-scout/EPIC-L/L1_Authentication & Session Wiring.md` with: WHAT EXISTS, WHAT IS PARTIAL, WHAT IS MISSING, RISKS, and a one-paragraph handoff to Planner summarizing facts only.

- docs-gatekeeper:
	Validate required official/internal documentation for authentication and session handling referenced by the planner. Produce `/docs/docs-gatekeeper/EPIC-L/L1_Authentication & Session Wiring.md` and update registry entries as required. Mark coverage SUFFICIENT/PARTIAL/MISSING and list exact gaps.

- security-sentinel:
	After the Planner produces a task doc (and again after implementation), review token handling, cookie flags, session storage, logout/invalidation, and replay/forgery risks. Produce Attack Surface, Exploitable Paths, Severity, and Required Fixes.

- implementer:
	Do not begin until a Planner-produced task document is APPROVED. Then implement exactly as specified and create all mandatory artifacts: `/docs/manual-checks/task-L1-manual-checks.md` and `/docs/guides/task-L1-how-to.md` (and `/docs/tests/task-L1-tests.md` only if QA is required). Do not expand scope.

- qa-tester:
	After implementation and test artifacts exist, execute QA verification against `/docs/tests/task-L1-tests.md` and the running system. Validate failure modes, abuse scenarios, and invariants. Block and escalate if artifacts are missing or ambiguous.

- integration-checker:
	After Security and QA complete, perform end-to-end checks and return `APPROVE` or `BLOCK` with a summary of end-to-end flow and any unresolved risks.

- documenter-historian:
	After final approval, produce a decision log summarizing Locked Decisions, suggested branch name, commit messages, docs to update, and follow-up tasks.
