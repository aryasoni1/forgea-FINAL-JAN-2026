# Canonical Lesson Template

- Category: Lesson
- Epics: D
- Version / Requirement: JSON Schema pin required
- Intent / Critical Decision: Define the canonical structure for lessons (metadata, sections, exercises, hints).

## EPIC-D — Notes

- Mentioned in: EPIC-D — LESSON CREATION SYSTEM (D2)
- EPIC-D intent: Provide a structured, schema-validated lesson template for generation, storage, and rendering.
- Important points:
  - Fields: Title, description, learning objectives, sections (each with markdown content), exercises (with test harness), metadata (tags, difficulty), and version.
  - Versioning: Emphasize immutable releases and semantic versioning of lesson artifacts to support rollbacks and provenance.
  - Export/Import: Provide canonical import/export formats (JSON/MDX) and mapping guidance for editors and ingestion pipelines.
