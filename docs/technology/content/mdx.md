# MDX (mdx-js)

- Category: Content
- Epics: J
- Version / Requirement: Pin required
- Intent / Critical Decision: Lesson authoring with JSX + Markdown.

## EPIC-D — Notes

- Mentioned in: EPIC-D — LESSON CREATION SYSTEM (D2 Canonical Lesson Template, D9 Serving & Rendering)
- EPIC-D intent: Support MDX for interactive lesson components while maintaining a safe rendering surface for student-facing pages.
- Important points:
  - Pin MDX and remark/rehype plugin versions used in the build and ensure server-side rendering safety (no arbitrary remote code execution in MDX components).
  - Define allowed component API for lesson authors (sandboxed primitives) and provide linter/compile-time checks to prevent unsafe imports.
  - Document transformation from MDX to canonical lesson storage format and how interactive blocks are extracted and versioned.

  ## EPIC-J — Notes
  - Mentioned in: EPIC-J — Project & Tooling (J1), Content Architecture (J2), MDX Schema & Validation (J3)
  - EPIC-J intent: Use MDX as the canonical lesson authoring format allowing safe JSX-driven interactive components while enforcing frontmatter and AST-based validation.
  - Important points:
    - Pin MDX and related remark/rehype/mdx plugin versions before implementation to avoid parser/AST drift.
    - Integrate MDX parsing with frontmatter JSON Schema validation: normalize AST and frontmatter before validation.
    - Define allowed in-body features (imports, JSX) and provide linter/compile-time checks to block unsafe imports or runtime-only patterns.
    - Ensure build-time transforms produce a sanitized, storage-friendly canonical lesson format that decouples execution from authoring source.
