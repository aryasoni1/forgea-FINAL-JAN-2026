## JWT (RFC 7519)

- Category: Token Standard
- Epics: C, K, J
- Version / Requirement: RFC 7519
- Intent / Critical Decision: Session and token encoding semantics.

## EPIC-C — Notes

- Mentioned in: EPIC-C — AUTHENTICATION & RBAC
- EPIC-C intent: Define JWT usage for session tokens, ID tokens, and service-to-service assertions; document claim conventions and rotation strategies.
- Important points:
  - Pin validator libraries and document accepted signing algorithms; prefer asymmetric signatures (RS256/ES256) for ID tokens and consider short-lived access tokens.
  - Define standard claims to use (`iss`, `sub`, `aud`, `exp`, `iat`, `jti`) and how they map to internal `user.id` and session records.
  - Include guidance for token revocation/blacklist strategies and refresh token handling if used.

## EPIC-J — Notes

- Mentioned in: EPIC-J — Lesson Progress Tracking (J6)
- EPIC-J intent: Ensure progress endpoints and per-user persistence are correctly authenticated and scoped using JWTs or equivalent auth tokens.
- Important points:
  - Document required claims and scopes for progress write/read operations and recommended token lifetimes for client-side persistence.
  - Provide guidance for token refresh and offline scenarios where Service Workers may attempt background sync of progress events.
  - Ensure validators and libraries used for JWT verification are pinned and configured to reject weak algorithms.
