-- Enforce append-only immutability for AuditLog at the DATABASE level.
-- Blocks UPDATE and DELETE; INSERT remains allowed.

CREATE OR REPLACE FUNCTION prevent_auditlog_mutations()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  RAISE EXCEPTION 'AuditLog is append-only: % is forbidden', TG_OP
    USING ERRCODE = '42501';
END;
$$;

DROP TRIGGER IF EXISTS auditlog_no_update ON "AuditLog";
CREATE TRIGGER auditlog_no_update
BEFORE UPDATE ON "AuditLog"
FOR EACH ROW
EXECUTE FUNCTION prevent_auditlog_mutations();

DROP TRIGGER IF EXISTS auditlog_no_delete ON "AuditLog";
CREATE TRIGGER auditlog_no_delete
BEFORE DELETE ON "AuditLog"
FOR EACH ROW
EXECUTE FUNCTION prevent_auditlog_mutations();
