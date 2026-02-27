# SOC 2 / AICPA

- Category: Compliance / Audit
- Epics: B
- Version / Requirement: SOC 2 Type II guidance (reference)
- Intent / Critical Decision: Provide controls and evidence mapping required for SOC 2 audits and AICPA attestation.

## EPIC-B — Notes

- Mentioned in: EPIC-B — DATABASE CORE & HARDENING (B12 Audit Infrastructure)
- EPIC-B intent: Define controls, logging, monitoring, and evidence retention required for SOC 2 readiness; map responsibilities for evidence collection.
- Important points:
  - Controls mapping: Identify which application/processes map to Common Criteria (CC) categories (e.g., logical access, change management, backup & recovery).
  - Evidence: Document what artifacts are required (config files, audit logs, access lists, backup/restore records) and retention windows.
  - Roles & ownership: Assign control owners for evidence collection and maintain runbooks for auditors.
  - Automated evidence: Instrument pipelines to collect reproducible evidence (immutable logs, signed artifacts, automated backup reports).
  - Gap remediation: Provide remediation playbooks for common gaps (missing logs, insufficient retention, missing access reviews).
