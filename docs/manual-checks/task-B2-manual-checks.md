# Task B2 Manual Checks

These checks validate Prisma setup and migration policies for Task B2.

## Docs and Policy Alignment

1. Verify the Prisma policy docs are updated:
   - [docs/official-docs/EPIC-B/prisma_official.md](docs/official-docs/EPIC-B/prisma_official.md)
   - [docs/official-docs/EPIC-B/prisma_migrations.md](docs/official-docs/EPIC-B/prisma_migrations.md)

2. Verify the master docs registry entry exists:
   - [docs/master_docs.md](docs/master_docs.md)

## Schema and Config Checks

1. Confirm the schema datasource is set via env:
   - Open [forgea-monorepo/packages/schema/prisma/schema.prisma](forgea-monorepo/packages/schema/prisma/schema.prisma).
   - Confirm there is exactly one `datasource` block with `url = env("DATABASE_URL")`.

2. Confirm generator output path:
   - In [forgea-monorepo/packages/schema/prisma/schema.prisma](forgea-monorepo/packages/schema/prisma/schema.prisma), verify `generator client` has `output = "../../node_modules/@prisma/client"`.

3. Confirm config does not override datasource:
   - Open [forgea-monorepo/packages/schema/prisma.config.mjs](forgea-monorepo/packages/schema/prisma.config.mjs).
   - Confirm there is no datasource URL defined in the config.

## Migration Workflow Checks

1. Verify migration history folder exists:
   - [forgea-monorepo/packages/schema/prisma/migrations](forgea-monorepo/packages/schema/prisma/migrations)

2. Verify migration lock file exists and is unchanged:
   - [forgea-monorepo/packages/schema/prisma/migrations/migration_lock.toml](forgea-monorepo/packages/schema/prisma/migrations/migration_lock.toml)

3. Verify dev workflow uses `prisma migrate dev` and prod uses `prisma migrate deploy`:
   - Confirm these commands are documented in [docs/official-docs/EPIC-B/prisma_migrations.md](docs/official-docs/EPIC-B/prisma_migrations.md).
