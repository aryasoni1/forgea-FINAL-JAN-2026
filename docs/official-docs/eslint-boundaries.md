# ESLint Import Boundary Enforcement

## Overview

This document describes the ESLint import boundary enforcement system for the Forgea monorepo, which prevents unwanted coupling between applications while allowing shared library imports.

## Architecture Elements

The monorepo is divided into three architectural elements:

| Element | Pattern | Purpose |
|---------|---------|---------|
| `app` | `apps/*` | User-facing applications |
| `package` | `packages/*` | Shared libraries and utilities |
| `service` | `services/*` | Backend microservices |

## Allowed Import Patterns

The following import relationships are **allowed**:

| From | To | Allowed |
|------|----|---------| 
| `app` | `package` | ✅ YES |
| `package` | `package` | ✅ YES |
| `service` | `package` | ✅ YES |

## Blocked Import Patterns

The following import relationships are **blocked**:

| From | To | Blocked | Reason |
|------|----|---------|---------| 
| `app` | `app` | ❌ NO | Prevents cross-app coupling |
| `app` | `service` | ❌ NO | Prevents app access to internal services |
| `service` | `app` | ❌ NO | Prevents service access to frontend logic |
| `service` | `service` | ❌ NO | Prevents cross-service coupling |

## Configuration

The boundary enforcement is configured in `/forgea-monorepo/eslint.config.js`:

```javascript
import boundaries from "eslint-plugin-boundaries";

export default [
  {
    files: ["**/*.js", "**/*.ts", "**/*.jsx", "**/*.tsx"],
    plugins: { boundaries },
    settings: {
      "boundaries/elements": [
        { type: "app", pattern: "apps/*" },
        { type: "package", pattern: "packages/*" },
        { type: "service", pattern: "services/*" },
      ],
    },
    rules: {
      "boundaries/element-types": [
        2,  // Severity: 2 = error (fail-closed enforcement)
        {
          default: "disallow",
          rules: [
            { from: "app", allow: ["package"] },
            { from: "package", allow: ["package"] },
            { from: "service", allow: ["package"] },
          ],
        },
      ],
    },
  },
];
```

## Verification

### Run ESLint Locally

```bash
cd forgea-monorepo
pnpm exec eslint "apps/**/*.ts" "apps/**/*.tsx" "packages/**/*.ts"
```

If any boundary violations exist, ESLint will report them with the file path, line number, and violation details.

### Expected Output (Success)

```
✔ 0 errors, 0 warnings
```

### Example Violation

If an app attempts to import from another app:

```typescript
// ❌ VIOLATION: apps/forgea-labs/src/page.ts
import { SomeComponent } from "@forgea/admin";  // ERROR: Cross-app import
```

ESLint output:

```
apps/forgea-labs/src/page.ts
  1:1  error  Forbidden import from app element  boundaries/element-types
```

## Rule Severity

The `boundaries/element-types` rule is configured with severity **2 (error)**, which means:

- **ESLint exit code 1** if any violations found
- **CI/CD pipelines fail** (most CI systems fail on exit code ≠ 0)
- **Pre-commit hooks can block commits** (with proper git hooks)
- Cannot be suppressed with `--max-warnings` flag (errors always fail)

## Enforcement Strategy

### Phase 1: Local Development

1. Developers run `pnpm exec eslint` to verify imports locally
2. IDE ESLint extensions highlight violations in real time
3. Pre-commit hooks (future task) will block commits with violations

### Phase 2: Continuous Integration

1. CI pipeline runs ESLint as a mandatory check
2. Pull requests cannot merge if ESLint exits with code 1
3. Failed check indicates boundary violations must be fixed

### Phase 3: Enforcement Automation

1. Branch protection rules require ESLint checks to pass
2. Only approved maintainers can override failed checks (with documentation)
3. Violation history is tracked in commit logs and code review

## How to Fix a Boundary Violation

If you receive a boundary violation error:

### Step 1: Understand the Violation

```
apps/forgea-labs/src/admin.ts
  42:1  error  Forbidden import from app element  boundaries/element-types
```

This indicates that `forgea-labs` (an app) is importing something from another app, which is not allowed.

### Step 2: Identify the Import

Look at the file and line number:

```typescript
// apps/forgea-labs/src/admin.ts, line 42
import { AdminPanel } from "@forgea/admin";  // ❌ Cross-app import
```

### Step 3: Move Shared Code to a Package

If the `AdminPanel` component is used by multiple apps, move it to a shared package:

```bash
# Move component to shared package
mv apps/forgea-admin/src/components/AdminPanel.tsx packages/ui/src/AdminPanel.tsx

# Update package export
# packages/ui/src/index.ts
export { AdminPanel } from "./AdminPanel";
```

### Step 4: Import from the Package

Update the import in the app:

```typescript
// apps/forgea-labs/src/admin.ts
import { AdminPanel } from "@forgea/ui";  // ✅ Import from shared package
```

### Step 5: Verify the Fix

```bash
pnpm exec eslint apps/forgea-labs/src/admin.ts
```

Should report no errors.

## Inline Disable (Restricted)

ESLint disable comments are **not recommended** for boundary violations. If you absolutely must suppress a violation temporarily:

```typescript
// eslint-disable-next-line boundaries/element-types
import { SomeComponent } from "@forgea/admin";
```

However, this should be treated as a temporary measure. Create a follow-up task to properly refactor the code.

## Testing Boundary Enforcement

To test that boundary enforcement is working:

### Test 1: Verify Rule Configuration

```bash
cd forgea-monorepo
pnpm exec eslint --print-config apps/forgea-labs/src/main.ts | grep -A 10 "boundaries"
```

Should show the rule is configured with severity `2` and the correct allow/disallow rules.

### Test 2: Create a Test Violation

Create a temporary test file:

```typescript
// apps/forgea-labs/src/test-violation.ts
import { something } from "@forgea/admin";  // ❌ Should trigger violation
```

Run ESLint:

```bash
pnpm exec eslint apps/forgea-labs/src/test-violation.ts
```

Should report a `boundaries/element-types` error.

### Test 3: Allowed Import

Create a test for allowed imports:

```typescript
// apps/forgea-labs/src/test-allowed.ts
import { Button } from "@forgea/ui";  // ✅ Should NOT trigger violation
```

Run ESLint:

```bash
pnpm exec eslint apps/forgea-labs/src/test-allowed.ts
```

Should report no errors.

Clean up test files after verification.

## Future Enhancements

### Phase 2: Hard Lock Zones (Future)

For sensitive areas like database migrations, audit logs, and core infrastructure:

```javascript
{
  "linterOptions": {
    "noInlineConfig": true,  // Prevent eslint-disable comments
    "reportUnusedDisableDirectives": "error"  // Flag old suppressions
  }
}
```

This prevents developers from using `eslint-disable` comments in protected files.

### Phase 3: Automated Remediation (Future)

Tooling to automatically refactor cross-app imports:

```bash
pnpm exec eslint --fix  # (if eslint-plugin-boundaries supports --fix)
```

Or custom scripts to identify and refactor violations.

## References

- [eslint-plugin-boundaries Documentation](https://github.com/jamiemason/eslint-plugin-boundaries)
- [ESLint Configuration Reference](https://eslint.org/docs/latest/use/configure/)
- [ESLint CLI Reference](https://eslint.org/docs/latest/use/command-line-interface/)

## Support

If you encounter issues with boundary enforcement:

1. Run `pnpm exec eslint --debug` to see detailed diagnostic information
2. Check that all packages have valid `package.json` files
3. Verify that the package path patterns in `eslint.config.js` match your directory structure
4. See `docs/official-docs/repo-boundaries.md` for high-level architecture policies
