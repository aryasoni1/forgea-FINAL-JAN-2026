---
doc_id: postgresql-immutability-triggers
tool: PostgreSQL
version_pinned: true
change_sensitivity: HIGH
lifecycle: ACTIVE
---

# PostgreSQL — Trigger-Based Row Immutability

## Purpose

Governs the implementation of row-level and column-level immutability using `BEFORE` triggers and PL/pgSQL functions to enforce "write-once" or "append-only" semantics on audit and versioned data.

## Status

- Doc type: INTERNAL / AUTHORITATIVE
- Evidence basis: Official PostgreSQL 18.1 Documentation
- Version status: PINNED (v18.1)

## Scope

- Applies to: `BEFORE UPDATE` and `BEFORE DELETE` triggers, PL/pgSQL trigger functions, and row security enforcement.
- Does NOT apply to: `GRANT`/`REVOKE` privileges, `READ ONLY` transaction modes, or `INSTEAD OF` triggers (Views).

## Official Sources (Binding)

- PostgreSQL 18.1: Chapter 37. Triggers
- PostgreSQL 18.1: Section 41.10. Trigger Functions
- PostgreSQL 18.1: Section 9.16. JSON Functions and Operators

## Evidence Coverage Matrix

| Policy Area                              | Source Reference | Version Covered | Status  |
| ---------------------------------------- | ---------------- | --------------- | ------- |
| Trigger Execution Timing (`BEFORE`)      | 37.1,            | v18.1           | COVERED |
| Operation Skipping (`RETURN NULL`)       | 37.1, 41.10      | v18.1           | COVERED |
| Exception Raising (`RAISE EXCEPTION`)    | 41.10,           | v18.1           | COVERED |
| Column-Level Comparison (`OLD` vs `NEW`) | 41.10,           | v18.1           | COVERED |
| Generated Column Restrictions            | 37.1             | v18.1           | COVERED |

## Version & Compatibility

- **Tool version:** PostgreSQL 18.1
- **Procedural Language:** PL/pgSQL (Required for logic defined in Canonical Rules).
- **JSONB Compatibility:** `IS DISTINCT FROM` comparison correctly handles `jsonb` equality for immutability checks.

## Canonical Rules (Non-Negotiable)

- **Timing Requirement:** Immutability logic MUST be implemented in `BEFORE` triggers.
  - `BEFORE` triggers run _before_ the modification is applied or logged, allowing efficient cancellation or modification without WAL overhead.
- **Hard Failure (Strict Enforcement):** To explicitly forbid a modification and alert the client (abort transaction), the trigger function MUST execute `RAISE EXCEPTION`.
- **Soft Failure (Silent Skip):** To silently ignore a modification attempt without aborting the transaction, the trigger function MUST `RETURN NULL`.
  - **Update Skip:** Returning `NULL` in a `BEFORE UPDATE` trigger prevents the update for that row.
  - **Delete Skip:** Returning `NULL` in a `BEFORE DELETE` trigger prevents the deletion.
- **Pass-Through Requirement:** To allow an operation to proceed, the function MUST return:
  - `NEW` for `INSERT`/`UPDATE`.
  - `OLD` for `DELETE`.
- **Column-Level Immutability:**
  - The trigger MUST compare `OLD.column_name` and `NEW.column_name` using `IS DISTINCT FROM` (handles NULLs safely).
  - Logic: `IF NEW.col IS DISTINCT FROM OLD.col THEN RAISE EXCEPTION ... END IF;`.
- **Generated Column Safety:**
  - `BEFORE` triggers MUST NOT access stored generated columns in the `NEW` row, as they are not yet computed.

## Prohibited Configurations

- ❌ **Using `AFTER` Triggers for Blocking:** `AFTER` triggers MUST NOT be used to prevent updates/deletes. They fire after the event, meaning the change has already occurred and must be rolled back, which is less efficient.
- ❌ **Returning `NULL` in `BEFORE DELETE` (Unless Intentional Skip):** Returning `NULL` in a `BEFORE DELETE` trigger silently cancels the delete. This MUST NOT be done if the intent is to allow the deletion; return `OLD` instead.
- ❌ **Modifying `NEW` in `AFTER` Triggers:** The return value of an `AFTER` trigger is ignored; modifications to `NEW` have no effect.

## Enforcement

- **Trigger Definition:**
  - Triggers MUST be defined with `FOR EACH ROW` to inspect individual data values.
  - `EXECUTE FUNCTION` binds the PL/pgSQL function to the trigger event.
- **Execution Order:**
  - If multiple triggers are defined, they fire in alphabetical order by name.
  - If a `BEFORE` trigger returns `NULL`, subsequent triggers for that row are NOT fired.

## Failure Modes

- **Transaction Abort:** `RAISE EXCEPTION` rolls back the entire transaction.
- **Silent Divergence:** `RETURN NULL` results in "0 rows affected" or successful completion without persisting changes. Clients may assume success erroneously.
- **Stack Depth Limit:** Infinite recursion occurs if a trigger function executes SQL commands that fire the same trigger (Cascading Triggers).

## Cross-Doc Dependencies

- Depends on:
  - `/docs/official-docs/EPIC-B/postgresql-plpgsql-guidelines.md` (Assumed PL/pgSQL standards).
- Conflicts with:
  - NONE

## Planner Extraction Hints (Non-Human)

- `TRIGGER_TYPE` = `BEFORE`
- `TRIGGER_LEVEL` = `ROW`
- `BLOCKING_METHOD` = `RAISE EXCEPTION` (Strict) OR `RETURN NULL` (Silent)
- `IMMUTABILITY_CHECK` = `IS DISTINCT FROM`

## Verification Checklist

- [ ] Trigger is defined as `BEFORE UPDATE` or `BEFORE DELETE`.
- [ ] Function returns `NEW` (for valid updates) or `OLD` (for valid deletes).
- [ ] Function raises `EXCEPTION` for prohibited changes.
- [ ] Trigger function is declared `RETURNS TRIGGER`.
- [ ] `IS DISTINCT FROM` is used for column comparisons to handle NULLs.

## Non-Decisions

- This document does not cover `INSTEAD OF` triggers (Views).
- This document does not cover `TRUNCATE` triggers (Statement-level only).

## Notes

- In `BEFORE UPDATE` triggers, `OLD` contains pre-update values; `NEW` contains proposed post-update values.
- For `DELETE` operations, `NEW` is null; `OLD` contains the row to be deleted.
- `IS DISTINCT FROM` treats `NULL` as a distinct value, ensuring comparisons work even if fields are nullable.
