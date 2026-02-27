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
