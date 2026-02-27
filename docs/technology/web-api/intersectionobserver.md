# IntersectionObserver

- Category: Web API
- Epics: J
- Version / Requirement: Pin required
- Intent / Critical Decision: Visibility thresholds for lesson progress tracking.

## EPIC-J — Notes

- Mentioned in: EPIC-J — Lesson Layout (J5), Lesson Progress Tracking (J6)
- EPIC-J intent: Use IntersectionObserver to implement reliable, low-overhead section visibility tracking for progress and read detection.
- Important points:
  - Define threshold values and debounce strategy for marking sections as "viewed" to avoid duplicate or premature progress events.
  - Provide graceful fallbacks for browsers without the API (e.g., visibility heuristics or manual triggers) and document expected differences.
  - Consider performance and observer count limits; prefer single observer with delegated handling over many observers per-section.
