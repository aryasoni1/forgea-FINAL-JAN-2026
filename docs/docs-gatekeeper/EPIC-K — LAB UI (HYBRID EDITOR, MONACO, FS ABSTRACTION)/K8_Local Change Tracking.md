### FEATURE CONTEXT

- Epic: EPIC-K — LAB UI (HYBRID EDITOR, MONACO, FS ABSTRACTION)
- Feature: K8 — Local Change Tracking
- Exact input files read:
  - /Users/aryasoni/Desktop/Forgea/docs/agent_orchestrator_output/EPIC-K — LAB UI (HYBRID EDITOR, MONACO, FS ABSTRACTION)/K8_Local Change Tracking.md
  - /Users/aryasoni/Desktop/Forgea/docs/code-scout/EPIC-K — LAB UI (HYBRID EDITOR, MONACO, FS ABSTRACTION)/K8_Local Change Tracking.md
  - /Users/aryasoni/Desktop/Forgea/docs/master_docs.md
  - /Users/aryasoni/Desktop/Forgea/docs/official-docs-registry.md

### REQUIRED OFFICIAL DOCUMENTATION

- Technology: monaco-editor
  - Concept: In-browser editor embedding, model change events, and lifecycle cleanup
  - Official source: https://github.com/microsoft/monaco-editor (and https://microsoft.github.io/monaco-editor/)
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: Implementation must follow supported embedding APIs and worker/bundler guidance to safely host an interactive editor.
  - Decision informed: Editor integration approach (embed vs. lightweight viewer), event hooks for dirty tracking.
  - What breaks without it: Incorrect worker configuration, memory leaks, broken language services and unreliable change events.

- Technology: @monaco-editor/react
  - Concept: React integration patterns and lifecycle hooks for Monaco in React apps
  - Official source: https://github.com/suren-atoyan/monaco-react
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: Defines recommended usage patterns (props, disposal) and avoids common React/Monaco lifecycle bugs.
  - Decision informed: Which wrapper patterns and cleanup semantics to adopt for autosave and event wiring.
  - What breaks without it: Memory/worker leaks, double-event handlers, incorrect readOnly toggles.

- Technology: Window.beforeunload (navigation unload semantics)
  - Concept: Browser unload/navigation warning behavior and permitted handler semantics
  - Official source: https://developer.mozilla.org/en-US/docs/Web/API/Window/beforeunload
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: Guides reliable cross-browser UX for navigation warnings and allowed user prompts.
  - Decision informed: Whether to use `beforeunload` or in-app routing guards and exact message behavior.
  - What breaks without it: Inconsistent navigation warnings leading to unexpected data loss.

- Technology: Web Storage / localStorage (WHATWG HTML Web Storage)
  - Concept: Client-side persistence semantics for session vs durable storage
  - Official source: https://html.spec.whatwg.org/multipage/webstorage.html
  - Exact version requirement: LIVING STANDARD — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: Determines durability guarantees, quota, string-only values, and synchronous behaviour.
  - Decision informed: Whether localStorage is acceptable for draft persistence or if IndexedDB is required.
  - What breaks without it: Incorrect assumptions about persistence across tabs or large payload storage.

- Technology: IndexedDB API
  - Concept: Durable, asynchronous client-side storage for larger draft persistence and structured data
  - Official source: https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: Required if drafts must be durable across sessions and support larger payloads or structured metadata.
  - Decision informed: Persistence adapter selection (localStorage vs IndexedDB vs server sync).
  - What breaks without it: Poor offline durability or data loss when localStorage quotas are exceeded.

### EXISTING INTERNAL DOCS (VERIFIED)

- /Users/aryasoni/Desktop/Forgea/docs/agent_orchestrator_output/EPIC-K — LAB UI (HYBRID EDITOR, MONACO, FS ABSTRACTION)/K8_Local Change Tracking.md
  - Coverage status: PARTIAL
  - Exact gaps: Execution plan exists but lacks persistence scope decision (session vs server) and UX acceptance criteria (autosave cadence, debounce, UI indicators).

- /Users/aryasoni/Desktop/Forgea/docs/code-scout/EPIC-K — LAB UI (HYBRID EDITOR, MONACO, FS ABSTRACTION)/K8_Local Change Tracking.md
  - Coverage status: PARTIAL
  - Exact gaps: Code-level scan found missing dirty-state hooks, beforeunload handlers, and no persistence adapters; does not specify acceptance tests or operator docs.

- /Users/aryasoni/Desktop/Forgea/docs/master_docs.md
  - Coverage status: PARTIAL
  - Exact gaps: Registry contains Monaco integration entries but no K8 task/doc entry prior to this update.

- /Users/aryasoni/Desktop/Forgea/docs/official-docs-registry.md
  - Coverage status: PARTIAL
  - Exact gaps: Monaco entries present and verified; browser-storage and unload APIs currently not listed specifically for K8 and must be added.

### DOCUMENTATION COVERAGE DECISION

⚠️ DOCUMENTATION PARTIAL — EXTENSION REQUIRED

The existing internal docs (orchestrator + code-scout) identify the need and high-level plan but do not specify the persistence scope, autosave semantics, UX acceptance criteria, or operator runbooks. The registries must be extended with canonical web-API references (beforeunload, Web Storage, IndexedDB) and a targeted internal how-to for implementers and operators.

### STUDY GUIDE FOR HUMAN

- `monaco-editor` embedding: Why — Provides the editor runtime and model event hooks used to detect changes. Alternatives — lightweight viewer or CodeMirror; use Monaco when language services or large-file UX required. When NOT to use — simple read-only viewers or tiny payload editors. Common mistakes — failing to wire disposal/worker config, relying on DOM-only change detection instead of Monaco model events.

- `@monaco-editor/react`: Why — React lifecycle guidance to avoid double mounts and leaks. Alternatives — manual integration using `monaco-editor` API. When NOT to use — non-React or server-rendered-only contexts. Common mistakes — not disposing editors on unmount, re-creating models on every render.

- `beforeunload`: Why — last-resort browser navigation guard. Alternatives — in-app routing guards and explicit save buttons. When NOT to use — to replace clear UX that explains save state; overuse causes noisy prompts. Common mistakes — assuming custom message text is shown (browsers suppress custom text); over-triggering prompts for transient edits.

- `localStorage` vs `IndexedDB`: Why — choose localStorage for tiny, ephemeral drafts and IndexedDB for durable, larger payloads and structured metadata. Alternatives — server-side draft APIs for cross-device persistence. When NOT to use localStorage — storing large blobs or when atomic multi-key transactions are required. Common mistakes — synchronous writes on hot paths (blocking UI), ignoring quota errors, and not versioning stored drafts.

### INTERNAL DOCS TO ADD OR EXTEND

Only the minimum set required to proceed safely is listed here. Add under `/docs/official-docs/EPIC-K/`.

- Path: /docs/official-docs/EPIC-K/K8_persistence_and_dirty_state.md
  - Purpose: Canonical spec for K8 implementation decisions: session vs durable persistence, draft schema, autosave cadence, debounce rules, save-on-blur behavior, and UX indicators.
  - Exact knowledge to add: API examples for `useAutosave` hook, error paths (quota, serialization), migration/versioning strategy for stored drafts, acceptance tests, and security considerations (sanitization, PII handling).
  - Required version pin: Pin `monaco-editor` and `@monaco-editor/react` versions used by `apps/forgea-labs` and record them in this doc.

- Path: /docs/official-docs/EPIC-K/K8_operator_howto.md
  - Purpose: Operational runbook for operators and documenter-historian: backup/restore, clear-draft tooling, and data retention policy if server-backed persistence is chosen.
  - Exact knowledge to add: DB schema (if server persistence), migration steps, retention and purge rules, and troubleshooting steps for stuck save queues.
  - Required version pin: VERSION UNKNOWN — reference pinned client library versions.

### OPEN QUESTIONS / AMBIGUITIES

- Persistent scope: Should drafts be session-only (in-memory/localStorage) or durable across sessions (server-backed)? Planner-Architect must choose.
- Editor runtime: Is Monaco intended to be enabled interactively, or will a lightweight static viewer remain the default? Implementation differs significantly.
- Acceptance criteria: Exact autosave cadence, debounce windows, and how unsaved counts should surface in the UI need explicit values.

### MASTER DOCS REGISTRY ACTION

Append the following entry to `/docs/master_docs.md` (exact text):

- Epic / Feature: EPIC-K / K8 — Local Change Tracking
  - Doc path: /docs/docs-gatekeeper/EPIC-K — LAB UI (HYBRID EDITOR, MONACO, FS ABSTRACTION)/K8_Local Change Tracking.md
  - Status: ADDED (EXTEND)
  - Reason: Docs Gatekeeper brief enumerating required official docs, internal doc gaps, and registry updates for client-side dirty-state, autosave, and persistence decisions.
  - Date: 2026-02-15
