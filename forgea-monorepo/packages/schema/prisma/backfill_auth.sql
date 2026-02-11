BEGIN;

-- ensure gen_random_uuid is available
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- backfill AuthIdentity from Account (map provider strings to enum)
INSERT INTO "AuthIdentity"(id, "userId", provider, "providerUserId")
SELECT gen_random_uuid(),
       "userId",
       (CASE lower("provider")
          WHEN 'email' THEN 'EMAIL'
          WHEN 'google' THEN 'GOOGLE'
          WHEN 'github' THEN 'GITHUB'
          ELSE upper("provider")
        END)::text::"AuthProvider",
       "providerAccountId"
FROM "Account"
WHERE "providerAccountId" IS NOT NULL
ON CONFLICT (provider, "providerUserId") DO NOTHING;

-- backfill AuthSession from Session
INSERT INTO "AuthSession"(id, "sessionToken", "userId", "expires")
SELECT gen_random_uuid(),
       "sessionToken",
       "userId",
       "expires"
FROM "Session"
ON CONFLICT ("sessionToken") DO NOTHING;

COMMIT;
