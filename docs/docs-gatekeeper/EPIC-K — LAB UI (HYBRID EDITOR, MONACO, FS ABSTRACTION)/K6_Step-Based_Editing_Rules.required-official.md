### REQUIRED OFFICIAL DOCUMENTATION

1. Technology: JSON Schema

- Concept: Canonical `.forgea/steps.json` machine-readable schema
- Official source: https://json-schema.org/specification.html
- Exact version requirement: 2020-12 (JSON Schema draft)
- Why required: Validates step definitions consumed by UI, backend, and verification services.
- What decision it informs: File-glob matching, step ordering, step metadata fields, and validation at ingestion.
- What breaks without it: Divergent step formats across services, broken UI mapping, and untestable verifier contracts.

2. Technology: Glob / Pathspec semantics

- Concept: Locked/editable path glob semantics for step-scoped file lists
- Official source: choose & pin implementation (examples: gitignore docs https://git-scm.com/docs/gitignore or pathspec https://github.com/cs01/pathspec)
- Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- Why required: Ensures consistent interpretation of editable file globs across server, client, and enforcement services.
- What decision it informs: Which files are editable/locked for a step and enforcement boundary behavior.
- What breaks without it: Inconsistent locking, UI/engine mismatch, incorrect enforcement.

3. Technology: Prisma / Postgres data modeling guidance

- Concept: Persistence contract for per-step state (schema guidance for `StepVerification` / `LabAttempt` / extension to `LabSession`)
- Official source: https://www.prisma.io/docs/reference/api-reference/prisma-schema-reference
- Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- Why required: Database schema conventions, FK constraints, indexing, and migration guidance for step-state.
- What decision it informs: Choice between extending `LabSession` vs dedicated per-step model, uniqueness constraints, and retention indexing.
- What breaks without it: Race conditions, non-atomic step state, inability to audit or enforce one-attempt-per-commit guarantees.
