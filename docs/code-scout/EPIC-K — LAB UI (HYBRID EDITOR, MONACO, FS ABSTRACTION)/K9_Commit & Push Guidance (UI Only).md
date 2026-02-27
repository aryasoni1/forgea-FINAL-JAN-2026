FEATURE CONTEXT

- Epic: EPIC-K — LAB UI (HYBRID EDITOR, MONACO, FS ABSTRACTION)
- Feature: K9 — Commit & Push Guidance (UI Only)
- Source: docs/agent_orchestrator_output/EPIC-K — LAB UI (HYBRID EDITOR, MONACO, FS ABSTRACTION)/K9_Commit & Push Guidance (UI Only).md


TASKS CHECKED

- Find candidate UI surfaces for placement of non-executing commit/push guidance (forgea-code-scout step in orchestrator).
- Confirm whether in-browser commit/push actions already exist in the UI.


WHAT ALREADY EXISTS

- forgea-monorepo/apps/forgea-labs/components/workspace/action-bar.tsx — `WorkspaceActionBar` renders a primary action group including a `Submit Proof` button (`onSubmitProof` prop). This is the clearest candidate surface for showing commit/push guidance to end users.
- forgea-monorepo/apps/forgea-labs/components/workspace/file-explorer.tsx — `FileExplorer` file-tree UI (client-side) where users browse files. Candidate surface for contextual guidance related to repository state or commit expectations.
- forgea-monorepo/apps/forgea-labs/components/workspace/monaco-editor.tsx — `MonacoEditor` visual editor area (placeholder). Candidate surface for guidance (editor-level banner, read-only overlays) when commits/pushes are relevant.
- forgea-monorepo/apps/forgea-labs/components/workspace/main-shell.tsx — `MainShell` composes the above components and wires `onSubmitProof`; it is the layout insertion point for global guidance UI.
- docs/agent_orchestrator_output/EPIC-K — contains the orchestrator task describing this work and identifies `planner-architect` as author of guidance content.
- Docs & specs elsewhere in the repo reference push/push-tracking, webhook payloads, and push audit flows (EPIC-F, EPIC-G, EPIC-H) indicating backend push semantics exist in the system documentation but are decoupled from the in-browser UI surfaces.


WHAT IS PARTIALLY IMPLEMENTED

- Visible UI triggers: `Submit Proof` button exists in `WorkspaceActionBar`, but it is wired only to an event prop; there is no in-repo commit/push implementation in the client UI discovered.
- Editor/file-tree areas are present and interactive, but they use static/mock data rather than exposing commit/push state or warnings.


WHAT IS MISSING

- No in-browser git commit or push controls were found (no client implementation or API routes exposing commit/push actions discovered in this repository).
- No guidance copy, CTAs, or prohibition language files for “commit and push” UI guidance were found (planner-architect deliverable expected).
- No explicit UI placement spec exists that lists exact screens/components and the required copy/CTA for each placement.
- No small FAQ snippet for common commit/push confusion (requested by orchestrator) was found.


RISKS OR CONFLICTS

- Confusion risk: `Submit Proof` label may be interpreted as performing a commit/push; without explicit guidance copy, users may misinterpret effects (local-only vs pushed remote commit) causing UX and audit confusion.
- Mismatch risk: Backend push/verification semantics are documented across EPIC-F / EPIC-G / EPIC-H, but UI currently lacks explicit signalling; implementers may implement inconsistent messaging unless planner provides canonical wording and prohibition language.
- Hidden dependency: Several docs reference webhook and push schemas (for audit and evidence). If UI guidance references these fields (e.g., `commitSha`) the planner must coordinate exact naming and contract to avoid mismatches.


QUESTIONS FOR CLARIFICATION

- None strictly required for producing the planner task doc; planner-architect should surface specific copy-level questions if needed.


NEXT AGENT HANDOFF PROMPT (MANDATORY)

Role: planner-architect

Context: This code-scout report documents candidate UI surfaces for commit/push guidance. Key facts: `WorkspaceActionBar` (apps/forgea-labs/components/workspace/action-bar.tsx) contains a `Submit Proof` button; file tree and editor components exist but are mock-backed; no client-side commit/push controls or guidance copy currently exist. Backend push / webhook / audit schemas are documented elsewhere (EPIC-F, EPIC-G, EPIC-H) but are not connected to the UI surfaces discovered.

Your task (do not implement):
- Produce `/docs/tasks/task-K9-<YYYY-MM-DD>.md` that the implementer will follow. The document MUST include:
  - Exact guidance copy: succinct instruction text shown in the UI (final copy for i18n-ready insertion). Provide primary message, secondary explanation, and a short FAQ snippet (3 FAQ items) for common commit/push confusion.
  - Clear prohibition language: explicit, developer-facing phrasing that implementation MUST show when the action is non-executing (e.g., "This UI is informational only — no commit or push will be performed by the browser").
  - CTAs: the exact buttons or links to display (label, size, and primary/secondary treatment) and the expected behavior for each CTA (open modal, show guidance, navigate to docs). Do NOT implement behavior — only define the CTA text and target.
  - Placement map: list the specific file/component locations (these are identified by this report) where guidance must be shown and the exact element within the component tree (for example: `WorkspaceActionBar` — show primary banner next to `Submit Proof` button; `MonacoEditor` — show top banner when unsaved edits exist; `FileExplorer` — contextual tooltip when users select file-paths that are considered "locked").
  - Acceptance checklist: short, testable items the implementer must validate (visual placement, copy match, CTAs wired to open approved modal, accessibility checks, mobile/responsive behavior, and that no in-browser git action is implemented). Include explicit edge-cases (offline, verification-in-progress, read-only labs) to validate.
  - Locked decisions: enumerate any phrasing, placement, or disabling rules the implementer MUST NOT change without planner approval.
  - Reference this code-scout report file path and any EPIC docs to consult (EPIC-F push schemas, EPIC-G push flow requirements) — do not restate backend schemas.

Stop after producing the task doc and wait for approval. Reference this code-scout report when delivering the task doc.


Report generated by forgea-code-scout on repository state.


"Handoff complete. Provide this report verbatim to the next agent."