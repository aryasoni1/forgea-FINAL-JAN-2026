# Task B3 Manual Checks

These checks validate the identity and authentication schema updates for Task B3.

## Schema Updates

1. Verify the `UserRole` enum values:
   - Open [forgea-monorepo/packages/schema/prisma/schema.prisma](forgea-monorepo/packages/schema/prisma/schema.prisma).
   - Confirm `UserRole` includes `ADMIN`, `USER`, and `RECRUITER` only.

2. Verify `User` timestamps:
   - In [forgea-monorepo/packages/schema/prisma/schema.prisma](forgea-monorepo/packages/schema/prisma/schema.prisma), confirm `User` has `createdAt` and `updatedAt` fields.

3. Verify `AuthProvider` enum:
   - In [forgea-monorepo/packages/schema/prisma/schema.prisma](forgea-monorepo/packages/schema/prisma/schema.prisma), confirm `AuthProvider` includes `EMAIL`, `GOOGLE`, and `GITHUB`.

4. Verify `AuthIdentity` and `AuthSession` models:
   - In [forgea-monorepo/packages/schema/prisma/schema.prisma](forgea-monorepo/packages/schema/prisma/schema.prisma), confirm `AuthIdentity` and `AuthSession` models exist.
   - Confirm `AuthIdentity` has a unique constraint on `provider` and `providerUserId`.
   - Confirm `AuthSession` includes `expires` and a unique `sessionToken`.

## Migration Artifact

1. Verify the new migration exists:
   - Check [forgea-monorepo/packages/schema/prisma/migrations/20260209120000_identity_auth_tables/migration.sql](forgea-monorepo/packages/schema/prisma/migrations/20260209120000_identity_auth_tables/migration.sql).

2. Verify existing migrations are unchanged:
   - Confirm no edits were made to earlier migration folders in [forgea-monorepo/packages/schema/prisma/migrations](forgea-monorepo/packages/schema/prisma/migrations).

3. Run migration & backfill (manual verification):
   - Run the migration in a dev environment:
     - `cd forgea-monorepo/packages/schema/prisma && npx prisma migrate dev`
   - After successful migration and a DB backup, run the backfill script:
     - `psql "$DATABASE_URL" -v ON_ERROR_STOP=1 -f backfill_auth.sql`
   - Confirm `AuthIdentity` and `AuthSession` rows exist and respect uniqueness.
