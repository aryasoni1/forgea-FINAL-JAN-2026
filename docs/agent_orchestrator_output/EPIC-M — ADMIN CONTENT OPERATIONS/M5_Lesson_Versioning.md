### FEATURE ANALYSIS

- Feature Type: Data Model + Versioning + Audit
- Risk Level: High
- Touches HARD LOCK: No

### REQUIRED AGENTS

- planner-architect — Specify versioning semantics, storage, immutable version snapshots, and consumption tracking.
- docs-gatekeeper — Verify documentation coverage and registry updates.
- implementer — Implement auto-incrementing publish versions, immutable storage of prior versions, viewing UI, and tracking consumption.
- security-sentinel — Review immutability guarantees and audit log integrity.
- qa-tester — Validate version transitions, immutability, and historical view correctness.
- integration-checker — Final end-to-end approval.

### NOT REQUIRED AGENTS

- forgea-code-scout — Optional.
- documenter-historian — Post-approval.

### MISSING AGENT

- None.

### EXECUTION PLAN

- Step 1: Planner-Architect — Produce `/docs/tasks/task-M5-<YYYY-MM-DD>.md` describing version bump rules, storage model, APIs to view older versions, and audit tracking of which version users consumed.
- Step 2: Docs-Gatekeeper — Validate docs coverage. (sequential)
- Step 3: Implementer — Implement versioning, storage, and consumption tracking. (sequential)
- Step 4: Security-Sentinel — Review immutability and audit guarantees. (parallel with QA)
- Step 5: QA-Tester — Validate transitions, immutability, and audit behavior. (parallel with Security)
- Step 6: Integration-Checker — Final approval. (sequential)

### ORCHESTRATOR IMPROVEMENT NOTES

- Recommend a version retention policy to avoid unbounded storage growth; record as a planner decision.

### AGENT PROMPTS (COPY-PASTE READY)

- Planner-Architect:

Produce `/docs/tasks/task-M5-<YYYY-MM-DD>.md` for EPIC-M Feature M5 (Lesson Versioning). Include auto-increment rules, storage schema for immutable snapshots, APIs for viewing versions, and instrumentation to track which lesson version a user consumed. State retention policy options and any backward compatibility constraints.

- Docs-Gatekeeper:

Verify documentation and registry updates after the planner doc is produced.

- Implementer:

Implement exactly per approved task doc and produce `/docs/manual-checks/task-M5-manual-checks.md` and `/docs/guides/task-M5-how-to.md`.

- Security-Sentinel:

Review immutability guarantees, storage, and audit logs for tamper-resistance.

- QA-Tester:

Validate publish version bumping, immutability of historical entries, and accurate consumption tracking.

- Integration-Checker:

Verify end-to-end correctness and approve or block.
