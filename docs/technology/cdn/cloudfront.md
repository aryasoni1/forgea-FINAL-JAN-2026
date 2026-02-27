# AWS CloudFront

- Category: CDN
- Epics: J
- Version / Requirement: Standard
- Intent / Critical Decision: Global edge delivery for lessons (uses AWS credits).

## EPIC-G — Notes

- Mentioned in: EPIC-G — PUSH FLOW & SNAPSHOT PREVIEW
- EPIC-G intent: Example CDN provider guidance for preview hosting (caching rules, header rewrites, origin ACLs) — CloudFront may be used as a reference implementation.
- Important points:
  - Document CloudFront behaviors for caching immutable snapshots vs ephemeral previews, and include sample behaviors for header injection (CSP, X-Robots-Tag) and signed URL support where needed.
  - Provide example invalidation/purge commands and discuss tradeoffs vs other providers (Cloudflare, Fastly) so implementers can adapt to the chosen CDN.
