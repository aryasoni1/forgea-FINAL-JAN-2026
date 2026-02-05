# EPIC-N — ADMIN CORE CONSOLE

> Scope: **Admin-only system visibility, control, and oversight console**.
> Covers users, sessions, content, anti-cheat signals, and system health.
> This epic is **parallel-safe** with all core epics.

---

## EPIC METADATA

* Epic ID: EPIC-N
* Parallel Group: ADMIN_CORE
* File Ownership:

  * apps/admin/**
  * services/admin-core/**
* Lock Policy: SOFT LOCK (controls stable, UI evolvable)
* Blast Radius: SYSTEM

---

## FEATURE N1 — Admin Access & Security

1. Define ADMIN role and permissions
2. Restrict Admin Core Console routes to ADMIN role
3. Implement admin authentication middleware
4. Enforce session validation for admin actions
5. Log all admin access attempts

---

## FEATURE N2 — Admin Dashboard Foundation

6. Create Admin Core Console layout
7. Display high-level system status overview
8. Display counts for users, labs, lessons, sessions
9. Show recent critical events summary

---

## FEATURE N3 — User Management

10. List all users with role and status
11. View individual user details
12. View user lab sessions
13. View user verification history
14. View user integrity / trust state
15. Disable or suspend user account
16. Reinstate suspended user account

---

## FEATURE N4 — Lab & Session Oversight

17. List all lab sessions (active, completed, invalid)
18. View lab session details
19. View step completion per session
20. View verification attempts per session
21. View snapshot preview links (read-only)
22. Force terminate a lab session (admin-only)

---

## FEATURE N5 — Lesson & Content Oversight

23. List all lessons with version and status
24. View lesson content metadata
25. View linked labs per lesson
26. View lesson usage statistics
27. Deprecate lesson (admin-only)

---

## FEATURE N6 — Anti-Cheat & Abuse Monitoring

28. List sessions flagged for suspicious activity
29. View detected anti-cheat signals per session
30. View enforcement actions taken
31. Manually invalidate session (admin-only)
32. Escalate session for review

---

## FEATURE N7 — Audit Logs & Compliance

33. View system-wide audit logs
34. Filter audit logs by entity and action
35. Search audit logs by user or session
36. Preserve audit logs immutably

---

## FEATURE N8 — System Configuration (Read / Limited Write)

37. View global system configuration
38. View feature flags (read-only)
39. Toggle admin-approved feature flags
40. Validate config changes before apply

---

## FEATURE N9 — Error & Incident Monitoring

41. View recent system errors
42. View verification engine failures
43. View webhook delivery failures
44. Correlate errors with sessions or users

---

## FEATURE N10 — Internal Tooling & DX

45. Add admin search across entities
46. Add filters and sorting for large datasets
47. Paginate admin tables
48. Display safe system diagnostics

---

## EPIC-N COMPLETION CRITERIA

* Admins have full read visibility across system state
* Destructive actions are gated and audited
* No admin action bypasses invariants

---

## LOCK DECLARATION (POST-COMPLETION)

After EPIC-N is marked DONE, the following are **SOFT LOCKED**:

* Admin permissions model
* Destructive admin workflows

UI enhancements allowed without changing authority boundaries.

---

# END OF EPIC-N
