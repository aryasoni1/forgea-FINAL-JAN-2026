# SSE / EventSource

- Category: Web API
- Epics: K
- Version / Requirement: Pin required
- Intent / Critical Decision: Server-driven streaming updates.

## EPIC-K — LAB UI (Hybrid Editor, Monaco, FS Abstraction)

- Epics referenced: EPIC-K
- Intent: Use SSE/EventSource for server-driven streaming updates in the lab UI, such as instructions, step changes, and audit events.
- Other important points:
	- Integrate with editor and VFS for real-time instruction and step panel updates.
	- Ensure robust error handling and session continuity.
	- Log streaming events for audit and anti-cheat tracking.
