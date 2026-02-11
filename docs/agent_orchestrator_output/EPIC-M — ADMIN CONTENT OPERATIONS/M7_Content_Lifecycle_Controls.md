### FEATURE ANALYSIS

- Feature Type: Access Control + Routing + Policy
- Risk Level: Medium
- Touches HARD LOCK: No

### REQUIRED AGENTS

- planner-architect — Define lifecycle states, access restrictions, and public access rules.
- docs-gatekeeper — Ensure lifecycle policy is documented and registry updated.
- implementer — Enforce Draft/Published/Deprecated state behaviors in APIs and routing.
- qa-tester — Validate access controls and state transition correctness.
- integration-checker — Final approval.

### NOT REQUIRED AGENTS

- security-sentinel — Not mandatory unless lifecycle rules affect retention of sensitive data.

### MISSING AGENT

- None.

### EXECUTION PLAN

- Step 1: Planner-Architect — Produce `/docs/tasks/task-M7-<YYYY-MM-DD>.md` with lifecycle state machine, access control rules (drafts private, deprecated blocked for new sessions), and UI expectations.
- Step 2: Docs-Gatekeeper — Validate docs coverage. (sequential)
- Step 3: Implementer — Implement lifecycle enforcement and routing guards. (sequential)
- Step 4: QA-Tester — Verify that draft content is inaccessible publicly and deprecated content cannot start new sessions. (sequential)
- Step 5: Integration-Checker — Final approval. (sequential)

### ORCHESTRATOR IMPROVEMENT NOTES

- Recommend canonical lifecycle diagram to reduce planner ambiguity.

### AGENT PROMPTS (COPY-PASTE READY)

- Planner-Architect:

Create `/docs/tasks/task-M7-<YYYY-MM-DD>.md` for EPIC-M Feature M7 (Content Lifecycle Controls). Define allowed transitions, who may perform them, public access rules for each state, and failure behaviors for invalid transitions.

- Docs-Gatekeeper:

Validate lifecycle rules against existing registry and produce a brief.

- Implementer:

Implement exactly per approved task doc; produce manual-checks and how-to guides.

- QA-Tester:

Validate access control enforcement and confirm deprecated lessons remain readable for history but not usable for new sessions.

- Integration-Checker:

Confirm end-to-end and approve or block.
