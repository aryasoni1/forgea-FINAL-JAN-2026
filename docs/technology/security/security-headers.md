# Security Headers

- Category: Security
- Epics: G, K, J
- Version / Requirement: Pin required
- Intent / Critical Decision: Referrer-Policy, X-Frame-Options, Permissions-Policy.

## EPIC-G — Notes

- Mentioned in: EPIC-G — PUSH FLOW & SNAPSHOT PREVIEW
- EPIC-G intent: Define required header hygiene for preview responses (Referrer-Policy, X-Frame-Options, Permissions-Policy) and link to hosting contract.
- Important points:
  - Recommend `Referrer-Policy: no-referrer-when-downgrade` (or stricter `no-referrer`) for previews, `X-Frame-Options: DENY` (or CSP `frame-ancestors`), and a conservative `Permissions-Policy` to disable geolocation/camera/etc in preview contexts.
  - Provide example header templates and include checks in the preview-hosting integration tests that assert these headers are present for all preview responses.
