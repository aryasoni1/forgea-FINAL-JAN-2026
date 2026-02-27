# OpenID Connect Core

- Category: Auth Standard
- Epics: C, K
- Version / Requirement: 1.0
- Intent / Critical Decision: Identity tokens and authorization flows.

## EPIC-C — Notes

- Mentioned in: EPIC-C — AUTHENTICATION & RBAC
- EPIC-C intent: Reference OIDC core flows for provider integrations (authorization code + PKCE where applicable) and ID token validation.
- Important points:
  - Document accepted ID token claims, validation steps (issuer, audience, signature), and clock skew allowances.
  - Prefer Authorization Code flow with PKCE for public clients and enforce `nonce` checks when using implicit-like flows.
  - Map OIDC userinfo fields to internal identity model (Prisma schema) and document reconciliation rules for provider attribute changes.

## EPIC-D — Notes

- Mentioned in: EPIC-D — LESSON CREATION SYSTEM (D9 Serving & Rendering)
- EPIC-D intent: Define session and token semantics for lesson read/access gating, role mapping, and claims used by lesson ACLs.
- Important points:
  - Document required claims and role mappings (e.g., `lesson.view`, `lesson.edit`) and outline how session tokens map to RBAC roles used by lesson-serving endpoints.
  - Clarify token validation steps, clock skew handling, and refresh/token revocation semantics appropriate for preview and locked lesson access.
  - Provide example JWT claim mappings and guidance for integrating with Next.js middleware and API route protection used by lesson serving flows.
