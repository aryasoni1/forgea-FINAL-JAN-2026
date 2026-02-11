---
doc_id: postgres-extensions-policy
tool: PostgreSQL
version_pinned: true
change_sensitivity: HIGH
lifecycle: ACTIVE
---

# PostgreSQL 18.1 — Extensions Policy

## Purpose

Governs the authorization, installation, and usage of PostgreSQL server extensions, specifically defining the rules for UUID generation strategies (Native vs. Extension) and the security context for cryptographic modules.

## Status

- Doc type: INTERNAL / AUTHORITATIVE
- Evidence basis: Official vendor documentation only
- Version status: PINNED (v18.1)

## Scope

- Applies to: `CREATE EXTENSION` execution, `pgcrypto` usage, `uuid-ossp` usage, and server-side UUID generation functions.
- Does NOT apply to: Client-side UUID generation or OS-level library dependencies (e.g., `libuuid`) except as prerequisites.

## Official Sources (Binding)

- PostgreSQL 18.1: F.26. pgcrypto — cryptographic functions
- PostgreSQL 18.1: F.49. uuid-ossp — a UUID generator
- PostgreSQL 18.1: 8.12. UUID Type

## Evidence Coverage Matrix

| Policy Area                   | Source URL                    | Version Covered | Status  |
| ----------------------------- | ----------------------------- | --------------- | ------- |
| UUID Generation (Native)      | 8.12. UUID Type               | v18.1           | COVERED |
| Extension Trust (`pgcrypto`)  | F.26. pgcrypto                | v18.1           | COVERED |
| Extension Trust (`uuid-ossp`) | F.49. uuid-ossp               | v18.1           | COVERED |
| Obsolete Functions            | F.26.5. Random-Data Functions | v18.1           | COVERED |
| Encryption Security           | F.26.8. Notes                 | v18.1           | COVERED |

## Version & Compatibility

- **Tool version:** PostgreSQL 18.1.
- **Native Features:** PostgreSQL 18 provides **native** support for UUIDv4 and UUIDv7 algorithms, eliminating the need for extensions in standard use cases.
- **Prerequisites:** `pgcrypto` requires OpenSSL to be installed and enabled at build time.

## Canonical Rules (Non-Negotiable)

- **UUID Generation Strategy:**
  - **UUID v4 (Random):** MUST use the core function `gen_random_uuid()`. This function is built-in and does not require an extension.
  - **UUID v7 (Time-ordered):** MUST use the core native generation functions provided by PostgreSQL 18.
  - **Legacy UUIDs (v1, v3, v5):** The `uuid-ossp` extension MAY be installed ONLY if generating version 1 (MAC/Time), 3 (MD5), or 5 (SHA-1) UUIDs is strictly required,.
- **Extension Trust Model:**
  - **Trusted Status:** Both `pgcrypto` and `uuid-ossp` are "trusted" extensions. They MAY be installed by non-superusers who hold the `CREATE` privilege on the current database,.
- **Cryptographic Security:**
  - **Transport Security:** Because `pgcrypto` functions run inside the database server, data and passwords move between the client and server in clear text. Connections using `pgcrypto` MUST use SSL to prevent interception.
  - **Password Hashing:** `pgcrypto`'s `crypt()` and `gen_salt()` functions MUST be used for in-database password hashing if required, utilizing adaptive algorithms (e.g., `bf`, `sha256crypt`).

## Prohibited Configurations

- ❌ **Redundant Extension Usage:** Installing `uuid-ossp` solely for `uuid_generate_v4()` is PROHIBITED. Use the native `gen_random_uuid()` instead,.
- ❌ **Obsolete Function Calls:** Calling `pgcrypto.gen_random_uuid()` is DEPRECATED; it internally calls the core function. Use the core function directly.
- ❌ **Raw Encryption:** The use of "Raw Encryption Functions" (`encrypt`, `decrypt` without PGP) in `pgcrypto` is DISCOURAGED due to lack of integrity checking and IV management complexity. Use PGP functions (`pgp_sym_encrypt`) instead.
- ❌ **Cleartext Transport:** Invoking `pgcrypto` functions over non-SSL connections is PROHIBITED.

## Enforcement

- **Extension Installation:**
  - `CREATE EXTENSION pgcrypto;`
  - `CREATE EXTENSION "uuid-ossp";`
  - Extensions require the underlying libraries (OpenSSL for `pgcrypto`) to be present on the OS.
- **Function Availability:**
  - `gen_random_uuid()` is available by default in the `pg_catalog` namespace (core).
  - `uuid-ossp` functions (e.g., `uuid_generate_v1()`) are available only after extension installation.

## Failure Modes

- **Missing OpenSSL:** `pgcrypto` will fail to install if OpenSSL support was not selected during the PostgreSQL build or is missing from the system.
- **Side-Channel Attacks:** `pgcrypto` decryption timing varies by ciphertext size, potentially exposing it to side-channel attacks.
- **MAC Address Exposure (v1):** `uuid_generate_v1()` reveals the identity (MAC address) of the server and the timestamp, which may be a security or privacy risk.

## Cross-Doc Dependencies

- Depends on:
  - `/docs/official-docs/EPIC-B/postgresql.md` (SSL Enforcement).
- Conflicts with:
  - NONE

## Planner Extraction Hints (Non-Human)

- If `uuid_version` == 4 OR 7 -> `extension_required` = FALSE.
- If `uuid_version` == 1 OR 3 OR 5 -> `extension_required` = TRUE (`uuid-ossp`).
- If `extension` == `pgcrypto` -> `ssl_required` = TRUE.

## Verification Checklist

- [ ] `uuid-ossp` is NOT installed if only v4/v7 UUIDs are used.
- [ ] `gen_random_uuid()` is used for default values in `CREATE TABLE`.
- [ ] If `pgcrypto` is used, the connection is verified to be SSL-encrypted.
- [ ] `pgcrypto` is installed for password hashing or PGP encryption tasks only.

## Non-Decisions

- This document does not cover `pgcrypto` key management strategies (e.g., off-database key storage).
- This document does not mandate specific iteration counts for `gen_salt()`, though defaults are provided by the module.

## Notes

- `uuid-ossp` creates dependencies on specific OS libraries (`libc`, `libuuid`, or OSSP) depending on the build environment.
- `pgcrypto`'s `gen_random_bytes()` can extract up to 1024 bytes at a time.
