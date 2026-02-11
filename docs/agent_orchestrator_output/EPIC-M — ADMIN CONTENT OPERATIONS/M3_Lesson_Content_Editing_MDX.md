### FEATURE ANALYSIS

- Feature Type: Editor Integration + Validation + Rendering
- Risk Level: Medium-High
- Touches HARD LOCK: No

### REQUIRED AGENTS

- planner-architect — Specify MDX source loading, frontmatter schema, validation rules, and disallowed patterns.
- docs-gatekeeper — Verify docs and required rules are recorded.
- implementer — Integrate MDX editor, validation pipeline, live preview, and publish block.
- qa-tester — Validate validation rules, frontmatter schema enforcement, and publish blocking.
- integration-checker — Final E2E approval.

### NOT REQUIRED AGENTS

- security-sentinel — Not primary; include if editor exposes code execution.
- forgea-code-scout — Optional.

### MISSING AGENT

- None.

### EXECUTION PLAN

- Step 1: Planner-Architect — Produce `/docs/tasks/task-M3-<YYYY-MM-DD>.md` describing MDX load path, editor UX, validation schema, and exact disallowed patterns.
- Step 2: Docs-Gatekeeper — Validate and record required docs. (sequential)
- Step 3: Implementer — Implement editor and validation; produce artifacts. (sequential)
- Step 4: QA-Tester — Verify schema enforcement and that publish is blocked on failures. (sequential)
- Step 5: Integration-Checker — Final approval. (sequential)

### ORCHESTRATOR IMPROVEMENT NOTES

- Provide a canonical set of disallowed patterns to reduce planner ambiguity.

### AGENT PROMPTS (COPY-PASTE READY)

- Planner-Architect:

Produce `/docs/tasks/task-M3-<YYYY-MM-DD>.md` for EPIC-M Feature M3 (Lesson Content Editing). Include exact MDX frontmatter schema, validation rules, required section ordering, disallowed content patterns, lint rules output format, and live preview contract.

- Docs-Gatekeeper:

Validate referenced schemas and update `/docs/official-docs/` entries if required; produce gatekeeper brief.

- Implementer:

Implement per approved task doc. Produce `/docs/manual-checks/task-M3-manual-checks.md` and `/docs/guides/task-M3-how-to.md`.

- QA-Tester:

Validate that invalid MDX frontmatter, missing sections, or disallowed patterns block publish and surface clear errors.

- Integration-Checker:

Confirm end-to-end UX, validation, and publish gating before APPROVE.
