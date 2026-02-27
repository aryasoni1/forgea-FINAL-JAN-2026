# Contributing to Forgea

Thank you for contributing to the Forgea platform! This document provides guidelines for developers to set up their environment, make changes, and follow our architectural standards.

## Table of Contents

1. [Developer Setup](#developer-setup)
2. [Workspace Architecture](#workspace-architecture)
3. [Making Changes](#making-changes)
4. [Code Standards](#code-standards)
5. [Testing](#testing)
6. [Commit Guidelines](#commit-guidelines)
7. [Pull Request Process](#pull-request-process)
8. [Troubleshooting](#troubleshooting)

## Developer Setup

### Prerequisites

- **Node.js v20.x** or later ([download](https://nodejs.org/))
- **pnpm v10.28.1** (automatically managed by `packageManager` field)
- **Git** for version control
- **VS Code** (recommended) or your preferred editor with TypeScript support

### Initial Setup

```bash
# Clone the repository
git clone https://github.com/forgea/forgea-monorepo.git
cd forgea-monorepo

# Install dependencies (pnpm workspace)
pnpm install

# Verify workspace is healthy
pnpm ls -r --depth -1    # Should show 13 packages
turbo ls                 # Should show valid package graph
```

### IDE Setup

#### VS Code Extensions (Recommended)

```
- ESLint (dbaeumer.vscode-eslint)
- TypeScript Vue Plugin (Vue.volar)
- Prisma (prisma.prisma)
- GitLens (eamodio.gitlens)
- Turbo Console Log (chakrounodos.turbo-console-log)
```

#### TypeScript Setup

VS Code should automatically detect TypeScript via workspace `tsconfig.json`. If not:

1. Open Command Palette (⌘+⇧+P on Mac, Ctrl+⇧+P on Windows)
2. Type "TypeScript: Select TypeScript Version"
3. Choose "Use Workspace Version"

### Environment Variables

Each app may require `.env.local` or `.env` files:

```bash
# Copy example environment
cp .env.example .env.local

# Update with your values (ask team for secrets)
```

## Workspace Architecture

### The Monorepo Structure

```
forgea-monorepo/
├── apps/              ← User-facing applications
│   ├── forgea-labs    ← Lab execution environment
│   ├── forgea-admin   ← Admin dashboard
│   ├── forgea-learn   ← Learning interface
│   └── forgea-lessons ← Lesson authoring
│
├── packages/          ← Shared libraries
│   ├── ui             ← React components
│   ├── schema         ← Database & types
│   ├── config         ← Configuration
│   ├── audit          ← Audit logging
│   ├── design         ← Design system
│   └── markdown       ← Markdown utilities
│
└── services/          ← Backend microservices
    ├── api-core       ← REST API
    ├── content-engine ← Content processing
    └── verification-runner ← Lab verification
```

### Import Boundaries

You must follow these import rules:

#### ✅ Allowed Imports

```typescript
// Apps can import from packages
import { Button } from "@forgea/ui";
import { createClient } from "@forgea/schema";

// Packages can import from other packages
import { config } from "@forgea/config";

// Services can import from packages
import { auditLog } from "@forgea/audit";
```

#### ❌ Not Allowed

```typescript
// Apps cannot import from other apps
import { AdminPanel } from "@forgea/admin";  // ❌ ERROR

// Apps cannot import from services
import { ApiClient } from "@forgea/api-core";  // ❌ ERROR

// Services cannot import from other services
import { verify } from "@forgea/verification-runner";  // ❌ ERROR
```

**ESLint will block these imports automatically.**

For detailed policies, see [../docs/official-docs/repo-boundaries.md](../docs/official-docs/repo-boundaries.md).

## Making Changes

### 1. Create a Feature Branch

```bash
# Update main
git checkout main
git pull origin main

# Create feature branch
git checkout -b feature/my-feature
# or
git checkout -b fix/issue-123
```

Branch naming convention: `{type}/{description}`
- `feature/` — New feature
- `fix/` — Bug fix
- `refactor/` — Code refactoring
- `docs/` — Documentation
- `chore/` — Maintenance

### 2. Make Your Changes

```bash
# Work on your feature
# Edit files in apps/, packages/, or services/

# Run development server
pnpm dev

# Run type checking
pnpm build  # or tsc --build

# Auto-fix linting issues
pnpm exec eslint apps/**/*.ts packages/**/*.ts --fix
```

### 3. Verify Workspace Boundaries

This is **critical** — ensure you haven't created cross-app imports:

```bash
# Check for ESLint boundary violations
pnpm exec eslint apps/**/*.ts apps/**/*.tsx packages/**/*.ts packages/**/*.tsx

# If violations exist, you MUST refactor
# See "How to Fix a Boundary Violation" below
```

### 4. Test Your Changes

```bash
# Run unit tests for changed packages
pnpm test

# Run tests for specific package
pnpm test --filter @forgea/ui
```

### How to Fix a Boundary Violation

If ESLint reports a boundary violation:

```
apps/forgea-labs/src/page.ts
  42:1  error  Forbidden import from app element  boundaries/element-types
```

1. **Identify the problematic import** (line 42 in this case)
2. **Determine if code is truly shared:**
   - If used by 1 app only → keep it in that app (move to `src/` subdirectory)
   - If used by 2+ apps → move to `packages/*`
3. **Move code to appropriate location:**
   ```bash
   # Move to shared package
   mv apps/forgea-labs/shared-component.tsx packages/ui/src/shared-component.tsx
   ```
4. **Update imports:**
   ```typescript
   // Change from:
   import { Component } from "@forgea/admin";
   
   // To:
   import { Component } from "@forgea/ui";
   ```
5. **Verify fix:**
   ```bash
   pnpm exec eslint apps/forgea-labs/src/page.ts
   ```

## Code Standards

### TypeScript

- Use strict mode: `"strict": true`
- All files should have proper type annotations
- Avoid `any` types — use `unknown` and narrow with type guards
- Use enums for fixed string/number values

```typescript
// ✅ Good
interface User {
  id: string;
  name: string;
  email: string;
}

function getUser(id: string): User | null {
  // ...
}

// ❌ Avoid
function getUser(id: any): any {
  // ...
}
```

### React/Component Code

- Use functional components with hooks
- Prefer composition over inheritance
- Use TypeScript interfaces for props
- Document complex components with JSDoc comments

```typescript
// ✅ Good
interface ButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

export function Button({ label, onClick, disabled = false }: ButtonProps) {
  return (
    <button onClick={onClick} disabled={disabled}>
      {label}
    </button>
  );
}

// ❌ Avoid class components unless necessary
class Button extends React.Component {
  // ...
}
```

### File Organization

```
apps/forgea-labs/
├── src/
│   ├── components/          ← React components
│   │   ├── Layout.tsx
│   │   └── pages/
│   ├── utils/               ← Utility functions
│   ├── hooks/               ← Custom React hooks
│   ├── types/               ← TypeScript types
│   ├── styles/              ← CSS/styling
│   └── app.tsx              ← Root component
├── package.json
└── tsconfig.json
```

### Naming Conventions

- **Files:** kebab-case (`my-component.tsx`, `api-client.ts`)
- **Classes/Interfaces:** PascalCase (`UserService`, `ButtonProps`)
- **Functions/Variables:** camelCase (`getUserId`, `isActive`)
- **Constants:** UPPER_SNAKE_CASE (`MAX_RETRIES`, `DEFAULT_PORT`)
- **React Components:** PascalCase file and function name (`MyComponent.tsx`)

## Testing

### Unit Tests

```bash
# Run all tests
pnpm test

# Run tests for specific package
pnpm test --filter @forgea/ui

# Run tests in watch mode
pnpm test --watch
```

### Test Structure

```typescript
// ✅ Good test structure
describe("Button Component", () => {
  it("should render with label", () => {
    const { getByText } = render(<Button label="Click me" onClick={() => {}} />);
    expect(getByText("Click me")).toBeInTheDocument();
  });

  it("should call onClick when clicked", () => {
    const onClick = jest.fn();
    const { getByText } = render(<Button label="Click" onClick={onClick} />);
    fireEvent.click(getByText("Click"));
    expect(onClick).toHaveBeenCalled();
  });
});
```

### Type Checking

```bash
# Check types across entire workspace
pnpm build

# Check types for specific package
cd packages/ui
tsc --build
```

## Commit Guidelines

### Commit Message Format

Follow conventional commits format:

```
{type}({scope}): {description}

{optional body}

{optional footer}
```

**Types:**
- `feat` — New feature
- `fix` — Bug fix
- `refactor` — Code refactoring
- `docs` — Documentation changes
- `style` — Code style (formatting, whitespace)
- `test` — Test updates
- `chore` — Build, dependencies, tooling

**Examples:**

```
feat(ui): add Button component

- Add new Button component with accessibility features
- Include TypeScript types and documentation
- Add unit tests

Closes #123
```

```
fix(schema): correct user type definition

The user type was missing the email field
```

```
chore(deps): update eslint to v10
```

### Before Committing

```bash
# Format code
pnpm exec prettier --write .

# Lint
pnpm exec eslint apps/**/*.ts packages/**/*.ts --fix

# Type check
pnpm build

# Run tests
pnpm test
```

## Pull Request Process

### 1. Create a Pull Request

- Push your branch to GitHub
- Open a pull request against `main`
- Fill in the PR template completely
- Link related issues (e.g., "Closes #123")

### 2. PR Description Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] New feature
- [ ] Bug fix
- [ ] Breaking change
- [ ] Documentation update

## Testing
How was this tested?
- [ ] Unit tests added/updated
- [ ] Manual testing performed
- [ ] All tests passing

## Boundary Check
- [ ] No cross-app imports added
- [ ] ESLint boundaries verification: `pnpm exec eslint apps/**/*.ts packages/**/*.ts`
- [ ] All boundary violations resolved

## Checklist
- [ ] Code follows TypeScript and naming conventions
- [ ] Comments added for complex logic
- [ ] Documentation updated
- [ ] Commit messages follow conventional format
```

### 3. CI Checks

Your PR must pass:
- ✅ ESLint boundary enforcement
- ✅ TypeScript compilation
- ✅ All unit tests
- ✅ pnpm lockfile consistency

**Do not merge if checks fail.**

### 4. Code Review

- Request review from relevant team members
- Respond to feedback and make requested changes
- Re-request review after updates
- Approval from 1-2 reviewers required

### 5. Merge

Once approved and all checks pass:

```bash
# Update your branch
git pull origin main
git rebase main

# Resolve any conflicts

# Push
git push origin feature/my-feature

# Merge via GitHub UI
```

## Troubleshooting

### Issue: "Package not found" errors

**Problem:** Import of `@forgea/ui` fails with "module not found"

**Solution:**
```bash
# Reinstall workspace
pnpm install

# Verify package exists
ls packages/ui/package.json

# If using new package, verify it's in pnpm-workspace.yaml
cat pnpm-workspace.yaml
```

### Issue: TypeScript "cannot find module" error

**Problem:** TypeScript can't resolve a path

**Solution:**
```bash
# Rebuild project references
tsc --build --force

# Or for specific package
cd packages/ui
tsc
```

### Issue: ESLint says "Parser error"

**Problem:** TypeScript parser fails on valid code

**Solution:**
```bash
# Update TypeScript
pnpm update typescript

# Reinstall
pnpm install --frozen-lockfile=false
```

### Issue: "Port already in use" when running `pnpm dev`

**Problem:** Another process is using the development port

**Solution:**
```bash
# Find process on port 3000
lsof -i :3000

# Kill process (Mac/Linux)
kill -9 <PID>

# Or use different port
PORT=3001 pnpm dev
```

### Issue: pnpm lockfile conflicts in merge

**Problem:** Git merge has lockfile conflicts

**Solution:**
```bash
# Take current version
git checkout --ours pnpm-lock.yaml

# Reinstall
pnpm install

# Commit
git add pnpm-lock.yaml
git commit -m "chore: resolve lockfile conflict"
```

## Getting Help

- **Questions?** Ask in #dev-help Slack channel
- **Bug?** Open an issue on GitHub
- **Design question?** Contact @forgea/platform-team
- **Database question?** Contact @forgea/database-team

## Resources

- [Monorepo README](./README.md)
- [Architecture Policies](../docs/official-docs/repo-boundaries.md)
- [ESLint Boundaries Guide](../docs/official-docs/eslint-boundaries.md)
- [TypeScript Configuration](../docs/official-docs/tsconfig.md)
- [pnpm Workspaces](../docs/official-docs/pnpm-workspaces.md)

---

**Happy coding!** Thank you for contributing to Forgea! 🚀
