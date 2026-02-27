## FEATURE CONTEXT

- Epic: EPIC-G — PUSH FLOW & SNAPSHOT PREVIEW
- Feature: G4 — Branch & History Validation
- Exact input files read:
  - /Users/aryasoni/Desktop/Forgea/docs/agent*orchestrator_output/EPIC-G — PUSH FLOW & SNAPSHOT PREVIEW/G4_Branch*&\_History_Validation.md
  - /Users/aryasoni/Desktop/Forgea/docs/code-scout/EPIC-G — PUSH FLOW & SNAPSHOT PREVIEW/G4*Branch*&\_History_Validation.md
  - /Users/aryasoni/Desktop/Forgea/docs/master_docs.md
  - /Users/aryasoni/Desktop/Forgea/docs/official-docs-registry.md

---

## REQUIRED OFFICIAL DOCUMENTATION

For each required concept below: Technology / Concept / Official source / Exact version requirement / Why required / Decision informed / What breaks without it

- Technology: Git (core)
  - Concept: History rewrite semantics, ref update rules, force-push behavior
  - Official source: https://git-scm.com/docs/git-push and https://git-scm.com/docs/git-receive-pack
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: Defines canonical definition of what constitutes a history rewrite (non-fast-forward update of a branch ref) and the protocol-level events used to detect it.
  - Decision it informs: Enforcement triggers (reject vs allow), event normalization, evidence capture.
  - What breaks without it: Divergent detection semantics, missed rewrites, false positives/negatives.

- Technology: GitHub Branch Protection & Admin APIs
  - Concept: Branch protection rule fields, enforcement scopes, protected-branch configuration via API
  - Official source: https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/defining-the-mergeability-of-pull-requests/about-protected-branches
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: Maps policy fields (required status checks, required reviews, restrict who can push) to enforcement model and to decide what enforcement should be duplicate vs complementary to G4.
  - Decision it informs: Whether to rely on platform-level protection or implement additional detection; allowed exceptions.
  - What breaks without it: Inconsistent enforcement, duplication of rules causing conflicts.

- Technology: GitHub Webhooks & Events
  - Concept: Push event payload, delivery semantics, retry and deduplication headers
  - Official source: https://docs.github.com/en/developers/webhooks-and-events/webhooks/about-webhooks
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: Defines payload fields used to determine ref updates, before/after SHAs, and pusher identity.
  - Decision it informs: Event parsing, dedup keys, idempotency, evidence schema mapping.
  - What breaks without it: Missing required payload fields, incorrect event parsing, lost events.

- Technology: Audit & Security Logging Guidance (industry standard)
  - Concept: Audit field best practices, retention guidance, PII handling
  - Official source: NIST Guide to Computer Security Log Management (e.g., NIST SP 800-92)
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: Ensures logs include necessary fields for forensics while constraining PII and retention.
  - Decision it informs: Which fields are required/optional in audit events, retention windows, masking rules.
  - What breaks without it: Non-compliant logs, PII leakage, insufficient forensic evidence.

---

## EXISTING INTERNAL DOCS (VERIFIED)

- /Users/aryasoni/Desktop/Forgea/docs/agent*orchestrator_output/EPIC-G — PUSH FLOW & SNAPSHOT PREVIEW/G4_Branch*&\_History_Validation.md
  - Coverage status: PARTIAL
  - Exact gaps: High-level plan present; missing granular policy artifacts, rejection codes, and audit schema.

- /Users/aryasoni/Desktop/Forgea/docs/code-scout/EPIC-G — PUSH FLOW & SNAPSHOT PREVIEW/G4*Branch*&\_History_Validation.md
  - Coverage status: PARTIAL
  - Exact gaps: Code-scoped analysis lists missing policy artifacts and implementation; no canonical policy definitions.

- /Users/aryasoni/Desktop/Forgea/docs/docs-gatekeeper/EPIC-F — GITHUB INTEGRATION FOR LABS/F5*Branch*&\_Repository_Protection.md
  - Coverage status: PARTIAL
  - Exact gaps: Contains repository-level protection guidance but lacks standardized rejection codes, precise history-rewrite detection semantics, and audit schema for G4.

- /Users/aryasoni/Desktop/Forgea/docs/official-docs-registry.md
  - Coverage status: PARTIAL
  - Exact gaps: Registry contains GitHub/webhook entries but lacks pinned versions and explicit audit guidance required for compliance decisions.

---

## DOCUMENTATION COVERAGE DECISION

⚠️ DOCUMENTATION PARTIAL — EXTENSION REQUIRED

Docs to extend and why:

- Extend `/docs/docs-gatekeeper/EPIC-F — GITHUB INTEGRATION FOR LABS/F5_Branch_&_Repository_Protection.md` to include:
  - Canonical mapping between platform branch-protection fields and G4 enforcement expectations.
  - Standardized rejection codes list (see below).
  - Guidance on when platform protection suffices vs when G4 must enforce.
- Extend `/docs/official-docs-registry.md` to pin exact versions/URLs for Git, GitHub APIs, and the chosen audit guidance (NIST variant) and mark them VERIFIED or REQUIRED accordingly.
- Add a new canonical policy under `/docs/official-docs/EPIC-G/G4-branch-history-policy.md` (see "Internal docs to add" below) containing the formal policy (policy-only, no implementation).

---

## STUDY GUIDE FOR HUMAN

1. Git history-rewrite semantics

- Why this exists: To define precisely what a history rewrite is (a non-fast-forward ref update that replaces commits reachable from the branch) so detection and rejection are deterministic.
- Why alternatives exist: Platforms (GitHub/GitLab) may block force-pushes at source; detection-based enforcement is needed for hosts or flows where platform protection is insufficient.
- When NOT to use it: Do not treat normal fast-forward merges as rewrites; allow branch-reset operations when explicitly authorized by policy and recorded.
- Common engineering mistakes: Using only `ref` name without comparing `before`/`after` SHAs; failing to handle tag updates; equating any push to a rewrite.

2. GitHub Branch Protection mapping

- Why this exists: Provides the canonical mapping of policy fields to enforcement behavior (required checks, required approvals, push restrictions).
- Alternatives: Rely solely on GitHub protection rules (preferred when available) vs. implement complementary server-side checks.
- When NOT to use it: Where repo is hosted on providers lacking equivalent protection or where cross-repo workflows require additional server-side checks.
- Common mistakes: Assuming branch protection is universally applied to forks/pull requests or that protection events appear in webhook payloads.

3. Rejection code standardization

- Why this exists: Machine-readable codes enable cross-feature automation and consistent audit logs.
- Alternatives: Free-text messages (bad — leads to parsing fragility).
- When NOT to use it: Human-facing UI may still show friendly text; but logs and API responses must include codes.
- Common mistakes: Using vague or duplicate codes; not including both code and human message.

4. Audit logging & PII handling

- Why this exists: Forensics and compliance require structured evidence while minimizing PII exposure.
- Alternatives: Minimal logs (insufficient) or full raw payload retention (risky for PII).
- When NOT to use it: Do not log full webhook payloads containing OAuth tokens or secrets.
- Common mistakes: Logging raw user email or tokens, indefinite retention without legal review.

---

## INTERNAL DOCS TO ADD OR EXTEND

- Canonical path: /docs/official-docs/EPIC-G/G4-branch-history-policy.md
  - Purpose: Canonical policy artifact that DEFINES ONLY: branch-allowlist model, protected-branch rule fields, history-rewrite detection semantics, rejection reason codes, and audit field specification.
  - Exact knowledge to add: The full policy text (matching this docs-gatekeeper brief), machine-readable rejection-code table, and the audit-event JSON schema (required/optional fields and types). No implementation details.
  - Required version pin: N/A (policy doc) but must reference pinned Git/GitHub doc versions declared in registry.

- Canonical path: /docs/official-docs/EPIC-G/G4-audit-schema.md
  - Purpose: Machine schema for all history-rewrite audit events and retention guidance.
  - Exact knowledge to add: JSON Schema for `history_rewrite_attempt` event (fields, types, optionality), retention guidance (minimum/maximum retention windows), PII redaction rules.
  - Required version pin: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION (for referenced NIST or equivalent guidance version).

- Extend: /docs/docs-gatekeeper/EPIC-F — GITHUB INTEGRATION FOR LABS/F5*Branch*&\_Repository_Protection.md
  - Purpose: Add cross-reference and canonical mapping of G4 rejection codes and audit fields.
  - Exact knowledge to add: Table mapping platform protection fields → G4 enforcement semantics.
  - Required version pin: None (internal), but reference pinned GitHub API doc.

---

## OPEN QUESTIONS / AMBIGUITIES

- Should G4 re-use EPIC-F branch-protection templates, or must G4 produce separate, distinct policy documents?
- What is the canonical retention window for history-rewrite audit logs (legal/compliance input required)?
- Who signs off on PII redaction requirements (`security-sentinel` confirmation required)?
- Is there an existing org-wide rejection-code registry to consume or must G4 define new codes exclusively?

---

## MASTER DOCS REGISTRY ACTION (exact append lines)

Append the following entry to `/docs/master_docs.md`:

- Date: 2026-02-14
  - Epic / Feature: EPIC-G / G4 — Branch & History Validation
  - Doc path: /docs/docs-gatekeeper/EPIC-G — PUSH FLOW & SNAPSHOT PREVIEW/G4-branch-history-policy.md
  - Status: ADDED
  - Reason: Docs Gatekeeper brief creating canonical policy definitions for branch allowlist, protected-branch rules, history-rewrite detection semantics, standardized rejection codes, and audit schema.

---

End of feature brief.
