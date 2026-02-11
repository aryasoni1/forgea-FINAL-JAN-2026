# Task B1 Manual Checks

These checks are for the artifacts created in Task B1.

## Files and Structure

1. Verify the local dev Docker Compose files exist:
   - Check that [forgea-monorepo/infra/docker-compose/postgres/docker-compose.yml](forgea-monorepo/infra/docker-compose/postgres/docker-compose.yml) is present.
   - Check that [forgea-monorepo/infra/docker-compose/postgres/.env.example](forgea-monorepo/infra/docker-compose/postgres/.env.example) is present.

2. Verify the Terraform provisioning stack exists:
   - Check that [forgea-monorepo/infra/terraform/postgres/main.tf](forgea-monorepo/infra/terraform/postgres/main.tf) is present.
   - Check that [forgea-monorepo/infra/terraform/postgres/variables.tf](forgea-monorepo/infra/terraform/postgres/variables.tf) is present.
   - Check that [forgea-monorepo/infra/terraform/postgres/versions.tf](forgea-monorepo/infra/terraform/postgres/versions.tf) is present.
   - Check that [forgea-monorepo/infra/terraform/postgres/outputs.tf](forgea-monorepo/infra/terraform/postgres/outputs.tf) is present.
   - Check that [forgea-monorepo/infra/terraform/postgres/README.md](forgea-monorepo/infra/terraform/postgres/README.md) is present.
   - Check that [forgea-monorepo/infra/terraform/postgres/.terraform.lock.hcl](forgea-monorepo/infra/terraform/postgres/.terraform.lock.hcl) is present.

## Local Dev Database Verification (Docker Compose)

1. Create a working env file:
   - Copy [forgea-monorepo/infra/docker-compose/postgres/.env.example](forgea-monorepo/infra/docker-compose/postgres/.env.example) to [forgea-monorepo/infra/docker-compose/postgres/.env](forgea-monorepo/infra/docker-compose/postgres/.env) in the same folder.
   - Adjust values for local use (do not commit secrets).

2. Prepare local SSL certificates:
   - Follow [forgea-monorepo/infra/docker-compose/postgres/certs/README.md](forgea-monorepo/infra/docker-compose/postgres/certs/README.md).
   - Confirm [forgea-monorepo/infra/docker-compose/postgres/certs/server.crt](forgea-monorepo/infra/docker-compose/postgres/certs/server.crt) and [forgea-monorepo/infra/docker-compose/postgres/certs/server.key](forgea-monorepo/infra/docker-compose/postgres/certs/server.key) exist in the certs folder.

3. Start the database locally:
   - Run `docker compose up -d` from the compose folder.

4. Confirm the container is healthy:
   - Run `docker ps` and verify the container shows `healthy` in the status.

5. Validate server settings in the database:
   - Connect with `psql` using the local `DATABASE_URL`.
   - Run:
     - `SHOW TimeZone;`
     - `SHOW log_timezone;`
     - `SHOW client_encoding;`
     - `SHOW ssl;`
   - Confirm the values read `UTC`, `UTC`, `UTF8`, and `on`.

6. Validate extensions in the database:
   - Run `SELECT extname FROM pg_extension ORDER BY extname;`
   - Confirm `pgcrypto` exists and `uuid-ossp` exists only when required.

## Provisioning Verification (Terraform)

1. Ensure Terraform uses the lock file:
   - Run `terraform init` in the Terraform folder.
   - Verify that [forgea-monorepo/infra/terraform/postgres/.terraform.lock.hcl](forgea-monorepo/infra/terraform/postgres/.terraform.lock.hcl) remains present after initialization.

2. Validate the plan step:
   - Run `terraform plan -out=tfplan` with required variables supplied.
   - Confirm the plan shows `postgresql_parameter` resources and `postgresql_extension` resources for `pgcrypto` (and optionally `uuid-ossp`).

## Migration Workflow Verification

1. In dev, run `prisma migrate dev` and confirm migrations apply without errors.
2. In prod or staging, run `prisma migrate deploy` and confirm it applies pending migrations without prompts.
