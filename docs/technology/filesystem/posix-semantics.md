# POSIX Semantics

- Category: Filesystem
- Epics: K
- Version / Requirement: Pin required
- Intent / Critical Decision: Symlink and path behavior for VFS abstraction.

## EPIC-K — LAB UI (Hybrid Editor, Monaco, FS Abstraction)

- Epics referenced: EPIC-K
- Intent: Provide POSIX-like semantics for the in-browser Virtual File System used by the lab UI so editor behaviors (open, symlink, path resolution) match developer expectations while staying sandboxed.
- Other important points:
  - Prevent path traversal and enforce sandbox boundaries at the VFS layer.
  - Support atomic commit/rollback semantics for step-based edits and snapshotting to enable undo/revert across lesson steps.
  - Symlink behavior must be clearly defined and safe for multi-layer overlays (readonly lesson content vs. writable student layer).
  - Efficient metadata handling for performance (avoid expensive syscall-like operations in JS hot paths).
  - Permission model integration: read-only vs writable layers, commit gating, and edit permissions enforced by higher-level step logic.
