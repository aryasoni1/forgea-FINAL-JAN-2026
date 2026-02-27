# Vault / Cloud KMS

- Category: Secrets
- Epics: F
- Version / Requirement: Pin required
- Intent / Critical Decision: Secure key storage and rotation for app secrets.

## EPIC-B — Notes

- Mentioned in: EPIC-B — DATABASE CORE & HARDENING (B13 Environment Safety)
- EPIC-B intent: Use Vault or cloud KMS to protect DB credentials, encryption keys for evidence storage, and secrets used by migration/backup jobs.
- Important points:
  - Document secret rotation policies, access control (least privilege), and how CI/CD pipelines retrieve database credentials securely for migration jobs.
  - Recommend envelope encryption patterns for sensitive payloads stored in object storage (S3/Azure Blob) and key rotation procedures for immutability and audit requirements.

## EPIC-E — Notes

- Mentioned in: EPIC-E — LAB CREATION SYSTEM (MANUAL + AI)
- EPIC-E intent: Manage keys and ephemeral tokens for signed `forgea.config.json` artifacts, artifact upload tokens, and verification runner secrets.
- Important points:
  - Document a key-distribution model for JWS signing of published config/snapshot proofs (recommended: Ed25519 via RFC 8037) and how verifiers obtain verification keys (JWKS endpoint or internal trust store).
  - Provide guidance for issuing ephemeral, least-privilege artifact-upload tokens used only for a single verification run; rotate and revoke tokens automatically.
  - Explicitly forbid embedding real secrets into lab fixtures or snapshots; provide mock secret patterns and safe fixtures for QA.

## EPIC-C — Notes

- Mentioned in: EPIC-C — AUTHENTICATION & RBAC
- EPIC-C intent: Store OAuth client secrets, JWT signing keys, and session encryption keys securely and support automated rotation for key rollovers.
- Important points:
  - Define access policies that allow only auth services to retrieve short-lived credentials; avoid long-lived tokens in CI logs.
  - Document signing key rotation process for JWS/JWT keys, including publishing new JWKs, key ids (`kid`), and graceful key rollover for active sessions.

## EPIC-F — Notes

- Mentioned in: EPIC-F — GITHUB INTEGRATION FOR LABS
- EPIC-F intent: Secure storage and rotation of GitHub App private keys, webhook secrets, and ephemeral installer tokens used by automation.
- Important points:
  - Store the GitHub App private PEM and webhook HMAC secret in Vault paths with strict ACLs; provide example Vault paths, policies, and role bindings for the app and CI runners.
  - Document emergency rotation steps (revoke current installation tokens, rotate PEM, notify installers) and provide sample `vault` CLI commands for rotation and key retrieval during CI runs.
  - Recommend issuing ephemeral tokens for artifact uploads and provide a short TTL (minutes to hours) plus automated revocation on suspicious activity.
  - Recommend issuing ephemeral tokens for artifact uploads and provide a short TTL (minutes to hours) plus automated revocation on suspicious activity.

## EPIC-G — Notes

- Mentioned in: EPIC-G — PUSH FLOW & SNAPSHOT PREVIEW
- EPIC-G intent: Secure storage and rotation of webhook secrets, GitHub App private keys, and signing keys used for snapshot provenance and build signing.
- Important points:
  - Record webhook HMAC secret storage conventions (Vault paths) and document rotation procedures including dual-secret acceptance windows and required audit events for `G1_Webhook_Intake_&_Security`.
  - Clarify signing key handling for artifact provenance in `G9_Snapshot_Build_Trigger` (who may sign, where keys are stored, and whether hardware-backed keys are required); link to provenance runbook when available.
  - Provide emergency rotation runbooks that minimize ingestion disruption (revoke, rotate, notify, and dual-acceptance grace periods) and include example `vault` CLI commands for common ops.

---

# EPIC-H — Notes (merged)

- Referenced by: EPIC-H — LAB TESTING & VERIFICATION ENGINE
- Intent: Use KMS/HSM (or Vault) for signing verification artifacts and storing signing keys used in commit/tag verification and artifact signing.
- Important points:
  - Document key custody, rotation, and signing workflows for artifact and audit signing.
  - Ensure audit logs for signing operations and restrict signing privileges to hardened services.
  - Provide example signing/verification commands and integrate verification checks into the pipeline.
