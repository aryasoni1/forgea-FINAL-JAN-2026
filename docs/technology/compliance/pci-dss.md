# PCI-DSS

- Category: Compliance / Payments
- Epics: B
- Version / Requirement: PCI DSS v4.0 (reference)
- Intent / Critical Decision: Guidance for handling payment card data, minimizing PCI scope, and meeting audit/attestation requirements.

## EPIC-B — Notes

- Mentioned in: EPIC-B — DATABASE CORE & HARDENING (B10 Billing, B12 Audit)
- EPIC-B intent: Ensure billing flows and any payment-related storage meet PCI requirements or stay fully out of scope by using a PCI-compliant provider (e.g., Stripe).
- Important points:
  - Scope minimization: Do not store PAN/CVC locally; use provider-hosted payment pages or tokenization. Store only provider tokens / transaction IDs.
  - API/webhook handling: Pin provider API versions; verify webhook signatures; use idempotency keys for event processing to avoid duplicate billing records.
  - Logging & retention: Ensure logs that may contain payment identifiers are redacted or access-controlled; retain audit trails per policy and ensure logs are tamper-evident.
  - Encryption & keys: At-rest encryption for any stored billing metadata; use KMS/Vault for key management and rotate keys per policy.
  - Compliance artifacts: Document SAQ/ROC responsibilities, required evidence (logs, configs), and who owns the attestation process.
  - CI/Dev guidance: Use sandbox/test keys in non-prod; prevent accidental leakage of real credentials (CI secrets scanning and push-blocking).
