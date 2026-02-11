# Task B1 — Database Setup How-To (Beginner Guide)

This guide follows the approved plan in [docs/tasks/task-B1-2026-02-09.md](docs/tasks/task-B1-2026-02-09.md) step-by-step.

## Step 1 — Confirm environments (dev, prod)

**What was done:** The implementation includes a local Docker Compose setup for dev and a Terraform stack for prod/shared.

**Why it was necessary:** The task requires separate, reproducible workflows for dev and prod.

**What problem it solves:** It avoids environment drift and makes it clear which tool to use in each environment.

**How a beginner can do it manually:**

1. Use the local Docker Compose setup for development.
2. Use the Terraform stack for production or shared environments.

**How a beginner knows it is correct:**

- The dev configuration exists in [forgea-monorepo/infra/docker-compose/postgres/docker-compose.yml](forgea-monorepo/infra/docker-compose/postgres/docker-compose.yml).
- The Terraform stack exists in [forgea-monorepo/infra/terraform/postgres/main.tf](forgea-monorepo/infra/terraform/postgres/main.tf).

## Step 2 — Choose provisioning path

**What was done:**

- Local dev uses Docker Compose with health checks and an isolated network.
- Prod/shared uses Terraform with a pinned provider and lock file.

**Why it was necessary:** The task requires a concrete, pinned provisioning method in this repo.

**What problem it solves:** It ensures a single, documented way to create and verify PostgreSQL 18.1 setups.

**How a beginner can do it manually:**

1. For dev, copy [forgea-monorepo/infra/docker-compose/postgres/.env.example](forgea-monorepo/infra/docker-compose/postgres/.env.example) to [forgea-monorepo/infra/docker-compose/postgres/.env](forgea-monorepo/infra/docker-compose/postgres/.env) and run Docker Compose.
2. For prod, run Terraform using the provided module and lock file.

For dev SSL certificates:

1. Follow [forgea-monorepo/infra/docker-compose/postgres/certs/README.md](forgea-monorepo/infra/docker-compose/postgres/certs/README.md).
2. Ensure [forgea-monorepo/infra/docker-compose/postgres/certs/server.crt](forgea-monorepo/infra/docker-compose/postgres/certs/server.crt) and [forgea-monorepo/infra/docker-compose/postgres/certs/server.key](forgea-monorepo/infra/docker-compose/postgres/certs/server.key) exist before starting the container.

**How a beginner knows it is correct:**

- Docker Compose uses a health check and an internal network.
- The Terraform stack includes [forgea-monorepo/infra/terraform/postgres/.terraform.lock.hcl](forgea-monorepo/infra/terraform/postgres/.terraform.lock.hcl).

## Step 3 — Define PostgreSQL 18.1 configuration baseline

**What was done:**

- UTC time zone and log time zone are enforced.
- Client encoding is set to UTF8.
- SSL is enabled at the server level.

**Why it was necessary:** These settings are locked decisions and must match official policy.

**What problem it solves:** It prevents time drift, encoding inconsistencies, and insecure connections.

**How a beginner can do it manually:**

1. For dev, start the Docker Compose service; it sets settings via `postgres` runtime flags.
2. For prod, run Terraform; it applies server parameters.

**How a beginner knows it is correct:**

- In dev, `SHOW TimeZone;` returns `UTC`.
- In prod, the Terraform plan includes `postgresql_parameter` for `TimeZone`, `log_timezone`, `client_encoding`, and `ssl`.

## Step 4 — Specify extension strategy

**What was done:**

- `pgcrypto` is installed for `gen_random_uuid()` and cryptographic functions.
- `uuid-ossp` is optional and only enabled for legacy UUID needs.

**Why it was necessary:** The task requires native UUID defaults for new tables while allowing legacy compatibility.

**What problem it solves:** It avoids installing `uuid-ossp` unnecessarily while still supporting older UUID versions if required.

**How a beginner can do it manually:**

1. In Terraform, keep `enable_uuid_ossp = false` unless legacy UUIDs are required.
2. In dev, confirm `pgcrypto` is installed and `uuid-ossp` is only installed when required.

**How a beginner knows it is correct:**

- `SELECT extname FROM pg_extension;` lists `pgcrypto` and only lists `uuid-ossp` when enabled.

## Step 5 — Define Prisma migration workflow

**What was done:**

- Dev uses `prisma migrate dev` with a shadow database.
- Prod/staging uses `prisma migrate deploy`.

**Why it was necessary:** The official Prisma policy requires environment-specific commands.

**What problem it solves:** It prevents unsafe migration workflows in production.

**How a beginner can do it manually:**

1. In dev, run `prisma migrate dev` after schema changes.
2. In prod, run `prisma migrate deploy` to apply existing migrations.

**How a beginner knows it is correct:**

- Migrations appear in the database `_prisma_migrations` table after each command.

## Step 6 — Add verification steps

**What was done:** Manual checks are defined for connectivity, timezone, SSL, and extensions.

**Why it was necessary:** The task requires verification steps for parity and safe defaults.

**What problem it solves:** It ensures local and prod environments match the required configuration.

**How a beginner can do it manually:**

1. Start the dev database with Docker Compose.
2. Connect with `psql` and run the `SHOW` commands listed in the manual checks.

**How a beginner knows it is correct:**

- The `SHOW` outputs match the required values and the connection uses `sslmode=require`.

## Step 7 — Update documentation and registry

**What was done:**

- Added Task B1 guides and manual checks.
- Kept the master docs registry entry already present for B1.

**Why it was necessary:** The task requires updated documentation aligned to the approved plan.

**What problem it solves:** It makes the provisioning approach discoverable for future work.

**How a beginner can do it manually:**

1. Open the guide and manual checks created for Task B1.
2. Follow the steps and confirm the artifacts exist in the repo.

**How a beginner knows it is correct:**

- The new docs exist in [docs/guides/task-B1-how-to.md](docs/guides/task-B1-how-to.md) and [docs/manual-checks/task-B1-manual-checks.md](docs/manual-checks/task-B1-manual-checks.md).

## Notes on `DATABASE_URL`

- The [forgea-monorepo/infra/docker-compose/postgres/.env.example](forgea-monorepo/infra/docker-compose/postgres/.env.example) file provides a safe, non-secret example only.
- Treat all [forgea-monorepo/infra/docker-compose/postgres/.env](forgea-monorepo/infra/docker-compose/postgres/.env) files as local-only and never as authoritative production configuration.
