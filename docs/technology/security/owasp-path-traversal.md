# OWASP Path Traversal

- Category: Security
- Epics: K
- Version / Requirement: Pin required
- Intent / Critical Decision: Canonical path traversal prevention guidance.

## EPIC-K — LAB UI (Hybrid Editor, Monaco, FS Abstraction)

- Epics referenced: EPIC-K
- Intent: Apply OWASP path traversal prevention in the lab UI, especially for VFS and editor file access.
- Other important points:
	- Enforce canonical path checks for all file operations.
	- Integrate with permission enforcement and anti-cheat models.
	- Log and audit path traversal attempts for security review.
