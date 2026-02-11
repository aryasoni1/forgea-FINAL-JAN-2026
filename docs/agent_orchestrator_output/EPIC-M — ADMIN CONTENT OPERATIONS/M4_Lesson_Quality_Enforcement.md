### FEATURE ANALYSIS

- Feature Type: Content Quality Rules + Automated Detection
- Risk Level: Medium
- Touches HARD LOCK: No

### REQUIRED AGENTS

- planner-architect — Specify quality rules (min lengths, forbidden instructions, required links to labs).
- docs-gatekeeper — Ensure rules are recorded and registries updated.
- implementer — Implement detection, linting, and publish blocking.
- qa-tester — Validate detection accuracy and false-positive rates.
- integration-checker — Final gate for merging quality rules.

### NOT REQUIRED AGENTS

- security-sentinel — Not required unless detectors affect runtime security.
- forgea-code-scout — Optional.

### MISSING AGENT

- None.

### EXECUTION PLAN

- Step 1: Planner-Architect — Produce `/docs/tasks/task-M4-<YYYY-MM-DD>.md` listing all quality rules, thresholds, and required behaviors on violations.
- Step 2: Docs-Gatekeeper — Verify documentation coverage. (sequential)
- Step 3: Implementer — Implement detectors and lint integration. (sequential)
- Step 4: QA-Tester — Validate rules against sample corpus, assess false positives. (sequential)
- Step 5: Integration-Checker — Final approval. (sequential)

### ORCHESTRATOR IMPROVEMENT NOTES

- Recommend a shared corpus of sample lessons to tune detectors and reduce churn.

### AGENT PROMPTS (COPY-PASTE READY)

- Planner-Architect:

Create `/docs/tasks/task-M4-<YYYY-MM-DD>.md` for EPIC-M Feature M4 (Lesson Quality Enforcement). Provide explicit quality rules: min lengths per section, detection heuristics for solution-like instructions, maximum code-block density, forbidden filename leaks, and requirement to have at least one linked lab. Specify sample inputs and acceptance criteria.

- Docs-Gatekeeper:

Validate quality-rule documentation and update registries.

- Implementer:

Implement rules and lint outputs as specified in the approved task doc. Produce required artifacts.

- QA-Tester:

Validate detectors against provided corpus and report precision/recall concerns; list blockers.

- Integration-Checker:

Verify end-to-end that publish is blocked for rule violations and passes when rules satisfied.
