### FEATURE ANALYSIS

- Feature Type: AI / code
- Risk Level: Medium
- Touches HARD LOCK: No

### REQUIRED AGENTS

- planner-architect — Define section-level prompt templates, strict output-length constraints, anti-hallucination rules, and versioning policy.
- implementer — Implement prompt template storage, retrieval, and enforcement (single-section per prompt) in the generation engine.
- qa-tester — Validate prompt outputs for grounding, length constraints, and hallucination detection tests.
- security-sentinel — Review anti-hallucination controls and grounding requirements to reduce misinformation risk.
- documenter-historian — Record prompt versions and change log.

### NOT REQUIRED AGENTS

- integration-checker — Reason: Integration checks performed once prompt system is wired into the generation engine (later step).

### MISSING AGENT

- (none)

### EXECUTION PLAN

- Step 1: Planner drafts prompt templates and anti-hallucination rules per section, including required source grounding. (Sequential)
- Step 2: Implementer stores templates and enforces constraints in the generation engine. (Sequential)
- Step 3: QA + Security validate prompt outputs against grounding and hallucination rules. (Parallel)
- Step 4: Documenter finalizes prompt versioning notes. (Sequential)

### ORCHESTRATOR IMPROVEMENT NOTES

- Recommend a `prompts/` manifest format with fields: id, version, section, max_tokens, grounding_required, source_policy to standardize enforcement.

### COPY-PASTE PROMPTS FOR AGENTS

- planner-architect:

"Compose section-level prompt templates for EPIC-D FEATURE H5 — Prompt System. Inputs: `/docs/tasks/master_tasks_V1/EPIC-D — LESSON CREATION SYSTEM.MD`. Deliver templates that enforce single-section generation, strict length caps, grounding requirements, anti-hallucination rules, and a versioning scheme."

- implementer:

"Implement prompt template storage and enforcement in the lesson generation engine. Deliver code within `services/lessons/generation/`, include runtime enforcement for single-section prompts and length caps, and add a migration for prompt versioning. Provide manual-checks and a how-to guide."

- qa-tester:

"Design validation tests that verify prompts produce section outputs within token/length constraints, include required grounding citations, and do not hallucinate facts when source material is absent."

- security-sentinel:

"Review and provide mitigations for hallucination risks, including mandatory source annotations, whitelist policies, and failure modes when grounding cannot be satisfied."

- documenter-historian:

"Record prompt template versions, change log, and a short rationale for anti-hallucination rules."
