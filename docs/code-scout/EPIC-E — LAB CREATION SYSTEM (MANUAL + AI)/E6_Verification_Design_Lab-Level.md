FEATURE CONTEXT

- Epic: EPIC-E — LAB CREATION SYSTEM (MANUAL + AI)
- Feature: E6 — Verification Design (Lab-Level)
- Source: docs/agent_orchestrator_output/EPIC-E — LAB CREATION SYSTEM (MANUAL + AI)/E6_Verification_Design_Lab-Level.md

TASKS CHECKED

- Planner/Architect: define verification strategies, entry command, pass/fail criteria, forbidden solution patterns
- Implementer: implement verification entrypoint, deterministic harness, binding to commit SHA
- QA/Tester: deterministic execution and bypass checks
- Security Sentinel: audit verification harness for exfiltration / side effects

WHAT ALREADY EXISTS

- docs/agent_orchestrator_output/EPIC-E — LAB CREATION SYSTEM (MANUAL + AI)/E6_Verification_Design_Lab-Level.md — Orchestrator output with required agents, risks, execution plan, and copy-paste prompts.
- DECISIONS/v1-scope.md — Explicit constraints relevant to verification: Browser-only verification via Playwright; verification must be deterministic and no LLM grading. Evidence: [DECISIONS/v1-scope.md](DECISIONS/v1-scope.md#L1-L100).
- forgea-monorepo/.github/workflows/verification-and-quality-gates.yml — CI workflow exists that runs `pnpm turbo run verify-and-lint` and `pnpm turbo run build` as blocking checks. Evidence: [forgea-monorepo/.github/workflows/verification-and-quality-gates.yml](forgea-monorepo/.github/workflows/verification-and-quality-gates.yml#L1-L40).
- Documentation references across repo (docs/master_docs.md, docs/official-docs-registry.md, docs/docs-gatekeeper/*) that mention the `verify-and-lint` CI step and verification/quality gates.

WHAT IS PARTIALLY IMPLEMENTED

- CI-level gating exists (`verification-and-quality-gates.yml`) but currently runs `verify-and-lint` and `build` only; docs note missing `test:e2e` or a lab-level verification step (no `test:e2e` step present in CI evidence).
- Repository contains references to verification commands (`verify-and-lint`, Turborepo traces) and verification intents in docs, but no committed lab-level verification harness or deterministic verifier code specific to labs was found.

WHAT IS MISSING

- A lab-level verification entrypoint/harness (code or script) that implements deterministic verification bound to a commit SHA (not found).
- Explicit pass/fail rule implementations and forbidden-solution pattern checks encoded in policy (not found).
- A deterministic runner configuration (sandboxed Playwright runner or runner config) for lab verification (not found).
- CI integration that executes lab-level verification (e.g., `test:e2e` or `verify-lab` step) and records verification artifacts (missing from workflow).
- Security audit artefacts or policy files that prevent network exfiltration or secret access during verification (not found).
- Test fixtures or sample labs used by QA/Tester to validate verification determinism and bypass attempts (not found).

RISKS OR CONFLICTS

- High risk: verification binds to lab immutability (HARD LOCK). Without an authoritative list of forbidden patterns and an enforced harness, verification may be bypassed or divergent between implementers.
- Conflict between documentation intention (deterministic, Playwright/browser-only) and absence of an implemented Playwright harness or CI e2e step — risk of docs drifting from implementation.
- Security risk: If verification harness is later implemented without sandboxing, it could enable network access or secret exfiltration; no evidence of sandboxing controls in repo.

QUESTIONS FOR CLARIFICATION

- None strictly required to produce the Planner/Architect design doc; the Planner will need to reference this report to produce required artefacts.

NEXT AGENT HANDOFF PROMPT (FOR PLANNER/ARCHITECT)

You are the Planner/Architect. Use this code-scout report at `docs/code-scout/EPIC-E — LAB CREATION SYSTEM (MANUAL + AI)/E6_Verification_Design_Lab-Level.md` as the factual source. Produce a concise verification design doc (bullet list + technical checklist) that includes all of the following (do not implement):

- Verification strategies to consider (unit tests, browser-only runtime checks via Playwright, diff-based checks), and recommended primary strategy.
- The canonical verification entry command (exact CLI invocation) and expected command exit codes and output schema.
- Precise pass/fail criteria and failure modes (what constitutes a hard fail vs a warning).
- A concise list of forbidden solution patterns to detect (examples), and how the verifier should signal them.
- How to bind verification runs to a commit SHA and record immutable verification artifacts (what metadata to capture).
- Sandbox requirements and security constraints for the verification runner (network, file system, secret access controls) given the repository constraints.
- Expected deliverables for the Implementer (entrypoint script, deterministic runner config, sample test fixtures) and a short verification checklist for QA/Tester to validate determinism and non-bypassability.

Reference the factual findings in this report. Do not implement code or change pipeline definitions. Return the design doc as a compact bullet list plus a one-line checklist enumerating required Implementer deliverables.

“Handoff complete. Provide this report verbatim to the next agent.”
