# Clipboard API

- Category: Web API
- Epics: K
- Version / Requirement: Pin required
- Intent / Critical Decision: Controlled copy/paste semantics for anti-cheat.

## EPIC-K — LAB UI (Hybrid Editor, Monaco, FS Abstraction)

- Epics referenced: EPIC-K
- Intent: Control clipboard access in the lab UI to enforce anti-cheat and prevent unauthorized copy/paste during lessons.
- Other important points:
	- Restrict clipboard events based on lesson step and permission model.
	- Log clipboard actions for audit and anti-cheat tracking.
	- Integrate with editor and VFS for safe copy/paste operations.
