FEATURE CONTEXT

- Epic: EPIC-E — LAB CREATION SYSTEM (MANUAL + AI)
- Feature: E6 — Verification Design (Lab-Level)
- Exact input files read:
  - /Users/aryasoni/Desktop/Forgea/docs/code-scout/EPIC-E — LAB CREATION SYSTEM (MANUAL + AI)/E6_Verification_Design_Lab-Level.md
  - /Users/aryasoni/Desktop/Forgea/DECISIONS/v1-scope.md
  - /Users/aryasoni/Desktop/Forgea/forgea-monorepo/.github/workflows/verification-and-quality-gates.yml

VERIFICATION STRATEGY (recommended primary)

- Primary: Browser-only deterministic runtime checks via Playwright (per v1-scope). Use Playwright to run scripted interactions and deterministic assertions against the lab UI.
- Secondary (complementary): Diff-based checks (git patch analysis) to detect forbidden-file edits and patterns; lightweight unit/static checks (linters) as pre-checks.
- Rationale: Playwright enforces the v1-scope constraint (browser-only) and produces deterministic artifacts (traces/screenshots) while diffs detect policy violations early.

CANONICAL VERIFICATION ENTRY COMMAND

- Exact CLI invocation:
  pnpm turbo run verify-lab --filter=packages/<lab-package> -- --sha=<commit-sha> --output=./verification-artifacts/<lab-package>-<sha>.json

- Exit codes:
  - 0: PASS — all checks passed; no forbidden patterns detected.
  - 1: HARD FAIL — test failures or detection of any forbidden solution pattern (must block merge/publish).
  - 2: WARNINGS ONLY — non-blocking issues (lint warnings, performance notes); artifacts still produced.

- Output schema (JSON, written to `--output`):
  {
    "schemaVersion": "1.0",
    "lab": "<lab-package>",
    "commit": "<commit-sha>",
    "timestamp": "ISO-8601",
    "status": "pass|fail|warning|forbidden",
    "exitCode": 0|1|2,
    "failures": [{"id":"F001","type":"test|forbidden|env","message":"...","path":"...","evidence":"..."}],
    "forbiddenPatterns": [{"pattern":"regex","match":"matched-text","file":"path"}],
    "artifacts": {"playwrightTrace":"path","screenshots":["path"],"report":"path","tarball":"path"},
    "runner": {"os":"","node":"","pnpm":"","turbo":"","playwright":""}
  }

PASS / FAIL CRITERIA

- Hard Fail (exit 1):
  - Any Playwright test assertion failure for canonical acceptance criteria.
  - Detection of forbidden solution patterns (see list below).
  - Evidence of network exfiltration attempts during the run (outbound requests to non-allowlisted domains).
  - Verification harness integrity breaches (runner attempted to mutate verifier configs or disable checks).

- Warning (exit 2):
  - Lint/style warnings, flaky timing differences within tolerated thresholds, non-critical missing optional assets.

- Pass (exit 0):
  - All assertions pass, no forbidden patterns, artifacts produced and checksums recorded.

FORBIDDEN SOLUTION PATTERNS (examples)

- External network fetches initiated by lab UI or test code to third-party hosts (detect via request interception).
- Dynamic code evaluation loading remote scripts (e.g., eval(new Function(...)) with remote content, remote script tags).
- Use of headless-bypass or test-only hooks that bypass verification (e.g., explicit `__SKIP_VERIFICATION__` flags).
- Inclusion of secrets/config values in repository files (detect via regex for `api_key`, `SECRET`, long base64 strings in code/config).
- Reading host-only files (/etc/passwd, /proc/*) or attempt to mount host filepaths.
- Automated LLM-based grading calls from the lab (requests to LLM APIs during verification).

- Signaling: any forbidden pattern should be reported under `forbiddenPatterns` and escalate to `status: "forbidden"` with a HARD FAIL exit code and at least one `failures` entry containing reproducible evidence (request URL, stack trace, file/line).

BINDING RUNS TO A COMMIT SHA & RECORDING ARTIFACTS

- Mandate: verification runs must be invoked with `--sha=<commit-sha>`; verifier must verify the local repository HEAD matches the provided SHA (or checkout that SHA before running).
- Immutable artifacts to record:
  - Canonical JSON verification report (schema above).
  - Playwright trace (.zip/.ziptrace), all screenshots, and a short video when available.
  - Repository tarball or packfile of the exact source used (content-addressed name) and its SHA256.
  - Git diff and commit metadata (author, message, branch).
  - Runner metadata and checksums for each artifact.
- Storage: artifacts must be uploaded to an immutable artifact store (S3 or internal blob store) with content-addressed keys and recorded in the JSON report by path and checksum.

SANDBOX & SECURITY CONSTRAINTS (runner requirements)

- Network: fully disabled by default for lab processes; allowlist only for artifact upload endpoint (short-lived, scoped token) and internal test-only services. All outbound requests must be intercepted and logged.
- Filesystem: run inside ephemeral container/VM with workspace mounted readonly except for a designated temp directory for build/test; prevent access to host secrets, home dir, and system mounts.
- Secrets: no environment secrets should be injected into the runner except a single ephemeral artifact upload token; do not expose org secrets to lab code.
- Process: drop capabilities, run as non-root user, limit process spawn and outbound sockets, enforce CPU/memory/time quotas.
- Playwright-specific: run headless with deterministic options (set viewport, timezone, locale), use fixed random seeds where possible, disable caching that can cause non-determinism.

IMPLEMENTER DELIVERABLES (expected)

- `scripts/verify-lab.sh` (or `bin/verify-lab.js`) — wrapper that implements the canonical CLI, argument parsing (`--sha`, `--output`, `--lab`) and exit-code semantics.
- `playwright.config.js` — deterministic Playwright config tuned for headless, trace capture, request interception, and blocked-host list.
- `verifier/forbidden-rules.json` — curated list of regex/AST rules for forbidden patterns and their IDs.
- `packages/lab-templates/__fixtures__/sample-lab-1/` — sample deterministic fixture(s) used by QA for testing harness.
- `verifier/upload-artifacts.sh` — artifact uploader that records checksums and writes final JSON report.

QA/TESTER VERIFICATION CHECKLIST (short)

- Run the canonical CLI twice on the same SHA: compare JSON reports and artifact checksums (must match).
- Inject a sample forbidden pattern into a fixture: run verifier and confirm HARD FAIL, `status: "forbidden"`, and evidence field populated.
- Confirm network is blocked: instrument interception to show blocked outbound requests and verify failure mode if requests are attempted.
- Confirm Playwright artifacts (trace/screenshots/video) are produced, uploaded, and checksums recorded.

Handoff checklist (one-line): Implementer deliver `scripts/verify-lab.*`, `playwright.config.js`, `verifier/forbidden-rules.json`, sample fixtures, and artifact uploader script.

Handoff complete. Provide this report verbatim to the next agent.
