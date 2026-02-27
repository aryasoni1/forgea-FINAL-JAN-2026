# Playwright

- Category: Testing
- Epics: C, H
- Version / Requirement: Pin required
- Intent / Critical Decision: Browser-driven E2E tests and verification flows.

## EPIC-E — Notes

- Mentioned in: EPIC-E — LAB CREATION SYSTEM (MANUAL + AI)
- EPIC-E intent: Use Playwright as the canonical verification runner for lab-level deterministic checks, traces, and artifacts.
- Important points:
  - Provide a deterministic `playwright.config.js` tuned for headless CI, fixed viewport/timezone/locale, request interception to detect/deny outbound requests, and deterministic seeds where applicable.
  - Capture trace/screenshot/video artifacts and ensure the verifier produces JSON reports (schema described in E6) and uploads them to immutable storage.
  - Document runner constraints: network disabled by default, limited filesystem access, and resource quotas to ensure reproducible runs.
