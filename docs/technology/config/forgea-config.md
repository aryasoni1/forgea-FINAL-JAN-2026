# forgea.config.json

- Category: Config
- Epics: E
- Version / Requirement: JSON Schema 2020-12; JWS (RFC 7515) for signatures recommended
- Intent / Critical Decision: Canonical config file for lab templates and published artifacts; supports locking, signatures, and validation.

## EPIC-E — Notes

- Mentioned in: EPIC-E — LAB CREATION SYSTEM (MANUAL + AI)
- EPIC-E intent: Define the `forgea.config.json` schema, locking lifecycle, signature format, and discovery conventions so tools can discover, validate, and verify lab artifacts.
- Important points:
  - Use JSON Schema 2020-12 for machine validation; publish canonical `forgea.config.schema.json` under `/docs/official-docs/EPIC-E/`.
  - Include fields: `lab_id`, `version` (SemVer), `author`, `locked: boolean`, `signature` (JWS compact or detached), and metadata for preview/snapshot policies.
  - Recommend JWS (RFC 7515) with Ed25519 (RFC 8037) for signatures; document how verifiers obtain the public keys (JWKS endpoint or internal trust store).
  - Define lock lifecycle states (draft → published → locked) and required approvals for transitions; include audit metadata (signed by, signed_at, signer_kid).
  - Provide examples (draft vs locked) and an example verifier CLI that rejects unsigned locked configs.
  - Security: forbids embedding secrets or long base64 strings in configs; validators must reject obvious secret patterns and CI must run sanitizers prior to publish.

## Implementation hints

- Place `forgea.config.json` at a predictable location (repo root or `/.forgea/forgea.config.json`) and document discovery precedence in tooling.
- Provide a sample `verify` script that checks schema + signature and emits a canonical verification JSON for artifact ingestion.
