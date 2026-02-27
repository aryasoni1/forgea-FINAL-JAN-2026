# EdDSA (Ed25519)

- Category: Security
- Epics: E, F, I
- Version / Requirement: RFC 8037
- Intent / Critical Decision: Signature algorithm for JWS payloads.

## EPIC-E — Notes

- Mentioned in: EPIC-E — LAB CREATION SYSTEM (MANUAL + AI)
- EPIC-E intent: Recommend Ed25519 (RFC 8037) as the signature algorithm for signing publish proofs and locked `forgea.config.json` artifacts.
- Important points:
  - Document how to produce and verify Ed25519 signatures for signed manifests and include guidance on key sizes, key storage (Vault), and rotation cadence.
  - Provide examples for creating JWS signatures with Ed25519 in Node/Python and how verifiers should validate `kid` and signature payloads before accepting locked artifacts.
