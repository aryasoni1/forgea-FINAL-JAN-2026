## EPIC-B — ALL REQUIRED OFFICIAL DOCUMENTATION

### B1_Database Setup — REQUIRED OFFICIAL DOCUMENTATION

- Technology: PostgreSQL
  - Official source: https://www.postgresql.org/docs/
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION
  - Why required: SQL syntax, extension availability, timezone behavior, trigger semantics.

- Technology: Prisma (migrations & schema)
  - Official source: https://www.prisma.io/docs
  - Exact version requirement: 7.3.0
  - Why required: Prisma Migrate and schema semantics used by repo; required for safe migration SQL.

- Technology: PostgreSQL extensions (pgcrypto / uuid-ossp)
  - Official source: https://www.postgresql.org/docs/
  - Exact version requirement: PIN TO POSTGRES MAJOR RELEASE
  - Why required: Server-side UUIDs and crypto functions used by migrations and schema.

- Technology: Infra provisioning (Terraform / Docker Compose)
  - Official sources: https://www.terraform.io/docs | https://docs.docker.com/compose/
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION

---

### B2_Prisma Setup & Migrations — REQUIRED OFFICIAL DOCUMENTATION

- Technology: Prisma (CLI, schema, client, migrations)
  - Official source: https://www.prisma.io/docs
  - Exact version requirement: 7.3.0
  - Why required: Migration workflow, `prisma generate`, `schema.prisma` datasource conventions, shadow DB semantics.

---

### B3_Identity & Authentication Tables — REQUIRED OFFICIAL DOCUMENTATION

- Technology: Prisma (schema modelling: enums, uniques, relations)
  - Official source: https://www.prisma.io/docs
  - Exact version requirement: 7.3.0

---

### B4_Lesson System Tables — REQUIRED OFFICIAL DOCUMENTATION

- Technology: Prisma (JSON fields, enums, relations)
  - Official source: https://www.prisma.io/docs
  - Exact version requirement: 7.3.0

- Technology: PostgreSQL (JSONB semantics & indexing)
  - Official source: https://www.postgresql.org/docs/
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED

---

### B5_Lab System Tables — REQUIRED OFFICIAL DOCUMENTATION

- Technology: Prisma (schema modelling, migrations)
  - Official source: https://www.prisma.io/docs
  - Exact version requirement: 7.3.0

- Technology: PostgreSQL (JSONB, indexing)
  - Official source: https://www.postgresql.org/docs/
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED

---

### B6_User Execution & Attempts — REQUIRED OFFICIAL DOCUMENTATION

- Technology: Prisma (relations, uniqueness, JSON storage)
  - Official source: https://www.prisma.io/docs
  - Exact version requirement: 7.3.0

- Technology: PostgreSQL (JSONB vs Text, indexing)
  - Official source: https://www.postgresql.org/docs/
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED

---

### B7_Proof & Evidence Storage — REQUIRED OFFICIAL DOCUMENTATION

- Technology and refs: Storage options guidance (cloud provider docs), metadata vs payload docs, compliance retention docs (e.g., S3 object-lock)
  - Exact sources referenced in code-scout / internal briefs (Azure/AWS docs)
  - Exact version requirement: PIN PROVIDER DOC VERSIONS BEFORE IMPLEMENTATION

---

### B8_GitHub Mapping Tables — REQUIRED OFFICIAL DOCUMENTATION

- Technology: GitHub REST API / Webhooks
  - Official source: https://docs.github.com/en/developers
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED

- Technology: Prisma
  - Official source: https://www.prisma.io/docs
  - Exact version requirement: 7.3.0

- Technology: PostgreSQL DDL & Extensions
  - Official source: https://www.postgresql.org/docs/
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED

- Technology: Data Protection / GDPR
  - Official source: https://eur-lex.europa.eu/eli/reg/2016/679/oj

---

### B9_Admin & Control Tables — REQUIRED OFFICIAL DOCUMENTATION

- Technology: Prisma (schema & migrations)
  - Official source: https://www.prisma.io/docs
  - Exact version requirement: 7.3.0

- Technology: PostgreSQL (triggers, JSONB)
  - Official source: https://www.postgresql.org/docs/
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED

- Technology: OWASP Logging Cheat Sheet (audit logging guidance)
  - Official source: https://cheatsheetseries.owasp.org/cheatsheets/Logging_Cheat_Sheet.html

- Technology: Feature Flag guidance (Martin Fowler / LaunchDarkly)
  - Official sources: https://martinfowler.com/articles/feature-toggles.html | https://docs.launchdarkly.com/

---

### B10_Billing (Minimal MVP) — REQUIRED OFFICIAL DOCUMENTATION

- Technology: PostgreSQL (enum/type migrations, transaction-safe DDL)
  - Official source: https://www.postgresql.org/docs/
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED

- Technology: Prisma (schema & migrations)
  - Official source: https://www.prisma.io/docs
  - Exact version requirement: PIN PRISMA (ensure `prisma` CLI matches @prisma/client 7.3.0)

- Technology: Billing Provider API (e.g., Stripe)
  - Official source: https://stripe.com/docs/api
  - Exact version requirement: PIN PROVIDER API VERSION

- Technology: Data Protection / GDPR
  - Official source: https://eur-lex.europa.eu/eli/reg/2016/679/oj

---

### B11_Immutability Enforcement (CRITICAL) — REQUIRED OFFICIAL DOCUMENTATION

- Technology: PostgreSQL triggers / append-only patterns / disaster recovery references
  - Official source(s): https://www.postgresql.org/docs/ and org DR docs
  - Exact version requirement: VERSION UNKNOWN — MUST BE PINNED BEFORE IMPLEMENTATION

---

### B12_Audit Infrastructure — REQUIRED OFFICIAL DOCUMENTATION

- Technology: NIST SP 800-92 (log management)
  - Official source: https://nvlpubs.nist.gov/nistpubs/Legacy/SP/nistspecialpublication800-92.pdf

- Technology: PCI-DSS (if in-scope for payments)
  - Official source: https://www.pcisecuritystandards.org
  - Exact version requirement: PCI DSS v4.0 (pin if applicable)

- Technology: SOC2 / AICPA references
  - Official source: https://www.aicpa.org/
  - Exact version requirement: PIN AS REQUIRED

- Technology: Elastic Common Schema (ECS) for event schema
  - Official source: https://www.elastic.co/guide/en/ecs/current/index.html
  - Exact version requirement: MUST BE PINNED BEFORE IMPLEMENTATION

---

### B13_Environment Safety — REQUIRED OFFICIAL DOCUMENTATION

- Technology: Environment & secrets management references (HashiCorp Vault / cloud secret managers)
  - Official sources: https://www.vaultproject.io/docs | https://docs.aws.amazon.com/secretsmanager/latest/userguide/intro.html | https://cloud.google.com/secret-manager/docs
  - Exact version requirement: PIN PROVIDER DOCS BEFORE IMPLEMENTATION

---

Notes & next steps:

- Many Postgres-related items are currently unpinned; pin an authoritative Postgres major/minor for EPIC-B before proceeding with migration/extension steps.
- Prisma is consistently required across EPIC-B features and should be confirmed at `7.3.0` (ensure `prisma` CLI matches client runtime).
- Recommend appending this `ALL_REQUIRED_DOCS.md` to `/docs/master_docs.md` registry or marking as VERIFIED once infra/version pins are provided.
