### FEATURE ANALYSIS

- Feature Type: documentation
- Risk Level: Low
- Touches HARD LOCK: No

### REQUIRED AGENTS

- Documenter / Historian — Draft the auth architecture docs, session model, and role model documentation.
- Docs Gatekeeper — Verify docs for completeness and register required official docs in registries.
- Forgea Code Scout — Provide file references and code snippets to include (read-only).
- Planner / Architect — Provide locked decisions and acceptance criteria to reference in docs.

### NOT REQUIRED AGENTS

- Implementer — Not required for writing documentation.

### MISSING AGENT

- None.

### EXECUTION PLAN

- Step 1: Forgea Code Scout — produce a list of code locations and config files to reference (sequential).
- Step 2: Planner / Architect — provide locked decisions and task links to reference (sequential).
- Step 3: Documenter / Historian — author docs: auth architecture, provider setup, session model, role model, and security assumptions (sequential).
- Step 4: Docs Gatekeeper — validate docs and update registries (sequential).

### USER PROMPTS

- Forgea Code Scout Prompt:

  Provide a list of files and code snippets that should be referenced in the auth docs (config, middleware, models, migrations). Output full paths.

- Documenter / Historian Prompt:

  Draft documentation covering: auth architecture overview, supported providers, session model (schema), role model (enum and storage), security assumptions, and known limitations. Produce markdown suitable for `/docs/official-docs/EPIC-C/`.

- Docs Gatekeeper Prompt:

  Verify the drafted docs against `docs/master_docs.md` and `docs/official-docs-registry.md` and produce required registry updates.

### ORCHESTRATOR IMPROVEMENT NOTES

- Recommend a documentation template for auth features to ensure consistent sections (Overview, Schema, Config, Migration, Rollout, Tests).
