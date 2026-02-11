---
doc_id: log-protection-policy
tool: OWASP Logging
version_pinned: false
change_sensitivity: HIGH
lifecycle: ACTIVE
---

# OWASP — Log Protection & Integrity Policy

## Purpose

Governs the architectural and storage invariants required to ensure the confidentiality, integrity, and availability of audit logs. This policy mandates network segmentation, Write-Once-Read-Many (WORM) storage strategies, and tamper detection to prevent attackers from modifying or deleting evidence of their activities.

## Status

- Doc type: INTERNAL / AUTHORITATIVE
- Evidence basis: OWASP Security Logging and Application Monitoring Cheat Sheet
- Version status: BLOCKED – VERSION NOT SPECIFIED

## Scope

- Applies to: Log storage infrastructure, network topology design, database configurations for logging, and log transmission protocols.
- Does NOT apply to: The specific content or syntax of log messages (governed by separate content policies).

## Official Sources (Binding)

- [OWASP Security Logging and Application Monitoring Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Logging_Cheat_Sheet.html)

## Evidence Coverage Matrix

| Policy Area              | Source Passage | Version Covered | Status  |
| ------------------------ | -------------- | --------------- | ------- |
| Network Segmentation     | ,,             | N/A             | COVERED |
| WORM / Read-Only Storage |                | N/A             | COVERED |
| Tamper Detection         |                | N/A             | COVERED |
| Storage Separation       | ,              | N/A             | COVERED |
| Secure Transmission      |                | N/A             | COVERED |

## Version & Compatibility

- **Tool version:** N/A (General architectural guidance).
- **Protocol Standards:** CLFS, CEF, or syslog over secure protocols are recommended.

## Canonical Rules (Non-Negotiable)

- **Network Segmentation:**
  - Log collection and storage MUST be centralized and architecturally separated from business applications.
  - **Log Storage Segment:** Logs MUST be stored in a dedicated segment (e.g., BACKEND 2) distinct from the service database (BACKEND 1).
  - **Log Loader/Collector Segment:** Processing applications MUST reside in a separate middleware segment (MIDDLEWARE 3) from the core business logic (MIDDLEWARE 1).
- **Storage Isolation:**
  - File-based logs MUST use a separate partition or disk from those used by the operating system, other application files, or user-generated content.
  - This prevents log flooding attacks from exhausting disk space required for system functioning.
- **Read-Only Storage (WORM):**
  - Log data MUST be stored on or copied to read-only media as soon as possible to prevent modification.
  - Access to write to these logs after initial storage MUST be technically impossible for the writing application.
- **Database Isolation:**
  - If using a database, the application MUST use a separate account strictly for writing log data.
  - This account MUST have very restrictive permissions (e.g., `INSERT` only), lacking the ability to `UPDATE` or `DELETE` records.
- **Tamper Detection:**
  - The system MUST build in tamper detection mechanisms to identify if a record has been modified or deleted.
  - Cryptographic hashing or chaining of log entries SHOULD be used to enforce integrity.
- **Secure Transmission:**
  - Logs sent over untrusted networks MUST use a secure transmission protocol (e.g., TLS) to prevent interception or tampering in transit.

## Prohibited Configurations

- ❌ **Co-mingled Storage:** Storing logs on the same disk partition as the application database or OS is PROHIBITED.
- ❌ **Web-Accessible Logs:** Logs MUST NOT be exposed in web-accessible locations (e.g., web root) without strict access controls and plain text MIME types.
- ❌ **Excessive Privileges:** The logging process MUST NOT have `DELETE` or `DROP` permissions on the log storage medium.
- ❌ **Unencrypted Transit:** Sending log data over plain syslog or HTTP across network boundaries is PROHIBITED.

## Enforcement

- **Infrastructure Config:**
  - Network firewalls MUST enforce the segmentation between MIDDLEWARE 1 (App) and BACKEND 2 (Logs),.
  - Different network ports MUST be used for saving (ingestion) versus downloading (viewing) logs.
- **Access Control:**
  - All access to logs MUST be recorded and monitored.
  - Privileges to read log data MUST be restricted and reviewed periodically.

## Failure Modes

- **Availability Attack (DoS):** An attacker floods log files to exhaust disk space, causing the application (if co-located) to crash or stop functioning.
- **Integrity Attack:** An attacker with read/write access modifies log entries to cover their tracks or injects malicious payloads,.
- **Confidentiality Breach:** Unauthorized parties access logs containing PII or technical secrets due to weak permissions.

## Cross-Doc Dependencies

- Depends on:
  - `/docs/official-docs/EPIC-B/audit-log-guidelines.md` (Defines _what_ is logged).
- Conflicts with:
  - NONE

## Planner Extraction Hints (Non-Human)

- `storage_strategy` = `SEGREGATED` (Separate Disk/Partition).
- `write_mode` = `APPEND_ONLY` or `WORM`.
- `network_topology` = `SEGMENTED` (App Logic != Log Storage).
- `db_permissions` = `INSERT_ONLY`.

## Verification Checklist

- [ ] Logs are stored on a separate partition/volume.
- [ ] Database user for logging has `INSERT` privilege only.
- [ ] Network rules separate the Log Collector from the Business App.
- [ ] Logs are replicated to read-only storage immediately.
- [ ] Tamper detection (e.g., checksums/hashing) is implemented.

## Non-Decisions

- This document does not specify the exact hardware for WORM storage (e.g., AWS S3 Object Lock vs. Optical Disc).
- This document does not define the specific SIEM tool to be used for analysis.

## Notes

- Non-repudiation is difficult to achieve solely with logs; digital signatures may be required for high-assurance environments.
- Sanitization of logs should occur _before_ storage to prevent log injection attacks.
