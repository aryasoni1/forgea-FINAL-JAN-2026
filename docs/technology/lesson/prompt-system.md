# Prompt System

- Category: Lesson / AI
- Epics: D
- Version / Requirement: JSON Schema + provider pins required
- Intent / Critical Decision: Canonical prompt templating, manifest formats, and validation for generation pipelines.

## EPIC-D — Notes

- Mentioned in: EPIC-D — LESSON CREATION SYSTEM (D5)
- EPIC-D intent: Provide a managed prompt library with schema-validated manifests, versioning, and metadata for reuse and testing.
- Important points:
  - Manifest schema: Include template text, input bindings, output schema reference (JSON Schema), model hints, and cost/latency guidance.
  - Validation: Run schema validation at author-time and generation-time; fail builds for invalid manifests.
  - Token budgets: Capture token limit recommendations per model in the manifest and provide tooling to estimate costs.
  - Reuse and templates: Support parameterized templates and reusable building blocks; store canonical examples and unit tests for each template.
