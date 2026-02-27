FEATURE CONTEXT

- Epic: EPIC-G — PUSH FLOW & SNAPSHOT PREVIEW
- Feature: G2 — Push Event Normalization
- Exact input files read:
  - /Users/aryasoni/Desktop/Forgea/docs/agent_orchestrator_output/EPIC-G — PUSH FLOW & SNAPSHOT PREVIEW/G2_Push_Event_Normalization.md
  - /Users/aryasoni/Desktop/Forgea/docs/code-scout/EPIC-G — PUSH FLOW & SNAPSHOT PREVIEW/G2_Push_Event_Normalization.md
  - /Users/aryasoni/Desktop/Forgea/docs/master_docs.md
  - /Users/aryasoni/Desktop/Forgea/docs/official-docs-registry.md

REQUIRED OFFICIAL DOCUMENTATION

For each required concept below, the official source and version pin (or note) is listed.

- Technology: GitHub Webhooks
  - Concept: Webhook delivery semantics, headers, HMAC signature verification
  - Official source: https://docs.github.com/en/developers/webhooks-and-events/webhooks/about-webhooks
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: Informs canonical idempotency header (`X-GitHub-Delivery`) and HMAC verification semantics.
  - Decision informed: Canonical primary idempotency key and verification preconditions.
  - What breaks without it: Incompatible signature checks, loss of canonical delivery-id semantics.

- Technology: JSON Schema
  - Concept: Formal machine-readable schema for normalized push events
  - Official source: https://json-schema.org/specification.html
  - Exact version requirement: 2020-12 (recommended) OR: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: Provides implementers a machine-validated contract for normalized payload shape.
  - Decision informed: Field names, types, and required/optional semantics for normalization.
  - What breaks without it: Divergent normalization implementations and test incompatibilities.

- Technology: HTTP Semantics & Idempotency Patterns
  - Concept: HTTP status expectations, retry semantics, idempotency guidance
  - Official source: https://datatracker.ietf.org/doc/html/rfc7231
  - Exact version requirement: RFC 7231 (as referenced)
  - Why required: Defines expected status codes for retries vs permanent failures.
  - Decision informed: Whether to return 200 on repeated deliveries, or 5xx to trigger retries.
  - What breaks without it: Incorrect retry behavior and duplicate processing.

EXISTING INTERNAL DOCS (VERIFIED)

- /Users/aryasoni/Desktop/Forgea/docs/docs-gatekeeper/EPIC-F — GITHUB INTEGRATION FOR LABS/F7_Webhook_Handling.md
  - Coverage status: PARTIAL
  - Exact gaps: No canonical normalized schema; does recommend storing `X-GitHub-Delivery` but lacks TTL and centralized dedup policy.

- /Users/aryasoni/Desktop/Forgea/docs/docs-gatekeeper/EPIC-F — GITHUB INTEGRATION FOR LABS/F8*Push_Tracking*&\_Audit.md
  - Coverage status: PARTIAL
  - Exact gaps: Audit guidance exists but no single deduplication spec or required retention TTL for delivery IDs.

- /Users/aryasoni/Desktop/Forgea/docs/docs-gatekeeper/EPIC-F — GITHUB INTEGRATION FOR LABS/F9_Forbidden_Change_Detection.md
  - Coverage status: PARTIAL
  - Exact gaps: Mentions minimalized `push_event` fields but not a full normalized contract.

DOCUMENTATION COVERAGE DECISION

❌ DOCUMENTATION MISSING — NEW DOCS REQUIRED

List of required new docs (minimum):

- /docs/schemas/normalized_push_event.schema.json — REQUIRED
  - Purpose: Machine-readable JSON Schema for normalized push event payloads (canonical names, types, required fields, examples).
  - Required version pin: JSON Schema version to be used (e.g., 2020-12) — MUST BE PINNED BEFORE IMPLEMENTATION.

- /docs/official-docs/EPIC-G/G2_Deduplication_and_Idempotency_Policy.md — REQUIRED
  - Purpose: Canonical deduplication rules (primary idempotency key(s), fallbacks, TTLs, expected duplicate handling behaviour).
  - Exact knowledge to add: primary key = `X-GitHub-Delivery`, fallback derivation rules, TTL policy (recommended values), duplicate response policy.
  - Required version pin: N/A (policy doc) — reference to GitHub Webhooks version must be pinned.

- /docs/official-docs/EPIC-G/G2_Idempotency_Preconditions_Spec.md — REQUIRED
  - Purpose: Preconditions for safely accepting deliveries (required headers, signature verification steps, raw-body availability, logging requirements).
  - Exact knowledge to add: header list, HMAC verification expectation, fallback key derivation algorithm, storage requirements for raw body or canonical digest.
  - Required version pin: GitHub Webhooks version; HTTP semantics (RFC 7231).

STUDY GUIDE FOR HUMAN (each concept — concise)

- GitHub Webhooks:
  - Why this exists: Provides consistent delivery semantics and signature verification for provider-origin events.
  - Alternatives: Provider-specific event hooks or polling; use only if webhook unsupported.
  - When NOT to use: When webhook security cannot be validated (missing shared secret).
  - Common mistakes: Not verifying `X-Hub-Signature-256`, not persisting `X-GitHub-Delivery`, or using non-atomic dedup stores.

- Normalized JSON Schema:
  - Why this exists: Machine validation for implementers and CI tests.
  - Alternatives: Informal docs + examples (fragile, leads to drift).
  - When NOT to use: Only for prototypes; production must use a pinned schema.
  - Common mistakes: Overly permissive optional fields, changing required fields without version bump.

- Deduplication & Idempotency policy:
  - Why this exists: Prevent duplicate processing and define operator-visible retention/TTL.
  - Alternatives: Best-effort dedup via commit hashing (weaker guarantees).
  - When NOT to use: Rare; only if system accepts duplicate processing as idempotent by design.
  - Common mistakes: Missing durable persistence for delivery IDs and edge cases where delivery IDs rotate.

INTERNAL DOCS TO ADD OR EXTEND

Only include these if coverage is PARTIAL or MISSING (it is).

- Path: /docs/schemas/normalized_push_event.schema.json
  - Purpose: Provide the formal schema artifact (JSON Schema file) used by CI and implementers.
  - Exact knowledge to add: canonical field names, types, descriptions, examples for push events, version field for schema.
  - Required version pin: JSON Schema spec (2020-12 recommended).

- Path: /docs/official-docs/EPIC-G/G2_Deduplication_and_Idempotency_Policy.md
  - Purpose: Site-wide policy that implementers must follow.
  - Exact knowledge to add: idempotency key precedence, fallback algorithms, TTLs, expected idempotent responses.
  - Required version pin: Reference pinned GitHub Webhooks doc.

- Path: /docs/official-docs/EPIC-G/G2_Idempotency_Preconditions_Spec.md
  - Purpose: Enumerate preconditions and verification steps that must be satisfied before enqueuing or processing deliveries.
  - Exact knowledge to add: required headers, HMAC verification algorithm reference, raw body retention rules, logging and audit requirements.
  - Required version pin: Reference pinned GitHub Webhooks doc and RFC 7231.

OPEN QUESTIONS / AMBIGUITIES

- External docs version pins are missing (GitHub Webhooks, JSON Schema). These MUST be pinned before implementation.
- TTL recommended value for delivery IDs is not decided; need policy-level decision (e.g., 7 days vs 30 days) based on replay windows and storage constraints.

MASTER DOCS REGISTRY ACTION

Append the following entry to `/docs/master_docs.md`:

- Date: 2026-02-14
  - Epic / Feature: EPIC-G / G2 — Push Event Normalization
  - Doc path: /docs/docs-gatekeeper/EPIC-G — PUSH FLOW & SNAPSHOT PREVIEW/G2_Push_Event_Normalization.md
  - Status: ADDED (MISSING OFFICIAL DOCS)
  - Reason: Feature requires normalized JSON Schema and canonical dedup/idempotency policy; registry updated by Docs Gatekeeper.
