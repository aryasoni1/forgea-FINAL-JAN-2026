## FEATURE CONTEXT

- Epic: EPIC-D — LESSON CREATION SYSTEM
- Feature: H5 — Prompt System
- Source: docs/agent_orchestrator_output/EPIC-D — LESSON CREATION SYSTEM/D5_Prompt System.md

### TASKS CHECKED

- /docs/tasks/master_tasks_V1/EPIC-D — LESSON CREATION SYSTEM.MD: Not found in repository (no tasks file located).

### WHAT ALREADY EXISTS

- docs/agent_orchestrator_output/EPIC-D — LESSON CREATION SYSTEM/D5_Prompt System.md — Orchestrator output. Contains feature analysis, required agents, execution plan, improvement notes, and copy-paste prompts for required agents (planner-architect, implementer, qa-tester, security-sentinel, documenter-historian).
- forgea-monorepo/services/content-engine/README.md — Python AI agent service README (explicit isolation guidance; no implementation code for prompt templates or enforcement).
- forgea-monorepo/services/content-engine/.gitkeep — placeholder file present.
- forgea-monorepo/services/api-core/.gitkeep and forgea-monorepo/services/verification-runner/.gitkeep — empty placeholders indicating services tree exists but no implementation for prompt system.

### WHAT IS PARTIALLY IMPLEMENTED

- `forgea-monorepo/services/content-engine/` exists with a README but contains no prompt storage, retrieval, enforcement code, or tests for the prompt system referenced by the orchestrator.
- Orchestrator output provides copy-paste prompts and an execution plan, but the referenced EPIC task file and implementation artifacts are not present in the repository.

### WHAT IS MISSING

- The EPIC task source: `/docs/tasks/master_tasks_V1/EPIC-D — LESSON CREATION SYSTEM.MD` (not found).
- A `prompts/` manifest or prompt storage format and any prompt manifest files.
- `services/lessons/generation/` directory and runtime code for storing/enforcing prompt templates (no matching path found).
- Migration(s) or DB schema for prompt versioning and any related persistence.
- Validation tests (QA) for grounding, length caps, and anti-hallucination checks referenced by QA role.
- Security review artifacts (whitelist policies, failure modes) and evidence of security-sentinel review.
- Documentation/how-to guides or manual-checks implementing the orchestrator's deliverables (manual-checks referenced but not present for this feature).

### RISKS OR CONFLICTS (observed in repo)

- Implementation-path mismatch: the orchestrator's `implementer` prompt targets `services/lessons/generation/` (expected Node/monorepo placement), while an existing AI service `content-engine` is explicitly Python-only per its README — this creates an observed integration surface mismatch.
- No prompt manifest or storage found — risk of inconsistent templates, enforcement, and versioning if multiple implementers act without a canonical manifest.
- Missing EPIC task file prevents planners from grounding templates to approved task definitions.

### QUESTIONS FOR CLARIFICATION

- None strictly required to continue the next-agent work, but the planner may need confirmation of the canonical storage location (`services/lessons/generation/` vs `services/content-engine/`) and whether the missing EPIC tasks file should be the authoritative input. Marked as clarifications, not prescriptive requests.

### NEXT AGENT HANDOFF PROMPT (MANDATORY)

Use this exact prompt (copy-paste) for the next agent: planner-architect. Reference this code-scout report when running.

"You are the `planner-architect` agent. Reference this code-scout report: `docs/code-scout/EPIC-D — LESSON CREATION SYSTEM/H5_Prompt System.md`.

Task: Compose section-level prompt templates for EPIC-D Feature H5 — Prompt System.

Inputs you MUST use: the orchestrator output at `docs/agent_orchestrator_output/EPIC-D — LESSON CREATION SYSTEM/D5_Prompt System.md` and only repository files available in this report. Do NOT assume the missing EPIC tasks file; instead, explicitly note if the canonical task source `/docs/tasks/master_tasks_V1/EPIC-D — LESSON CREATION SYSTEM.MD` remains unavailable.

Deliverables (strict):
- A set of section-level prompt templates (one template per lesson section) that enforce: single-section output, strict length/token caps, grounding_required flags, and anti-hallucination rules.
- For each template include: `id`, `version` (semver), `section` name, `max_tokens` (or token-equivalent), and `grounding_required` boolean.
- A short `assumptions` list that records any missing inputs (for example, the missing EPIC tasks file) and how that affects template grounding.

Constraints: Keep templates concise; do not implement code. Do NOT modify repository files. Explicitly list where you expect templates to be stored (path only) and any required manifest fields. Do not design enforcement code — only produce the templates and a minimal manifest schema to be consumed by the implementer.
"

Handoff complete. Provide this report verbatim to the next agent.
