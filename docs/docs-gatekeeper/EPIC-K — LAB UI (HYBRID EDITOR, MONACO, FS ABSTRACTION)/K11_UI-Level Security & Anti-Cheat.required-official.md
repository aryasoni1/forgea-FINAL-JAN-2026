### REQUIRED OFFICIAL DOCUMENTATION

1) Technology: `monaco-editor`
   - Concept: Secure client integration and editor-surface export/copy controls
   - Official source: https://microsoft.github.io/monaco-editor/
   - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
   - Why required: Defines client-side API surface that can enable bulk-copy, programmatic exports, and clipboard interactions.
   - What decision it informs: Where the client must gate copy/export UI and which editor APIs must be restricted or instrumented.
   - What breaks without it: Incorrect assumptions about available client hooks, unforeseen data-exfil vectors, and brittle mitigations.

2) Technology: Browser Clipboard API
   - Concept: Clipboard access and user-consent/security model
   - Official source: https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API
   - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED (browser matrix) BEFORE IMPLEMENTATION
   - Why required: Clarifies when `navigator.clipboard` is allowed, user gesture requirements, and compatibility caveats.
   - What decision it informs: UI-level copy prevention signals and fallback behaviour for older browsers.
   - What breaks without it: Misapplied client restrictions that either block legitimate flows or fail to stop programmatic clipboard reads.

3) Technology: File System Access API (client) / File download semantics (HTTP)
   - Concept: Safe client exports and server-side content-disposition handling
   - Official source: https://developer.mozilla.org/en-US/docs/Web/API/File_System_Access_API
   - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
   - Why required: Determines how exports may be offered to users and client-side permission expectations.
   - What decision it informs: Whether to offer client-side zipped exports, use server-side streaming, or block bulk-downloads.
   - What breaks without it: Unsound export UX or server-side APIs that leak files unexpectedly.

4) Technology: HTTP error semantics / Rate limiting guidance
   - Concept: `429 Too Many Requests` semantics and best-practice rate-limiting strategies
   - Official source: IETF RFC 6585 (429) — https://datatracker.ietf.org/doc/html/rfc6585 ; OWASP Rate Limiting Cheat Sheet — https://cheatsheetseries.owasp.org/cheatsheets/Rate_Limiting_Cheat_Sheet.html
   - Exact version requirement: RFC 6585 (stable); OWASP page VERSION UNKNOWN — ACK PIN
   - Why required: Standardizes response codes, headers (`Retry-After`), and client-visible behavior when throttles are hit.
   - What decision it informs: Precise throttling thresholds, scope (per-user/IP/lab), and fallback UX.
   - What breaks without it: Inconsistent client handling of throttling, ambiguous retry semantics, or accidental DoS risk.

5) Technology: Audit & logging best practices
   - Concept: Audit event schema and retention guidance
   - Official source: NIST SP 800-92 Guide to Computer Security Log Management — https://nvlpubs.nist.gov/nistpubs/Legacy/SP/nistspecialpublication800-92.pdf
   - Exact version requirement: 2006 (NIST SP 800-92)
   - Why required: Defines minimal audit fields, retention and tamper-evidence expectations for anti-cheat investigations.
   - What decision it informs: Minimal `AuditEvent` fields, storage/retention, and redaction requirements.
   - What breaks without it: Forensic gaps, non-compliant retention or evidence-poor audit trails.

6) Technology: JSON Schema (AuditEvent payload contract)
   - Concept: Canonical machine-validated schema for `AuditEvent` payloads
   - Official source: https://json-schema.org/
   - Exact version requirement: VERSION UNKNOWN — MUST PIN DRAFT (eg. 2020-12) BEFORE IMPLEMENTATION
   - Why required: Ensures consistent machine-parsable audit events across services and export sinks.
   - What decision it informs: Which fields are mandatory, validation rules, and downstream sink compatibility.
   - What breaks without it: Inconsistent event shapes, failed ingest into audit sinks, alerting gaps.
