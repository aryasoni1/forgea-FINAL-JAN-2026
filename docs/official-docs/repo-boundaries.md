# Repository Boundary Policies

## Overview

This document defines the architectural boundaries, ownership patterns, and dependency rules for the Forgea monorepo.

## Core Policies

### Policy 1: No Cross-App Imports

**Rule:** Applications in `apps/*` must not import code from other applications in `apps/*`.

**Rationale:** Each application should be independently deployable and testable. Cross-app imports create tight coupling, making it difficult to modify one app without breaking others.

**Enforcement:** ESLint rule `boundaries/element-types` blocks cross-app imports with severity `error`.

**Exception Path:** If functionality is needed in multiple apps, move it to a shared package (`packages/*`) and import from there.

### Policy 2: Apps Must Use Shared Packages

**Rule:** Applications must import shared code from `packages/*` packages, never directly from other apps or services.

**Rationale:** Shared libraries provide a stable API contract. Direct imports bypass versioning and export controls.

**Enforcement:** ESLint rule `boundaries/element-types` allows `app` → `package` imports only.

**Example:**

```typescript
// ✅ Allowed
import { Button } from "@forgea/ui";

// ❌ Not Allowed
import { Button } from "@forgea/admin/components/Button";
```

### Policy 3: Shared Packages Can Import from Packages

**Rule:** Packages in `packages/*` can import code from other packages in `packages/*`.

**Rationale:** Shared libraries form an interconnected utility layer. Package-to-package dependencies are expected and managed via workspace symlinks.

**Enforcement:** ESLint rule `boundaries/element-types` allows `package` → `package` imports.

**Caveat:** Circular dependencies are forbidden and detected by pnpm configuration (`disallowWorkspaceCycles`).

### Policy 4: Services Must Use Shared Packages

**Rule:** Backend services must import from `packages/*`, not from `apps/*` or other `services/*`.

**Rationale:** Services are internal infrastructure and must not depend on frontend logic. Cross-service dependencies create brittle systems.

**Enforcement:** ESLint rule `boundaries/element-types` allows `service` → `package` imports only.

### Policy 5: Apps Must Not Access Services Directly

**Rule:** Applications must never import from `services/*`.

**Rationale:** Services are internal backend infrastructure and not part of the public API contract. Apps should access services through defined API endpoints or shared interfaces in `packages/*`.

**Enforcement:** ESLint rule `boundaries/element-types` blocks `app` → `service` imports.

**Pattern:** If an app needs service functionality, define a public interface in `packages/*` and have both the app and service use it.

## Ownership Patterns

The `CODEOWNERS` file at the repository root defines ownership for different parts of the codebase:

### Applications

```
/apps/                                  @forgea/platform-team
/apps/forgea-labs/                      @forgea/labs-team
/apps/forgea-admin/                     @forgea/admin-team
/apps/forgea-learn/                     @forgea/learning-team
/apps/forgea-lessons/                   @forgea/lessons-team
```

Each application team is responsible for:

- Code quality and style consistency
- Feature development and testing
- Performance and accessibility
- Integration with shared packages

### Shared Packages

```
/packages/                              @forgea/platform-team
/packages/schema/                       @forgea/database-team
/packages/audit/                        @forgea/security-team
/packages/config/                       @forgea/infra-team
```

Shared package teams are responsible for:

- API stability and backward compatibility
- Version management and changelogs
- Cross-app testing and validation
- Documentation of public exports

### Services

```
/services/                              @forgea/backend-team
/services/api-core/                     @forgea/api-team
/services/content-engine/               @forgea/content-team
/services/verification-runner/          @forgea/verification-team
```

Service teams are responsible for:

- Service availability and performance
- Internal API contracts
- Deployment and monitoring
- Database access and queries

### Hard Lock Zones

Certain files require special approval and cannot be modified without explicit authorization:

```
/packages/schema/prisma/migrations/     @forgea/database-team (READ-ONLY)
/packages/schema/prisma/schema.prisma   @forgea/database-team (CRITICAL)
/.github/workflows/                     @forgea/platform-team (CRITICAL)
```

**Hard Lock Rules:**

- Changes to migration files require explicit approval from database team
- Changes to Prisma schema require migration and review
- Changes to CI workflows require platform team sign-off
- Bypass of these rules is logged and audited

## Dependency Flow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│ Applications (apps/*)                                       │
│ - forgea-labs, forgea-admin, forgea-learn, forgea-lessons  │
│                                                             │
│ ⬇️  Can import from ⬇️                                     │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ Shared Packages (packages/*)                                │
│ - ui, schema, config, audit, design, markdown              │
│                                                             │
│ ⬆️  Can import from each other ⬆️                          │
│ ⬇️  Can be used by services ⬇️                            │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ Services (services/*)                                       │
│ - api-core, content-engine, verification-runner            │
│                                                             │
│ ❌ Cannot be accessed by apps ❌                            │
│ ❌ Cannot access each other ❌                              │
└─────────────────────────────────────────────────────────────┘
```

## Architecture Validation

### Automated Checks

The following automated checks enforce these policies:

1. **ESLint Boundaries Check**
   - Command: `pnpm exec eslint apps/**/*.ts packages/**/*.ts`
   - Failure: Exit code 1 if any boundary violations
   - CI Integration: Required to pass before merge

2. **pnpm Workspace Consistency Check**
   - Command: `pnpm ls -r --depth -1`
   - Validates all packages are discovered correctly
   - Detected inconsistencies should be investigated

3. **Turborepo Graph Validation**
   - Command: `turbo ls`
   - Ensures package graph can be constructed
   - Detects circular dependencies

### Manual Review

Code review checklist for pull requests:

- [ ] New imports follow allowed patterns (see Policy 2-5)
- [ ] Shared code is in `packages/*`, not duplicated in `apps/*`
- [ ] Service code is not directly imported by apps
- [ ] No new circular dependencies introduced
- [ ] CODEOWNERS approval obtained if ownership affected

## Refactoring Strategy

If you discover code that violates these policies, follow this refactoring path:

1. **Identify Violation:** Find the cross-boundary import
2. **Classify Code:** Determine if it's truly shared or app-specific
3. **Move to Package:** If shared, move to appropriate `packages/*`
4. **Update Imports:** Change all consumers to import from package
5. **Test Thoroughly:** Ensure functionality still works
6. **Document:** Add comment explaining why code is in that package
7. **Verify ESLint:** Run boundary check to confirm fix

## When to Create a New Package

Create a new package in `packages/*` if:

- Code is used by 2+ apps or services
- Code provides a stable, reusable interface
- Code may be shared externally in the future
- Code has independent versioning requirements

Do NOT create a new package for:

- Code used by only one app (keep it in that app)
- Code that changes every sprint (keep it private to app)
- Code with experimental or unstable APIs

## Reserved Package Names

The following package names are reserved and should not be created:

- `@forgea/core` — Reserved for foundational types and utilities
- `@forgea/api` — Reserved for external API schemas
- `@forgea/types` — Reserved for shared type definitions

If you need one of these, discuss with the platform team first.

## Change Request Process

To propose changes to these boundary policies:

1. Create an issue describing the limitation
2. Provide specific use case and business justification
3. Propose new policy wording
4. Get approval from @forgea/platform-team
5. Update this document and all related documentation
6. Announce change in team channels

## References

- ESLint Configuration: [docs/official-docs/eslint-boundaries.md](./eslint-boundaries.md)
- Workspace Configuration: [docs/official-docs/pnpm-workspaces.md](./pnpm-workspaces.md)
- TypeScript Configuration: [docs/official-docs/tsconfig.md](./tsconfig.md)
- CODEOWNERS File: [forgea-monorepo/CODEOWNERS](../../forgea-monorepo/CODEOWNERS)
