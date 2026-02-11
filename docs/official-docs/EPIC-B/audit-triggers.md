---
doc_id: audit-triggers
tool: Application Logging
version_pinned: false
change_sensitivity: HIGH
lifecycle: ACTIVE
---

# Mandatory Audit Event Policy

## Purpose

Defines the non-negotiable list of system events that MUST trigger an audit log entry. This policy ensures that security-critical actions—specifically authentication, authorization, and administrative privilege usage—are reliably recorded for forensic reconstruction and compliance monitoring.

## Status

- Doc type: INTERNAL / AUTHORITATIVE
- Evidence basis: OWASP Security Logging and Application Monitoring Cheat Sheet
- Version status: BLOCKED – VERSION NOT SPECIFIED

## Scope

- Applies to: All application modules, authentication gateways, administrative interfaces, and data access layers.
- Does NOT apply to: Low-level debug tracing (unless classified as a security event) or infrastructure logs not managed by the application.

## Official Sources (Binding)

- [OWASP Security Logging and Application Monitoring Cheat Sheet] (Source–)

## Evidence Coverage Matrix

| Policy Area                  | Source Passage | Status  |
| ---------------------------- | -------------- | ------- |
| Authentication Events        |                | COVERED |
| Authorization (ACL) Failures |                | COVERED |
| Administrative Actions       |                | COVERED |
| Input/Output Validation      |                | COVERED |
| Sensitive Data Access        |                | COVERED |
| System Lifecycle Events      |                | COVERED |

## Version & Compatibility

- **Standard:** OWASP Security Logging recommendations.
- **Applicability:** Platform-agnostic (applies to Web, Mobile, and API services).

## Canonical Rules (Non-Negotiable)

The following events MUST be logged:

- **Authentication & Session:**
  - All authentication successes and failures.
  - Session management failures (e.g., cookie modification, suspicious JWT validation failures).
  - Application startups, shutdowns, and logging initialization states.
- **Authorization & Access Control:**
  - Authorization (access control) failures.
  - Access to sensitive data (e.g., payment cardholder data).
- **Administrative & High-Risk Actions:**
  - User administration actions: addition/deletion of users, privilege changes, token assignment.
  - **ALL** actions performed by users with administrative privileges.
  - Use of default, shared, or "break-glass" accounts.
  - Creation and deletion of system-level objects.
  - Data import and export actions (including screen-based reports).
  - Encryption key rotation or usage events.
- **Validation & Security Failures:**
  - Input validation failures (e.g., protocol violations, invalid parameter names/values).
  - Output validation failures (e.g., database record set mismatches, invalid encoding).
  - Deserialization failures.
  - File upload processing.
  - Network connection failures (specifically backend TLS or certificate validation failures).

## Prohibited Configurations

- ❌ **Excluding "Trusted" Users:** Events from internal systems, "trusted" third parties, auditors, or automated monitoring systems MUST NOT be excluded from logging.
- ❌ **Logging Sensitive Secrets:** The following MUST NOT be recorded in the logs:
  - Passwords, access tokens, and encryption keys.
  - Session ID values (unless hashed).
  - Database connection strings.
  - PII or commercially sensitive information without legal sanction,.
- ❌ **Deactivation:** It MUST NOT be possible to completely deactivate logging for compliance-critical events.

## Enforcement

- **Code Review:** Verification that log handlers are invoked in the error handling blocks of authentication and authorization logic.
- **Testing:**
  - Verify logging occurs during simulated attacks (e.g., fuzzing, auth bypass attempts).
  - Verify logging continues or fails safely during resource exhaustion (disk space, db connectivity).

## Failure Modes

- **"Alarm Fog":** Logging excessive low-value events obscures critical security incidents.
- **Log Injection:** Failure to sanitize event data allows attackers to forge log entries via CRLF injection.
- **Denial of Service:** Unbounded logging of high-volume events (e.g., during a DDoS) depletes disk space or DB transaction logs.

## Cross-Doc Dependencies

- Depends on:
  - `/docs/official-docs/EPIC-B/audit-log-guidelines.md` (Defines _how_ to log the event schema).
- Conflicts with:
  - NONE

## Planner Extraction Hints (Non-Human)

- Trigger `LOG_EVENT` on `HTTP_401` (Auth Failure).
- Trigger `LOG_EVENT` on `HTTP_403` (AuthZ Failure).
- Trigger `LOG_EVENT` if `user.role` == `ADMIN`.
- Trigger `LOG_EVENT` on `InputValidationException`.

## Verification Checklist

- [ ] Authentication logic invokes logger on Success AND Failure.
- [ ] Authorization middleware invokes logger on Denial.
- [ ] Admin dashboard actions are instrumented for full audit trails.
- [ ] Data export features trigger audit events.
- [ ] Input validation handlers log the specific failure reason.

## Non-Decisions

- This document does not define the specific log levels (Info vs. Warn) for each event, only that they must be recorded.
- This document does not specify the retention period for these logs (refer to legal/compliance policy).

## Notes

- Non-repudiation is difficult to achieve via logs alone; they generally prove "what happened" rather than "who definitely did it" without digital signatures.
- "Break-glass" accounts are emergency super-user accounts; their usage is a critical security event.
