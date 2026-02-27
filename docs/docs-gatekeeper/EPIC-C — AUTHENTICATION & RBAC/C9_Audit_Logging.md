## FEATURE CONTEXT

- Epic: EPIC-C — AUTHENTICATION & RBAC
- Feature: C9_Audit_Logging
- Exact input files read:
  - /Users/aryasoni/Desktop/Forgea/docs/agent_orchestrator_output/EPIC-C — AUTHENTICATION & RBAC/C9_Audit_Logging.md
  - /Users/aryasoni/Desktop/Forgea/docs/code-scout/EPIC-C — AUTHENTICATION & RBAC/C9_Audit_Logging.md
  - /Users/aryasoni/Desktop/Forgea/packages/audit/src/audit.service.ts
  - /Users/aryasoni/Desktop/Forgea/packages/schema/prisma/schema.prisma
  - /Users/aryasoni/Desktop/Forgea/packages/schema/src/audit-actions.ts
  - /Users/aryasoni/Desktop/Forgea/packages/config/src/permissions.ts

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

### EXISTING INTERNAL DOCS (VERIFIED)

- `/Users/aryasoni/Desktop/Forgea/packages/audit/src/audit.service.ts`
  - Coverage status: PARTIAL
  - Exact gaps: Implements `AuditService.log(...)` with scrub/size limits and high-severity sink, but lacks documented retention/archival procedures and no guaranteed retry/backup path.

- `/Users/aryasoni/Desktop/Forgea/packages/schema/prisma/schema.prisma`
  - Coverage status: PARTIAL
  - Exact gaps: `AuditLog` model exists (id, userId, actorId, action, metadata, createdAt) but no documented retention or immutability policy; migrations reference immutability triggers but no acceptance tests.

- `/Users/aryasoni/Desktop/Forgea/packages/schema/src/audit-actions.ts`
  - Coverage status: PARTIAL
  - Exact gaps: Defines `AuditAction`/`AuditSeverity` enums but policy mapping (which actions are legal-grade) is not documented.

- `/Users/aryasoni/Desktop/Forgea/packages/config/src/permissions.ts`
  - Coverage status: PARTIAL
  - Exact gaps: Exposes `emitAuditEvent` (Edge-safe) but no registry documenting differences between telemetry-only vs legal-grade events and expected sink schemas.

### DOCUMENTATION COVERAGE DECISION

⚠️ DOCUMENTATION PARTIAL — EXTENSION REQUIRED

- Rationale: Core implementation and enums exist, and DB migration artifacts reference immutability triggers, but there is no authoritative internal policy that (1) classifies legal-grade audit actions, (2) specifies retention/archival windows and access controls, and (3) documents external sink schemas and onboarding.

### STUDY GUIDE FOR HUMAN

- `Database immutability`: Why — legal-grade audits require tamper-evident storage. Alternatives: append-only tables + immutability triggers vs. WORM storage; When NOT to use triggers — when using third-party immutable stores; Common mistakes: assuming application-level append-only semantics are sufficient without DB enforcement.
- `Audit retention`: Why — compliance and cost management; Alternatives: retain all logs indefinitely (costly) vs. hot/cold split; When NOT to keep logs hot — logs older than retention window; Common mistakes: lacking testable archival/recovery path.
- `Telemetry vs legal-grade logs`: Why — lightweight telemetry (Edge) is useful for UX but not compliant; Alternatives: send both (telemetry + DB persist) with clear boundaries; Common mistakes: treating telemetry-only as authoritative auditable evidence.

### INTERNAL DOCS TO ADD OR EXTEND

- Path: /docs/official-docs/EPIC-C/audit_policy.md
  - Purpose: Security/Compliance policy classifying which `AuditAction` values are legal-grade, required retention windows, redaction rules, and access controls.
  - Exact knowledge to add: Mapping from `packages/schema/src/audit-actions.ts` actions → persistence class (LEGAL-GRADE vs TELEMETRY), retention durations (hot/cold), redaction rules (fields to scrub), and roles permitted to read/export.
  - Required version pin: references to PostgreSQL 18.1 and Prisma 7.3.0 in header.

- Path: /docs/official-docs/EPIC-C/audit_retention_and_archival.md
  - Purpose: Operational runbook for archival jobs, retention enforcement, and recovery procedures.
  - Exact knowledge to add: Job schedule, archival destination format, recovery steps, and acceptance tests (verify archived rows recoverable within X hours).
  - Required version pin: PostgreSQL 18.1.

- Path: /docs/official-docs/EPIC-C/audit_sink_spec.md
  - Purpose: Specification for `FORGEA_AUDIT_SINK_URL` and `FORGEA_SECURITY_ALERT_SINK_URL` payload schemas, authentication, and onboarding steps.
  - Exact knowledge to add: JSON schema for telemetry and security alerts, expected HTTP headers/auth, retry/backoff semantics, and example payloads.
  - Required version pin: N/A (implementation detail doc).

### OPEN QUESTIONS / AMBIGUITIES

- Which `AuditAction` values (see `packages/schema/src/audit-actions.ts`) must be stored immutable in the DB vs can be telemetry-only?
- What are the exact retention windows (hot/cold) and who is authorized to read/export audit logs? (e.g., Security Ops + Legal)
- Are external audit sinks (`FORGEA_AUDIT_SINK_URL`, `FORGEA_SECURITY_ALERT_SINK_URL`) provisioned by infra with documented schemas and auth? If not, onboarding steps are required.

### MASTER DOCS REGISTRY ACTION

Append the following entry to `/docs/master_docs.md`:

- Date: 2026-02-11
  - Epic / Feature: EPIC-C / C9 — Audit Logging
  - Doc path: /docs/docs-gatekeeper/EPIC-C — AUTHENTICATION & RBAC/C9_Audit_Logging.md
  - Status: ADDED
  - Reason: Docs Gatekeeper brief created to enumerate required official docs and internal doc gaps for audit logging, retention, and sink onboarding.

---

End of brief.
