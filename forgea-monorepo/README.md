# Forgea Monorepo

A comprehensive educational platform monorepo featuring a modular architecture with frontend applications, shared libraries, and backend services.

## Architecture

```
forgea-monorepo/
├── apps/              (4 user-facing applications)
│   ├── forgea-labs    (Lab environment and IDE)
│   ├── forgea-admin   (Admin dashboard)
│   ├── forgea-learn   (Learning interface)
│   └── forgea-lessons (Lesson authoring)
├── packages/          (6 shared libraries)
│   ├── ui             (Shared UI components)
│   ├── schema         (Database and types)
│   ├── config         (Configuration management)
│   ├── audit          (Audit logging)
│   ├── design         (Design system)
│   └── markdown       (Markdown processing)
└── services/          (3 backend services)
    ├── api-core       (Core API server)
    ├── content-engine (Content processing)
    └── verification-runner (Lab verification)
```

## Quick Start

### Prerequisites

- **Node.js** v20.x or later
- **pnpm** v10.28.1 (automatically detected by `packageManager` field)
- **Git** (for version control)

### Installation

```bash
# Clone the repository
git clone https://github.com/forgea/forgea-monorepo.git
cd forgea-monorepo

# Install dependencies (pnpm workspace)
pnpm install

# Verify workspace discovery
pnpm ls -r --depth -1
```

### Development

```bash
# Start development servers for all apps
pnpm dev

# Run build for all packages
pnpm build

# Run linting for architecture boundaries
pnpm exec eslint apps/**/*.ts packages/**/*.ts
```

### Workspace Verification

```bash
# Verify all 13 packages are discovered
pnpm ls -r --depth -1

# Verify Turborepo package graph
turbo ls
```

## Key Features

- **Monorepo Management:** Unified workspace with pnpm, Turborepo, and TypeScript Project References
- **Boundary Enforcement:** ESLint prevents cross-app imports while allowing shared library usage
- **Type Safety:** Full TypeScript support with composite project references
- **Atomic Operations:** All workspace changes are coordinated across config files

## Architecture Policies

### No Cross-App Imports

Applications must not import from other applications. Shared code goes in `packages/*`.

### Allowed Import Patterns

- `apps/*` → `packages/*` ✅
- `packages/*` → `packages/*` ✅
- `services/*` → `packages/*` ✅

### Blocked Import Patterns

- `apps/*` → `apps/*` ❌
- `apps/*` → `services/*` ❌
- `services/*` → `services/*` ❌

For detailed policies, see [docs/official-docs/repo-boundaries.md](../docs/official-docs/repo-boundaries.md).

## Configuration Files

- **pnpm Workspace:** [pnpm-workspace.yaml](./pnpm-workspace.yaml) — Defines workspace packages
- **Root Package.json:** [package.json](./package.json) — Root dependencies and scripts
- **ESLint Config:** [eslint.config.js](./eslint.config.js) — Boundary enforcement rules
- **TypeScript:** [tsconfig.json](./tsconfig.json) — Solution-style root config with Project References
- **Turborepo:** [turbo.json](./turbo.json) — Build pipeline configuration

## Documentation

- [CONTRIBUTING.md](./CONTRIBUTING.md) — Developer setup and contribution guidelines
- [docs/official-docs/pnpm-workspaces.md](../docs/official-docs/pnpm-workspaces.md) — Workspace configuration details
- [docs/official-docs/tsconfig.md](../docs/official-docs/tsconfig.md) — TypeScript strategy
- [docs/official-docs/eslint-boundaries.md](../docs/official-docs/eslint-boundaries.md) — Boundary enforcement guide
- [docs/official-docs/repo-boundaries.md](../docs/official-docs/repo-boundaries.md) — Architecture policies

## Project Structure

### Apps

Each application is independently deployable:

- **forgea-labs** — Lab execution environment with integrated IDE
- **forgea-admin** — Admin console for platform management
- **forgea-learn** — Student learning dashboard
- **forgea-lessons** — Instructor lesson creation tool

### Packages

Shared libraries used across multiple apps and services:

- **@forgea/ui** — Shared React components and design system
- **@forgea/schema** — Prisma schema, database types, and generated clients
- **@forgea/config** — Configuration management and secrets
- **@forgea/audit** — Audit logging and compliance
- **@forgea/design** — Design tokens and style system
- **@forgea/markdown** — Markdown parsing and rendering utilities

### Services

Backend microservices:

- **@forgea/api-core** — REST API server
- **@forgea/content-engine** — Lab content processing and templating
- **@forgea/verification-runner** — Automated lab verification and testing

## Development Workflow

### 1. Create a Feature Branch

```bash
git checkout main
git pull
git checkout -b feature/your-feature-name
```

### 2. Make Changes

```bash
# Edit source files, add tests
pnpm exec eslint apps/**/*.ts --fix  # Auto-fix lint issues
```

### 3. Verify Boundaries

```bash
pnpm exec eslint apps/**/*.ts packages/**/*.ts
```

Ensure no architectural boundaries are violated.

### 4. Test Changes

```bash
pnpm build
pnpm test
```

### 5. Commit and Push

```bash
git add .
git commit -m "feat: describe your changes"
git push origin feature/your-feature-name
```

### 6. Create Pull Request

- Link to relevant issues
- Describe changes and rationale
- Ensure CI checks pass
- Request review from appropriate teams

See [CONTRIBUTING.md](./CONTRIBUTING.md) for detailed guidelines.

## Continuous Integration

The CI pipeline validates:

- ✅ ESLint boundaries (no cross-app imports)
- ✅ TypeScript compilation (no type errors)
- ✅ Unit tests (all tests pass)
- ✅ Build verification (apps and packages build)
- ✅ pnpm lockfile consistency (locked dependencies)

Pull requests cannot merge until all checks pass.

## Monorepo Commands

### Installation & Setup

```bash
pnpm install          # Install all dependencies
pnpm install --frozen-lockfile  # CI mode (fail if lockfile out of sync)
```

### Development

```bash
pnpm dev              # Start all dev servers
pnpm build            # Build all packages
pnpm lint             # Run linting (ESLint + TypeScript)
pnpm test             # Run all tests
```

### Workspace Information

```bash
pnpm ls -r --depth -1           # List all workspace packages
turbo ls                        # Verify Turborepo package graph
pnpm list package-name          # View dependencies of a package
```

### Adding Dependencies

**Add to root devDependencies:**

```bash
pnpm add -Dw package-name
```

**Add to specific package:**

```bash
pnpm add package-name --filter @forgea/ui
```

**Add peer dependency:**

```bash
pnpm add package-name --filter @forgea/ui -P
```

## Troubleshooting

### Issue: Package not found

**Problem:** `pnpm ls` doesn't show all packages

**Solution:**

```bash
# Verify package.json exists in directory
ls apps/my-app/package.json

# Reinstall workspace
pnpm install
```

### Issue: ESLint boundary violations

**Problem:** ESLint reports cross-app imports

**Solution:** Move shared code to `packages/*`

```bash
mv apps/app-a/shared.ts packages/shared/src/shared.ts
# Update imports to: import { ... } from "@forgea/shared"
```

### Issue: TypeScript compilation error

**Problem:** Type errors in app or package

**Solution:**

```bash
cd packages/schema
tsc --build
```

Check for circular dependencies or missing composite flag.

### Issue: pnpm lockfile out of sync

**Problem:** CI fails with "pnpm-lock.yaml out of sync"

**Solution:**

```bash
rm pnpm-lock.yaml
pnpm install
git add pnpm-lock.yaml
git commit -m "chore: regenerate lockfile"
```

## Support

For questions or issues:

- Check the [documentation](../docs/)
- Open an issue on GitHub
- Contact the platform team: @forgea/platform-team

## License

Proprietary — Forgea Educational Platform

## Maintainers

- **Platform Team** (@forgea/platform-team) — Monorepo structure and tooling
- **App Teams** — Individual application maintenance
- **Backend Team** (@forgea/backend-team) — Service infrastructure
