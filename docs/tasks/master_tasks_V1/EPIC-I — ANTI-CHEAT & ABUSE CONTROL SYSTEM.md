# EPIC-I — ANTI-CHEAT & ABUSE CONTROL SYSTEM

> Scope: **Session integrity, abuse detection, classification, and enforcement**.
> No GitHub setup, no verification runner internals, no preview hosting.
> This epic is **parallel-safe** with EPIC-A through EPIC-H.

---

## EPIC METADATA

* Epic ID: EPIC-I
* Parallel Group: ANTI_CHEAT
* File Ownership:

  * services/anti-cheat/**
  * services/integrity/**
* Lock Policy: HARD LOCK (trust & enforcement rules)
* Blast Radius: SYSTEM

---

## FEATURE I1 — Observation Layer (Data Collection)

1. Record all commits per lab session
2. Record commit timestamps
3. Record commit authorship
4. Record changed file paths per commit
5. Record step verification results
6. Record verification duration
7. Record number of attempts per step
8. Record snapshot preview creation events

---

## FEATURE I2 — Detection Layer (Signal Generation)

9. Detect step order violations
10. Detect skipped step completion
11. Detect forbidden file modifications
12. Detect test/config file edits
13. Detect force-push attempts
14. Detect excessive commit frequency
15. Detect unusually fast step completion
16. Detect single large commit patterns
17. Detect repeated identical diffs
18. Detect reused commit SHAs across users

---

## FEATURE I3 — Classification Layer (Session Integrity)

19. Define session integrity states
20. Assign default integrity state = CLEAN
21. Upgrade state to LOW_CONFIDENCE on soft signals
22. Upgrade state to SUSPICIOUS on multiple signals
23. Mark session INVALID on hard rule violations
24. Persist session integrity state
25. Prevent integrity downgrades without audit

---

## FEATURE I4 — Enforcement Layer (Actions)

26. Hide recruiter-shareable proof for LOW_CONFIDENCE sessions
27. Hide public proof for SUSPICIOUS sessions
28. Invalidate session on INVALID state
29. Block snapshot preview on INVALID state
30. Require session restart after invalidation
31. Preserve all attempts after enforcement

---

## FEATURE I5 — Rule Enforcement (Hard Constraints)

32. Enforce sequential step completion
33. Enforce allowed file scope per step
34. Enforce immutability of verification rules
35. Enforce one active session per repository
36. Enforce one verification job per commit

---

## FEATURE I6 — Audit & Logging

37. Write audit log for every detected signal
38. Write audit log for integrity state changes
39. Write audit log for enforcement actions
40. Store signal type and severity
41. Preserve audit immutability

---

## FEATURE I7 — Rate Limiting & Abuse Protection

42. Detect excessive verification retries
43. Apply cooldown on repeated failures
44. Throttle verification job creation
45. Throttle snapshot preview creation

---

## FEATURE I8 — Configuration & Policy

46. Define anti-cheat thresholds (internal config)
47. Define severity levels per signal
48. Allow per-lab rule customization
49. Disable manual overrides by default

---

## FEATURE I9 — Validation & Testing

50. Simulate step-skipping scenarios
51. Simulate forbidden file edits
52. Simulate commit flooding
53. Simulate diff reuse across sessions
54. Verify correct integrity classification
55. Verify enforcement actions trigger correctly

---

## EPIC-I COMPLETION CRITERIA

* All integrity signals recorded deterministically
* Session integrity states enforced correctly
* Abuse never results in false-positive PASS
* Audit logs immutable and complete

---

## LOCK DECLARATION (POST-COMPLETION)

After EPIC-I is marked DONE, the following are **HARD LOCKED**:

* Integrity classification rules
* Enforcement actions
* Signal severity mapping

Any change requires explicit override approval and full regression testing.

---

# END OF EPIC-I
