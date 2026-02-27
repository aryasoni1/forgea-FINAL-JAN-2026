# NextAuth

- Category: Auth
- Epics: C
- Version / Requirement: Pin required
- Intent / Critical Decision: Canonical auth flows and provider adapters.

## EPIC-C — Notes

- Mentioned in: EPIC-C — AUTHENTICATION & RBAC
- EPIC-C intent: Use NextAuth as the canonical runtime for provider adapters, session handling, and secure cookie semantics for the web UI.
- Important points:
  - Pin NextAuth version and adapter packages (e.g., Prisma adapter) to avoid runtime mismatches.
  - Document environment variables (client IDs/secrets) retrieval from Vault and CI-safe patterns for provider secrets.
  - Provide example session/cookie config (HttpOnly, Secure, SameSite, cookie max-age) and guidance for server-side vs edge runtimes.
  - Include migration guidance if moving from NextAuth default model names to custom `AuthIdentity`/`AuthSession` tables used by EPIC-B.
    That is a massive list! It looks like you're pulling from both the **NextAuth.js** core documentation and the **Auth.js (v5/Better Auth)** transition guides.

I’ve compiled and categorized all the links from the sidebar data you provided. I have prepended the base URL `https://next-auth.js.org` to the relative paths so they are ready for NotebookLM.

### **Getting Started & Core**

- [https://next-auth.js.org/getting-started/introduction](https://next-auth.js.org/getting-started/introduction)
- [https://next-auth.js.org/getting-started/example](https://next-auth.js.org/getting-started/example)
- [https://next-auth.js.org/getting-started/client](https://next-auth.js.org/getting-started/client)
- [https://next-auth.js.org/getting-started/rest-api](https://next-auth.js.org/getting-started/rest-api)
- [https://next-auth.js.org/getting-started/typescript](https://next-auth.js.org/getting-started/typescript)
- [https://next-auth.js.org/getting-started/upgrade-v4](https://next-auth.js.org/getting-started/upgrade-v4)
- [https://next-auth.js.org/getting-started/installation](https://www.google.com/search?q=https://next-auth.js.org/getting-started/installation)
- [https://next-auth.js.org/getting-started/database](https://www.google.com/search?q=https://next-auth.js.org/getting-started/database)
- [https://next-auth.js.org/getting-started/deployment](https://www.google.com/search?q=https://next-auth.js.org/getting-started/deployment)
- [https://next-auth.js.org/getting-started/migrating-to-v5](https://www.google.com/search?q=https://next-auth.js.org/getting-started/migrating-to-v5)
- [https://next-auth.js.org/security](https://next-auth.js.org/security)

### **Configuration & Session Management**

- [https://next-auth.js.org/configuration/initialization](https://next-auth.js.org/configuration/initialization)
- [https://next-auth.js.org/configuration/options](https://next-auth.js.org/configuration/options)
- [https://next-auth.js.org/configuration/databases](https://next-auth.js.org/configuration/databases)
- [https://next-auth.js.org/configuration/pages](https://next-auth.js.org/configuration/pages)
- [https://next-auth.js.org/configuration/callbacks](https://next-auth.js.org/configuration/callbacks)
- [https://next-auth.js.org/configuration/events](https://next-auth.js.org/configuration/events)
- [https://next-auth.js.org/configuration/nextjs](https://next-auth.js.org/configuration/nextjs)
- [https://next-auth.js.org/getting-started/session-management/login](https://www.google.com/search?q=https://next-auth.js.org/getting-started/session-management/login)
- [https://next-auth.js.org/getting-started/session-management/get-session](https://www.google.com/search?q=https://next-auth.js.org/getting-started/session-management/get-session)
- [https://next-auth.js.org/getting-started/session-management/protecting](https://www.google.com/search?q=https://next-auth.js.org/getting-started/session-management/protecting)
- [https://next-auth.js.org/getting-started/session-management/custom-pages](https://www.google.com/search?q=https://next-auth.js.org/getting-started/session-management/custom-pages)

### **Authentication Providers (OAuth & Others)**

- [https://next-auth.js.org/providers/overview](https://www.google.com/search?q=https://next-auth.js.org/providers/overview)
- [https://next-auth.js.org/configuration/providers/oauth](https://next-auth.js.org/configuration/providers/oauth)
- [https://next-auth.js.org/configuration/providers/email](https://next-auth.js.org/configuration/providers/email)
- [https://next-auth.js.org/configuration/providers/credentials](https://next-auth.js.org/configuration/providers/credentials)
- [https://next-auth.js.org/getting-started/authentication/webauthn](https://www.google.com/search?q=https://next-auth.js.org/getting-started/authentication/webauthn)
- [https://next-auth.js.org/providers/apple](https://next-auth.js.org/providers/apple)
- [https://next-auth.js.org/providers/auth0](https://next-auth.js.org/providers/auth0)
- [https://next-auth.js.org/providers/cognito](https://next-auth.js.org/providers/cognito)
- [https://next-auth.js.org/providers/discord](https://next-auth.js.org/providers/discord)
- [https://next-auth.js.org/providers/facebook](https://next-auth.js.org/providers/facebook)
- [https://next-auth.js.org/providers/github](https://next-auth.js.org/providers/github)
- [https://next-auth.js.org/providers/gitlab](https://next-auth.js.org/providers/gitlab)
- [https://next-auth.js.org/providers/google](https://next-auth.js.org/providers/google)
- [https://next-auth.js.org/providers/okta](https://next-auth.js.org/providers/okta)
- [https://next-auth.js.org/providers/reddit](https://next-auth.js.org/providers/reddit)
- [https://next-auth.js.org/providers/slack](https://next-auth.js.org/providers/slack)
- [https://next-auth.js.org/providers/spotify](https://next-auth.js.org/providers/spotify)

### **Database Adapters**

- [https://next-auth.js.org/adapters](https://next-auth.js.org/adapters)
- [https://next-auth.js.org/getting-started/adapters/prisma](https://www.google.com/search?q=https://next-auth.js.org/getting-started/adapters/prisma)
- [https://next-auth.js.org/getting-started/adapters/drizzle](https://www.google.com/search?q=https://next-auth.js.org/getting-started/adapters/drizzle)
- [https://next-auth.js.org/getting-started/adapters/mongodb](https://www.google.com/search?q=https://next-auth.js.org/getting-started/adapters/mongodb)
- [https://next-auth.js.org/getting-started/adapters/pg](https://www.google.com/search?q=https://next-auth.js.org/getting-started/adapters/pg)
- [https://next-auth.js.org/getting-started/adapters/supabase](https://www.google.com/search?q=https://next-auth.js.org/getting-started/adapters/supabase)
- [https://next-auth.js.org/getting-started/adapters/dynamodb](https://www.google.com/search?q=https://next-auth.js.org/getting-started/adapters/dynamodb)
- [https://next-auth.js.org/getting-started/adapters/firebase](https://www.google.com/search?q=https://next-auth.js.org/getting-started/adapters/firebase)
- [https://next-auth.js.org/getting-started/adapters/typeorm](https://www.google.com/search?q=https://next-auth.js.org/getting-started/adapters/typeorm)
- [https://next-auth.js.org/getting-started/adapters/sequelize](https://www.google.com/search?q=https://next-auth.js.org/getting-started/adapters/sequelize)
- [https://next-auth.js.org/getting-started/adapters/upstash-redis](https://www.google.com/search?q=https://next-auth.js.org/getting-started/adapters/upstash-redis)

### **Guides & Reference**

- [https://next-auth.js.org/guides/basics](https://next-auth.js.org/guides/basics)
- [https://next-auth.js.org/guides/fullstack](https://next-auth.js.org/guides/fullstack)
- [https://next-auth.js.org/guides/testing](https://next-auth.js.org/guides/testing)
- [https://next-auth.js.org/warnings](https://next-auth.js.org/warnings)
- [https://next-auth.js.org/errors](https://next-auth.js.org/errors)
- [https://next-auth.js.org/getting-started/integrations](https://www.google.com/search?q=https://next-auth.js.org/getting-started/integrations)

---

**Would you like me to help you draft the prompt you'll use in NotebookLM to synthesize all this data into a specific implementation guide?**
Here is the comprehensive list of links extracted from the **Auth.js (v5)** documentation sidebar you provided. These are formatted with the absolute `https://authjs.dev` base URL for easy copy-pasting into NotebookLM.

### **Core Getting Started**

- [https://authjs.dev/getting-started](https://authjs.dev/getting-started)
- [https://authjs.dev/getting-started/introduction](https://www.google.com/search?q=https://authjs.dev/getting-started/introduction)
- [https://authjs.dev/getting-started/installation](https://authjs.dev/getting-started/installation)
- [https://authjs.dev/getting-started/database](https://authjs.dev/getting-started/database)
- [https://authjs.dev/getting-started/deployment](https://authjs.dev/getting-started/deployment)
- [https://authjs.dev/getting-started/typescript](https://authjs.dev/getting-started/typescript)
- [https://authjs.dev/getting-started/migrate-to-better-auth](https://authjs.dev/getting-started/migrate-to-better-auth)
- [https://authjs.dev/getting-started/migrating-to-v5](https://authjs.dev/getting-started/migrating-to-v5)
- [https://authjs.dev/getting-started/integrations](https://authjs.dev/getting-started/integrations)

### **Authentication & Session Management**

- [https://authjs.dev/getting-started/authentication](https://authjs.dev/getting-started/authentication)
- [https://authjs.dev/getting-started/authentication/oauth](https://authjs.dev/getting-started/authentication/oauth)
- [https://authjs.dev/getting-started/authentication/email](https://authjs.dev/getting-started/authentication/email)
- [https://authjs.dev/getting-started/authentication/credentials](https://authjs.dev/getting-started/authentication/credentials)
- [https://authjs.dev/getting-started/authentication/webauthn](https://authjs.dev/getting-started/authentication/webauthn)
- [https://authjs.dev/getting-started/session-management/login](https://authjs.dev/getting-started/session-management/login)
- [https://authjs.dev/getting-started/session-management/get-session](https://authjs.dev/getting-started/session-management/get-session)
- [https://authjs.dev/getting-started/session-management/protecting](https://authjs.dev/getting-started/session-management/protecting)
- [https://authjs.dev/getting-started/session-management/custom-pages](https://authjs.dev/getting-started/session-management/custom-pages)

### **OAuth Providers**

- [https://authjs.dev/getting-started/providers/apple](https://authjs.dev/getting-started/providers/apple)
- [https://authjs.dev/getting-started/providers/auth0](https://authjs.dev/getting-started/providers/auth0)
- [https://authjs.dev/getting-started/providers/authentik](https://authjs.dev/getting-started/providers/authentik)
- [https://authjs.dev/getting-started/providers/azure-ad](https://authjs.dev/getting-started/providers/azure-ad)
- [https://authjs.dev/getting-started/providers/azure-ad-b2c](https://authjs.dev/getting-started/providers/azure-ad-b2c)
- [https://authjs.dev/getting-started/providers/battlenet](https://authjs.dev/getting-started/providers/battlenet)
- [https://authjs.dev/getting-started/providers/box](https://authjs.dev/getting-started/providers/box)
- [https://authjs.dev/getting-started/providers/discord](https://authjs.dev/getting-started/providers/discord)
- [https://authjs.dev/getting-started/providers/facebook](https://authjs.dev/getting-started/providers/facebook)
- [https://authjs.dev/getting-started/providers/github](https://authjs.dev/getting-started/providers/github)
- [https://authjs.dev/getting-started/providers/gitlab](https://authjs.dev/getting-started/providers/gitlab)
- [https://authjs.dev/getting-started/providers/google](https://authjs.dev/getting-started/providers/google)
- [https://authjs.dev/getting-started/providers/hubspot](https://authjs.dev/getting-started/providers/hubspot)
- [https://authjs.dev/getting-started/providers/keycloak](https://authjs.dev/getting-started/providers/keycloak)
- [https://authjs.dev/getting-started/providers/linkedin](https://authjs.dev/getting-started/providers/linkedin)
- [https://authjs.dev/getting-started/providers/okta](https://authjs.dev/getting-started/providers/okta)
- [https://authjs.dev/getting-started/providers/slack](https://authjs.dev/getting-started/providers/slack)
- [https://authjs.dev/getting-started/providers/spotify](https://authjs.dev/getting-started/providers/spotify)
- [https://authjs.dev/getting-started/providers/twitch](https://authjs.dev/getting-started/providers/twitch)
- [https://authjs.dev/getting-started/providers/twitter](https://authjs.dev/getting-started/providers/twitter)

### **Database Adapters**

- [https://authjs.dev/getting-started/adapters/prisma](https://authjs.dev/getting-started/adapters/prisma)
- [https://authjs.dev/getting-started/adapters/drizzle](https://authjs.dev/getting-started/adapters/drizzle)
- [https://authjs.dev/getting-started/adapters/mongodb](https://authjs.dev/getting-started/adapters/mongodb)
- [https://authjs.dev/getting-started/adapters/pg](https://authjs.dev/getting-started/adapters/pg)
- [https://authjs.dev/getting-started/adapters/supabase](https://authjs.dev/getting-started/adapters/supabase)
- [https://authjs.dev/getting-started/adapters/d1](https://authjs.dev/getting-started/adapters/d1)
- [https://authjs.dev/getting-started/adapters/dynamodb](https://authjs.dev/getting-started/adapters/dynamodb)
- [https://authjs.dev/getting-started/adapters/firebase](https://authjs.dev/getting-started/adapters/firebase)
- [https://authjs.dev/getting-started/adapters/neon](https://authjs.dev/getting-started/adapters/neon)
- [https://authjs.dev/getting-started/adapters/typeorm](https://authjs.dev/getting-started/adapters/typeorm)
- [https://authjs.dev/getting-started/adapters/upstash-redis](https://authjs.dev/getting-started/adapters/upstash-redis)
- [https://authjs.dev/getting-started/adapters/azure-tables](https://authjs.dev/getting-started/adapters/azure-tables)
- [https://authjs.dev/getting-started/adapters/mikro-orm](https://authjs.dev/getting-started/adapters/mikro-orm)
- [https://authjs.dev/getting-started/adapters/surrealdb](https://authjs.dev/getting-started/adapters/surrealdb)
- [https://authjs.dev/getting-started/adapters/xata](https://authjs.dev/getting-started/adapters/xata)
