# Prompt Operational Guidelines (EPIC-D)

Purpose: Operational rules for prompt templates, token budgets, grounding, and QA checks.

Status: DRAFT — required before implementer work.

Contents to include:

- Provider & tokenizer pinning (example: OpenAI + tiktoken version)
- Token budgeting rules and how `max_tokens` is interpreted
- Grounding policy: required citation format (URL, excerpt, anchor)
- Failure modes: how generation should behave when grounding unavailable
- Whitelist policy for acceptable external sources
- QA checklist: length checks, grounding presence, hallucination heuristics
- Migration policy for prompt `version` changes (semver rules)

Implementer notes:

- Runtime should validate manifest against JSON Schema v2020-12
- CI should run token-count tests using the pinned tokenizer
