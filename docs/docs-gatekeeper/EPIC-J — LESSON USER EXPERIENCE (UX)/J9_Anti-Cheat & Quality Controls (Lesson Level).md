## FEATURE CONTEXT

- Epic: EPIC-J — LESSON USER EXPERIENCE (UX)
- Feature: J9_Anti-Cheat & Quality Controls (Lesson Level)
- Exact input files read:
  - /Users/aryasoni/Desktop/Forgea/docs/agent_orchestrator_output/EPIC-J — LESSON USER EXPERIENCE (UX)/J9_Anti-Cheat & Quality Controls (Lesson Level).md
  - /Users/aryasoni/Desktop/Forgea/docs/code-scout/EPIC-J — LESSON USER EXPERIENCE (UX)/J9_Anti-Cheat & Quality Controls (Lesson Level).md

---

### REQUIRED OFFICIAL DOCUMENTATION

1. Technology: OWASP Application Security Guidance (Top Ten + API Security)
   - Official source: https://owasp.org/
   - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
   - Why required: Guidance for input validation, API hardening, and anti-abuse controls that inform rate-limiting and redaction rules.
   - Decision it informs: Minimum acceptable server-side sanitization and API exposure rules.
   - What breaks without it: Incomplete threat coverage and inconsistent anti-abuse controls.

2. Technology: Content Security Policy (CSP3)
   - Official source: https://www.w3.org/TR/CSP3/
   - Exact version requirement: CSP3
   - Why required: Browser-side mitigation for content embedding, script execution and preventing exfiltration in previews/exports.
   - Decision it informs: CSP header templates for lesson previews and exported artifacts.
   - What breaks without it: Increased XSS/iframe risks in previews and exports.

3. Technology: Rate-limiting & throttling patterns
   - Official sources: Provider docs (Cloudflare/AWS) and general guidance (RFC 7231 for semantics) — pin provider chosen for deployment
   - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
   - Why required: Defines accepted rate-limit header semantics, retry-after behavior, and idempotency expectations for verification endpoints.
   - Decision it informs: Per-IP / per-account limits, burst policies, and CI test semantics.
   - What breaks without it: Undefined throttling behavior and unreliable anti-scraping measures.

4. Technology: Data protection / export redaction guidance (legal/regulatory)
   - Official source: Organization-specific legal guidance (pin required) or GDPR reference: https://gdpr.eu/
   - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
   - Why required: Informs what PII/solution content must be redacted from public exports and previews.
   - Decision it informs: API redaction rules and publish gating metadata.
   - What breaks without it: Potential regulatory exposure and data leaks.

---

### EXISTING INTERNAL DOCS (VERIFIED)

- /Users/aryasoni/Desktop/Forgea/docs/code-scout/EPIC-J — LESSON USER EXPERIENCE (UX)/J9_Anti-Cheat & Quality Controls (Lesson Level).md
  - Coverage status: PARTIAL
  - Exact gaps: Good inventory of missing implementations (watermarking, rate-limiting, publish gating) but no implementer spec or CI validation contract.

- /Users/aryasoni/Desktop/Forgea/forgea-monorepo/services/content-engine/README.md
  - Coverage status: PARTIAL
  - Exact gaps: Placeholder service exists; README enforces isolation but lacks watermarking/redaction API contracts.

- /Users/aryasoni/Desktop/Forgea/forgea-monorepo/packages/schema/prisma/schema.prisma
  - Coverage status: PARTIAL
  - Exact gaps: Prisma models exist for labs/audit but no explicit `Lesson` model or `published`/`reviewed` fields — blocks publish-gating decisions.

---

### DOCUMENTATION COVERAGE DECISION

⚠️ DOCUMENTATION PARTIAL — EXTENSION REQUIRED

Docs to add/extend:

- `/docs/official-docs/EPIC-J/anti-cheat-policy.md` — new: implementer-facing anti-cheat controls, watermarking rules, rate-limiting policy, publish gating metadata.
- `/docs/official-docs/EPIC-J/watermarking-spec.md` — new: visible & invisible watermarking acceptance criteria, artifact verification steps.
- `/docs/official-docs/EPIC-J/publish-gating.md` — new: DB schema additions required, CI gating contract, and audit log requirements.

---

### STUDY GUIDE FOR HUMAN

- Watermarking: Prefer server-side render-time visible watermark + embedded invisible watermark (signed metadata). Visible watermark must include `lessonId` and `publishTimestamp`; invisible watermark must be a signed opaque token embedded in exported HTML or image metadata. Acceptance criteria: watermark present on every public render and export; signature verifies using server key.

- Rate-limiting: Apply layered limits — (1) global per-IP burst (e.g., 200 req/min), (2) per-account steady-state (e.g., 60 req/min), (3) per-endpoint tighter limits for exports/verification endpoints. Acceptance: CI simulates exceed and expects `429` with `Retry-After` header and logged audit event.

- API exposure: Never include `solution` content, raw author PII, or draft-only fields in unauthenticated responses or in static prerenders. Acceptance: automated diff-based export checks fail if forbidden fields appear in prerendered HTML/JSON.

- Publish gating: Require metadata fields `reviewedBy` (user id), `reviewedAt` (timestamp), `approvalState: APPROVED`, and an `auditEntry` created before promoting to `published=true`. CI must block merges that produce published pages without these fields present in manifest.

---

### INTERNAL DOCS TO ADD OR EXTEND

1. `/docs/official-docs/EPIC-J/anti-cheat-policy.md` (new)
   - Purpose: Consolidated anti-cheat controls with rationale, acceptance criteria, and implementer targets.
   - Exact knowledge to add: Watermarking rules, rate-limit tables, API redaction lists, publish gating metadata and audit requirements.
   - Required version pin: OWASP / CSP references.

2. `/docs/official-docs/EPIC-J/watermarking-spec.md` (new)
   - Purpose: Concrete watermarking spec (visible text placement rules, rotation, embed points for invisibly-signed tokens).
   - Exact knowledge to add: Required watermark content, signing algorithm/version (e.g., HMAC-SHA256), embedding points for HTML/images/pdf, and verifier CLI contract.
   - Required version pin: Crypto library/version used for signing.

3. `/docs/official-docs/EPIC-J/publish-gating.md` (new)
   - Purpose: DB schema additions, CI gating manifest, and audit log shape required before allowing `published` state.
   - Exact knowledge to add: Schema diffs (add `Lesson.reviewedBy`, `Lesson.reviewedAt`, `Lesson.approvalState`), audit event examples, and CI manifest checks.
   - Required version pin: Prisma + DB migration tooling versions.

---

### OPEN QUESTIONS / AMBIGUITIES (BLOCKERS)

- Is the canonical lesson source in-repo (`apps/forgea-lessons` / `apps/forgea-labs`) or external (CMS)? If external, CI gating and prerender strategies differ.
- Should watermarking live in `services/content-engine` (centralized) or be part of the webapp rendering pipeline (per-app)? Specify ownership before implementation.
- Is there an existing review/approval field in a canonical DB model? If not, which team owns the DB schema change to add `reviewedBy`/`approvalState`?

---

### MASTER DOCS REGISTRY ACTION

Append the following exact entry to `/docs/master_docs.md`:

- Epic / Feature: EPIC-J / J9 — Anti-Cheat & Quality Controls (Lesson Level)
- Doc path: /docs/docs-gatekeeper/EPIC-J — LESSON USER EXPERIENCE (UX)/J9_Anti-Cheat & Quality Controls (Lesson Level).md
- Status: ADDED (EXTEND)
- Reason: Anti-cheat/watermarking, rate-limiting, and publish gating docs required before publishing lessons.

---

End of gatekeeper brief.
