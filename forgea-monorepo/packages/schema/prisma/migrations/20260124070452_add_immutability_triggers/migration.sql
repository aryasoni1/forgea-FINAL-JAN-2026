-- Database Reliability Engineering: Append-Only Immutability Enforcement
-- Prevents UPDATE or DELETE on trust anchor tables to preserve auditable history
-- and prevent resume inflation.

-- 1. Create a reusable trigger function
CREATE OR REPLACE FUNCTION prevent_destructive_action()
RETURNS TRIGGER AS $$
BEGIN
  RAISE EXCEPTION
    'Action forbidden: This table is append-only. Rows cannot be updated or deleted.';
END;
$$ LANGUAGE plpgsql;

-- 2. Attach trigger to VerificationLog (Proof of Work)
CREATE TRIGGER verificationlog_immutable
BEFORE UPDATE OR DELETE ON "VerificationLog"
FOR EACH ROW
EXECUTE FUNCTION prevent_destructive_action();

-- 3. Attach trigger to AuditLog (Compliance Ledger)
CREATE TRIGGER auditlog_immutable
BEFORE UPDATE OR DELETE ON "AuditLog"
FOR EACH ROW
EXECUTE FUNCTION prevent_destructive_action();

-- 4. Attach trigger to ResumeBullet (Hiring Asset)
CREATE TRIGGER resumebullet_immutable
BEFORE UPDATE OR DELETE ON "ResumeBullet"
FOR EACH ROW
EXECUTE FUNCTION prevent_destructive_action();

-- This enforces write-once, read-many (WORM) guarantees
-- and preserves auditable hiring signals.