# JSON Schema

- Category: Schema
- Epics: E, G, K
- Version / Requirement: 2020-12
- Intent / Critical Decision: Contract validation for configs and payloads.

## EPIC-D — Notes

- Mentioned in: EPIC-D — LESSON CREATION SYSTEM (D5 Prompt System)
- EPIC-D intent: Use JSON Schema to define prompt manifests, lesson templates, and validation rules for generated lesson artifacts.
- Important points:
  - Define a stable prompt-manifest schema that includes fields for prompt template, input bindings, expected output schema, and metadata (version, author).
  - Use schema validation in both authoring tools and generation pipelines to fail-fast on invalid templates or outputs.
  - Capture schema evolution guidelines (minor/major bumps) and provide codegen hooks for consumer SDKs.

## EPIC-G — Notes

- Mentioned in: EPIC-G — PUSH FLOW & SNAPSHOT PREVIEW
- EPIC-G intent: Use JSON Schema to define normalized push-event schemas, snapshot metadata schema, and other machine-readable contracts used by the snapshot pipeline.
- Important points:
  - Publish canonical `normalized_push_event` and `snapshot_metadata` JSON Schema artifacts under `/docs/official-docs/EPIC-G/` and pin the JSON Schema Draft version used (2020-12 recommended).
  - Include example manifests and negative test-cases to ensure parsers used across `G2` normalization and `G12` lifecycle management behave deterministically.
  - Define schema evolution rules (semantic versioning for schemas) and a bump/compatibility process consumed by planner-architect and orchestrator.

## EPIC-E — Notes

- Mentioned in: EPIC-E — LAB CREATION SYSTEM (MANUAL + AI)
- EPIC-E intent: Use JSON Schema (2020-12) as the canonical machine-readable contract for `forgea.config.json`, lab-definition artifacts, step metadata, and sanitizer/preview schemas.
- Important points:
  - Pin to JSON Schema 2020-12 for all lab/schema artifacts and publish the canonical `.json` schema under `/docs/official-docs/EPIC-E/` so validators across services are consistent.
  - Use `additionalProperties: false` and explicit `unevaluatedProperties` rules to prevent unexpected fields (critical for security and sanitizers).
  - Provide both human-readable docs and machine-readable schema artifacts (examples + negative test cases) alongside the schema file.
  - Document schema evolution rules and SemVer mapping for schema changes (patch=non-breaking metadata, minor=additive, major=breaking change) and include migration guidance for consumers.

---

# EPIC-H — Notes (merged)

- Referenced by: EPIC-H — LAB TESTING & VERIFICATION ENGINE
- Intent: JSON Schema (2020-12) is the canonical contract for verification intake payloads, runner messages, artifact metadata, and validation performed by intake services.
- Important points:
  - Publish canonical schemas under `/docs/official-docs/EPIC-H/` (verification intake, artifact metadata, runner messages).
  - Include example payloads and negative test-cases; pin JSON Schema version 2020-12 for all verification artifacts.
