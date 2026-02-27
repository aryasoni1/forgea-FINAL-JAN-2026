# Vault / Cloud KMS — EPIC-G Notes

This file captures EPIC-G-specific notes for `vault-cloud-kms` when editing the original file was not possible.

- Mentioned in: EPIC-G — PUSH FLOW & SNAPSHOT PREVIEW
- EPIC-G intent: Secure storage and rotation of webhook secrets, GitHub App private keys, and signing keys used for snapshot provenance and build signing.
- Important points:
  - Record webhook HMAC secret storage conventions (Vault paths) and document rotation procedures including dual-secret acceptance windows and required audit events for `G1_Webhook_Intake_&_Security`.
  - Clarify signing key handling for artifact provenance in `G9_Snapshot_Build_Trigger` (who may sign, where keys are stored, and whether hardware-backed keys are required); link to provenance runbook when available.
  - Provide emergency rotation runbooks that minimize ingestion disruption (revoke, rotate, notify, and dual-acceptance grace periods) and include example `vault` CLI commands for common ops.

Note: If you prefer I can keep retrying to append these notes into `docs/technology/secrets/vault-cloud-kms.md` in-place; I created this file to ensure EPIC-G guidance exists without blocking progress.
