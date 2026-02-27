FEATURE CONTEXT

- Epic: EPIC-K — LAB UI (HYBRID EDITOR, MONACO, FS ABSTRACTION)
- Feature: K9 — Commit & Push Guidance (UI Only)
- Exact input files read:
  - /docs/agent_orchestrator_output/EPIC-K — LAB UI (HYBRID EDITOR, MONACO, FS ABSTRACTION)/K9_Commit & Push Guidance (UI Only).md
  - /docs/code-scout/EPIC-K — LAB UI (HYBRID EDITOR, MONACO, FS ABSTRACTION)/K9_Commit & Push Guidance (UI Only).md
  - /docs/master_docs.md
  - /docs/official-docs-registry.md

REQUIRED OFFICIAL DOCUMENTATION

For each required concept below include official source and version requirement.

- Technology: Git (user-facing commit/push semantics)
  - Concept: Local vs remote commit/push behavior
  - Official source: https://git-scm.com/docs
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: Ensures UI copy correctly distinguishes local changes, commits, and push semantics; avoids misleading users about remote delivery guarantees.
  - Decision it informs: Precise prohibition language and expected user mental model for `Submit Proof` and guidance copy.
  - What breaks without it: Misleading guidance causing audit/verification mismatches and user confusion about proof submission.

- Technology: WCAG (accessibility acceptance)
  - Concept: Accessible banners, buttons, focus management, and ARIA semantics
  - Official source: https://www.w3.org/TR/WCAG21/
  - Exact version requirement: 2.1
  - Why required: Accessibility acceptance criteria are mandatory for UI guidance and CTA exposure.
  - Decision it informs: Keyboard focus behavior, screen-reader copy, contrast and sizing constraints for banners and modals.
  - What breaks without it: Non-compliant UI, failed accessibility audits, and potential legal/UX regressions.

- Technology: Unicode CLDR / i18n best practices
  - Concept: Internationalization, pluralization, and message extraction
  - Official source: https://cldr.unicode.org/
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: Guidance copy must be i18n-ready (variables, placeholders, length-safe messages).
  - Decision it informs: Copy structure (avoid embedded punctuation/HTML), translation notes, and stable keys for translations.
  - What breaks without it: Broken translations, UI truncation, and incorrect localized messaging.

EXISTING INTERNAL DOCS (VERIFIED)

For each internal doc relevant to this feature:

- Doc path: /docs/code-scout/EPIC-K — LAB UI (HYBRID EDITOR, MONACO, FS ABSTRACTION)/K9_Commit & Push Guidance (UI Only).md
  - Coverage status: PARTIAL
  - Exact gaps: Identifies candidate surfaces and missing copy; lacks exact i18n-ready strings, prohibition language, CTA definitions, and acceptance checklist.

- Doc path: /docs/agent_orchestrator_output/EPIC-K — LAB UI (HYBRID EDITOR, MONACO, FS ABSTRACTION)/K9_Commit & Push Guidance (UI Only).md
  - Coverage status: PARTIAL
  - Exact gaps: Orchestrator task exists but does not provide final guidance copy, CTAs, or placement map suitable for implementer consumption.

- Doc path: /docs/official-docs-registry.md
  - Coverage status: PARTIAL
  - Exact gaps: Registry contains GitHub webhook entries and related EPIC-F references but does not list Git basics, WCAG, or CLDR as explicitly referenced requirements for this UI feature.

DOCUMENTATION COVERAGE DECISION

⚠️ DOCUMENTATION PARTIAL — EXTENSION REQUIRED

  - Docs to extend and why:
    - /docs/code-scout/EPIC-K — Add exact i18n-ready copy, prohibition language, CTAs, and placement map.
    - /docs/agent_orchestrator_output/EPIC-K — Add planner-approved copy and confirm backend field names to reference (e.g., `commitSha`).
    - /docs/official-docs-registry.md — Add entries for `Git` basics, `WCAG 2.1`, and `Unicode CLDR` with pinned versions or explicit pin requirements.

STUDY GUIDE FOR HUMAN

- Git (Local vs Remote):
  - Why this exists: Users conflate saving, committing, and pushing; UI must be precise to avoid audit confusion.
  - Why alternatives exist: Some workflows auto-push from server; others require explicit remote operations.
  - When NOT to use: Do not present commit/push CTAs as actionable if browser cannot perform remote push.
  - Common mistakes: Using `Submit` or `Save` interchangeably with `Push`; omitting whether action is local-only.

- WCAG 2.1 (Accessibility):
  - Why this exists: Legal and UX requirements for interactive UI elements.
  - Why alternatives exist: None — WCAG is the accessibility baseline.
  - When NOT to use: N/A — always apply accessibility guidance.
  - Common mistakes: Relying on visual color only, missing focus management for modal CTAs.

- CLDR / i18n (Localization):
  - Why this exists: Copy must be stable across locales and translators need context.
  - Why alternatives exist: Lightweight i18n libs exist but still rely on CLDR conventions.
  - When NOT to use: Don’t inline variable values or HTML in translation keys.
  - Common mistakes: Hard-coding punctuation, pluralization errors, and missing translation contexts.

INTERNAL DOCS TO ADD OR EXTEND

(Required because coverage is partial)

- Canonical doc path: /docs/official-docs/EPIC-K/K9_commit_push_ui_copy.md
  - Purpose: Store the planner-approved, i18n-ready strings, prohibition language, CTAs, and FAQ snippet.
  - Exact knowledge to add: Primary message, secondary explanation, 3 FAQ items, prohibition language, CTA labels, placement map, and QA acceptance checklist.
  - Required version pin: N/A (internal doc) — mark as VERSIONED INTERNAL DOC at creation.

OPEN QUESTIONS / AMBIGUITIES

- Backend field names: Confirm whether the backend uses `commitSha` / `branch` fields for evidence — planner must confirm with EPIC-F/G/H owners before implementing copy that references those fields.
- Final copy sign-off: Planner-Architect must approve the provided copy strings before implementation.

MASTER DOCS REGISTRY ACTION

Append the following exact entry to `/docs/master_docs.md` (implementer/Docs Gatekeeper will add):

- Epic / Feature: EPIC-K / K9 — Commit & Push Guidance (UI Only)
  - Doc path: /docs/docs-gatekeeper/EPIC-K — LAB UI (HYBRID EDITOR, MONACO, FS ABSTRACTION)/K9_Commit & Push Guidance (UI Only).md
  - Status: ADDED (EXTEND)
  - Reason: Planner-approved UI guidance required for in-browser commit/push messaging, CTAs, and accessibility checks.
  - Date: 2026-02-15

---

---

STOP — TASK DOCUMENT (IMPLEMENTER-FACING)

Produce `/docs/tasks/task-K9-<YYYY-MM-DD>.md` (planner deliverable) using the following exact content below. Do NOT implement behavior — only author the task doc.

Task doc content (final copy to copy into `/docs/tasks/task-K9-<YYYY-MM-DD>.md`):

FEATURE: K9 — Commit & Push Guidance (UI Only)

Goal: Provide non-executing, i18n-ready UI guidance and CTAs in the Lab UI that make commit/push expectations explicit and avoid implying in-browser remote pushes.

1) Exact guidance copy (i18n-ready strings)
  - Primary message (short): "Submit Proof — prepares your workspace for verification. No remote push is performed by the browser."
  - Secondary explanation (one sentence): "This action records your changes locally for verification and may be submitted to the remote verifier by the system — the browser will not perform a git push."
  - Short FAQ snippet (3 items):
    - Q1: "Will this push my changes to GitHub?" — A1: "No. This UI is informational only — no commit or push will be performed by the browser. Remote submission is handled by the verification service." 
    - Q2: "Do I still need to save my files?" — A2: "Yes. Save or stage files in the editor before using Submit Proof to ensure changes are included." 
    - Q3: "How can I confirm my submission was recorded?" — A3: "After submission, check the attempt details in the Session History or the verification result page for a reference ID or commit SHA (if provided)."

2) Clear prohibition language (developer-facing, must display when non-executing)
  - Exact phrasing (displayed in banner and modal footnote): "This UI is informational only — no commit or push will be performed by the browser."

3) CTAs (exact labels, treatment, and expected behavior — DO NOT IMPLEMENT behavior here)
  - Primary CTA: Label: "Submit Proof" — Size: medium — Treatment: primary button (filled) — Expected behavior: opens the `SubmitProof` modal describing what will happen and shows the prohibition language and confirmation.
  - Secondary CTA: Label: "How it works" — Size: small — Treatment: secondary link/button — Expected behavior: opens the short FAQ modal (the 3-item FAQ above) with accessible focus trap and close control.
  - Tertiary CTA (docs): Label: "Developer docs" — Size: small — Treatment: tertiary link — Expected behavior: navigates to `/docs/official-docs/EPIC-F/` (or opens an external docs link) with the webhook/push flow reference for implementers.

4) Placement map (exact file/component locations and element targets)
  - `WorkspaceActionBar` (apps/forgea-labs/components/workspace/action-bar.tsx) — show primary banner adjacent to the `Submit Proof` button; CTAs: show primary `Submit Proof` button (existing) and add `How it works` link to the action group.
  - `MainShell` (apps/forgea-labs/components/workspace/main-shell.tsx) — global banner area (top) to show the prohibition language when lab is read-only or verification-in-progress.
  - `MonacoEditor` (apps/forgea-labs/components/workspace/monaco-editor.tsx) — show a dismissible top banner when there are unsaved edits, prompting users to save; the banner must include a short link to `Submit Proof` and the prohibition language.
  - `FileExplorer` (apps/forgea-labs/components/workspace/file-explorer.tsx) — context tooltip for locked files showing: "This file is locked for editing by the lab — changes may not be included in submissions." Include `How it works` link.

5) Acceptance checklist (testable)
  - Visual placement: Banner appears adjacent to `Submit Proof` in `WorkspaceActionBar` on desktop and collapsed appropriately on mobile.
  - Copy match: All displayed strings must exactly match planner-approved copy in `/docs/official-docs/EPIC-K/K9_commit_push_ui_copy.md`.
  - CTA wiring: `Submit Proof` opens the `SubmitProof` modal; `How it works` opens the FAQ modal; `Developer docs` navigates to referenced doc. (Behavior wiring only; no git actions.)
  - Accessibility: Banners and modals meet WCAG 2.1 AA contrast, keyboard focus order, `aria-live` for notifications, and have accessible labels.
  - Mobile/responsive: Banner stacks and CTAs are reachable on narrow viewports; no overflow or clipped text.
  - No in-browser git action: UI must never call any client-side commit/push API — code must not add network calls to provider push endpoints.
  - Edge-cases: Offline: show an offline notice inside the modal with prohibition language; Verification-in-progress: disable `Submit Proof` and show a tooltip explaining the current state; Read-only labs: visually show prohibition language and disable primary CTA.

6) Locked decisions (MUST NOT change without planner approval)
  - The prohibition language string and FAQ answers MUST NOT be altered.
  - Placement adjacency to the existing `Submit Proof` button is fixed — do not relocate to unrelated header/global bars.
  - The `Submit Proof` button label must remain as-is until planner-architect approves a rename.

7) References
  - Code-scout report: /docs/code-scout/EPIC-K — LAB UI (HYBRID EDITOR, MONACO, FS ABSTRACTION)/K9_Commit & Push Guidance (UI Only).md
  - Orchestrator task: /docs/agent_orchestrator_output/EPIC-K — LAB UI (HYBRID EDITOR, MONACO, FS ABSTRACTION)/K9_Commit & Push Guidance (UI Only).md
  - Consult EPIC-F / EPIC-G / EPIC-H docs for push/webhook/audit schemas — do not restate backend schemas here.

Acceptance: Stop after authoring this task doc and wait for planner sign-off prior to implementation.
