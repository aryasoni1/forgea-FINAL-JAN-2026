FEATURE CONTEXT

- Epic: EPIC-E — LAB CREATION SYSTEM (MANUAL + AI)
- Feature: E11 — Quality and Review
- Exact input files read:
  - /Users/aryasoni/Desktop/Forgea/docs/code-scout/EPIC-E — LAB CREATION SYSTEM (MANUAL + AI)/E11_Quality_and_Review.md
  - /Users/aryasoni/Desktop/Forgea/docs/docs-gatekeeper/EPIC-D — LESSON CREATION SYSTEM/D7_Validation & Review.md
  - /Users/aryasoni/Desktop/Forgea/forgea-monorepo/apps/forgea-admin (UI evidence)

MANUAL REVIEW WORKFLOW (high-level)

- Gate points: Draft → Verification → Manual Review → Publish. Manual review required after Verification PASS and before Publish for any lab marked `requires_review: true`.
- Reviewer roles:
  - Reviewer: human subject-matter reviewer with `reviewer` permission to sign-off labs.
  - Supervisor: reviewer with `senior_reviewer` permission for escalations and appeals.
  - Automated agents: provide evidence (verification artifacts) but cannot sign-off.
- Checkpoints:
  - Completeness: all required assets present (instructions, tests, fixtures).
  - Solvability verification: QA-run evidence attached (Playwright report / verification JSON).
  - Security check: quick scan for secrets/exfil patterns (verifier report).
  - Content quality: clarity, concept alignment, estimated time-on-task.

PASS / FAIL CRITERIA FOR REVIEW

- PASS (approve): lab is solvable within estimated time, concept focus is correct, instructions are clear, no forbidden content or secrets, verification artifacts present and clean.
- FAIL (reject): unsolvable, misleading instructions, missing verification artifacts, contains forbidden content or secrets, or attempts to bypass verification.
- Conditional (revise): minor clarity or time-estimate adjustments required — reviewer marks `needs_revision` with notes.

REVIEWER CHECKLIST TEMPLATE (concise)

- Metadata: `lab_id`, `version`, `commit`, `author` present.
- Solvability: run verification artifacts; results show PASS and reproducible steps.
- Time estimate: reasonable and verified via sample runs (expected vs observed).
- Concept fit: lab aligns with stated learning objectives.
- Clarity: instructions unambiguous; examples provided if needed.
- Security: no secrets, no external data-loading, no host filesystem access.
- Accessibility & UX: basic accessibility checks and clear error handling.

Example accepted characteristics:
- Clear step-by-step instructions, tests pass, estimated time 20–30 minutes verified by QA fixture.

Example rejected characteristics:
- Verification fails, instructions omit a required step, lab requests external API keys in code.

SHORT REVIEW REPORT TEMPLATE

- Reviewer: <github-id>
- Date: <ISO-8601>
- Lab: <lab-id>@<commit>
- Decision: Approve | Reject | Needs Revision
- Notes: short justification and required changes (if any)

LAB METADATA ADDITIONS (fields & formats)

- `reviewed_by`: string (github handle) — optional until signed.
- `reviewed_at`: ISO-8601 timestamp.
- `review_decision`: enum {approved,rejected,needs_revision}.
- `review_notes`: string (free-form, optional).
- `reviewed_commit`: commit SHA that was reviewed and locked by the sign-off.
- `requires_review`: boolean (flag to trigger manual gate).

QA VALIDATION STRATEGY

- Solvability experiments: run the canonical verification (`verify-lab`) against sample fixtures and record median time-on-task across N runs (N>=3).
- Measure time-on-task: instrument Playwright traces to capture start/end times and aggregate.
- Report discrepancies: if observed median time deviates >30% from estimated, mark `needs_revision`.

SECURITY REVIEW RESPONSIBILITIES

- Inspect verification report for forbidden patterns (forbidden-pattern IDs) and network requests; escalate if any exfiltration evidence present.
- Confirm no secrets or long base64 tokens in repo files; check diffs for recently added suspicious strings.
- Validate test fixtures do not include network calls to LLM APIs or external data providers during verification runs.

IMPLEMENTER / DOCUMENTER DELIVERABLES

- `docs/reviewer-sop.md` — Standard Operating Procedure for reviewers.
- `docs/reviewer-checklist.md` — Concise checklist and sample accepted/rejected examples.
- Lab metadata schema update (example file in `packages/lab-templates/README.md` showing new fields).
- UI hooks: provide `review` action and fields in the publishing flow (placeholders already exist in `apps/forgea-admin`).

Handoff checklist (one-line): Implementer/Documenter must add `docs/reviewer-sop.md`, `docs/reviewer-checklist.md`, lab metadata schema sample, and UI publishing hooks to capture `reviewed_by`, `reviewed_at`, and `review_decision`.

Handoff complete. Provide this report verbatim to the next agent.
