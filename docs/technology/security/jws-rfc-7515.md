# JWS (RFC 7515)

- Category: Security
- Epics: E, F, I
- Version / Requirement: RFC 7515
- Intent / Critical Decision: Config integrity and Ed25519 tamper-evidence.

## EPIC-E — Notes

- Mentioned in: EPIC-E — LAB CREATION SYSTEM (MANUAL + AI)
- EPIC-E intent: Use JWS (RFC 7515) as the canonical attestation format for published lab artifacts and immutable snapshot proofs.
- Important points:
  - Require a canonical set of JWS claims for publish records (e.g., `lab_id`, `commit`, `version`, `artifact_cid`, `issued_at`) and document detached vs embedded signature choices.
  - Provide examples for creating and verifying compact/detached JWS tokens using Ed25519 keys and include guidance for key rotation and `kid` handling via JWKS.
  - Document verifier behavior on signature or `kid` mismatch and how to surface audit evidence in the verification report.
