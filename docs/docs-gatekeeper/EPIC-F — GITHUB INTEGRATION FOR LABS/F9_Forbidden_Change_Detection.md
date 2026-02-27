FEATURE CONTEXT

- Epic: EPIC-F — GITHUB INTEGRATION FOR LABS
- Feature: F9 — Forbidden Change Detection
- Exact input files read (full paths):
  - /Users/aryasoni/Desktop/Forgea/docs/code-scout/EPIC-F — GITHUB INTEGRATION FOR LABS/F9_Forbidden_Change_Detection.md
  - /Users/aryasoni/Desktop/Forgea/docs/agent_orchestrator_output/EPIC-F — GITHUB INTEGRATION FOR LABS/F9_Forbidden_Change_Detection.md

SOURCE NOTE

- This Planner spec is derived strictly from the attached code-scout/orchestrator report
  (`docs/code-scout/EPIC-F — GITHUB INTEGRATION FOR LABS/F9_Forbidden_Change_Detection.md`).
  No additional repo facts were invented.

DELIVERABLES (Planner outputs — deterministic, testable specification)

1. Exact, repo-scoped list of forbidden / locked paths

Applies to: All lab repositories created and managed by the Forgea GitHub App (hereafter "lab repos").

- `tests/**` — All autograder and instructor tests and fixtures.
  - Purpose: Prevent students from altering or removing autograder logic.

- `forgea.config.json` — Top-level lab metadata / config file.
  - Purpose: Source of truth for lab metadata, locked-after-publish settings, and runtime config.

- `.forgea/**` — Internal runtime metadata and step runtime artifacts.
  - Purpose: Runtime/state used by the platform; must not be altered by students.

- `.github/workflows/**` — CI workflows that run grading/validation.
  - Purpose: Prevent students from modifying CI that evaluates submissions.

- `*.grader.js`, `grader/**` — Explicit grader code files (if present outside `tests/`).
  - Purpose: Protect alternative grader placements.

- `scripts/evaluate/**` and `infrastructure/**` — Any repository folders labeled `infrastructure` or `evaluate`.
  - Purpose: Protect infra and evaluation pipelines related to the lab.

Rationale: These globs represent files that, if changed, can alter grading, runtime behavior, or provenance.

2. Violation semantics (what constitutes a violation and severity mapping)

Definitions (applies to any push / force-push / branch update):

- Changed path: any path present in the diff between `before_sha` and `after_sha` (added, modified, deleted, renamed).
- Rename/Move: path change where a file blob exists with a different path in the new commit.
- Force-push: non-fast-forward update to a ref (history rewritten).

Violation rules (deterministic):

- Rule V1 (CRITICAL): Any change (add/modify/delete/rename) to `tests/**`, `forgea.config.json`, or `.forgea/**`.
  - Outcome: Immediate LabSession FAILURE; block further session execution until operator review; emit violation evidence.

- Rule V2 (CRITICAL): Any force-push where the rewritten range includes commits that touched any locked path (as above).
  - Outcome: Immediate LabSession FAILURE; mark push as violating; require rollback or operator remediation.

- Rule V3 (HIGH): Any change to `.github/workflows/**`, `*.grader.js`, `grader/**`, `scripts/evaluate/**`, or `infrastructure/**`.
  - Outcome: Block merge to protected branch; create security ticket/alert; do NOT automatically mark LabSession as FAILED unless change also touches CRITICAL paths.

- Rule V4 (MEDIUM): Changes to non-locked but sensitive files listed in a repo-specific `forgea.sensitive.paths` (optional manifest).
  - Outcome: Flag for review; do not auto-fail session unless policy escalates.

Deterministic mapping to LabSession status:

- If any CRITICAL violation in a push affecting the active lab session -> LabSession status becomes FAILED immediately.
- HIGH/LOW/ MEDIUM violations do NOT auto-fail the LabSession but must be surfaced in the session audit and block merges on protected branches.

3. Edge-case handling (deterministic rules)

- Renames / subtree moves:
  - Detect by comparing blob SHAs: if blob SHA exists in both before and after but path changed, treat as a rename. If the blob SHA is different, treat as modification.
  - If a rename moves a locked file out of a locked path to an unlocked path, the operation is treated as a modification of the locked path (i.e., violation).

- Case-only path changes (case-insensitive repos):
  - Treat case-only changes as renames and therefore as modifications when the target path matches a locked glob in a case-insensitive manner.

- Binary vs text diffs:
  - Use blob SHA comparison only; any change in blob SHA for a locked path is a modification regardless of content type.

- Large ref changes / mass-force-pushes:
  - If a force-push rewrites > 1000 commits, perform a short-circuit scan: if any locked path appears in any commit of the rewritten range, treat as CRITICAL violation.
  - If commit count is large but no locked-path touches are found, record an INFO event and continue.

- Merge commits / PR merges:
  - Evaluate the merged commit delta (merge commit parents) and apply the same path-diff rules.

- Cross-repo moves (files copied from other repos):
  - Treat as additions in the target repo; if added path matches locked globs, evaluate as per rules above.

4. Evidence to record on violation (minimum fields, stored as a single immutable evidence artifact per violation)

Each violation MUST produce a JSON evidence artifact containing at least:

- `evidence_id` — UUIDv4
- `repo` — repository full name (owner/name)
- `ref` — ref updated (e.g., refs/heads/main)
- `before_sha` — prior commit SHA
- `after_sha` — new commit SHA
- `affected_paths` — list of path objects: { path, change_type (added|modified|deleted|renamed), blob_sha_before?, blob_sha_after? }
- `actor` — user/login or app id who performed the push
- `push_event` — raw push metadata (push id, pusher, compare url) minimalized to deterministic fields
- `timestamp` — ISO8601 UTC
- `diff_url` or `minimal_patch` — either a URL to the stored patch or an inline minimal unified diff limited to locked-path hunks (size-limited)
- `severity` — CRITICAL | HIGH | MEDIUM | LOW
- `detection_rule` — identifier of the rule that fired (e.g., V1, V2)
- `analysis_shas` — list of commit SHAs that touched locked paths (for fast forensic queries)

Storage location (policy-level, not implementation):

- Evidence MUST be written to the platform's central immutable Evidence Store (audit DB or object storage) and indexed into the audit log.
- Storage path pattern (policy): `/evidence/forbidden-changes/<repo>/<evidence_id>.json` (implementation may map to DB rows + object storage for diffs).

5. Required retention & access notes (minimum)

- Retain evidence for a minimum of 365 days.
- Evidence access must be auditable and restricted to operator roles and security/audit services.

6. Test scenarios (explicit push permutations and expected outcomes)

The Implementer and QA must cover these scenarios (each scenario must assert recorded evidence fields and final LabSession status):

- Scenario T1 — Single commit modifies `tests/test_main.py` on `refs/heads/main`.
  - Expected: CRITICAL violation, LabSession -> FAILED, evidence contains `tests/test_main.py` with change_type `modified`, severity CRITICAL.

- Scenario T2 — Single commit deletes `forgea.config.json` on `refs/heads/main`.
  - Expected: CRITICAL violation, LabSession -> FAILED, evidence lists `forgea.config.json` as `deleted`.

- Scenario T3 — Push that renames `.forgea/metadata.json` -> `.forgea/metadata.old.json` on `refs/heads/main`.
  - Expected: CRITICAL violation (rename treated as modification), evidence shows `renamed` with blob SHAs.

- Scenario T4 — PR merge modifies `.github/workflows/grade.yml` only.
  - Expected: HIGH violation, block merge to protected branch, LabSession unchanged unless CRITICAL paths affected; evidence recorded with severity HIGH.

- Scenario T5 — Force-push rewriting 5 commits where one prior commit touched `tests/`.
  - Expected: V2 CRITICAL violation, LabSession -> FAILED, evidence records rewritten commit SHAs and affected paths.

- Scenario T6 — Force-push rewriting 2000 commits with no locked-path touches.
  - Expected: No violation for locked paths; evidence: INFO event logged noting large rewrite and scan outcome.

- Scenario T7 — Student branch pushes changes to non-protected branch touching `README.md` only.
  - Expected: No violation (unless `README.md` is in locked-path manifest); evidence: none. If repo-specific manifest lists README.md, handle per manifest.

- Scenario T8 — Binary file in `grader/` changes blob SHA (non-text diff).
  - Expected: HIGH/CRITICAL depending on `grader/**` mapping; treat as modification; evidence recorded with blob SHAs.

7. Evidence of correctness for tests (what QA must assert)

- Confirm detection logic reports identical set of affected_paths between local diff and event payload.
- Confirm that stored evidence artifact contains all required fields and is immutable.
- Confirm that severity mapping matches the deterministic table above.
- Confirm that LabSession state transitions occur only for CRITICAL violations and are atomic with evidence writes.

8. Minimal operator remediation guidance (for implementer handoff only — short)

- For CRITICAL violations: operator must review evidence, and either:
  - revert the offending push (preferred) OR
  - restore locked-path contents from canonical template and re-issue a new commit, then approve session replay.

- For HIGH violations: open security review ticket and block merges until approved.

IMPLEMENTER NOTES (strict constraints)

- Do NOT rely on client-side path semantics; use blob SHA comparisons and server-side diffs.
- Deterministic behavior depends on a canonical locked-path manifest; if none exists, use the repo-scoped list above until a central manifest is published.

REFERENCES

- Source report: `docs/code-scout/EPIC-F — GITHUB INTEGRATION FOR LABS/F9_Forbidden_Change_Detection.md` (used as authoritative input).
