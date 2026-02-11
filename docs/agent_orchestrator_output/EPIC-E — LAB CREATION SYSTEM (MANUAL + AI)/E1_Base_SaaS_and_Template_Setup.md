### FEATURE ANALYSIS

- Feature Type: Code / Template
- Risk Level: Medium
- Touches HARD LOCK: No

### REQUIRED AGENTS

- Planner/Architect — Define production-grade SaaS template structure and safe editable surfaces.
- Implementer — Scaffold the base template and cloning mechanism.
- Integration Checker — Validate template clones operate within monorepo build/test flows.
- Documenter/Historian — Capture template usage, editable vs locked surfaces.

### NOT REQUIRED AGENTS

- Security Sentinel — Not required for initial template scaffold; review later for IP exposure.

### MISSING AGENT

- None

### EXECUTION PLAN

- Step 1: Planner/Architect: produce template spec, list editable/locked surfaces (sequential).
- Step 2: Implementer: scaffold base SaaS repo template and cloning mechanism (sequential).
- Step 3 (parallel): Integration Checker validates CI/build; Documenter writes usage guide (parallel).

### USER PROMPTS (copy-paste ready)

- Planner/Architect:
"Produce a concise design doc for the base SaaS lab template. Include directory layout, which paths must be immutable, allowed editable surfaces, minimal runtime and verification hooks, and a cloning strategy suitable for packages/labs. Output as a bullet list and technical checklist."

- Implementer:
"Implement the base SaaS template per the provided design doc: scaffold files, add a cloning script, include a minimal verification entrypoint, and mark locked paths. Return the path list and quick verification steps."

- Integration Checker:
"Run CI/build validation on the scaffolded template and cloning flow. List required CI changes and any integration failures."

- Documenter/Historian:
"Create a short README for the template describing editable vs locked surfaces, how to clone a lab from the template, and verification commands."

### ORCHESTRATOR IMPROVEMENT NOTES

- Encourage a template linter to enforce editable/locked path rules in future iterations.
