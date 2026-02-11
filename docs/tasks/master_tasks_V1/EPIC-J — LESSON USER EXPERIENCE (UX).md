# EPIC-J — LESSON USER EXPERIENCE (UX)

> Scope: **Rendering, navigation, progress tracking, and UX controls for lessons**.
> Lessons are static, read-optimized, and lab-gated.
> This epic is **parallel-safe** with EPIC-A, EPIC-B, EPIC-C, EPIC-D, EPIC-E, EPIC-F, EPIC-G, EPIC-H, EPIC-I.

---

## EPIC METADATA

- Epic ID: EPIC-J
- Parallel Group: LESSONS_UX
- File Ownership:
  - apps/lessons/\*\*

- Lock Policy: SOFT LOCK (UI evolves, structure controlled)
- Blast Radius: ZONE

---

## FEATURE J1 — Project & Tooling Setup

1. Create `apps/lessons` Astro project
2. Enable MDX integration in Astro
3. Configure static site generation
4. Disable global JavaScript by default
5. Configure partial hydration (Astro Islands)
6. Add build-time lesson validation step

---

## FEATURE J2 — Lesson Content Architecture

7. Create lesson directory structure by domain
8. Enforce one lesson per MDX file
9. Store lesson metadata in MDX frontmatter
10. Store lesson content only in Git
11. Define lesson versioning strategy
12. Prevent raw HTML lessons in database

---

## FEATURE J3 — MDX Schema & Validation

13. Define required frontmatter fields
14. Validate frontmatter at build time
15. Enforce fixed section order
16. Reject missing or extra sections
17. Reject solution-like code blocks
18. Reject explicit filenames or step-by-step fixes
19. Add CI check for lesson structure

---

## FEATURE J4 — Routing & Rendering

20. Generate static lesson routes
21. Implement `/lessons/:domain/:lessonId` routing
22. Pre-render all lessons at build time
23. Ensure lessons render without JavaScript
24. Handle 404 for invalid lesson routes

---

## FEATURE J5 — Lesson Layout (UI)

### Left Sidebar (Section Navigation)

25. Build section navigation component
26. Highlight active section
27. Show per-section completion state
28. Prevent skipping to final section early
29. Persist scroll position

### Main Content Area

30. Design readable typography for low bandwidth
31. Implement callout components (trap, model, incident)
32. Disable inline code editor
33. Limit syntax highlighting usage

### Right Context Panel

34. Render career relevance metadata
35. Render related system tags
36. Hide context panel on small screens

---

## FEATURE J6 — Lesson Progress Tracking

37. Track section visibility (IntersectionObserver)
38. Mark section complete after read threshold
39. Persist lesson progress to backend
40. Resume lesson from last position
41. Handle offline progress sync

---

## FEATURE J7 — Lesson → Lab Transition UX

42. Build lesson completion gate
43. Create lesson-to-lab transition screen
44. Display lab objective summary
45. Display lab constraints summary
46. Display allowed file list
47. Require constraint acknowledgement
48. Enable “Enter Lab” only after lesson completion

---

## FEATURE J8 — Performance & 3G Optimization

49. Keep lesson JS payload under size budget
50. Self-host fonts
51. Optimize images and media
52. Avoid client-side routing
53. Achieve Lighthouse score ≥ 90 on 3G profile

---

## FEATURE J9 — Anti-Cheat & Quality Controls (Lesson Level)

54. Prevent solution leakage in lesson content
55. Disable code copying (optional)
56. Watermark lesson content subtly
57. Rate-limit lesson fetch endpoints
58. Hide lesson content from public APIs
59. Enforce human review before publish

---

## EPIC-J COMPLETION CRITERIA

- Lessons load and read smoothly on 3G
- No solution leakage in content
- Lesson completion gates lab access
- UX is static, predictable, and low-bandwidth friendly

---

## LOCK DECLARATION (POST-COMPLETION)

After EPIC-J is marked DONE, the following are **SOFT LOCKED**:

- Lesson routing structure
- MDX schema validation rules
- Progress tracking logic

UI refinements allowed without structural changes.

---

# END OF EPIC-J
