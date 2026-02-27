# ECS Examples (Elastic Common Schema)

- Category: Observability
- Epics: B
- Version / Requirement: ECS reference (pin recommended)
- Intent / Critical Decision: Provide concrete ECS JSON examples for DB and audit events to aid ingestion and mapping.

## EPIC-B — Notes

- Mentioned in: EPIC-B — DATABASE CORE & HARDENING (B12 Audit Infrastructure)
- EPIC-B intent: Supply sample ECS events for common DB/audit activities to ensure consistent logging and parseability.
- Examples:
  - DDL change (schema migration):

```json
{
  "@timestamp": "2026-02-18T12:34:56Z",
  "event": {
    "action": "ddl",
    "kind": "change",
    "category": ["database"],
    "type": "migration"
  },
  "user": { "id": "deploy-bot", "name": "CI Migration" },
  "database": {
    "type": "postgresql",
    "instance": "db-primary",
    "statement": "ALTER TABLE users ADD COLUMN x text;"
  },
  "trace": { "id": "..." },
  "message": "Applied migration 20260218_add_x_to_users"
}
```

- Failed authentication attempt:

```json
{
  "@timestamp": "2026-02-18T12:35:00Z",
  "event": {
    "action": "login_attempt",
    "category": ["authentication"],
    "outcome": "failure"
  },
  "user": { "name": "unknown", "id": null },
  "source": { "ip": "203.0.113.12" },
  "database": { "type": "postgresql", "instance": "db-primary" },
  "message": "Failed DB auth for user 'readonly'"
}
```

- Row access / data export event:

```json
{
  "@timestamp": "2026-02-18T12:40:00Z",
  "event": { "action": "select", "category": ["database"], "type": "query" },
  "user": { "id": "user:123", "name": "alice@example.com" },
  "database": {
    "type": "postgresql",
    "statement": "SELECT * FROM proofs WHERE user_id=123"
  },
  "file": { "path": "s3://evidence-bucket/exports/export-2026-02-18.csv" },
  "message": "Exported proofs for user 123"
}
```

- Important points:
  - Ensure each event includes consistent `@timestamp`, `user.id`, `trace.id`, and `event.*` fields for correlation.
  - Provide index templates and parsers on the ingest side to extract `db.statement`, `user.id`, and other fields for alerting and audit queries.
