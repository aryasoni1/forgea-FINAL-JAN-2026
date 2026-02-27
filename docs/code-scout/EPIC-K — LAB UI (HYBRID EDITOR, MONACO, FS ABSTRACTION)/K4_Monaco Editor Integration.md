# FEATURE CONTEXT

- Epic: EPIC-K — LAB UI (HYBRID EDITOR, MONACO, FS ABSTRACTION)
- Feature: K4 — Monaco Editor Integration
- Source: docs/agent_orchestrator_output/EPIC-K — LAB UI (HYBRID EDITOR, MONACO, FS ABSTRACTION)/K4_Monaco Editor Integration.md

---

## TASKS CHECKED

(Tasks taken from docs/tasks/master_tasks_V1/EPIC-K — LAB UI (HYBRID EDITOR, MONACO, FS ABSTRACTION).md)

- 23. Initialize Monaco Editor
- 24. Configure language mode per file
- 25. Load file content on selection
- 26. Enable syntax highlighting
- 27. Disable terminal access
- 28. Disable extensions
- 29. Disable arbitrary filesystem writes
- 30. Enforce read-only mode for protected files

---

## WHAT ALREADY EXISTS

- /forgea-monorepo/apps/forgea-labs/package.json — Declares a dependency on `@monaco-editor/react` (version: `latest` in package.json; pnpm-lock shows `@monaco-editor/react@4.7.0` and `monaco-editor@0.55.1`).
- /forgea-monorepo/apps/forgea-labs/components/workspace/monaco-editor.tsx — Present source component named `MonacoEditor`; currently a custom/static code viewer using hard-coded `codeExamples`, renders line numbers and a code `<pre>` block, and shows a visual "locked" overlay when `isLocked` is true. It does not import or use `@monaco-editor/react` or the Monaco API.
- /forgea-monorepo/apps/forgea-labs/components/workspace/main-shell.tsx — Integrates `MonacoEditor` into the workspace layout and passes `selectedFile` and `isLocked` props; simulates verification flows that toggle `isLocked`.
- /forgea-monorepo/pnpm-lock.yaml — Lockfile entries showing installed `@monaco-editor/react@4.7.0` and `monaco-editor@0.55.1`.
- docs/agent_orchestrator_output/EPIC-K — LAB UI (HYBRID EDITOR, MONACO, FS ABSTRACTION)/K4_Monaco Editor Integration.md — Agent Orchestrator feature descriptor (source for this task).
- docs/tasks/master_tasks_V1/EPIC-K — LAB UI (HYBRID EDITOR, MONACO, FS ABSTRACTION).md — Master task list containing FEATURE K4 and tasks 23–30.

---

## WHAT IS PARTIALLY IMPLEMENTED

- `@monaco-editor/react` is declared as a dependency and locked in the pnpm lockfile, but no source file currently uses the package API.
- A `MonacoEditor` component exists but is a placeholder/static viewer rather than a Monaco-based editor. It provides a visual lock overlay when `isLocked` is true (partial enforcement of read-only UX), but does not implement true read-only enforcement at the editor/control level.
- `main-shell.tsx` wires the editor into the UI and toggles `isLocked` during verification simulation — integration points exist for hooking into real editor behavior.

---

## WHAT IS MISSING

(From the FEATURE K4 task list — explicit not implemented in source)

- No initialization of the real Monaco Editor API or use of `@monaco-editor/react` in source.
- No implementation for configuring language mode per file (task 24).
- No mechanism to load file content from the backend on selection; current `MonacoEditor` uses in-repo `codeExamples` hardcoded data (task 25).
- No syntax highlighting via Monaco (task 26) — only static `<pre>` rendering exists.
- No explicit controls or documented enforcement to disable terminal access (task 27). The UI currently does not surface a terminal, but there is no policy or implementation preventing adding one.
- No explicit disabling of Monaco extensions or plugin capabilities (task 28).
- No safeguards documented or implemented to prevent arbitrary filesystem writes initiated from the editor (task 29).
- Read-only enforcement for protected files is only visual (opacity/overlay); there is no editor-level prevention or server-side enforcement referenced (task 30).
- No internal docs or config found that enumerate forbidden Monaco capabilities (the orchestrator suggests this but it is not present).
- No docs found that explicitly address Monaco licensing or required runtime worker configuration (Not found in repo sources scanned).

---

## RISKS OR CONFLICTS

- Dependency drift/confusion: `@monaco-editor/react` is listed in `package.json` but the codebase currently contains a non-Monaco placeholder component. This may confuse implementers or cause a failed integration if the placeholder is swapped without adding required Monaco loader/worker configs.
- Security/sandbox risk: Switching to a full Monaco integration without explicit capability restrictions (disable terminal, extensions, FS writes) could enable unintended execution paths or data exfiltration from the in-browser editor.
- Build/runtime risk: Monaco requires worker configuration and bundler adjustments (web workers, loader). No build config or notes found in app source that handle Monaco workers (e.g., custom webpack/next config), which may be required for a functioning editor.

---

## QUESTIONS FOR CLARIFICATION

- None strictly required for the planner to proceed; see "What is missing" for concrete gaps. If the planner needs policy decisions (which capabilities must be forbidden), consult the orchestrator note that a short, reusable list of forbidden Monaco capabilities would speed decisions.

---

## NEXT AGENT HANDOFF PROMPT

(For the `planner-architect` agent — consume this report and the EPIC master tasks file)

Planner-architect prompt (copy-paste-ready):

You are `planner-architect`. Use this code-scout report at `docs/code-scout/EPIC-K — LAB UI (HYBRID EDITOR, MONACO, FS ABSTRACTION)/K4_Monaco Editor Integration.md` along with the EPIC master task list at `docs/tasks/master_tasks_V1/EPIC-K — LAB UI (HYBRID EDITOR, MONACO, FS ABSTRACTION).md` to produce a task specification file at `docs/tasks/task-K4-<YYYY-MM-DD>.md`.

Your output MUST contain:
- A clear list of allowed editor capabilities and explicitly forbidden capabilities (the orchestrator requires: disable terminal, disable extensions, disable arbitrary filesystem writes). Enumerate any additional capability restrictions you require to meet security goals.
- Acceptance criteria mapping to FEATURE K4 tasks 23–30 from the EPIC master file.
- A brief list of required repository changes (file-level) that implementers will need to perform (refer only to the files and gaps listed in this code-scout report; do NOT design the implementation or propose code).
- Any environment/build notes that must be considered (e.g., monaco worker config, bundler changes) — factual only, call out if you need a follow-up from another agent.

Do NOT propose implementation-level solutions in the planner deliverable; produce a concise, actionable task document for implementers that references this code-scout report.

---

Handoff complete. Provide this report verbatim to the next agent.
