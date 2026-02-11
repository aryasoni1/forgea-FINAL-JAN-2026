---
doc_id: log-redaction-policy
tool: OWASP Logging Cheat Sheet
version_pinned: false
change_sensitivity: HIGH
lifecycle: ACTIVE
---

# OWASP — Log Content Redaction Policy

## Purpose

Establishes a "Zero-PII" logging mandate by defining specific categories of sensitive data that must be excluded, masked, sanitized, hashed, or encrypted before being recorded in application logs.

## Status

- Doc type: INTERNAL / AUTHORITATIVE
- Evidence basis: Official vendor documentation only
- Version status: BLOCKED – VERSION NOT SPECIFIED

## Scope

- Applies to: All application event data, local file logs, database logs, and data sent to centralized logging systems (SIEM/SEM).
- Does NOT apply to: Legally sanctioned interception of data (e.g., wire-tapping) explicitly authorized by jurisdiction.

## Official Sources (Binding)

- Security Logging and Application Monitoring Cheat Sheet (OWASP)

## Evidence Coverage Matrix

| Policy Area         | Source Passage | Version Covered | Status  |
| ------------------- | -------------- | --------------- | ------- |
| Data to Exclude     | ,,             | N/A             | COVERED |
| Session ID Handling |                | N/A             | COVERED |
| Password Handling   |                | N/A             | COVERED |
| PII Handling        | ,              | N/A             | COVERED |
| Encryption Keys     |                | N/A             | COVERED |

## Version & Compatibility

- **Tool version:** BLOCKED – SOURCE MISSING.
- **Class-Based Rule:** This policy applies universally to all logging frameworks and application versions regardless of underlying technology.

## Canonical Rules (Non-Negotiable)

- **Mandatory Exclusion (Secrets):**
  - The following data MUST NOT be recorded directly in logs and MUST be removed, masked, sanitized, hashed, or encrypted:
    - Application source code.
    - Authentication passwords.
    - Access tokens.
    - Encryption keys and other primary secrets.
    - Database connection strings.
- **Session Identifier Protection:**
  - Session identification values MUST NOT be logged in cleartext.
  - If needed for tracking, session IDs MUST be replaced with a hashed value.
- **PII & Sensitive Data Redaction:**
  - Sensitive personal data (e.g., health, government identifiers, vulnerable people) MUST be masked, sanitized, hashed, or encrypted.
  - Non-sensitive personal data (e.g., names, telephone numbers, email addresses) MUST be treated via deletion, scrambling, or pseudonymization if individual identity is not strictly required.
  - Bank account and payment cardholder data MUST be excluded.
- **Sanitization of Internal Details:**
  - The following data MUST be treated specially (sanitized/masked) before recording:
    - File paths.
    - Internal network names and addresses.

## Prohibited Configurations

- ❌ **Logging without Consent:** Data MUST NOT be logged if the user has opted out, not consented, or if consent has expired (e.g., Do Not Track).
- ❌ **Excessive Classification:** Data of a higher security classification than the logging system is authorized to store MUST NOT be logged.
- ❌ **Logging Commercially Sensitive Info:** Commercially-sensitive information MUST NOT be recorded.
- ❌ **Logging Illegal Info:** Information that is illegal to collect in the relevant jurisdiction MUST NOT be logged.

## Enforcement

- **Input Sanitization:**
  - All event data MUST be sanitized to prevent log injection attacks (e.g., removing carriage returns `CR`, line feeds `LF`, and delimiter characters).
- **Code Review:**
  - Logging functionality MUST be included in code review and application testing processes to verify that classification and masking are consistent.
- **Automated Masking:**
  - Sanitization SHOULD be undertaken post-log collection or prior to log display in some systems, but removal/hashing at the source is primary.

## Failure Modes

- **Information Leakage:** Failure to redact allows unauthorized parties with read access to logs to harvest PII, passwords, and technical secrets,.
- **Compliance Violation:** Logging prohibited data (e.g., PCI DSS, GDPR data) results in regulatory non-compliance,.
- **Log Injection:** Failure to sanitize delimiters allows attackers to forge log entries or corrupt log integrity,.

## Cross-Doc Dependencies

- Depends on:
  - NONE
- Conflicts with:
  - NONE

## Planner Extraction Hints (Non-Human)

- `data_type` == "password" -> ACTION: `EXCLUDE`
- `data_type` == "session_id" -> ACTION: `HASH`
- `data_type` == "access_token" -> ACTION: `EXCLUDE`
- `data_type` == "encryption_key" -> ACTION: `EXCLUDE`
- `data_type` == "PII" -> ACTION: `MASK` OR `ENCRYPT`

## Verification Checklist

- [ ] Passwords are never written to logs.
- [ ] Session IDs are hashed or excluded.
- [ ] Database connection strings are excluded.
- [ ] Payment card data is excluded.
- [ ] Log injection sanitization (CR/LF removal) is implemented.

## Non-Decisions

- This document does not define the specific hashing algorithm for Session IDs (e.g., SHA-256 vs SHA-3).
- This document does not specify the exact "retention period" for logs, only that they must not be destroyed before it ends.

## Notes

- "Non-repudiation" is difficult to achieve via logs alone; do not rely on logs for digital signature-equivalent trust.
- Logging levels and content should be proportionate to information security risks.
