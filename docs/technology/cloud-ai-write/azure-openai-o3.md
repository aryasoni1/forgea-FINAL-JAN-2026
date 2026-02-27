# Azure OpenAI (o3)

- Category: Cloud AI (Write)
- Epics: D, E
- Version / Requirement: o3-deep-research
- Intent / Critical Decision: Logic for generating instructions and Playwright tests.

## EPIC-D — Notes

- Mentioned in: EPIC-D — LESSON CREATION SYSTEM (D5 Prompt System, D6 Lesson Generation Engine)
- EPIC-D intent: Use Azure OpenAI models (pinned) for content generation, instruction tuning, and synthesis of lesson drafts where appropriate.
- Important points:
  - Pin model names and API versions; document token limits, temperature guidance, and cost estimates for generation jobs.
  - Provide prompt-engineering guidance: system prompts, guardrails, and output schema enforcement via JSON Schema.
  - Integrate generation jobs with validation pipelines and human review workflows to avoid unsafe or low-quality outputs.

## EPIC-E — Notes

- Mentioned in: EPIC-E — LAB CREATION SYSTEM (MANUAL + AI)
- EPIC-E intent: When AI-assisted lab generation is used by templates, require pinned model APIs, explainability metadata, and schema-validated outputs to support human review and security checks.
- Important points:
  - Require generation outputs to conform to JSON Schema (2020-12) artifacts produced by the canonical lab schema; fail generation if outputs do not validate.
  - Record explainability metadata for each generation (prompt, model, model_version, response, run_id) and store it per `ai-explainability` guidance to support manual review in `ai-explainability.md`.
  - Pin API versions and model names and document cost/latency expectations; ensure templates do not call LLM endpoints during verification runs unless explicitly allowlisted and reviewed.
