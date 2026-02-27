# Prisma

## EPIC-C — Notes

- Include example models for `AuthIdentity`, `AuthSession`, `User`, and `Role` with relations and necessary indexes for lookups.
- Document safe rename vs additive approach for identity table changes; ensure migrations are tested with shadow DBs and backfill strategies.
- Capture constraints for unique provider keys, handling of orphaned identities, and soft-delete vs hard-delete semantics for GDPR.

## EPIC-B — Notes

- Ensure `prisma` CLI version matches `@prisma/client` (7.3.0) used at runtime to avoid runtime/client mismatches.
- Document migration strategy (shadow DB, staging preview, and backfill plans) and safe rename vs additive schema approaches (notably for auth table renames in B3).
- Capture JSONB usage patterns, index recommendations, and when to prefer normalized tables vs JSON storage in B4/B5/B6.
- Include guidance for generating deterministic migration SQL for CI and production runs.

```

## Referenced By: EPIC-H — LAB TESTING & VERIFICATION ENGINE

- **Intent:** Use Prisma as the canonical schema and migration tool for `VerificationJob`, `LabAttempt`, and related verification models that back the verification pipeline.
- **Important points:** Pin the Prisma version before implementation; author an authoritative `VerificationJob`/`LabAttempt` Prisma `model` contract; document safe migration recipes (including concurrent index builds and backfill steps) and ensure migrations are validated on shadow DBs.
```

Here is the comprehensive list of links extracted from the Prisma documentation sidebar you provided. These are formatted as absolute URLs using the `https://www.prisma.io` base for easy use in NotebookLM.

### **Getting Started**

- [https://www.prisma.io/docs](https://www.prisma.io/docs)

### **Prisma ORM: Quickstart**

- [https://www.prisma.io/docs/prisma-orm/quickstart/prisma-postgres](https://www.prisma.io/docs/prisma-orm/quickstart/prisma-postgres)
- [https://www.prisma.io/docs/prisma-orm/quickstart/sqlite](https://www.prisma.io/docs/prisma-orm/quickstart/sqlite)
- [https://www.prisma.io/docs/prisma-orm/quickstart/postgresql](https://www.prisma.io/docs/prisma-orm/quickstart/postgresql)
- [https://www.prisma.io/docs/prisma-orm/quickstart/mysql](https://www.prisma.io/docs/prisma-orm/quickstart/mysql)
- [https://www.prisma.io/docs/prisma-orm/quickstart/sql-server](https://www.prisma.io/docs/prisma-orm/quickstart/sql-server)
- [https://www.prisma.io/docs/prisma-orm/quickstart/planetscale](https://www.prisma.io/docs/prisma-orm/quickstart/planetscale)
- [https://www.prisma.io/docs/prisma-orm/quickstart/cockroachdb](https://www.prisma.io/docs/prisma-orm/quickstart/cockroachdb)
- [https://www.prisma.io/docs/prisma-orm/quickstart/mongodb](https://www.prisma.io/docs/prisma-orm/quickstart/mongodb)

### **Prisma ORM: Add to Existing Project**

- [https://www.prisma.io/docs/prisma-orm/add-to-existing-project/prisma-postgres](https://www.prisma.io/docs/prisma-orm/add-to-existing-project/prisma-postgres)
- [https://www.prisma.io/docs/prisma-orm/add-to-existing-project/sqlite](https://www.prisma.io/docs/prisma-orm/add-to-existing-project/sqlite)
- [https://www.prisma.io/docs/prisma-orm/add-to-existing-project/postgresql](https://www.prisma.io/docs/prisma-orm/add-to-existing-project/postgresql)
- [https://www.prisma.io/docs/prisma-orm/add-to-existing-project/mysql](https://www.prisma.io/docs/prisma-orm/add-to-existing-project/mysql)
- [https://www.prisma.io/docs/prisma-orm/add-to-existing-project/sql-server](https://www.prisma.io/docs/prisma-orm/add-to-existing-project/sql-server)
- [https://www.prisma.io/docs/prisma-orm/add-to-existing-project/planetscale](https://www.prisma.io/docs/prisma-orm/add-to-existing-project/planetscale)
- [https://www.prisma.io/docs/prisma-orm/add-to-existing-project/cockroachdb](https://www.prisma.io/docs/prisma-orm/add-to-existing-project/cockroachdb)
- [https://www.prisma.io/docs/prisma-orm/add-to-existing-project/mongodb](https://www.prisma.io/docs/prisma-orm/add-to-existing-project/mongodb)

### **Prisma Postgres**

- [https://www.prisma.io/docs/prisma-postgres/quickstart/prisma-orm](https://www.prisma.io/docs/prisma-postgres/quickstart/prisma-orm)
- [https://www.prisma.io/docs/prisma-postgres/quickstart/kysely](https://www.prisma.io/docs/prisma-postgres/quickstart/kysely)
- [https://www.prisma.io/docs/prisma-postgres/quickstart/drizzle-orm](https://www.prisma.io/docs/prisma-postgres/quickstart/drizzle-orm)
- [https://www.prisma.io/docs/prisma-postgres/quickstart/typeorm](https://www.prisma.io/docs/prisma-postgres/quickstart/typeorm)
- [https://www.prisma.io/docs/prisma-postgres/import-from-existing-database-postgresql](https://www.prisma.io/docs/prisma-postgres/import-from-existing-database-postgresql)
- [https://www.prisma.io/docs/prisma-postgres/import-from-existing-database-mysql](https://www.prisma.io/docs/prisma-postgres/import-from-existing-database-mysql)
- [https://www.prisma.io/docs/prisma-postgres/from-the-cli](https://www.prisma.io/docs/prisma-postgres/from-the-cli)

---

**Next Step:** Since you're working on tool-driven orchestration for lab generation, would you like me to extract the **Prisma Schema (PSL) specifications** from these links to help define your `generate-lab` orchestration messages?
Here is the comprehensive list of links extracted from the **Prisma ORM** documentation sidebar you provided. These are formatted as absolute URLs using the `https://www.prisma.io` base for easy use in NotebookLM.

### **1. Introduction & Core Concepts**

- [https://www.prisma.io/docs/orm](https://www.prisma.io/docs/orm)
- [https://www.prisma.io/docs/orm/core-concepts/data-modeling](https://www.prisma.io/docs/orm/core-concepts/data-modeling)
- [https://www.prisma.io/docs/orm/core-concepts/supported-databases](https://www.prisma.io/docs/orm/core-concepts/supported-databases)
- [https://www.prisma.io/docs/orm/core-concepts/supported-databases/postgresql](https://www.prisma.io/docs/orm/core-concepts/supported-databases/postgresql)
- [https://www.prisma.io/docs/orm/core-concepts/supported-databases/mysql](https://www.prisma.io/docs/orm/core-concepts/supported-databases/mysql)
- [https://www.prisma.io/docs/orm/core-concepts/supported-databases/sqlite](https://www.prisma.io/docs/orm/core-concepts/supported-databases/sqlite)
- [https://www.prisma.io/docs/orm/core-concepts/supported-databases/sql-server](https://www.prisma.io/docs/orm/core-concepts/supported-databases/sql-server)
- [https://www.prisma.io/docs/orm/core-concepts/supported-databases/mongodb](https://www.prisma.io/docs/orm/core-concepts/supported-databases/mongodb)
- [https://www.prisma.io/docs/orm/core-concepts/supported-databases/database-drivers](https://www.prisma.io/docs/orm/core-concepts/supported-databases/database-drivers)
- [https://www.prisma.io/docs/orm/core-concepts/api-patterns](https://www.prisma.io/docs/orm/core-concepts/api-patterns)

### **2. Prisma Schema**

- [https://www.prisma.io/docs/orm/prisma-schema/overview](https://www.prisma.io/docs/orm/prisma-schema/overview)
- [https://www.prisma.io/docs/orm/prisma-schema/overview/data-sources](https://www.prisma.io/docs/orm/prisma-schema/overview/data-sources)
- [https://www.prisma.io/docs/orm/prisma-schema/overview/generators](https://www.prisma.io/docs/orm/prisma-schema/overview/generators)
- [https://www.prisma.io/docs/orm/prisma-schema/overview/location](https://www.prisma.io/docs/orm/prisma-schema/overview/location)
- [https://www.prisma.io/docs/orm/prisma-schema/data-model/models](https://www.prisma.io/docs/orm/prisma-schema/data-model/models)
- [https://www.prisma.io/docs/orm/prisma-schema/data-model/relations](https://www.prisma.io/docs/orm/prisma-schema/data-model/relations)
- [https://www.prisma.io/docs/orm/prisma-schema/data-model/relations/one-to-one-relations](https://www.prisma.io/docs/orm/prisma-schema/data-model/relations/one-to-one-relations)
- [https://www.prisma.io/docs/orm/prisma-schema/data-model/relations/one-to-many-relations](https://www.prisma.io/docs/orm/prisma-schema/data-model/relations/one-to-many-relations)
- [https://www.prisma.io/docs/orm/prisma-schema/data-model/relations/many-to-many-relations](https://www.prisma.io/docs/orm/prisma-schema/data-model/relations/many-to-many-relations)
- [https://www.prisma.io/docs/orm/prisma-schema/data-model/relations/self-relations](https://www.prisma.io/docs/orm/prisma-schema/data-model/relations/self-relations)
- [https://www.prisma.io/docs/orm/prisma-schema/data-model/relations/referential-actions](https://www.google.com/search?q=https://www.prisma.io/docs/orm/prisma-schema/data-model/relations/referential-actions)
- [https://www.prisma.io/docs/orm/prisma-schema/data-model/relations/relation-mode](https://www.prisma.io/docs/orm/prisma-schema/data-model/relations/relation-mode)
- [https://www.prisma.io/docs/orm/prisma-schema/data-model/relations/troubleshooting-relations](https://www.prisma.io/docs/orm/prisma-schema/data-model/relations/troubleshooting-relations)
- [https://www.prisma.io/docs/orm/prisma-schema/data-model/database-mapping](https://www.prisma.io/docs/orm/prisma-schema/data-model/database-mapping)
- [https://www.prisma.io/docs/orm/prisma-schema/data-model/indexes](https://www.prisma.io/docs/orm/prisma-schema/data-model/indexes)
- [https://www.prisma.io/docs/orm/prisma-schema/data-model/views](https://www.prisma.io/docs/orm/prisma-schema/data-model/views)
- [https://www.prisma.io/docs/orm/prisma-schema/data-model/multi-schema](https://www.prisma.io/docs/orm/prisma-schema/data-model/multi-schema)
- [https://www.prisma.io/docs/orm/prisma-schema/data-model/externally-managed-tables](https://www.prisma.io/docs/orm/prisma-schema/data-model/externally-managed-tables)
- [https://www.prisma.io/docs/orm/prisma-schema/data-model/table-inheritance](https://www.prisma.io/docs/orm/prisma-schema/data-model/table-inheritance)
- [https://www.prisma.io/docs/orm/prisma-schema/data-model/unsupported-database-features](https://www.prisma.io/docs/orm/prisma-schema/data-model/unsupported-database-features)
- [https://www.prisma.io/docs/orm/prisma-schema/introspection](https://www.prisma.io/docs/orm/prisma-schema/introspection)
- [https://www.prisma.io/docs/orm/prisma-schema/postgresql-extensions](https://www.prisma.io/docs/orm/prisma-schema/postgresql-extensions)

### **3. Prisma Client**

- [https://www.prisma.io/docs/orm/prisma-client/setup-and-configuration/introduction](https://www.prisma.io/docs/orm/prisma-client/setup-and-configuration/introduction)
- [https://www.prisma.io/docs/orm/prisma-client/setup-and-configuration/custom-model-and-field-names](https://www.prisma.io/docs/orm/prisma-client/setup-and-configuration/custom-model-and-field-names)
- [https://www.prisma.io/docs/orm/prisma-client/setup-and-configuration/read-replicas](https://www.prisma.io/docs/orm/prisma-client/setup-and-configuration/read-replicas)
- [https://www.prisma.io/docs/orm/prisma-client/setup-and-configuration/database-polyfills](https://www.prisma.io/docs/orm/prisma-client/setup-and-configuration/database-polyfills)
- [https://www.prisma.io/docs/orm/prisma-client/setup-and-configuration/error-formatting](https://www.prisma.io/docs/orm/prisma-client/setup-and-configuration/error-formatting)
- [https://www.prisma.io/docs/orm/prisma-client/setup-and-configuration/databases-connections](https://www.prisma.io/docs/orm/prisma-client/setup-and-configuration/databases-connections)
- [https://www.prisma.io/docs/orm/prisma-client/setup-and-configuration/databases-connections/connection-pool](https://www.prisma.io/docs/orm/prisma-client/setup-and-configuration/databases-connections/connection-pool)
- [https://www.prisma.io/docs/orm/prisma-client/setup-and-configuration/databases-connections/connection-management](https://www.prisma.io/docs/orm/prisma-client/setup-and-configuration/databases-connections/connection-management)
- [https://www.prisma.io/docs/orm/prisma-client/setup-and-configuration/databases-connections/pgbouncer](https://www.prisma.io/docs/orm/prisma-client/setup-and-configuration/databases-connections/pgbouncer)
- [https://www.prisma.io/docs/orm/prisma-client/queries/crud](https://www.prisma.io/docs/orm/prisma-client/queries/crud)
- [https://www.prisma.io/docs/orm/prisma-client/queries/relation-queries](https://www.prisma.io/docs/orm/prisma-client/queries/relation-queries)
- [https://www.prisma.io/docs/orm/prisma-client/queries/transactions](https://www.prisma.io/docs/orm/prisma-client/queries/transactions)
- [https://www.prisma.io/docs/orm/prisma-client/queries/aggregation-grouping-summarizing](https://www.prisma.io/docs/orm/prisma-client/queries/aggregation-grouping-summarizing)
- [https://www.prisma.io/docs/orm/prisma-client/queries/advanced/query-optimization-performance](https://www.prisma.io/docs/orm/prisma-client/queries/advanced/query-optimization-performance)
- [https://www.prisma.io/docs/orm/prisma-client/client-extensions](https://www.prisma.io/docs/orm/prisma-client/client-extensions)
- [https://www.prisma.io/docs/orm/prisma-client/client-extensions/client](https://www.prisma.io/docs/orm/prisma-client/client-extensions/client)
- [https://www.prisma.io/docs/orm/prisma-client/client-extensions/model](https://www.prisma.io/docs/orm/prisma-client/client-extensions/model)
- [https://www.prisma.io/docs/orm/prisma-client/client-extensions/query](https://www.prisma.io/docs/orm/prisma-client/client-extensions/query)
- [https://www.prisma.io/docs/orm/prisma-client/client-extensions/result](https://www.prisma.io/docs/orm/prisma-client/client-extensions/result)
- [https://www.prisma.io/docs/orm/prisma-client/client-extensions/type-utilities](https://www.prisma.io/docs/orm/prisma-client/client-extensions/type-utilities)
- [https://www.prisma.io/docs/orm/prisma-client/client-extensions/shared-extensions](https://www.prisma.io/docs/orm/prisma-client/client-extensions/shared-extensions)
- [https://www.prisma.io/docs/orm/prisma-client/client-extensions/shared-extensions/permit-rbac](https://www.prisma.io/docs/orm/prisma-client/client-extensions/shared-extensions/permit-rbac)
- [https://www.prisma.io/docs/orm/prisma-client/client-extensions/extension-examples](https://www.prisma.io/docs/orm/prisma-client/client-extensions/extension-examples)
- [https://www.prisma.io/docs/orm/prisma-client/type-safety](https://www.prisma.io/docs/orm/prisma-client/type-safety)
- [https://www.prisma.io/docs/orm/prisma-client/type-safety/prisma-type-system](https://www.prisma.io/docs/orm/prisma-client/type-safety/prisma-type-system)
- [https://www.prisma.io/docs/orm/prisma-client/type-safety/operating-against-partial-structures-of-model-types](https://www.prisma.io/docs/orm/prisma-client/type-safety/operating-against-partial-structures-of-model-types)
- [https://www.prisma.io/docs/orm/prisma-client/using-raw-sql](https://www.prisma.io/docs/orm/prisma-client/using-raw-sql)
- [https://www.prisma.io/docs/orm/prisma-client/using-raw-sql/raw-queries](https://www.prisma.io/docs/orm/prisma-client/using-raw-sql/raw-queries)
- [https://www.prisma.io/docs/orm/prisma-client/using-raw-sql/typedsql](https://www.prisma.io/docs/orm/prisma-client/using-raw-sql/typedsql)
- [https://www.prisma.io/docs/orm/prisma-client/using-raw-sql/safeql](https://www.prisma.io/docs/orm/prisma-client/using-raw-sql/safeql)

### **4. Prisma Migrate**

- [https://www.prisma.io/docs/orm/prisma-migrate](https://www.prisma.io/docs/orm/prisma-migrate)
- [https://www.prisma.io/docs/orm/prisma-migrate/getting-started](https://www.prisma.io/docs/orm/prisma-migrate/getting-started)
- [https://www.prisma.io/docs/orm/prisma-migrate/understanding-prisma-migrate/mental-model](https://www.prisma.io/docs/orm/prisma-migrate/understanding-prisma-migrate/mental-model)
- [https://www.prisma.io/docs/orm/prisma-migrate/understanding-prisma-migrate/migration-histories](https://www.prisma.io/docs/orm/prisma-migrate/understanding-prisma-migrate/migration-histories)
- [https://www.prisma.io/docs/orm/prisma-migrate/understanding-prisma-migrate/shadow-database](https://www.prisma.io/docs/orm/prisma-migrate/understanding-prisma-migrate/shadow-database)
- [https://www.prisma.io/docs/orm/prisma-migrate/understanding-prisma-migrate/limitations-and-known-issues](https://www.prisma.io/docs/orm/prisma-migrate/understanding-prisma-migrate/limitations-and-known-issues)
- [https://www.prisma.io/docs/orm/prisma-migrate/workflows/prototyping-your-schema](https://www.prisma.io/docs/orm/prisma-migrate/workflows/prototyping-your-schema)
- [https://www.prisma.io/docs/orm/prisma-migrate/workflows/development-and-production](https://www.prisma.io/docs/orm/prisma-migrate/workflows/development-and-production)
- [https://www.prisma.io/docs/orm/prisma-migrate/workflows/baselining](https://www.prisma.io/docs/orm/prisma-migrate/workflows/baselining)
- [https://www.prisma.io/docs/orm/prisma-migrate/workflows/customizing-migrations](https://www.prisma.io/docs/orm/prisma-migrate/workflows/customizing-migrations)
- [https://www.prisma.io/docs/orm/prisma-migrate/workflows/generating-down-migrations](https://www.prisma.io/docs/orm/prisma-migrate/workflows/generating-down-migrations)
- [https://www.prisma.io/docs/orm/prisma-migrate/workflows/squashing-migrations](https://www.prisma.io/docs/orm/prisma-migrate/workflows/squashing-migrations)
- [https://www.prisma.io/docs/orm/prisma-migrate/workflows/patching-and-hotfixing](https://www.prisma.io/docs/orm/prisma-migrate/workflows/patching-and-hotfixing)
- [https://www.prisma.io/docs/orm/prisma-migrate/workflows/seeding](https://www.prisma.io/docs/orm/prisma-migrate/workflows/seeding)
- [https://www.prisma.io/docs/orm/prisma-migrate/workflows/native-database-types](https://www.prisma.io/docs/orm/prisma-migrate/workflows/native-database-types)
- [https://www.prisma.io/docs/orm/prisma-migrate/workflows/native-database-functions](https://www.prisma.io/docs/orm/prisma-migrate/workflows/native-database-functions)
- [https://www.prisma.io/docs/orm/prisma-migrate/workflows/unsupported-database-features](https://www.prisma.io/docs/orm/prisma-migrate/workflows/unsupported-database-features)
- [https://www.prisma.io/docs/orm/prisma-migrate/workflows/troubleshooting](https://www.prisma.io/docs/orm/prisma-migrate/workflows/troubleshooting)

### **5. Deployment**

- [https://www.prisma.io/docs/orm/prisma-client/deployment/deploy-prisma](https://www.prisma.io/docs/orm/prisma-client/deployment/deploy-prisma)
- [https://www.prisma.io/docs/orm/prisma-client/deployment/deploy-database-changes-with-prisma-migrate](https://www.google.com/search?q=https://www.prisma.io/docs/orm/prisma-client/deployment/deploy-database-changes-with-prisma-migrate)
- [https://www.prisma.io/docs/orm/prisma-client/deployment/deploy-migrations-from-a-local-environment](https://www.prisma.io/docs/orm/prisma-client/deployment/deploy-migrations-from-a-local-environment)
- [https://www.prisma.io/docs/orm/prisma-client/deployment/caveats-when-deploying-to-aws-platforms](https://www.prisma.io/docs/orm/prisma-client/deployment/caveats-when-deploying-to-aws-platforms)
- [https://www.prisma.io/docs/orm/prisma-client/deployment/serverless/deploy-to-vercel](https://www.prisma.io/docs/orm/prisma-client/deployment/serverless/deploy-to-vercel)
- [https://www.prisma.io/docs/orm/prisma-client/deployment/serverless/deploy-to-aws-lambda](https://www.prisma.io/docs/orm/prisma-client/deployment/serverless/deploy-to-aws-lambda)
- [https://www.prisma.io/docs/orm/prisma-client/deployment/serverless/deploy-to-azure-functions](https://www.prisma.io/docs/orm/prisma-client/deployment/serverless/deploy-to-azure-functions)
- [https://www.prisma.io/docs/orm/prisma-client/deployment/serverless/deploy-to-netlify](https://www.prisma.io/docs/orm/prisma-client/deployment/serverless/deploy-to-netlify)
- [https://www.prisma.io/docs/orm/prisma-client/deployment/edge/overview](https://www.prisma.io/docs/orm/prisma-client/deployment/edge/overview)
- [https://www.prisma.io/docs/orm/prisma-client/deployment/edge/deploy-to-vercel](https://www.prisma.io/docs/orm/prisma-client/deployment/edge/deploy-to-vercel)
- [https://www.prisma.io/docs/orm/prisma-client/deployment/edge/deploy-to-cloudflare](https://www.prisma.io/docs/orm/prisma-client/deployment/edge/deploy-to-cloudflare)
- [https://www.prisma.io/docs/orm/prisma-client/deployment/edge/deploy-to-deno-deploy](https://www.prisma.io/docs/orm/prisma-client/deployment/edge/deploy-to-deno-deploy)
- [https://www.prisma.io/docs/orm/prisma-client/deployment/traditional/deploy-to-heroku](https://www.prisma.io/docs/orm/prisma-client/deployment/traditional/deploy-to-heroku)
- [https://www.prisma.io/docs/orm/prisma-client/deployment/traditional/deploy-to-railway](https://www.prisma.io/docs/orm/prisma-client/deployment/traditional/deploy-to-railway)
- [https://www.prisma.io/docs/orm/prisma-client/deployment/traditional/deploy-to-flyio](https://www.prisma.io/docs/orm/prisma-client/deployment/traditional/deploy-to-flyio)
- [https://www.prisma.io/docs/orm/prisma-client/deployment/traditional/deploy-to-koyeb](https://www.prisma.io/docs/orm/prisma-client/deployment/traditional/deploy-to-koyeb)
- [https://www.prisma.io/docs/orm/prisma-client/deployment/traditional/deploy-to-render](https://www.prisma.io/docs/orm/prisma-client/deployment/traditional/deploy-to-render)
- [https://www.prisma.io/docs/orm/prisma-client/deployment/traditional/deploy-to-sevalla](https://www.prisma.io/docs/orm/prisma-client/deployment/traditional/deploy-to-sevalla)

### **6. Observability, Debugging & Reference**

- [https://www.prisma.io/docs/orm/prisma-client/observability-and-logging/logging](https://www.prisma.io/docs/orm/prisma-client/observability-and-logging/logging)
- [https://www.prisma.io/docs/orm/prisma-client/observability-and-logging/opentelemetry-tracing](https://www.prisma.io/docs/orm/prisma-client/observability-and-logging/opentelemetry-tracing)
- [https://www.prisma.io/docs/orm/prisma-client/observability-and-logging/sql-comments](https://www.prisma.io/docs/orm/prisma-client/observability-and-logging/sql-comments)
- [https://www.prisma.io/docs/orm/prisma-client/debugging-and-troubleshooting/debugging](https://www.prisma.io/docs/orm/prisma-client/debugging-and-troubleshooting/debugging)
- [https://www.prisma.io/docs/orm/prisma-client/debugging-and-troubleshooting/handling-exceptions-and-errors](https://www.prisma.io/docs/orm/prisma-client/debugging-and-troubleshooting/handling-exceptions-and-errors)
- [https://www.prisma.io/docs/orm/prisma-client/special-fields-and-types](https://www.prisma.io/docs/orm/prisma-client/special-fields-and-types)
- [https://www.prisma.io/docs/orm/prisma-client/special-fields-and-types/working-with-json-fields](https://www.prisma.io/docs/orm/prisma-client/special-fields-and-types/working-with-json-fields)
- [https://www.prisma.io/docs/orm/prisma-client/special-fields-and-types/working-with-scalar-lists-arrays](https://www.prisma.io/docs/orm/prisma-client/special-fields-and-types/working-with-scalar-lists-arrays)
- [https://www.prisma.io/docs/orm/prisma-client/special-fields-and-types/working-with-composite-ids-and-constraints](https://www.prisma.io/docs/orm/prisma-client/special-fields-and-types/working-with-composite-ids-and-constraints)
- [https://www.prisma.io/docs/orm/prisma-client/special-fields-and-types/composite-types](https://www.prisma.io/docs/orm/prisma-client/special-fields-and-types/composite-types)
- [https://www.prisma.io/docs/orm/prisma-client/special-fields-and-types/null-and-undefined](https://www.prisma.io/docs/orm/prisma-client/special-fields-and-types/null-and-undefined)
- [https://www.prisma.io/docs/orm/prisma-client/testing/unit-testing](https://www.prisma.io/docs/orm/prisma-client/testing/unit-testing)
- [https://www.prisma.io/docs/orm/prisma-client/testing/integration-testing](https://www.prisma.io/docs/orm/prisma-client/testing/integration-testing)
- [https://www.prisma.io/docs/orm/reference/prisma-cli-reference](https://www.prisma.io/docs/orm/reference/prisma-cli-reference)
- [https://www.prisma.io/docs/orm/reference/prisma-client-reference](https://www.prisma.io/docs/orm/reference/prisma-client-reference)
- [https://www.prisma.io/docs/orm/reference/prisma-schema-reference](https://www.prisma.io/docs/orm/reference/prisma-schema-reference)
- [https://www.prisma.io/docs/orm/reference/prisma-config-reference](https://www.prisma.io/docs/orm/reference/prisma-config-reference)
- [https://www.prisma.io/docs/orm/reference/connection-urls](https://www.prisma.io/docs/orm/reference/connection-urls)
- [https://www.prisma.io/docs/orm/reference/environment-variables-reference](https://www.prisma.io/docs/orm/reference/environment-variables-reference)
- [https://www.prisma.io/docs/orm/reference/database-features](https://www.prisma.io/docs/orm/reference/database-features)
- [https://www.prisma.io/docs/orm/reference/supported-databases](https://www.prisma.io/docs/orm/reference/supported-databases)
- [https://www.prisma.io/docs/orm/reference/system-requirements](https://www.prisma.io/docs/orm/reference/system-requirements)
- [https://www.prisma.io/docs/orm/reference/error-reference](https://www.prisma.io/docs/orm/reference/error-reference)
- [https://www.prisma.io/docs/orm/reference/errors](https://www.prisma.io/docs/orm/reference/errors)
- [https://www.prisma.io/docs/orm/reference/preview-features/client-preview-features](https://www.prisma.io/docs/orm/reference/preview-features/client-preview-features)
- [https://www.prisma.io/docs/orm/reference/preview-features/cli-preview-features](https://www.prisma.io/docs/orm/reference/preview-features/cli-preview-features)

### **7. More & Troubleshooting**

- [https://www.prisma.io/docs/orm/more/best-practices](https://www.prisma.io/docs/orm/more/best-practices)
- [https://www.prisma.io/docs/orm/more/releases](https://www.prisma.io/docs/orm/more/releases)
- [https://www.prisma.io/docs/orm/more/comparisons/prisma-and-drizzle](https://www.prisma.io/docs/orm/more/comparisons/prisma-and-drizzle)
- [https://www.prisma.io/docs/orm/more/comparisons/prisma-and-typeorm](https://www.prisma.io/docs/orm/more/comparisons/prisma-and-typeorm)
- [https://www.prisma.io/docs/orm/more/comparisons/prisma-and-sequelize](https://www.prisma.io/docs/orm/more/comparisons/prisma-and-sequelize)
- [https://www.prisma.io/docs/orm/more/comparisons/prisma-and-mongoose](https://www.prisma.io/docs/orm/more/comparisons/prisma-and-mongoose)
- [https://www.prisma.io/docs/orm/more/dev-environment/environment-variables](https://www.prisma.io/docs/orm/more/dev-environment/environment-variables)
- [https://www.prisma.io/docs/orm/more/dev-environment/editor-setup](https://www.prisma.io/docs/orm/more/dev-environment/editor-setup)
- [https://www.prisma.io/docs/orm/more/troubleshooting/nextjs](https://www.prisma.io/docs/orm/more/troubleshooting/nextjs)
- [https://www.prisma.io/docs/orm/more/troubleshooting/nuxt](https://www.prisma.io/docs/orm/more/troubleshooting/nuxt)
- [https://www.prisma.io/docs/orm/more/troubleshooting/many-to-many-relations](https://www.prisma.io/docs/orm/more/troubleshooting/many-to-many-relations)
- [https://www.prisma.io/docs/orm/more/troubleshooting/check-constraints](https://www.prisma.io/docs/orm/more/troubleshooting/check-constraints)
- [https://www.prisma.io/docs/orm/more/troubleshooting/raw-sql-comparisons](https://www.prisma.io/docs/orm/more/troubleshooting/raw-sql-comparisons)
- [https://www.prisma.io/docs/orm/more/troubleshooting/graphql-autocompletion](https://www.prisma.io/docs/orm/more/troubleshooting/graphql-autocompletion)
- [https://www.prisma.io/docs/orm/more/troubleshooting/bundler-issues](https://www.prisma.io/docs/orm/more/troubleshooting/bundler-issues)
- [https://www.prisma.io/docs/orm/more/troubleshooting/typescript-performance](https://www.prisma.io/docs/orm/more/troubleshooting/typescript-performance)
  Here is the comprehensive list of links extracted from the **Prisma Postgres** documentation sidebar. These are formatted as absolute URLs using the `https://www.prisma.io` base for easy use in NotebookLM.

### **1. Introduction**

- [https://www.prisma.io/docs/postgres](https://www.prisma.io/docs/postgres)
- [https://www.prisma.io/docs/postgres/npx-create-db](https://www.prisma.io/docs/postgres/npx-create-db)

### **2. Database Concepts**

- **Query Caching:** [https://www.prisma.io/docs/postgres/database/caching](https://www.prisma.io/docs/postgres/database/caching)
- **Connection Pooling:** [https://www.prisma.io/docs/postgres/database/connection-pooling](https://www.prisma.io/docs/postgres/database/connection-pooling)
- **Direct Connections:** [https://www.prisma.io/docs/postgres/database/direct-connections](https://www.prisma.io/docs/postgres/database/direct-connections)
- **Backups:** [https://www.prisma.io/docs/postgres/database/backups](https://www.prisma.io/docs/postgres/database/backups)
- **PostgreSQL Extensions:** [https://www.prisma.io/docs/postgres/database/postgres-extensions](https://www.prisma.io/docs/postgres/database/postgres-extensions)
- **Serverless Driver:** [https://www.prisma.io/docs/postgres/database/serverless-driver](https://www.prisma.io/docs/postgres/database/serverless-driver)
- **Local Development:** [https://www.prisma.io/docs/postgres/database/local-development](https://www.prisma.io/docs/postgres/database/local-development)

### **3. Tools & Integrations**

- **Raycast:** [https://www.prisma.io/docs/postgres/integrations/raycast](https://www.prisma.io/docs/postgres/integrations/raycast)

### **4. Reference & Support**

- **Error Reference:** [https://www.prisma.io/docs/postgres/error-reference](https://www.prisma.io/docs/postgres/error-reference)
- **Troubleshooting:** [https://www.prisma.io/docs/postgres/troubleshooting](https://www.google.com/search?q=https://www.prisma.io/docs/postgres/troubleshooting)
- **Prisma Postgres FAQ:** [https://www.prisma.io/docs/postgres/faq](https://www.google.com/search?q=https://www.prisma.io/docs/postgres/faq)

---

**Next Step:** Since you have now collected links for PostgreSQL internals, Prisma ORM, and Prisma Postgres, would you like me to help you cross-reference the **Connection Pooling** policies between these three sources to create a unified database access standard?
Here is the comprehensive list of links extracted from the **Prisma CLI** documentation sidebar. These are formatted as absolute URLs using the `https://www.prisma.io` base for easy use in NotebookLM.

### **1. Introduction**

- [https://www.prisma.io/docs/cli](https://www.prisma.io/docs/cli)

### **2. Standalone Commands**

- **init:** [https://www.prisma.io/docs/cli/init](https://www.prisma.io/docs/cli/init)
- **generate:** [https://www.prisma.io/docs/cli/generate](https://www.prisma.io/docs/cli/generate)
- **validate:** [https://www.prisma.io/docs/cli/validate](https://www.prisma.io/docs/cli/validate)
- **format:** [https://www.prisma.io/docs/cli/format](https://www.prisma.io/docs/cli/format)
- **studio:** [https://www.prisma.io/docs/cli/studio](https://www.prisma.io/docs/cli/studio)
- **mcp:** [https://www.prisma.io/docs/cli/mcp](https://www.prisma.io/docs/cli/mcp)
- **debug:** [https://www.prisma.io/docs/cli/debug](https://www.prisma.io/docs/cli/debug)
- **version:** [https://www.prisma.io/docs/cli/version](https://www.prisma.io/docs/cli/version)

### **3. Migrate Commands**

- **migrate:** [https://www.prisma.io/docs/cli/migrate](https://www.prisma.io/docs/cli/migrate)
- **dev:** [https://www.prisma.io/docs/cli/migrate/dev](https://www.prisma.io/docs/cli/migrate/dev)
- **reset:** [https://www.prisma.io/docs/cli/migrate/reset](https://www.prisma.io/docs/cli/migrate/reset)
- **deploy:** [https://www.prisma.io/docs/cli/migrate/deploy](https://www.prisma.io/docs/cli/migrate/deploy)
- **status:** [https://www.prisma.io/docs/cli/migrate/status](https://www.prisma.io/docs/cli/migrate/status)
- **resolve:** [https://www.prisma.io/docs/cli/migrate/resolve](https://www.prisma.io/docs/cli/migrate/resolve)
- **diff:** [https://www.prisma.io/docs/cli/migrate/diff](https://www.prisma.io/docs/cli/migrate/diff)

### **4. Dev Commands (Local Development)**

- **dev:** [https://www.prisma.io/docs/cli/dev](https://www.prisma.io/docs/cli/dev)
- **ls:** [https://www.prisma.io/docs/cli/dev/ls](https://www.prisma.io/docs/cli/dev/ls)
- **rm:** [https://www.prisma.io/docs/cli/dev/rm](https://www.prisma.io/docs/cli/dev/rm)
- **start:** [https://www.prisma.io/docs/cli/dev/start](https://www.prisma.io/docs/cli/dev/start)
- **stop:** [https://www.prisma.io/docs/cli/dev/stop](https://www.prisma.io/docs/cli/dev/stop)

### **5. DB Commands**

- **db:** [https://www.prisma.io/docs/cli/db](https://www.prisma.io/docs/cli/db)
- **pull:** [https://www.prisma.io/docs/cli/db/pull](https://www.prisma.io/docs/cli/db/pull)
- **push:** [https://www.prisma.io/docs/cli/db/push](https://www.prisma.io/docs/cli/db/push)
- **seed:** [https://www.prisma.io/docs/cli/db/seed](https://www.prisma.io/docs/cli/db/seed)
- **execute:** [https://www.prisma.io/docs/cli/db/execute](https://www.prisma.io/docs/cli/db/execute)

### **6. Console / Platform Commands**

- **platform:** [https://www.prisma.io/docs/cli/console](https://www.prisma.io/docs/cli/console)
- **auth:** [https://www.prisma.io/docs/cli/console/auth](https://www.prisma.io/docs/cli/console/auth)
- **workspace:** [https://www.prisma.io/docs/cli/console/workspace](https://www.prisma.io/docs/cli/console/workspace)
- **project:** [https://www.prisma.io/docs/cli/console/project](https://www.prisma.io/docs/cli/console/project)
- **environment:** [https://www.prisma.io/docs/cli/console/environment](https://www.prisma.io/docs/cli/console/environment)
- **apikey:** [https://www.prisma.io/docs/cli/console/apikey](https://www.prisma.io/docs/cli/console/apikey)

---

**Next Step:** Since you are defining enforceable schemas for orchestration, would you like me to extract the **Input/Output types for the `validate` and `generate` commands** from these links to help build your EPIC-E pipeline message contracts?
Here is the comprehensive list of links extracted from the **Prisma Guides** documentation sidebar. These are formatted as absolute URLs using the `https://www.prisma.io` base for easy use in NotebookLM.

### **1. Frameworks**

- **Next.js:** [https://www.prisma.io/docs/guides/frameworks/nextjs](https://www.prisma.io/docs/guides/frameworks/nextjs)
- **Astro:** [https://www.prisma.io/docs/guides/frameworks/astro](https://www.prisma.io/docs/guides/frameworks/astro)
- **Nuxt:** [https://www.prisma.io/docs/guides/frameworks/nuxt](https://www.prisma.io/docs/guides/frameworks/nuxt)
- **SvelteKit:** [https://www.prisma.io/docs/guides/frameworks/sveltekit](https://www.prisma.io/docs/guides/frameworks/sveltekit)
- **SolidStart:** [https://www.prisma.io/docs/guides/frameworks/solid-start](https://www.prisma.io/docs/guides/frameworks/solid-start)
- **React Router 7:** [https://www.prisma.io/docs/guides/frameworks/react-router-7](https://www.prisma.io/docs/guides/frameworks/react-router-7)
- **TanStack Start:** [https://www.prisma.io/docs/guides/frameworks/tanstack-start](https://www.prisma.io/docs/guides/frameworks/tanstack-start)
- **NestJS:** [https://www.prisma.io/docs/guides/frameworks/nestjs](https://www.prisma.io/docs/guides/frameworks/nestjs)
- **Hono:** [https://www.prisma.io/docs/guides/frameworks/hono](https://www.prisma.io/docs/guides/frameworks/hono)
- **Elysia:** [https://www.prisma.io/docs/guides/frameworks/elysia](https://www.prisma.io/docs/guides/frameworks/elysia)

### **2. Deployment & Runtimes**

- **Bun:** [https://www.prisma.io/docs/guides/runtimes/bun](https://www.prisma.io/docs/guides/runtimes/bun)
- **Cloudflare Workers:** [https://www.prisma.io/docs/guides/deployment/cloudflare-workers](https://www.prisma.io/docs/guides/deployment/cloudflare-workers)
- **Cloudflare D1:** [https://www.prisma.io/docs/guides/deployment/cloudflare-d1](https://www.prisma.io/docs/guides/deployment/cloudflare-d1)
- **Docker:** [https://www.prisma.io/docs/guides/deployment/docker](https://www.prisma.io/docs/guides/deployment/docker)
- **Turborepo:** [https://www.prisma.io/docs/guides/deployment/turborepo](https://www.prisma.io/docs/guides/deployment/turborepo)
- **pnpm workspaces:** [https://www.prisma.io/docs/guides/deployment/pnpm-workspaces](https://www.prisma.io/docs/guides/deployment/pnpm-workspaces)
- **Bun workspaces:** [https://www.prisma.io/docs/guides/deployment/bun-workspaces](https://www.prisma.io/docs/guides/deployment/bun-workspaces)

### **3. Authentication Guides**

- **Clerk (Next.js):** [https://www.prisma.io/docs/guides/authentication/clerk/nextjs](https://www.prisma.io/docs/guides/authentication/clerk/nextjs)
- **Clerk (Astro):** [https://www.prisma.io/docs/guides/authentication/clerk/astro](https://www.prisma.io/docs/guides/authentication/clerk/astro)
- **Better Auth (Next.js):** [https://www.prisma.io/docs/guides/authentication/better-auth/nextjs](https://www.prisma.io/docs/guides/authentication/better-auth/nextjs)
- **Better Auth (Astro):** [https://www.prisma.io/docs/guides/authentication/better-auth/astro](https://www.prisma.io/docs/guides/authentication/better-auth/astro)
- **Auth.js (Next.js):** [https://www.prisma.io/docs/guides/authentication/authjs/nextjs](https://www.prisma.io/docs/guides/authentication/authjs/nextjs)

### **4. Integrations**

- **AI SDK:** [https://www.prisma.io/docs/guides/integrations/ai-sdk](https://www.prisma.io/docs/guides/integrations/ai-sdk)
- **Embedded Prisma Studio:** [https://www.prisma.io/docs/guides/integrations/embed-studio](https://www.prisma.io/docs/guides/integrations/embed-studio)
- **GitHub Actions:** [https://www.prisma.io/docs/guides/integrations/github-actions](https://www.prisma.io/docs/guides/integrations/github-actions)
- **Vercel app deployment:** [https://www.prisma.io/docs/guides/integrations/vercel-deployment](https://www.prisma.io/docs/guides/integrations/vercel-deployment)
- **Prisma Postgres on Deno:** [https://www.prisma.io/docs/guides/integrations/deno](https://www.prisma.io/docs/guides/integrations/deno)
- **Datadog:** [https://www.prisma.io/docs/guides/integrations/datadog](https://www.prisma.io/docs/guides/integrations/datadog)
- **Permit.io:** [https://www.prisma.io/docs/guides/integrations/permit-io](https://www.prisma.io/docs/guides/integrations/permit-io)
- **Shopify:** [https://www.prisma.io/docs/guides/integrations/shopify](https://www.prisma.io/docs/guides/integrations/shopify)
- **Neon with Accelerate:** [https://www.prisma.io/docs/guides/integrations/neon-accelerate](https://www.prisma.io/docs/guides/integrations/neon-accelerate)
- **Supabase with Accelerate:** [https://www.prisma.io/docs/guides/integrations/supabase-accelerate](https://www.prisma.io/docs/guides/integrations/supabase-accelerate)

### **5. Postgres & Database Management**

- **Vercel:** [https://www.prisma.io/docs/guides/postgres/vercel](https://www.prisma.io/docs/guides/postgres/vercel)
- **Netlify:** [https://www.prisma.io/docs/guides/postgres/netlify](https://www.prisma.io/docs/guides/postgres/netlify)
- **Fly.io:** [https://www.prisma.io/docs/guides/postgres/flyio](https://www.prisma.io/docs/guides/postgres/flyio)
- **VS Code:** [https://www.prisma.io/docs/guides/postgres/vscode](https://www.prisma.io/docs/guides/postgres/vscode)
- **Firebase Studio (IDX):** [https://www.prisma.io/docs/guides/postgres/idx](https://www.prisma.io/docs/guides/postgres/idx)
- **Viewing data:** [https://www.prisma.io/docs/guides/postgres/viewing-data](https://www.prisma.io/docs/guides/postgres/viewing-data)
- **Multiple databases:** [https://www.prisma.io/docs/guides/database/multiple-databases](https://www.prisma.io/docs/guides/database/multiple-databases)
- **Expand-and-contract migrations:** [https://www.prisma.io/docs/guides/database/data-migration](https://www.prisma.io/docs/guides/database/data-migration)
- **Schema management in teams:** [https://www.prisma.io/docs/guides/database/schema-changes](https://www.prisma.io/docs/guides/database/schema-changes)

### **6. Transitions & Upgrades**

- **Switch from Drizzle:** [https://www.prisma.io/docs/guides/switch-to-prisma-orm/from-drizzle](https://www.prisma.io/docs/guides/switch-to-prisma-orm/from-drizzle)
- **Switch from SQL ORMs:** [https://www.prisma.io/docs/guides/switch-to-prisma-orm/from-sql-orms](https://www.prisma.io/docs/guides/switch-to-prisma-orm/from-sql-orms)
- **Switch from Mongoose:** [https://www.prisma.io/docs/guides/switch-to-prisma-orm/from-mongoose](https://www.prisma.io/docs/guides/switch-to-prisma-orm/from-mongoose)
- **Upgrade to v7:** [https://www.prisma.io/docs/guides/upgrade-prisma-orm/v7](https://www.google.com/search?q=https://www.prisma.io/docs/guides/upgrade-prisma-orm/v7)
- **Upgrade to v6:** [https://www.prisma.io/docs/guides/upgrade-prisma-orm/v6](https://www.prisma.io/docs/guides/upgrade-prisma-orm/v6)
- **Upgrade to v5:** [https://www.prisma.io/docs/guides/upgrade-prisma-orm/v5](https://www.prisma.io/docs/guides/upgrade-prisma-orm/v5)
- **Upgrade to v4:** [https://www.prisma.io/docs/guides/upgrade-prisma-orm/v4](https://www.prisma.io/docs/guides/upgrade-prisma-orm/v4)
- **Upgrade to v3:** [https://www.prisma.io/docs/guides/upgrade-prisma-orm/v3](https://www.prisma.io/docs/guides/upgrade-prisma-orm/v3)
- **Upgrade to v1:** [https://www.prisma.io/docs/guides/upgrade-prisma-orm/v1](https://www.prisma.io/docs/guides/upgrade-prisma-orm/v1)

### **7. Core & Meta**

- **Guides Home:** [https://www.prisma.io/docs/guides](https://www.prisma.io/docs/guides)
- **Writing guides:** [https://www.prisma.io/docs/guides/making-guides](https://www.prisma.io/docs/guides/making-guides)

---

**Next Step:** Since you're integrating **AI SDK** and **AI Coding Agents**, would you like me to pull the specific security recommendations from the AI SDK guide to bolster your Agent Secret Access Policy?
