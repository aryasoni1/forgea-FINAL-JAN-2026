### FEATURE CONTEXT

- Epic: EPIC-B — DATABASE CORE & HARDENING
- Feature: B4 — Lesson System Tables
- Source: Agent Orchestrator Output

---

### TASKS CHECKED

23. Create `Lesson` table
24. Add unique `slug` to Lesson
25. Add difficulty enum to Lesson
26. Add status enum (DRAFT, PUBLISHED)
27. Add JSON `content` column for lesson body
28. Add timestamps to Lesson
29. Create `LessonVersion` table
30. Store immutable content snapshot in JSON
31. Link LessonVersion to Lesson
32. Enforce version ordering

---

### WHAT ALREADY EXISTS

- No Prisma `Lesson` or `LessonVersion` models found in /forgea-monorepo/packages/schema/prisma/schema.prisma.
- No Lesson-related tables found in existing Prisma migrations under /forgea-monorepo/packages/schema/prisma/migrations/.

---

### WHAT IS PARTIALLY IMPLEMENTED

- Not found.

---

### WHAT IS MISSING

- `Lesson` table/model with unique `slug`, difficulty enum, status enum, JSON `content`, and timestamps.
- `LessonVersion` table/model with immutable content snapshot JSON, relation to Lesson, and version ordering enforcement.
- Enums for difficulty and status (DRAFT, PUBLISHED).

---

### RISKS OR CONFLICTS

- None observed in existing schema; lesson tables are absent.

---

### QUESTIONS FOR CLARIFICATION

- None.

---

### NEXT AGENT HANDOFF PROMPT (MANDATORY)

You are the planner-architect for Feature B4 — Lesson System Tables (EPIC-B). Use the code scout report at docs/code-scout/EPIC-B — DATABASE CORE & HARDENING/B4_Lesson System Tables.md as source of truth. Produce the authoritative task document for Feature B4 under /docs/tasks/ following the required task document structure. Base requirements on EPIC-B tasks 23–32. No lesson tables or enums exist in the Prisma schema or migrations yet. Do not write code.
