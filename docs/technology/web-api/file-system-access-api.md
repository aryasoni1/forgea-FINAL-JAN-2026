# File System Access API

- Category: Web API
- Epics: K
- Version / Requirement: Pin required
- Intent / Critical Decision: Client download and file access constraints.

## EPIC-K — LAB UI (Hybrid Editor, Monaco, FS Abstraction)

- Epics referenced: EPIC-K
- Intent: Use File System Access API for controlled client-side file downloads and access in the lab UI.
- Other important points:
	- Restrict file access based on lesson step and permission model.
	- Enforce download/upload constraints for anti-cheat and audit.
	- Integrate with VFS for safe file operations and export.
