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
