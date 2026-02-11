### FEATURE ANALYSIS

- Feature Type: UI / Backend read model
- Risk Level: Medium
- Touches HARD LOCK: Yes

### REQUIRED AGENTS

- planner-architect — Define the exact detail payload, permitted metadata, and read-only constraints (no write or commit links).
- implementer — Implement detail endpoint and ensure linked resources are read-only in the UI.
- qa-tester — Validate data completeness, elapsed duration calculation, and read-only enforcement.
- documenter-historian — Produce manual checks and admin guidance for interpreting session details.

### NOT REQUIRED AGENTS

- integration-checker — Not required unless the linked GitHub repo needs special validation beyond a URL display.
- security-sentinel — Not required by default; engage only if sensitive fields are proposed for display.

### MISSING AGENT (ONLY IF NEEDED)

- None.

### EXECUTION PLAN

- Step 1: Planner specifies payload schema (lab metadata, lab version, repo URL read-only, times, current step/status).
- Step 2: Implementer implements the read model and API. (Sequential)
- Step 3: QA validates correctness and read-only guarantees. (Sequential)
- Step 4: Documenter writes the admin detail-view guide. (Can run parallel with QA)

### AGENT PROMPTS (copy-paste-ready)

- planner-architect:
"Create a task doc for O3 — Session Detail View. Include schema for session detail response, invariants (read-only), and UI expectations for elapsed time and current step. List forbidden fields and show how to surface last verification errors safely."

- implementer:
"Implement the approved O3 task doc exactly and provide `/docs/manual-checks/task-O3-manual-checks.md` and `/docs/guides/task-O3-how-to.md`. Ensure the repo link is read-only."

- qa-tester:
"Validate O3: completeness of displayed fields, correct elapsed-time computation, no write affordances, and correct presentation of last verification error summaries."

- documenter-historian:
"Draft admin guidance explaining each field in the session detail view and recommended exploration steps for investigations."

### ORCHESTRATOR IMPROVEMENT NOTES

- Require Planner to annotate which fields are considered sensitive so reviewers can quickly flag exposures.
