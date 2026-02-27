# Feature Flags (LaunchDarkly / Patterns)

- Category: Ops / Feature Management
- Epics: B
- Version / Requirement: Provider-specific (pin required)
- Intent / Critical Decision: Guidance for using feature flags to manage rollout, experiments, and safe launches in database-related changes.

## EPIC-B — Notes

- Mentioned in: EPIC-B — DATABASE CORE & HARDENING (B9 Admin & Control Tables)
- EPIC-B intent: Use feature flags to gate schema-backed behavior, gradual rollouts of migrations/backfills, and admin controls for toggling features.
- Important points:
  - Use kill-switch flags for high-risk DB changes (ability to disable new code paths quickly).
  - Tie flag changes to audit logs and require approvals for production-wide flag changes; map changes to admin tables for traceability.
  - For migrations that require code changes, use feature flags to deploy code that supports both old and new schemas and perform gradual data migrations behind flags.
  - Recommend flag naming conventions, TTLs, and cleanup policies to avoid long-lived technical debt.
  - If using LaunchDarkly or similar, pin SDK versions and document webhook handling for events and audit trails.
