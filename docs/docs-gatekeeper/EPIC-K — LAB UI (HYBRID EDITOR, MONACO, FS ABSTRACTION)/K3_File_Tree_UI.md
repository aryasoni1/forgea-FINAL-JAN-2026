### FEATURE CONTEXT

- Epic: EPIC-K — LAB UI (HYBRID EDITOR, MONACO, FS ABSTRACTION)
- Feature: K3 — File Tree UI
- Exact input files read:
  - /Users/aryasoni/Desktop/Forgea/docs/agent_orchestrator_output/EPIC-K — LAB UI (HYBRID EDITOR, MONACO, FS ABSTRACTION)/K3_File Tree UI.md
  - /Users/aryasoni/Desktop/Forgea/docs/code-scout/EPIC-K — LAB UI (HYBRID EDITOR, MONACO, FS ABSTRACTION)/K3_File Tree UI.md
  - /Users/aryasoni/Desktop/Forgea/docs/tasks/master_tasks_V1/EPIC-K — LAB UI (HYBRID EDITOR, MONACO, FS ABSTRACTION).md
  - forgea-monorepo/apps/forgea-labs/components/workspace/file-explorer.tsx
  - forgea-monorepo/apps/forgea-labs/components/workspace/monaco-editor.tsx
  - forgea-monorepo/apps/forgea-labs/components/workspace/main-shell.tsx

### REQUIRED OFFICIAL DOCUMENTATION

1) Technology: Monaco Editor (`monaco-editor` / `@monaco-editor/react`)
   - Official source: https://microsoft.github.io/monaco-editor/
   - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
   - Why required: Informs editor initialization, language modes, readonly APIs, and integration constraints used by K4/K3.
   - Decision it informs: How to safely enable/disable editing, configure language modes, and render overlays for read-only files.
   - What breaks without it: Misuse of editor APIs causing unsafe writes, inconsistent readOnly behavior, or large bundle regressions.

2) Technology: JSON Schema (payloads)
   - Official source: https://json-schema.org/specification.html (2020-12)
   - Exact version requirement: 2020-12
   - Why required: Standard for defining the file-tree API schema for backend → UI contract (tree nodes, metadata fields).
   - Decision it informs: Shape of tree responses, required/optional metadata keys, validation rules and tests.
   - What breaks without it: Mismatched backend/frontend contracts, fragile parsing, and spelling/field-name drift.

3) Technology: HTTP semantics / REST error classification
   - Official source: RFC 7231 — https://datatracker.ietf.org/doc/html/rfc7231
   - Exact version requirement: RFC 7231
   - Why required: Classify transient vs permanent errors for tree fetch endpoints and error UX semantics.
   - Decision it informs: Which errors are retried client-side, which surface explicit messages, and which block the workspace.
   - What breaks without it: Inconsistent retry behavior and poor UX on partial failures.

### EXISTING INTERNAL DOCS (VERIFIED)

- /Users/aryasoni/Desktop/Forgea/docs/code-scout/EPIC-K — LAB UI (HYBRID EDITOR, MONACO, FS ABSTRACTION)/K3_File Tree UI.md
  - Coverage status: PARTIAL
  - Exact gaps: Documents current code-state and missing runtime pieces but does not define UX invariants, metadata schema, or failure semantics.

- forgea-monorepo/apps/forgea-labs/components/workspace/file-explorer.tsx
  - Coverage status: PARTIAL
  - Exact gaps: Component demonstrates expand/collapse and selection UI but is backed by hardcoded `fileStructure` and lacks integration notes, expected tree shape, and metadata handling (hidden/read-only markers).

- forgea-monorepo/apps/forgea-labs/components/workspace/monaco-editor.tsx
  - Coverage status: PARTIAL
  - Exact gaps: Placeholder UI exists; no guidance on real `monaco` lifecycle, editor options, or read-only overlays.

- forgea-monorepo/apps/forgea-labs/components/workspace/main-shell.tsx
  - Coverage status: PARTIAL
  - Exact gaps: Wiring and selection flow present but no backend contract, error handling, or cache rules are specified.

### DOCUMENTATION COVERAGE DECISION

⚠️ DOCUMENTATION PARTIAL — EXTENSION REQUIRED

Docs to extend:
- `/docs/code-scout/EPIC-K — .../K3_File Tree UI.md`: extend with explicit UX invariants and a short acceptance checklist (hidden/read-only markers, selection rules, failure semantics).
- Add `/docs/official-docs/EPIC-K/file-tree-api-schema.md`: canonical JSON Schema for tree and node metadata (required fields, enums, and examples).
- Add `/docs/official-docs/EPIC-K/K3_UX_Invariants.md`: concise planner-facing invariants, failure modes, and locked decisions.

### STUDY GUIDE FOR HUMAN

- **Monaco Editor:** Why: provides embeddable editor API and readOnly primitives. Alternatives: CodeMirror, Ace — choose if Monaco bundle cost unacceptable. When NOT to use: very small/simple text editing needs. Common mistakes: enabling unsafe editor commands, failing to set `readOnly` per model, or re-initializing editor on every render.
- **File Tree API (JSON Schema):** Why: canonical contract reduces drift. Alternatives: ad-hoc REST shapes (avoid). When NOT to use: prototyping with hardcoded mock data only. Common mistakes: inconsistent field names (`isHidden` vs `hidden`), omitting `id`/`path` uniqueness, and missing `type` enum.
- **Hidden / Read-only markers (UX invariants):** Why: users must never see or edit forbidden files. Alternatives: client-side filtering (insufficient). When NOT to use: do not rely solely on client filtering for security. Common mistakes: visually hiding but leaving selection enabled; using ambiguous field types (string vs boolean).

### INTERNAL DOCS TO ADD OR EXTEND

1) Canonical File-Tree API Schema
   - Path: /docs/official-docs/EPIC-K/file-tree-api-schema.md
   - Purpose: Provide JSON Schema for `/api/files/tree` responses and `GET /api/files/:path` file metadata payloads.
   - Exact knowledge to add: canonical `FileNode` schema (fields left intentionally minimal here — implementer to follow schema doc): `id`, `path`, `name`, `type` (file|directory), `size`, `mimeType`, `isHidden`, `isReadOnly`, `stepIds` (array), `childrenCount` (optional), `etag`/`sha` (optional), and sample payloads for large trees and pagination.
   - Required version pin: 2020-12 (JSON Schema)

2) UX Invariants & Failure Modes (Planner doc)
   - Path: /docs/official-docs/EPIC-K/K3_UX_Invariants.md
   - Purpose: Enumerate invariants implementers MUST follow (hidden/read-only semantics, selection-disable rules, exact error messages, and UX for transient failures).
   - Exact knowledge to add: boolean semantics for `isHidden` & `isReadOnly`, selection behavior for hidden vs read-only, UX copy for errors (403 vs 404 vs 503), caching and ETag rules, and telemetry events to emit on blocked access.
   - Required version pin: VERSION UNKNOWN — pin when published

### OPEN QUESTIONS / AMBIGUITIES (BLOCKERS)

1) Metadata key names and semantics — confirm canonical keys for `isHidden`, `isReadOnly`, `stepIds`, and whether `hidden` is absolute (server-enforced) or only a UI hint.
2) Pagination / large-tree handling — must the API support paging or streaming for repositories >10k files?
3) Error-code mapping — confirm which HTTP status codes map to which user messages and retry behaviors (client should not guess).
4) Permission model — is edit permission per-file or per-path prefix? Are permissions returned as part of node metadata or a separate endpoint?

### MASTER DOCS REGISTRY ACTION

Append the following entry to `/docs/master_docs.md`:

- Epic / Feature: EPIC-K / K3 — File Tree UI
- Doc path: /docs/docs-gatekeeper/EPIC-K — LAB UI (HYBRID EDITOR, MONACO, FS ABSTRACTION)/K3_File_Tree_UI.md
- Status: ADDED (EXTEND)
- Reason: Planner-Architect brief enumerating required UX invariants, API contract needs, and specific internal docs required before implementation.
