# OpenAPI

- Category: API Spec
- Epics: G, H
- Version / Requirement: 3.1.x
- Intent / Critical Decision: Canonical API contracts and client generation.

## EPIC-E — Notes

- Mentioned in: EPIC-E — LAB CREATION SYSTEM (MANUAL + AI)
- EPIC-E intent: Define an OpenAPI 3.1.0 contract for the lab publish and CRUD APIs (create/read/list/delete, pagination, publish endpoints).
- Important points:
  - Publish API should include validation of `forgea.config.json` and return a canonical publish record including `commit`, `version`, `cid`/artifact references, and JWS signature fields when applicable.
  - Provide example YAML payloads and error shapes for validation failures to make CI integration deterministic.
  - Pin OpenAPI 3.1.0 and ensure generated clients/contract tests are run in CI as part of verification flows.

---

# EPIC-H — Notes (merged)

- Referenced by: EPIC-H — LAB TESTING & VERIFICATION ENGINE
- Intent: Use OpenAPI 3.1.0 as the authoritative machine-readable API contract for the Verification API surface (H10).
- Important points:
  - Provide an OpenAPI fragment (paths + components) for `VerificationCreate`, `VerificationResult`, and auth schemes.
  - Pin OpenAPI 3.1.0 and include example requests/responses and `ProblemDetails` error mapping (RFC 7807).
