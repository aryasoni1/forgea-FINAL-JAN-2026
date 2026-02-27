# CommonMark

- Category: Content
- Epics: J
- Version / Requirement: Pin required
- Intent / Critical Decision: Baseline Markdown parsing standard.

## EPIC-D — Notes

- Mentioned in: EPIC-D — LESSON CREATION SYSTEM (D2 Canonical Lesson Template, D9 Serving & Rendering)
- EPIC-D intent: Use CommonMark as the canonical authoring syntax for lesson content; ensure parser conformity for rendering and ingestion.
- Important points:
  - Define allowed CommonMark extensions (e.g., tables, fenced code, footnotes) and sanitize inputs before rendering to prevent XSS.
  - Provide canonical parsing and rendering pipeline used in generation and serving (consistent AST, tokenization) to support deterministic chunking for embeddings.
  - Capture conversion rules for MDX/interactive blocks and how code exercises are extracted into test harnesses.

## EPIC-J — Notes

- Mentioned in: EPIC-J — Content Architecture (J2), MDX Schema & Validation (J3)
- EPIC-J intent: Use CommonMark as the canonical Markdown baseline to ensure consistent rendering and AST normalization across editors, previews, and CI validators.
- Important points:
  - Pin the CommonMark parser version and define allowed extensions (tables, footnotes, fenced code) for lesson content.
  - Normalize AST shapes used by validators to ensure deterministic heuristics when detecting exercises, headings, and content boundaries.
  - Ensure sanitization steps are applied after parsing to remove or restrict unsafe HTML that could leak solutions or enable XSS in previews.
