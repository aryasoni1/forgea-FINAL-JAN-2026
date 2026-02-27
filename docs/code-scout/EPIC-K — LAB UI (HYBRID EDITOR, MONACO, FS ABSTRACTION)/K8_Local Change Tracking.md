### FEATURE CONTEXT

- Epic: EPIC-K — LAB UI (HYBRID EDITOR, MONACO, FS ABSTRACTION)
- Feature: K8 — Local Change Tracking
- Source: docs/agent_orchestrator_output/EPIC-K — LAB UI (HYBRID EDITOR, MONACO, FS ABSTRACTION)/K8_Local Change Tracking.md

### TASKS CHECKED

- From the Agent Orchestrator output attached to this feature, I verified the primary tasks for this feature:
  - Step 1: `forgea-code-scout` identifies current client-side state handling.

### WHAT ALREADY EXISTS

- Orchestrator output `docs/agent_orchestrator_output/EPIC-K — LAB UI (HYBRID EDITOR, MONACO, FS ABSTRACTION)/K8_Local Change Tracking.md` — describes required agents and execution plan.
- `forgea-monorepo/apps/forgea-labs/package.json` and `pnpm-lock.yaml` include `@monaco-editor/react` and `monaco-editor` entries (package present in dependencies).
- `forgea-monorepo/apps/forgea-labs/components/workspace/monaco-editor.tsx` — a workspace editor component exists; current implementation renders static `codeExamples` and a simple code viewer (no embedded Monaco runtime in this file).
- `forgea-monorepo/apps/forgea-labs/components/workspace/main-shell.tsx` — workspace container component that manages `WorkspaceState` including `selectedFile`, verification state, and UI flags; it passes `selectedFile` and `isLocked` into `MonacoEditor`.

### WHAT IS PARTIALLY IMPLEMENTED

- The workspace shell (`main-shell.tsx`) contains a client-side state object (`WorkspaceState`) and state updates for `selectedFile` and verification flags. This provides a basic selection and UI state model but does not include explicit dirty-state tracking, autosave, or persistence semantics.
- A superficial `MonacoEditor` UI component exists but is implemented as a static code viewer using in-file `codeExamples` rather than an interactive Monaco instance; the package dependency for Monaco is present in the repo but the component shown does not hook into a real editor API here.

### WHAT IS MISSING

- No evidence of a dirty-state model or autosave hooks in source under `forgea-monorepo/apps/forgea-labs/components/workspace/**` — specifically, no `useAutosave`, `saveDraft`, `unsavedChanges`, or similar hooks were found in the scanned source.
- No `beforeunload` / `onbeforeunload` handlers or navigation-unload handlers were found that would prevent accidental navigation away from unsaved changes.
- No persistence scope decision (session-only vs server-backed) or storage adapters (localStorage, IndexedDB, server API) tied to editor state were found.
- No tests or security acceptance criteria related to local change tracking were found for K8.

### RISKS OR CONFLICTS

- The presence of a Monaco package in dependencies but a static viewer component in `monaco-editor.tsx` indicates possible partial/placeholder implementation; planners and implementers should verify whether a full Monaco integration exists elsewhere or is planned.
- Without dirty tracking and unload protection, users may lose changes if an interactive editor is introduced without those controls. This is a product/UX risk rather than a code inconsistency currently present in source.

### QUESTIONS FOR CLARIFICATION

- Should local change tracking be session-only (in-memory/localStorage) or durable across sessions (server-side persistence)? The orchestrator's `planner-architect` task will need this scope to write a precise task doc.
- Is Monaco intended to be used interactively here, or is the static viewer an intentional lightweight replacement? Planner-architect may need confirmation.

### NEXT AGENT HANDOFF PROMPT (MANDATORY)

Planner-architect: reference this report at `docs/code-scout/EPIC-K — LAB UI (HYBRID EDITOR, MONACO, FS ABSTRACTION)/K8_Local Change Tracking.md` and the Agent Orchestrator output at `docs/agent_orchestrator_output/EPIC-K — LAB UI (HYBRID EDITOR, MONACO, FS ABSTRACTION)/K8_Local Change Tracking.md`.

Findings summary for your use:
- I scanned `forgea-monorepo/apps/forgea-labs/**` and found a workspace shell (`main-shell.tsx`) that manages `WorkspaceState` and a `monaco-editor.tsx` component implemented as a static code viewer. The project includes the `@monaco-editor/react` dependency in package metadata.
- No dirty-state hooks, autosave behavior, or beforeunload handlers were found in the workspace components scanned.

Your assignment (produce a copy-paste-ready task doc):
- Create `/docs/tasks/task-K8-<YYYY-MM-DD>.md` that specifies the dirty-state model (ephemeral/session vs durable/server), autosave semantics (intervals, debounce, save-on-blur), navigation/unload warnings, how unsaved counts are surfaced in the UI, and required acceptance criteria.
- The task doc must reference this code-scout report and the orchestrator output. It must enumerate required review steps (docs-gatekeeper for UX guidance and document updates; documenter-historian for operator how-to), list required tests, and indicate preferred implementation locations (likely under `apps/forgea-labs/components/workspace/` and shared hooks in `packages/` if applicable).
- Do NOT implement in this task — author the specification only.

Deliverable: `/docs/tasks/task-K8-<YYYY-MM-DD>.md` (planner-architect should create this file and mark it ready for implementation and documentation reviews).

---

Report produced by forgea-code-scout. Scans performed against `forgea-monorepo/apps/forgea-labs/**` in the local workspace; key matches: package dependency entries for Monaco, `components/workspace/monaco-editor.tsx`, and `components/workspace/main-shell.tsx`.

Handoff complete. Provide this report verbatim to the next agent.
