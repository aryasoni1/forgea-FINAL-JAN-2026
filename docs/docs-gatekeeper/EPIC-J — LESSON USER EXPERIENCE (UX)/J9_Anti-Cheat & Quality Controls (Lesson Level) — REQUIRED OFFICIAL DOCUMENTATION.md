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
