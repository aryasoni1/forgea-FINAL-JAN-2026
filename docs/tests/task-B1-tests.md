# Task B1 Test Plan

## Scope

- Docker Compose dev database provisioning
- Terraform prod/shared provisioning stack
- Prisma migration workflows by environment
- Server settings: `TimeZone`, `log_timezone`, `client_encoding`, `ssl`
- Extension strategy: `pgcrypto` and optional `uuid-ossp`

## Happy Paths

1. Dev database starts via Docker Compose and reports healthy.
2. `psql` connects with `sslmode=require` and `SHOW` commands return required values.
3. `pgcrypto` is installed and available for `gen_random_uuid()`.
4. Terraform `plan` includes parameter and extension resources without errors.
5. `prisma migrate dev` succeeds in dev.
6. `prisma migrate deploy` succeeds in prod/staging.

## Failure Cases

1. Docker Compose starts without SSL certificates and the database fails to boot.
2. `ssl = on` is removed and SSL connection attempts fail.
3. Terraform runs without sufficient privileges to set `postgresql_parameter` and fails.
4. `uuid-ossp` is enabled when only v4/v7 UUIDs are required.
5. `prisma migrate deploy` is replaced with `prisma migrate dev` in production.

## Abuse / Bypass Cases

1. Attempt to run `prisma migrate dev` in production.
2. Attempt to bypass SSL by using `sslmode=disable` in a production connection.
3. Attempt to enable `uuid-ossp` in environments that only use v4/v7 UUIDs.
4. Use a local `.env` `DATABASE_URL` as an authoritative production value.

## Invariants

- Server time zone remains UTC-only.
- `ssl = on` is enforced when `pgcrypto` is used.
- `prisma migrate dev` is never used in production.
- Migration history remains the source of truth.
- Immutability trigger migrations remain unchanged.
