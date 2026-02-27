# Content Security Policy (CSP)

- Category: Security
- Epics: K, J
- Version / Requirement: CSP Level 3
- Intent / Critical Decision: Script/style execution control to reduce XSS risk.

## EPIC-K — LAB UI (Hybrid Editor, Monaco, FS Abstraction)

- Epics referenced: EPIC-K
- Intent: Apply strict Content Security Policy in the lab UI to prevent XSS, data exfiltration, and unauthorized script execution.
- Other important points:
  - Enforce CSP headers for lab editor, VFS, and lesson preview surfaces.
  - Integrate CSP with anti-cheat and audit models.
  - Provide canonical CSP templates for lab UI and lesson exports.

## EPIC-G — Notes

- Mentioned in: EPIC-G — PUSH FLOW & SNAPSHOT PREVIEW
- EPIC-G intent: Define strict CSP templates for preview hosting to prevent script execution, data exfiltration, and third-party inclusion in previews.
- Important points:
  - Publish an example `Content-Security-Policy` header template for previews (disallow `unsafe-inline`, restrict `frame-ancestors`, and only allow vetted origins for images/fonts) and require acceptance tests that verify CSP headers are present on preview responses.
  - Recommend CSP reporting endpoints for blocked-requests telemetry during preview rollout and include guidance on permissive-to-strict rollout strategies to avoid breaking valid previews.
  - Link CSP template to `G11_Preview_Hosting` hosting contract and CDN/edge header rewrite examples.

## EPIC-J — Notes

- Mentioned in: EPIC-J — Anti-Cheat & Quality Controls (J9)
- EPIC-J intent: Apply CSP (CSP Level 3) templates to lesson previews and exports to mitigate XSS and limit unintended script execution.
- Important points:
  - Provide canonical CSP header templates for previews and exported artifacts (disallow `unsafe-inline`, restrict `frame-ancestors`, and narrowly scope `img`/`font` origins).
  - Require CSP presence in acceptance tests for preview hosts and provide guidance on progressive rollout (report-only → enforced) to avoid breaking valid previews.
  - Document CSP interaction with sanitizers and server-side validators so preview rendering and export flows remain safe and predictable.
