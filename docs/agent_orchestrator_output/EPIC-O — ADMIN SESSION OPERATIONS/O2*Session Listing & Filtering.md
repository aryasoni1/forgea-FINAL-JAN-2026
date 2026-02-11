### FEATURE ANALYSIS

- Feature Type: UI / Backend listing + filtering
- Risk Level: Medium
- Touches HARD LOCK: Yes

### REQUIRED AGENTS

- planner-architect — Specify exact listing semantics, filters, paging, and required backend safeguards (rate limits, exposure minimization).
- implementer — Implement list/filter APIs, indices, and minimal backend checks.
- qa-tester — Verify correctness, sorting, filtering, and abuse signals (pagination integrity, large result handling).
- documenter-historian — Produce manual checks and admin guide for using filters safely.

### NOT REQUIRED AGENTS

- security-sentinel — Not required for core listing, but should be engaged if PII or sensitive exposures are detected in Planner outputs.
- integration-checker — Not required: feature is self-contained (listing) unless planner surfaces cross-system data.

### MISSING AGENT (ONLY IF NEEDED)

- None.

### EXECUTION PLAN

- Step 1: Planner defines API contracts, allowed metadata fields, and performance expectations.
- Step 2: Implementer implements APIs, applies pagination and rate-limiting recommendations. (Sequential)
- Step 3: QA validates correctness, edge cases, and ordering. (Sequential)
- Step 4: Documenter produces admin usage guide and manual-checklist. (Can run in parallel with final QA verification)

### AGENT PROMPTS (copy-paste-ready)

- planner-architect:
"Produce a task document for Feature O2 — Session Listing & Filtering. Define API surface, response fields (sessionId, user, lab, status, startTime, lastActivity), allowed filters, sort options, and performance constraints. Flag any PII exposures and required back-end protections."

- implementer:
"Implement the O2 task document exactly: list API, filtering, sorting, and pagination. Add required indices and rate-limits as specified. Create `/docs/manual-checks/task-O2-manual-checks.md` and `/docs/guides/task-O2-how-to.md`."

- qa-tester:
"Validate O2 implementation against the task doc: correctness of filters, sort stability, pagination integrity, and failure modes for malformed filters."

- documenter-historian:
"Write the admin how-to for using session lists and filters and a short troubleshooting checklist."

### ORCHESTRATOR IMPROVEMENT NOTES

- Consider a shared `list-pagination` guideline in `/docs/official-docs/` to reduce per-feature variance.
