# Elastic Common Schema (ECS)

- Category: Compliance / Observability
- Epics: B
- Version / Requirement: ECS schema reference (pin recommended)
- Intent / Critical Decision: Standardize event and audit log fields for indexing, search, and compliance reporting.

## EPIC-B — Notes

- Mentioned in: EPIC-B — DATABASE CORE & HARDENING (B12 Audit Infrastructure, B11 Immutability)
- EPIC-B intent: Map application and DB audit events to ECS to enable consistent ingestion into ELK/Opensearch and to support forensic analysis.
- Important points:
  - Field mapping: Use ECS fields for user identity (`user.id`), request context (`trace.id`, `transaction.id`), host and process, and DB-specific fields (`event.type`, `db.statement`, `db.user`).
  - Index templates & ILM: Provide index templates and ILM policies for retention, rollover, and eventual deletion to meet retention requirements.
  - Tamper-evidence: Store logs in write-once / restricted-index clusters or route to immutable storage; ensure audit logs used for forensics are protected.
  - Correlation: Include request and trace identifiers to correlate DB actions with higher-level user activity for audits.
  - Examples: Provide sample ECS JSON for common DB audit events (DDL change, login, failed auth, row access) in the docs.
