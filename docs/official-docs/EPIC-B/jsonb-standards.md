---
doc_id: jsonb-standards
tool: PostgreSQL
version_pinned: true
change_sensitivity: HIGH
lifecycle: ACTIVE
---

# PostgreSQL 18.1 — JSONB Storage & GIN Indexing

## Purpose

Governs the selection of JSON data types, the enforcement of binary storage (JSONB) for indexable metadata (Lesson, Lab, Verification), the configuration of Generalized Inverted Indexes (GIN), and the standardization of 128-bit UUIDs for external identifiers.

## Status

- Doc type: INTERNAL / AUTHORITATIVE
- Evidence basis: Official vendor documentation only
- Version status: PINNED (v18.1)

## Scope

- Applies to: Column data type definitions (`jsonb`, `uuid`), GIN index operator classes, and UUID generation strategies.
- Does NOT apply to: `xml` data types, text search vectors, or legacy `json` text storage unless explicitly justified by whitespace preservation requirements.

## Official Sources (Binding)

- PostgreSQL 18.1: 8.14. JSON Types
- PostgreSQL 18.1: 11.2. Index Types
- PostgreSQL 18.1: 8.12. UUID Type

## Evidence Coverage Matrix

| Policy Area                     | Source URL                | Version Covered | Status  |
| ------------------------------- | ------------------------- | --------------- | ------- |
| JSON vs JSONB                   | 8.14. JSON Types          | v18.1           | COVERED |
| GIN Indexing (`jsonb_ops`)      | 8.14.4. jsonb Indexing    | v18.1           | COVERED |
| GIN Indexing (`jsonb_path_ops`) | 8.14.4. jsonb Indexing    | v18.1           | COVERED |
| UUID Formats (v4/v7)            | 8.12. UUID Type           | v18.1           | COVERED |
| Containment Rules               | 8.14.3. jsonb Containment | v18.1           | COVERED |

## Version & Compatibility

- **Tool version:** PostgreSQL 18.1.
- **UUID Support:** Native support for UUIDv4 and UUIDv7 algorithms is available in core.
- **JSON Encoding:** RFC 7159 specifies UTF-8; `jsonb` strictly enforces database encoding compatibility.

## Canonical Rules (Non-Negotiable)

- **JSON Storage Type:**
  - `jsonb` MUST be used for all JSON storage requiring indexing or query processing.
  - `jsonb` stores data in a decomposed binary format, eliminating reparsing overhead.
  - `jsonb` does NOT preserve whitespace, key order, or duplicate keys (last value wins).
- **Indexing Strategy (GIN):**
  - **Standard Indexing:** `CREATE INDEX` on `jsonb` defaults to the `jsonb_ops` operator class, which supports key-existence operators (`?`, `?|`, `?&`), containment (`@>`), and jsonpath matchers (`@?`, `@@`).
  - **Optimization (Path Ops):** `jsonb_path_ops` MAY be used to reduce index size and improve performance ONLY if queries are restricted to containment (`@>`) and jsonpath (`@?`, `@@`) operations,.
- **UUID Data Type:**
  - External identifiers MUST use the native `uuid` data type (128-bit quantity).
  - **UUIDv7:** Use native UUIDv7 for time-ordered, sortable identifiers (e.g., primary keys requiring locality).
  - **UUIDv4:** Use native UUIDv4 for purely random identifiers.
  - **Output Format:** UUIDs are always output in the standard hyphenated format (e.g., `a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11`).

## Prohibited Configurations

- ❌ **Storing `json` (Text):** The `json` data type MUST NOT be used for metadata columns unless preserving semantic-insignificant details (whitespace, key order) is strictly required,.
- ❌ **`jsonb_path_ops` for Key Existence:** Do NOT use `jsonb_path_ops` if queries require key-existence operators (`?`, `?|`, `?&`); the index will not support them.
- ❌ **Null Characters:** `jsonb` explicitly rejects `\u0000` (null character) as it cannot be represented in PostgreSQL's text type.
- ❌ **Numeric Special Values:** `jsonb` prohibits `NaN` and `infinity` values.
- ❌ **Empty Structure Scans (Path Ops):** `jsonb_path_ops` MUST NOT be used if finding empty structures (e.g., `{"a": {}}`) is a requirement, as it creates no index entries for them and forces a full-table scan.

## Enforcement

- **Syntax Validation:** `jsonb` input functions validate syntax and encoding strictness immediately upon storage.
- **Index Usage:**
  - `jsonb_ops` supports `?`, `?|`, `?&`, `@>`, `@?`, `@@`.
  - `jsonb_path_ops` supports ONLY `@>`, `@?`, `@@`.
- **UUID Validation:** The `uuid` type enforces valid 128-bit hex input formats.

## Failure Modes

- **Data Loss (Duplicates):** Inserting `{"a": 1, "a": 2}` into a `jsonb` column results in `{"a": 2}`. Applications relying on duplicate keys will fail.
- **Precision Loss:** `jsonb` maps JSON numbers to PostgreSQL `numeric`; precision limits of the underlying type apply.
- **Index Scan Failure:** Queries using `?` (exists) on a `jsonb_path_ops` index will fall back to a sequential scan,.

## Cross-Doc Dependencies

- Depends on:
  - `/docs/official-docs/EPIC-B/postgresql.md` (Provisioning and basic configuration).
- Conflicts with:
  - NONE

## Planner Extraction Hints (Non-Human)

- If `column_type` is `jsonb` AND `query_pattern` includes `?` -> REQUIRE `jsonb_ops`.
- If `column_type` is `jsonb` AND `query_pattern` is ONLY `@>` -> PREFER `jsonb_path_ops`.
- If `id_type` is `external` -> ENFORCE `uuid` (PostgreSQL native).
- `jsonb` implies `preserve_key_order` = FALSE.

## Verification Checklist

- [ ] Metadata columns (Lesson, Lab) are defined as `jsonb`.
- [ ] External IDs are defined as `uuid`.
- [ ] GIN indexes are present on queried `jsonb` columns.
- [ ] `jsonb_path_ops` is used ONLY where key-existence checks are absent.
- [ ] No `json` text types are present in the schema without explicit justification.

## Non-Decisions

- This document does not mandate a specific library for client-side UUID generation, provided the output is compliant with standard UUID formats.
- This document does not define specific jsonpath query patterns (e.g., `$.store.book[*]`).

## Notes

- `jsonb_path_ops` indexes are generally much smaller than `jsonb_ops` because they hash the value and path together.
- `jsonb` supports B-tree and Hash indexes, but these are only useful for full document equality, not content searching.
