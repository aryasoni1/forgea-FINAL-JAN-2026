-- Enforce LabSession lifecycle transitions at the database layer
-- Fail-closed on invalid or undefined transitions

CREATE OR REPLACE FUNCTION enforce_lab_session_status_transition()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    IF NEW.status <> 'IN_PROGRESS' THEN
      RAISE EXCEPTION 'Invalid initial LabSession status: %', NEW.status;
    END IF;
    RETURN NEW;
  END IF;

  IF TG_OP = 'UPDATE' THEN
    IF NEW.status = OLD.status THEN
      RETURN NEW;
    END IF;

    IF OLD.status = 'IN_PROGRESS' AND NEW.status IN ('IN_PROGRESS', 'STUCK', 'VERIFIED_PASS', 'DEFERRED') THEN
      RETURN NEW;
    ELSIF OLD.status = 'STUCK' AND NEW.status IN ('STUCK', 'IN_PROGRESS', 'VERIFIED_PASS', 'DEFERRED') THEN
      RETURN NEW;
    ELSIF OLD.status = 'DEFERRED' AND NEW.status IN ('DEFERRED', 'IN_PROGRESS') THEN
      RETURN NEW;
    ELSIF OLD.status = 'VERIFIED_PASS' AND NEW.status IN ('VERIFIED_PASS') THEN
      RETURN NEW;
    END IF;

    RAISE EXCEPTION 'Invalid LabSession status transition: % -> %', OLD.status, NEW.status;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS labsession_lifecycle_guard ON "LabSession";

CREATE TRIGGER labsession_lifecycle_guard
BEFORE INSERT OR UPDATE ON "LabSession"
FOR EACH ROW
EXECUTE FUNCTION enforce_lab_session_status_transition();
