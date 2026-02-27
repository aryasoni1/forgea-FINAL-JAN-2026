# WebSocket (RFC 6455)

- Category: Web API
- Epics: K
- Version / Requirement: RFC 6455
- Intent / Critical Decision: Real-time update channel for sessions.

## EPIC-K — LAB UI (Hybrid Editor, Monaco, FS Abstraction)

- Epics referenced: EPIC-K
- Intent: Use WebSocket for real-time session updates in the lab UI, including collaborative editing, step progress, and permission changes.
- Other important points:
	- Secure channel for session state, permission updates, and anti-cheat signals.
	- Integrate with editor and VFS for real-time file and step sync.
	- Ensure robust reconnection and error handling for session continuity.
