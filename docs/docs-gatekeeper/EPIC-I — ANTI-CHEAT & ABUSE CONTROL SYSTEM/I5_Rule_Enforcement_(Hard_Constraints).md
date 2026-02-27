## FEATURE CONTEXT

- Epic: EPIC-I — ANTI-CHEAT & ABUSE CONTROL SYSTEM
- Feature: I5 — Rule Enforcement (Hard Constraints)
- Exact input files read:
  - /Users/aryasoni/Desktop/Forgea/docs/agent*orchestrator_output/EPIC-I — ANTI-CHEAT & ABUSE CONTROL SYSTEM/I5_Rule_Enforcement*(Hard_Constraints).md
  - /Users/aryasoni/Desktop/Forgea/docs/code-scout/EPIC-I — ANTI-CHEAT & ABUSE CONTROL SYSTEM/I5*Rule_Enforcement*(Hard_Constraints).md
  - /Users/aryasoni/Desktop/Forgea/docs/master_docs.md
  - /Users/aryasoni/Desktop/Forgea/docs/official-docs-registry.md

### REQUIRED OFFICIAL DOCUMENTATION

1. Technology: PostgreSQL — Concept: DDL & transaction semantics

- Official source: https://www.postgresql.org/docs/
- Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- Why required: Informs unique constraints, foreign keys, transactional isolation, `CREATE INDEX CONCURRENTLY`, advisory locks, and safe migration patterns required to enforce DB-level invariants.
- Decision it informs: Whether hard constraints are expressible and enforceable at the storage layer, safe concurrent DDL recipes, and lock strategies.
- What breaks without it: Race conditions, lost uniqueness, unrecoverable migrations, and enforcement that can be bypassed by concurrent writes.

2. Technology: Prisma (if used) — Concept: schema & migrations

- Official source: https://www.prisma.io/docs/concepts/components/prisma-schema
- Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- Why required: Maps application model to DDL and defines migration generation and drift handling used in CI/CD migration review.
- Decision it informs: Migration strategy, generated client expectations, and whether application-layer checks suffice.
- What breaks without it: Divergent schema drift, failed migrations, and incorrect client assumptions about constraints.

3. Technology: Glob / Pathspec semantics — Concept: locked-path / forbidden-file matching

- Official source: gitignore semantics / chosen pathspec implementation (e.g., https://git-scm.com/docs/gitignore or chosen library docs)
- Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- Why required: Defines exact matching semantics for forbidden file lists and locked-path manifests used by enforcement logic.
- Decision it informs: How to canonicalize and match forbidden paths in DB records and enforcement checks.
- What breaks without it: False positives/negatives in enforcement and inconsistent blocking across tools.

4. Technology: JSON Schema — Concept: rule/manifest schema (if rule manifests are JSON)

- Official source: https://json-schema.org/specification.html
- Exact version requirement: 2020-12 (recommended) or PIN — VERSION UNKNOWN — MUST BE PINNED
- Why required: Standardizes rule manifest shape (forbidden globs, step sequences, invariants) and CI validation.
- Decision it informs: Validation, storage format, and client/runtime parsing expectations.
- What breaks without it: Unvalidated manifests, runtime parsing errors, and incompatible rule versions.

5. Technology: Idempotency & Retry Patterns (HTTP/RPC)

- Official source: RFC 7231 — https://datatracker.ietf.org/doc/html/rfc7231
- Exact version requirement: RFC as cited — PIN if implementation-specific libraries are used
- Why required: Guides de-duplication and job-uniqueness behavior when enforcement hooks are triggered by external events.
- Decision it informs: Idempotency-key format, TTL, and retry-handling for enforcement triggers.
- What breaks without it: Duplicate job creation, weak uniqueness guarantees, and inconsistent enforcement state.

6. Technology: Distributed locking guidance / advisory locks

- Official source: PostgreSQL advisory locks docs + chosen distributed-lock pattern docs (e.g., Redis Streams / Redlock guidance)
- Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- Why required: Provides authoritative guidance for preventing races when enforcing sequential constraints (single-active job per subject).
- Decision it informs: Use of DB advisory locks vs external lock service and lock TTL/renewal policies.
- What breaks without it: Lost exclusivity, double-enforcement, and incorrect sequencing under concurrency.

### EXISTING INTERNAL DOCS (VERIFIED)

- /docs/agent*orchestrator_output/EPIC-I — ANTI-CHEAT & ABUSE CONTROL SYSTEM/I5_Rule_Enforcement*(Hard_Constraints).md
  - Coverage status: PARTIAL
  - Exact gaps: Recommends `DB-schema-review` but does not enumerate exact DB invariants, forbidden-file lists, or acceptance criteria for each invariant.

- /docs/code-scout/EPIC-I — ANTI-CHEAT & ABUSE CONTROL SYSTEM/I5*Rule_Enforcement*(Hard_Constraints).md
  - Coverage status: PARTIAL
  - Exact gaps: Scans repository truth and lists missing artifacts; does not provide an approved planner task, DB-level migration specs, or CI gating checklist.

- /docs/master_docs.md
  - Coverage status: INSUFFICIENT
  - Exact gaps: Registry entries reference general DB/prisma guidance, but no EPIC-I / I5-specific registry entries or pointers to required planner task or DB-schema-review checklist.

- /docs/official-docs-registry.md
  - Coverage status: INSUFFICIENT
  - Exact gaps: No explicit entries for PostgreSQL DDL pinning for EPIC-I, no pinned guidance for chosen pathspec or locking strategy.

### DOCUMENTATION COVERAGE DECISION

⚠️ DOCUMENTATION PARTIAL — EXTENSION REQUIRED

Docs to extend/produce:

- `docs/tasks/EPIC-I — ANTI-CHEAT & ABUSE CONTROL SYSTEM/task-I5-approved-task.md` — approved planner-architect task (must be produced before implementer work).
- `/docs/official-docs/EPIC-I/db_schema_review_checklist.md` — DB-schema-review checkpoint and expected artifact template.
- `/docs/official-docs/EPIC-I/forbidden_paths_manifest.md` — canonical locked-path manifest schema and matching semantics.
- `/docs/official-docs/EPIC-I/locking_and_concurrency.md` — advisory lock patterns, TTLs, and CI validation for single-active-job invariants.

### STUDY GUIDE FOR HUMAN

- PostgreSQL DDL & Transactions: Why it exists — authoritative store of constraints and atomicity; Alternatives — application-layer checks (weaker under concurrency); When NOT to use — for purely ephemeral caches; Common mistake — relying only on app-side checks without DB constraints.
- Prisma & Migrations: Why — maps models to DDL and generates migrations; Alternatives — hand-authored SQL migrations; When NOT to use — when needing fine-grained concurrent DDL control without ORM abstractions; Common mistake — applying migrations without migration-review for concurrent index creation.
- Glob/Pathspec semantics: Why — deterministic forbidden-file matching; Alternatives — ad-hoc substring checks; When NOT to use — when matching must be exact across platforms; Mistake — using differing glob implementations between enforcement tools.
- Locking & Advisory Locks: Why — prevent race conditions for sequential invariants; Alternatives — unique constraints + idempotent handlers; When NOT to use — very high throughput ephemeral tasks; Mistake — missing TTL/renewal or assuming locks persist across failover.
- Idempotency patterns: Why — prevent duplicate enforcement jobs; Alternatives — DB-unique constraints; When NOT to use — events that are guaranteed unique; Mistake — not persisting idempotency keys or using ephemeral storage.

### INTERNAL DOCS TO ADD OR EXTEND

1. Path: /docs/tasks/EPIC-I — ANTI-CHEAT & ABUSE CONTROL SYSTEM/task-I5-approved-task.md
   - Purpose: Planner-Architect approved task document listing exact hard constraints, DB invariants, forbidden file lists, and acceptance criteria per invariant.
   - Exact knowledge to add: Enumerated invariants (DDL snippets or pseudo-DDL), forbidden-globs list format, per-invariant acceptance tests, required verification artifacts for downstream agents, and CI gating requirements.
   - Required version pin: must reference pinned DB + tooling versions used in acceptance criteria.

2. Path: /docs/official-docs/EPIC-I/db_schema_review_checklist.md
   - Purpose: Formal `DB-schema-review` checklist and template for review artifacts (migration diff, concurrent-index plan, backfill plan, rollback steps).
   - Exact knowledge to add: Required checklist items, sample review artifact files, and CI job name that must pass.
   - Required version pin: PostgreSQL version + Prisma/migration tool version.

3. Path: /docs/official-docs/EPIC-I/forbidden_paths_manifest.md
   - Purpose: Canonical spec for locked-path / forbidden-files manifest used by enforcement and stored references in DB.
   - Exact knowledge to add: JSON Schema for manifest, chosen glob/pathspec implementation and version, normalization rules, and examples.
   - Required version pin: JSON Schema version + chosen pathspec library version.

4. Path: /docs/official-docs/EPIC-I/locking_and_concurrency.md
   - Purpose: Guidance for advisory locks, lock TTL, renewal, failure modes, and CI tests to validate single-active-job semantics.
   - Exact knowledge to add: When to use advisory locks vs unique constraints, sample SQL for advisory lock usage, recommended TTL/renewal patterns, and CI acceptance tests for concurrent runs.
   - Required version pin: PostgreSQL version and chosen distributed-lock library versions.

### OPEN QUESTIONS / AMBIGUITIES

- Which exact Postgres major version will be used for enforcement? (blocking)
- Is Prisma the canonical schema tool for EPIC-I (and which version)?
- Which glob/pathspec implementation is authoritative for forbidden-path matching?
- Should `DB-schema-review` be an automated CI job and artifact (name/location) or a manual approver step?

### MASTER DOCS REGISTRY ACTION

Append entry to `/docs/master_docs.md`:

- Epic / Feature: EPIC-I / I5 — Rule Enforcement (Hard Constraints)
- Doc path: /docs/docs-gatekeeper/EPIC-I — ANTI-CHEAT & ABUSE CONTROL SYSTEM/I5*Rule_Enforcement*(Hard_Constraints).md
- Status: ADDED (EXTEND)
- Reason: Docs Gatekeeper brief enumerating required official docs, internal doc gaps, and registry updates for DB-level hard constraints and enforcement.
