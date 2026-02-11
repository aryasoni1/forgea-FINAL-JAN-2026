### FEATURE ANALYSIS

- Feature Type: Security / Repo Governance
- Risk Level: High
- Touches HARD LOCK: No

### REQUIRED AGENTS

- Planner/Architect — Define base lab repository source and locked vs editable paths.
- Security Sentinel — Validate prevention of core IP exposure and forbidden paths.
- Implementer — Add enforcement tooling (lint, pre-commit, CI checks).
- Integration Checker — Ensure enforcement works across monorepo workflows.

### NOT REQUIRED AGENTS

- Documenter/Historian — Will document after rules and tooling are in place.

### MISSING AGENT

- None

### EXECUTION PLAN

- Step 1: Planner/Architect defines repository source, editable/locked path rules, and forbidden path list (sequential).
- Step 2: Security Sentinel reviews rules and suggests forbidden-path patterns (sequential).
- Step 3: Implementer adds linting/pre-commit and CI enforcement; Integration Checker validates across repos (parallel).

### USER PROMPTS (copy-paste ready)

- Planner/Architect:
"Specify the base lab repo template location, list locked vs editable paths, and provide a forbidden-path policy (globs). Include rules for distinguishing core IP files from editable user surfaces."

- Security Sentinel:
"Review the proposed path rules for gaps that could expose core IP or allow tests/config modification. Recommend additional forbidden patterns."

- Implementer:
"Implement path-enforcement tooling (lint rule or pre-commit), and CI checks that fail on forbidden edits. Provide quick setup instructions."

- Integration Checker:
"Validate the enforcement tooling across monorepo operations (scaffolding/cloning, CI pipelines). Report any false positives or bypass routes."

### ORCHESTRATOR IMPROVEMENT NOTES

- Consider a centralized path-policy service or shared linter plugin to avoid divergence across packages.
