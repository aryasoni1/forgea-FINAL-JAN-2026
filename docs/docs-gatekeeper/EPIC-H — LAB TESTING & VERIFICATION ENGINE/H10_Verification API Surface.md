### FEATURE CONTEXT

- Epic: EPIC-H — LAB TESTING & VERIFICATION ENGINE
- Feature: H10 — Verification API Surface
- Exact input files read:
  - /docs/agent_orchestrator_output/EPIC-H — LAB TESTING & VERIFICATION ENGINE/H10_Verification API Surface.md
  - /docs/code-scout/EPIC-H — LAB TESTING & VERIFICATION ENGINE/H10_Verification API Surface.md


### REQUIRED OFFICIAL DOCUMENTATION

1) Technology: OpenAPI (OpenAPI 3.1.0)
- Concept: Machine-readable API contract (paths, methods, components, securitySchemes)
- Official source: https://spec.openapis.org/oas/v3.1.0
- Exact version requirement: OpenAPI 3.1.0
- Why required: Single source-of-truth for endpoints, payload schemas, and auth scopes used by implementers and integration-checker.
- What decision it informs: API surface, component reuse, and tool-generation of server/client stubs.
- What breaks without it: Divergent implementations, incompatible payloads, and failed contract tests.

2) Technology: JSON Schema
- Concept: Canonical schemas for normalized verification result payloads and request/response validation
- Official source: https://json-schema.org/specification.html
- Exact version requirement: 2020-12
- Why required: Validation of verification result payloads ingested by H10 and persistence schema compatibility.
- What decision it informs: Field types, required fields, versioning strategy, and schema evolution rules.
- What breaks without it: Ingest/consumption failures and ambiguous field semantics.

3) Technology: RFC 7231 (HTTP Semantics)
- Concept: HTTP methods, status codes, caching and response semantics
- Official source: https://datatracker.ietf.org/doc/html/rfc7231
- Exact version requirement: RFC 7231
- Why required: Defines correct use of HTTP methods, status codes for polling, and error semantics.
- What decision it informs: Which status codes to return for polling, rate-limited responses, and error classes.
- What breaks without it: Misuse of HTTP semantics and inconsistent client retry behavior.

4) Technology: RFC 7807 (Problem Details for HTTP APIs)
- Concept: Standard error payload shape for normalized errors
- Official source: https://datatracker.ietf.org/doc/html/rfc7807
- Exact version requirement: RFC 7807
- Why required: Provides canonical error structure and fields used for redaction rules and client handling.
- What decision it informs: Error normalization and which internal diagnostics may be exposed.
- What breaks without it: Inconsistent error shapes and unsafe leakage of internal diagnostics.

5) Technology: RFC 6750 (Bearer Token Usage)
- Concept: Authorization header bearer token semantics for protected endpoints
- Official source: https://datatracker.ietf.org/doc/html/rfc6750
- Exact version requirement: RFC 6750
- Why required: Authoritative guidance for token format and transport for H10 auth scopes.
- What decision it informs: Authentication header use, token validation expectations, and introspection requirements.
- What breaks without it: Insecure or incompatible auth semantics across clients and services.


### EXISTING INTERNAL DOCS (VERIFIED)

- /docs/agent_orchestrator_output/EPIC-H — LAB TESTING & VERIFICATION ENGINE/H10_Verification API Surface.md — COVERAGE: SUFFICIENT for high-level scope and tasks (orchestrator guidance recommends OpenAPI-lite and single schema), but lacks concrete machine-readable artifacts.
- /docs/code-scout/EPIC-H — LAB TESTING & VERIFICATION ENGINE/H10_Verification API Surface.md — COVERAGE: PARTIAL. Identifies missing machine-readable spec and tests; no template exists.

Exact gaps (if not SUFFICIENT):
- No concrete OpenAPI fragment or OpenAPI-lite template checked into repo.
- No canonical JSON Schema/OpenAPI component for normalized verification result payloads.
- No checklist for Security-Sentinel or Integration-Checker embedded in a spec document.


### DOCUMENTATION COVERAGE DECISION

⚠️ DOCUMENTATION PARTIAL — EXTENSION REQUIRED

Docs to extend or add:
- Create canonical API contract markdown + OpenAPI fragment under `/docs/specs/EPIC-H/`.
- Add JSON Schema for normalized verification result and register it in `/docs/official-docs/` and the master registry.


### STUDY GUIDE FOR HUMAN (required concepts)

- OpenAPI 3.1.0: Why — authoritative machine-readable API contract; Alternatives — custom ad-hoc docs (avoid); When NOT to use — throwaway debug endpoints; Common mistakes — leaving securitySchemes unspecified causing mismatched auth expectations.
- JSON Schema (2020-12): Why — canonical payload validation; Alternatives — inlined TypeScript types (not canonical for cross-language); When NOT to use — tiny ephemeral debug responses; Common mistakes — not pinning `schema_version` and not providing example payloads.
- RFC 7807 Problem Details: Why — consistent error handling and redaction; Alternatives — custom error envelopes (riskier); When NOT to use — simple proxies where errors are pass-through; Common mistakes — including stack traces or internal IDs in `detail`.
- RFC 6750 Bearer Tokens: Why — standardized token transport; Alternatives — API keys in query (avoid); When NOT to use — public unauthenticated endpoints; Common mistakes — accepting tokens in query strings or logs.


### INTERNAL DOCS TO ADD OR EXTEND

Create under `/docs/specs/EPIC-H/` and `/docs/official-docs/EPIC-H/`:

- `H10_api_contract.md` (docs/specs/EPIC-H/H10_api_contract.md)
  - Purpose: Human-readable API contract describing endpoints, methods, auth scopes, rate limits, polling semantics, and error redaction rules.
  - Exact knowledge to add: endpoint list, example requests/responses, auth scope matrix, polling/backoff guidance, and change-control (HARD LOCK) notes.
  - Required version pin: OpenAPI 3.1.0, JSON Schema 2020-12.

- `H10_openapi_fragment.yaml` (docs/specs/EPIC-H/H10_openapi_fragment.yaml)
  - Purpose: Machine-readable OpenAPI fragment containing `paths`, `components/schemas` for `VerificationResult`, `ProblemDetails` error, and `securitySchemes` for bearer tokens.
  - Exact knowledge to add: `VerificationResult` component, `VerificationCreate` intake shape, `VerificationGet` retrieval shape, and auth scopes mapping.
  - Required version pin: OpenAPI 3.1.0.

- `H10_verification_result_schema.json` (docs/official-docs/EPIC-H/H10_verification_result_schema.json)
  - Purpose: Canonical JSON Schema (2020-12) for persisted verification results; used by implementers and integration tests.
  - Exact knowledge to add: required fields (ids, timestamps, status enum, runner metadata, artifact digests), examples, and `schema_version` strategy.
  - Required version pin: JSON Schema 2020-12.

- `H10_security_and_rate_limit_checklist.md` (docs/official-docs/EPIC-H/H10_security_and_rate_limit_checklist.md)
  - Purpose: Short checklist for Security-Sentinel (auth scopes, rate-limiting, info-hiding) and Integration-Checker (header usage, idempotency, polling semantics).
  - Exact knowledge to add: required observable signals, safe redaction rules, recommended rate-limit headers (`Retry-After`, `X-RateLimit-*`), and acceptable client behaviors.
  - Required version pin: RFC 7231, RFC 7807, RFC 6750.


### OPEN QUESTIONS / AMBIGUITIES

- Should verification results support webhooks for push notifications (preferred) or only polling? Or both (webhooks recommended with backoff fallback).
- Exact auth model: will H10 accept internal bearer tokens, OAuth2 client credentials, or both? Need to pin accepted token types.
- Rate-limit budget: what client-level limits (requests/minute) are acceptable for first release? This must be decided by Ops/Infra.


### MASTER DOCS REGISTRY ACTION

Append the following entry to `/docs/master_docs.md`:

- Epic / Feature: EPIC-H / H10 — Verification API Surface
- Doc path: /docs/docs-gatekeeper/EPIC-H — LAB TESTING & VERIFICATION ENGINE/H10_Verification API Surface.md
- Status: ADDED (EXTEND)
- Reason: Planner-Architect deliverable — formal API contract and machine-readable OpenAPI fragment required before implementer work.
