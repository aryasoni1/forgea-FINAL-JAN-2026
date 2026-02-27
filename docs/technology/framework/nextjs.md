# Next.js

- Category: Framework
- Epics: A, C, J
- Version / Requirement: 16.1
- Intent / Critical Decision: Update: v16 adds native Agentic Logic and MCP support.

## EPIC-C — Notes

- Mentioned in: EPIC-C — AUTHENTICATION & RBAC
- EPIC-C intent: Document Next.js server-side and Edge runtime considerations for auth flows, middleware-based route protection, and cookie/session handling.
- Important points:
  - Provide examples of middleware for route protection using cookies/JWTs and guidance when to run auth logic on Edge vs Serverless Node runtimes.
  - Clarify environment variable handling for OAuth client secrets and secure cookie settings for both SSR and client-side rendering.
  - Pin Next.js version for App Router auth semantics and update guidance if NextAuth uses Edge-compatible adapters.

## EPIC-A — Notes

- Mentioned in: EPIC-A — MONOREPO & DEVELOPER TOOLING FOUNDATION (A8 Environment & Safety)
- EPIC-A intent: Document Next.js environment variable semantics for App Router (pin to Next.js 15.1.0 in A8) and clarify build-time vs runtime exposure (`NEXT_PUBLIC_` usage).
- Important points: Add Next.js env guidance, `.env` naming conventions, and interactions with `dotenv` for local development; ensure CI and deploy environments follow the same rules.

## EPIC-G — Notes

- Mentioned in: EPIC-G — PUSH FLOW & SNAPSHOT PREVIEW
- EPIC-G intent: Hosting and runtime preconditions for webhook handlers and preview endpoints (raw-body access, middleware, and edge vs server behavior).
- Important points:
  - Document how to access raw request bytes in Next.js App Routes and Edge/Server runtimes; provide patterns to compute HMAC over the exact bytes before parsing JSON.
  - Clarify middleware ordering and headers that must be preserved (e.g., `X-Forwarded-*`, `Content-Length`) when deployed behind a CDN or platform like Vercel/Cloud Run.
  - Provide example configuration for raw-body passthrough or `bodyParser: false` equivalents and common deployment pitfalls that cause HMAC mismatches.

## EPIC-J — Notes

- Mentioned in: EPIC-J — Routing & Rendering (J4)
- EPIC-J intent: Define canonical routing, prerendering and rendering semantics for lesson pages (SSG / no-JS fallbacks) and ensure URL/encoding normalization is consistent.
- Important points:
  - Pin Next.js version for App Router behavior and document `generateStaticParams`/SSG expectations for lesson routes.
  - Specify canonical URL encoding/normalization steps (Unicode normalization, percent-encoding) prior to route generation to avoid collisions.
  - Clarify when lessons must be prerendered vs allowed to be dynamic; document no-JS acceptable UX and accessibility expectations for server-rendered pages.

This is a comprehensive list of links extracted from the **Next.js (App Router focus)** documentation sidebar. I have converted all relative paths into absolute URLs using the `https://nextjs.org` base for easy use in NotebookLM.

### **1. Getting Started**

- [https://nextjs.org/docs/app/getting-started](https://nextjs.org/docs/app/getting-started)
- [https://nextjs.org/docs/app/getting-started/installation](https://nextjs.org/docs/app/getting-started/installation)
- [https://nextjs.org/docs/app/getting-started/project-structure](https://nextjs.org/docs/app/getting-started/project-structure)
- [https://nextjs.org/docs/app/getting-started/layouts-and-pages](https://nextjs.org/docs/app/getting-started/layouts-and-pages)
- [https://nextjs.org/docs/app/getting-started/linking-and-navigating](https://nextjs.org/docs/app/getting-started/linking-and-navigating)
- [https://nextjs.org/docs/app/getting-started/server-and-client-components](https://nextjs.org/docs/app/getting-started/server-and-client-components)
- [https://nextjs.org/docs/app/getting-started/cache-components](https://nextjs.org/docs/app/getting-started/cache-components)
- [https://nextjs.org/docs/app/getting-started/fetching-data](https://nextjs.org/docs/app/getting-started/fetching-data)
- [https://nextjs.org/docs/app/getting-started/updating-data](https://nextjs.org/docs/app/getting-started/updating-data)
- [https://nextjs.org/docs/app/getting-started/caching-and-revalidating](https://nextjs.org/docs/app/getting-started/caching-and-revalidating)
- [https://nextjs.org/docs/app/getting-started/error-handling](https://nextjs.org/docs/app/getting-started/error-handling)
- [https://nextjs.org/docs/app/getting-started/css](https://nextjs.org/docs/app/getting-started/css)
- [https://nextjs.org/docs/app/getting-started/images](https://nextjs.org/docs/app/getting-started/images)
- [https://nextjs.org/docs/app/getting-started/fonts](https://nextjs.org/docs/app/getting-started/fonts)
- [https://nextjs.org/docs/app/getting-started/metadata-and-og-images](https://nextjs.org/docs/app/getting-started/metadata-and-og-images)
- [https://nextjs.org/docs/app/getting-started/route-handlers](https://nextjs.org/docs/app/getting-started/route-handlers)
- [https://nextjs.org/docs/app/getting-started/proxy](https://nextjs.org/docs/app/getting-started/proxy)
- [https://nextjs.org/docs/app/getting-started/deploying](https://nextjs.org/docs/app/getting-started/deploying)
- [https://nextjs.org/docs/app/getting-started/upgrading](https://nextjs.org/docs/app/getting-started/upgrading)

### **2. Development Guides**

- [https://nextjs.org/docs/app/guides/ai-agents](https://www.google.com/search?q=https://nextjs.org/docs/app/guides/ai-agents)
- [https://nextjs.org/docs/app/guides/authentication](https://nextjs.org/docs/app/guides/authentication)
- [https://nextjs.org/docs/app/guides/caching](https://nextjs.org/docs/app/guides/caching)
- [https://nextjs.org/docs/app/guides/forms](https://nextjs.org/docs/app/guides/forms)
- [https://nextjs.org/docs/app/guides/mcp](https://nextjs.org/docs/app/guides/mcp)
- [https://nextjs.org/docs/app/guides/self-hosting](https://nextjs.org/docs/app/guides/self-hosting)
- [https://nextjs.org/docs/app/guides/testing](https://nextjs.org/docs/app/guides/testing)
- [https://nextjs.org/docs/app/guides/testing/playwright](https://nextjs.org/docs/app/guides/testing/playwright)
- [https://nextjs.org/docs/app/guides/testing/cypress](https://nextjs.org/docs/app/guides/testing/cypress)
- [https://nextjs.org/docs/app/guides/upgrading/version-15](https://nextjs.org/docs/app/guides/upgrading/version-15)
- [https://nextjs.org/docs/app/guides/upgrading/version-16](https://nextjs.org/docs/app/guides/upgrading/version-16)

### **3. API Reference: Components & Directives**

- [https://nextjs.org/docs/app/api-reference/directives/use-cache](https://nextjs.org/docs/app/api-reference/directives/use-cache)
- [https://nextjs.org/docs/app/api-reference/directives/use-client](https://nextjs.org/docs/app/api-reference/directives/use-client)
- [https://nextjs.org/docs/app/api-reference/directives/use-server](https://nextjs.org/docs/app/api-reference/directives/use-server)
- [https://nextjs.org/docs/app/api-reference/components/form](https://nextjs.org/docs/app/api-reference/components/form)
- [https://nextjs.org/docs/app/api-reference/components/image](https://nextjs.org/docs/app/api-reference/components/image)
- [https://nextjs.org/docs/app/api-reference/components/link](https://nextjs.org/docs/app/api-reference/components/link)

### **4. API Reference: Functions**

- [https://nextjs.org/docs/app/api-reference/functions/cookies](https://nextjs.org/docs/app/api-reference/functions/cookies)
- [https://nextjs.org/docs/app/api-reference/functions/fetch](https://nextjs.org/docs/app/api-reference/functions/fetch)
- [https://nextjs.org/docs/app/api-reference/functions/headers](https://nextjs.org/docs/app/api-reference/functions/headers)
- [https://nextjs.org/docs/app/api-reference/functions/redirect](https://nextjs.org/docs/app/api-reference/functions/redirect)
- [https://nextjs.org/docs/app/api-reference/functions/revalidatePath](https://nextjs.org/docs/app/api-reference/functions/revalidatePath)
- [https://nextjs.org/docs/app/api-reference/functions/use-router](https://nextjs.org/docs/app/api-reference/functions/use-router)
- [https://nextjs.org/docs/app/api-reference/functions/use-search-params](https://nextjs.org/docs/app/api-reference/functions/use-search-params)

### **5. Configuration (next.config.js)**

- [https://nextjs.org/docs/app/api-reference/config/next-config-js](https://nextjs.org/docs/app/api-reference/config/next-config-js)
- [https://nextjs.org/docs/app/api-reference/config/next-config-js/basePath](https://nextjs.org/docs/app/api-reference/config/next-config-js/basePath)
- [https://nextjs.org/docs/app/api-reference/config/next-config-js/env](https://nextjs.org/docs/app/api-reference/config/next-config-js/env)
- [https://nextjs.org/docs/app/api-reference/config/next-config-js/images](https://nextjs.org/docs/app/api-reference/config/next-config-js/images)
- [https://nextjs.org/docs/app/api-reference/config/next-config-js/logging](https://nextjs.org/docs/app/api-reference/config/next-config-js/logging)
- [https://nextjs.org/docs/app/api-reference/config/next-config-js/redirects](https://nextjs.org/docs/app/api-reference/config/next-config-js/redirects)
- [https://nextjs.org/docs/app/api-reference/config/next-config-js/rewrites](https://nextjs.org/docs/app/api-reference/config/next-config-js/rewrites)
- [https://nextjs.org/docs/app/api-reference/config/next-config-js/typescript](https://nextjs.org/docs/app/api-reference/config/next-config-js/typescript)
- [https://nextjs.org/docs/app/api-reference/config/next-config-js/turbopack](https://nextjs.org/docs/app/api-reference/config/next-config-js/turbopack)

### **6. Architecture & Internals**

- [https://nextjs.org/docs/architecture/nextjs-compiler](https://nextjs.org/docs/architecture/nextjs-compiler)
- [https://nextjs.org/docs/architecture/fast-refresh](https://nextjs.org/docs/architecture/fast-refresh)
- [https://nextjs.org/docs/architecture/accessibility](https://nextjs.org/docs/architecture/accessibility)
- [https://nextjs.org/docs/app/api-reference/edge](https://nextjs.org/docs/app/api-reference/edge)

### **7. Community & Contribution**

- [https://nextjs.org/docs/community/contribution-guide](https://nextjs.org/docs/community/contribution-guide)
- [https://nextjs.org/docs/community/rspack](https://nextjs.org/docs/community/rspack)

---

**Next Step:** Since you're building out an internal engineering policy, would you like me to extract the **"Least Privilege" sandbox rules** from these specific security links to help define your VFS access policy?
