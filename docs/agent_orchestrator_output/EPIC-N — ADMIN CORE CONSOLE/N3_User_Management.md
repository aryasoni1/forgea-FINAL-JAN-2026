### FEATURE ANALYSIS

- Feature Type: user management / admin workflows
- Risk Level: High
- Touches HARD LOCK: No

### REQUIRED AGENTS

- planner-architect — Define scope for listing, viewing, suspending, and reinstating users; include audit requirements.
- docs-gatekeeper — Verify docs that govern user lifecycle, suspension rules, and audit retention.
- security-sentinel — Review privilege escalation risks and ensure destructive actions are gated.
- implementer — Implement per approved task doc and produce required artifacts.
- qa-tester — Validate suspension/reinstatement flows, audit logging, and invariants.
- integration-checker — Approve end-to-end behavior.
- documenter-historian — Record decisions and docs updates.

### NOT REQUIRED AGENTS

- forgea-code-scout — Optional repository scan; not required for initial plan.

### MISSING AGENT

- None identified.

### EXECUTION PLAN

- Step 1: Planner/Architect — produce `/docs/tasks/task-N3-2026-02-10.md` (sequential)
- Step 2 (parallel): Docs Gatekeeper & Security Sentinel — validate docs and review destructive action gating (parallel)
- Step 3: Implementer — implement per approved task doc (sequential)
- Step 4: QA/Tester — validate suspend/reinstate, audit logs, and role checks (sequential)
- Step 5: Integration Checker — final APPROVE/BLOCK (sequential)
- Step 6: Documenter/Historian — finalize docs and decision log (sequential)

### ORCHESTRATOR IMPROVEMENT NOTES

- Require Planner to enumerate audit retention and exact fields to be logged for suspensions to avoid ambiguity.

### AGENT PROMPTS (copy-paste-ready)

- Planner/Architect:
Produce an approval-gated task document for FEATURE N3 — User Management. Inputs: `/docs/tasks/master_tasks_V1/EPIC-N — ADMIN CORE CONSOLE.md`. Output: `/docs/tasks/task-N3-2026-02-10.md`. Include exact fields, API contracts, audit format, and invariants.

- Docs Gatekeeper:
Validate documentation coverage and produce `/docs/docs-gatekeeper/EPIC-N/N3_docs.md` with registry updates.

- Security Sentinel:
Review suspension and reinstatement flows for privilege escalation and irreversible data risks. Provide required mitigations.

- Implementer:
Implement only per approved task doc; produce manual-checks and a how-to guide.

- QA/Tester:
Validate account suspension/reinstatement, audit entries, and role enforcement. Produce `/docs/tests/task-N3-tests.md`.

- Integration Checker:
Run integration review and respond APPROVE or BLOCK.

- Documenter/Historian:
Record final decisions and update registry entries.
