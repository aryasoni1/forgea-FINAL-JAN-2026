## FEATURE CONTEXT

- Epic: EPIC-K — LAB UI (HYBRID EDITOR, MONACO, FS ABSTRACTION)
- Feature: K11_UI-Level Security & Anti-Cheat
- Exact input files read:
  - /Users/aryasoni/Desktop/Forgea/docs/agent_orchestrator_output/EPIC-K — LAB UI (HYBRID EDITOR, MONACO, FS ABSTRACTION)/K11_UI-Level Security & Anti-Cheat.md
  - /Users/aryasoni/Desktop/Forgea/docs/master_docs.md
  - /Users/aryasoni/Desktop/Forgea/docs/official-docs-registry.md
  - /Users/aryasoni/Desktop/Forgea/docs/tasks/master_tasks_V1/EPIC-K — LAB UI (HYBRID EDITOR, MONACO, FS ABSTRACTION).md

---

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

---

### EXISTING INTERNAL DOCS (VERIFIED)

- File: `packages/config/src/permissions.ts`
  - Coverage status: PARTIAL
  - Exact gaps: Provides capability helpers (`canUserPerform()`) but lacks enforcement guidance for export/bulk-download endpoints and does not include audit-call placement recommendations.

- File: `packages/schema/src/types.ts`
  - Coverage status: PARTIAL
  - Exact gaps: Declares `Capability` and `AuditEvent` types but no canonical JSON Schema artifact, nor pinned AuditEvent minimal field requirements.

- File: `apps/forgea-labs/middleware.ts`
  - Coverage status: PARTIAL
  - Exact gaps: Only checks session cookie presence at the Edge; explicitly defers RBAC to in-process server components — no authoritative list of server enforcement points.

- File: `docs/code-scout/EPIC-K — LAB UI (HYBRID EDITOR, MONACO, FS ABSTRACTION)/K11_UI-Level Security & Anti-Cheat.md`
  - Coverage status: SUFFICIENT (for code-scout inventory)
  - Exact gaps: The report documents missing server endpoints and telemetry hooks but is not a policy doc or implementation guide.

- Internal gaps discovered: No server-side `downloadAll`/`export` endpoints found; no rate-limiter middleware dedicated to editor/export actions; no audit `emitAuditEvent()` invocations around editor-sensitive actions.

---

### DOCUMENTATION COVERAGE DECISION

⚠️ DOCUMENTATION PARTIAL — EXTENSION REQUIRED

Docs to extend:
- `packages/config/src/permissions.ts`: extend with explicit capability checks for `EXPORT`, `BULK_READ`, and recommended enforcement locations and error codes.
- `packages/schema/src/types.ts` and add canonical `/docs/official-docs/EPIC-B/audit_logging_schema.md` describing pinned JSON Schema for `AuditEvent` and minimal fields.
- Add `/docs/official-docs/EPIC-K/monaco_editor_security.md` to capture client integration invariants and allowed editor APIs.
- Add `/docs/official-docs/EPIC-K/ui_export_api_security.md` capturing export API input validation, canonical response codes, and audit hooks.

---

### STUDY GUIDE FOR HUMAN

1) `monaco-editor` — Why: it's the client editor runtime that exposes copy/export hooks. Alternatives: simple textarea or read-only view (less functionality). When NOT to use: when you need strict client-side copy prevention (use read-only rendered view). Common mistakes: assuming Monaco prevents programmatic copy; not instrumenting server-side exports.

2) Clipboard API — Why: informs what programmatic clipboard reads/writes can occur. Alternatives: rely on user-initiated copy only. When NOT to use: don't depend on clipboard for security decisions. Common mistakes: trying to block clipboard on server-side or assuming uniform browser support.

3) File System Access API / client download semantics — Why: guides UX and permission model for exports. Alternatives: server-side zips/download endpoints (better control). When NOT to use: when export data contains controlled lab artifacts requiring RBAC. Common mistakes: offering bulk-download without server-side RBAC or audit.

4) Rate limiting & 429 semantics — Why: establishes expected client behaviour and retry headers. Alternatives: quota-based counters or token buckets. When NOT to use: avoid aggressive global rate-limits that block legitimate CI/automation flows. Common mistakes: using IP-only limits for authenticated users, forgetting `Retry-After` headers.

5) Audit logging (NIST SP 800-92) — Why: ensures forensic-grade logs. Alternatives: lightweight app logs (insufficient). When NOT to use: never replace audit with ephemeral logs. Common mistakes: missing user/session context, not recording immutable identifiers.

6) JSON Schema for AuditEvent — Why: machine-validated events enable consistent ingestion. Alternatives: ad-hoc event shapes (fragile). When NOT to use: only when legacy sink contracts force a different format. Common mistakes: forgetting required fields (actor, action, target, timestamp, reason).

---

### INTERNAL DOCS TO ADD OR EXTEND

1) Path: `/docs/official-docs/EPIC-K/monaco_editor_security.md`
   - Purpose: Pin supported `monaco-editor` version and list disallowed editor APIs, recommended instrumentation points (copy/export hooks), and telemetry hooks.
   - Exact knowledge to add: pinned `monaco-editor` semver, APIs to instrument, UX guidance when server denies export, example client signal payloads.
   - Required version pin: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION

2) Path: `/docs/official-docs/EPIC-K/ui_export_api_security.md`
   - Purpose: Server-side contract for any export/bulk-download endpoints.
   - Exact knowledge to add: allowed path prefixes, canonicalization rules, directory traversal protections, request/response JSON schemas, HTTP status and machine-friendly error codes, `emitAuditEvent()` placement, and example request/response bodies.
   - Required version pin: N/A (internal) — reference external standards (JSON Schema draft and RFC 6585).

3) Path: `/docs/official-docs/EPIC-I/rate_limiting_and_throttling.md`
   - Purpose: Define throttling thresholds, scopes (per-user, per-IP, per-lab), fallback behaviour, and monitoring metrics.
   - Exact knowledge to add: explicit thresholds (see planner spec), `Retry-After` semantics, and escalation playbook.
   - Required version pin: N/A

4) Path: `/docs/official-docs/EPIC-B/audit_logging_schema.md`
   - Purpose: Canonical JSON Schema for `AuditEvent`, minimal required fields, retention guidance and sink compatibility notes.
   - Exact knowledge to add: pinned JSON Schema draft, example events, required fields (actor, capability, target, timestamp, outcome, reason-code), and redaction policy.
   - Required version pin: JSON Schema draft (e.g., 2020-12) — VERSION UNKNOWN — MUST BE PINNED

---

### OPEN QUESTIONS / AMBIGUITIES

- Where are lab content files authoritatively stored/served from (content-engine or another service)? This determines exact server-side enforcement locations.
- Is there an existing/planned server-side export/download API (name and service)? If yes, which repo/service will host it?
- Please pin `monaco-editor` semver and the JSON Schema draft to use for `AuditEvent` before implementer work begins.

---

### MASTER DOCS REGISTRY ACTION

Append the following entry to `/docs/master_docs.md`:

- Epic / Feature: EPIC-K / K11 — UI-Level Security & Anti-Cheat
  - Doc path: /docs/docs-gatekeeper/EPIC-K — LAB UI (HYBRID EDITOR, MONACO, FS ABSTRACTION)/K11_UI-Level Security & Anti-Cheat.md
  - Status: ADDED (EXTEND)
  - Reason: Docs Gatekeeper brief enumerating required official docs, internal doc gaps, and registry updates for UI-level anti-cheat enforcement points.
  - Date: 2026-02-15
