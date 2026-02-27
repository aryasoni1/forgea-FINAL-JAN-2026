# FEATURE CONTEXT

- Epic: EPIC-J — LESSON USER EXPERIENCE (UX)
- Feature: J5_Lesson Layout (UI)
- Source: Agent Orchestrator Output: [docs/agent_orchestrator_output/EPIC-J — LESSON USER EXPERIENCE (UX)/J5_Lesson Layout (UI).md](docs/agent_orchestrator_output/EPIC-J — LESSON USER EXPERIENCE (UX)/J5_Lesson Layout (UI).md)

---

### TASKS CHECKED

- UX Designer / Planner: define left sidebar, main content, right context panel behaviors (accessibility, 3G constraints).
- Implementer: implement layout components server-rendered for `apps/lessons`, minimize client JS, ensure no-JS usability.
- QA / Tester: validate typography, navigation, no-JS behavior, and low-bandwidth rendering.
- Documenter / Historian: publish component docs and authoring guidance.

---

### WHAT ALREADY EXISTS

- [forgea-monorepo/apps/forgea-lessons/.next/server/app/index.html](forgea-monorepo/apps/forgea-lessons/.next/server/app/index.html) — Built HTML showing a three-column layout: `<aside>` sidebar, main content area, and pagination/footer. This is a build artifact (server output), not source.

- [forgea-monorepo/apps/forgea-lessons/.next/server/app/page.js](forgea-monorepo/apps/forgea-lessons/.next/server/app/page.js) — Compiled server JS for the lessons app page; contains rendered logic for sidebar, lesson content, and pagination (build output).

- [forgea-monorepo/apps/forgea-lessons/tsconfig.tsbuildinfo](forgea-monorepo/apps/forgea-lessons/tsconfig.tsbuildinfo) — Build metadata referencing components such as `components/lesson-sidebar.tsx`, `components/lesson-renderer.tsx`, `components/lesson-pagination.tsx` (indicates these were part of a prior build).

- [forgea-monorepo/apps/forgea-labs/components/workspace/mdx-sidebar.tsx](forgea-monorepo/apps/forgea-labs/components/workspace/mdx-sidebar.tsx) — Client component implementing a lab/lesson sidebar UI (hints, callouts, metadata). Marked `use client` (client-side React).

- [forgea-monorepo/apps/forgea-admin/.next/server/app/index.html](forgea-monorepo/apps/forgea-admin/.next/server/app/index.html) — Admin UI build output showing a Lesson Manager UI with file tree, counts and sidebar patterns (useful for reference and patterns present in the repo).

- Repository-level config references: `packages/config/eslint.config.js` contains rules for `apps/forgea-lessons/**` (project present in workspace configuration).

---

### WHAT IS PARTIALLY IMPLEMENTED

- The lessons layout exists as build outputs under `apps/forgea-lessons/.next/` (rendered HTML and compiled JS), showing the intended three-column structure and pagination. However, those are artifacts produced by a prior build and do not constitute editable source components in the workspace.

- There are reusable sidebar-like implementations in other apps (`forgea-labs` client component and `forgea-admin` admin UI build outputs) that demonstrate UI patterns and class names.

---

### WHAT IS MISSING

- Source-level components and pages for the lessons app are not present in source form under `apps/forgea-lessons/` (only `.next`, `.turbo`, and build metadata exist). The following source files referenced by build metadata were not found as workspace source files:
  - components/lesson-sidebar.tsx (source: Not found)
  - components/lesson-renderer.tsx (source: Not found)
  - components/lesson-pagination.tsx (source: Not found)
  - `app/page.tsx` and `app/layout.tsx` source for `apps/forgea-lessons` (source: Not found)

- UX deliverables (wireframes, annotated component specs) are not present in the repository for J5.

- Explicit accessibility documentation and no-JS acceptance criteria for lesson layout are not present for this feature.

---

### RISKS OR CONFLICTS (observed facts)

- Build artifacts indicate the lessons UI sometimes bails out to client-side rendering (there is a `BAILOUT_TO_CLIENT_SIDE_RENDERING` template in the built HTML). This conflicts with the Implementer requirement to "use server-side rendering only; minimize client JS" (fact: build shows client-side bailout).

- Existing sidebar in `forgea-labs` is marked `use client` (client-side), which may not be directly reusable if the requirement is server-only components.

- Because source files for the lessons app are not present, any implementation work will either need source restored from another branch or reimplemented from scratch.

---

### QUESTIONS FOR CLARIFICATION

- None required to produce this factual repo report. If you want the UX agent to assume responsibility for missing source recovery vs new implementation, indicate preference.

---

### NEXT AGENT HANDOFF PROMPT (for UX Designer / Planner)

You are the UX Designer / Planner assigned next for EPIC-J → Feature J5 (Lesson Layout). Use this code-scout report as your single-source facts: [docs/code-scout/EPIC-J — LESSON USER EXPERIENCE (UX)/J5_Lesson Layout (UI).md](docs/code-scout/EPIC-J — LESSON USER EXPERIENCE (UX)/J5_Lesson Layout (UI).md).

Context & constraints (facts only):

- The repo contains build outputs showing a three-column lesson layout (`aside` sidebar, main content, pagination), but the editable source components for `apps/forgea-lessons` are not present in source form.
- There are existing client-side sidebar implementations in `apps/forgea-labs` and admin UI build outputs that demonstrate patterns.
- Implementer requirements (from the orchestrator output) are: server-rendered components for `apps/lessons`, avoid client-side routing, minimize JS payload, ensure components work without JS. QA must validate no-JS behavior and low-bandwidth (3G) rendering.

Your deliverables (produce these and attach to your agent response):

- Wireframes (left sidebar, main content, right context panel) at three breakpoints: desktop (3-column), tablet (two-column), mobile (single column). Annotate: active highlight behavior, per-section completion indicators, scroll persistence rules, and responsive hide rules for context panel.
- A concise component spec (one page) listing HTML structure, ARIA roles/labels, keyboard interactions, focus order, and semantic markup expectations for each component: `LessonSidebar`, `LessonContent`, `ContextPanel`, `LessonPagination`, and `Callout`.
- Accessibility acceptance criteria: contrast, heading structure, keyboard-only navigation, screen-reader labels, and behavior when JS is disabled.
- Performance acceptance criteria tuned for 3G: critical CSS size targets, allowed client JS bytes per page, and a prioritized server-rendered render path. Note that current build shows client bailout — mark this as a blocker for Implementer if server-only is required.

Constraints for your specs (do not implement code, only spec):

- Assume source for `apps/forgea-lessons` must be server-renderable and work without JS.
- Avoid recommending client-only interactive editors in the layout spec.
- Keep component contracts explicit so Implementer can implement in TypeScript/React server components.

Reference artifacts in this repo (for context only):

- Built lesson HTML: [forgea-monorepo/apps/forgea-lessons/.next/server/app/index.html](forgea-monorepo/apps/forgea-lessons/.next/server/app/index.html)
- Client sidebar example: [forgea-monorepo/apps/forgea-labs/components/workspace/mdx-sidebar.tsx](forgea-monorepo/apps/forgea-labs/components/workspace/mdx-sidebar.tsx)

Deliver the wireframes and component spec files as attachments or repo docs and list the filenames you produce in your agent response.

Handoff complete. Provide this report verbatim to the next agent.
