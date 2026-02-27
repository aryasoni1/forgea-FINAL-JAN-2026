## FEATURE CONTEXT

- Epic: EPIC-K — LAB UI (HYBRID EDITOR, MONACO, FS ABSTRACTION)
- Feature: K5_Edit Permission Enforcement
- Exact input files read:
  - /Users/aryasoni/Desktop/Forgea/docs/agent_orchestrator_output/EPIC-K — LAB UI (HYBRID EDITOR, MONACO, FS ABSTRACTION)/K5_Edit Permission Enforcement.md
  - /Users/aryasoni/Desktop/Forgea/docs/code-scout/EPIC-K — LAB UI (HYBRID EDITOR, MONACO, FS ABSTRACTION)/K5_Edit Permission Enforcement.md
  - /Users/aryasoni/Desktop/Forgea/forgea-monorepo/packages/config/src/permissions.ts
  - /Users/aryasoni/Desktop/Forgea/forgea-monorepo/packages/schema/src/types.ts
  - /Users/aryasoni/Desktop/Forgea/apps/forgea-labs/middleware.ts
  - /Users/aryasoni/Desktop/Forgea/docs/master_docs.md
  - /Users/aryasoni/Desktop/Forgea/docs/official-docs-registry.md

## REQUIRED OFFICIAL DOCUMENTATION

For safe, auditable editor permission enforcement the following external docs are required.

- Technology: OpenID Connect Core
  - Concept: Session claims, ID token validation, session lifetimes
  - Official source: https://openid.net/specs/openid-connect-core-1_0.html
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: Defines canonical session claim semantics consumed by `parseSessionUser()` and session validation in server APIs.
  - Decision informed: Which session claims are authoritative for RBAC and session lifetime checks.
  - Breaks without it: Inconsistent claim handling across services causing auth bypass or denial.

- Technology: OWASP Path Traversal guidance
  - Concept: Path canonicalization, traversal prevention, encoded-path bypasses
  - Official source: https://cheatsheetseries.owasp.org/cheatsheets/Path_Traversal_Cheat_Sheet.html
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: Establishes canonicalization and normalization rules for editor file path validation.
  - Decision informed: Allowed path prefixes, normalization, and rejection criteria for traversal attempts.
  - Breaks without it: Directory-traversal vulnerabilities allowing unauthorized file access.

- Technology: Unicode Normalization (UAX#15)
  - Concept: NFC normalization to avoid canonical-equivalence collisions
  - Official source: https://www.unicode.org/reports/tr15/
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: Prevents attacker-controlled filename collisions via unicode variants.
  - Decision informed: Normalization applied before path canonicalization and glob matching.
  - Breaks without it: Confusing duplicates, bypasses of locked-paths, audit ambiguity.

- Technology: WHATWG URL Standard / RFC 3986
  - Concept: URL parsing and percent-encoding rules for path segments
  - Official source: https://url.spec.whatwg.org/ and https://datatracker.ietf.org/doc/html/rfc3986
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: Ensures server and client canonicalization of `path` and `:lessonId` segments match.
  - Decision informed: Percent-encoding handling, allowed characters, canonical path form.
  - Breaks without it: Mismatched parsing allowing bypass via alternate encodings.

- Technology: Locked-Paths Manifest / Glob semantics
  - Concept: Canonical locked-path glob semantics used to enforce write restrictions
  - Official source: (pick and pin: minimatch / pathspec / gitignore semantics) — VERSION UNKNOWN
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: Specifies how lockedGlobs are matched against normalized canonical paths.
  - Decision informed: Which implementations and flags to use for glob matching and precedence.
  - Breaks without it: Inconsistent enforcement across services and editors.

## EXISTING INTERNAL DOCS (VERIFIED)

- /docs/code-scout/EPIC-K — LAB UI (HYBRID EDITOR, MONACO, FS ABSTRACTION)/K5_Edit Permission Enforcement.md
  - Coverage status: PARTIAL
  - Exact gaps: Inventory-only; does not define exact server-side locations for checks, HTTP responses, audit schema, or error codes.

- /Users/aryasoni/Desktop/Forgea/forgea-monorepo/packages/config/src/permissions.ts
  - Coverage status: PARTIAL (implementation artifact)
  - Exact gaps: Provides `parseSessionUser()`, `canUserPerform()`, `ROUTE_RULES`, and `emitAuditEvent()` but lacks an integration contract documenting where and how to call these functions for editor open/save/path checks.

- /Users/aryasoni/Desktop/Forgea/forgea-monorepo/packages/schema/src/types.ts
  - Coverage status: SUFFICIENT (types present)
  - Exact gaps: Types exist but no doc prescribing required audit fields or machine error codes for K5.

- /Users/aryasoni/Desktop/Forgea/apps/forgea-labs/middleware.ts
  - Coverage status: PARTIAL
  - Exact gaps: Explicitly documents cookie-presence gating only; explicitly defers RBAC to server-side components — but lacks guidance or examples for server components to follow.

- .github/copilot-instructions.md
  - Coverage status: PARTIAL
  - Exact gaps: Points to `permissions.ts` but does not specify exact enforcement points, error shapes, or audit contract for editor actions.

- Planner task doc: /docs/tasks/task-K5-<YYYY-MM-DD>.md
  - Coverage status: INSUFFICIENT / MISSING
  - Exact gaps: Not present; orchestrator requested planner-architect to author this file with exact checks and messages.

## DOCUMENTATION COVERAGE DECISION

⚠️ DOCUMENTATION PARTIAL — EXTENSION REQUIRED

Docs to extend or add (minimum):
- Extend: `/docs/official-docs/EPIC-K/editor_permission_enforcement.md` — add exact enforcement points, HTTP responses, audit payload, and canonical path rules.
- Add: `/docs/tasks/task-K5-<YYYY-MM-DD>.md` — planner-architect task doc enumerating exact server-side locations, capability checks, input validation, error codes/messages, and acceptance criteria (per orchestrator instructions).

## STUDY GUIDE FOR HUMAN (CONCISE)

- OpenID Connect Core: Why — canonicalizes session claims; Alternatives — proprietary session tokens (avoid); When NOT to use — only internal short-lived cookies; Common mistakes — assuming all claims are present without validation.
- OWASP Path Traversal: Why — prevents directory traversal; Alternatives — ad-hoc string checks (bad); When NOT to use — N/A; Common mistakes — normalizing only once or failing to percent-decode before checks.
- Unicode Normalization (NFC): Why — prevents filename collisions; Alternatives — reject non-ASCII (bad UX); When NOT to use — legacy byte-level comparisons; Common mistakes — normalizing after glob matching.
- WHATWG / RFC 3986: Why — ensures encoding parity between client and server; Alternatives — custom parsing (unsafe); Common mistakes — trusting browser path canonicalization without server-side normalization.
- Locked-Paths Glob semantics: Why — consistent locked-path enforcement; Alternatives — ad-hoc prefix checks (error-prone); Common mistakes — using different glob implementations between enforcement and generation.

## INTERNAL DOCS TO ADD OR EXTEND

- Path: /docs/official-docs/EPIC-K/editor_permission_enforcement.md
  - Purpose: Canonical enforcement contract for K5 — exact server locations, capability checks, path canonicalization rules, HTTP response shapes, machine error codes, and audit payload schema.
  - Exact knowledge to add: For each enforcement point (on-open, on-save, path validation, step-scoped access) include: exact server-side file or route to run check, `Capability` enum values to evaluate with `canUserPerform()`, input canonicalization steps, failure-mode responses (status, body, telemetry keys), and `emitAuditEvent()` invocation details.
  - Required version pin: OpenID Connect Core (pin), OWASP Path Traversal guidance (pin), WHATWG URL/RFC3986 (pin), Unicode UAX#15 (pin), Locked-Paths glob implementation (pin).

- Path: /docs/tasks/task-K5-<YYYY-MM-DD>.md (planner-architect)
  - Purpose: A planner-facing task doc that precisely defines checks and messages for implementers (per orchestrator). Do NOT include code — only checks, messages, and acceptance criteria.
  - Exact knowledge to add: Enumerate server-side locations, capability sets, input validation rules, exact HTTP response payloads and error strings, audit trigger points and minimal payload fields.
  - Required version pin: Same as above.

## OPEN QUESTIONS / AMBIGUITIES (BLOCKERS)

- Are the editor open/save APIs implemented in another repository/service? If yes, that repo must be scanned before implementation.
- Which environment variables control audit sink and must be present in staging/prod (e.g., `FORGEA_AUDIT_SINK_URL`)? Confirm presence and required staging/prod requirement.
- Are step boundaries represented in a canonical manifest (`.forgea/steps.json`)? If not, canonical step semantics must be defined before step-scoped enforcement.
- Confirm whether to place checks in server components (React Server Components) or API routes — both acceptable but planner task must list trade-offs.

## MASTER DOCS REGISTRY ACTION

Append the following entry to `/docs/master_docs.md`:

- Epic / Feature: EPIC-K / K5 — Edit Permission Enforcement
  - Doc path: /docs/docs-gatekeeper/EPIC-K — LAB UI (HYBRID EDITOR, MONACO, FS ABSTRACTION)/K5_Edit Permission Enforcement.md
  - Status: ADDED (EXTEND)
  - Reason: Docs Gatekeeper brief identifying required official docs, internal doc gaps, and registry updates for editor permission enforcement.
  - Date: 2026-02-14

## FINAL NOTES

This brief intentionally avoids implementation instructions. The planner-architect must author `/docs/tasks/task-K5-<YYYY-MM-DD>.md` per the orchestrator's exact checklist before implementer work begins.
# FEATURE DOCS BRIEF — K5_Edit Permission Enforcement

## FEATURE CONTEXT

- Epic: EPIC-K — LAB UI (HYBRID EDITOR, MONACO, FS ABSTRACTION)
- Feature: K5_Edit Permission Enforcement
- Exact input files read:
  - /Users/aryasoni/Desktop/Forgea/docs/agent_orchestrator_output/EPIC-K — LAB UI (HYBRID EDITOR, MONACO, FS ABSTRACTION)/K5_Edit Permission Enforcement.md
  - /Users/aryasoni/Desktop/Forgea/docs/master_docs.md
  - /Users/aryasoni/Desktop/Forgea/docs/official-docs-registry.md

Source: Agent Orchestrator output (above) and repository inspection described in that orchestrator output.

---

## REQUIRED OFFICIAL DOCUMENTATION

For safe, auditable implementation the following external specifications MUST be pinned before implementation.

- Technology: OpenID Connect Core
  - Concept: session/ID token claims and session validation semantics
  - Official source: https://openid.net/specs/openid-connect-core-1_0.html
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: Defines canonical session claim names and validation flows used when parsing and validating session claims server-side.
  - Decision it informs: Which session claims are authoritative for `parseSessionUser()` and acceptable token lifetimes/refresh behavior.
  - What breaks without it: Incorrect claim assumptions can enable privilege escalation or session forgery.

- Technology: HTTP semantics (status codes & idempotency)
  - Concept: error classification (401 vs 403), idempotency and retry semantics
  - Official source: https://datatracker.ietf.org/doc/html/rfc7231
  - Exact version requirement: RFC 7231
  - Why required: Ensures consistent use of status codes and retry guidance for client UI and automated telemetry.
  - Decision it informs: When to return 401 vs 403 and how clients should treat transient vs permanent failures.
  - What breaks without it: Ambiguous client UX and incorrect retry logic leading to policy bypass attempts.

- Technology: Path canonicalization & traversal guidance (OWASP)
  - Concept: directory traversal prevention, canonicalization rules
  - Official source: https://cheatsheetseries.owasp.org/cheatsheets/Path_Traversal_Cheat_Sheet.html
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: Defines safe canonicalization and normalization steps to prevent `../` or encoded traversal bypasses.
  - Decision it informs: Allowed path prefixes, canonicalization order, and validation steps for editor open/save APIs.
  - What breaks without it: Path-traversal vulnerabilities exposing unintended files or directories.

---

## EXISTING INTERNAL DOCS (VERIFIED)

- /forgea-monorepo/packages/config/src/permissions.ts
  - Coverage status: PARTIAL
  - Exact gaps: Provides RBAC primitives and helpers (`parseSessionUser()`, `canUserPerform()`) but lacks editor-specific enforcement examples and wiring guidance for open/save/patch APIs.

- /forgea-monorepo/packages/schema/src/types.ts
  - Coverage status: SUFFICIENT
  - Exact gaps: None for type shapes — defines `Capability`, `SessionUser`, and `AuditEvent` used by enforcement logic.

- /forgea-monorepo/apps/forgea-labs/middleware.ts
  - Coverage status: PARTIAL
  - Exact gaps: Explicitly documents that it only verifies cookie presence. It must not be relied on for capability decisions; no guidance for server-side enforcement placement or examples.

- .github/copilot-instructions.md
  - Coverage status: PARTIAL
  - Exact gaps: Points to use `parseSessionUser()` and `canUserPerform()` but does not list exact enforcement points, HTTP responses, or audit invocation patterns for editor operations.

- Observed missing artifacts (not present):
  - Any server-side API handlers that enforce edit/open/save permission checks for the lab editor.
  - Any audit-hook usage (`emitAuditEvent`) around editor decisions.
  - Tests or task-level docs specifying exact denial responses, codes, and UI-visible messages.

---

## DOCUMENTATION COVERAGE DECISION

⚠️ DOCUMENTATION PARTIAL — EXTENSION REQUIRED

Docs to extend and why:
- `/forgea-monorepo/packages/config/src/permissions.ts` — Add a usage guide section with concrete server-side examples (API route and server component) for editor open/save/path validation and sample audit payloads.
- `/docs/official-docs/EPIC-K/` (new) — Add `K5_Edit_Permission_Enforcement.md` containing exact checks, HTTP responses, error codes, and audit contract for implementers.
- `.github/copilot-instructions.md` — Extend with exact permitted server-side checks and example error payloads.

---

## STUDY GUIDE FOR HUMAN (required concepts)

- OpenID Connect Core: Why: canonical claim validation and session exchange. Alternatives: custom token formats (not recommended). When NOT to use: short-lived ephemeral UI-only cookies where no identity claims needed. Common mistakes: assuming non-standard claims or skipping signature verification.

- HTTP / RFC 7231: Why: authoritative classification of status codes and retry semantics. Alternatives: none — use RFC guidance. Common mistakes: returning 200 with error payload; using 401 vs 403 incorrectly.

- OWASP Path Traversal guidance: Why: concrete normalization and canonicalization order. Alternatives: strict allowlist of canonicalized relative paths. Common mistakes: percent-decoding before validation; trusting client-provided canonical forms.

---

## INTERNAL DOCS TO ADD OR EXTEND

Include these under `/docs/official-docs/EPIC-K/`.

- Path: /docs/official-docs/EPIC-K/K5_Edit_Permission_Enforcement.md
  - Purpose: Planner-facing enforcement task doc with exact server-side enforcement points, capability sets, input validation rules, HTTP responses, audit contract, and acceptance criteria.
  - Exact knowledge to add: For each enforcement point (on open, on save, path validation, step-scoped access) include: server file/route options, `Capability` enums to evaluate via `canUserPerform()`, allowed path prefixes, canonicalization steps, exact HTTP status codes and JSON response shape (including machine error codes), `emitAuditEvent()` triggers and required fields, and clear acceptance criteria and sample request/response examples.
  - Required version pin: Reference pinned OpenID Connect and OWASP docs listed above.

---

## OPEN QUESTIONS / AMBIGUITIES (BLOCKERS)

- Are editor open/save APIs implemented outside this repository (external service or private package)? If yes, provide repo/service path to scan; without this, we cannot confirm enforcement locations.
- Is there an existing audit sink environment variable (e.g., `FORGEA_AUDIT_SINK_URL`) guaranteed present in staging/prod? Or must that be added to the required environment variables for enforcement?

---

## MASTER DOCS REGISTRY ACTION

Append the following entry to `/docs/master_docs.md`:

- Epic / Feature: EPIC-K / K5 — Edit Permission Enforcement
  - Doc path: /docs/docs-gatekeeper/EPIC-K — LAB UI (HYBRID EDITOR, MONACO, FS ABSTRACTION)/K5_Edit Permission Enforcement.md
  - Status: ADDED (EXTEND)
  - Reason: Docs Gatekeeper brief enumerating required official docs, internal doc gaps, and registry updates for K5 enforcement.

---

## DELIVERABLES (for planner-architect)

- The new planner task doc `/docs/tasks/task-K5-<YYYY-MM-DD>.md` must include the exact items enumerated in the agent's handoff (enforcement points, capability checks, input validation, exact HTTP responses, audit invocation rules, step-scoped semantics, failure-mode behaviors, error codes/messages, sample request/response bodies, and required env/config flags). This brief identifies the documentation gaps and required external specs.

---

## MINIMAL ACCEPTANCE CRITERIA (documentation-level)

- Implementer can implement enforcement without additional clarifications if the planner task doc references these internal files and the pinned external specs.
- All denial paths specify exact HTTP status, a machine error code string, and a human-visible message.

---

END OF BRIEF
