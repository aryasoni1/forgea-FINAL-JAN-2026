# EPIC-O — ADMIN SESSION OPERATIONS

> Scope: **Admin-only oversight, control, and forensics for live and historical lab sessions**.
> No verification execution, no repo mutation, no result tampering.
> This epic is **parallel-safe** with all core epics.

---

## EPIC METADATA

* Epic ID: EPIC-O
* Parallel Group: ADMIN_SESSION
* File Ownership:

  * apps/admin/**
  * services/admin-session/**
* Lock Policy: HARD LOCK (session integrity)
* Blast Radius: SYSTEM

---

## FEATURE O1 — Access & Permissions

1. Restrict Admin Session Operations to ADMIN / OPERATOR roles
2. Enforce backend role checks for all session actions
3. Log all admin access attempts to session views

---

## FEATURE O2 — Session Listing & Filtering

4. List all lab sessions with status
5. Display session ID, user, lab, start time, last activity
6. Filter sessions by status (Active / Completed / Failed / Invalid)
7. Filter sessions by lab
8. Filter sessions by user
9. Sort sessions by last activity and failure rate

---

## FEATURE O3 — Session Detail View

10. Load full session details by sessionId
11. Display lab metadata and lab version
12. Display linked GitHub repo URL (read-only)
13. Display session start time and elapsed duration
14. Display current step and step status

---

## FEATURE O4 — Attempt Ledger (Immutable)

15. List all attempts chronologically
16. Display commit SHA per attempt
17. Display verification result per attempt
18. Display verification duration
19. Display timestamp per attempt
20. Enforce read-only, append-only ledger view

---

## FEATURE O5 — Verification Oversight

21. Display current verification job status
22. Display last verification error summary
23. Correlate attempts with verification jobs
24. Detect stuck or long-running verification jobs

---

## FEATURE O6 — Abuse & Risk Signal Surfacing

25. Display excessive retry signals
26. Display abnormal speed-to-pass signals
27. Display repeated identical diff signals
28. Display force-push or forbidden change signals

---

## FEATURE O7 — Admin Session Controls (Scoped)

29. Abort active session
30. Lock session to read-only mode
31. Extend session time window
32. Throttle verification attempts
33. Reset snapshot preview for session

---

## FEATURE O8 — Enforcement & Safety

34. Prevent admins from marking sessions as PASSED
35. Prevent admins from modifying user code
36. Prevent admins from injecting commits
37. Preserve session state after enforcement actions

---

## FEATURE O9 — Audit & Forensics

38. Write audit log for every admin session action
39. Store action reason and admin identity
40. Preserve audit logs immutably

---

## FEATURE O10 — Error Handling & Resilience

41. Handle concurrent admin actions safely
42. Prevent race conditions on session state updates
43. Surface non-leaking error messages to admin
44. Fail closed on ambiguous session state

---

## EPIC-O COMPLETION CRITERIA

* Admins can observe and control sessions without altering truth
* All actions auditable and immutable
* No admin path can produce a false PASS

---

## LOCK DECLARATION (POST-COMPLETION)

After EPIC-O is marked DONE, the following are **HARD LOCKED**:

* Session enforcement rules
* Admin action boundaries

Any change requires explicit override approval and regression validation.

---

# END OF EPIC-O
