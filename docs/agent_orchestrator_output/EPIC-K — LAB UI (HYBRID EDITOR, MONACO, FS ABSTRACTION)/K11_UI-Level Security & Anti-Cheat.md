### FEATURE ANALYSIS

- Feature Type: security / code
- Risk Level: High
- Touches HARD LOCK: No

### REQUIRED AGENTS

- security-sentinel — Primary reviewer for anti-cheat strategies, throttling, and data-leak mitigations.
- forgea-code-scout — Inventory code paths that could enable bulk downloads, hidden-file search, or copy leaks.
- planner-architect — Produce an exact, approval-gated plan declaring allowed mitigations and user-visible restrictions.
- docs-gatekeeper — Verify any policy or regulatory docs impacted by anti-cheat measures.
- implementer — Implement the approved plan exactly.
- documenter-historian — Produce manual-checks and a how-to for operators and reviewers.

### NOT REQUIRED AGENTS

- qa-tester — Not required at orchestration stage; may be requested by planner for focused test coverage.
- integration-checker — Not required unless planner specifies cross-system hooks.

### MISSING AGENT

- NONE

### EXECUTION PLAN

- Step 1: `forgea-code-scout` scans client and server code to locate surfaces for bulk download, search, clipboard, and save throttles.
- Step 2: `planner-architect` writes `/docs/tasks/task-K11-<YYYY-MM-DD>.md` specifying exact mitigations (what to block, throttling limits, obfuscation rules) and required server-side enforcement points.
- Step 3 (parallel): `security-sentinel` performs adversarial review of the planner draft while `docs-gatekeeper` confirms documentation coverage for any policy-sensitive behavior.
- Step 4: `implementer` implements the plan; `documenter-historian` produces `/docs/manual-checks/task-K11-manual-checks.md` and `/docs/guides/task-K11-how-to.md`.

### ORCHESTRATOR IMPROVEMENT NOTES

- Recommend a reusable anti-cheat checklist (bulk-download, clipboard, search, throttles) to speed future planning and reviews.
