# Terraform Postgres Provisioning (Forgea)

## Purpose

Provision Forgea PostgreSQL 18.1 configuration and extensions for production or shared environments using Terraform 1.x. This stack enforces UTC time zone settings, SSL requirements for pgcrypto usage, and optional `uuid-ossp` for legacy UUIDs.

## Tooling Versions

- Terraform: 1.6.6 (allowed range `>=1.6.0 <2.0.0`)
- PostgreSQL: 18.1 (allowed range `>=18.1 <19.0`)

## What This Stack Does

- Connects to a PostgreSQL 18.1 instance using SSL (`sslmode = require`).
- Ensures server parameters:
  - `TimeZone = 'UTC'`
  - `log_timezone = 'UTC'`
  - `client_encoding = UTF8`
  - `ssl = on`
- Installs `pgcrypto` for `gen_random_uuid()` and cryptographic functions.
- Installs `uuid-ossp` only when explicitly enabled for legacy UUIDs.

## Usage

1. Copy the example below into a root Terraform stack and set variables via your preferred secrets manager.
2. Run `terraform init`, then `terraform plan -out=tfplan`, then `terraform apply tfplan` in CI.

### Example

```
module "forgea_postgres" {
  source = "./infra/terraform/postgres"

  host              = "db.example.com"
  port              = 5432
  database          = "forgea"
  username          = "forgea_admin"
  password          = var.db_password
  sslmode           = "require"
  create_database   = true
  enable_uuid_ossp  = false
}
```

## Variables

- `host` (string, required): PostgreSQL host.
- `port` (number, default 5432): PostgreSQL port.
- `database` (string, required): Target database name.
- `username` (string, required): Admin username.
- `password` (string, required): Admin password (sensitive).
- `sslmode` (string, default `require`): SSL mode for provisioning connection.
- `create_database` (bool, default `true`): Create database if missing.
- `enable_uuid_ossp` (bool, default `false`): Enable `uuid-ossp` for legacy UUIDs.

## Notes

- Setting server parameters requires superuser or managed-DB parameter group permissions.
- If your managed database does not allow `postgresql_parameter`, set the parameters at the platform level and remove those resources in your fork.
- `pgcrypto` usage requires SSL encryption for all connections.
