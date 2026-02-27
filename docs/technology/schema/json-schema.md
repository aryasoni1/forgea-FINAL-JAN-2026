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

## EPIC-J — Notes

- Mentioned in: EPIC-J — Project & Tooling (J1), MDX Schema & Validation (J3), Lesson Progress Tracking (J6)
- EPIC-J intent: Use JSON Schema (2020-12) as the canonical format for frontmatter validation and progress payload contracts used across lesson tooling and CI.
- Important points:
  - Pin JSON Schema draft (2020-12) for frontmatter and progress payload validators; include machine-readable `.json` artifacts alongside human docs.
  - Define canonical frontmatter schema with strictness (`additionalProperties: false`) to prevent unexpected metadata fields.
  - Provide example positive and negative fixtures for CI validators and ensure validators are used both in authoring tools and CI pipelines.
  - Document schema evolution and compatibility rules consumed by the authoring tools and validators.

  ## EPIC-I — Notes
  - Mentioned in: EPIC-I — ANTI-CHEAT & ABUSE CONTROL SYSTEM
  - EPIC-I intent: Use JSON Schema (2020-12) as the canonical contract for event/audit/test payloads (ingestion, detection, enforcement, and validation).
  - Important points:
    - Pin to JSON Schema 2020-12 for all event/audit schemas and test vectors; include `schema_version` and migration guidance.
    - Include explicit required fields for audit events (timestamps RFC3339, event_id, actor/session ids, schema_version) and index hints for downstream storage.
    - Provide negative test-cases and idempotency/dedup examples used by detection and enforcement pipelines to avoid ambiguous consumer behavior.
