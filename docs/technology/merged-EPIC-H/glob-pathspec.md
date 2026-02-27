# Glob / Pathspec

- Category: Pathspec
- Epics: K
- Version / Requirement: Pin required
- Intent / Critical Decision: Locked-path and allowlist glob evaluation.

## EPIC-K — LAB UI (Hybrid Editor, Monaco, FS Abstraction)

- Epics referenced: EPIC-K
- Intent: Use glob/pathspec for locked-path evaluation in the lab UI, ensuring only allowed files are editable or visible in the hybrid editor.
- Other important points:
  - Enforce allowlist/denylist semantics for file tree and editor access.
  - Prevent path traversal and ensure step-based file visibility.
  - Pin implementation for deterministic mapping (e.g., minimatch, git pathspec).
  - Integrate with VFS and permission enforcement for step-based editing.

---

# EPIC-H — Notes (merged)

- Referenced by: EPIC-H — LAB TESTING & VERIFICATION ENGINE
- Intent: Determine file→step mapping semantics used by step-based verification support (H11). `.forgea/steps.json` and pathspec rules rely on canonical glob semantics.
- Important points:
  - Pin the pathspec/glob implementation (e.g., minimatch, git pathspec) for deterministic mapping.
  - Document how changed files map to affected steps and how to compute step triggers deterministically.
