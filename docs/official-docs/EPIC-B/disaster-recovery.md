---
doc_id: disaster-recovery
tool: PostgreSQL
version_pinned: true
change_sensitivity: CRITICAL
lifecycle: DRAFT
---

# Disaster Recovery & Rollback — EPIC-B (Immutable Tables)

- **Purpose:** Runbook for snapshotting, rollback, and emergency procedures when applying immutability-trigger migrations (e.g., B11). Owner: Infra/DB.
- **Scope:** Snapshots, PITR guidance, migration revert steps, emergency trigger-disable, approval checklist, and contact points.

## Preconditions

- Ensure full backups (base backup + WAL) exist and verify restore on staging before production migration window.
- Record the migration folder SHA(s) to be applied and the exact migration filenames.

## Snapshot / Backup Steps (recommended)

1. Create a base backup (fast) and retain WAL segments for PITR.

```bash
# pg_basebackup (example)
pg_basebackup -h <host> -D /var/lib/postgresql/backup -U replication -Ft -z -P
# or logical dump
pg_dump -Fc --no-acl --no-owner -h <host> -U <user> -d <db> -f backup_before_B11.dump
```

2. Verify WAL shipping / retention and ensure WALs covering the migration window are archived.

## Point-In-Time Recovery (PITR)

- If an immediate rollback is required and WALs are available, restore base backup and replay WALs to the pre-migration timestamp.
- If WALs are not available, restore the logical dump snapshot created above.

## Migration Rollback Procedure (high level)

1. Stop application traffic or place the app into maintenance mode.
2. Revert the migration on the `migrations/` folder in version control (create a revert branch with the prior `main` state for clarity).
3. Restore DB from the snapshot taken before the migration (PITR or logical restore).
4. Re-run pre-checks and, on confirmation, re-apply the corrected migration in a controlled window.

Notes:

- Reverting the migration folder in Git is necessary but not sufficient — you must restore DB state from snapshots or PITR to remove applied triggers/effects.
- Keep the original migration artifacts (SQL) and the reverted branch for audit.

## Emergency Trigger-Disable (ONLY for controlled emergency ops)

- Recommended approach: restore from snapshot instead of disabling triggers.
- If disabling is unavoidable (and approved), perform a controlled disable and re-enable with strict audit and approvals.

```sql
-- Disable a named trigger on a single table
ALTER TABLE "AuditLog" DISABLE TRIGGER auditlog_no_update;
-- Re-enable
ALTER TABLE "AuditLog" ENABLE TRIGGER auditlog_no_update;

-- Alternative (global bypass) -- USE ONLY WITH APPROVAL
-- This bypasses user-defined triggers for the session (dangerous):
SET session_replication_role = replica;
-- perform maintenance
SET session_replication_role = origin;
```

Caveat: `session_replication_role = replica` bypasses _all_ user triggers and will subvert immutability guarantees; only use with explicit signed approval from DB owner + Security.

## Verification After Restore/Rollback

- Run the QA immutability tests in staging/production-read-only to confirm expected `RAISE EXCEPTION` behavior for `UPDATE`/`DELETE` attempts.
- Verify `jsonlog` and `logging_collector` settings and ensure archived logs from the migration window are retained.

## Approval & Contact Checklist

- Required approvals before emergency disable or non-standard rollback:
  - DB Owner: [name/email]
  - Security Lead: [name/email]
  - On-call Infra: [pager/rota]
- Mandatory artifacts to attach to the migration ticket before proceeding:
  - Backup snapshot ID or dump filename
  - WAL coverage confirmation (timestamps)
  - Migration folder SHAs and SQL
  - Sign-off checkboxes from approvers

## Postmortem / Audit

- After any rollback or emergency disable, produce a postmortem documenting root cause, exact steps taken, timeline, and lessons learned. Attach the postmortem to the migration ticket and notify stakeholders.

## Minimal Emergency Runbook (bullet list)

- Immediately: pause traffic, notify approvers, and collect current WAL index.
- If WALs exist: perform PITR to pre-migration timestamp.
- If WALs do not exist: restore logical dump taken prior to migration.
- Do NOT rely on `session_replication_role` unless all approvers consent and a strict re-run plan is defined.

## References

- PostgreSQL 18.1 backup & restore docs (pin Pg version in `postresql.md`).
- Internal immutability trigger guidance: `docs/official-docs/EPIC-B/immutability-triggers.md`.

---

_Document owner: Infra/DB. Update and sign-off required before B11 production migration._
