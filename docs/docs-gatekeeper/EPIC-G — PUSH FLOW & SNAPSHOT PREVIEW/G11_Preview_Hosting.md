# FEATURE DOCS BRIEF — G11: Preview Hosting

**FEATURE CONTEXT**

- Epic: EPIC-G — PUSH FLOW & SNAPSHOT PREVIEW
- Feature: G11 — Preview Hosting
- Exact input files read:
  - /Users/aryasoni/Desktop/Forgea/docs/agent_orchestrator_output/EPIC-G — PUSH FLOW & SNAPSHOT PREVIEW/G11_Preview_Hosting.md
  - /Users/aryasoni/Desktop/Forgea/docs/tasks/master_tasks_V1/EPIC-G— PUSH FLOW & SNAPSHOT PREVIEW.md
  - /Users/aryasoni/Desktop/Forgea/docs/code-scout/EPIC-G — PUSH FLOW & SNAPSHOT PREVIEW/G11_Preview_Hosting.md
  - /Users/aryasoni/Desktop/Forgea/docs/master_docs.md
  - /Users/aryasoni/Desktop/Forgea/docs/official-docs-registry.md

---

## REQUIRED OFFICIAL DOCUMENTATION

For each required concept below provide canonical source and pin requirements.

1. Technology: Content Security Policy (CSP)

- Concept: CSP header values and directives to prevent script/frame/data leakage
- Official source: https://www.w3.org/TR/CSP3/
- Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- Why required: Defines allowed resource origins for preview content and prevents client-side data exfiltration or injected scripts in previews.
- Decision it informs: Exact `Content-Security-Policy` header template applied at edge/origin.
- What breaks without it: Previews risk cross-site scripting, third-party script inclusion, and credential exposure.

2. Technology: Robots / Indexing (robots.txt & X-Robots-Tag)

- Concept: Preventing search-engine indexing and crawling of preview URLs
- Official source: https://www.robotstxt.org/
- Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- Why required: Ensures previews are not indexed or cached by search engines.
- Decision it informs: Robots meta/header values and sitemap exclusions.
- What breaks without it: Previews may be indexed and publicly discoverable.

3. Technology: HTTP Caching Semantics

- Concept: Cache-Control and revalidation best-practices for immutable snapshots vs ephemeral previews
- Official source: https://datatracker.ietf.org/doc/html/rfc7234
- Exact version requirement: RFC 7234
- Why required: Determines TTL for CDN caching and ETag/immutable headers for snapshot assets.
- Decision it informs: CDN caching rules, `Cache-Control` header values and purge strategy.
- What breaks without it: Stale previews or unnecessary origin load/purges.

4. Technology: TLS (HTTPS) / Certificate Management

- Concept: TLS v1.2/1.3 guidance and ACME/managed certificate approaches
- Official source: https://www.rfc-editor.org/rfc/rfc8446.html (TLS 1.3)
- Exact version requirement: RFC 8446 (TLS 1.3) recommended
- Why required: Ensures preview domain traffic is encrypted and certificate provisioning methods are defined.
- Decision it informs: TLS termination location (CDN vs origin) and certificate automation approach.
- What breaks without it: Unencrypted previews, browser warnings, and reduced trust.

5. Technology: CDN Provider Guidance (Caching & Header Rewrites)

- Concept: CDN behavior for immutable snapshot caching, header injection, and origin ACLs
- Official source: Provider docs (select & pin one: e.g., Cloudflare, AWS CloudFront, Fastly)
- Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- Why required: Determines how to inject headers (CSP, X-Robots-Tag), enforce GET-only at edge, and configure signed URLs or origin ACLs.
- Decision it informs: CDN-level enforcement vs origin enforcement for headers and method restrictions.
- What breaks without it: Inconsistent header application and insecure preview exposure.

6. Technology: Referrer-Policy, X-Frame-Options, Permissions-Policy

- Concept: Browser privacy headers and frame/permission restrictions
- Official source: MDN + WHATWG / W3C specs (pin exact sources per header)
- Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
- Why required: Prevent sending referrer information, disallow framing, and restrict feature APIs in previews.
- Decision it informs: Exact header values to apply to all preview responses.
- What breaks without it: Accidental referrer leaks, clickjacking, or use of sensitive device APIs.

---

## EXISTING INTERNAL DOCS (VERIFIED)

- /Users/aryasoni/Desktop/Forgea/docs/agent_orchestrator_output/EPIC-G — PUSH FLOW & SNAPSHOT PREVIEW/G11_Preview_Hosting.md
  - Coverage status: SUFFICIENT for orchestration and agent assignment
  - Gaps: No hosting contract, header templates, or CDN/TLS checklist.

- /Users/aryasoni/Desktop/Forgea/docs/tasks/master_tasks_V1/EPIC-G— PUSH FLOW & SNAPSHOT PREVIEW.md
  - Coverage status: SUFFICIENT for task listing
  - Gaps: No operational checklist, no exact header values or acceptance tests.

- /Users/aryasoni/Desktop/Forgea/docs/code-scout/EPIC-G — PUSH FLOW & SNAPSHOT PREVIEW/G11_Preview_Hosting.md
  - Coverage status: PARTIAL
  - Exact gaps: No `services/preview/**` implementation found, no infra manifests, no header/CSP templates, and no acceptance-tests.

---

## DOCUMENTATION COVERAGE DECISION

⚠️ DOCUMENTATION PARTIAL — EXTENSION REQUIRED

Docs to extend/create:

- `/docs/official-docs/EPIC-G/preview-hosting.md` — canonical hosting contract (required)
- `/docs/official-docs/EPIC-G/preview-infra-checklist.md` — DNS/CDN/TLS/ops checklist (required)
- Extend `/docs/code-scout/EPIC-G — PUSH FLOW & SNAPSHOT PREVIEW/G11_Preview_Hosting.md` with references to the planner-architect output.

---

## STUDY GUIDE FOR HUMAN (KEY CONCEPTS)

- Preview URL format: Use opaque snapshot IDs that are content-addressed or stable UUIDs; avoid embedding user-identifying info.
- Why CSP & header hygiene exist: Prevent scripts or iframes from executing or exfiltrating user data from previews.
- Alternatives: Signed expiring URLs for per-user previews vs public immutable snapshot domains.
- When NOT to use: Don't use long-lived public previews for content with PII or legal restrictions.
- Common mistakes: Allowing cookies, forgetting `X-Robots-Tag: noindex`, or permitting `frame-ancestors`.

---

## INTERNAL DOCS TO ADD OR EXTEND (canonical paths)

1. Path: /docs/official-docs/EPIC-G/preview-hosting.md

- Purpose: Canonical preview hosting contract consumed by planner-architect and implementer.
- Exact knowledge to add:
  - Preview URL canonical form and ID semantics
  - Exact header templates (CSP example, X-Frame-Options, Referrer-Policy, Permissions-Policy, X-Robots-Tag, Cache-Control)
  - GET-only enforcement contract and expected edge/origin responses for non-GET
  - Signed URL guidance (if used) and TTLs
  - Acceptance test list and expected numeric thresholds (e.g., 100% of preview responses must include `X-Robots-Tag: noindex`)
- Required version pin: reference CSP/HTTP/TLS pins above.

2. Path: /docs/official-docs/EPIC-G/preview-infra-checklist.md

- Purpose: Operational checklist for integration-checker and implementer
- Exact knowledge to add:
  - DNS zone names and TLS provisioning steps
  - CDN caching rules and header rewrite config
  - Origin ACLs and signed URL config
  - Purge strategy and rollback steps
- Required version pin: provider docs pinned per selection.

---

## OPEN QUESTIONS / AMBIGUITIES (BLOCKERS)

- Should preview domains be public (no auth) or gated per user using signed URLs? This affects header TTLs and CDN config.
- Which CDN/provider will be used (Cloudflare/CloudFront/Fastly)? Provider choice affects exact config snippets.
- Organizational policy on retention of snapshot assets and whether previews must be retained or auto-expired.

---

## MASTER DOCS REGISTRY ACTION

Append the following entry to `/docs/master_docs.md`:

- Date: 2026-02-14
  - Epic / Feature: EPIC-G / G11 — Preview Hosting
  - Doc path: /docs/docs-gatekeeper/EPIC-G — PUSH FLOW & SNAPSHOT PREVIEW/G11_Preview_Hosting.md
  - Status: ADDED (EXTEND)
  - Reason: Docs Gatekeeper brief enumerating required hosting contract, header templates, infra checklist, and acceptance tests for preview hosting.

---

End of gatekeeper brief for G11.
