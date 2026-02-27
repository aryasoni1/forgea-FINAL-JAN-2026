# NIST SP 800-92 (Log Management)

- Category: Compliance
- Epics: B
- Version / Requirement: Reference doc (pin recommended)
- Intent / Critical Decision: Provide authoritative guidance for log management and audit infrastructure.

## EPIC-B — Notes

- Mentioned in: EPIC-B — DATABASE CORE & HARDENING (B12 Audit Infrastructure)
- EPIC-B intent: Use NIST SP 800-92 as the baseline for log collection, retention, and secure storage of audit logs.
- Important points:
  - Document log collection architecture, retention policies, encryption at rest, and secure transport for audit logs.
  - Map application events to ECS (Elastic Common Schema) or equivalent and provide examples for DB audit logs and S3/Azure Blob access logs.
  - Ensure logs used for forensics are tamper-evident and aligned with immutability/retention requirements from B11.

---

# EPIC-H — Notes (merged)

- Referenced by: EPIC-H — LAB TESTING & VERIFICATION ENGINE
- Intent: Use NIST SP 800-92 guidance for audit logging, retention, and evidence handling in failure & abuse detection (H9).
- Important points:
  - Follow NIST guidance for audit record fields, retention policies, and tamper-evidence expectations.
  - Document storage and signing of audit bundles, access control for forensic retrieval, and legal-hold procedures.
