# Shadcn UI

- Category: UI Primitives
- Epics: K, J
- Version / Requirement: Latest (Feb 2026)
- Intent / Critical Decision: Consistent, accessible dashboard components.

## EPIC-K — LAB UI (Hybrid Editor, Monaco, FS Abstraction)

- Epics referenced: EPIC-K, EPIC-J
- Intent (EPIC-K): Use UI primitives to build consistent editor chrome, step panels, and instructional UI used by the lab hybrid editor. Ensure components compose well with Monaco and the VFS-driven state.
- Other important points:
	- Theming and tokens must be compatible with editor styling so code surfaces and surrounding UI feel seamless.
	- Components should support permission-based rendering (edit controls, commit buttons) driven by the lesson step model.
	- Accessibility and responsive behavior are critical for step instructions, keyboard-only workflows, and mobile/low-width layouts.
	- Avoid exposing sensitive state in client-only components; surface actions as guarded events routed through safe VFS APIs.
