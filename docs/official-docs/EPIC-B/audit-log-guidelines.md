---
doc_id: audit-log-guidelines
tool: PostgreSQL
version_pinned: true
change_sensitivity: HIGH
lifecycle: ACTIVE
---

# PostgreSQL 18.1 — Audit Log Guidelines

## Purpose

Defines the mandatory structure of server-side JSON logs for machine-readable audit ingestion and establishes the canonical list of SQLSTATE error codes required for compliance monitoring.

## Status

- Doc type: INTERNAL / AUTHORITATIVE
- Evidence basis: Official vendor documentation only
- Version status: PINNED (v18.1)

## Scope

- Applies to: `postgresql.conf` logging parameters, JSON log output schema, and SQLSTATE error code interpretation.
- Does NOT apply to: Client-side logging, application-level logs, or `csvlog`/`syslog` formats unless used strictly as fallbacks.

## Official Sources (Binding)

- PostgreSQL 18.1: 19.8. Error Reporting and Logging
- PostgreSQL 18.1: Appendix A. PostgreSQL Error Codes

## Evidence Coverage Matrix

| Policy Area            | Source URL                           | Version Covered | Status  |
| ---------------------- | ------------------------------------ | --------------- | ------- |
| JSON Log Configuration | 19.8.1. Where to Log                 | v18.1           | COVERED |
| JSON Schema Definition | 19.8.5. Using JSON-Format Log Output | v18.1           | COVERED |
| Error Code Structure   | Appendix A                           | v18.1           | COVERED |
| Error Classes          | Appendix A                           | v18.1           | COVERED |

## Version & Compatibility

- **Tool version:** PostgreSQL 18.1.
- **Format Stability:** JSON log keys are defined in Table 19.4; future versions may add fields, but existing applications should ignore unknown fields.

## Canonical Rules (Non-Negotiable)

- **Log Destination:**
  - The `log_destination` parameter MUST include `jsonlog` to generate machine-readable output.
  - The `logging_collector` parameter MUST be set to `on` for `jsonlog` generation to function.
- **JSON Schema Structure:**
  - Log entries MUST be serialized as JSON objects.
  - **Mandatory Keys (when populated):** `timestamp` (string with ms), `user`, `dbname`, `pid`, `remote_host`, `remote_port`, `session_id`, `line_num`, `ps`, `session_start`, `vxid`, `txid`, `error_severity`, `state_code`, `message`, `detail`, `hint`, `internal_query`, `internal_position`, `context`, `statement`, `cursor_position`, `func_name`, `file_name`, `file_line_num`, `application_name`, `backend_type`, `leader_pid`, `query_id`.
  - **Null Handling:** String fields with null values are EXCLUDED from the JSON output; ingestion systems MUST handle missing keys.
- **Error Code Format:**
  - Error codes (`state_code`) MUST consist of exactly five characters.
  - The first two characters denote the **Class**; the last three indicate the **Condition**.
  - Codes ending in `000` denote the standard error for that class.
- **File Naming:**
  - If `jsonlog` is enabled, the `.json` extension is automatically appended to the timestamped log filename (replacing `.log` if present).

## Prohibited Configurations

- ❌ **Disabling Collector:** Setting `logging_collector = off` while `log_destination` includes `jsonlog` is invalid; JSON logs will not be generated.
- ❌ **Format Reliance:** Ingestion parsers MUST NOT rely on fixed column order (unlike CSV); they MUST parse by JSON key.
- ❌ **Null Expectation:** Ingestion parsers MUST NOT expect all keys to be present in every record (e.g., `statement` is missing for connection logs).

## Enforcement

- **Runtime Configuration:**
  - `current_logfiles` file records the active log file path and destination format (e.g., `jsonlog log/postgresql.json`).
- **SQLSTATE Classes (Audit Triggers):**
  - **Class 23 (Integrity Constraint Violation):** `23505` (Unique), `23503` (Foreign Key).
  - **Class 28 (Invalid Authorization):** `28P01` (Invalid Password).
  - **Class 42 (Syntax/Access Rule):** `42501` (Insufficient Privilege).
  - **Class 53 (Insufficient Resources):** `53100` (Disk Full), `53300` (Too Many Connections).
  - **Class 57 (Operator Intervention):** `57P01` (Admin Shutdown), `57P02` (Crash Shutdown).

## Failure Modes

- **Collector Blocking:** If the logging collector falls behind under extreme load, server processes may block while trying to send messages (unlike `syslog` which drops them).
- **Rotation Overwrite:** If `log_truncate_on_rotation` is `on` and filenames reuse the same pattern (e.g., `%H`), logs will be overwritten cyclically, potentially losing audit history.
- **Permission Errors:** If `log_file_mode` is restrictive (e.g., `0600`), external agents running as non-postgres users cannot read the JSON logs for ingestion.

## Cross-Doc Dependencies

- Depends on:
  - `/docs/official-docs/EPIC-B/postgresql.md` (Provisioning requires logging parameters).
- Conflicts with:
  - NONE

## Planner Extraction Hints (Non-Human)

- `log_destination` MUST CONTAINS "jsonlog".
- `logging_collector` MUST BE "on".
- `state_code` maps to `SQLSTATE` in Appendix A.
- `error_severity` maps to "ERROR", "FATAL", "PANIC", "LOG", "WARNING".

## Verification Checklist

- [ ] `log_destination` includes `jsonlog`.
- [ ] `logging_collector` is `on`.
- [ ] Log files end in `.json`.
- [ ] Ingestion system accepts JSON objects with missing keys (sparse).
- [ ] `state_code` `42501` triggers security alerts.

## Non-Decisions

- This document does not define specific `log_rotation_age` or `log_rotation_size` values.
- This document does not mandate the use of `csvlog` or `syslog`.

## Notes

- `jsonlog` was introduced to provide structured logging without the fragility of CSV parsing.
- The `query_id` field requires `compute_query_id` to be enabled or `pg_stat_statements` to be loaded.
- `backend_type` in logs may include types not visible in `pg_stat_activity`.
