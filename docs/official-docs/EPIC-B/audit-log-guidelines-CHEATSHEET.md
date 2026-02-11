---
doc_id: audit-log-guidelines
tool: Application Logging
version_pinned: false
change_sensitivity: HIGH
lifecycle: ACTIVE
---

# Audit Event Design & Schema Policy

## Purpose

Defines the mandatory schema attributes for application audit logs to ensure every event contains a traceable user identity, absolute timestamp, severity classification, and a correlation identifier for tracking complex interactions.

## Status

- Doc type: INTERNAL / AUTHORITATIVE
- Evidence basis: OWASP Security Logging and Application Monitoring Cheat Sheet
- Version status: BLOCKED – VERSION NOT SPECIFIED

## Scope

- Applies to: Application-level security event logging, audit trails, and debug logs.
- Does NOT apply to: Operating system logs or network device logs (unless ingested into the application context).

## Official Sources (Binding)

- [OWASP Security Logging and Application Monitoring Cheat Sheet] (Source provided in context)

## Evidence Coverage Matrix

| Policy Area                                   | Source Passage | Version Covered | Status  |
| --------------------------------------------- | -------------- | --------------- | ------- |
| Mandatory Attributes (When, Where, Who, What) | ,,             | General         | COVERED |
| Interaction Identifiers                       | ,              | General         | COVERED |
| Time Synchronization                          |                | General         | COVERED |
| Data Exclusion (Sensitive Data)               | ,,             | General         | COVERED |
| Severity Levels                               |                | General         | COVERED |

## Version & Compatibility

- **Tool version:** N/A (Standard based).
- **Format:** Logs SHOULD use standard formats (e.g., JSON, CEF) to facilitate integration.

## Canonical Rules (Non-Negotiable)

- **Mandatory Event Attributes:**
  - Every log entry MUST record the **"When, Where, Who, and What"** of the event.
- **"When" Requirements:**
  - **Timestamp:** Log date and time MUST be recorded in an international format.
  - **Event Time:** If the event occurred significantly before logging (e.g., offline mobile device), the original _Event date and time_ MUST be recorded separately from the log timestamp.
  - **Interaction Identifier:** A unique ID MUST be included to link all relevant events for a single user interaction (e.g., a specific web request or transaction).
- **"Where" Requirements:**
  - **Application Identity:** Record application name and version.
  - **Location:** Record the specific code location (script/module name) and the entry point (URL/HTTP method or window/form name).
  - **Address:** Record the server/cluster identity (Hostname, IP, Port).
- **"Who" Requirements:**
  - **User Identity:** Record the user's unique identity (e.g., database primary key or username) if authenticated.
  - **Source:** Record the user's source address (IP address, device ID).
- **"What" Requirements:**
  - **Type:** Classification of the event type.
  - **Severity:** A standardized severity level (e.g., 0-7, or fatal/error/warning/info/debug).
  - **Description:** A human-readable description of the event.
  - **Security Flag:** If logs are mixed, include a flag indicating if the event is security-relevant.
- **Time Synchronization:**
  - Server clocks MUST be synchronized. If synchronization is impossible (e.g., remote devices), the time offset or confidence level MUST be recorded.

## Prohibited Configurations

- ❌ **Missing Correlation ID:** Logging complex interactions (e.g., "saga requests") without a shared `interaction_identifier` is PROHIBITED, as it prevents event reconstruction.
- ❌ **Sensitive Data Exposure:** The following MUST NOT be logged in plaintext:
  - Passwords, Access Tokens, Encryption Keys.
  - Session ID values (unless hashed).
  - Database connection strings.
  - PII (Personally Identifiable Information) without consent or legal sanction.
- ❌ **Unsanitized Input:** Event data from untrusted sources MUST NOT be logged without sanitization to prevent log injection attacks (e.g., CRLF injection).

## Enforcement

- **Code Review:** Log handlers must be verified to ensure sanitization is applied and sensitive data is excluded.
- **Sanitization:** Log handlers MUST strip or encode carriage returns (CR), line feeds (LF), and delimiter characters before writing to the log.

## Failure Modes

- **"Alarm Fog":** Logging too much irrelevant data obscures real security incidents.
- **Log Injection:** Attackers injecting new line characters to forge log entries if input validation is missing.
- **Denial of Service (DoS):** Unbounded logging filling up disk space or exceeding database transaction log limits.

## Cross-Doc Dependencies

- Depends on:
  - `/docs/official-docs/EPIC-B/audit-log-guidelines.md` (PostgreSQL JSON structure).
- Conflicts with:
  - NONE

## Planner Extraction Hints (Non-Human)

- `log_schema` MUST INCLUDE keys: `timestamp`, `app_id`, `user_id`, `source_ip`, `event_type`, `severity`, `interaction_id`.
- `sensitive_data` (passwords, tokens) -> ACTION: `MASK` or `EXCLUDE`.
- `interaction_id` -> REQUIRED for all request-scoped logs.

## Verification Checklist

- [ ] Log schema includes `interaction_id` for correlation.
- [ ] Timestamp uses ISO-8601 (International format).
- [ ] User ID (Database PK) is present in authenticated logs.
- [ ] Severity levels are standardized (e.g., 0-7).
- [ ] Sensitive fields (passwords, keys) are masked/omitted.

## Non-Decisions

- This document does not define the specific international date format (ISO 8601 is implied but not explicitly mandated by the text, which just says "international format").
- This document does not specify the exact list of event types (e.g., "Login", "Logout") but requires a classification system be documented.

## Notes

- "Interaction identifier" is critical for linking input validation failures, database calls, and output errors to a single user request.
- Non-repudiation is difficult to achieve solely via logs; digital signatures would be required for higher assurance.
