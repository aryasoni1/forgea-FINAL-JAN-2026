# Prompt Manifest (EPIC-D)

Purpose: Canonical JSON Schema and examples for prompt templates used by the Lesson Generation Engine.

Status: DRAFT — required before implementer work.

Required schema fields (summary):

- id: string (unique template id)
- version: string (semver)
- section: string (lesson section name)
- title: string (short human title)
- description: string (short guidance)
- max_tokens: integer
- grounding_required: boolean
- source_policy: string (ref to allowed sources policy)
- anti_hallucination_rules: array[string]
- template: string (prompt text with placeholders)

Storage recommendation:

- services/lessons/generation/prompts/

Examples: (implementer to add concrete examples following JSON Schema v2020-12)
