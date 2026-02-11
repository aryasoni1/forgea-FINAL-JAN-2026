# EPIC-M — ADMIN CONTENT OPERATIONS

> Scope: **Admin-only content management for lessons and labs**.
> Covers creation, validation, versioning, publishing, and auditing.
> This epic is **parallel-safe** with all core epics.

---

## EPIC METADATA

- Epic ID: EPIC-M
- Parallel Group: ADMIN
- File Ownership:
  - apps/admin/\*\*
  - services/admin-content/\*\*

- Lock Policy: SOFT LOCK (workflows stable, UI evolvable)
- Blast Radius: ZONE

---

## FEATURE M1 — Admin Access & Roles

1. Define ADMIN role for content operations
2. Restrict admin routes to ADMIN role only
3. Add admin authentication guard middleware
4. Log all admin actions in audit logs

---

## FEATURE M2 — Lesson Management

5. List all lessons with status (Draft / Published / Deprecated)
6. Create new lesson entry (metadata only)
7. Edit lesson metadata (title, difficulty, tags)
8. Link lessons to one or more labs
9. Preview lesson content before publish
10. Publish lesson (lock content version)
11. Deprecate lesson (no deletion)
12. Prevent editing of published lesson versions

---

## FEATURE M3 — Lesson Content Editing (MDX)

13. Load lesson MDX source from repo
14. Open MDX editor for admins
15. Validate MDX frontmatter schema
16. Validate required section order
17. Detect disallowed content patterns
18. Show structural and content lint errors
19. Render live lesson preview
20. Block publish if validation fails

---

## FEATURE M4 — Lesson Quality Enforcement

21. Enforce minimum content length per section
22. Detect solution-like instructions
23. Detect excessive code blocks
24. Detect explicit filenames or step-by-step fixes
25. Require at least one linked lab
26. Require constraint alignment with labs

---

## FEATURE M5 — Lesson Versioning

27. Auto-increment lesson version on publish
28. Store previous lesson versions immutably
29. Allow viewing older lesson versions
30. Prevent deletion of historical versions
31. Track which lesson version users consumed

---

## FEATURE M6 — Lab Management (Admin View)

32. List all labs with difficulty and status
33. View lab configuration (`forgea.config.json`)
34. View step definitions per lab
35. Link and unlink lessons from labs
36. Validate lesson–lab contract consistency

---

## FEATURE M7 — Content Lifecycle Controls

37. Mark lessons as Draft by default
38. Prevent draft lessons from public access
39. Prevent deprecated lessons from new sessions
40. Preserve deprecated lessons for history

---

## FEATURE M8 — Audit & Compliance

41. Log lesson creation events
42. Log lesson publish events
43. Log lesson deprecation events
44. Log lesson–lab binding changes
45. Preserve admin audit logs immutably

---

## FEATURE M9 — Error Handling & Safeguards

46. Prevent concurrent edits on same lesson
47. Warn before publishing breaking changes
48. Fail closed on validation errors
49. Display non-leaking admin error messages

---

## FEATURE M10 — Internal Tooling & DX

50. Provide admin-only preview URLs
51. Add search and filter for lessons
52. Add search and filter for labs
53. Display content health indicators

---

## EPIC-M COMPLETION CRITERIA

- Admins can safely create, edit, publish, and deprecate content
- Published content is immutable and auditable
- Lesson–lab contracts enforced consistently

---

## LOCK DECLARATION (POST-COMPLETION)

After EPIC-M is marked DONE, the following are **SOFT LOCKED**:

- Content publishing workflows
- Validation rules
- Versioning logic

UI improvements allowed without changing content invariants.

---

# END OF EPIC-M
