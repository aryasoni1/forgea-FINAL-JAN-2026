# RBAC (Role-Based Access Control)

- Category: Auth / Authorization
- Epics: C
- Version / Requirement: Policy-guided (pin related libraries if used)
- Intent / Critical Decision: Define the canonical RBAC model for the application, mapping roles to permissions and enforcement points.

## EPIC-C — Notes

- Mentioned in: EPIC-C — AUTHENTICATION & RBAC (C6)
- EPIC-C intent: Provide a simple, auditable RBAC model to protect admin operations and content management features.
- Important points:
  - Model: Define `Role`, `Permission`, and `RoleAssignment` models in Prisma; limit role inheritance complexity to keep audits simple.
  - Enforcement: Enforce checks at the API layer (authorization middleware) and database row-level (RLS) where applicable for strong guarantees.
  - Admin UI: Map admin operations to permissions and ensure `CODEOWNERS`/review policies align with critical roles.
  - Auditing: Record role assignment changes and permission-grant events in audit logs with operator identity, timestamp, and reason.
  - Migration: Provide guidance for adding/removing roles, migrating existing user assignments, and handling orphaned permissions.
