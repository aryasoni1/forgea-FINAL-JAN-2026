FEATURE CONTEXT

- Epic: EPIC-E — LAB CREATION SYSTEM (MANUAL + AI)
- Feature: E8 AI-Assisted Lab Generation
- Exact input files read:
  - /docs/agent_orchestrator_output/EPIC-E — LAB CREATION SYSTEM (MANUAL + AI)/E8_AI-Assisted_Lab_Generation.md
  - /docs/code-scout/EPIC-E — LAB CREATION SYSTEM (MANUAL + AI)/E8*AI-Assisted_Lab_Generation.md


REQUIRED OFFICIAL DOCUMENTATION

1) JSON Schema (Validation)
- Technology / Concept: JSON Schema (validation and structural guarantees)
- Official source: https://json-schema.org/specification-links.html
- Exact version requirement: 2020-12
- Why required: Provides canonical schema syntax and validation semantics for generated lab artifacts and automated rejection rules.
- Decision it informs: Field-level validators, required/forbidden fields, error payload formats, and machine-enforceable rejection criteria.
- What breaks without it: Inconsistent validation rules, ambiguous rejection behavior, and risk of publishing malformed or unsafe artifacts.

2) Model Provider API & Use Policy
- Technology / Concept: Model provider API and safety/use policy (example: OpenAI)
- Official source: https://platform.openai.com/docs/
- Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- Why required: Defines API behavior, rate limits, content policy constraints, and provider-specific safety controls used by Implementer and Security Sentinel.
- Decision it informs: Which model endpoints are allowed, cost/security controls, content-filtering and allowed content categories.
- What breaks without it: Noncompliant generation, undetected policy violations, unexplained model behavior or provenance gaps.

3) AI Explainability / Model Cards Guidance
- Technology / Concept: Model cards / explainability best practices
- Official source: https://modelcards.withgoogle.com/ (or equivalent canonical guidance)
- Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- Why required: Specifies minimal explainability artifacts and metadata to record model inputs, prompts, and deltas for reviewer transparency.
- Decision it informs: Explainability recording fields, required deltas to store, and evidence reviewers need to approve generations.
- What breaks without it: Insufficient evidence for human reviewers, inability to trace or justify generation changes.

4) Responsible AI / Governance Principles
- Technology / Concept: Responsible AI / governance principles (OECD / organizational policy)
- Official source: https://www.oecd.org/going-digital/ai/principles/
- Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- Why required: Provides high-level constraints on allowed use cases, risk classification, and human-review gating for high-risk outputs.
- Decision it informs: Which outputs require hard-lock/manual review and what constitutes unacceptable risk (e.g., exploits, test tampering, IP leakage).
- What breaks without it: Unclear governance causing inconsistent reviewer decisions and unsafe publishes.


EXISTING INTERNAL DOCS (VERIFIED)

- /docs/agent_orchestrator_output/EPIC-E — LAB CREATION SYSTEM (MANUAL + AI)/E8_AI-Assisted_Lab_Generation.md — PARTIAL
  - Gap: Orchestrator output contains roles, plan, and prompts but lacks the Planner/Architect specification, validation fragments, and Security Sentinel rules required for safe automation.

- /docs/code-scout/EPIC-E — LAB CREATION SYSTEM (MANUAL + AI)/E8*AI-Assisted_Lab_Generation.md — PARTIAL
  - Gap: Code-scout notes risks and missing artefacts but contains no machine-checkable spec or schema examples.

- /docs/official-docs-registry.md — PARTIAL
  - Gap: Embedding/model-provider references exist under other epics, but registry lacks explicit JSON Schema and Explainability entries required by Planner.


DOCUMENTATION COVERAGE DECISION

⚠️ DOCUMENTATION PARTIAL — EXTENSION REQUIRED

Docs to add or extend before Planner/Implementer work:
- `/docs/official-docs/EPIC-E/ai-generation-policy.md` — policy for allowed AI fields, forbidden fields, and hard-lock rules.
- `/docs/official-docs/EPIC-E/schema-validation.md` — JSON Schema fragments and exact rejection criteria (2020-12-based fragments).
- `/docs/official-docs/EPIC-E/ai-explainability.md` — required explainability metadata and storage format for reviewer evidence.
- `/docs/official-docs/security/ai-sentinel-guidelines.md` — Security Sentinel checklist and denylist rules for generated artifacts.


STUDY GUIDE FOR HUMAN

- JSON Schema:
  - Why: Machine-enforceable contract for generated artifacts; alternatives (ad-hoc validation) are error-prone.
  - When NOT to use: Extremely small PoCs where schema overhead prevents iteration.
  - Common mistakes: Using permissive schemas, failing to mark dangerous fields `forbidden`, or not returning structured error codes.

- Model Provider API & Policy:
  - Why: Governs model behavior, costs, and policy restrictions.
  - Alternatives: On-prem models (different governance overhead).
  - Common mistakes: Assuming stable output formats, not handling rate-limits or content filters.

- Explainability / Model Cards:
  - Why: Provides reviewer evidence and a minimal audit trail for generated changes.
  - When NOT to use: Internal drafts never destined to be published.
  - Common mistakes: Recording only prompts but not post-processing deltas or confidence signals.

- Responsible AI Principles:
  - Why: Classifies risk and determines when human review is mandatory.
  - Common mistakes: Treating all outputs as low-risk or failing to escalate high-risk cases.


INTERNAL DOCS TO ADD OR EXTEND

1) /docs/official-docs/EPIC-E/ai-generation-policy.md
  - Purpose: Canonical Planner/Architect spec: allowed AI-authored fields, forbidden fields, transformation rules, and human-review gating.
  - Exact knowledge to add: Bounded allowed-fields list (with one-line transformation rules), forbidden-fields list (with rationales), high-level hard-lock constraints.
  - Required version pin: references to JSON Schema 2020-12 and pinned model-provider API version.

2) /docs/official-docs/EPIC-E/schema-validation.md
  - Purpose: Exact JSON Schema fragments (2020-12) and rejection criteria for Implementer to enforce.
  - Exact knowledge to add: Field-level `properties`, `required`, `forbidden` denials (via `unevaluatedProperties:false`), and canonical rejection error formats.
  - Required version pin: JSON Schema 2020-12.

3) /docs/official-docs/EPIC-E/ai-explainability.md
  - Purpose: Define what to store for explainability: `prompt`, `model`, `model_version`, `response`, `deltas`, `confidence`, `run_id`, `timestamp`.
  - Exact knowledge to add: Storage schema, retention policy, redaction rules for sensitive fields, and reviewer UI fields.
  - Required version pin: model-provider API pin.

4) /docs/official-docs/security/ai-sentinel-guidelines.md
  - Purpose: Security Sentinel checklist for denylist patterns, vulnerability detection, forbidden content (tests/config edits), and approval rules.
  - Exact knowledge to add: Regex/heuristics for detecting test-suite modifications, CI/config edits, secrets patterns, and escalation steps.
  - Required version pin: N/A (internal security policy); reference Responsible AI guidance.


OPEN QUESTIONS / AMBIGUITIES

- Which model-provider(s) will be supported in CI (e.g., OpenAI, local LLMs)? This affects exact API pins and explainability fields.
- Are test-suite and reference-solution edits ALWAYS forbidden (hard lock) or allowed under strict human-review? Orchestrator marked Hard Lock = Yes — clarify.
- Data provenance: are external training data sources acceptable when generating lab content? This affects IP leakage policies.


MASTER DOCS REGISTRY ACTION

Append the following entry to `/docs/master_docs.md`:

- Date: 2026-02-14
  - Epic / Feature: EPIC-E / E8 — AI-Assisted Lab Generation
  - Doc path: /docs/docs-gatekeeper/EPIC-E — LAB CREATION SYSTEM (MANUAL + AI)/E8_AI-Assisted_Lab_Generation.md
  - Status: ADDED
  - Reason: Docs Gatekeeper brief enumerating required official docs and internal doc gaps for AI-assisted lab generation, schema validation, explainability, and Security Sentinel requirements.
