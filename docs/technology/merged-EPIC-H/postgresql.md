# PostgreSQL

- Category: Database
- Epics: B, G, H
- Version / Requirement: 18.2
- Intent / Critical Decision: Critical: v18.2 fixes the 18.1 security overflow bug.

## EPIC-B — Notes

- Mentioned in: EPIC-B — DATABASE CORE & HARDENING
- EPIC-B intent: Primary OLTP store for user/auth/lesson/lab data; pin Postgres major/minor before migrations.
- Important points:
  - Pin a specific Postgres version (major.minor) for schema/extension compatibility and CI images.
  - Document required extensions (pgcrypto, uuid-ossp, pg_trgm, jsonb indexing) and how to enable them in RDS or self-hosted clusters.
  - Provide migration & DR guidance for append-only/immutability patterns (triggers, row-level security, WAL retention) as required by B11.
  - Note: Ensure timezone and locale settings are captured for reproducible timestamps and audit logs.

  ## EPIC-G — Notes
  - Mentioned in: EPIC-G — PUSH FLOW & SNAPSHOT PREVIEW
  - EPIC-G intent: Store snapshot metadata, delivery audit events, idempotency records, and repo→session mappings with append-only semantics.
  - Important points:
    - Recommend append-only audit tables for snapshot events and delivery records with immutable row patterns (insert-only, no UPDATE), and include example schemas and migration guidance.
    - Document advisory-lock vs `SELECT FOR UPDATE` patterns for safer repo→session binding operations to avoid race conditions during binding and rejection flows.
    - Capture recommended indexing strategies for delivery-id lookups and snapshot_id queries to support deduplication and fast verification in `G1`/`G2` flows.

## EPIC-E — Notes

- Mentioned in: EPIC-E — LAB CREATION SYSTEM (MANUAL + AI)
- EPIC-E intent: Store canonical lab definitions and metadata using Postgres JSONB columns and provide indexing guidance for efficient validation and search.
- Important points:
  - Recommend `jsonb` storage patterns for lab payloads, add GIN indexes and functional indexes for common query paths (e.g., `metadata->>'lab_id'`), and document safe migration practices for evolving JSON shapes.
  - Pin Postgres version consistent with EPIC-E guidance (18.1 recommended in gatekeeper briefs) and ensure CI images match pinned versions used for verification runs.
  - Provide backup/restore runbooks and guidance for storing snapshot metadata (content-addressed IDs) separate from binary blob storage.

## EPIC-C — Notes

- Mentioned in: EPIC-C — AUTHENTICATION & RBAC
- EPIC-C intent: Ensure DB schemas supporting auth and RBAC (indexes on provider ids, session tables) are performant and secure.
- Important points:
  - Add recommended indexes for auth lookups (e.g., provider + provider_user_id), and TTL strategies for session cleanup using background jobs.
  - Document secure column types for sensitive tokens (encrypted columns or reference to encrypted blobs in object storage) and RLS guidance if multitenant.
  - Ensure migrations for identity tables are covered by backup/restore runbooks and tested in staging with realistic data volumes.

---

# EPIC-H — Notes (merged)

- Referenced by: EPIC-H — LAB TESTING & VERIFICATION ENGINE
- Intent: Postgres is the authoritative OLTP store backing `VerificationJob`, `LabAttempt`, uniqueness constraints and transactional enqueue semantics.
- Important points:
  - EPIC-H requires a pinned Postgres version; document safe DDL patterns (concurrent index builds, transactional enqueue patterns), backfill strategies for existing logs, and uniqueness enforcement for `commitSha`-based deduplication.
