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

## EPIC-I — Notes

- Mentioned in: EPIC-I — ANTI-CHEAT & ABUSE CONTROL SYSTEM
- EPIC-I intent: Use Postgres as the authoritative OLTP for audit records, idempotency stores, and enforcement-state with append-only semantics where required.
- Important points:
  - Recommend append-only audit tables with insert-only patterns and explicit `schema_version` fields for event contracts; include example DDL and indexing guidance.
  - Document advisory lock vs `SELECT FOR UPDATE` guidance for enforcing single-active-job semantics and preventing race conditions during enforcement transitions.
  - Pin Postgres major/minor versions and required extensions used for hashing/signature verification, and include migration and backfill guidance for forensic readiness.

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

## EPIC-D — Notes

- Mentioned in: EPIC-D — LESSON CREATION SYSTEM (D8 Storage & Versioning)
- EPIC-D intent: Use PostgreSQL (JSONB) for lesson metadata, versioning, and index strategies when DB-first storage is chosen.
- Important points:
  - Recommend `jsonb` storage shapes for lesson metadata and provide example `lessons` and `lesson_versions` table schemas, including indexing strategies for `lesson_id` and version lookups.
  - Document migration patterns for schema evolution of JSON shapes and provide guidance for append-only versioning semantics (immutable versions, soft-deletes, or version table approach).
  - Include backup/restore and PITR guidance specific to lesson version retention and explain interactions with object store blobs for large binary content.

Here is the complete list of links extracted from the **PostgreSQL 18.2 Documentation** Table of Contents. These are formatted as absolute URLs using the standard PostgreSQL documentation base (`https://www.postgresql.org/docs/18/`) for easy use in NotebookLM.

### **Front Matter & Preface**

- [https://www.postgresql.org/docs/18/preface.html](https://www.postgresql.org/docs/18/preface.html)
- [https://www.postgresql.org/docs/18/legalnotice.html](https://www.postgresql.org/docs/18/legalnotice.html)
- [https://www.postgresql.org/docs/18/intro-whatis.html](https://www.postgresql.org/docs/18/intro-whatis.html)
- [https://www.postgresql.org/docs/18/history.html](https://www.postgresql.org/docs/18/history.html)
- [https://www.postgresql.org/docs/18/notation.html](https://www.postgresql.org/docs/18/notation.html)
- [https://www.postgresql.org/docs/18/resources.html](https://www.postgresql.org/docs/18/resources.html)
- [https://www.postgresql.org/docs/18/bug-reporting.html](https://www.postgresql.org/docs/18/bug-reporting.html)

### **Part I. Tutorial**

- [https://www.postgresql.org/docs/18/tutorial.html](https://www.postgresql.org/docs/18/tutorial.html)
- [https://www.postgresql.org/docs/18/tutorial-start.html](https://www.postgresql.org/docs/18/tutorial-start.html)
- [https://www.postgresql.org/docs/18/tutorial-sql.html](https://www.postgresql.org/docs/18/tutorial-sql.html)
- [https://www.postgresql.org/docs/18/tutorial-advanced.html](https://www.postgresql.org/docs/18/tutorial-advanced.html)

### **Part II. The SQL Language**

- [https://www.postgresql.org/docs/18/sql.html](https://www.postgresql.org/docs/18/sql.html)
- [https://www.postgresql.org/docs/18/sql-syntax.html](https://www.postgresql.org/docs/18/sql-syntax.html)
- [https://www.postgresql.org/docs/18/ddl.html](https://www.postgresql.org/docs/18/ddl.html)
- [https://www.postgresql.org/docs/18/dml.html](https://www.postgresql.org/docs/18/dml.html)
- [https://www.postgresql.org/docs/18/queries.html](https://www.postgresql.org/docs/18/queries.html)
- [https://www.postgresql.org/docs/18/datatype.html](https://www.postgresql.org/docs/18/datatype.html)
- [https://www.postgresql.org/docs/18/functions.html](https://www.postgresql.org/docs/18/functions.html)
- [https://www.postgresql.org/docs/18/typeconv.html](https://www.postgresql.org/docs/18/typeconv.html)
- [https://www.postgresql.org/docs/18/indexes.html](https://www.google.com/search?q=https://www.postgresql.org/docs/18/indexes.html)
- [https://www.postgresql.org/docs/18/textsearch.html](https://www.postgresql.org/docs/18/textsearch.html)
- [https://www.postgresql.org/docs/18/mvcc.html](https://www.postgresql.org/docs/18/mvcc.html)
- [https://www.postgresql.org/docs/18/performance-tips.html](https://www.postgresql.org/docs/18/performance-tips.html)
- [https://www.postgresql.org/docs/18/parallel-query.html](https://www.postgresql.org/docs/18/parallel-query.html)

### **Part III. Server Administration**

- [https://www.postgresql.org/docs/18/admin.html](https://www.postgresql.org/docs/18/admin.html)
- [https://www.postgresql.org/docs/18/install-binaries.html](https://www.postgresql.org/docs/18/install-binaries.html)
- [https://www.postgresql.org/docs/18/installation.html](https://www.postgresql.org/docs/18/installation.html)
- [https://www.postgresql.org/docs/18/runtime.html](https://www.postgresql.org/docs/18/runtime.html)
- [https://www.postgresql.org/docs/18/runtime-config.html](https://www.postgresql.org/docs/18/runtime-config.html)
- [https://www.postgresql.org/docs/18/client-authentication.html](https://www.postgresql.org/docs/18/client-authentication.html)
- [https://www.postgresql.org/docs/18/user-manag.html](https://www.postgresql.org/docs/18/user-manag.html)
- [https://www.postgresql.org/docs/18/managing-databases.html](https://www.postgresql.org/docs/18/managing-databases.html)
- [https://www.postgresql.org/docs/18/charset.html](https://www.google.com/search?q=https://www.postgresql.org/docs/18/charset.html)
- [https://www.postgresql.org/docs/18/maintenance.html](https://www.postgresql.org/docs/18/maintenance.html)
- [https://www.postgresql.org/docs/18/backup.html](https://www.postgresql.org/docs/18/backup.html)
- [https://www.postgresql.org/docs/18/high-availability.html](https://www.postgresql.org/docs/18/high-availability.html)
- [https://www.postgresql.org/docs/18/monitoring.html](https://www.postgresql.org/docs/18/monitoring.html)
- [https://www.postgresql.org/docs/18/wal.html](https://www.postgresql.org/docs/18/wal.html)
- [https://www.postgresql.org/docs/18/logical-replication.html](https://www.postgresql.org/docs/18/logical-replication.html)
- [https://www.postgresql.org/docs/18/jit.html](https://www.postgresql.org/docs/18/jit.html)
- [https://www.postgresql.org/docs/18/regress.html](https://www.google.com/search?q=https://www.postgresql.org/docs/18/regress.html)

### **Part IV. Client Interfaces**

- [https://www.postgresql.org/docs/18/client-interfaces.html](https://www.postgresql.org/docs/18/client-interfaces.html)
- [https://www.postgresql.org/docs/18/libpq.html](https://www.postgresql.org/docs/18/libpq.html)
- [https://www.postgresql.org/docs/18/largeobjects.html](https://www.postgresql.org/docs/18/largeobjects.html)
- [https://www.postgresql.org/docs/18/ecpg.html](https://www.postgresql.org/docs/18/ecpg.html)
- [https://www.postgresql.org/docs/18/information-schema.html](https://www.postgresql.org/docs/18/information-schema.html)

### **Part V. Server Programming**

- [https://www.postgresql.org/docs/18/server-programming.html](https://www.postgresql.org/docs/18/server-programming.html)
- [https://www.postgresql.org/docs/18/extend.html](https://www.postgresql.org/docs/18/extend.html)
- [https://www.postgresql.org/docs/18/triggers.html](https://www.google.com/search?q=https://www.postgresql.org/docs/18/triggers.html)
- [https://www.postgresql.org/docs/18/event-triggers.html](https://www.postgresql.org/docs/18/event-triggers.html)
- [https://www.postgresql.org/docs/18/rules.html](https://www.postgresql.org/docs/18/rules.html)
- [https://www.postgresql.org/docs/18/xplang.html](https://www.postgresql.org/docs/18/xplang.html)
- [https://www.postgresql.org/docs/18/plpgsql.html](https://www.postgresql.org/docs/18/plpgsql.html)
- [https://www.postgresql.org/docs/18/pltcl.html](https://www.postgresql.org/docs/18/pltcl.html)
- [https://www.postgresql.org/docs/18/plperl.html](https://www.postgresql.org/docs/18/plperl.html)
- [https://www.postgresql.org/docs/18/plpython.html](https://www.postgresql.org/docs/18/plpython.html)
- [https://www.postgresql.org/docs/18/spi.html](https://www.postgresql.org/docs/18/spi.html)
- [https://www.postgresql.org/docs/18/bgworker.html](https://www.postgresql.org/docs/18/bgworker.html)
- [https://www.postgresql.org/docs/18/logicaldecoding.html](https://www.postgresql.org/docs/18/logicaldecoding.html)
- [https://www.postgresql.org/docs/18/replication-origins.html](https://www.postgresql.org/docs/18/replication-origins.html)
- [https://www.postgresql.org/docs/18/archive-modules.html](https://www.postgresql.org/docs/18/archive-modules.html)
- [https://www.postgresql.org/docs/18/oauth-validators.html](https://www.postgresql.org/docs/18/oauth-validators.html)

### **Part VI. Reference**

- [https://www.postgresql.org/docs/18/reference.html](https://www.postgresql.org/docs/18/reference.html)
- [https://www.postgresql.org/docs/18/sql-commands.html](https://www.postgresql.org/docs/18/sql-commands.html)
- [https://www.postgresql.org/docs/18/reference-client.html](https://www.google.com/search?q=https://www.postgresql.org/docs/18/reference-client.html)
- [https://www.postgresql.org/docs/18/reference-server.html](https://www.postgresql.org/docs/18/reference-server.html)

### **Part VII. Internals**

- [https://www.postgresql.org/docs/18/internals.html](https://www.postgresql.org/docs/18/internals.html)
- [https://www.postgresql.org/docs/18/overview.html](https://www.postgresql.org/docs/18/overview.html)
- [https://www.postgresql.org/docs/18/catalogs.html](https://www.postgresql.org/docs/18/catalogs.html)
- [https://www.postgresql.org/docs/18/views.html](https://www.postgresql.org/docs/18/views.html)
- [https://www.postgresql.org/docs/18/protocol.html](https://www.postgresql.org/docs/18/protocol.html)
- [https://www.postgresql.org/docs/18/source.html](https://www.postgresql.org/docs/18/source.html)
- [https://www.postgresql.org/docs/18/nls.html](https://www.postgresql.org/docs/18/nls.html)
- [https://www.postgresql.org/docs/18/plhandler.html](https://www.google.com/search?q=https://www.postgresql.org/docs/18/plhandler.html)
- [https://www.postgresql.org/docs/18/fdwhandler.html](https://www.postgresql.org/docs/18/fdwhandler.html)
- [https://www.postgresql.org/docs/18/tablesample-method.html](https://www.postgresql.org/docs/18/tablesample-method.html)
- [https://www.postgresql.org/docs/18/custom-scan.html](https://www.postgresql.org/docs/18/custom-scan.html)
- [https://www.postgresql.org/docs/18/geqo.html](https://www.postgresql.org/docs/18/geqo.html)
- [https://www.postgresql.org/docs/18/tableam.html](https://www.postgresql.org/docs/18/tableam.html)
- [https://www.postgresql.org/docs/18/indexam.html](https://www.postgresql.org/docs/18/indexam.html)
- [https://www.postgresql.org/docs/18/wal-for-extensions.html](https://www.postgresql.org/docs/18/wal-for-extensions.html)
- [https://www.postgresql.org/docs/18/indextypes.html](https://www.postgresql.org/docs/18/indextypes.html)
- [https://www.postgresql.org/docs/18/storage.html](https://www.postgresql.org/docs/18/storage.html)
- [https://www.postgresql.org/docs/18/transactions.html](https://www.postgresql.org/docs/18/transactions.html)
- [https://www.postgresql.org/docs/18/bki.html](https://www.postgresql.org/docs/18/bki.html)
- [https://www.postgresql.org/docs/18/planner-stats-details.html](https://www.postgresql.org/docs/18/planner-stats-details.html)
- [https://www.postgresql.org/docs/18/backup-manifest-format.html](https://www.postgresql.org/docs/18/backup-manifest-format.html)

### **Part VIII. Appendixes**

- [https://www.postgresql.org/docs/18/appendixes.html](https://www.postgresql.org/docs/18/appendixes.html)
- [https://www.postgresql.org/docs/18/errcodes-appendix.html](https://www.google.com/search?q=https://www.postgresql.org/docs/18/errcodes-appendix.html)
- [https://www.postgresql.org/docs/18/datetime-appendix.html](https://www.postgresql.org/docs/18/datetime-appendix.html)
- [https://www.postgresql.org/docs/18/sql-keywords-appendix.html](https://www.postgresql.org/docs/18/sql-keywords-appendix.html)
- [https://www.postgresql.org/docs/18/features.html](https://www.google.com/search?q=https://www.postgresql.org/docs/18/features.html)
- [https://www.postgresql.org/docs/18/release.html](https://www.postgresql.org/docs/18/release.html)
- [https://www.postgresql.org/docs/18/contrib.html](https://www.postgresql.org/docs/18/contrib.html)
- [https://www.postgresql.org/docs/18/contrib-prog.html](https://www.postgresql.org/docs/18/contrib-prog.html)
- [https://www.postgresql.org/docs/18/external-projects.html](https://www.postgresql.org/docs/18/external-projects.html)
- [https://www.postgresql.org/docs/18/sourcerepo.html](https://www.postgresql.org/docs/18/sourcerepo.html)
- [https://www.postgresql.org/docs/18/docguide.html](https://www.postgresql.org/docs/18/docguide.html)
- [https://www.postgresql.org/docs/18/limits.html](https://www.postgresql.org/docs/18/limits.html)
- [https://www.postgresql.org/docs/18/acronyms.html](https://www.google.com/search?q=https://www.postgresql.org/docs/18/acronyms.html)
- [https://www.postgresql.org/docs/18/glossary.html](https://www.postgresql.org/docs/18/glossary.html)
- [https://www.postgresql.org/docs/18/color.html](https://www.postgresql.org/docs/18/color.html)
- [https://www.postgresql.org/docs/18/appendix-obsolete.html](https://www.postgresql.org/docs/18/appendix-obsolete.html)

### **Indices**

- [https://www.postgresql.org/docs/18/biblio.html](https://www.postgresql.org/docs/18/biblio.html)
- [https://www.postgresql.org/docs/18/bookindex.html](https://www.postgresql.org/docs/18/bookindex.html)

---

**Would you like me to help you identify specific configuration parameters within these admin links for your engineering policy compiler?**
