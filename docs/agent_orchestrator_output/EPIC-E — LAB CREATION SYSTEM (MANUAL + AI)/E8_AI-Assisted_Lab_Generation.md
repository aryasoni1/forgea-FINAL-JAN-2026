### FEATURE ANALYSIS

- Feature Type: AI / Policy
- Risk Level: High
- Touches HARD LOCK: Yes (published labs + schema constraints)

### REQUIRED AGENTS

- Planner/Architect — Define AI-allowed and forbidden lab fields and generation constraints.
- Security Sentinel — Ensure AI cannot generate exploits, modify tests/config, or leak IP.
- Implementer — Implement AI generation pipeline, schema validation, and rejection rules.
- Documenter/Historian — Record rules and human-review requirements.

### NOT REQUIRED AGENTS

- Integration Checker — Only needed during pipeline integration.

### MISSING AGENT

- None

### EXECUTION PLAN

- Step 1: Planner/Architect defines allowed/forbidden fields, difficulty/failure constraints, and human-review gating (sequential).
- Step 2: Implementer builds generation pipeline with schema validation and automatic rejection (sequential).
- Step 3 (parallel): Security Sentinel audits generated artifacts; Documenter prepares review workflow docs (parallel).

### USER PROMPTS (copy-paste ready)

- Planner/Architect:
"Define precisely which lab fields AI may author, which fields are forbidden, rules for failure/difficulty drift detection, and when human review is required."

- Implementer:
"Implement the AI-generation pipeline with schema validation, difficulty/failure drift checks, and automatic rejection of violations."

- Security Sentinel:
"Audit AI outputs for potential IP leakage, forbidden modifications (tests/config), and suggest blocking rules."

- Documenter/Historian:
"Document the AI generation rules, rejection reasons, and the human review checklist required before publish."

### ORCHESTRATOR IMPROVEMENT NOTES

- Add an explainability step: store AI decisions and delta from template to generated lab for reviewer clarity.
