### FEATURE ANALYSIS

- Feature Type: code + infra verification
- Risk Level: Low
- Touches HARD LOCK: No

### REQUIRED AGENTS

- Implementer — Inspect/add DB schema changes (ensure `User` table and fields exist). Use Prisma migrations if applicable.
- Planner / Architect — Confirm schema shape and primary/unique constraints align with auth design.
- QA / Tester — Verify uniqueness/constraints and migration safety in staging.
- Documenter / Historian — Document final schema and migration steps.

### NOT REQUIRED AGENTS

- Security Sentinel — Not required for schema presence; engage only if PII handling concerns surface.

### MISSING AGENT

- None.

### EXECUTION PLAN

- Step 1: Implementer checks current `User` model in `packages/schema/` or `prisma/schema.prisma`.
- Step 2: Architect approves required fields: `id (PK)`, `email (unique)`, `name`, `image`, `role`, timestamps.
- Step 3: Implementer adds migration and runs it in staging; QA verifies constraints and data integrity.
- Step 4: Documenter updates schema docs.

### USER PROMPTS

- Implementer:
  "Check `prisma/schema.prisma` (or `packages/schema/`) for a `User` model. Ensure: `id` is primary key, `email` has unique index, fields `name`, `image`, `role` exist, and created/updated timestamps present. If missing, add fields and create a safe migration."

- Planner / Architect:
  "Confirm the canonical `User` model shape including types for `role` (enum or string), expected maximums, and any indexing requirements. Note any backward-compatibility or migration concerns."

- QA / Tester:
  "Validate the migration: test that inserting duplicate `email` is blocked, create/update timestamps set, and existing data (if any) maps correctly."

### ORCHESTRATOR IMPROVEMENT NOTES

- Add a small agent checklist for DB migration safety when auth features modify user schema.
