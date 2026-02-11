# EPIC-D — LESSON CREATION SYSTEM

> Scope: **Lesson strategy, generation, validation, storage, and serving**.
> Lessons are structured, versioned, and lab-linked.
> This epic is **parallel-safe** with EPIC-A (Monorepo), EPIC-B (DB), EPIC-C (Auth).

---

## EPIC METADATA

- Epic ID: EPIC-D
- Parallel Group: LESSONS_UX
- File Ownership:
  - apps/lessons/\*\*
  - services/lessons/\*\*
  - packages/lesson-schema/\*\*

- Lock Policy: SOFT LOCK (content evolves, schema controlled)
- Blast Radius: ZONE

---

## FEATURE D1 — Strategy & Scope Definition

1. Define Forgea lesson philosophy
2. Decide lessons vs blogs split
3. Select first 3 high-ROI learning tracks
4. Define lesson inclusion criteria
5. Define topics explicitly excluded from lessons

---

## FEATURE D2 — Canonical Lesson Template

6. Design canonical Lesson JSON schema
7. Define required lesson fields
8. Define optional lesson fields
9. Define lesson difficulty enum
10. Define lesson prerequisites structure
11. Define lab linkage structure (`lab_intents`)
12. Freeze Lesson schema v1
13. Mark human-only editable fields
14. Mark AI-editable fields

---

## FEATURE D3 — Knowledge Ingestion

15. Curate trusted source list
16. Build constrained documentation scraper
17. Normalize scraped content
18. Attach metadata to scraped sources
19. Store raw reference data separately

---

## FEATURE D4 — Vector Database & RAG

20. Choose vector database (Chroma)
21. Define content chunking rules
22. Generate embeddings with metadata
23. Store embeddings in vector DB
24. Define RAG retrieval constraints
25. Build context inspection tool

---

## FEATURE D5 — Prompt System

26. Design section-level prompt templates
27. Define strict output length constraints
28. Define anti-hallucination rules
29. Enforce single-section generation per prompt
30. Require source grounding per section
31. Version prompt definitions

---

## FEATURE D6 — Lesson Generation Engine

32. Generate lessons from canonical template
33. Populate sections using prompt system
34. Enforce schema validation on output
35. Attach lab intents to lessons
36. Assign lesson version
37. Assign review status (DRAFT / REVIEW / LOCKED)
38. Store generated lesson content

---

## FEATURE D7 — Validation & Review

39. Validate lesson against schema
40. Run automated quality checks
41. Detect missing or weak sections
42. Support partial regeneration of sections
43. Human review and approval
44. Lock approved lesson versions

---

## FEATURE D8 — Storage & Versioning

45. Store lesson metadata in database
46. Store lesson content as JSON or MDX
47. Version lesson content immutably
48. Preserve old lesson versions
49. Link lessons to labs and tracks

---

## FEATURE D9 — Serving & Rendering

50. Expose lesson read API
51. Enforce access control on lessons
52. Render lessons in UI
53. Support lesson navigation
54. Enforce lesson → lab gating rules

---

## FEATURE D10 — Blog System (Optional)

55. Define blog content scope
56. Separate blog schema from lessons
57. Generate blog content independently
58. Publish blogs publicly

---

## FEATURE D11 — Explicitly Out of Scope (Now)

59. Exclude adaptive learning
60. Exclude user-generated lessons
61. Exclude ratings and comments
62. Exclude AI-decided difficulty

---

## EPIC-D COMPLETION CRITERIA

- All lesson schemas frozen
- Lessons generated deterministically
- Lessons linked to labs
- Content versioning enforced

---

## LOCK DECLARATION (POST-COMPLETION)

After EPIC-D is marked DONE, the following are **SOFT LOCKED**:

- Lesson schema v1
- Prompt templates

Content additions allowed without schema changes.

---

# END OF EPIC-D
