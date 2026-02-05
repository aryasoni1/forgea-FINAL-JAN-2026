# MASTER EPICS MAP — FORGEA (FINAL BASELINE)

> This file is the **single source of truth** for Forgea’s architecture.
> It lists **all approved epics**, their **correct names**, **parallel execution safety**, **zones (file ownership)**, and **lock semantics**.
> New epics must be compatible with this map.

---

## LEGEND

- **Parallel Group**: Epics in different groups can be worked on simultaneously
- **Zone / Files Touched**: Primary file-system ownership
- **Lock**:
  - HARD = must not change after completion
  - SOFT = logic stable, UI/config may evolve

---

## EPIC-A — MONOREPO & DEVELOPER TOOLING FOUNDATION

- Parallel Group: CORE_INFRA
- Can Run In Parallel With: EPIC-B onward
- Zone / Files Touched:
  - repo root
  - apps/\*\*
  - packages/\*\*
  - services/\*\*
  - tooling configs (pnpm, turbo, tsconfig, eslint)

- Lock: HARD
- Notes: Foundation layer, no business logic allowed

---

## EPIC-B — DATABASE CORE & HARDENING

- Parallel Group: DATA
- Can Run In Parallel With: EPIC-C, EPIC-D, EPIC-H
- Zone / Files Touched:
  - prisma/\*\*
  - services/db/\*\*
  - db triggers & migrations

- Lock: HARD
- Notes: Source of truth, immutability enforced

---

## EPIC-C — AUTHENTICATION & RBAC

- Parallel Group: AUTH
- Can Run In Parallel With: EPIC-B, EPIC-D, EPIC-H
- Zone / Files Touched:
  - services/auth/\*\*
  - middleware/auth.ts

- Lock: SOFT
- Notes: Session + role enforcement only

---

## EPIC-D — LESSON CREATION SYSTEM

- Parallel Group: CONTENT_CORE
- Can Run In Parallel With: EPIC-E, EPIC-J
- Zone / Files Touched:
  - packages/lesson-schema/\*\*
  - services/lessons/\*\*

- Lock: SOFT
- Notes: Schema-first, AI constrained

---

## EPIC-E — LAB CREATION SYSTEM (MANUAL + AI)

- Parallel Group: LAB_CORE
- Can Run In Parallel With: EPIC-D, EPIC-F
- Zone / Files Touched:
  - packages/labs/\*\*
  - packages/lab-templates/\*\*

- Lock: HARD
- Notes: Single-failure invariant, deterministic labs

---

## EPIC-F — GITHUB INTEGRATION FOR LABS

- Parallel Group: GITHUB
- Can Run In Parallel With: EPIC-E, EPIC-G
- Zone / Files Touched:
  - services/github/\*\*
  - services/webhooks/\*\*

- Lock: SOFT
- Notes: Repo ownership + protection rules

---

## EPIC-G — PUSH FLOW & SNAPSHOT PREVIEW

- Parallel Group: PREVIEW
- Can Run In Parallel With: EPIC-F, EPIC-H
- Zone / Files Touched:
  - services/push-flow/\*\*
  - services/preview/\*\*

- Lock: SOFT
- Notes: Verification-before-preview invariant

---

## EPIC-H — LAB TESTING & VERIFICATION ENGINE

- Parallel Group: VERIFICATION
- Can Run In Parallel With: EPIC-F, EPIC-G
- Zone / Files Touched:
  - services/verification/\*\*
  - services/runner/\*\*

- Lock: HARD
- Notes: Truth engine, commit SHA only

---

## EPIC-I — ANTI-CHEAT & ABUSE CONTROL SYSTEM

- Parallel Group: TRUST
- Can Run In Parallel With: EPIC-H, EPIC-L
- Zone / Files Touched:
  - services/anti-cheat/\*\*
  - services/integrity/\*\*

- Lock: HARD
- Notes: Session-level integrity, no user punishment

---

## EPIC-J — LESSON USER EXPERIENCE (UX)

- Parallel Group: LESSONS_UX
- Can Run In Parallel With: EPIC-D, EPIC-M
- Zone / Files Touched:
  - apps/lessons/\*\*

- Lock: SOFT
- Notes: Astro + MDX, low-bandwidth, no solutions

---

## EPIC-K — LAB UI (HYBRID EDITOR, MONACO, FS ABSTRACTION)

- Parallel Group: LAB_UI
- Can Run In Parallel With: EPIC-I, EPIC-M
- Zone / Files Touched:
  - apps/lab-ui/\*\*
  - packages/virtual-fs/\*\*

- Lock: SOFT
- Notes: Step-aware editing, strict FS rules

---

## EPIC-L — FRONTEND ↔ BACKEND INTEGRATION

- Parallel Group: INTEGRATION
- Can Run In Parallel With: EPIC-J, EPIC-K
- Zone / Files Touched:
  - apps/web/\*\*
  - services/api/\*\*

- Lock: SOFT
- Notes: Backend is sole source of truth

---

## EPIC-M — ADMIN CONTENT OPERATIONS

- Parallel Group: ADMIN_CONTENT
- Can Run In Parallel With: EPIC-N
- Zone / Files Touched:
  - apps/admin/\*\*
  - services/admin-content/\*\*

- Lock: SOFT
- Notes: Lesson & lab publishing workflows

---

## EPIC-N — ADMIN CORE CONSOLE

- Parallel Group: ADMIN_CORE
- Can Run In Parallel With: EPIC-M, EPIC-O
- Zone / Files Touched:
  - apps/admin/\*\*
  - services/admin-core/\*\*

- Lock: SOFT
- Notes: System-wide visibility & control

---

## EPIC-O — ADMIN SESSION OPERATIONS

- Parallel Group: ADMIN_SESSION
- Can Run In Parallel With: EPIC-N
- Zone / Files Touched:
  - services/admin-session/\*\*

- Lock: HARD
- Notes: Session integrity & forensics

---

# GLOBAL RULES

- Each file path has **one owning epic**
- No epic may mutate another epic’s HARD-LOCKED zone
- Commit SHA is the only execution truth
- Admins can observe and enforce, never modify outcomes

---

# END OF MASTER EPICS MAP
