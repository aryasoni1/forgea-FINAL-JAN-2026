### REQUIRED OFFICIAL DOCUMENTATION

- Technology: PostgreSQL
  - Concept: Append-only table patterns, immutability triggers, transactional DDL
  - Official source: https://www.postgresql.org/docs/
  - Exact version requirement: 18.1
  - Why required: Defines DB-level guarantees for immutability triggers, safe migration and archival patterns.
  - Decision it informs: How to implement and verify immutable `AuditLog` rows and safe archival.
  - What breaks without it: Misapplied triggers or non-transactional operations may allow updates/deletes or break migrations.

- Technology: Prisma
  - Concept: Schema mapping, JSON column usage, and migration SQL generation
  - Official source: https://www.prisma.io/docs
  - Exact version requirement: 7.3.0
  - Why required: Explains how Prisma models map to Postgres types (Json, timestamps) and how migrations produce SQL for audit schema.
  - Decision it informs: Whether Prisma-generated migrations adequately create immutability triggers and JSON size constraints.
  - What breaks without it: Schema-mismatch between ORM expectations and DB enforcement leading to silent failures.

- Technology: OWASP Logging Cheat Sheet
  - Concept: Logging best-practices for security and audit trails
  - Official source: https://cheatsheetseries.owasp.org/cheatsheets/Logging_Cheat_Sheet.html
  - Exact version requirement: LIVING DOCUMENT
  - Why required: Informs design for legal-grade audit logging, sensitive-data redaction, and audit-event classification.
  - Decision it informs: Which events require immutable DB persistence versus telemetry-only sinks, and redaction rules.
  - What breaks without it: Non-compliant logging that may leak PII or fail audits.
