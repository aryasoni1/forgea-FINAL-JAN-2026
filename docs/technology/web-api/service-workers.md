# Service Workers

- Category: Web API
- Epics: J
- Version / Requirement: Pin required
- Intent / Critical Decision: Offline sync and background persistence for progress.

## EPIC-J — Notes

- Mentioned in: EPIC-J — Lesson Progress Tracking (J6)
- EPIC-J intent: Use Service Workers to enable offline buffering and reliable background-sync of progress events from learners.
- Important points:
  - Document when to rely on Service Worker background-sync vs app-layer retry semantics; account for browser support differences.
  - Define storage durability and eviction policies for buffered progress events; ensure user privacy and auth token lifecycle are handled securely.
  - Provide guidance for reconciling buffered events with server-side idempotency keys to avoid duplicate progress records.
