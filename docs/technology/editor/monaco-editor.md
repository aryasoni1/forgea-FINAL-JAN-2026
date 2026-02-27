# Monaco Editor

- Category: Editor
- Epics: K
- Version / Requirement: 0.55.x
- Intent / Critical Decision: In-browser VFS editing and real-time previews.

## EPIC-K — LAB UI (Hybrid Editor, Monaco, FS Abstraction)

- Epics referenced: EPIC-K
- Intent: Provide the primary code editing surface inside the lab hybrid editor using Monaco. Enable rich editing (syntax, completions, diagnostics) while integrating tightly with the Virtual File System (VFS) and step-based lesson flow.
- Other important points:
  - Integrates with an in-browser VFS for open/save, atomic edits, and undo/redo synchronization across editor instances.
  - Worker isolation and sandboxing are required to avoid leaking execution context into the UI.
  - Performance considerations: lazy-load Monaco, use web workers, and editor pooling when multiple editors open.
  - Accessibility: keyboard navigation, focus management, and screen-reader support must follow WCAG.
  - Security: prevent path traversal via VFS APIs and never expose raw execution capabilities through the editor.
  - Sync model: consider lightweight LSP adapters or selective language services for responsiveness.
