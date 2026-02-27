# @monaco-editor/react

- Category: Editor
- Epics: K
- Version / Requirement: Pin required
- Intent / Critical Decision: React integration for Monaco in the UI.

## EPIC-K — LAB UI (Hybrid Editor, Monaco, FS Abstraction)

- Epics referenced: EPIC-K
- Intent: React wrapper and lifecycle integration for embedding Monaco in the lab hybrid editor. Ensure consistent mount/unmount, preserve editor state between steps, and cooperate with the VFS for file operations.
- Other important points:
  - Manage editor disposal and prevent memory leaks when switching steps or views.
  - Expose stable APIs for programmatic edits, decorations, and selection management tied to the lesson step model.
  - Ensure resize and layout handling with host UI containers (panels, split views).
  - Securely connect to language services or lightweight LSPs without exposing remote execution.
  - Support SSR/CSR considerations for initial render and lazy hydration of heavy editor bundles.
