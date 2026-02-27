# FEATURE DOCS BRIEF — G3: Repo → Session Binding

## FEATURE CONTEXT

- Epic: EPIC-G — PUSH FLOW & SNAPSHOT PREVIEW
- Feature: G3 — Repo → Session Binding
- Exact input files read:
  - /Users/aryasoni/Desktop/Forgea/docs/agent*orchestrator_output/EPIC-G — PUSH FLOW & SNAPSHOT PREVIEW/G3_Repo*→_Session_Binding.md

## REQUIRED OFFICIAL DOCUMENTATION

1. Technology: GitHub Webhooks
   - Concept: Webhook delivery semantics, payload shape, provider `repository.id` and signature verification
   - Official source: https://docs.github.com/en/developers/webhooks-and-events/webhooks/about-webhooks
   - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
   - Why required: Determines canonical webhook identifiers (provider repo id) and retry/dedup semantics used by binding and audit flow.
   - Decision it informs: Primary lookup key choice (provider repo id vs URL), signature verification, replay handling.
   - What breaks without it: Webhook resolution may be non-deterministic; deduplication and security assumptions could be wrong.

2. Technology: GitHub Repositories API
   - Concept: Repository identity, `id` stability, fork semantics, transfer behavior
   - Official source: https://docs.github.com/en/rest/reference/repos
   - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
   - Why required: Confirms that `repository.id` is stable across forks/transfers and documents lookup fields implementers rely on.
   - Decision it informs: Whether `providerRepoId` is authoritative and how to canonicalize repo URLs.
   - What breaks without it: Mapping logic may mis-handle transfers/forks and create incorrect session bindings.

3. Technology: HTTP Caching (RFC 7234)
   - Concept: Cache-control semantics and TTL guidance for repository→session mapping caches
   - Official source: https://datatracker.ietf.org/doc/html/rfc7234
   - Exact version requirement: RFC 7234
   - Why required: Provides authoritative TTL semantics for caching mappings and safe expiry strategies.
   - Decision it informs: TTL values, cache invalidation policies, and freshness guarantees for mappings.
   - What breaks without it: Incorrect TTL choices leading to stale or inconsistent mappings.

4. Technology: HTTP Semantics (RFC 7231) — Idempotency & Retry Patterns
   - Concept: Status codes, idempotency guidance, retry classification
   - Official source: https://datatracker.ietf.org/doc/html/rfc7231
   - Exact version requirement: RFC 7231
   - Why required: Guides retry/backoff and idempotency behavior for webhook/event processing and mapping retries.
   - Decision it informs: Failure classification and retry policy for mapping operations.
   - What breaks without it: Improper retry behavior causing duplicate actions or lost bindings.

5. Technology: PostgreSQL Advisory Locks (or equivalent DB locking primitives)
   - Concept: Advisory locks and transactional locking patterns for atomic rejection/acceptance of session bindings
   - Official source: https://www.postgresql.org/docs/current/functions-admin.html#FUNCTIONS-ADVISORY-LOCKS
   - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
   - Why required: Defines safe locking primitives and semantics for coordinating concurrent mapping updates.
   - Decision it informs: Choice of lock primitive (advisory lock vs row-level transactional approaches) for race-condition invariants.
   - What breaks without it: Race conditions during binding accept/reject leading to multiple sessions bound to the same repo or lost rejections.

## EXISTING INTERNAL DOCS (VERIFIED)

- /Users/aryasoni/Desktop/Forgea/docs/agent*orchestrator_output/EPIC-G — PUSH FLOW & SNAPSHOT PREVIEW/G3_Repo*→_Session_Binding.md
  - Coverage status: PARTIAL
  - Exact gaps: Contains high-level analysis and required agents but does not contain the planner-produced binding rules/spec (lookup algorithm, tie-breakers, rejection fields), nor explicit TTL or locking guidance.

- /Users/aryasoni/Desktop/Forgea/docs/tasks/master_tasks_V1/EPIC-G— PUSH FLOW & SNAPSHOT PREVIEW.md
  - Coverage status: PARTIAL
  - Exact gaps: Epic and feature tasks listed (including auditing), but missing exact binding specification, required DB schema names/fields, and migration/backfill checklist.

- /Users/aryasoni/Desktop/Forgea/packages/schema/prisma/schema.prisma
  - Coverage status: PARTIAL
  - Exact gaps: `Lab.baseRepoUrl` and `LabSession.userForkUrl` exist but canonical models `GitHubAccount`, `GitHubRepoMapping`, and `LabVersion` are not present.

## DOCUMENTATION COVERAGE DECISION

⚠️ DOCUMENTATION PARTIAL — EXTENSION REQUIRED

Documents to extend:

- The Agent Orchestrator feature brief (add exact binding algorithm and audit fields).
- A new internal canonical spec under `/docs/official-docs/EPIC-G/repo-session-binding-spec.md` (see list below).
- `/docs/official-docs/EPIC-B/github-repo-mapping-model.md` to publish canonical schema fields and migrations.

## STUDY GUIDE FOR HUMAN

- `GitHub Webhooks`: Why — authoritative webhook payloads and delivery semantics; Alternatives — provider-specific webhooks (GitLab/Bitbucket) if using other providers; When NOT to use — avoid relying solely on URL string-match; Common mistakes — trusting user-supplied URLs, ignoring `repository.id` stability.
- `GitHub Repos API`: Why — authoritative mapping of repo id and fork behavior; Alternatives — maintaining only URL-based mappings (brittle); When NOT to use — only for providers that don't expose stable repo IDs; Common mistakes — assuming repo URL never changes or is unique across forks.
- `HTTP Caching (RFC7234)`: Why — TTLs for mapping caches; Alternatives — no cache (higher DB load) or long-lived caches with explicit invalidation; When NOT to use — when mapping must be immediately consistent; Common mistakes — choosing too-long TTLs without invalidation.
- `Postgres Advisory Locks`: Why — coordination primitive for atomic binding changes; Alternatives — row-level transactions with `SELECT FOR UPDATE` or an external distributed lock service; When NOT to use — if DB engine differs or if locks would cause unacceptable latency; Common mistakes — holding locks across network calls or failing to release on error.

## INTERNAL DOCS TO ADD OR EXTEND

1. Path: /docs/official-docs/EPIC-G/repo-session-binding-spec.md
   - Purpose: Planner-produced binding rules and lookup algorithm (primary/secondary keys, tie-breakers), rejection conditions, exact audit event fields.
   - Exact knowledge to add: Canonical lookup algorithm, deterministic tie-breaker logic, rejection HTTP response codes, audit event JSON schema, example flows.
   - Required version pin: N/A (internal), but reference versions for GitHub docs must be pinned.

2. Path: /docs/official-docs/EPIC-B/github-repo-mapping-model.md
   - Purpose: Canonical DB model for `GitHubAccount`, `GitHubRepoMapping`, `LabVersion` and migration/backfill checklist.
   - Exact knowledge to add: Model names, minimal fields (providerRepoId, provider, ownerId, repoFullName, canonicalBaseRepoUrl, firstSeenAt, lastSeenAt, ttlSeconds), backfill safety checklist and sampling queries.
   - Required version pin: N/A (internal); reference DB engine version for advisory lock guidance.

3. Path: /docs/official-docs/EPIC-G/webhook-to-session-mapping.md
   - Purpose: Implementation guidance for webhook handler changes — prefer `providerRepoId` lookup, fallback rules, idempotency keys, and DLQ policy.
   - Exact knowledge to add: Example webhook handler pseudocode, idempotency key format, DLQ handling policy, replay handling.
   - Required version pin: N/A (internal); include pinned GitHub webhook doc versions.

## OPEN QUESTIONS / AMBIGUITIES (BLOCKERS)

- Which provider versions must be pinned for GitHub Webhooks and Repos API? (GitHub API is evolving; specific date/version required.)
- Is `repository.id` guaranteed stable across fork/transfer events we must support? Planner must confirm expected semantics from GitHub docs.
- Acceptable TTL ranges for repo→session caches (low-latency vs freshness tradeoffs) — Ops/Planner to decide.
- Locking primitive selection: advisory locks vs row-level transactional approach — must pick a single strategy and document it.
- Migration windows and backfill safety checks for moving from URL-string matching to providerRepoId-based lookups.

## MASTER DOCS REGISTRY ACTION

Append the following entry to `/docs/master_docs.md`:

- Date: 2026-02-14
  - Epic / Feature: EPIC-G / G3 — Repo → Session Binding
  - Doc path: /docs/docs-gatekeeper/EPIC-G — PUSH FLOW & SNAPSHOT PREVIEW/G3*Repo*→_Session_Binding.md
  - Status: ADDED (EXTEND)
  - Reason: Planner brief required to define repo→session binding algorithm, audit schema, and migration/backfill checklist.

---

End of brief.
