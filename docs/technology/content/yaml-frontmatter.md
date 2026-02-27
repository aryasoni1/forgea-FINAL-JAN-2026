# YAML Frontmatter

- Category: Content
- Epics: J
- Version / Requirement: Pin required
- Intent / Critical Decision: Lesson metadata encoding in Markdown/MDX.

## EPIC-J — Notes

- Mentioned in: EPIC-J — Project & Tooling (J1), Lesson Content Architecture (J2), MDX Schema & Validation (J3)
- EPIC-J intent: Use YAML frontmatter as the canonical manifest for lessons; schema validation relies on consistent YAML parsing semantics.
- Important points:
  - Pin YAML 1.2 parser semantics and document edge cases (multiline, anchors, explicit typing) that affect validator input.
  - Normalize frontmatter into the canonical JSON shape consumed by JSON Schema validators before validation.
  - Disallow unexpected fields by combining YAML parsing with a strict JSON Schema validation step to prevent accidental metadata injection.
