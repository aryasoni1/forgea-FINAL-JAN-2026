---
doc_id: postgresql-server-setup-security
tool: PostgreSQL
version_pinned: true
change_sensitivity: HIGH
lifecycle: ACTIVE
---

# PostgreSQL 18.1 — Server Setup & Security Policy

## Purpose

Governs the initialization of the database cluster, enforcement of SSL/TLS encryption for TCP/IP connections, mandatory UTC time zone configuration, and file system permission hardening.

## Status

- Doc type: INTERNAL / AUTHORITATIVE
- Evidence basis: Official vendor documentation only
- Version status: PINNED (v18.1)

## Scope

- Applies to: `initdb` execution, `postgresql.conf` parameters (`ssl`, `TimeZone`, `log_timezone`), file system permissions for data/keys, and template database management.
- Does NOT apply to: Client-side connection pooling logic or application-level authentication (e.g., OAuth).

## Official Sources (Binding)

- PostgreSQL 18.2: Creating a Database Cluster
- PostgreSQL 18.9: Secure TCP/IP Connections with SSL
- PostgreSQL 19.11: Client Connection Defaults
- PostgreSQL 22.3: Template Databases

## Evidence Coverage Matrix

| Policy Area                       | Source URL                       | Version Covered | Status  |
| --------------------------------- | -------------------------------- | --------------- | ------- |
| Cluster Initialization (`initdb`) | 18.2 Creating a Database Cluster | v18.1           | COVERED |
| File System Permissions           | 18.2 Creating a Database Cluster | v18.1           | COVERED |
| NFS Constraints                   | 18.2.2.1 NFS                     | v18.1           | COVERED |
| SSL/TLS Enforcement               | 18.9 Secure TCP/IP Connections   | v18.1           | COVERED |
| Time Zone (`UTC`)                 | 19.11.2 Locale and Formatting    | v18.1           | COVERED |
| Template Databases                | 22.3 Template Databases          | v18.1           | COVERED |

## Version & Compatibility

- **Tool Version:** PostgreSQL 18.1.
- **Operating System Dependencies:** `initdb` relies on the OS user `postgres` being established prior to execution.

## Canonical Rules (Non-Negotiable)

- **Cluster Initialization:**
  - The data directory MUST be initialized using `initdb -D <path>` (or `pg_ctl initdb`),.
  - `initdb` MUST be executed by the `postgres` user. Execution by `root` is prohibited.
  - The data directory MUST be empty before initialization.
- **File System Permissions:**
  - **Data Directory:** MUST be set to `0700` (owner read/write/execute, no group/world) OR `0750` (group read-only) if specific backup users require access.
  - **SSL Key File:** The server private key (`server.key`) MUST have permissions `0600` (owner read/write only). The server will refuse to start if permissions are more liberal,.
- **Network Storage (NFS):**
  - If the data directory resides on NFS, the file system MUST be mounted using the `hard` option.
- **SSL/TLS Invariants:**
  - `ssl` parameter in `postgresql.conf` MUST be set to `on`.
  - A server certificate (`server.crt`) and private key (`server.key`) MUST exist in the data directory or configured path.
- **Time Zone Enforcement:**
  - `TimeZone` parameter in `postgresql.conf` MUST be set to `'UTC'` (or `'GMT'`, the built-in default equivalent).
  - `log_timezone` MUST be set to `'UTC'` (or `'GMT'`) to ensure logs match server time.
- **Client Encoding:**
  - `client_encoding` MUST be set to `UTF8`.
- **UUID Extensions (Canonical Policy):**
  - Existing tables MUST NOT be rewritten solely to change UUID generation.
  - New tables SHOULD prefer `gen_random_uuid()` (pgcrypto).
  - `uuid-ossp` remains allowed for legacy compatibility.
- **Template Databases:**
  - `template1` is the default source for new databases. Global objects intended for all new databases MUST be installed in `template1`.
  - `template0` MUST remain pristine and unmodified to allow for clean database creation or locale changes.

## Prohibited Configurations

- ❌ **Root Initialization:** Running `initdb` as root is strictly prohibited.
- ❌ **NFS Soft Mounts:** The `soft` mount option is PROHIBITED for data directories. It causes data corruption/loss on network interruption.
- ❌ **World-Readable Keys:** `server.key` MUST NOT be world-readable or group-readable (unless root-owned `0640`).
- ❌ **Non-UTC Time:** Configuring the server with a local time zone (e.g., `America/New_York`) is PROHIBITED.
- ❌ **Unencrypted Transport:** `ssl = off` is PROHIBITED in production environments.
- ❌ **Non-UTF8 Encoding:** `client_encoding` values other than `UTF8` are PROHIBITED.

## Enforcement

- **Startup Validation:**
  - PostgreSQL refuses to start if `server.key` permissions are too open (e.g., `0644`),.
  - `initdb` fails immediately if the target directory is not empty.
- **Runtime Behavior:**
  - If `ssl = on` but keys are missing/invalid, the server will refuse to start.
  - `initdb` revokes access permissions from everyone but the `postgres` user (and optionally group) upon execution.

## Failure Modes

- **NFS Data Corruption:** Using `soft` mounts allows the OS to timeout writes, leading to reported "success" on failed I/O, which corrupts the database.
- **Service Start Failure:** Incorrect permissions on `server.key` block the postmaster process from starting.
- **Locale Locking:** Once a cluster is initialized, the collation library version cannot be changed without a dump/restore or logical replication.

## Cross-Doc Dependencies

- Depends on:
  - `/docs/official-docs/EPIC-B/postgres-extensions.md` (SSL required for `pgcrypto` usage).
- Conflicts with:
  - Any policy allowing `local` time storage.

## Planner Extraction Hints (Non-Human)

- If `fs_type` == "NFS", enforce `mount_options` includes "hard".
- If `parameter` == "TimeZone", value MUST be "UTC" or "GMT".
- If `parameter` == "ssl", value MUST be "on".
- `initdb` user MUST be `postgres`.

## Verification Checklist

- [ ] `postgresql.conf` contains `ssl = on`.
- [ ] `postgresql.conf` contains `TimeZone = 'UTC'` (or 'GMT').
- [ ] `client_encoding` is set to `UTF8`.
- [ ] `server.key` permissions are exactly `0600`.
- [ ] Data directory is owned by `postgres`.
- [ ] If NFS is used, mount options include `hard`.

## Non-Decisions

- This document does not specify the Certificate Authority (CA) hierarchy, only that valid certificates must exist.
- This document does not mandate specific `pg_hba.conf` authentication methods (e.g., `scram-sha-256` vs `cert`), though `scram-sha-256` is recommended by sources.

## Notes

- `initdb` initializes the default locale based on the environment; specific locales must be chosen at initialization and are difficult to change later,.
- `log_timezone` is cluster-wide, whereas `TimeZone` can be overridden per session.
- `template0` is marked `datallowconn = false` to prevent modification.
