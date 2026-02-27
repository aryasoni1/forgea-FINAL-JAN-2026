FEATURE CONTEXT
- Epic: EPIC-J — LESSON USER EXPERIENCE (UX)
- Feature: J6 — Lesson Progress Tracking
- Source: docs/agent_orchestrator_output/EPIC-J — LESSON USER EXPERIENCE (UX)/J6_Lesson Progress Tracking.md (Agent Orchestrator Output)


TASKS CHECKED
- Planner / Architect: define progress model, thresholds, API contract, offline-first sync behavior
- Implementer: frontend IntersectionObserver tracking, backend endpoints for persisting per-user per-lesson progress, resume and offline sync
- Integration Checker: automated integration tests for persistence and sync under flaky networks
- QA / Tester: test matrix (online, offline, resume, partial sync, corrupted payloads)
- Security Sentinel: rate-limiting, auth scopes, minimal exposure
- Documenter / Historian: API docs and front-end integration notes


WHAT ALREADY EXISTS
- docs/agent_orchestrator_output/EPIC-J — LESSON USER EXPERIENCE (UX)/J6_Lesson Progress Tracking.md — Agent Orchestrator attachment describing feature analysis, required agents, execution plan, and agent prompts.
- forgea-monorepo/apps/forgea-lessons/app/page.tsx (built output present under .next) — lesson application entry (server/client split) showing lesson UI exists.
- forgea-monorepo/apps/forgea-lessons/components/lesson-sidebar.tsx — lesson sidebar component referenced in build traces and app bundle (source referenced in build metadata).
- forgea-monorepo/apps/forgea-lessons/components/lesson-renderer.tsx — lesson content renderer referenced in build metadata.
- forgea-monorepo/apps/forgea-lessons/components/lesson-pagination.tsx — pagination controls for lessons referenced in build metadata.
- forgea-monorepo/apps/forgea-labs/components/workspace/mdx-sidebar.tsx — `MDXLessonSidebar` component used in workspace which likely overlaps UX surface for lessons.
- forgea-monorepo/apps/forgea-labs/(app)/resume-mapper/page.tsx (prebuilt/manifests present under .next) — a resume-mapper route exists in labs app (possible resume/restore UX integration point).


WHAT IS PARTIALLY IMPLEMENTED
- UI surface components for lessons exist (`lesson-sidebar`, `lesson-renderer`, `lesson-pagination`, `MDXLessonSidebar`) as part of the lessons/apps and labs/apps. These components appear in build traces and .next artifacts, but their source implementations were not read in full during this scan.
- IntersectionObserver usage exists in compiled chunks for link prefetch visibility and general UI behaviors; this suggests the codebase already uses visibility observers for UX optimizations, but not specifically a progress-tracking implementation (no explicit `lesson-progress` tracker found in search results).


WHAT IS MISSING
- Explicit progress data model (JSON schema) in source: Not found.
- Backend API endpoints for lesson progress persistence (e.g., `/api/lessons/:id/progress`): Not found in repository traces or app manifests.
- Offline-first sync logic or service worker integration for progress sync: Not found.
- Integration tests exercising progress persistence and sync under network flakiness: Not found.
- Documentation for progress API or front-end integration (developer guide): Not found.


RISKS OR CONFLICTS
- Potential UI overlap: Both `apps/forgea-lessons` and `apps/forgea-labs` reference lesson UIs and sidebars (e.g., `MDXLessonSidebar`), so feature must define where progress is authored vs. consumed to avoid duplication.
- Build artifacts (.next) contain IntersectionObserver usage for prefetching and visibility; care must be taken to avoid conflating existing observer logic with a separate progress-observer (avoid duplicate observers on the same elements).
- No authoritative progress model found in repo; implementing without a shared JSON schema risks diverging implementations across apps.


QUESTIONS FOR CLARIFICATION
- Which app is the primary source of truth for lesson progress persistence: `apps/forgea-lessons`, `apps/forgea-labs`, or a shared service in `services/`?
- Is progress intended to be a lightweight visibility-only metric (client-side) or a richer per-section completion model stored server-side?


NEXT AGENT HANDOFF PROMPT (MANDATORY)
You are Implementer (next agent). Use the factual findings in the code-scout report located at docs/code-scout/EPIC-J — LESSON USER EXPERIENCE (UX)/J6_Lesson Progress Tracking.md as your source of truth.

Tasks for you (do not design alternatives; follow repo truth):
- Confirm which app will own progress persistence (answer if it's `apps/forgea-lessons`, `apps/forgea-labs`, or request clarification). Reference this report when answering.
- If `apps/forgea-lessons` is the owner, implement frontend visibility tracking using IntersectionObserver inside the existing lesson renderer component at forgea-monorepo/apps/forgea-lessons/components/lesson-renderer.tsx. If `apps/forgea-labs` is owner, integrate into forgea-monorepo/apps/forgea-labs/components/workspace/mdx-sidebar.tsx instead. Reference this report when describing chosen file paths.
- Add backend endpoints for persisting and retrieving per-user per-lesson progress. Place endpoints in the existing backend area used by lessons (if no lessons backend exists, report back with "Not found" and request exact service location). Reference this report.
- Implement a minimal JSON schema for progress payloads and post it as a JSON file in the repo (path: docs/schemas/lesson-progress.schema.json) and reference it from the API route.
- Implement client-side offline buffering logic (localStorage) and simple retry-on-connect logic, and wire it to the chosen API route. Do not change cross-app UX boundaries without confirmation.
- Add basic integration tests validating save/retrieve and retry-on-network-reconnect under simulated offline conditions. Place tests near the owning app's test folder and reference this report.

Important constraints for Implementer (strict):
- Do not modify or remove existing lesson UI files except to add tracking hooks; preserve style and behavior.
- If an authoritative backend service for lessons is not found, stop and report "Not found" rather than guessing service locations.
- Reference this code-scout report in your PR and in-line comments so reviewers can validate assumptions.

Handoff complete. Provide this report verbatim to the next agent.