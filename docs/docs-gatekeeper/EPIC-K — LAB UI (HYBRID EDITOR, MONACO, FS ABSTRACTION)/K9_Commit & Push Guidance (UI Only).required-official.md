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
