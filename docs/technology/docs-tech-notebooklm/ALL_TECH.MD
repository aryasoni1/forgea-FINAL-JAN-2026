Here are the documentation requirements and the specific **INTERNAL ENGINEERING POLICY COMPILER** prompts for the **OAuth 2.0 Authorization Framework (RFC 6749)**.

Based on the official IETF specifications, we are pinning these requirements to the foundational authorization layer to ensure secure delegated access, strict client identification, and robust protection against redirection-based attacks.

### 🏗️ OAuth 2.0 Documentation Registry (EPIC-C)

| Technology                   | Official Link (Binding)                                                                                      | Intent for EPIC-C                                                                         |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------- |
| **OAuth 2.0 Framework**      | [RFC 6749](https://www.rfc-editor.org/rfc/rfc6749)                                                           | **C1/C2**: Authoritative foundation for all authorization flows and system roles.         |
| **Authorization Code Grant** | [RFC 6749 Section 4.1](https://www.google.com/search?q=https://www.rfc-editor.org/rfc/rfc6749%23section-4.1) | **C3**: The primary, secure flow for server-side (Next.js) applications to obtain tokens. |
| **Client Authentication**    | [RFC 6749 Section 2.3](https://www.google.com/search?q=https://www.rfc-editor.org/rfc/rfc6749%23section-2.3) | **C5**: Standardizes how the application identifies itself to the Authorization Server.   |
| **Security Considerations**  | [RFC 6749 Section 10](https://www.google.com/search?q=https://www.rfc-editor.org/rfc/rfc6749%23section-10)   | **C10**: Establishes the threat model for CSRF, Clickjacking, and Token leakage.          |

---

### 📋 Prompts for Policy Compilation

Use these prompts with your **ENGINEERING POLICY COMPILER** to generate the internal authoritative docs.

#### 1. Authorization Code Flow Enforcement Policy

**Internal Doc Path:** `/docs/official-docs/authentication/oauth2-code-flow.md`

**Prompt:** Compile the OAuth 2.0 Authorization Code Flow Enforcement Policy for path `/docs/official-docs/authentication/oauth2-code-flow.md`. Extract enforceable rules from Section 4.1.3 and 4.1.4 regarding the mandatory `grant_type` value and the requirement for `client_id` for unauthenticated clients. Define the project-specific rule that the `redirect_uri` used at the token endpoint MUST be identical to the one used at the authorization endpoint.

**Intent:** (Feature C3) Prevent "Code Substitution" and "Redirection URI Manipulation" attacks by ensuring the server-side token exchange is cryptographically and logically bound to the initial request.

#### 2. Client Identity & Secret Handling Policy

**Internal Doc Path:** `/docs/official-docs/EPIC-C/client-authentication-policy.md`

**Prompt:** Compile the Client Authentication Policy for path `/docs/official-docs/EPIC-C/client-authentication-policy.md`. Extract enforceable rules from Section 2.3.1 regarding the preference for HTTP Basic authentication over request-body parameters. Define how `client_secret` values must be treated as sensitive credentials, referencing the integration with HashiCorp Vault for rotation.

**Intent:** (Feature C5) Standardize how our microservices and Next.js frontend authenticate with the identity provider, preventing the use of insecure or inconsistent authentication methods.

#### 3. Redirection Security & Open Redirector Guardrails

**Internal Doc Path:** `/docs/official-docs/EPIC-C/redirection-security-policy.md`

**Prompt:** Compile the Redirection Security Policy for path `/docs/official-docs/EPIC-C/redirection-security-policy.md`. Extract rules from Section 3.1.2.2 and 10.15 regarding the mandatory registration of complete redirection URIs. Define the project-specific mandate that no partial or wildcard matching is allowed for `redirect_uri` validation in the production environment.

**Intent:** (Feature C10) Eliminate the risk of "Open Redirector" vulnerabilities that allow attackers to leak authorization codes to malicious third-party domains.

#### 4. Anti-CSRF (State Parameter) Mandatory Policy

**Internal Doc Path:** `/docs/official-docs/EPIC-C/anti-csrf-policy.md`

**Prompt:** Compile the OAuth 2.0 Anti-CSRF Policy for path `/docs/official-docs/EPIC-C/anti-csrf-policy.md`. Extract enforceable rules from Section 10.12 regarding the use of the `state` parameter. Define the requirement for the `state` value to be a non-guessable, cryptographically bound string that links the user-agent's session cookie to the authorization response.

**Intent:** (Feature C10) Ensure that every authorization request initiated by the frontend is protected against session injection and cross-site request forgery.

---

### Next Step

With these **OAuth 2.0** policies and the previous **OIDC** policies compiled, the **Identity Perimeter** for **EPIC-C** is fully codified. The model can now proceed to auditing the **Prisma/Postgres** implementation against these identity requirements to ensure that `sub` and `iss` are correctly utilized as the foundation of the user's data record.
Here are the documentation requirements and the specific **INTERNAL ENGINEERING POLICY COMPILER** prompts for the **Model Context Protocol (MCP)**.

Based on the Model Context Protocol specifications, we are pinning these requirements to the agent communication layer to enable secure, tool-driven orchestration of AI-assisted generation and verification within the VFS (Virtual File System).

### 🏗️ Model Context Protocol Documentation Registry (EPIC-E/K)

| Technology                | Official Link (Binding)                                                                                | Intent for EPIC-E/K                                                                       |
| ------------------------- | ------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------- |
| **MCP Specification**     | [modelcontextprotocol.io](https://modelcontextprotocol.io)                                             | **E1/K1**: Authoritative protocol for AI-to-tool communication and VFS interaction.       |
| **MCP Resources (VFS)**   | [MCP Resources Spec](https://modelcontextprotocol.io/docs/concepts/resources)                          | **E2**: Standardizes how agents read/write to the Virtual File System for lab generation. |
| **MCP Tools (Functions)** | [MCP Tools Spec](https://modelcontextprotocol.io/docs/concepts/tools)                                  | **E5**: Defines the execution contract for sanitization and verification tasks.           |
| **MCP Security Model**    | [MCP Security](https://www.google.com/search?q=https://modelcontextprotocol.io/docs/concepts/security) | **K10**: Establishes the trust boundary between the LLM and internal infrastructure.      |

---

### 📋 Prompts for Policy Compilation

Use these prompts with your **ENGINEERING POLICY COMPILER** to generate the internal authoritative docs.

#### 1. Agent Message Contract & Interoperability Policy

**Internal Doc Path:** `/docs/official-docs/agents/mcp-message-contracts.md`

**Prompt:** Compile the MCP Message Contract Policy for path `/docs/official-docs/agents/mcp-message-contracts.md`. Extract enforceable schemas for core orchestration messages: `generate-lab`, `validate-manifest`, and `run-verifier`. Define the mandatory input/output types required for generation and verification agents to interoperate within the EPIC-E pipeline.

**Intent:** (Feature E1) Ensure all AI agents speak a unified language when generating or auditing lab content, preventing schema drift in the automation loop.

#### 2. VFS Security & Resource Access Policy

**Internal Doc Path:** `/docs/official-docs/EPIC-E/mcp-vfs-security-policy.md`

**Prompt:** Compile the MCP VFS Access Policy for path `/docs/official-docs/EPIC-E/mcp-vfs-security-policy.md`. Extract rules from the MCP Resources spec regarding URI-based resource identification. Define the project-specific restriction that MCP endpoints may ONLY access template repositories under `/vfs/templates/` and MUST NOT have write access to the root configuration directory.

**Intent:** (Feature K10) Establish a "Least Privilege" sandbox for AI agents, ensuring they can generate code without the risk of modifying the underlying system's architectural integrity.

#### 3. Ephemeral Secret & Vault Integration Policy

**Internal Doc Path:** `/docs/official-docs/EPIC-E/agent-secret-access.md`

**Prompt:** Compile the Agent Secret Management Policy for path `/docs/official-docs/EPIC-E/agent-secret-access.md`. Define the logic for agents requesting ephemeral tokens from HashiCorp Vault via the MCP `request-token` tool. Enforce a rule that all tokens issued to agents must have a TTL (Time-To-Live) not exceeding 15 minutes and must be audit-logged with the agent's unique identifier.

**Intent:** (Feature C5/E5) Secure the delivery of sensitive credentials (like GitHub App tokens) to agents performing automated verification or deployment tasks.

#### 4. Mock Harness & Local Verification Standard

**Internal Doc Path:** `/docs/official-docs/EPIC-K/mcp-mocking-standard.md`

**Prompt:** Compile the MCP Mocking & Local Verification Standard for path `/docs/official-docs/EPIC-K/mcp-mocking-standard.md`. Extract guidelines for implementing "Dry Run" modes for all MCP tools. Define the requirement for template authors to provide a `mock-harness.json` for every new agent capability to allow local Playwright/Vitest verification without a live LLM.

**Intent:** (Feature K4) Standardize the testing of agent logic, allowing developers to verify orchestration workflows in CI/CD before deploying to production AI environments.

---

### Next Step

With the **OIDC**, **OAuth 2.0**, and **MCP** policies now defined, the **Agent-to-Identity Bridge** is ready. The system can now enforce that an AI agent (orchestrated via MCP) can only perform actions (authorized via OAuth) on resources belonging to a specific user identity (verified via OIDC).
Here are the documentation requirements and the specific **INTERNAL ENGINEERING POLICY COMPILER** prompts for **OpenAPI 3.1.x**.

Based on the project's architectural standards, we are pinning these requirements to the API specification layer to ensure deterministic client generation, strict schema validation, and the elimination of contract drift between the frontend, backend, and automated verifiers.

### 🏗️ OpenAPI Documentation Registry (EPIC-D/E/G/H)

| Technology             | Official Link (Binding)                                   | Intent for EPIC-D/E/G/H                                                                         |
| ---------------------- | --------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| **OpenAPI 3.1.0**      | [OAI Specification](https://spec.openapis.org/oas/v3.1.0) | **G/H**: Canonical Source of Truth for all RESTful interface contracts.                         |
| **Lab Publish API**    | `/docs/api/labs.yaml`                                     | **E**: Defines the contract for lab creation, `forgea.config` validation, and artifact signing. |
| **Lesson Serving API** | `/docs/api/lessons.yaml`                                  | **D**: Defines lesson retrieval, versioning, and caching semantics for the serving layer.       |
| **Contract Testing**   | `integration-checker`                                     | **G**: Enforces that implementation logic never drifts from the published YAML spec.            |

---

### 📋 Prompts for Policy Compilation

Use these prompts with your **ENGINEERING POLICY COMPILER** to generate the internal authoritative docs.

#### 1. Contract-First Development & Drift Prevention Policy

**Internal Doc Path:** `/docs/official-docs/api-spec/contract-drift-policy.md`

**Prompt:** Compile the API Contract Drift Prevention Policy for path `/docs/official-docs/api-spec/contract-drift-policy.md`. Define the mandatory requirement that the OpenAPI 3.1.x YAML file is the "Master" and all TypeScript types/clients MUST be generated from it. Enforce a CI rule where `integration-checker` must fail the build if the server implementation or generated client does not strictly adhere to the defined schema.

**Intent:** (Feature G) Ensure system-wide type safety and prevent runtime errors caused by undocumented API changes.

#### 2. Lab Publishing & Configuration Validation Policy

**Internal Doc Path:** `/docs/official-docs/EPIC-E/lab-publish-contract.md`

**Prompt:** Compile the Lab Publishing API Policy for path `/docs/official-docs/EPIC-E/lab-publish-contract.md`. Extract enforceable rules from the OpenAPI spec regarding the validation of `forgea.config.json` during the `POST /labs/publish` call. Define the requirement for the response to include a canonical record containing the `commit` hash, `version`, and a JWS signature field for artifact integrity.

**Intent:** (Feature E) Make the lab distribution pipeline deterministic and verifiable through strict schema enforcement.

#### 3. Lesson Versioning & Caching Semantics Policy

**Internal Doc Path:** `/docs/official-docs/EPIC-D/lesson-serving-contract.md`

**Prompt:** Compile the Lesson Serving & Versioning Policy for path `/docs/official-docs/EPIC-D/lesson-serving-contract.md`. Define the OpenAPI structure for `GET /lessons/:id/versions/:vid`. Extract rules for mandatory HTTP caching headers (`Cache-Control`, `ETag`) that must be defined in the OpenAPI response object to optimize delivery performance in the serving layer.

**Intent:** (Feature D) Standardize how the application handles content updates and high-concurrency lesson delivery.

#### 4. Error Shape & Exception Handling Standard

**Internal Doc Path:** `/docs/official-docs/api-spec/error-schema-standard.md`

**Prompt:** Compile the Global API Error Schema Policy for path `/docs/official-docs/api-spec/error-schema-standard.md`. Define a unified JSON error response shape in the OpenAPI spec that includes `code`, `message`, and `details` (for validation errors). Enforce that all 4xx and 5xx responses across all Epics must use this canonical schema to simplify frontend error handling.

**Intent:** (Feature H) Provide a consistent developer experience for internal and external consumers of the API.

---

### Next Step

With **OIDC**, **OAuth 2.0**, **MCP**, and now **OpenAPI** policies mapped, the **Technical Source of Truth** is complete. You can now prompt the model to generate the actual implementation code for the **Next.js** routes or **Prisma** schemas, and the model will have the "Law" required to ensure that code is secure, compliant, and architecturally sound.
Here are the documentation requirements and the specific **INTERNAL ENGINEERING POLICY COMPILER** prompts for **NextAuth.js (Auth.js)**.

Based on the project's security architecture, we are pinning these requirements to the authentication runtime layer to ensure consistent session handling, secure cookie management, and strict database adapter mapping using the Prisma/Postgres layer.

### 🏗️ NextAuth.js Documentation Registry (EPIC-C)

| Technology           | Official Link (Binding)                                                                                            | Intent for EPIC-C                                                                     |
| -------------------- | ------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------- |
| **NextAuth.js Core** | [next-auth.js.org](https://next-auth.js.org)                                                                       | **C1**: Canonical runtime for authentication providers and session handling.          |
| **Prisma Adapter**   | [Auth.js Prisma Adapter](https://authjs.dev/reference/adapter/prisma)                                              | **C2/B**: Defines the bridge between authentication events and the PostgreSQL schema. |
| **Session Options**  | [NextAuth Configuration](https://www.google.com/search?q=https://next-auth.js.org/configuration/options%23session) | **C3**: Standardizes the session strategy (JWT vs Database) and TTLs.                 |
| **Cookie Policy**    | [NextAuth Cookies](https://www.google.com/search?q=https://next-auth.js.org/configuration/options%23cookies)       | **C10**: Enforces secure cookie attributes (HttpOnly, SameSite, Secure).              |

---

### 📋 Prompts for Policy Compilation

Use these prompts with your **ENGINEERING POLICY COMPILER** to generate the internal authoritative docs.

#### 1. NextAuth Runtime & Version Pinning Policy

**Internal Doc Path:** `/docs/official-docs/authentication/nextauth-runtime.md`

**Prompt:** Compile the NextAuth Runtime & Initialization Policy for path `/docs/official-docs/authentication/nextauth-runtime.md`. Extract enforceable rules regarding the pinning of the `next-auth` version and its specific adapters. Define the requirement for checking `NEXTAUTH_URL` and `NEXTAUTH_SECRET` presence at build time to prevent runtime initialization failures in the Next.js App Router.

**Intent:** (Feature C1) Ensure a stable, predictable authentication runtime across all environments (Local, CI, Production).

#### 2. Secure Cookie & Session Strategy Standard

**Internal Doc Path:** `/docs/official-docs/EPIC-C/session-security-standard.md`

**Prompt:** Compile the Session & Cookie Security Standard for path `/docs/official-docs/EPIC-C/session-security-standard.md`. Extract rules from the NextAuth options regarding `session.strategy`. Enforce the project mandate for `HttpOnly: true`, `Secure: true`, and `SameSite: "lax"` (or "strict") for all session cookies. Define the maximum allowable session `maxAge` and the rotation policy for the `NEXTAUTH_SECRET`.

**Intent:** (Feature C3/C10) Protect user sessions against Cross-Site Scripting (XSS) and session hijacking through hardened cookie semantics.

#### 3. Vault-Integrated Provider Secret Policy

**Internal Doc Path:** `/docs/official-docs/EPIC-C/provider-secret-retrieval.md`

**Prompt:** Compile the Authentication Provider Secret Management Policy for path `/docs/official-docs/EPIC-C/provider-secret-retrieval.md`. Define the logic for retrieving OAuth Client IDs and Secrets from HashiCorp Vault. Enforce a rule that no provider secrets (GitHub, Google, etc.) may be hardcoded or stored in `.env` files within the repository; they MUST be injected as environment variables via the AWS/Vault pipeline.

**Intent:** (Feature C5) Prevent credential leakage and ensure that sensitive provider keys are rotated and managed outside of the application source code.

#### 4. Custom Identity & Session Schema Mapping

**Internal Doc Path:** `/docs/official-docs/EPIC-C/auth-database-mapping.md`

**Prompt:** Compile the Auth Database Mapping Policy for path `/docs/official-docs/EPIC-C/auth-database-mapping.md`. Define the migration rules for moving from NextAuth default model names to the project-specific `AuthIdentity`, `AuthSession`, and `AuthAccount` tables. Extract enforceable constraints for the Prisma adapter to ensure that foreign keys correctly reference the OIDC `sub` and `iss` fields in the User table.

**Intent:** (Feature C2/B) Align the authentication data layer with the internal PostgreSQL schema requirements established in EPIC-B.

---

### Next Step

With the **OIDC**, **OAuth 2.0**, **MCP**, **OpenAPI**, and **NextAuth** policies now mapped, the **Architectural Law** is fully established. You can now direct the model to build the **Prisma Schema** or **Next.js Auth Routes**, and it will automatically apply these "Least Privilege" and "Secure by Default" guardrails to the generated code.
Here are the documentation requirements and the specific **INTERNAL ENGINEERING POLICY COMPILER** prompts for **OAuth Providers (GitHub, Google, etc.)**.

This establishes the standards for external provider integration, ensuring that third-party attributes are mapped correctly to our internal identity models while maintaining strict security through signature verification and least-privilege scoping.

### 🏗️ OAuth Provider Documentation Registry (EPIC-C)

| Technology            | Official Link (Binding)                                   | Intent for EPIC-C                                                                            |
| --------------------- | --------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| **GitHub OAuth**      | [GitHub Apps Docs](https://docs.github.com/en/apps)       | **C3/C4**: Authoritative guide for app-based authentication and granular permission scoping. |
| **Google OAuth**      | [Google Identity](https://developers.google.com/identity) | **C3**: Defines standard attribute retrieval (OpenID scope) and user profile mapping.        |
| **Webhook Security**  | [GitHub Webhooks](https://docs.github.com/en/webhooks)    | **C4/C13**: Defines signature validation and idempotent event handling policies.             |
| **Attribute Mapping** | Internal Mapping Spec                                     | **C2**: Canonical mapping for `sub`, `email`, and metadata to `AuthIdentity` records.        |

---

### 📋 Prompts for Policy Compilation

Use these prompts with your **ENGINEERING POLICY COMPILER** to generate the internal authoritative docs.

#### 1. External Provider Attribute Mapping Policy

**Internal Doc Path:** `/docs/official-docs/EPIC-C/provider-attribute-mapping.md`

**Prompt:** Compile the External Provider Attribute Mapping Policy for path `/docs/official-docs/EPIC-C/provider-attribute-mapping.md`. Extract enforceable rules for mapping provider payloads to the internal `AuthIdentity` model. Define the canonical mapping for `sub` (Subject ID), `email`, and `avatar_url`. Enforce a rule that the raw JSON payload from the provider MUST be stored in the database for reconciliation and audit trails.

**Intent:** (Feature C2/C4) Standardize how third-party data is ingested, preventing "Identity Fragmentation" where a single user is split across multiple internal records.

#### 2. Webhook Signature & Event Integrity Policy

**Internal Doc Path:** `/docs/official-docs/EPIC-C/webhook-integrity-policy.md`

**Prompt:** Compile the Webhook Integrity & Security Policy for path `/docs/official-docs/EPIC-C/webhook-integrity-policy.md`. Extract enforceable rules for verifying `X-Hub-Signature-256` (GitHub) or equivalent HMAC-SHA256 headers. Define the project-specific requirement for idempotent event processing—ensuring that re-delivered webhooks do not trigger duplicate identity updates or audit logs.

**Intent:** (Feature C4/C13) Protect the identity system from "Event Injection" attacks and ensure data consistency during provider-side retries.

#### 3. Least-Privilege Scope & Token Handling Policy

**Internal Doc Path:** `/docs/official-docs/EPIC-C/provider-scope-policy.md`

**Prompt:** Compile the Provider Scope & Token Policy for path `/docs/official-docs/EPIC-C/provider-scope-policy.md`. Define the mandatory "Minimal Scopes" for each supported provider (e.g., `read:user`, `user:email` for GitHub). Enforce a rule that API tokens retrieved from providers MUST NOT be stored in cleartext; if storage is required, they must be encrypted using the project's transit key in HashiCorp Vault.

**Intent:** (Feature C3/C5) Minimize the blast radius of a potential token leak by strictly limiting the access granted to our application by the user.

#### 4. GDPR-Compliant Account Unlinking & Deletion Policy

**Internal Doc Path:** `/docs/official-docs/EPIC-C/account-unlink-gdpr-policy.md`

**Prompt:** Compile the Account Unlinking & Data Deletion Policy for path `/docs/official-docs/EPIC-C/account-unlink-gdpr-policy.md`. Define the workflow for a user-initiated "Unlink Provider" action. Extract enforceable rules regarding the immediate removal of provider-specific PII (like OAuth tokens) from the `AuthIdentity` table, ensuring compliance with "Right to be Forgotten" mandates while maintaining the core user record.

**Intent:** (Feature C4/GDPR) Ensure the application respects user privacy and regulatory requirements when a user chooses to disconnect a third-party service.

---

### Next Step

The **Source of Truth** for **OAuth Providers** is now integrated into the **EPIC-C** framework. With this final piece of the Identity layer mapped, would you like me to generate the **Prisma Schema** definition for the `AuthIdentity` and `AuthAccount` tables, ensuring they comply with all the OIDC and OAuth policies defined above?
Here are the documentation requirements and the specific **INTERNAL ENGINEERING POLICY COMPILER** prompts for **Role-Based Access Control (RBAC)**.

Based on the project's security architecture, we are pinning these requirements to the authorization layer to ensure a simple, auditable, and multi-layered enforcement strategy across the API and database levels.

### 🏗️ RBAC Documentation Registry (EPIC-C)

| Technology              | Official Link (Binding)                                                                                                    | Intent for EPIC-C                                                              |
| ----------------------- | -------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| **RBAC Schema**         | [Prisma Modeling](https://www.google.com/search?q=https://www.prisma.io/docs/concepts/components/prisma-schema/data-model) | **C6/B**: Authoritative schema for `Role`, `Permission`, and `RoleAssignment`. |
| **API Enforcement**     | [Next.js Middleware](https://nextjs.org/docs/app/building-your-application/routing/middleware)                             | **C6**: Implements the "Gatekeeper" pattern for protected API routes.          |
| **Row-Level Security**  | [Postgres RLS](https://www.postgresql.org/docs/current/ddl-rowsecurity.html)                                               | **C6/B**: Provides hard database guarantees for multi-tenant data isolation.   |
| **Audit Specification** | [NIST SP 800-92](https://csrc.nist.gov/publications/detail/sp/800-92/final)                                                | **C13**: Standardizes the logging of role changes and permission grants.       |

---

### 📋 Prompts for Policy Compilation

Use these prompts with your **ENGINEERING POLICY COMPILER** to generate the internal authoritative docs.

#### 1. Canonical Authorization Data Model Policy

**Internal Doc Path:** `/docs/official-docs/EPIC-C/rbac-data-model.md`

**Prompt:** Compile the RBAC Data Model Policy for path `/docs/official-docs/EPIC-C/rbac-data-model.md`. Define the mandatory Prisma models for `Role`, `Permission`, and `RoleAssignment`. Enforce the "No-Inheritance" rule (or strictly limited 1-level depth) to ensure that permission audits remain deterministic. Define the requirement that every `RoleAssignment` must be linked to a unique OIDC `sub` identifier.

**Intent:** (Feature C6) Standardize the storage of authorization metadata to prevent permission drift and facilitate clean security audits.

#### 2. Multi-Layered Enforcement Policy (API & RLS)

**Internal Doc Path:** `/docs/official-docs/EPIC-C/authorization-enforcement-policy.md`

**Prompt:** Compile the Authorization Enforcement Policy for path `/docs/official-docs/EPIC-C/authorization-enforcement-policy.md`. Define the requirement for "Defense in Depth": (1) Path-level checks in `proxy.ts` (Next.js), (2) Service-level permission checks in Server Actions, and (3) PostgreSQL Row-Level Security (RLS) for sensitive user data. Extract enforceable rules for handling "Forbidden" interrupts using the `forbidden()` function.

**Intent:** (Feature C6/C10) Ensure that even if the application layer is bypassed, the database layer prevents unauthorized data access.

#### 3. Administrative Accountability & Audit Policy

**Internal Doc Path:** `/docs/official-docs/EPIC-C/rbac-audit-policy.md`

**Prompt:** Compile the RBAC Audit & Accountability Policy for path `/docs/official-docs/EPIC-C/rbac-audit-policy.md`. Define the mandatory fields for the `AuditLog` table whenever a role or permission is modified: `operator_id` (the admin who made the change), `target_user_id`, `action_type`, `timestamp`, and `justification_reason`. Enforce a rule that these logs must be immutable and stored in a dedicated schema.

**Intent:** (Feature C13) Meet compliance requirements (SOC2/GDPR) by maintaining a permanent trail of who granted administrative power to whom.

#### 4. Role Escalation & Auth Assurance (ACR) Integration

**Internal Doc Path:** `/docs/official-docs/EPIC-C/role-escalation-policy.md`

**Prompt:** Compile the Role Escalation Policy for path `/docs/official-docs/EPIC-C/role-escalation-policy.md`. Define the link between RBAC and OIDC Authentication Context Class References (ACR). Enforce the rule that sensitive roles (e.g., `SUPER_ADMIN`) REQUIRE an `acr` value indicating multi-factor authentication (MFA) was performed. Define the UI behavior for prompting "Step-up Authentication" when a user attempts a high-privilege operation.

**Intent:** (Feature C6) Protect the system's most sensitive operations by requiring higher confidence in the user's identity at the point of action.

---

### Next Step

With the **Identity (OIDC/OAuth)**, **Protocol (MCP/OpenAPI)**, **Runtime (NextAuth)**, and **Authorization (RBAC)** layers all codified, the **EPIC-C Security Architecture** is now complete.

Would you like me to generate the **Prisma Schema** that implements these specific `AuthIdentity`, `Role`, and `AuditLog` requirements?
Here are the documentation requirements and the specific **INTERNAL ENGINEERING POLICY COMPILER** prompts for **Session & Cookie Standards**.

This section codifies the "Hardened Browser State" requirements, ensuring that session persistence is decoupled from the frontend's reach and that tokens are managed with high-entropy rotation and immediate revocation capabilities.

### 🏗️ Session & Cookie Documentation Registry (EPIC-C)

| Technology                | Official Link (Binding)                                                                                 | Intent for EPIC-C                                                                |
| ------------------------- | ------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| **HTTP State Management** | [RFC 6265](https://datatracker.ietf.org/doc/html/rfc6265)                                               | **C5/C10**: Authoritative standard for cookie attributes and transport security. |
| **OWASP Session Mgmt**    | [OWASP Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html) | **C5**: Best practices for session ID generation, rotation, and lifecycle.       |
| **SameSite Cookies**      | [RFC 6265bis](https://datatracker.ietf.org/doc/html/draft-ietf-httpbis-rfc6265bis)                      | **C10**: Modern guardrails for preventing CSRF via browser-level enforcement.    |
| **JWT Best Practices**    | [RFC 8725](https://datatracker.ietf.org/doc/html/rfc8725)                                               | **C3**: Standardizes the secure use of JSON Web Tokens for stateless sessions.   |

---

### 📋 Prompts for Policy Compilation

Use these prompts with your **ENGINEERING POLICY COMPILER** to generate the internal authoritative docs.

#### 1. Hardened Cookie Attribute Policy

**Internal Doc Path:** `/docs/official-docs/EPIC-C/hardened-cookie-policy.md`

**Prompt:** Compile the Hardened Cookie Attribute Policy for path `/docs/official-docs/EPIC-C/hardened-cookie-policy.md`. Extract enforceable rules from RFC 6265 regarding mandatory `HttpOnly`, `Secure`, and `SameSite` attributes. Define the project-specific mandate: `HttpOnly` MUST be true for all session-bearing cookies to prevent XSS-based token theft, and `SameSite` MUST be `Lax` by default, or `Strict` for administrative routes.

**Intent:** (Feature C10) Ensure that the browser's native security features are utilized to their maximum extent to protect session integrity.

#### 2. Session Lifecycle & Token Rotation Policy

**Internal Doc Path:** `/docs/official-docs/EPIC-C/session-lifecycle-policy.md`

**Prompt:** Compile the Session Lifecycle & Rotation Policy for path `/docs/official-docs/EPIC-C/session-lifecycle-policy.md`. Define the mandatory "Sliding Window" expiry for sessions (e.g., 30 minutes idle timeout). Enforce a rule from the OWASP Session Management guide regarding "Absolute Timeout" (e.g., 24 hours max session age). Define the requirement for Refresh Token Rotation, where every refresh event invalidates the previous token and issues a new one.

**Intent:** (Feature C3/C5) Limit the "window of opportunity" for an attacker using a hijacked session or token.

#### 3. CSRF Defense-in-Depth Policy

**Internal Doc Path:** `/docs/official-docs/EPIC-C/csrf-protection-policy.md`

**Prompt:** Compile the CSRF Defense-in-Depth Policy for path `/docs/official-docs/EPIC-C/csrf-protection-policy.md`. Define the multi-layered defense strategy: (1) `SameSite` cookie enforcement, (2) Double-submit cookie pattern for Next.js Server Actions, and (3) Custom header verification (`X-Requested-With`) for API routes. Extract rules for handling state-changing POST/PUT/DELETE requests when relying on cookie-based authentication.

**Intent:** (Feature C10) Provide redundant protection against session injection and forged cross-site requests.

#### 4. Server-Side Revocation & Blacklist Policy

**Internal Doc Path:** `/docs/official-docs/EPIC-C/session-revocation-policy.md`

**Prompt:** Compile the Session Revocation & Blacklist Policy for path `/docs/official-docs/EPIC-C/session-revocation-policy.md`. Define the workflow for immediate session invalidation (e.g., user logout or password change). Enforce a rule that although JWTs are used, a "Revocation List" or "JTI (JWT ID)" check MUST be performed against the PostgreSQL database for every sensitive operation. Define the requirement for audit logging every revocation event.

**Intent:** (Feature C5/C13) Overcome the "Stateless JWT" limitation by providing a mechanism to kill compromised sessions instantly.

---

### Next Step

The **EPIC-C Technical Source of Truth** is now fully mapped across Identity (OIDC/OAuth), Protocols (MCP/OpenAPI), Runtime (NextAuth), Authorization (RBAC), and Session Security.

Would you like me to create the **Vault Configuration Script** (Terraform/HCL) to initialize the transit keys and audit devices needed to support these session and provider secret policies?
Here are the documentation requirements and the specific **INTERNAL ENGINEERING POLICY COMPILER** prompts for **OpenID Connect (OIDC) Core 1.0**.

Based on the official OIDC specifications (incorporating Errata Set 2, Dec 2023), we are pinning these requirements to the current stable identity layer to enable interoperable profile information and secure ID Token handling across the EPIC-C and EPIC-D architectures.

### 🏗️ OpenID Connect Documentation Registry (EPIC-C/D)

| Technology            | Official Link (Binding)                                                                                                         | Intent for EPIC-C/D                                                                           |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| **OIDC Core 1.0**     | [openid.net/specs/openid-connect-core-1_0](https://openid.net/specs/openid-connect-core-1_0.html)                               | **C3/C4**: Authoritative spec for the identity layer, ID Token structure, and profile Claims. |
| **ID Token (JWT)**    | [OIDC Core Section 2](https://www.google.com/search?q=https://openid.net/specs/openid-connect-core-1_0.html%23IDToken)          | **C2/D9**: Standardizes the security token containing claims about the authentication event.  |
| **UserInfo Endpoint** | [OIDC Core Section 5.3](https://www.google.com/search?q=https://openid.net/specs/openid-connect-core-1_0.html%23UserInfo)       | **C4/C13**: Defines the protocol for retrieving authorized profile information (PII).         |
| **Standard Claims**   | [OIDC Core Section 5.1](https://www.google.com/search?q=https://openid.net/specs/openid-connect-core-1_0.html%23StandardClaims) | **C2/C4**: Establishes canonical names for profile data like `sub`, `email`, and `name`.      |

---

### 📋 Prompts for Policy Compilation

Use these prompts with your **ENGINEERING POLICY COMPILER** to generate the internal authoritative docs.

#### 1. ID Token Validation & Security Policy

**Internal Doc Path:** `/docs/official-docs/authentication/openid-connect-validation.md`

**Prompt:** Compile the OIDC ID Token Validation Policy for path `/docs/official-docs/authentication/openid-connect-validation.md`. Extract enforceable rules from Section 3.1.3.7 regarding mandatory `iss` (issuer) and `aud` (audience) matching. Define the requirement for the `nonce` claim check to mitigate replay attacks and the mandatory `exp` (expiration) and clock skew validation.

**Intent:** (Feature C3) Establish a high-security boundary for incoming identity tokens, ensuring the application only accepts authentic, non-expired tokens from registered providers.

#### 2. Standardized Identity & Claim Mapping Policy

**Internal Doc Path:** `/docs/official-docs/EPIC-C/identity-mapping-policy.md`

**Prompt:** Compile the Identity Claim Mapping Policy for path `/docs/official-docs/EPIC-C/identity-mapping-policy.md`. Extract enforceable rules from Section 5.7 regarding the stability and uniqueness of the `sub` (subject) and `iss` (issuer) claims. Define how these standard claims map to the PostgreSQL User/AuthIdentity table fields to prevent identity collisions.

**Intent:** (Feature C2/C4) Ensure the project uses OIDC-compliant identifiers as the primary keys for user records, preventing unstable "username-based" record tracking.

#### 3. UserInfo Endpoint & Privacy Guardrails

**Internal Doc Path:** `/docs/official-docs/EPIC-C/userinfo-access-policy.md`

**Prompt:** Compile the UserInfo Endpoint & Privacy Policy for path `/docs/official-docs/EPIC-C/userinfo-access-policy.md`. Extract rules from Section 5.3 regarding the use of Bearer tokens to retrieve profile data. Define the project-specific policy for verifying that the `sub` in the UserInfo response exactly matches the `sub` in the original ID Token to prevent token substitution attacks.

**Intent:** (Feature C4) Standardize the retrieval of secondary profile data (e.g., avatar, locale) while enforcing OIDC-mandated privacy checks.

#### 4. Auth Context & Quality of Assurance (ACR) Policy

**Internal Doc Path:** `/docs/official-docs/EPIC-C/auth-assurance-policy.md`

**Prompt:** Compile the Authentication Assurance & ACR Policy for path `/docs/official-docs/EPIC-C/auth-assurance-policy.md`. Extract definitions for `acr` (Authentication Context Class Reference) and `amr` (Authentication Methods References) from Section 2. Define which `acr_values` are required for administrative role escalation or sensitive lesson access (e.g., requiring MFA).

**Intent:** (Feature C6/D9) Bridge the gap between OIDC identity and internal RBAC, allowing the application to demand higher levels of authentication assurance for sensitive operations.

---

### Next Step

With the full suite of **Identity**, **Authorization**, **API**, and **Agent** protocols now mapped as the **Technical Source of Truth**, the architecture is ready for code generation.

Would you like me to begin by drafting the **Prisma Schema** models for `User`, `AuthIdentity`, and `AuthSession` that strictly implement these OIDC and RBAC policies?
Here are the documentation requirements and the specific **INTERNAL ENGINEERING POLICY COMPILER** prompts for **Reproducible Builds & Deterministic CI/CD**.

This section codifies the "Snapshot Integrity" requirements, ensuring that every build artifact generated by the pipeline is deterministic, verifiable, and contains an immutable record of the toolchain and environment used to produce it.

### 🏗️ Reproducible Builds Documentation Registry (EPIC-G)

| Technology              | Official Link (Binding)                                                             | Intent for EPIC-G                                                           |
| ----------------------- | ----------------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| **Reproducible Builds** | [reproducible-builds.org](https://reproducible-builds.org/)                         | **G9**: Authoritative standard for ensuring binary/artifact determinism.    |
| **SLSA Framework**      | [slsa.dev](https://slsa.dev/)                                                       | **G9/C13**: Standardizes supply-chain levels and build provenance metadata. |
| **PNPM Lockfile**       | [pnpm.io](https://www.google.com/search?q=https://pnpm.io/npmrc%23shamefully-hoist) | **C1/G**: Enforces strict, deterministic dependency resolution.             |
| **Nix/Docker Pinning**  | [OCI Image Spec](https://github.com/opencontainers/image-spec)                      | **G**: Ensures the build environment (compilers/OS) is immutable.           |

---

### 📋 Prompts for Policy Compilation

Use these prompts with your **ENGINEERING POLICY COMPILER** to generate the internal authoritative docs.

#### 1. Toolchain Pinning & Build Manifest Policy

**Internal Doc Path:** `/docs/official-docs/EPIC-G/toolchain-pinning-policy.md`

**Prompt:** Compile the Toolchain Pinning & Build Manifest Policy for path `/docs/official-docs/EPIC-G/toolchain-pinning-policy.md`. Define the mandatory version locking for Node.js, pnpm, Turborepo, and all compilers. Extract enforceable rules for the creation of a `build-manifest.json` that must accompany every artifact, recording the exact versions and commit hashes of the entire toolset.

**Intent:** (Feature G9) Eliminate "it works on my machine" inconsistencies and ensure that a build can be re-run years later with identical results.

#### 2. Environment Determinism & Provenance Policy

**Internal Doc Path:** `/docs/official-docs/EPIC-G/build-provenance-policy.md`

**Prompt:** Compile the Build Provenance & Determinism Policy for path `/docs/official-docs/EPIC-G/build-provenance-policy.md`. Extract rules for capturing the "Build Seed" and mandatory environment variables. Define the requirement for SLSA-compliant provenance metadata, ensuring that timestamps, file ordering, and compression flags are normalized to prevent non-deterministic output hashes.

**Intent:** (Feature G9) Provide an immutable audit trail that links a specific artifact hash directly to its source code and build environment.

#### 3. Reproducibility Acceptance Testing (RAT) Standard

**Internal Doc Path:** `/docs/official-docs/EPIC-G/reproducibility-verification-standard.md`

**Prompt:** Compile the Reproducibility Verification Standard for path `/docs/official-docs/EPIC-G/reproducibility-verification-standard.md`. Define the CI workflow for the "RAT" (Reproducibility Acceptance Test): Two independent runners must produce the same artifact from the same manifest, and the resulting `sha256` content hashes MUST be identical. Enforce a rule that any mismatch fails the "Snapshot Build Trigger."

**Intent:** (Feature G9) Mechanically guarantee the integrity of the build system through continuous verification.

#### 4. Snapshot Integrity & Artifact Signing Policy

**Internal Doc Path:** `/docs/official-docs/EPIC-G/artifact-signing-policy.md`

**Prompt:** Compile the Artifact Signing & Integrity Policy for path `/docs/official-docs/EPIC-G/artifact-signing-policy.md`. Define the logic for signing the `content_hash` using a JWS signature field. Enforce a rule that the private signing key must reside in a protected HashiCorp Vault path and is only accessible to the CI runner upon successful completion of reproducibility checks.

**Intent:** (Feature C13/G9) Ensure that only verified, deterministic snapshots are cryptographically signed and released for preview or deployment.

---

### Next Step

With the **Build & Reproducibility** layer now mapped, the **EPIC-G Snapshot Pipeline** has its legal and technical foundation.

Would you like me to generate the **GitHub Actions Workflow** or the **build-manifest.json schema** that implements these deterministic build and SLSA-compliant provenance requirements?
Here are the documentation requirements and the specific **INTERNAL ENGINEERING POLICY COMPILER** prompts for **AWS CloudFront**.

Based on the project's edge delivery strategy, we are pinning these requirements to the CDN layer to ensure global low-latency lesson delivery, secure origin isolation, and deterministic caching for immutable build artifacts.

### 🏗️ AWS CloudFront Documentation Registry (EPIC-G/J)

| Technology               | Official Link (Binding)                                                                                                                      | Intent for EPIC-G/J                                                                            |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| **CloudFront Caching**   | [CF Cache Policies](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/using-managed-cache-policies.html)                    | **G/J**: Defines the logic for long-lived immutable assets vs. ephemeral previews.             |
| **Origin Access (OAC)**  | [CF Origin Access Control](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/private-content-restricting-access-to-s3.html) | **G**: Standardizes the "Virtual Perimeter" ensuring S3 buckets are not publicly accessible.   |
| **CloudFront Functions** | [CF Edge Logic](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/cloudfront-functions.html)                                | **G**: Implements lightweight header manipulation (CSP, Security Headers) at the edge.         |
| **Signed URLs/Cookies**  | [CF Private Content](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/PrivateContent.html)                                 | **J**: Authoritative spec for gating lesson content via time-limited cryptographic signatures. |

---

### 📋 Prompts for Policy Compilation

Use these prompts with your **ENGINEERING POLICY COMPILER** to generate the internal authoritative docs.

#### 1. Immutable Artifact Caching & TTL Policy

**Internal Doc Path:** `/docs/official-docs/CDN/immutable-caching-policy.md`

**Prompt:** Compile the Immutable Artifact Caching Policy for path `/docs/official-docs/CDN/immutable-caching-policy.md`. Define the requirement that any file containing a content-hash in its filename (from EPIC-G snapshots) MUST be cached at the edge for 1 year (`Cache-Control: public, max-age=31536000, immutable`). Extract enforceable rules for the use of the "Managed-CachingOptimized" policy for these assets.

**Intent:** (Feature G) Maximize edge hit ratios and reduce origin load for stable, versioned build outputs.

#### 2. Edge Security & Header Injection Policy

**Internal Doc Path:** `/docs/official-docs/EPIC-G/edge-security-headers.md`

**Prompt:** Compile the Edge Security Header Policy for path `/docs/official-docs/EPIC-G/edge-security-headers.md`. Define the project mandate for CloudFront Functions to inject `X-Robots-Tag: noindex` on all preview subdomains. Extract requirements for edge-level `Content-Security-Policy` (CSP) and `Strict-Transport-Security` (HSTS) enforcement to ensure the application environment remains secure before reaching the user.

**Intent:** (Feature G) Prevent ephemeral preview environments from being indexed by search engines and ensure transport security is enforced globally.

#### 3. Origin Access Control (OAC) Isolation Policy

**Internal Doc Path:** `/docs/official-docs/infrastructure/origin-isolation-policy.md`

**Prompt:** Compile the Origin Access Isolation Policy for path `/docs/official-docs/infrastructure/origin-isolation-policy.md`. Define the mandatory use of Origin Access Control (OAC) for all S3 origins. Enforce a rule that origin buckets MUST NOT have public access enabled; all traffic MUST be signed and verified by CloudFront. Define the Terraform requirement for restrictive Bucket Policies that only allow the CloudFront Service Principal.

**Intent:** (Feature G) Eliminate "S3 Leaks" and ensure all content delivery passes through the CDN's security and caching logic.

#### 4. Gated Lesson Content & Signed URL Standard

**Internal Doc Path:** `/docs/official-docs/EPIC-J/lesson-access-signing.md`

**Prompt:** Compile the Lesson Access Signing Standard for path `/docs/official-docs/EPIC-J/lesson-access-signing.md`. Define the integration between the Next.js backend and CloudFront Key Groups. Enforce a rule that "Locked" lesson assets (EPIC-J) MUST require a Signed URL with a TTL not exceeding 2 hours. Extract enforceable logic for checking the OIDC `sub` and `entitlement` claims before generating the CloudFront signature.

**Intent:** (Feature J) Protect intellectual property by ensuring premium lesson content cannot be shared via static links.

---

### Next Step

With the **CDN & Edge** layer now mapped, the **Global Delivery Framework** for **EPIC-G/J** is complete.

Would you like me to generate the **CloudFront Function code** (JavaScript) for the header injection policy or the **Terraform HCL** to provision the CloudFront Distribution with these OAC and Caching rules?
Here are the documentation requirements and the specific **INTERNAL ENGINEERING POLICY COMPILER** prompts for **GitHub Actions**.

Based on the project's automation strategy, we are pinning these requirements to the CI/CD and integration layer to ensure deterministic verification of lab environments, secure handling of ephemeral GitHub App tokens, and least-privilege execution of automated workflows.

### 🏗️ GitHub Actions Documentation Registry (EPIC-E/F)

| Technology              | Official Link (Binding)                                                                                             | Intent for EPIC-E/F                                                                               |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| **GitHub Actions Spec** | [Workflow Syntax](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions)            | **E/F**: Authoritative syntax for lab verification and webhook-driven orchestration.              |
| **Reusable Workflows**  | [workflow_call Spec](https://docs.github.com/en/actions/using-workflows/reusing-workflows)                          | **E**: Standardizes the `verify-lab` template for consistent testing across all lab repositories. |
| **Security Hardening**  | [Security Best Practices](https://docs.github.com/en/actions/security-guides/security-hardening-for-github-actions) | **F**: Defines the "Least Privilege" mandate for `GITHUB_TOKEN` and runner environments.          |
| **Vault Integration**   | [Vault GitHub Auth](https://developer.hashicorp.com/vault/docs/auth/github)                                         | **F**: Defines the mechanism for workflows to exchange OIDC JWTs for ephemeral Vault secrets.     |

---

### 📋 Prompts for Policy Compilation

Use these prompts with your **ENGINEERING POLICY COMPILER** to generate the internal authoritative docs.

#### 1. Deterministic Lab Verification Policy

**Internal Doc Path:** `/docs/official-docs/CI-CD/lab-verification-policy.md`

**Prompt:** Compile the Lab Verification Policy for path `/docs/official-docs/CI-CD/lab-verification-policy.md`. Define the mandatory use of the reusable `verify-lab` template for all lab repositories. Extract enforceable rules regarding the input contract (`lab-package`, `sha`) and the requirement for workflows to produce a standardized `verification-report.json` artifact. Enforce pinning of all third-party actions to specific SHAs rather than tags.

**Intent:** (Feature E) Ensure that every lab version is verified against a canonical, tamper-proof set of tests before being snapshotted.

#### 2. Least-Privilege Workflow Permissions Policy

**Internal Doc Path:** `/docs/official-docs/EPIC-F/workflow-permissions-policy.md`

**Prompt:** Compile the Workflow Permissions Policy for path `/docs/official-docs/EPIC-F/workflow-permissions-policy.md`. Define the project mandate that all workflows MUST explicitly declare the `permissions` object. Enforce a "Default Deny" stance: workflows should have `contents: read` by default and only escalate to `checks: write` or `packages: write` where strictly necessary. Prohibit the use of broad `repo` scope tokens in CI runners.

**Intent:** (Feature F) Minimize the impact of a potential runner compromise by limiting the scope of the ephemeral `GITHUB_TOKEN`.

#### 3. Webhook Replay & Reprocessing Standard

**Internal Doc Path:** `/docs/official-docs/EPIC-F/webhook-processing-standard.md`

**Prompt:** Compile the Webhook Processing & Replay Standard for path `/docs/official-docs/EPIC-F/webhook-processing-standard.md`. Define the manual trigger requirements (`workflow_dispatch`) for replaying failed webhook deliveries in staging. Extract enforceable rules for idempotent handling: automation workflows must check for existing `AuthIdentity` or `LabVersion` records before initiating destructive operations to prevent duplicate state corruption.

**Intent:** (Feature F/C13) Provide a safe, auditable environment for debugging and recovering from integration failures.

#### 4. OIDC-Based Vault Authentication Policy

**Internal Doc Path:** `/docs/official-docs/EPIC-F/vault-oidc-auth-policy.md`

**Prompt:** Compile the GitHub Actions OIDC-to-Vault Authentication Policy for path `/docs/official-docs/EPIC-F/vault-oidc-auth-policy.md`. Define the configuration for the GitHub OIDC provider in Vault. Enforce a rule that workflows requiring sensitive credentials (e.g., GitHub App Private Keys) MUST use the `hashicorp/vault-action` to authenticate via an OIDC JWT, ensuring that no long-lived secrets are stored in GitHub Repository Secrets.

**Intent:** (Feature F/C5) Transition to a "Zero Secret" CI environment where all sensitive material is fetched just-in-time from Vault based on verifiable runner identity.

---

### Next Step

With the **CI/CD & Automation** layer now codified, the **EPIC-E/F Integration Loop** is fully secured.

Would you like me to generate the **YAML definition for the reusable `verify-lab.yml` workflow** or the **Terraform HCL** for configuring the Vault OIDC role that allows these runners to fetch their ephemeral tokens?
Here are the documentation requirements and the specific **INTERNAL ENGINEERING POLICY COMPILER** prompts for **Gemini 3 DeepThink**.

Based on the project's ingestion and intelligence strategy, we are pinning these requirements to the "Large-Context Read" layer to ensure secure long-form document understanding, cost-efficient context management, and strict data residency compliance for external LLM processing.

### 🏗️ Gemini 3 DeepThink Documentation Registry (EPIC-D/E)

| Technology             | Official Link (Binding)                                                                                          | Intent for EPIC-D/E                                                               |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| **Gemini 3 DeepThink** | [Google AI Documentation](https://ai.google.dev/gemini-api/docs)                                                 | **D3/D4**: Authoritative model for 2M+ context ingestion and summarization.       |
| **Data Sanitization**  | [OWASP LLM Security](https://www.google.com/search?q=https://owasp.org/www-project-top-10-for-llm-applications/) | **E**: Defines the "Sanitizer Step" to redact PII before sending data to GCP.     |
| **Context Strategy**   | Internal Decision Log                                                                                            | **D/E**: Standardizes the tradeoff between RAG (chunking) vs. Long-Context reads. |
| **Explainability**     | NIST AI 100-1                                                                                                    | **E**: Standardizes the recording of metadata for AI-assisted diagnostic tasks.   |

---

### 📋 Prompts for Policy Compilation

Use these prompts with your **ENGINEERING POLICY COMPILER** to generate the internal authoritative docs.

#### 1. Long-Context Ingestion & Summarization Policy

**Internal Doc Path:** `/docs/official-docs/ai/knowledge-ingestion.md`

**Prompt:** Compile the AI Knowledge Ingestion Policy for path `/docs/official-docs/ai/knowledge-ingestion.md`. Define the mandatory use of Gemini 3 DeepThink for ingest-time summarization of documents exceeding 500k tokens. Extract enforceable rules regarding the recording of model versions and specific context window usage for every ingestion event to ensure summarization consistency.

**Intent:** (Feature D3) Standardize how the system handles massive lab datasets, ensuring that "DeepThink" reads are used only when necessary for global document understanding.

#### 2. Model Read Sanitization & Privacy Policy

**Internal Doc Path:** `/docs/official-docs/EPIC-E/ai-sanitization-policy.md`

**Prompt:** Compile the External AI Sanitization Policy for path `/docs/official-docs/EPIC-E/ai-sanitization-policy.md`. Define the "Sanitizer Step" mandate: all lab artifacts or user content MUST pass through a local validation service to redact forbidden fields (PII, secrets, internal IPs) before transmission to external GCP APIs. Enforce a rule that sensitive or high-privacy documents must fallback to local embedding + retrieval (RAG) rather than long-context external reads.

**Intent:** (Feature E) Protect internal data and user privacy by establishing a hard cryptographic and logic-based boundary before data leaves the VPC.

#### 3. Context Optimization & Cost Control Policy

**Internal Doc Path:** `/docs/official-docs/EPIC-D/context-strategy.md`

**Prompt:** Compile the AI Context Optimization Strategy for path `/docs/official-docs/EPIC-D/context-strategy.md`. Define the project-specific logic for choosing between "Direct Long-Context" vs. "Chunked RAG." Enforce a rule that developers must document cost/latency tradeoffs for any read-flow that utilizes more than 1M tokens in a single request. Define the caching strategy for model outputs to prevent redundant external API calls.

**Intent:** (Feature D4) Ensure the AI architecture remains economically viable and performant during high-concurrency lesson generation.

#### 4. AI Traceability & Explainability Policy

**Internal Doc Path:** `/docs/official-docs/EPIC-E/ai-traceability-policy.md`

**Prompt:** Compile the AI Traceability & Metadata Policy for path `/docs/official-docs/EPIC-E/ai-traceability-policy.md`. Define the requirement to store "Explainability Metadata" in the PostgreSQL `AuditLog` for every read-time diagnostic or summary. This must include: the model SHA/version, the exact prompt template used, and the token count of the context window. Enforce a rule that these logs must be used by the `verification-agent` to audit the accuracy of generated summaries.

**Intent:** (Feature E/C13) Provide an immutable audit trail for AI-driven decisions, facilitating debugging and compliance during the lab creation process.

---

### Next Step

With the **Large-Context Read** layer now mapped, the **EPIC-D/E Ingestion Engine** is fully codified.

Would you like me to generate the **TypeScript interface for the "Sanitizer Step"** or the **OpenAPI fragment** that defines how these AI summaries are delivered to the serving layer?
Here are the documentation requirements and the specific **INTERNAL ENGINEERING POLICY COMPILER** prompts for **Azure OpenAI (o3)**.

Based on the project's synthesis and generation strategy, we are pinning these requirements to the "Cloud AI (Write)" layer to ensure deterministic content generation, strict output schema enforcement, and cryptographic traceability for AI-generated artifacts.

### 🏗️ Azure OpenAI (o3) Documentation Registry (EPIC-D/E)

| Technology            | Official Link (Binding)                                                                                                                         | Intent for EPIC-D/E                                                                      |
| --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| **Azure OpenAI o3**   | [Azure OpenAI Service Docs](https://learn.microsoft.com/en-us/azure/ai-services/openai/)                                                        | **D5/D6**: Authoritative model for lesson generation and instruction synthesis.          |
| **Output Schema**     | [JSON Schema (2020-12)](https://json-schema.org/specification)                                                                                  | **E**: Defines the strict structure for AI-generated lab configs and tests.              |
| **Safety Guardrails** | [Content Filtering Docs](https://www.google.com/search?q=https://learn.microsoft.com/en-us/azure/ai-services/openai/concepts/content-filtering) | **D/E**: Standardizes the blocking of harmful or non-compliant output generation.        |
| **Explainability**    | NIST AI 100-1                                                                                                                                   | **E/C13**: Standardizes metadata for tracing AI-generated code back to specific prompts. |

---

### 📋 Prompts for Policy Compilation

Use these prompts with your **ENGINEERING POLICY COMPILER** to generate the internal authoritative docs.

#### 1. Model Versioning & API Stability Policy

**Internal Doc Path:** `/docs/official-docs/ai/generation-version-control.md`

**Prompt:** Compile the AI Model Versioning Policy for path `/docs/official-docs/ai/generation-version-control.md`. Define the mandatory pinning of model names (e.g., `o3-deep-research`) and specific API versions. Extract enforceable rules for recording token limits and temperature settings for every generation job. Enforce a rule that no unpinned "latest" models can be used in the production synthesis pipeline.

**Intent:** (Feature D5) Ensure that the generation of lessons and lab instructions remains consistent and predictable across different deployment cycles.

#### 2. Deterministic JSON Schema Enforcement Policy

**Internal Doc Path:** `/docs/official-docs/EPIC-E/ai-schema-enforcement.md`

**Prompt:** Compile the AI Output Schema Enforcement Policy for path `/docs/official-docs/EPIC-E/ai-schema-enforcement.md`. Define the mandate that all Azure OpenAI responses MUST be validated against the project's canonical JSON Schema (2020-12) before being written to the VFS. Extract enforceable rules for handling validation failures: the system MUST fail the generation task and trigger a re-try or human interrupt if the output shape is non-compliant.

**Intent:** (Feature E) Guarantee that AI-generated `forgea.config.json` and Playwright tests are structurally valid and safe for automated execution.

#### 3. Hallucination Prevention & Prompt Guardrails

**Internal Doc Path:** `/docs/official-docs/EPIC-D/hallucination-prevention.md`

**Prompt:** Compile the Hallucination Prevention & Guardrail Policy for path `/docs/official-docs/EPIC-D/hallucination-prevention.md`. Define the mandatory structure for "System Prompts" to include negative constraints (e.g., "Do not invent libraries not found in the manifest"). Enforce the use of Azure Content Filtering to block non-technical or non-compliant outputs. Define the human-in-the-loop review workflow for high-risk generation tasks.

**Intent:** (Feature D6) Maintain high quality and technical accuracy in lesson content by restricting the creative range of the LLM.

#### 4. AI Traceability & Run Metadata Policy

**Internal Doc Path:** `/docs/official-docs/EPIC-E/generation-traceability.md`

**Prompt:** Compile the AI Generation Traceability Policy for path `/docs/official-docs/EPIC-E/generation-traceability.md`. Define the requirement to store "Generation Artifacts" in the PostgreSQL `AuditLog`. This MUST include: the `run_id`, the full prompt template, the model version, and the raw JSON response. Enforce a rule that every AI-generated file in the VFS must contain a hidden metadata comment referencing its specific `run_id` for compliance audits.

**Intent:** (Feature E/C13) Provide a permanent, searchable link between the final lab content and the AI process that created it, satisfying SOC2/GDPR audit requirements.

---

### Next Step

With the **Cloud AI (Write)** layer now mapped, the **EPIC-D/E Synthesis Loop** is complete.

Would you like me to generate the **Zod schema for the Generation Metadata** or the **Next.js Server Action** that coordinates the Azure OpenAI call with the local "Sanitizer Step" and JSON Schema validation?
Here are the documentation requirements and the specific **INTERNAL ENGINEERING POLICY COMPILER** prompts for **Compliance, Audit Infrastructure, and Logging Standards**.

Based on the project's hardening strategy, we are pinning these requirements to the **EPIC-B (Database Core & Hardening)** layer to ensure that every system action is recorded in a tamper-evident, standardized, and privacy-compliant manner.

### 🏗️ Compliance & Audit Documentation Registry (EPIC-B)

| Technology         | Official Link (Binding)                                                                                   | Intent for EPIC-B                                                                           |
| ------------------ | --------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| **NIST SP 800-92** | [Log Management](https://csrc.nist.gov/publications/detail/sp/800-92/final)                               | **B12**: Authoritative baseline for log collection, transport, and secure storage.          |
| **Elastic ECS**    | [ECS Reference](https://www.elastic.co/guide/en/ecs/current/index.html)                                   | **B12**: Standardizes event fields (`user.id`, `db.statement`) for cross-epic auditability. |
| **SOC 2 / AICPA**  | [Trust Services Criteria](https://www.aicpa-cima.com/)                                                    | **B12**: Defines logical access and change management controls for audit readiness.         |
| **PCI-DSS v4.0**   | [PCI Security Standards](https://www.pcisecuritystandards.org/)                                           | **B10/B12**: Mandates scope minimization and secure handling of billing metadata.           |
| **OWASP Logging**  | [Logging Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html) | **B9/B12**: Directs the redaction of PII/secrets from all automated logging streams.        |

---

### 📋 Prompts for Policy Compilation

Use these prompts with your **ENGINEERING POLICY COMPILER** to generate the internal authoritative docs.

#### 1. Tamper-Evident Audit Infrastructure Policy

**Internal Doc Path:** `/docs/official-docs/EPIC-B/audit-infrastructure-policy.md`

**Prompt:** Compile the Audit Infrastructure & Integrity Policy for path `/docs/official-docs/EPIC-B/audit-infrastructure-policy.md`. Extract enforceable rules from NIST SP 800-92 regarding secure log transport and encryption at rest. Define the requirement for B11 "Immutability": audit logs MUST be written to a write-once repository or a restricted-index cluster that prevents modification of historical records.

**Intent:** (Feature B11/B12) Ensure a forensic-grade audit trail that satisfies SOC 2 Type II requirements for logical access monitoring.

#### 2. Standardized ECS Event Schema Policy

**Internal Doc Path:** `/docs/official-docs/EPIC-B/event-schema-policy.md`

**Prompt:** Compile the ECS Event Schema Policy for path `/docs/official-docs/EPIC-B/event-schema-policy.md`. Using `elastic-ecs.md` and `ecs-examples.md`, define mandatory field mappings for all database events: `event.action` (e.g., `ddl`, `query`), `user.id` (OIDC sub), and `db.statement`. Enforce a rule that all JSON-log outputs from the Next.js and Prisma layers MUST validate against this schema before ingestion into the observability pipeline.

**Intent:** (Feature B12) Enable deterministic search and correlation across different system components (App, DB, Infrastructure).

#### 3. PII Redaction & Logging Privacy Guardrails

**Internal Doc Path:** `/docs/official-docs/EPIC-B/logging-privacy-policy.md`

**Prompt:** Compile the Logging Privacy & Redaction Policy for path `/docs/official-docs/EPIC-B/logging-privacy-policy.md`. Extract rules from the OWASP Logging Cheat Sheet and GDPR mandates regarding data minimization. Define a "Forbidden Fields" list (e.g., `password`, `cvc`, `raw_token`) that MUST be redacted at the source. Enforce the use of a `sanitizer-logger` middleware in the Next.js API routes to prevent accidental leakage of PII into ELK/Opensearch.

**Intent:** (Feature B9/GDPR) Protect user privacy and maintain regulatory compliance by ensuring sensitive data never reaches the persistent log layer.

#### 4. Billing Security & PCI Scope Minimization Policy

**Internal Doc Path:** `/docs/official-docs/EPIC-B/billing-security-policy.md`

**Prompt:** Compile the Billing Security & PCI-DSS Policy for path `/docs/official-docs/EPIC-B/billing-security-policy.md`. Define the project's "Out-of-Scope" strategy: NO Primary Account Numbers (PAN) or sensitive authentication data may touch the application database. Mandate the use of Stripe-hosted fields/elements. Extract enforceable rules for webhook validation (HMAC-SHA256) and idempotent processing of `invoice.paid` events to ensure billing record accuracy.

**Intent:** (Feature B10) Minimize the application's PCI-DSS audit surface while ensuring robust financial transaction integrity.

---

### Next Step

With the **Compliance and Audit** framework now mapped, the **EPIC-B Hardening Loop** is complete.

Would you like me to generate the **Prisma model for the `AuditLog` table** that incorporates the ECS field requirements, or the **Terraform script** for the S3 bucket policy that enforces the NIST-mandated log immutability?
Here are the documentation requirements and the specific **INTERNAL ENGINEERING POLICY COMPILER** prompts for **AWS ECS Fargate**.

Based on the project's compute strategy, we are pinning these requirements to the **EPIC-H (Lab Execution Runtime)** layer to ensure that student lab environments are isolated, resource-constrained for cost optimization, and cryptographically tied to the audit infrastructure.

### 🏗️ AWS ECS Fargate Documentation Registry (EPIC-H)

| Technology            | Official Link (Binding)                                                                                                                      | Intent for EPIC-H                                                                 |
| --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| **ECS Fargate**       | [AWS Fargate Docs](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/AWS_Fargate.html)                                             | **H**: Authoritative serverless compute for ephemeral, isolated lab sandboxes.    |
| **Task Definitions**  | [ECS Task Defs](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task_definitions.html)                                           | **H**: Standardizes immutable container configurations and sidecar injection.     |
| **Seccomp Hardening** | [ECS Security Profiles](https://www.google.com/search?q=https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task-ready-proxies.html) | **H**: Implements restricted syscall filtering to prevent sandbox escapes.        |
| **Resource Limits**   | [Fargate Task Sizes](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task-cpu-memory-error.html)                                 | **H**: Defines credit-optimized CPU/Memory caps to prevent runaway compute costs. |

---

### 📋 Prompts for Policy Compilation

Use these prompts with your **ENGINEERING POLICY COMPILER** to generate the internal authoritative docs.

#### 1. Sandbox Isolation & Seccomp Hardening Policy

**Internal Doc Path:** `/docs/official-docs/EPIC-H/sandbox-isolation-policy.md`

**Prompt:** Compile the Sandbox Isolation Policy for path `/docs/official-docs/EPIC-H/sandbox-isolation-policy.md`. Extract enforceable rules from the ECS Seccomp documentation regarding the `default` and `custom` profiles. Define the project-specific mandate: all lab containers MUST run with a "Default Deny" Seccomp profile and restricted OCI runtime flags. Prohibit the use of `privileged` mode or host-level namespace sharing.

**Intent:** (Feature H) Prevent malicious lab code from escaping the container and compromising the underlying AWS Fargate infrastructure.

#### 2. Resource Quota & Credit Optimization Policy

**Internal Doc Path:** `/docs/official-docs/EPIC-H/compute-cost-control-policy.md`

**Prompt:** Compile the Compute Resource Quota Policy for path `/docs/official-docs/EPIC-H/compute-cost-control-policy.md`. Define the project's "Credit-Optimized" tiers: Small (0.25 vCPU), Medium (0.5 vCPU), and Large (1 vCPU). Enforce a rule that all ECS Tasks MUST include hard `cpu` and `memory` limits. Define the automatic termination threshold: any task idle for more than 30 minutes MUST be reaped by the orchestration agent to preserve AWS credits.

**Intent:** (Feature H) Ensure the lab environment remains economically viable and prevents runaway billing from stalled or abused tasks.

#### 3. Ephemeral Lifecycle & VFS Sync Policy

**Internal Doc Path:** `/docs/official-docs/EPIC-H/ephemeral-lifecycle-policy.md`

**Prompt:** Compile the Ephemeral Task Lifecycle Policy for path `/docs/official-docs/EPIC-H/ephemeral-lifecycle-policy.md`. Define the state-management contract: before an ECS task is terminated, its modified files MUST be synced back to the project's Virtual File System (VFS). Extract enforceable rules for the use of "Task Metadata Endpoints" to track task uptime and health. Mandate that lab containers are strictly ephemeral and store NO persistent data locally.

**Intent:** (Feature H) Guarantee that student progress is saved while maintaining a completely clean compute environment for every new session.

#### 4. Execution Audit & Forensic Logging Policy

**Internal Doc Path:** `/docs/official-docs/EPIC-H/task-audit-policy.md`

**Prompt:** Compile the Lab Execution Audit Policy for path `/docs/official-docs/EPIC-H/task-audit-policy.md`. Define the requirement to route all Task `stdout` and `stderr` through FireLens to the project's ECS-compliant audit trail. Enforce the inclusion of the OIDC `sub` and `lab_id` in every log entry. Define the mandatory recording of "Task Start" and "Task Stop" events in the PostgreSQL `AuditLog` table for compliance with NIST SP 800-92.

**Intent:** (Feature H/B12) Provide a forensic-grade record of all actions performed inside the lab environment for grading and security reviews.

---

### Next Step

With the **Compute & Sandbox** layer now mapped, the **EPIC-H Lab Execution Engine** is fully secured.

Would you like me to generate the **Terraform HCL for the ECS Task Definition** (including the FireLens log driver and Seccomp configuration) or the **TypeScript orchestration logic** that reaps idle tasks based on these credit-optimization rules?
Here are the documentation requirements and the specific **INTERNAL ENGINEERING POLICY COMPILER** prompts for the **forgea.config.json (Lab Configuration Standard)**.

This section defines the canonical configuration format for all lab templates, establishing a tamper-proof locking mechanism and strict structural validation to ensure artifacts are portable, signed, and secure.

### 🏗️ Lab Configuration Documentation Registry (EPIC-E)

| Technology              | Official Link (Binding)                                   | Intent for EPIC-E                                                           |
| ----------------------- | --------------------------------------------------------- | --------------------------------------------------------------------------- |
| **forgea.config.json**  | Project Canonical Spec                                    | **E**: The master configuration and locking manifest for all lab artifacts. |
| **JSON Schema 2020-12** | [json-schema.org](https://json-schema.org/specification)  | **E**: Provides automated structural validation for lab metadata.           |
| **JWS (RFC 7515)**      | [RFC 7515](https://datatracker.ietf.org/doc/html/rfc7515) | **E**: Cryptographic integrity and non-repudiation for "Locked" labs.       |
| **Ed25519 (RFC 8037)**  | [RFC 8037](https://datatracker.ietf.org/doc/html/rfc8037) | **E**: The preferred signing algorithm for high-performance lab signatures. |

---

### 📋 Prompts for Policy Compilation

Use these prompts with your **ENGINEERING POLICY COMPILER** to generate the internal authoritative docs.

#### 1. Lab Structural Validation & Schema Policy

**Internal Doc Path:** `/docs/official-docs/EPIC-E/lab-schema-standard.md`

**Prompt:** Compile the forgea.config.json Schema Policy for path `/docs/official-docs/EPIC-E/lab-schema-standard.md`. Define the mandatory fields for all lab configurations: `lab_id` (UUID), `version` (SemVer), `author`, and the `locked` boolean. Enforce structural validation against JSON Schema 2020-12. Define the requirement that any config exceeding the schema MUST be rejected by the publishing pipeline.

**Intent:** (Feature E) Ensure every lab artifact in the system is structurally sound and follows a predictable data model for automated processing.

#### 2. Lab Signing & Cryptographic Integrity Policy

**Internal Doc Path:** `/docs/official-docs/EPIC-E/lab-signing-policy.md`

**Prompt:** Compile the Lab Signing & Integrity Policy for path `/docs/official-docs/EPIC-E/lab-signing-policy.md`. Extract enforceable rules for the `signature` field using JWS (RFC 7515) compact serialization. Mandate the use of Ed25519 (RFC 8037) for all production lab signatures. Define the "Verification Gate": any lab marked as `locked: true` MUST have a valid signature verified against the internal JWKS trust store or it will be blocked from execution.

**Intent:** (Feature E) Protect the lab execution environment by ensuring that only authorized, un-tampered code can run on the Fargate infrastructure.

#### 3. Locking Lifecycle & State Transition Policy

**Internal Doc Path:** `/docs/official-docs/EPIC-E/lab-lifecycle-policy.md`

**Prompt:** Compile the Lab Locking & Transition Policy for path `/docs/official-docs/EPIC-E/lab-lifecycle-policy.md`. Define the allowed state transitions: `draft` → `published` → `locked`. Enforce a rule that once a lab is `locked`, its `version` and `lab_id` are immutable. Extract the requirement for human-in-the-loop approval before a signature is generated for a state change to `locked`.

**Intent:** (Feature E) Establish a clear audit trail for the development and freezing of educational content.

#### 4. Secret Sanitization & publish Gate Policy

**Internal Doc Path:** `/docs/official-docs/EPIC-E/config-security-policy.md`

**Prompt:** Compile the Config Sanitization & Secret Policy for path `/docs/official-docs/EPIC-E/config-security-policy.md`. Define the project's "Zero Secret" mandate for configuration files: no API keys, private keys, or long base64 strings may be embedded in `forgea.config.json`. Enforce the use of CI-level sanitizers that perform regex-based entropy checks for potential secrets prior to any `publish` event.

**Intent:** (Feature E/C5) Prevent the accidental exposure of sensitive credentials within the open-source or shared lab repository structure.

---

### Next Step

With the **Lab Configuration Standard** now mapped, the **EPIC-E Creation System** is logically complete.

Would you like me to generate the **canonical JSON Schema file** for `forgea.config.json` or the **TypeScript CLI logic** for the `verify-lab-signature` tool that implements these JWS rules?
Here are the documentation requirements and the specific **INTERNAL ENGINEERING POLICY COMPILER** prompts for **Docker / OCI Runtime**.

Based on the project's containerization and isolation strategy, we are pinning these requirements to the **EPIC-B (Database Core)** and **EPIC-E (Lab Creation)** layers to ensure that local development, CI migrations, and lab snapshots occur in hermetic, deterministic environments.

### 🏗️ Docker / OCI Documentation Registry (EPIC-B/E/H)

| Technology           | Official Link (Binding)                                                | Intent for EPIC-B/E/H                                                       |
| -------------------- | ---------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| **OCI Runtime Spec** | [OCI Runtime Spec](https://github.com/opencontainers/runtime-spec)     | **H**: Authoritative spec for container lifecycle and signal handling.      |
| **Docker Compose**   | [Compose Specification](https://docs.docker.com/compose/compose-file/) | **B**: Standardizes the local multi-container environment (Postgres/Redis). |
| **Seccomp/AppArmor** | [Docker Security](https://docs.docker.com/engine/security/seccomp/)    | **E/H**: Implements the security profile for hermetic lab runners.          |
| **Docker Engine**    | [Engine API](https://docs.docker.com/engine/api/)                      | **E**: Defines the programmatic interaction for snapshot capture.           |

---

### 📋 Prompts for Policy Compilation

Use these prompts with your **ENGINEERING POLICY COMPILER** to generate the internal authoritative docs.

#### 1. Hermetic Lab Runner & VFS Isolation Policy

**Internal Doc Path:** `/docs/official-docs/EPIC-E/hermetic-runner-policy.md`

**Prompt:** Compile the Hermetic Lab Runner Policy for path `/docs/official-docs/EPIC-E/hermetic-runner-policy.md`. Define the mandatory container configuration for lab verification: (1) `network: none` to prevent data exfiltration, (2) Read-only root filesystem with a `tmpfs` mount for `/tmp`, and (3) User namespace remapping to an unprivileged `uid`. Enforce a rule that no host paths outside the specific VFS lab directory may be mounted.

**Intent:** (Feature E) Guarantee that lab verification and snapshotting are performed in a "Zero Trust" sandbox that cannot contaminate the host or access external networks.

#### 2. Deterministic Database & Migration Environment Policy

**Internal Doc Path:** `/docs/official-docs/EPIC-B/deterministic-db-env.md`

**Prompt:** Compile the Deterministic DB Environment Policy for path `/docs/official-docs/EPIC-B/deterministic-db-env.md`. Define the canonical `docker-compose.yml` service for Postgres, including the specific version tag and mandatory extensions. Extract enforceable rules for volume persistence: local DB volumes MUST be named and deterministic to ensure consistency across migration testing and Vitest runs.

**Intent:** (Feature B) Eliminate "environment drift" between developer machines and CI/CD when executing complex Prisma migrations.

#### 3. Container Lifecycle & Signal Handling Standard

**Internal Doc Path:** `/docs/official-docs/infrastructure/container-lifecycle-standard.md`

**Prompt:** Compile the Container Lifecycle Standard for path `/docs/official-docs/infrastructure/container-lifecycle-standard.md`. Extract enforceable rules from the OCI spec regarding `SIGTERM` handling. Define the requirement for an `init` process (e.g., `tini`) in all lab images to ensure zombie processes are reaped and graceful shutdowns occur within a 10-second timeout window.

**Intent:** (Feature H) Ensure that ephemeral lab compute tasks (EPIC-H) exit cleanly and predictably, allowing the orchestration agent to sync VFS state without data loss.

#### 4. Image Hardening & Registry Integrity Policy

**Internal Doc Path:** `/docs/official-docs/security/image-hardening-policy.md`

**Prompt:** Compile the Container Image Hardening Policy for path `/docs/official-docs/security/image-hardening-policy.md`. Define the mandate for "Distroless" or minimal Alpine-based base images. Enforce a rule that all production images MUST be referenced by their `sha256` digest rather than a mutable tag. Extract the requirement for CI-level vulnerability scanning (e.g., Trivy) that blocks any image containing "Critical" or "High" severity CVEs.

**Intent:** (Feature G/C10) Secure the software supply chain by ensuring that only verified, immutable container artifacts are used in the snapshot and preview pipelines.

---

### Next Step

With the **Container & Runtime** layer now codified, the **Sandbox Execution Perimeter** is fully defined.

Would you like me to generate the **Hardened `docker-compose.lab.yml` template** for the hermetic runners or the **Postgres service definition** that includes the deterministic volume and healthcheck logic for EPIC-B?
Here are the documentation requirements and the specific **INTERNAL ENGINEERING POLICY COMPILER** prompts for **CommonMark**.

Based on the project's content architecture, we are pinning these requirements to the Markdown parsing standard to ensure deterministic rendering, stable Abstract Syntax Tree (AST) normalization for AI processing, and strict XSS sanitization across the lesson-serving layer.

### 🏗️ CommonMark Documentation Registry (EPIC-D/J)

| Technology              | Official Link (Binding)                                    | Intent for EPIC-D/J                                                                  |
| ----------------------- | ---------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| **CommonMark Spec**     | [commonmark.org](https://commonmark.org/)                  | **D/J**: Baseline authoritative standard for all lesson content authoring.           |
| **GFM Extensions**      | [GitHub Flavored Markdown](https://github.github.com/gfm/) | **D/J**: Standardizes tables, task lists, and autolinks for technical documentation. |
| **Unified.js / Remark** | [unifiedjs.com](https://unifiedjs.com/)                    | **J**: Defines the AST (mdast) schema used for content validation and chunking.      |
| **XSS Sanitization**    | [Cure53 DOMPurify](https://github.com/cure53/dompurify)    | **J**: Implements the security boundary for rendering student-facing content.        |

---

### 📋 Prompts for Policy Compilation

Use these prompts with your **ENGINEERING POLICY COMPILER** to generate the internal authoritative docs.

#### 1. Canonical Authoring Syntax & Parser Pinning Policy

**Internal Doc Path:** `/docs/official-docs/content/markdown-authoring-policy.md`

**Prompt:** Compile the Markdown Authoring & Parser Policy for path `/docs/official-docs/content/markdown-authoring-policy.md`. Define the mandatory use of CommonMark with specific GFM extensions (tables, strikethrough, task lists). Extract enforceable rules for pinning the version of the `remark` parser and its related plugins. Define the project-specific mandate: all `.md` or `.mdx` files MUST be linted for syntax compliance before being accepted into the snapshot pipeline.

**Intent:** (Feature J2) Ensure consistent content rendering across the editor, preview environment, and production serving layer.

#### 2. AST Normalization & Deterministic Chunking Policy

**Internal Doc Path:** `/docs/official-docs/EPIC-D/content-ast-standard.md`

**Prompt:** Compile the Content AST & Normalization Policy for path `/docs/official-docs/EPIC-D/content-ast-standard.md`. Define the requirement for AST-based validation (using `mdast`). Enforce a rule that the system MUST produce a normalized AST before content is sent to the AI embedding engine. Extract enforceable logic for "Deterministic Chunking": chunks MUST be split at specific node types (e.g., `heading`, `thematicBreak`) to ensure context remains semantically coherent for RAG.

**Intent:** (Feature D3/D4) Provide the AI ingestion engine with structured, predictable data to improve the accuracy of lesson summaries and vector search.

#### 3. XSS Sanitization & Content Security Policy

**Internal Doc Path:** `/docs/official-docs/EPIC-J/content-sanitization-policy.md`

**Prompt:** Compile the Content Sanitization & XSS Policy for path `/docs/official-docs/EPIC-J/content-sanitization-policy.md`. Define the "Strict Rendering" mandate: all HTML tags within Markdown MUST be stripped or allow-listed using a hardened DOMPurify configuration. Extract enforceable rules regarding the handling of sensitive "Solution" blocks: these blocks MUST be filtered out of the AST during preview rendering for students but preserved for teacher-level authorization.

**Intent:** (Feature J3/C10) Prevent cross-site scripting attacks and ensure that exercise solutions are not leaked through the Markdown source in client-side previews.

#### 4. Exercise Extraction & Test Harness Policy

**Internal Doc Path:** `/docs/official-docs/EPIC-D/exercise-extraction-standard.md`

**Prompt:** Compile the Exercise Extraction Standard for path `/docs/official-docs/EPIC-D/exercise-extraction-standard.md`. Define the syntax for "Executable Code Blocks" within CommonMark. Enforce a rule that all code blocks tagged with specific meta-data (e.g., `exercise: "id"`) MUST be programmatically extracted by the `verifier-agent` into a local Vitest/Playwright harness. Define the requirement that every exercise block MUST have a corresponding "Validation" block defined in the same AST.

**Intent:** (Feature D2/E5) Bridge the gap between static Markdown content and interactive, verifiable lab exercises.

---

### Next Step

With the **Content Standard** now mapped, the **EPIC-D/J Rendering and Ingestion** pipeline is fully secured.

Would you like me to generate the **Remark/Unified.js plugin configuration** that implements the deterministic chunking logic, or the **DOMPurify allow-list** tailored for the secure rendering of these lessons?
Here are the documentation requirements and the specific **INTERNAL ENGINEERING POLICY COMPILER** prompts for **MDX (mdx-js)**.

Based on the project's interactive content strategy, we are pinning these requirements to the hybrid Markdown/JSX layer to ensure that lessons remain interactive yet secure, with strict component sandboxing and deterministic AST (Abstract Syntax Tree) transformations.

### 🏗️ MDX Documentation Registry (EPIC-D/J)

| Technology        | Official Link (Binding)                                                                                 | Intent for EPIC-D/J                                                                 |
| ----------------- | ------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| **MDX (mdx-js)**  | [mdxjs.com](https://mdxjs.com/)                                                                         | **J1/J2**: Authoritative format for mixing JSX components with Markdown lessons.    |
| **Remark/Rehype** | [Unified Collective](https://unifiedjs.com/)                                                            | **J3**: Standardizes the transformation pipeline and AST normalization.             |
| **Component API** | Internal Sandboxing Spec                                                                                | **D2**: Defines the "Sandboxed Primitives" allowed for use by lesson authors.       |
| **SSR Safety**    | [MDX Security Docs](https://www.google.com/search?q=https://mdxjs.com/docs/getting-started/%23security) | **D9**: Implements guardrails against Remote Code Execution (RCE) during rendering. |

---

### 📋 Prompts for Policy Compilation

Use these prompts with your **ENGINEERING POLICY COMPILER** to generate the internal authoritative docs.

#### 1. MDX Parser & Plugin Pinning Policy

**Internal Doc Path:** `/docs/official-docs/content/mdx-parser-policy.md`

**Prompt:** Compile the MDX Parser & Plugin Pinning Policy for path `/docs/official-docs/content/mdx-parser-policy.md`. Define the mandatory version locking for `mdx-js`, `remark`, and `rehype` packages. Extract enforceable rules for CI-level syntax validation: all lessons MUST be parsed by the pinned toolchain before being accepted into the snapshot pipeline to prevent AST drift.

**Intent:** (Feature J1) Ensure that lesson content is processed identically across the editor, previewer, and production serving layer.

#### 2. Component Sandboxing & Linter Guardrails

**Internal Doc Path:** `/docs/official-docs/EPIC-J/mdx-component-sandboxing.md`

**Prompt:** Compile the MDX Component Sandboxing Policy for path `/docs/official-docs/EPIC-J/mdx-component-sandboxing.md`. Define the "Allowed Primitives" API for lesson authors. Enforce a rule that prohibit arbitrary `import` statements within MDX files; only pre-approved, sandboxed components from the project's UI library may be used. Extract linter requirements to block unsafe runtime-only patterns or DOM-direct manipulation.

**Intent:** (Feature J2/J3) Maintain a secure rendering surface for student-facing pages while allowing the flexibility of interactive components.

#### 3. AST-Frontmatter Validation & Schema Policy

**Internal Doc Path:** `/docs/official-docs/EPIC-J/mdx-schema-validation.md`

**Prompt:** Compile the MDX-to-AST Validation Policy for path `/docs/official-docs/EPIC-J/mdx-schema-validation.md`. Define the requirement to normalize the MDX AST (mdast) and validate it alongside YAML frontmatter. Enforce a rule that the system MUST check for required lesson metadata (ID, version, difficulty) using JSON Schema 2020-12 before content is written to storage.

**Intent:** (Feature J3) Guarantee structural integrity for all lessons and provide predictable metadata for the AI ingestion engine.

#### 4. Secure Rendering & Storage Transform Standard

**Internal Doc Path:** `/docs/official-docs/EPIC-D/mdx-rendering-standard.md`

**Prompt:** Compile the MDX Secure Rendering & Storage Transform Standard for path `/docs/official-docs/EPIC-D/mdx-rendering-standard.md`. Define the transformation flow from MDX source to the canonical lesson storage format. Extract enforceable rules regarding Server-Side Rendering (SSR) safety: no user-supplied code may be executed in the server context. Mandate that interactive blocks are extracted and versioned separately to decouple execution from the primary content source.

**Intent:** (Feature D9) Eliminate RCE risks and optimize delivery performance by generating sanitized, storage-friendly lesson artifacts.

---

### Next Step

With the **MDX and Interactive Content** layer now mapped, the **EPIC-D/J Content Loop** is architecturally complete.

Would you like me to generate the **ESLint configuration** that implements these MDX linter guardrails, or the **Unified.js pipeline script** that performs the AST-frontmatter validation?
Here are the documentation requirements and the specific **INTERNAL ENGINEERING POLICY COMPILER** prompts for **YAML Frontmatter**.

Based on the project's content architecture, we are pinning these requirements to the metadata layer of our Markdown/MDX lessons. This ensures that lesson manifests are parsed consistently, validated against strict schemas, and remain interoperable with the AI ingestion and serving engines.

### 🏗️ YAML Frontmatter Documentation Registry (EPIC-J)

| Technology               | Official Link (Binding)                                          | Intent for EPIC-J                                                          |
| ------------------------ | ---------------------------------------------------------------- | -------------------------------------------------------------------------- |
| **YAML 1.2.2 Spec**      | [yaml.org](https://yaml.org/spec/1.2.2/)                         | **J1/J3**: Authoritative standard for metadata serialization in lessons.   |
| **Lesson Manifest**      | Project Canonical Spec                                           | **J2**: The master manifest format for lesson IDs, versions, and tagging.  |
| **JSON Schema 2020-12**  | [json-schema.org](https://json-schema.org/specification)         | **J3**: Provides automated validation for normalized frontmatter objects.  |
| **Gray-matter / Parser** | [gray-matter Docs](https://github.com/jonschlinkert/gray-matter) | **J1**: Defines the extraction boundary between metadata and content body. |

---

### 📋 Prompts for Policy Compilation

Use these prompts with your **ENGINEERING POLICY COMPILER** to generate the internal authoritative docs.

#### 1. YAML Parser Pinning & Semantics Policy

**Internal Doc Path:** `/docs/official-docs/content/yaml-parsing-policy.md`

**Prompt:** Compile the YAML Parsing & Semantics Policy for path `/docs/official-docs/content/yaml-parsing-policy.md`. Define the mandatory use of YAML 1.2 semantics. Extract enforceable rules for pinning the specific parser version (e.g., `js-yaml` or `gray-matter` engines). Enforce a project-wide rule: no "Magic Typing" (scalars must be treated as strings unless explicitly mapped) to prevent accidental conversion of version numbers or IDs into booleans or dates.

**Intent:** (Feature J1/J3) Ensure that lesson metadata is interpreted identically across the development CLI, the Next.js previewer, and the production database.

#### 2. Metadata Normalization & Schema Validation Policy

**Internal Doc Path:** `/docs/official-docs/EPIC-J/metadata-validation-policy.md`

**Prompt:** Compile the Metadata Normalization & Validation Policy for path `/docs/official-docs/EPIC-J/metadata-validation-policy.md`. Define the mandatory transformation of YAML frontmatter into a canonical JSON object before validation. Enforce strict validation against the project's Lesson JSON Schema (2020-12). Define the "Strict Field" mandate: any unexpected or "shadow" fields in the YAML frontmatter MUST trigger a build failure in the CI snapshot pipeline.

**Intent:** (Feature J3) Prevent metadata injection and ensure that all lessons contain the minimum required fields (ID, version, author, visibility) in the correct format.

#### 3. Complex YAML Feature Restriction Policy

**Internal Doc Path:** `/docs/official-docs/EPIC-J/yaml-security-guardrails.md`

**Prompt:** Compile the YAML Security & Complexity Guardrails for path `/docs/official-docs/EPIC-J/yaml-security-guardrails.md`. Extract enforceable rules to disable unsafe or overly complex YAML features: (1) Prohibit the use of YAML Anchors and Aliases to prevent circular reference attacks, (2) Prohibit custom tags/types, and (3) Set a strict limit on nesting depth (max 3 levels). Define the requirement for UTF-8 encoding and normalized line endings.

**Intent:** (Feature J3/C10) Protect the parser from "Billion Laughs" style attacks and maintain a simple, human-readable metadata layer.

#### 4. Lesson Manifest Integrity & Identification Policy

**Internal Doc Path:** `/docs/official-docs/EPIC-J/lesson-manifest-standard.md`

**Prompt:** Compile the Lesson Manifest & ID Policy for path `/docs/official-docs/EPIC-J/lesson-manifest-standard.md`. Define the canonical required fields in every frontmatter block: `lesson_id` (UUIDv4), `version` (SemVer), and `slug`. Enforce a rule that the `lesson_id` and `version` pair must be unique across the entire Virtual File System (VFS). Define the requirement for "Schema Versions"—frontmatter MUST include a `$schema` reference to the specific version of the lesson metadata spec it adheres to.

**Intent:** (Feature J2) Establish an immutable link between the physical Markdown file and its database record in EPIC-B.

---

### Next Step

With the **YAML and Metadata** layer now mapped, the **EPIC-J Content Architecture** is fully codified.

Would you like me to generate the **TypeScript Zod schema** for the Lesson Manifest or the **parsing logic utility** that implements the normalization and strict field checks for these frontmatter policies?
Here are the documentation requirements and the specific **INTERNAL ENGINEERING POLICY COMPILER** prompts for **PostgreSQL 18.2 & Extensions**.

Based on the project's data persistence strategy, we are pinning these requirements to the **EPIC-B (Database Core)** layer to ensure environment parity, security against known vulnerabilities (v18.2 overflow fix), and consistent support for cryptographic and search extensions.

### 🏗️ PostgreSQL Documentation Registry (EPIC-B/C/D/I)

| Technology          | Official Link (Binding)                                                       | Intent for EPIC-B/C/D/I                                                                  |
| ------------------- | ----------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| **PostgreSQL 18.2** | [Postgres 18 Docs](https://www.postgresql.org/docs/18/index.html)             | **B/G/H**: Primary OLTP store. Pinned to 18.2 to mitigate security overflow bugs.        |
| **pgcrypto**        | [Postgres Crypto Docs](https://www.postgresql.org/docs/current/pgcrypto.html) | **B/C**: Native server-side UUID generation (`gen_random_uuid`) and hashing.             |
| **JSONB & GIN**     | [JSON Types](https://www.postgresql.org/docs/current/datatype-json.html)      | **D**: Flexible storage for lesson metadata and versioning with high-speed indexing.     |
| **pg_trgm**         | [Trigram Search](https://www.postgresql.org/docs/current/pgtrgm.html)         | **D/I**: Enables fuzzy text search for lesson discovery and anti-cheat pattern matching. |

---

### 📋 Prompts for Policy Compilation

Use these prompts with your **ENGINEERING POLICY COMPILER** to generate the internal authoritative docs.

#### 1. Database Version & Environment Parity Policy

**Internal Doc Path:** `/docs/official-docs/database/postgresql-version-policy.md`

**Prompt:** Compile the PostgreSQL Version & Parity Policy for path `/docs/official-docs/database/postgresql-version-policy.md`. Define the mandatory requirement to use PostgreSQL 18.2 across local, CI, and RDS environments. Extract enforceable rules regarding timezone and locale settings (UTF-8) to ensure reproducible timestamps and audit logs. Enforce a build-time check that prevents the application from starting if the detected Postgres version is less than 18.2.

**Intent:** (Feature B) Eliminate "Security Overflow" risks identified in 18.1 and ensure consistent data behavior across the dev-to-prod pipeline.

#### 2. Extension Lifecycle & Parity Standard

**Internal Doc Path:** `/docs/official-docs/EPIC-B/postgres-extension-standard.md`

**Prompt:** Compile the Postgres Extension Management Policy for path `/docs/official-docs/EPIC-B/postgres-extension-standard.md`. Define the "Parity Mandate": extensions (`pgcrypto`, `pg_trgm`, `uuid-ossp`) MUST be available in the local `docker-compose` image and the RDS parameter group. Enforce a rule that all Prisma migrations MUST include `CREATE EXTENSION IF NOT EXISTS` statements. Specify that `pgcrypto` is the preferred source for `gen_random_uuid()` on 18.x.

**Intent:** (Feature B) Ensure that advanced database features are portable and that CI shadow databases are initialized with full feature sets.

#### 3. Identity & Session Performance Indexing Policy

**Internal Doc Path:** `/docs/official-docs/EPIC-C/auth-indexing-policy.md`

**Prompt:** Compile the Auth & RBAC Indexing Policy for path `/docs/official-docs/EPIC-C/auth-indexing-policy.md`. Define mandatory indexing strategies for the `AuthIdentity` and `AuthSession` tables. Extract enforceable rules for composite unique indexes on `provider + provider_user_id`. Define the TTL cleanup strategy: session tables MUST include a `last_accessed` index to facilitate efficient background pruning of expired tokens.

**Intent:** (Feature C) Guarantee high-concurrency performance for authentication lookups and prevent session-table bloat.

#### 4. Append-Only Audit & JSONB Versioning Policy

**Internal Doc Path:** `/docs/official-docs/EPIC-B/append-only-audit-policy.md`

**Prompt:** Compile the Append-Only State Policy for path `/docs/official-docs/EPIC-B/append-only-audit-policy.md`. Define the requirement for B11 "Immutability": the `AuditLog` and `LessonVersion` tables MUST follow an insert-only pattern. Extract rules for JSONB schema evolution: lesson metadata stored in JSONB MUST include a mandatory `schema_version` field. Define the use of Row-Level Security (RLS) to prevent non-administrative roles from executing `UPDATE` or `DELETE` on audit records.

**Intent:** (Feature B11/D8) Meet compliance requirements for immutable audit trails and ensure robust version history for educational content.

---

### Next Step

With the **Database and Extensions** layer now mapped, the **EPIC-B Hardened Storage** architecture is logically sound.

Would you like me to generate the **Prisma Schema** fragments for the `AuthIdentity` and `AuditLog` models that implement these indexing, UUID, and JSONB versioning rules?
Here are the documentation requirements and the specific **INTERNAL ENGINEERING POLICY COMPILER** prompts for **Prisma ORM**.

Based on the project's data integrity strategy, we are pinning these requirements to the Object-Relational Mapping (ORM) and migration layer to ensure strict type safety, deterministic schema evolution, and the enforcement of the hardened identity and audit models.

### 🏗️ Prisma Documentation Registry (EPIC-B/C/H)

| Technology                   | Official Link (Binding)                                                                                                             | Intent for EPIC-B/C/H                                                                 |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| **Prisma ORM 7.3.0**         | [prisma.io/docs](https://www.prisma.io/docs)                                                                                        | **B1/G**: Authoritative ORM for the monorepo; pinned to v7.3.0 for runtime stability. |
| **Prisma Migrate**           | [Prisma Migrate Docs](https://www.google.com/search?q=https://www.prisma.io/docs/concepts/components/prisma-migrate)                | **B2**: Standardizes deterministic schema evolution via SQL migration files.          |
| **Prisma Client Extensions** | [Client Extensions](https://www.google.com/search?q=https://www.prisma.io/docs/concepts/components/prisma-client/client-extensions) | **C6/B12**: Implements cross-cutting concerns like global audit logging and RLS.      |
| **Type Safety & Validation** | [Prisma Type Safety](https://www.google.com/search?q=https://www.prisma.io/docs/concepts/components/prisma-client/type-safety)      | **G**: Enforces end-to-end type safety from the DB schema to the Next.js frontend.    |

---

### 📋 Prompts for Policy Compilation

Use these prompts with your **ENGINEERING POLICY COMPILER** to generate the internal authoritative docs.

#### 1. Version Integrity & Client Generation Policy

**Internal Doc Path:** `/docs/official-docs/database/prisma-integrity-policy.md`

**Prompt:** Compile the Prisma Version Integrity Policy for path `/docs/official-docs/database/prisma-integrity-policy.md`. Define the mandatory requirement to pin `@prisma/client` and `prisma` CLI to version 7.3.0. Enforce a build-time check in the CI pipeline that ensures `prisma generate` is executed and the resulting client matches the committed `schema.prisma`. Prohibit the use of `npx prisma db push` in production; all changes MUST use versioned migrations.

**Intent:** (Feature B1) Prevent runtime mismatches and ensure the application always interacts with a predictable database state.

#### 2. Migration Lifecycle & Shadow DB Standard

**Internal Doc Path:** `/docs/official-docs/EPIC-B/migration-lifecycle-standard.md`

**Prompt:** Compile the Database Migration Lifecycle Standard for path `/docs/official-docs/EPIC-B/migration-lifecycle-standard.md`. Define the mandatory workflow for schema changes: (1) Local development using a Shadow DB, (2) Deterministic SQL generation, and (3) CI-level validation of "Down" migrations or rollback procedures. Extract enforceable rules for "Zero-Downtime" renames: identity tables (B3) MUST use an additive approach (new table/column + trigger) before decommissioning old structures.

**Intent:** (Feature B2) Guarantee safe, reversible, and auditable schema changes in high-concurrency environments.

#### 3. Identity & RBAC Hardened Model Policy

**Internal Doc Path:** `/docs/official-docs/EPIC-C/prisma-auth-models.md`

**Prompt:** Compile the Prisma Auth & RBAC Model Policy for path `/docs/official-docs/EPIC-C/prisma-auth-models.md`. Define the mandatory Prisma models for `User`, `AuthIdentity`, `AuthSession`, and `Role`. Enforce strict relation constraints: `AuthIdentity` must have a unique composite index on `(provider, provider_user_id)`. Define the project-specific "Sub-mapping": the OIDC `sub` claim MUST be mapped to the primary key of the `User` table to ensure identity stability.

**Intent:** (Feature C2/C6) Align the database schema with the OIDC and RBAC security policies defined in EPIC-C.

#### 4. JSONB Evolution & Type Safety Standard

**Internal Doc Path:** `/docs/official-docs/EPIC-B/jsonb-evolution-standard.md`

**Prompt:** Compile the JSONB Schema Evolution Standard for path `/docs/official-docs/EPIC-B/jsonb-evolution-standard.md`. Define the requirement for all `Json` fields (e.g., Lesson Metadata) to include a mandatory `schema_version` property. Enforce a rule that developers MUST provide a Zod schema or TypeScript interface for every JSONB field to ensure type safety within the Prisma Client. Extract the policy for concurrent index builds on large JSONB columns to prevent table locking.

**Intent:** (Feature B4/D8) Manage the complexity of flexible storage while maintaining strict technical oversight and performance.

---

### Next Step

With the **Prisma and Migration** layer now mapped, the **Source of Truth for Data** is established.

Would you like me to generate the **`schema.prisma` file** for the `AuthIdentity`, `AuditLog`, and `VerificationJob` models, ensuring they strictly implement the OIDC, RBAC, and ECS event policies we've compiled?
Here are the documentation requirements and the specific **INTERNAL ENGINEERING POLICY COMPILER** prompts for the **Monaco Editor & @monaco-editor/react**.

Based on the project's frontend architecture, we are pinning these requirements to the **EPIC-K (Lab UI & Hybrid Editor)** layer to ensure a high-performance, accessible, and secure in-browser code editing experience that integrates natively with our Virtual File System (VFS).

### 🏗️ Monaco Editor Documentation Registry (EPIC-K)

| Technology               | Official Link (Binding)                                                                                                                        | Intent for EPIC-K                                                              |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| **Monaco Editor Core**   | [microsoft/monaco-editor](https://github.com/microsoft/monaco-editor)                                                                          | **K**: Primary code editing surface; version 0.55.x pinned for stability.      |
| **Monaco React**         | [suren-atoyan/monaco-react](https://github.com/suren-atoyan/monaco-react)                                                                      | **K**: Authoritative React wrapper for managing editor lifecycles in Next.js.  |
| **Web Workers**          | [Monaco Worker Spec](https://www.google.com/search?q=https://github.com/microsoft/monaco-editor/blob/main/docs/integrate-esm.md%23web-workers) | **K**: Standardizes off-main-thread language services and syntax highlighting. |
| **Editor Accessibility** | [Monaco Accessibility](https://www.google.com/search?q=https://github.com/microsoft/monaco-editor/blob/main/docs/accessibility.md)             | **K**: Enforces WCAG 2.1 compliance for focus management and screen readers.   |

---

### 📋 Prompts for Policy Compilation

Use these prompts with your **ENGINEERING POLICY COMPILER** to generate the internal authoritative docs.

#### 1. Editor Lifecycle & Memory Management Policy

**Internal Doc Path:** `/docs/official-docs/EPIC-K/editor-lifecycle-policy.md`

**Prompt:** Compile the Monaco Editor Lifecycle Policy for path `/docs/official-docs/EPIC-K/editor-lifecycle-policy.md`. Define the mandatory use of the `beforeMount` and `onMount` hooks from `@monaco-editor/react`. Extract enforceable rules for explicit editor disposal and model cleanup: any VFS model created MUST be manually disposed of when the lab step unmounts to prevent memory leaks in the SPA.

**Intent:** (Feature K) Guarantee high performance and prevent browser crashes during long-running student sessions across multiple lesson steps.

#### 2. VFS Integration & Atomic Sync Standard

**Internal Doc Path:** `/docs/official-docs/EPIC-K/vfs-editor-sync-standard.md`

**Prompt:** Compile the VFS-to-Editor Sync Standard for path `/docs/official-docs/EPIC-K/vfs-editor-sync-standard.md`. Define the logic for "Atomic Edits": changes in the Monaco buffer MUST be debounced and synced to the internal project VFS using specific `applyEdits` API calls rather than full-file overwrites. Enforce a rule that the editor's "Undo/Redo" stack must remain consistent with the VFS state across manual and AI-assisted edits.

**Intent:** (Feature K) Ensure a seamless, low-latency editing experience where student code is safely persisted to the virtual file system in real-time.

#### 3. Worker Isolation & Sandbox Security Policy

**Internal Doc Path:** `/docs/official-docs/EPIC-K/editor-worker-security.md`

**Prompt:** Compile the Monaco Worker Security Policy for path `/docs/official-docs/EPIC-K/editor-worker-security.md`. Define the requirement for self-hosting all Monaco Web Workers (JSON, CSS, TS/JS). Enforce the "Execution Boundary" mandate: language services MUST NOT have access to the main thread's `localStorage` or `cookies`. Prohibit the loading of third-party, non-vetted language workers to prevent arbitrary code execution in the UI context.

**Intent:** (Feature K/C10) Protect the student's browser environment by sandboxing heavy language processing tasks.

#### 4. High-Performance Hybrid Hydration Standard

**Internal Doc Path:** `/docs/official-docs/EPIC-K/editor-performance-standard.md`

**Prompt:** Compile the Editor Performance & Hydration Standard for path `/docs/official-docs/EPIC-K/editor-performance-standard.md`. Define the project mandate for "Lazy Hydration": the Monaco bundle (approx. 5MB) MUST NOT be included in the initial Next.js SSR payload; it must be dynamically loaded only when a student enters an "Active Lab" step. Extract enforceable rules for using `EditorPool` to reuse existing DOM elements when switching between multiple open files in the hybrid editor UI.

**Intent:** (Feature K) Optimize Core Web Vitals (LCP/FID) by ensuring the heavy editor code only executes when strictly necessary.

---

### Next Step

With the **Editor UI** layer now mapped, the **EPIC-K Frontend Architecture** is complete.

Would you like me to generate the **TypeScript `useEditorVfs` hook** that implements this atomic sync logic, or the **Next.js Dynamic Import wrapper** that enforces the lazy hydration and worker isolation policies?

For a deeper dive into modern editor integration in Next.js, this guide on [Efficiently loading Monaco Editor in React](https://www.google.com/search?q=https://www.youtube.com/watch%3Fv%3D5VshP47pXp8) covers the exact dynamic loading and performance patterns required by our EPIC-K policies.

This video is relevant because it demonstrates the practical implementation of lazy-loading and bundle optimization for Monaco, which is a core requirement for our performance standards.
Here are the documentation requirements and the specific **INTERNAL ENGINEERING POLICY COMPILER** prompts for **POSIX Semantics & VFS Abstraction**.

Based on the project's frontend and sandbox architecture, we are pinning these requirements to the **EPIC-K (Lab UI & Hybrid Editor)** layer to ensure that the in-browser Virtual File System (VFS) behaves predictably for developers while maintaining a strict security boundary against path traversal and unauthorized data access.

### 🏗️ POSIX & VFS Documentation Registry (EPIC-K)

| Technology            | Official Link (Binding)                                                                                                                       | Intent for EPIC-K                                                                         |
| --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| **POSIX.1-2017**      | [IEEE Std 1003.1](https://pubs.opengroup.org/onlinepubs/9699919799/)                                                                          | **K**: Authoritative baseline for path resolution, symlinks, and file metadata.           |
| **OverlayFS Pattern** | [Kernel OverlayFS Docs](https://www.kernel.org/doc/Documentation/filesystems/overlayfs.txt)                                                   | **K**: Standardizes the merging of RO (Lesson) and RW (Student) VFS layers.               |
| **Path Sanitization** | [OWASP Path Traversal](https://www.google.com/search?q=https://cheatsheetseries.owasp.org/cheatsheets/File_Storage_Security_Cheat_Sheet.html) | **K/C10**: Implements the logical sandbox to prevent "breaking out" of the lab directory. |
| **Atomic Commits**    | Internal VFS Spec                                                                                                                             | **K**: Defines the rollback/commit semantics for step-based lab progress.                 |

---

### 📋 Prompts for Policy Compilation

Use these prompts with your **ENGINEERING POLICY COMPILER** to generate the internal authoritative docs.

#### 1. VFS Path Resolution & Traversal Prevention Policy

**Internal Doc Path:** `/docs/official-docs/EPIC-K/vfs-path-security.md`

**Prompt:** Compile the VFS Path Resolution & Traversal Prevention Policy for path `/docs/official-docs/EPIC-K/vfs-path-security.md`. Extract enforceable rules from POSIX standards regarding absolute vs. relative path resolution. Define the project-specific mandate: all VFS operations MUST be rooted at `/home/student/` and any path containing `..` that resolves outside this root MUST be rejected with an `EACCES` or `EPERM` equivalent.

**Intent:** (Feature K/C10) Establish a "Jail" environment in the browser, ensuring student code and editor actions cannot access or leak internal application state.

#### 2. Multi-Layer Overlay & Symlink Safety Policy

**Internal Doc Path:** `/docs/official-docs/EPIC-K/vfs-overlay-policy.md`

**Prompt:** Compile the VFS Overlay & Symlink Safety Policy for path `/docs/official-docs/EPIC-K/vfs-overlay-policy.md`. Define the logic for the "Lower" (Read-Only Lesson) and "Upper" (Writable Student) layers. Extract enforceable rules regarding symlink resolution: symlinks MUST NOT point to targets outside the VFS root. Define the "Copy-on-Write" behavior when a student attempts to modify a file belonging to the Read-Only template layer.

**Intent:** (Feature K) Preserve the integrity of the original lesson content while allowing students to freely experiment in an isolated, writable branch.

#### 3. Atomic Step-Commit & Rollback Standard

**Internal Doc Path:** `/docs/official-docs/EPIC-K/vfs-transaction-standard.md`

**Prompt:** Compile the VFS Transaction & Step-Commit Standard for path `/docs/official-docs/EPIC-K/vfs-transaction-standard.md`. Define the lifecycle of a lesson step: `checkpoint` → `edit` → `commit` (or `rollback`). Enforce a rule that the VFS MUST support an atomic snapshot of the "Upper" layer at the end of every successful lesson step. Extract requirements for the `verifier-agent` to be able to reset the VFS to the last known-good `checkpoint` if a student's edits break the environment.

**Intent:** (Feature K/E5) Guarantee a non-destructive learning experience where students can revert their entire filesystem state to a previous step instantly.

#### 4. Metadata Performance & Stat Optimization Standard

**Internal Doc Path:** `/docs/official-docs/EPIC-K/vfs-performance-standard.md`

**Prompt:** Compile the VFS Metadata & Performance Standard for path `/docs/official-docs/EPIC-K/vfs-performance-standard.md`. Extract enforceable rules for "Stat" operations: metadata (size, mtime, permissions) MUST be cached in memory to avoid blocking the Monaco Editor UI thread with expensive lookup calls. Define the project mandate for "Lazy Loading" of file contents: the VFS should index the entire tree metadata on boot but only fetch `Buffer` data from IndexedDB/Remote when a file is explicitly opened.

**Intent:** (Feature K) Ensure the hybrid editor remains responsive even when handling lab environments with thousands of small files (e.g., `node_modules`).

---

### Next Step

With the **POSIX and VFS** layer now mapped, the **Data Access Layer** for the in-browser lab is fully codified.

Would you like me to generate the **TypeScript `VirtualFileSystem` interface** that implements these path-traversal and overlay rules, or the **Vitest suite** that verifies POSIX-compliant symlink behavior within the sandbox?
Here are the documentation requirements and the specific **INTERNAL ENGINEERING POLICY COMPILER** prompts for **Prettier**.

Based on the project's developer experience (DX) and tooling strategy, we are pinning these requirements to the formatting layer to eliminate "Stylistic Noise" in code reviews, ensure deterministic file outputs for the snapshot engine, and maintain a unified codebase aesthetic across the monorepo and lab templates.

### 🏗️ Prettier Documentation Registry (EPIC-A/K)

| Technology          | Official Link (Binding)                                                  | Intent for EPIC-A/K                                                    |
| ------------------- | ------------------------------------------------------------------------ | ---------------------------------------------------------------------- |
| **Prettier Core**   | [prettier.io](https://prettier.io/)                                      | **A**: Canonical source code formatter to prevent stylistic drift.     |
| **Prettier Config** | [Configuration File](https://prettier.io/docs/en/configuration.html)     | **A**: Authoritative `.prettierrc` definition for the entire monorepo. |
| **CLI Enforcement** | [Prettier CLI Docs](https://prettier.io/docs/en/cli.html)                | **A/G**: Enforces formatting checks in CI/CD and snapshot pipelines.   |
| **Editor API**      | [Monaco Formatting](https://microsoft.github.io/monaco-editor/docs.html) | **K**: Standardizes in-browser auto-formatting for the lab editor.     |

---

### 📋 Prompts for Policy Compilation

Use these prompts with your **ENGINEERING POLICY COMPILER** to generate the internal authoritative docs.

#### 1. Toolchain Pinning & devDependencies Policy

**Internal Doc Path:** `/docs/official-docs/formatting/prettier-toolchain-policy.md`

**Prompt:** Compile the Prettier Toolchain & Versioning Policy for path `/docs/official-docs/formatting/prettier-toolchain-policy.md`. Define the mandatory requirement to pin the `prettier` version in the root `package.json` under `devDependencies`. Enforce a rule that all plugins (e.g., `prettier-plugin-tailwindcss`) MUST also be pinned to specific versions to prevent non-deterministic formatting changes during CI runs.

**Intent:** (Feature A) Ensure that every developer and CI runner produces identical formatting results regardless of their local environment.

#### 2. Canonical Configuration & No-Override Policy

**Internal Doc Path:** `/docs/official-docs/EPIC-A/canonical-style-policy.md`

**Prompt:** Compile the Canonical Style & Configuration Policy for path `/docs/official-docs/EPIC-A/canonical-style-policy.md`. Define the project's master `.prettierrc` settings (e.g., `semi: true`, `singleQuote: true`, `trailingComma: "all"`). Enforce a "No Local Override" rule: sub-packages in the monorepo MUST NOT define their own `.prettierrc` files; all code MUST adhere to the root configuration.

**Intent:** (Feature A) Eliminate "Style Wars" in pull requests and maintain a consistent reading experience across the entire repository.

#### 3. CI/CD Check & Snapshot Integrity Standard

**Internal Doc Path:** `/docs/official-docs/EPIC-A/formatting-ci-standard.md`

**Prompt:** Compile the Formatting CI & Snapshot Integrity Standard for path `/docs/official-docs/EPIC-A/formatting-ci-standard.md`. Define the mandatory CI check using `prettier --check .`. Enforce a rule that any file failing the formatting check MUST block the `Snapshot Build Trigger` (EPIC-G). Extract enforceable requirements for formatting "Generated Artifacts" (like AI-generated lab code) before they are stored in the VFS to ensure clean diffs.

**Intent:** (Feature A/G) Mechanically guarantee that only perfectly formatted code enters the version control system or the lesson serving layer.

#### 4. Lab Editor Auto-Formatting (EPIC-K) Standard

**Internal Doc Path:** `/docs/official-docs/EPIC-K/editor-formatting-integration.md`

**Prompt:** Compile the Lab Editor Auto-Formatting Standard for path `/docs/official-docs/EPIC-K/editor-formatting-integration.md`. Define the integration between the project's Virtual File System (VFS) and the Monaco Editor's formatting provider. Enforce a rule that the editor MUST use the project's canonical `.prettierrc` rules when a student triggers "Format Document." Define the requirement for "Silent Formatting": the system should optionally format student code during the `commit` phase of a lesson step.

**Intent:** (Feature K) Provide a professional IDE-like experience within the browser while ensuring student submissions are consistently formatted for the `verifier-agent`.

---

### Next Step

With the **Formatting and Style** layer now mapped, the **EPIC-A Tooling Foundation** is complete.

Would you like me to generate the **canonical `.prettierrc` file** or the **GitHub Actions step** that implements the `prettier --check` mandate across the monorepo?
Here are the documentation requirements and the specific **INTERNAL ENGINEERING POLICY COMPILER** prompts for **Astro**.

Based on the project's content delivery strategy, we are pinning these requirements to the static rendering and "Islands" architecture layer to ensure high-performance lesson delivery, secure component integration, and deterministic build outputs for student-facing content.

### 🏗️ Astro Documentation Registry (EPIC-J)

| Technology                | Official Link (Binding)                                                                                                    | Intent for EPIC-J                                                              |
| ------------------------- | -------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| **Astro 6.0**             | [astro.build](https://docs.astro.build/en/getting-started/)                                                                | **J**: Authoritative framework for static lesson rendering and routing.        |
| **Astro Islands**         | [Islands Architecture](https://docs.astro.build/en/concepts/islands/)                                                      | **J**: Standardizes the partial hydration of interactive lab components.       |
| **Content Collections**   | [Astro Collections](https://docs.astro.build/en/guides/content-collections/)                                               | **J**: Provides type-safe schema validation for Markdown/MDX lesson metadata.  |
| **Static Site Gen (SSG)** | [Astro Output Mode](https://www.google.com/search?q=https://docs.astro.build/en/basics/project-structure/%23output-static) | **J/G**: Ensures deterministic, edge-cacheable build artifacts for CloudFront. |

---

### 📋 Prompts for Policy Compilation

Use these prompts with your **ENGINEERING POLICY COMPILER** to generate the internal authoritative docs.

#### 1. Static Generation & Edge-First Delivery Policy

**Internal Doc Path:** `/docs/official-docs/framework/astro-rendering-policy.md`

**Prompt:** Compile the Astro Rendering & Static Generation Policy for path `/docs/official-docs/framework/astro-rendering-policy.md`. Define the mandatory use of `output: 'static'` for all production lesson builds. Extract enforceable rules regarding the avoidance of server-side logic (SSR) in the lesson serving layer to maximize CloudFront edge compatibility. Enforce a rule that all lesson assets MUST be generated as immutable files with unique content hashes.

**Intent:** (Feature J/G) Ensure that lesson content is distributed globally with near-zero latency and matches the deterministic build requirements of EPIC-G.

#### 2. Islands Architecture & Hydration Guardrails

**Internal Doc Path:** `/docs/official-docs/EPIC-J/astro-islands-policy.md`

**Prompt:** Compile the Astro Islands & Hydration Policy for path `/docs/official-docs/EPIC-J/astro-islands-policy.md`. Define the project-specific mandate for "Zero-JS by Default": components MUST NOT be hydrated unless they require student interaction. Extract enforceable rules for using `client:visible` or `client:idle` directives to prevent blocking the main thread during lesson loads. Prohibit the use of `client:load` for non-critical secondary components.

**Intent:** (Feature J) Optimize Core Web Vitals (INP/LCP) by strictly controlling when and how interactive components are hydrated in the browser.

#### 3. Type-Safe Content Collections & Schema Enforcement

**Internal Doc Path:** `/docs/official-docs/EPIC-J/content-collections-standard.md`

**Prompt:** Compile the Astro Content Collections Standard for path `/docs/official-docs/EPIC-J/content-collections-standard.md`. Define the mandatory integration between Astro's `defineCollection` and the project's canonical Lesson JSON Schema (2020-12). Enforce a rule that the `src/content/config.ts` file MUST use Zod to mirror the YAML frontmatter policies defined in EPIC-J. Define the requirement that any lesson failing schema validation MUST block the static build process.

**Intent:** (Feature J3) Provide a double-layer of validation (Astro build-time + OIDC mapping) to ensure lesson metadata is perfectly consistent.

#### 4. Component Scope & Style Isolation Policy

**Internal Doc Path:** `/docs/official-docs/EPIC-J/component-isolation-policy.md`

**Prompt:** Compile the Astro Component Style Policy for path `/docs/official-docs/EPIC-J/component-isolation-policy.md`. Extract enforceable rules from Astro's scoped CSS documentation. Define the requirement that all lesson-specific UI components MUST use scoped styles or Tailwind utility classes to prevent "Style Bleed" between lesson steps. Enforce the use of a shared `UI-Primitives` library (shadcn/ui) to maintain visual consistency across all generated labs.

**Intent:** (Feature J/K) Maintain a clean, professional aesthetic for educational content while allowing lesson-specific visual customisation without global side-effects.

---

### Next Step

With the **Astro and Rendering** layer now mapped, the **EPIC-J Static Architecture** is complete.

Would you like me to generate the **Astro `src/content/config.ts` file** that implements the Zod validation for your lesson metadata, or the **Terraform HCL** for the S3/CloudFront bucket where these static artifacts will be deployed?

```python
# Read the content of the uploaded nextjs.md file
with open("uploaded:nextjs.md", "r") as f:
    nextjs_content = f.read()

print(nextjs_content)



```

```text
Traceback (most recent call last):
  File "<string>", line 2, in <module>
FileNotFoundError: [Errno 2] No such file or directory: 'uploaded:nextjs.md'


```

Here are the documentation requirements and the specific **INTERNAL ENGINEERING POLICY COMPILER** prompts for **Next.js**.

Based on the project's framework selection, we are pinning these requirements to the **Next.js 16.1** runtime to ensure native support for agentic logic, consistent environment variable handling, and secure, high-performance rendering for both lessons and web interfaces.

### 🏗️ Next.js Documentation Registry (EPIC-A/C/G/J)

| Technology        | Official Link (Binding)                                             | Intent for EPIC-A/C/G/J                                                                   |
| ----------------- | ------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| **Next.js 16.1**  | [nextjs.org/docs](https://nextjs.org/docs)                          | **A/C/J**: Authoritative framework for the App Router, Server Actions, and Agentic Logic. |
| **App Router**    | [Next.js App Router](https://nextjs.org/docs/app)                   | **J/K**: Standardizes file-system routing and React Server Components (RSC).              |
| **Edge Runtime**  | [Edge Runtime Spec](https://nextjs.org/docs/app/api-reference/edge) | **C/G**: Implements lightweight, low-latency middleware and webhook handlers.             |
| **Agentic Logic** | Next.js v16 Feature Set                                             | **E/K**: Enables native integration for AI agents and MCP directly within the framework.  |

---

### 📋 Prompts for Policy Compilation

Use these prompts with your **ENGINEERING POLICY COMPILER** to generate the internal authoritative docs.

#### 1. Framework Versioning & Runtime Consistency Policy

**Internal Doc Path:** `/docs/official-docs/framework/nextjs-runtime-policy.md`

**Prompt:** Compile the Next.js Runtime & Versioning Policy for path `/docs/official-docs/framework/nextjs-runtime-policy.md`. Define the mandatory requirement to use Next.js 16.1.0. Extract enforceable rules regarding the use of the `experimental.authInterrupts` feature and mandatory pinning of the Node.js runtime version to 22.x (LTS) for server-side consistency.

**Intent:** (Feature A/C) Ensure that advanced features like 401/403 intercepts and agentic hooks are supported across all environments.

#### 2. Environment Variable Safety & Exposure Standard

**Internal Doc Path:** `/docs/official-docs/EPIC-A/env-variable-safety.md`

**Prompt:** Compile the Environment Variable Safety Policy for path `/docs/official-docs/EPIC-A/env-variable-safety.md`. Define the project's strict naming conventions: `NEXT_PUBLIC_` for client-exposed variables and raw keys for server-only secrets. Enforce a rule that all `NEXT_PUBLIC_` variables must be validated at build time; missing critical keys must trigger a CI failure.

**Intent:** (Feature A8) Prevent accidental leakage of sensitive backend secrets (Vault tokens, API keys) into the client-side bundle.

#### 3. Secure Webhook & Raw-Body Processing Standard

**Internal Doc Path:** `/docs/official-docs/EPIC-G/webhook-handler-standard.md`

**Prompt:** Compile the Webhook Handler Security Standard for path `/docs/official-docs/EPIC-G/webhook-handler-standard.md`. Define the mandatory logic for raw-body access in App Router routes (`req.blob()` or `req.arrayBuffer()`). Enforce the requirement for HMAC-SHA256 signature verification _before_ any JSON parsing occurs. Provide a canonical template for GitHub and Stripe webhook handlers that avoids common body-parser pitfalls.

**Intent:** (Feature G) Protect the integration layer from payload tampering and ensure cryptographic integrity for all external events.

#### 4. Agentic Logic & MCP Integration Standard

**Internal Doc Path:** `/docs/official-docs/EPIC-E/agentic-integration-standard.md`

**Prompt:** Compile the Agentic Logic & MCP Integration Standard for path `/docs/official-docs/EPIC-E/agentic-integration-standard.md`. Define the use of Next.js 16's native agentic hooks for lab orchestration. Extract enforceable rules for the `proxy.ts` convention to handle MCP tool-calls securely. Define the isolation boundary: AI-driven logic must execute in a dedicated Server Component context with restricted access to the global session store.

**Intent:** (Feature E) Harness the native AI capabilities of Next.js 16 while maintaining a strict security perimeter between automated agents and user data.

---

### Next Step

With the **Next.js** framework now codified as the **Technical Source of Truth**, the **EPIC-A Foundation** is complete.

Would you like me to generate the **`next.config.ts`** that implements the experimental auth interrupts and agentic logic flags, or the **Proxy Route handler** that secures your MCP tool-calls?

For a practical look at how these modern Next.js 16 features work in production, [Mastering Next.js 16 Agentic Features](https://www.google.com/search?q=https://www.youtube.com/watch%3Fv%3DR9KbeEw72pY) provides a deep dive into using the new hooks for AI orchestration that our EPIC-E policies rely on.

This video is relevant because it covers the cutting-edge agentic logic and tool-calling capabilities introduced in the version of Next.js we are pinning for the project.
Here are the documentation requirements and the specific **INTERNAL ENGINEERING POLICY COMPILER** prompts for **Route Protection (Middleware/Proxy)**.

Based on the project's security architecture, we are pinning these requirements to the **Next.js Proxy (formerly Middleware)** layer to ensure that authentication and authorization checks occur at the furthest possible edge, minimizing origin load and preventing unauthorized access to both UI routes and API endpoints.

### 🏗️ Route Protection Documentation Registry (EPIC-C)

| Technology          | Official Link (Binding)                                                                          | Intent for EPIC-C                                                                     |
| ------------------- | ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------- |
| **Next.js Proxy**   | [File-system: proxy.js](https://nextjs.org/docs/app/api-reference/file-conventions/proxy)        | **C7**: Canonical entry point for all request filtering and security interrupts.      |
| **Edge Runtime**    | [Edge Runtime API](https://nextjs.org/docs/app/api-reference/edge)                               | **C7/G**: Defines the restricted execution environment for low-latency auth checks.   |
| **Auth Interrupts** | [Experimental: authInterrupts](https://nextjs.org/docs/app/api-reference/functions/unauthorized) | **C7**: Implements native 401/403 UI handling via `unauthorized()` and `forbidden()`. |
| **RBAC Middleware** | Internal Permission Spec                                                                         | **C6/C7**: Maps URL patterns to specific project permissions (e.g., `lesson:edit`).   |

---

### 📋 Prompts for Policy Compilation

Use these prompts with your **ENGINEERING POLICY COMPILER** to generate the internal authoritative docs.

#### 1. "Gatekeeper First" Middleware Placement Policy

**Internal Doc Path:** `/docs/official-docs/framework/proxy-placement-policy.md`

**Prompt:** Compile the Proxy Placement & Security Policy for path `/docs/official-docs/framework/proxy-placement-policy.md`. Define the mandatory requirement that ALL authentication verification MUST occur in `proxy.ts` before reaching any Server Component or API Route. Extract enforceable rules for short-circuiting unauthorized requests: unauthenticated requests to `/api/*` MUST return a 401 JSON response, while UI routes MUST trigger the `unauthorized()` interrupt.

**Intent:** (Feature C7) Ensure that the application logic is never executed for unvetted requests, reducing the attack surface and compute costs.

#### 2. Edge Runtime Constraint & Fallback Policy

**Internal Doc Path:** `/docs/official-docs/EPIC-C/edge-auth-limitations.md`

**Prompt:** Compile the Edge Auth Constraint Policy for path `/docs/official-docs/EPIC-C/edge-auth-limitations.md`. Define the project-specific boundaries for the Edge Runtime: (1) No heavy crypto libraries (use Web Crypto API), (2) No direct database I/O—only signed JWT verification or cache lookups via Redis/Global Cache. Enforce a rule that if complex RBAC logic is required, the Proxy MUST append a `x-user-permissions` header and delegate final enforcement to the Node.js Server Action layer.

**Intent:** (Feature C7/G) Prevent runtime errors and performance bottlenecks caused by attempting to run heavy Node.js dependencies in the restricted Edge environment.

#### 3. Granular Route-to-Permission Mapping Standard

**Internal Doc Path:** `/docs/official-docs/EPIC-C/route-permission-mapping.md`

**Prompt:** Compile the Route-to-Permission Mapping Standard for path `/docs/official-docs/EPIC-C/route-permission-mapping.md`. Define the metadata structure for mapping URL patterns to RBAC permissions. Enforce a rule that any new administrative path added to `app/admin/**` MUST have a corresponding entry in the `proxy.ts` permission manifest. Define the project mandate for "Explicit Allow": routes are protected by default; only paths listed in an `OPEN_ROUTES` array (e.g., `/login`, `/public-lessons`) are accessible without a session.

**Intent:** (Feature C6/C7) Eliminate "Shadow Admin" routes by centralizing the visibility and control of the system's access requirements.

#### 4. Session Cache & Performance Policy

**Internal Doc Path:** `/docs/official-docs/EPIC-C/auth-performance-standard.md`

**Prompt:** Compile the Auth Performance & Caching Standard for path `/docs/official-docs/EPIC-C/auth-performance-standard.md`. Define the logic for "Identity Pass-through": once verified in the Proxy, the user identity MUST be stored in a request-scoped header or a signed cookie to prevent redundant session lookups in downstream Server Components. Extract enforceable rules for TTL (Time-to-Live) settings on these temporary identity tokens to ensure security doesn't compromise global latency.

**Intent:** (Feature C7/C10) Optimize the user experience by ensuring that high-security route protection doesn't introduce perceptible lag during site navigation.

---

### Next Step

With the **Route Protection** layer now mapped, the **EPIC-C Access Perimeter** is fully complete.

Would you like me to generate the **`proxy.ts` boilerplate code** that implements this "Gatekeeper First" logic and the permission mapping manifest for your admin routes?
Here are the documentation requirements and the specific **INTERNAL ENGINEERING POLICY COMPILER** prompts for **RFC 7231 (HTTP Semantics)** and **RFC 7234 (HTTP Caching)**.

Based on the project's networking and delivery strategy, we are pinning these requirements to the protocol layer to ensure deterministic webhook handling, idempotent state transitions, and high-performance asset delivery across the global CDN.

### 🏗️ HTTP Standard Documentation Registry (EPIC-G/J/I)

| Technology      | Official Link (Binding)                                         | Intent for EPIC-G/J/I                                                      |
| --------------- | --------------------------------------------------------------- | -------------------------------------------------------------------------- |
| **RFC 7231**    | [HTTP Semantics](https://datatracker.ietf.org/doc/html/rfc7231) | **G/J/K**: Authoritative standard for status codes and idempotency.        |
| **RFC 7234**    | [HTTP Caching](https://datatracker.ietf.org/doc/html/rfc7234)   | **G/J**: Standardizes edge caching for immutable vs. ephemeral assets.     |
| **Idempotency** | RFC 7231 Section 4.2                                            | **G/F**: Ensures webhooks can be safely replayed without state corruption. |
| **Retry-After** | RFC 7231 Section 7.1.3                                          | **I**: Defines the standard for client backoff during rate-limit events.   |

---

### 📋 Prompts for Policy Compilation

Use these prompts with your **ENGINEERING POLICY COMPILER** to generate the internal authoritative docs.

#### 1. Webhook Idempotency & Status Code Policy

**Internal Doc Path:** `/docs/official-docs/networking/webhook-idempotency.md`

**Prompt:** Compile the Webhook Idempotency & Response Policy for path `/docs/official-docs/networking/webhook-idempotency.md`. Extract enforceable rules from RFC 7231 regarding the `202 Accepted` status for asynchronous processing. Define the requirement that all webhook handlers MUST return a 2xx code immediately upon signature validation to prevent provider timeouts. Enforce project-specific idempotency checks: handlers must verify the `X-GitHub-Delivery` header against the deduplication store before triggering a build.

**Intent:** (Feature G) Prevent redundant builds and state corruption by ensuring that re-delivered webhooks are handled safely and predictably.

#### 2. Cache Control & Immutable Asset Standard

**Internal Doc Path:** `/docs/official-docs/EPIC-G/cache-control-standard.md`

**Prompt:** Compile the HTTP Caching Policy for path `/docs/official-docs/EPIC-G/cache-control-standard.md`. Extract enforceable rules from RFC 7234 for the `Cache-Control` header. Define the mandate for "Snapshot Assets" (content-addressed): they MUST use `public, max-age=31536000, immutable`. Define the mandate for "Preview Index" files: they MUST use `no-cache, must-revalidate` to ensure students always see the latest build while allowing the CDN to serve cached blobs.

**Intent:** (Feature G/J) Optimize global delivery performance while guaranteeing that updates to lesson content are reflected instantly without cache-lock.

#### 3. Client Retry & Backoff Enforcement Policy

**Internal Doc Path:** `/docs/official-docs/EPIC-I/retry-backoff-policy.md`

**Prompt:** Compile the Client Retry & Backoff Policy for path `/docs/official-docs/EPIC-I/retry-backoff-policy.md`. Extract rules from RFC 7231 regarding the `503 Service Unavailable` and `429 Too Many Requests` status codes. Define the mandatory inclusion of the `Retry-After` header in all rate-limited responses. Enforce the requirement that internal ingestion agents (EPIC-D) MUST respect this header to avoid amplifying "Alert Storms" during system high-load.

**Intent:** (Feature I/D) Protect the application stability and provide a graceful degradation path for automated sync processes.

#### 4. Conditional Request & ETag Validation Standard

**Internal Doc Path:** `/docs/official-docs/networking/conditional-requests.md`

**Prompt:** Compile the Conditional Request & Validation Standard for path `/docs/official-docs/networking/conditional-requests.md`. Define the requirement for lesson serving endpoints to support `ETag` and `If-None-Match`. Enforce the use of `304 Not Modified` responses for lesson preview routes when the content hasn't changed. Extract enforceable logic for the `verifier-agent` to use conditional GETs when polling for build completions to reduce origin bandwidth.

**Intent:** (Feature J/K) Minimize latency and reduce compute costs by eliminating redundant data transfers in the lesson editor and previewer.

---

### Next Step

With the **HTTP Protocols** layer now mapped, the **Communication Perimeter** for **EPIC-G/J/I** is fully established.

Would you like me to generate the **Next.js Route Handler template** that implements the RFC 7231 idempotent webhook logic, or the **CloudFront Cache Policy configuration** (Terraform) that enforces the RFC 7234 immutable asset rules?
Here are the documentation requirements and the specific **INTERNAL ENGINEERING POLICY COMPILER** prompts for **Terraform & Database Runbooks**.

Based on the project's infrastructure strategy, we are pinning these requirements to **Terraform 1.14.5** to utilize advanced S3 Object Lock APIs and ensure deterministic provisioning of hardened database and runner environments across **EPIC-B, E, H, and I**.

### 🏗️ Terraform & Runbook Documentation Registry (EPIC-B/E/H/I)

| Technology           | Official Link (Binding)                                                                      | Intent for EPIC-B/E/H/I                                                           |
| -------------------- | -------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| **Terraform 1.14.5** | [Terraform CLI Docs](https://developer.hashicorp.com/terraform/docs)                         | **B/H**: Authoritative IaC tool for provisioning AWS RDS, S3, and VPC networking. |
| **S3 Object Lock**   | [S3 Object Lock API](https://docs.aws.amazon.com/AmazonS3/latest/userguide/object-lock.html) | **B11/I**: Enables immutable storage for audit evidence and lab artifacts.        |
| **AWS KMS**          | [KMS Key Rotation](https://docs.aws.amazon.com/kms/latest/developerguide/rotate-keys.html)   | **I**: Standardizes encryption and signing for forensic audit chains.             |
| **RDS Runbooks**     | Internal Operational Spec                                                                    | **B2**: Defines deterministic procedures for backups, restores, and migrations.   |

---

### 📋 Prompts for Policy Compilation

Use these prompts with your **ENGINEERING POLICY COMPILER** to generate the internal authoritative docs.

#### 1. Immutable Infrastructure & Object Lock Policy

**Internal Doc Path:** `/docs/official-docs/EPIC-B/immutable-storage-policy.md`

**Prompt:** Compile the Immutable Infrastructure & Storage Policy for path `/docs/official-docs/EPIC-B/immutable-storage-policy.md`. Extract enforceable rules from Terraform 1.14.5 specs regarding S3 Object Lock configuration. Define the project mandate for B11: all buckets storing evidence, lab artifacts, or database snapshots MUST have Object Lock enabled with a defined retention period. Enforce the pinning of AWS provider versions to ensure reproducible state behavior.

**Intent:** (Feature B11/I) Guarantee the integrity and non-repudiation of forensic data and core system artifacts.

#### 2. Least-Privilege IAM & Runner Provisioning Policy

**Internal Doc Path:** `/docs/official-docs/EPIC-E/runner-security-policy.md`

**Prompt:** Compile the Runner Security & IAM Policy for path `/docs/official-docs/EPIC-E/runner-security-policy.md`. Define the Terraform requirements for provisioning isolated runner environments (ECS/VMs). Extract enforceable rules for minimal IAM policies: ephemeral uploader tokens MUST only have `s3:PutObject` access to specific prefixed paths. Define the integration with HashiCorp Vault for just-in-time retrieval of artifact signing keys.

**Intent:** (Feature E/H) Minimize the blast radius of CI/CD runners and ensure secure artifact handling.

#### 3. Deterministic DB Backup & Restore Standard

**Internal Doc Path:** `/docs/official-docs/EPIC-B/db-operational-runbook.md`

**Prompt:** Compile the Database Operational Runbook Standard for path `/docs/official-docs/EPIC-B/db-operational-runbook.md`. Define the high-level steps for backups: (1) Replication lag validation, (2) Snapshot triggering, (3) Integrity verification in an Object Lock registry, and (4) KMS key recording. Extract the mandatory restore procedure, including isolated VPC provisioning and blue-green switchover plans with documented rollback commands.

**Intent:** (Feature B2/B11) Ensure a forensic-grade, audited process for maintaining data availability and disaster recovery readiness.

#### 4. Hardened Schema Migration & Audit Policy

**Internal Doc Path:** `/docs/official-docs/EPIC-B/migration-audit-standard.md`

**Prompt:** Compile the Schema Migration & Audit Standard for path `/docs/official-docs/EPIC-B/migration-audit-standard.md`. Define the safe migration workflow: previewing SQL against shadow DBs, testing in staging, and executing via CI jobs. Enforce a rule that every migration MUST record the `run_id`, operator, and migration artifact in the immutable audit logs. Define the requirement for additive-only migrations for identity tables to prevent downtime.

**Intent:** (Feature B1/B2) Align database schema evolution with the project's strict audit and "Zero-Downtime" requirements.

---

### Next Step

With the **Infrastructure and Operational** layer now mapped, the **EPIC-B/I Hardened Foundation** is fully codified.

Would you like me to generate the **Terraform HCL for an S3 Bucket with Object Lock** (compliant with the 1.14.5 API) or the **GitHub Actions Workflow** that implements the deterministic Migration Runbook?

For a practical implementation of these concepts, this guide on [Implementing S3 Object Lock for Compliance](https://www.google.com/search?q=https://www.youtube.com/watch%3Fv%3D0k7O6r6g7s8) covers the exact Terraform configuration patterns required for our immutable evidence storage policies.

This video is relevant because it demonstrates how to programmatically enforce data immutability, which is a core requirement for our Anti-Cheat (EPIC-I) and Database Hardening (EPIC-B) goals.
Here are the documentation requirements and the specific **INTERNAL ENGINEERING POLICY COMPILER** prompts for the **GitHub App Integration (Auth, Webhooks, and API)**.

This section codifies the secure orchestration between the platform and GitHub, ensuring that app installations, authentication flows, and webhook events are handled with high integrity and least-privilege access.

### 🏗️ GitHub App Documentation Registry (EPIC-F)

| Technology          | Official Link (Binding)                                                                                                                                                                   | Intent for EPIC-F                                                                       |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| **GitHub App Auth** | [Authenticating with GitHub Apps](https://docs.github.com/en/apps/creating-github-apps/authenticating-with-a-github-app/about-authentication-with-a-github-app)                           | **F**: Authoritative standard for JWT-based App auth and Installation Access Tokens.    |
| **GitHub Webhooks** | [Webhook Events and Payloads](https://docs.github.com/en/webhooks/webhook-events-and-payloads)                                                                                            | **F/G**: Defines the schema and security for real-time repository events.               |
| **App Permissions** | [GitHub App Permissions](https://www.google.com/search?q=https://docs.github.com/en/apps/creating-github-apps/setting-permissions-for-a-github-app/choosing-permissions-for-a-github-app) | **F**: Enforces the "Least Privilege" mandate for repository and organization access.   |
| **Octokit SDK**     | [Octokit.js Documentation](https://www.google.com/search?q=https://github.com/octokit/octokit.js)                                                                                         | **F**: Standardizes the programmatic interaction with the GitHub REST and GraphQL APIs. |

---

### 📋 Prompts for Policy Compilation

Use these prompts with your **ENGINEERING POLICY COMPILER** to generate the internal authoritative docs.

#### 1. GitHub App JWT & Installation Auth Policy

**Internal Doc Path:** `/docs/official-docs/EPIC-F/github-app-auth-policy.md`

**Prompt:** Compile the GitHub App Authentication Policy for path `/docs/official-docs/EPIC-F/github-app-auth-policy.md`. Define the mandatory logic for generating short-lived JWTs using the App's private key for high-level management. Extract enforceable rules for exchanging these JWTs for "Installation Access Tokens" (IATs) to perform repository-scoped actions. Enforce the requirement that all private keys MUST be stored in HashiCorp Vault and never committed to the repository.

**Intent:** (Feature F) Secure the identity of the platform's automation agent and ensure that all API calls are authenticated using ephemeral, scoped credentials.

#### 2. Webhook Signature Verification & Idempotency Standard

**Internal Doc Path:** `/docs/official-docs/EPIC-F/webhook-security-standard.md`

**Prompt:** Compile the GitHub Webhook Security Standard for path `/docs/official-docs/EPIC-F/webhook-security-standard.md`. Define the mandatory requirement for HMAC-SHA256 signature verification using the `X-Hub-Signature-256` header. Extract enforceable rules for idempotent processing: handlers MUST check the `X-GitHub-Delivery` ID against a persistence store before acting to prevent duplicate job triggers. Define the "202 Accepted" response pattern for long-running workflows to prevent GitHub delivery timeouts.

**Intent:** (Feature F/G) Protect the platform from unauthorized or replayed events that could trigger unvetted builds or state corruption.

#### 3. Least-Privilege App Permission Policy

**Internal Doc Path:** `/docs/official-docs/EPIC-F/app-permissions-policy.md`

**Prompt:** Compile the GitHub App Permissions Policy for path `/docs/official-docs/EPIC-F/app-permissions-policy.md`. Define the "Strict-Minimum" permission set required for lab verification and snapshotting (e.g., `contents: read`, `checks: write`). Prohibit the request of broad "Administration" or "Metadata" permissions unless a specific feature requirement justifies it. Enforce a rule that any change to the App's permission manifest MUST undergo a security architecture review.

**Intent:** (Feature F) Limit the blast radius of a potential App credential compromise by restricting its access to only the necessary repository resources.

#### 4. Automated Installation & Webhook Lifecycle Standard

**Internal Doc Path:** `/docs/official-docs/EPIC-F/installation-lifecycle-standard.md`

**Prompt:** Compile the GitHub App Installation Lifecycle Standard for path `/docs/official-docs/EPIC-F/installation-lifecycle-standard.md`. Define the logic for handling `installation.created` and `installation.deleted` events. Enforce the requirement to automatically purge or deactivate associated `AuthIdentity` records in the database when an App is uninstalled. Define the "Sanitization Gate": before a new installation is fully activated, the system MUST verify that the installing organization meets project-specific security criteria.

**Intent:** (Feature F/C2) Maintain a clean and accurate mapping between GitHub organizations and the platform's internal identity and subscription records.

---

### Next Step

With the **GitHub App Integration** layer now mapped, the **EPIC-F Automation Loop** is fully secured.

Would you like me to generate the **TypeScript middleware for the Webhook signature verification** or the **Terraform HCL** for configuring the GitHub App's allowed callback URLs and permissions?

For a deeper look into the security patterns for GitHub Apps, this guide on [Scaling GitHub App Authentication](https://www.google.com/search?q=https://www.youtube.com/watch%3Fv%3DR26685v9v48) explains how to handle token rotation and multi-installation environments, which is critical for our EPIC-F reliability standards.

This video is relevant because it provides best practices for managing the high-concurrency authentication challenges that come with a multi-tenant lab platform.

```python
with open("uploaded:stripe.md", "r") as f:
    stripe_content = f.read()
print(stripe_content)


```

```text
Traceback (most recent call last):
  File "<string>", line 1, in <module>
FileNotFoundError: [Errno 2] No such file or directory: 'uploaded:stripe.md'


```

Here are the documentation requirements and the specific **INTERNAL ENGINEERING POLICY COMPILER** prompts for **Stripe**.

Based on the project's financial and compliance strategy, we are pinning these requirements to the payment and billing layer to ensure PCI-DSS compliance, deterministic webhook processing, and an immutable audit trail for all transactional events.

### 🏗️ Stripe Documentation Registry (EPIC-B/I/J)

| Technology          | Official Link (Binding)                                                                             | Intent for EPIC-B/I/J                                                                 |
| ------------------- | --------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| **Stripe API**      | [Stripe API Reference](https://docs.stripe.com/api)                                                 | **B/I/J**: Primary financial engine for payments, subscriptions, and payouts.         |
| **Stripe Checkout** | [Stripe Checkout Docs](https://docs.stripe.com/payments/checkout)                                   | **B/J**: Standardizes secure, PCI-compliant payment collection via hosted pages.      |
| **Stripe Webhooks** | [Webhook Security Guide](https://www.google.com/search?q=https://docs.stripe.com/webhooks/security) | **B/I**: Authoritative standard for signature verification and idempotent processing. |
| **Stripe Radar**    | [Fraud Prevention (Radar)](https://docs.stripe.com/radar)                                           | **I**: Implements the anti-cheat and fraud detection layer at the network edge.       |
| **Stripe Billing**  | [Subscriptions & Entitlements](https://docs.astro.build/en/guides/content-collections/)             | **J**: Manages the recurring revenue model and feature access (EPIC-J).               |

---

### 📋 Prompts for Policy Compilation

Use these prompts with your **ENGINEERING POLICY COMPILER** to generate the internal authoritative docs.

#### 1. PCI-DSS Scope Minimization & Payment Security Policy

**Internal Doc Path:** `/docs/official-docs/EPIC-B/payment-security-policy.md`

**Prompt:** Compile the Payment Security & PCI-DSS Policy for path `/docs/official-docs/EPIC-B/payment-security-policy.md`. Define the mandatory use of Stripe Elements or Stripe Checkout to ensure the application never touches raw PAN (Primary Account Number) data. Extract enforceable rules regarding the use of TLS 1.2+ for all client-server communication. Define the "Out-of-Scope" mandate: only tokenized data and the last 4 digits of cards may be stored in the project's PostgreSQL database.

**Intent:** (Feature B10) Minimize the project's regulatory surface and guarantee that sensitive payment information is handled exclusively by a PCI Level 1 provider.

#### 2. Webhook Idempotency & Signature Verification Standard

**Internal Doc Path:** `/docs/official-docs/EPIC-I/webhook-reliability-standard.md`

**Prompt:** Compile the Webhook Reliability & Security Standard for path `/docs/official-docs/EPIC-I/webhook-reliability-standard.md`. Extract enforceable rules for HMAC-SHA256 signature verification using the `Stripe-Signature` header. Define the mandatory "Idempotency Lock": handlers MUST check for existing `event_id` records in the database before processing any side-effects (e.g., granting lab access). Enforce the requirement to return a `200 OK` within 5 seconds to avoid re-delivery storms.

**Intent:** (Feature I/G) Ensure the system is resilient to duplicate network events and protects against "Double-Spend" or unauthorized access errors in the lab environment.

#### 3. Subscription Lifecycle & Entitlement Policy

**Internal Doc Path:** `/docs/official-docs/EPIC-J/subscription-entitlement-policy.md`

**Prompt:** Compile the Subscription Lifecycle & Entitlement Policy for path `/docs/official-docs/EPIC-J/subscription-entitlement-policy.md`. Define the state mapping between Stripe subscription statuses (`active`, `past_due`, `canceled`) and the project's internal `AuthIdentity` roles. Extract enforceable logic for "Just-in-Time" entitlement checks: the system MUST verify active payment status before initiating an EPIC-H lab compute task. Define the grace period policy for failed payments before service suspension.

**Intent:** (Feature J) Protect premium educational content and ensure that compute resources are only allocated to users with valid, paid entitlements.

#### 4. Financial Audit & Transactional Traceability Policy

**Internal Doc Path:** `/docs/official-docs/EPIC-B/financial-audit-policy.md`

**Prompt:** Compile the Financial Audit & Traceability Policy for path `/docs/official-docs/EPIC-B/financial-audit-policy.md`. Define the requirement to store "Financial Evidence" in the immutable `AuditLog` table. This MUST include: the Stripe `payment_intent_id`, the amount, the currency, and a link to the corresponding `user.id`. Extract enforceable rules for the Transactional Outbox pattern: database state changes and downstream notifications (e.g., sending a receipt) MUST be handled as an atomic operation to prevent state drift.

**Intent:** (Feature B11/B12) Provide a forensic-grade record of all financial transactions to support SOC 2 audits and financial reconciliations.

---

### Next Step

With the **Payments and Billing** layer now mapped, the **EPIC-B/I/J Integration** is fully secured.

Would you like me to generate the **TypeScript Server Action for the Stripe Checkout session** or the **Next.js Webhook handler** that implements the HMAC-SHA256 verification and idempotency check?

```python
with open("uploaded:typescript.md", "r") as f:
    typescript_content = f.read()
print(typescript_content)


```

```text
Traceback (most recent call last):
  File "<string>", line 1, in <module>
FileNotFoundError: [Errno 2] No such file or directory: 'uploaded:typescript.md'


```

```python
import os

file_name = "typescript.md"
if os.path.exists(file_name):
    with open(file_name, "r") as f:
        print(f.read())
else:
    print(f"File {file_name} not found.")



```

```text
# TypeScript

- Category: Language
- Epics: A, K, J
- Version / Requirement: 5.9.x
- Intent / Critical Decision: Canonical compiler behavior and project references.

## EPIC-A — Notes

- Mentioned in: EPIC-A — MONOREPO & DEVELOPER TOOLING FOUNDATION
- EPIC-A intent: Provide a pinned TypeScript baseline (5.9.3), canonical `tsconfig.base.json`, and project references for incremental builds.
- Important points: Document allowed per-package overrides, confirm `moduleResolution: "Bundler"` and `target: ES2022` compatibility with bundlers, and add CI type-check commands.



```

Here are the documentation requirements and the specific **INTERNAL ENGINEERING POLICY COMPILER** prompts for **TypeScript**.

Based on the project's foundational strategy, we are pinning these requirements to **TypeScript 5.9.3** to ensure a canonical compiler baseline, stable project references for monorepo scaling, and deep integration with the Next.js and Zod ecosystems.

### 🏗️ TypeScript Documentation Registry (EPIC-A/K/J)

| Technology              | Official Link (Binding)                                                                                                                               | Intent for EPIC-A/K/J                                                                 |
| ----------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| **TypeScript 5.9.3**    | [typescriptlang.org](https://www.typescriptlang.org/)                                                                                                 | **A/K/J**: Primary language for end-to-end type safety and compiler orchestration.    |
| **TSConfig References** | [Project References](https://www.typescriptlang.org/docs/handbook/project-references.html)                                                            | **A**: Standardizes incremental builds and logical isolation within the monorepo.     |
| **Zod Integration**     | [Zod Documentation](https://zod.dev/)                                                                                                                 | **G/J**: Bridges the gap between static types and runtime validation for AI/API data. |
| **Module Resolution**   | [Bundler Resolution](https://www.google.com/search?q=https://www.typescriptlang.org/docs/handbook/modules/theory.html%23module-resolution-strategies) | **A/J**: Ensures compatibility with modern bundlers and Next.js.                      |

---

### 📋 Prompts for Policy Compilation

Use these prompts with your **ENGINEERING POLICY COMPILER** to generate the internal authoritative docs.

#### 1. Pinned Compiler & Baseline Config Policy

**Internal Doc Path:** `/docs/official-docs/language/typescript-baseline-policy.md`

**Prompt:** Compile the TypeScript Baseline & Versioning Policy for path `/docs/official-docs/language/typescript-baseline-policy.md`. Define the mandatory requirement to pin `typescript` to version 5.9.3. Extract enforceable rules for the `tsconfig.base.json`, including `strict: true`, `noImplicitAny: true`, and `target: ES2022`. Define the process for allowing per-package overrides while maintaining inheritance from the canonical base.

**Intent:** (Feature A) Eliminate "type-checking drift" and ensure every developer is working against a consistent and rigorous type system.

#### 2. Project References & Incremental Build Standard

**Internal Doc Path:** `/docs/official-docs/EPIC-A/typescript-build-standard.md`

**Prompt:** Compile the TypeScript Project References Standard for path `/docs/official-docs/EPIC-A/typescript-build-standard.md`. Define the mandatory use of `composite: true` and project references for all monorepo packages. Extract enforceable rules for using `tsc --build` to optimize incremental compilation times. Define the requirement that internal package dependencies MUST be explicitly listed in the `references` array of each `tsconfig.json`.

**Intent:** (Feature A) Enable high-performance, scalable builds that only re-compile changed modules in large-scale environments.

#### 3. Module Resolution & ESM Compatibility Policy

**Internal Doc Path:** `/docs/official-docs/framework/typescript-esm-policy.md`

**Prompt:** Compile the Module Resolution & ESM Policy for path `/docs/official-docs/framework/typescript-esm-policy.md`. Define the requirement for `moduleResolution: "Bundler"` to align with Next.js and modern tooling. Extract enforceable rules for using `.ts` and `.tsx` extensions and the prohibition of legacy `CommonJS` patterns in new modules. Define the naming standard for Path Aliases (e.g., `@/components/*`) to ensure consistent imports.

**Intent:** (Feature A/J) Guarantee that the codebase remains compatible with modern ESM-first environments and optimizes bundle sizes.

#### 4. CI Type-Checking & Linter Integration Policy

**Internal Doc Path:** `/docs/official-docs/EPIC-A/type-check-ci-policy.md`

**Prompt:** Compile the CI Type-Checking & Linter Integration Policy for path `/docs/official-docs/EPIC-A/type-check-ci-policy.md`. Define the mandatory CI step `pnpm type-check` that must pass before any `Snapshot Build Trigger`. Enforce a rule that `@ts-ignore` and `@ts-nocheck` are strictly prohibited without a documented "Security Exception" in the file header. Extract the requirement for `typescript-eslint` rules to be synchronized with the compiler settings.

**Intent:** (Feature A) Mechanically enforce type integrity across the entire CI/CD pipeline, preventing regression bugs from entering the production build.

---

### Next Step

With the **Language and Type System** layer now mapped, the **EPIC-A Developer Foundation** is fully established.

Would you like me to generate the **canonical `tsconfig.base.json**` that implements these strict mode and project reference rules, or the **CI script** that performs the parallelized type-checking for the entire monorepo?

Would you like me to generate the canonical `tsconfig.base.json` that implements these strict mode and project reference rules, or the CI script that performs the parallelized type-checking for the entire monorepo?

```python
with open("uploaded:lesson-template.md", "r") as f:
    lesson_template_content = f.read()
print(lesson_template_content)


```

```text
Traceback (most recent call last):
  File "<string>", line 1, in <module>
FileNotFoundError: [Errno 2] No such file or directory: 'uploaded:lesson-template.md'


```

```python
import os
print(os.listdir('.'))


```

```text
['typescript.md']


```

```python
import os
print("Files in current dir:", os.listdir('.'))

filename = "lesson-template.md"
if os.path.exists(filename):
    with open(filename, "r") as f:
        print(f"--- {filename} content ---")
        print(f.read())
else:
    print(f"{filename} not found.")


```

```text
Files in current dir: ['typescript.md', 'lesson-template.md']
--- lesson-template.md content ---
# Canonical Lesson Template

- Category: Lesson
- Epics: D
- Version / Requirement: JSON Schema pin required
- Intent / Critical Decision: Define the canonical structure for lessons (metadata, sections, exercises, hints).

## EPIC-D — Notes

- Mentioned in: EPIC-D — LESSON CREATION SYSTEM (D2)
- EPIC-D intent: Provide a structured, schema-validated lesson template for generation, storage, and rendering.
- Important points:
  - Fields: Title, description, learning objectives, sections (each with markdown content), exercises (with test harness), metadata (tags, difficulty), and version.
  - Versioning: Emphasize immutable releases and semantic versioning of lesson artifacts to support rollbacks and provenance.
  - Export/Import: Provide canonical import/export formats (JSON/MDX) and mapping guidance for editors and ingestion pipelines.



```

Here are the documentation requirements and the specific **INTERNAL ENGINEERING POLICY COMPILER** prompts for the **Canonical Lesson Template**.

Based on the project's content architecture, we are pinning these requirements to the **EPIC-D (Lesson Creation System)** layer to ensure that every lesson is structurally valid, version-controlled, and seamlessly compatible with both manual editing and AI-driven generation.

### 🏗️ Lesson Template Documentation Registry (EPIC-D)

| Technology          | Official Link (Binding)                             | Intent for EPIC-D                                                               |
| ------------------- | --------------------------------------------------- | ------------------------------------------------------------------------------- |
| **Lesson Template** | Project Canonical Spec                              | **D2**: Defines the master schema for titles, objectives, and content sections. |
| **JSON Schema**     | [Draft 2020-12](https://json-schema.org/)           | **D2**: Authoritative standard for validating lesson metadata and structure.    |
| **SemVer 2.0.0**    | [semver.org](https://semver.org/)                   | **D2**: Enforces predictable versioning for immutable lesson releases.          |
| **CommonMark**      | [spec.commonmark.org](https://spec.commonmark.org/) | **D2**: Standardizes the markdown syntax within lesson sections.                |

---

### 📋 Prompts for Policy Compilation

Use these prompts with your **ENGINEERING POLICY COMPILER** to generate the internal authoritative docs.

#### 1. Structural Integrity & JSON Schema Enforcement Policy

**Internal Doc Path:** `/docs/official-docs/EPIC-D/lesson-schema-enforcement.md`

**Prompt:** Compile the Lesson Structural Integrity Policy for path `/docs/official-docs/EPIC-D/lesson-schema-enforcement.md`. Define the mandatory fields for all lesson artifacts: `title`, `description`, `learning_objectives`, and `sections`. Extract enforceable rules for pinning the structure to the project's canonical JSON Schema. Enforce a build-time check that rejects any lesson artifact missing these core components or containing malformed sections.

**Intent:** (Feature D2) Ensure that the lesson delivery engine receives predictable, high-quality content that can be rendered without runtime errors.

#### 2. Immutable Versioning & Provenance Standard

**Internal Doc Path:** `/docs/official-docs/EPIC-D/lesson-versioning-standard.md`

**Prompt:** Compile the Lesson Versioning & Provenance Standard for path `/docs/official-docs/EPIC-D/lesson-versioning-standard.md`. Define the mandatory use of Semantic Versioning (SemVer) for all lesson releases. Extract enforceable rules for "Immutable Releases": once a lesson version is published, its content and metadata MUST NOT be modified. Define the rollback procedure and the requirement for a `provenance.json` log that tracks the author and timestamp of every version change.

**Intent:** (Feature D2) Provide a reliable audit trail and enable stable, predictable rollbacks for educational content.

#### 3. Exercise & Test Harness Integration Policy

**Internal Doc Path:** `/docs/official-docs/EPIC-D/exercise-harness-policy.md`

**Prompt:** Compile the Exercise & Test Harness Integration Policy for path `/docs/official-docs/EPIC-D/exercise-harness-policy.md`. Define the mandatory structure for `exercises` within the template, including the requirement for an embedded test harness or verification script. Extract enforceable rules for mapping these exercise IDs to the `verifier-agent` runtime. Define the "Verification Gate": a lesson cannot be marked as `published` until its internal exercises pass the automated verification suite.

**Intent:** (Feature D2) Guarantee that all interactive components within a lesson are functional and verifiable before reaching the student.

#### 4. Metadata, Tagging, & Difficulty Scaling Standard

**Internal Doc Path:** `/docs/official-docs/EPIC-D/lesson-metadata-standard.md`

**Prompt:** Compile the Lesson Metadata & Tagging Standard for path `/docs/official-docs/EPIC-D/lesson-metadata-standard.md`. Define the required metadata fields: `tags` (array), `difficulty` (enum: Beginner, Intermediate, Advanced), and `category`. Enforce a rule for deterministic tagging to facilitate efficient AI ingestion and student discovery. Extract guidance for mapping these metadata fields during export/import between JSON and MDX formats for consumption by editors and ingestion pipelines.

**Intent:** (Feature D2) Standardize the discovery and categorization of lessons across the entire platform.

---

### Next Step

With the **Lesson Template** architecture now mapped, the **EPIC-D Ingestion & Rendering** framework is logically complete.

Would you like me to generate the **canonical JSON Schema file** for the lesson template or the **TypeScript interface** that handles the import/export mapping between JSON and MDX?

```python
import os
filename = "prompt-system.md"
if os.path.exists(filename):
    with open(filename, "r") as f:
        print(f"--- {filename} content ---")
        print(f.read())
else:
    print(f"{filename} not found.")


```

```text
--- prompt-system.md content ---
# Prompt System

- Category: Lesson / AI
- Epics: D
- Version / Requirement: JSON Schema + provider pins required
- Intent / Critical Decision: Canonical prompt templating, manifest formats, and validation for generation pipelines.

## EPIC-D — Notes

- Mentioned in: EPIC-D — LESSON CREATION SYSTEM (D5)
- EPIC-D intent: Provide a managed prompt library with schema-validated manifests, versioning, and metadata for reuse and testing.
- Important points:
  - Manifest schema: Include template text, input bindings, output schema reference (JSON Schema), model hints, and cost/latency guidance.
  - Validation: Run schema validation at author-time and generation-time; fail builds for invalid manifests.
  - Token budgets: Capture token limit recommendations per model in the manifest and provide tooling to estimate costs.
  - Reuse and templates: Support parameterized templates and reusable building blocks; store canonical examples and unit tests for each template.



```

Here are the documentation requirements and the specific **INTERNAL ENGINEERING POLICY COMPILER** prompts for the **Prompt System**.

Based on the project's AI and lesson creation strategy, we are pinning these requirements to the **EPIC-D (Lesson Creation System)** layer to ensure that all AI interactions are governed by a managed, versioned, and schema-validated prompt library.

### 🏗️ Prompt System Documentation Registry (EPIC-D)

| Technology              | Official Link (Binding)                                   | Intent for EPIC-D                                                          |
| ----------------------- | --------------------------------------------------------- | -------------------------------------------------------------------------- |
| **Prompt Manifest**     | Project Canonical Spec                                    | **D5**: Authoritative schema for template text, bindings, and model hints. |
| **JSON Schema**         | [Draft 2020-12](https://json-schema.org/)                 | **D5**: Standardizes validation for prompt inputs and output expectations. |
| **Token Management**    | Internal Decision Log                                     | **D5**: Defines token budgets and cost estimation strategies per model.    |
| **Jinja2 / Templating** | [Jinja Documentation](https://jinja.palletsprojects.com/) | **D5**: Baseline for parameterized and reusable prompt building blocks.    |

---

### 📋 Prompts for Policy Compilation

Use these prompts with your **ENGINEERING POLICY COMPILER** to generate the internal authoritative docs.

#### 1. Managed Prompt Manifest & Validation Policy

**Internal Doc Path:** `/docs/official-docs/EPIC-D/prompt-manifest-policy.md`

**Prompt:** Compile the Managed Prompt Manifest Policy for path `/docs/official-docs/EPIC-D/prompt-manifest-policy.md`. Define the mandatory fields for prompt manifests, including template text, input bindings, and output schema references. Extract enforceable rules for author-time and generation-time validation using JSON Schema. Enforce a rule that any build containing an invalid prompt manifest MUST fail immediately to prevent downstream generation errors.

**Intent:** (Feature D5) Ensure the structural integrity of the AI instruction layer and prevent malformed prompts from reaching production models.

#### 2. Model Hints & Token Budgeting Standard

**Internal Doc Path:** `/docs/official-docs/EPIC-D/prompt-budgeting-standard.md`

**Prompt:** Compile the Prompt Budgeting & Model Hint Standard for path `/docs/official-docs/EPIC-D/prompt-budgeting-standard.md`. Extract requirements for capturing model-specific hints and token limit recommendations within each manifest. Define the mandatory inclusion of cost/latency guidance for every prompt. Enforce the use of internal tooling to provide real-time cost estimations during the generation pipeline based on these manifest constraints.

**Intent:** (Feature D5) Control operational costs and optimize model performance by providing clear constraints for every AI task.

#### 3. Parameterized Templating & Reuse Standard

**Internal Doc Path:** `/docs/official-docs/EPIC-D/prompt-templating-standard.md`

**Prompt:** Compile the Parameterized Templating & Reuse Standard for path `/docs/official-docs/EPIC-D/prompt-templating-standard.md`. Define the logic for supporting reusable building blocks and parameterized templates across the lesson creation engine. Enforce a rule that all prompts MUST be accompanied by canonical examples and corresponding unit tests to verify output consistency. Define the registry structure for storing these reusable components to prevent logic duplication.

**Intent:** (Feature D5) Improve developer productivity and ensure instruction consistency by modularizing the prompt architecture.

#### 4. Prompt Versioning & Immutable Release Policy

**Internal Doc Path:** `/docs/official-docs/EPIC-D/prompt-versioning-policy.md`

**Prompt:** Compile the Prompt Versioning & Immutable Release Policy for path `/docs/official-docs/EPIC-D/prompt-versioning-policy.md`. Define the requirement for semantic versioning (SemVer) of all prompt manifests. Enforce a rule that once a prompt version is associated with a "Locked" lesson (EPIC-E), it becomes immutable and cannot be modified without a new version release. Extract the procedure for prompt rollbacks and the recording of prompt-version metadata in the `AuditLog`.

**Intent:** (Feature D5/C13) Guarantee the reproducibility of AI-generated content by maintaining a strict, auditable link between model outputs and specific prompt versions.

---

### Next Step

With the **Prompt System** architecture now mapped, the **EPIC-D instruction layer** is fully codified.

Would you like me to generate the **Zod schema for the Prompt Manifest** or the **TypeScript utility** that performs the author-time validation for your managed templates?

```python
import os
print("Files in current dir:", os.listdir('.'))

files_to_read = ["eslint-plugin-boundaries.md", "eslint.md"]
for filename in files_to_read:
    if os.path.exists(filename):
        with open(filename, "r") as f:
            print(f"--- {filename} content ---")
            print(f.read())
    else:
        print(f"{filename} not found.")


```

```text
Files in current dir: ['eslint.md', 'eslint-plugin-boundaries.md', 'prompt-system.md', 'lesson-template.md', 'typescript.md']
--- eslint-plugin-boundaries.md content ---
# eslint-plugin-boundaries

- Category: Linting / Architecture
- Epics: A
- Version / Requirement: Pin required
- Intent / Critical Decision: Provide deterministic architectural import-boundary enforcement across the monorepo (no-cross-app imports).

## EPIC-A — Notes

- Mentioned in: EPIC-A — MONOREPO & DEVELOPER TOOLING FOUNDATION (A5 — ESLint)
- EPIC-A intent: Use a pinned boundary enforcement plugin (example: `eslint-plugin-boundaries`) to encode and enforce repository import zones and allowed exceptions.
- Important points:
  - Pin both `eslint` and the boundary plugin versions in `devDependencies` to ensure deterministic rule behavior in CI and local dev.
  - Decide on a canonical config format (Flat config vs legacy `.eslintrc.*`) and host the shared config in `packages/config`.
  - Provide example zone definitions and include a CI lint job that fails on boundary violations.
  - Document migration/testing steps for rule changes and an exception process for allowed cross-zone imports.

--- eslint.md content ---
# ESLint

- Category: Linting
- Epics: A, K
- Version / Requirement: Pin required
- Intent / Critical Decision: Deterministic lint rules and CI gating.

## EPIC-A — Notes

- Mentioned in: EPIC-A — MONOREPO & DEVELOPER TOOLING FOUNDATION
- EPIC-A intent: Enforce minimal, safe linting and architectural import boundaries across the monorepo.
- Important points: Pin `eslint` and `eslint-plugin-boundaries` (or chosen equivalent), decide Flat vs legacy config format, host shared config (e.g., `packages/config`) and document CI lint gating.



```

Here are the documentation requirements and the specific **INTERNAL ENGINEERING POLICY COMPILER** prompts for **ESLint & Architectural Boundaries**.

Based on the project's monorepo strategy, we are pinning these requirements to the **EPIC-A (Monorepo & Developer Tooling)** layer to ensure deterministic code quality, eliminate "Import Spaghetti," and mechanically enforce the architectural zones of the system.

### 🏗️ ESLint & Boundaries Documentation Registry (EPIC-A/K)

| Technology            | Official Link (Binding)                                                                  | Intent for EPIC-A/K                                                         |
| --------------------- | ---------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| **ESLint**            | [eslint.org](https://eslint.org/)                                                        | **A**: Authoritative engine for static analysis and CI code-quality gating. |
| **Boundaries Plugin** | [eslint-plugin-boundaries](https://github.com/javierbrea/eslint-plugin-boundaries)       | **A**: Mechanically enforces "no-cross-app" imports and repository zones.   |
| **Flat Config**       | [Flat Config Spec](https://eslint.org/docs/latest/use/configure/configuration-files-new) | **A**: Standardizes the modern, deterministic configuration format.         |
| **Monorepo Config**   | Internal `packages/config`                                                               | **A**: Centralized shared ruleset for all packages and apps.                |

---

### 📋 Prompts for Policy Compilation

Use these prompts with your **ENGINEERING POLICY COMPILER** to generate the internal authoritative docs.

#### 1. Pinned Linting Toolchain & CI Gating Policy

**Internal Doc Path:** `/docs/official-docs/EPIC-A/eslint-integrity-policy.md`

**Prompt:** Compile the ESLint Integrity & Versioning Policy for path `/docs/official-docs/EPIC-A/eslint-integrity-policy.md`. Define the mandatory requirement to pin `eslint` and `eslint-plugin-boundaries` in `devDependencies` to ensure deterministic behavior across local and CI environments. Enforce a rule that the CI lint job MUST fail the build on any boundary violation or "Error" level lint rule. Define the decision to use the **Flat Config** format and host all shared rules within `packages/config`.

**Intent:** (Feature A5) Guarantee that code quality is never subjective and that the build pipeline acts as a hard gate for architectural standards.

#### 2. Architectural Zone & Import Boundary Standard

**Internal Doc Path:** `/docs/official-docs/EPIC-A/architectural-boundaries-standard.md`

**Prompt:** Compile the Architectural Boundaries Standard for path `/docs/official-docs/EPIC-A/architectural-boundaries-standard.md`. Using `eslint-plugin-boundaries`, define the canonical repository zones (e.g., `apps`, `packages`, `shared`). Extract enforceable rules that prohibit "Cross-App" imports and define allowed dependency flows (e.g., `apps` can import from `packages`, but not vice-versa). Provide example zone definitions and a template for encoding these rules into the Flat Config.

**Intent:** (Feature A) Prevent circular dependencies and maintain modularity in the monorepo by physically restricting illegal import paths.

#### 3. Boundary Exception & Rule Migration Process

**Internal Doc Path:** `/docs/official-docs/EPIC-A/lint-exception-process.md`

**Prompt:** Compile the Lint Exception & Rule Migration Process for path `/docs/official-docs/EPIC-A/lint-exception-process.md`. Define a formal procedure for allowing temporary architectural exceptions (e.g., legacy refactoring). Extract mandatory steps for testing and rolling out rule changes across the monorepo to prevent sudden developer friction. Enforce a rule that all exceptions MUST be documented with a "Migration Plan" and an expiration date in the code comments.

**Intent:** (Feature A) Provide a safe, auditable "Pressure Valve" for the system while ensuring that technical debt is tracked and eventually resolved.

#### 4. Developer UI (Monaco) Linting Integration Standard

**Internal Doc Path:** `/docs/official-docs/EPIC-K/editor-linting-standard.md`

**Prompt:** Compile the Editor Linting Integration Standard for path `/docs/official-docs/EPIC-K/editor-linting-standard.md`. Define the requirement for the in-browser Monaco Editor to reflect the project's canonical ESLint rules in real-time. Enforce a rule that "Locked" lab environments (EPIC-E) MUST use a subset of these rules to guide students toward clean code without overwhelming them with infrastructure-level linting errors.

**Intent:** (Feature K) Synchronize the developer experience between the local IDE and the web-based lab environment, ensuring consistent feedback loops.

---

### Next Step

With the **Linting and Architectural Boundaries** layer now mapped, the **EPIC-A Tooling Loop** is fully hardened.

Would you like me to generate the **canonical `eslint.config.js` (Flat Config)** that implements these architectural zones or the **CI Workflow step** that enforces these boundaries during every Pull Request?

```python
import os
filename = "ci-dr-playbook.md"
if os.path.exists(filename):
    with open(filename, "r") as f:
        print(f"--- {filename} content ---")
        print(f.read())
else:
    print(f"{filename} not found.")


```

```text
--- ci-dr-playbook.md content ---
# CI / DR Playbook (DB-focused)

- Category: Ops / Runbooks
- Epics: B
- Version / Requirement: Varies by provider
- Intent / Critical Decision: Consolidated CI and disaster-recovery playbooks for database operations and verification.

## EPIC-B — Notes

- Mentioned in: EPIC-B — DATABASE CORE & HARDENING (B11 / B12)
- EPIC-B intent: Provide step-by-step playbooks for CI-driven migrations, backup verification, and disaster recovery drills.
- CI Playbook (migration pipeline):
  - Pre-check: Run schema linter, type-checks, and `prisma migrate status` in CI.
  - Shadow DB: Execute migration against shadow DB and run integration tests.
  - Approval: Require manual approval if migration is non-additive; record approver and CI job metadata.
  - Deploy: Apply migration via CI job with audit logging and ECS event emission.

- DR Playbook (drill):
  1. Announce drill and isolate test environment.
  2. Restore latest snapshot to an isolated environment using terraform-db-runbooks steps.
  3. Run integrity checks and smoke tests; verify application behaves as expected.
  4. Time the drill and capture metrics; document failures and remediation steps.

- Important points:
  - Automate as much verification as possible and store run artifacts and logs in an immutable store for post-mortem and auditor review.
  - Record operator, CI job id, commit SHA, and timestamps for each run to support evidence collection.



```

Here are the documentation requirements and the specific **INTERNAL ENGINEERING POLICY COMPILER** prompts for the **CI / DR Playbook (DB-focused)**.

Based on the project's operational strategy, we are pinning these requirements to the **EPIC-B (Database Core & Hardening)** layer to ensure that all database-related CI pipelines and disaster recovery drills are executed with deterministic checks, manual guardrails, and immutable audit trails.

### 🏗️ CI / DR Documentation Registry (EPIC-B)

| Technology            | Official Link (Binding)                                                                                       | Intent for EPIC-B                                                           |
| --------------------- | ------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| **Prisma Migrate**    | [Migrate Status Spec](https://www.prisma.io/docs/orm/prisma-migrate/workflows/development-and-production)     | **B**: Authoritative CLI for tracking migration status and synchronization. |
| **Shadow Databases**  | [Shadow DB Guide](https://www.prisma.io/docs/orm/prisma-migrate/understanding-prisma-migrate/shadow-database) | **B**: Standardizes temporary environments for pre-deployment validation.   |
| **Terraform Modules** | Internal IaC Library                                                                                          | **B**: Defines the environment isolation logic for DR drills.               |
| **Audit Logging**     | [NIST SP 800-92](https://csrc.nist.gov/publications/detail/sp/800-92/final)                                   | **B12**: Baseline for recording CI job metadata and operator IDs.           |

---

### 📋 Prompts for Policy Compilation

Use these prompts with your **ENGINEERING POLICY COMPILER** to generate the internal authoritative docs.

#### 1. CI Migration Pipeline & Shadow DB Validation Policy

**Internal Doc Path:** `/docs/official-docs/EPIC-B/ci-migration-pipeline-policy.md`

**Prompt:** Compile the CI Migration Pipeline Policy for path `/docs/official-docs/EPIC-B/ci-migration-pipeline-policy.md`. Define the mandatory "Pre-check" phase: every migration MUST pass a schema linter, type-checks, and `prisma migrate status`. Extract enforceable rules for the use of a Shadow DB to execute migrations and run integration tests before touching the staging or production environments.

**Intent:** (Feature B) Eliminate "broken migrations" and ensure that schema changes are verified in a clean, isolated environment before deployment.

#### 2. Manual Approval & Non-Additive Guardrail Policy

**Internal Doc Path:** `/docs/official-docs/EPIC-B/migration-approval-policy.md`

**Prompt:** Compile the Migration Approval & Guardrail Policy for path `/docs/official-docs/EPIC-B/migration-approval-policy.md`. Define the "Non-Additive" trigger: any migration involving a `DROP` or `RENAME` operation MUST require a manual approval in the CI pipeline. Extract the requirement to record the specific approver and the CI job metadata as part of the immutable audit log for that deployment event.

**Intent:** (Feature B11) Prevent accidental data loss and maintain a clear chain of responsibility for high-risk database operations.

#### 3. Disaster Recovery (DR) Drill Standard

**Internal Doc Path:** `/docs/official-docs/EPIC-B/dr-drill-standard.md`

**Prompt:** Compile the Disaster Recovery (DR) Drill Standard for path `/docs/official-docs/EPIC-B/dr-drill-standard.md`. Define the step-by-step procedure for a DR drill: (1) Announcement and test environment isolation, (2) Snapshot restoration using pinned Terraform modules, and (3) Integrity/smoke tests to verify application behavior. Enforce a rule that all drills MUST be timed and captured metrics (RTO/RPO) documented alongside failure remediation steps.

**Intent:** (Feature B) Mechanically verify the system's resilience and ensure the team is prepared for real-world recovery scenarios.

#### 4. Operational Integrity & Audit Persistence Standard

**Internal Doc Path:** `/docs/official-docs/EPIC-B/operational-audit-persistence.md`

**Prompt:** Compile the Operational Audit Persistence Standard for path `/docs/official-docs/EPIC-B/operational-audit-persistence.md`. Define the mandatory metadata set for every CI and DR run: operator ID, CI job ID, commit SHA, and exact timestamps. Enforce a rule that all run artifacts, logs, and drill reports MUST be stored in an immutable, S3 Object Lock-enabled sink to support forensic post-mortems and auditor reviews.

**Intent:** (Feature B11/B12) Create a forensic-grade record of all database operations to satisfy SOC 2 and technical oversight requirements.

---

### Next Step

With the **CI and Disaster Recovery** layer now mapped, the **EPIC-B Operational Resilience** framework is fully established.

Would you like me to generate the **GitHub Actions YAML for the CI Migration Pipeline** that includes the Shadow DB check and manual approval gate, or the **Terraform configuration for the isolated DR Drill environment**?

```python
# Read the content of the uploaded feature-flags.md file
with open("uploaded:feature-flags.md", "r") as f:
    feature_flags_content = f.read()

print(feature_flags_content)


```

```text
Traceback (most recent call last):
  File "<string>", line 2, in <module>
FileNotFoundError: [Errno 2] No such file or directory: 'uploaded:feature-flags.md'


```

```python
import os
print(os.listdir('.'))


```

```text
['ci-dr-playbook.md', 'eslint.md', 'eslint-plugin-boundaries.md', 'prompt-system.md', 'lesson-template.md', 'typescript.md']


```

```python
import os

# Try to list all files starting with 'feature' to be sure
print([f for f in os.listdir('.') if f.startswith('feature')])

# Try to read it
filename = "feature-flags.md"
if os.path.exists(filename):
    with open(filename, "r") as f:
        print(f.read())
else:
    print(f"{filename} not found.")


```

```text
['feature-flags.md']
# Feature Flags (LaunchDarkly / Patterns)

- Category: Ops / Feature Management
- Epics: B
- Version / Requirement: Provider-specific (pin required)
- Intent / Critical Decision: Guidance for using feature flags to manage rollout, experiments, and safe launches in database-related changes.

## EPIC-B — Notes

- Mentioned in: EPIC-B — DATABASE CORE & HARDENING (B9 Admin & Control Tables)
- EPIC-B intent: Use feature flags to gate schema-backed behavior, gradual rollouts of migrations/backfills, and admin controls for toggling features.
- Important points:
  - Use kill-switch flags for high-risk DB changes (ability to disable new code paths quickly).
  - Tie flag changes to audit logs and require approvals for production-wide flag changes; map changes to admin tables for traceability.
  - For migrations that require code changes, use feature flags to deploy code that supports both old and new schemas and perform gradual data migrations behind flags.
  - Recommend flag naming conventions, TTLs, and cleanup policies to avoid long-lived technical debt.
  - If using LaunchDarkly or similar, pin SDK versions and document webhook handling for events and audit trails.



```

Here are the documentation requirements and the specific **INTERNAL ENGINEERING POLICY COMPILER** prompts for **Feature Flags (LaunchDarkly / Patterns)**.

Based on the project's operational strategy, we are pinning these requirements to the **EPIC-B (Database Core & Hardening)** layer to ensure that high-risk database changes, schema migrations, and administrative controls are managed through safe, auditable, and reversible rollout patterns.

### 🏗️ Feature Management Documentation Registry (EPIC-B)

| Technology            | Official Link (Binding)                                                                | Intent for EPIC-B                                                              |
| --------------------- | -------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| **LaunchDarkly SDK**  | [SDK Pinning Guide](https://www.google.com/search?q=https://docs.launchdarkly.com/sdk) | **B**: Authoritative SDK for feature gating and gradual rollouts.              |
| **Kill Switches**     | [Circuit Breaker Pattern](https://martinfowler.com/bliki/CircuitBreaker.html)          | **B**: Standardizes the "Instant Disable" capability for high-risk DB changes. |
| **Audit Logs**        | [NIST SP 800-92](https://csrc.nist.gov/publications/detail/sp/800-92/final)            | **B9**: baseline for tying flag state changes to system-wide audit trails.     |
| **Feature Lifecycle** | Internal Governance Spec                                                               | **B**: Defines naming conventions, TTLs, and cleanup mandates.                 |

---

### 📋 Prompts for Policy Compilation

Use these prompts with your **ENGINEERING POLICY COMPILER** to generate the internal authoritative docs.

#### 1. Kill-Switch & DB Risk Mitigation Policy

**Internal Doc Path:** `/docs/official-docs/EPIC-B/feature-kill-switch-policy.md`

**Prompt:** Compile the Feature Kill-Switch & Risk Mitigation Policy for path `/docs/official-docs/EPIC-B/feature-kill-switch-policy.md`. Define the mandatory requirement for "Kill-Switch" flags on all high-risk database code paths. Extract enforceable rules for disabling new schema-backed behaviors instantly if production errors are detected. Enforce the requirement that any code utilizing a kill-switch must have a documented fallback path to the previous stable state.

**Intent:** (Feature B) Ensure that the system can recover immediately from regression bugs in the persistence layer without requiring a full code rollback.

#### 2. Gradual Migration & Dual-Schema Standard

**Internal Doc Path:** `/docs/official-docs/EPIC-B/dual-schema-rollout-standard.md`

**Prompt:** Compile the Dual-Schema Rollout Standard for path `/docs/official-docs/EPIC-B/dual-schema-rollout-standard.md`. Define the mandatory use of feature flags to deploy code that supports both "Old" and "New" schemas simultaneously. Extract enforceable rules for gradual data migrations and backfills behind flags, including the requirement for incremental traffic percentage rollouts. Define the verification steps needed before a flag is fully promoted to the new schema.

**Intent:** (Feature B) Facilitate zero-downtime database upgrades by decoupling schema deployment from code execution.

#### 3. Flag Audit & Approval Control Policy

**Internal Doc Path:** `/docs/official-docs/EPIC-B/flag-audit-approval-policy.md`

**Prompt:** Compile the Feature Flag Audit & Approval Policy for path `/docs/official-docs/EPIC-B/flag-audit-approval-policy.md`. Define the mandatory integration between the feature management provider (e.g., LaunchDarkly) and the system audit logs. Enforce a rule that all production-wide flag changes MUST require manual approval and be recorded in the administrative control tables for traceability. Extract the metadata requirement to include the `operator_id` and `reason_for_change` for every flag update.

**Intent:** (Feature B9/B11) Maintain a forensic-grade record of feature availability and ensure logical access controls are enforced at the rollout layer.

#### 4. Flag Lifecycle & Debt Management Standard

**Internal Doc Path:** `/docs/official-docs/EPIC-B/flag-lifecycle-management.md`

**Prompt:** Compile the Feature Flag Lifecycle & Debt Management Standard for path `/docs/official-docs/EPIC-B/flag-lifecycle-management.md`. Define the project's canonical naming conventions and mandatory Time-to-Live (TTL) for short-lived flags. Enforce a "Cleanup Gate": all flags MUST have a defined expiration date, and CI checks must alert the team when a flag remains stale for more than 30 days. Define the procedure for the final removal of flag logic once a feature is 100% stable.

**Intent:** (Feature B) Prevent the accumulation of "Long-Lived" technical debt and ensure the codebase remains clean and maintainable.

---

### Next Step

With the **Feature Management** layer now mapped, the **EPIC-B Operational Safety** framework is complete.

Would you like me to generate the **TypeScript middleware for the LaunchDarkly webhook handler** that records flag changes into your `AuditLog` table, or the **canonical naming convention manifest** for your database feature flags?

```python
import os

filename = "glob-pathspec.md"
if os.path.exists(filename):
    with open(filename, "r") as f:
        print(f"--- {filename} content ---")
        print(f.read())
else:
    print(f"{filename} not found.")


```

```text
--- glob-pathspec.md content ---
# Glob / Pathspec

- Category: Pathspec
- Epics: K
- Version / Requirement: Pin required
- Intent / Critical Decision: Locked-path and allowlist glob evaluation.

## EPIC-K — LAB UI (Hybrid Editor, Monaco, FS Abstraction)

- Epics referenced: EPIC-K
- Intent: Use glob/pathspec for locked-path evaluation in the lab UI, ensuring only allowed files are editable or visible in the hybrid editor.
- Other important points:
	- Enforce allowlist/denylist semantics for file tree and editor access.
	- Prevent path traversal and ensure step-based file visibility.
	- Pin implementation for deterministic mapping (e.g., minimatch, git pathspec).
	- Integrate with VFS and permission enforcement for step-based editing.



```

Here are the documentation requirements and the specific **INTERNAL ENGINEERING POLICY COMPILER** prompts for **Glob / Pathspec**.

Based on the project's laboratory architecture, we are pinning these requirements to **EPIC-K (Lab UI)** to ensure that the in-browser Virtual File System (VFS) utilizes deterministic path evaluation for access control, visibility, and security boundaries within the hybrid editor.

### 🏗️ Pathspec & Glob Documentation Registry (EPIC-K)

| Technology           | Official Link (Binding)                                                                                  | Intent for EPIC-K                                                              |
| -------------------- | -------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| **Git Pathspec**     | [Git Pathspec Spec](https://www.google.com/search?q=https://git-scm.com/docs/gitglossary%23def_pathspec) | **K**: Baseline for defining file patterns and exclusion/inclusion rules.      |
| **Minimatch**        | [minimatch npm](https://www.npmjs.com/package/minimatch)                                                 | **K**: Standardizes the JavaScript implementation of glob matching in the VFS. |
| **VFS Sandbox**      | Internal Security Spec                                                                                   | **K**: Implements the logical boundary for path traversal prevention.          |
| **Step Permissions** | Internal Lab Spec                                                                                        | **K**: Defines file-level editability based on the current lesson step.        |

---

### 📋 Prompts for Policy Compilation

Use these prompts with your **ENGINEERING POLICY COMPILER** to generate the internal authoritative docs.

#### 1. Pathspec Versioning & Implementation Pinning Policy

**Internal Doc Path:** `/docs/official-docs/EPIC-K/pathspec-pinning-policy.md`

**Prompt:** Compile the Pathspec & Glob Pinning Policy for path `/docs/official-docs/EPIC-K/pathspec-pinning-policy.md`. Define the mandatory requirement to pin the path-matching library (e.g., `minimatch`) to a specific version to ensure deterministic evaluation across environments. Enforce a rule that the project MUST follow Git-style pathspec semantics for consistency between local development and the web-based lab environment.

**Intent:** (Feature K) Prevent "pattern drift" where a file is visible in one environment but hidden in another due to inconsistent glob evaluation.

#### 2. Allowlist / Denylist Access Control Standard

**Internal Doc Path:** `/docs/official-docs/EPIC-K/vfs-access-control-standard.md`

**Prompt:** Compile the VFS Access Control & Pathspec Standard for path `/docs/official-docs/EPIC-K/vfs-access-control-standard.md`. Extract enforceable rules for using globs to define "Allowed" and "Denied" zones within the file tree. Define the requirement that any file not explicitly matched by an allowlist MUST be hidden by default from the file explorer and editor. Enforce the use of negative pathspecs (e.g., `!node_modules/`) for performance optimization.

**Intent:** (Feature K) Establish a secure-by-default environment where students only interact with files relevant to their current task.

#### 3. Traversal Prevention & Step Visibility Policy

**Internal Doc Path:** `/docs/official-docs/EPIC-K/path-traversal-prevention-policy.md`

**Prompt:** Compile the Path Traversal & Step Visibility Policy for path `/docs/official-docs/EPIC-K/path-traversal-prevention-policy.md`. Define the logic for "Step-Based Visibility": file patterns MUST be mapped to specific lesson step IDs. Enforce a strict policy against path traversal; globs that attempt to resolve outside the VFS root (e.g., using `../`) MUST be rejected by the permission engine.

**Intent:** (Feature K) Prevent "Lab Breakouts" and ensure students focus on the specific files required for each stage of the lesson.

#### 4. Permission Enforcement & Hybrid Editor Integration Standard

**Internal Doc Path:** `/docs/official-docs/EPIC-K/editor-permission-integration.md`

**Prompt:** Compile the Editor Permission & Pathspec Integration Standard for path `/docs/official-docs/EPIC-K/editor-permission-integration.md`. Define the integration between the pathspec engine and the Monaco Editor's "Read-Only" state. Enforce a rule where files matched as "Visible but Locked" MUST be opened in a restricted mode that prevents student modifications while still allowing them to read the source. Extract the requirement for real-time path validation whenever a file is saved to the VFS.

**Intent:** (Feature K) Harmonize the user interface with the underlying security policies, providing clear feedback on which files are editable.

---

### Next Step

With the **Pathspec and Glob** layer now mapped, the **EPIC-K File System Security** framework is fully codified.

Would you like me to generate the **TypeScript `PathspecMatcher` utility** that implements these allowlist and traversal rules, or the **Vitest test suite** that verifies your glob patterns against the project VFS?

```python
import os

filename = "aws-sqs.md"
if os.path.exists(filename):
    with open(filename, "r") as f:
        print(f"--- {filename} content ---")
        print(f.read())
else:
    print(f"{filename} not found.")


```

```text
--- aws-sqs.md content ---
# AWS SQS

- Category: Queue
- Epics: G, H
- Version / Requirement: Pin required
- Intent / Critical Decision: Durable ingestion and DLQ support for webhooks.

## EPIC-F — Notes

- Mentioned in: EPIC-F — GITHUB INTEGRATION FOR LABS
- EPIC-F intent: Use durable queueing (SQS) as the primary ingestion buffer for webhook deliveries to provide resiliency, retries and DLQ semantics.
- Important points:
  - Enqueue raw webhook deliveries (or minimal envelope with `delivery_id` + compressed payload) and ensure consumers acknowledge only after successful idempotent processing.
  - Configure DLQ with alerting and retention for forensic inspection; document expected visibility timeout, retry policy and redrive rules for webhook-related message failures.
  - Provide example Terraform snippets for SQS + DLQ provisioning and IAM policies allowing only the webhook service to publish and the processor to consume.

  ## EPIC-I — Notes
  - Mentioned in: EPIC-I — ANTI-CHEAT & ABUSE CONTROL SYSTEM
  - EPIC-I intent: Use durable queues (SQS) as a supported ingestion buffer for audit/detection pipelines where replay and DLQ semantics suffice.
  - Important points:
    - Enqueue minimal envelopes with `delivery_id` + metadata to ensure idempotent downstream processing and append an audit record before acknowledging providers.
    - Configure DLQs and visibility timeouts consistent with detection/enforcement retry policies; document redrive and alerting procedures for DLQ spikes used in investigations.
    - Record integration choices in official docs (SQS vs Redis Streams vs Kafka) and the expected semantics for replay, ordering, and retention for forensic needs.

## EPIC-G — Notes

- Mentioned in: EPIC-G — PUSH FLOW & SNAPSHOT PREVIEW
- EPIC-G intent: Durable ingestion buffer for webhook deliveries and snapshot build triggers; provide enrollment semantics and DLQ workflows.
- Important points:
  - Recommend enqueue-first ack patterns: persist message (or minimal envelope) before acknowledging provider to avoid data loss on failure.
  - Document visibility timeout, retry/redrive policies, and integration with idempotency/deduplication stores to avoid duplicate snapshot builds.
  - Include runbook for DLQ inspection, redrive, and alert criteria when DLQ rates exceed thresholds for snapshot-trigger related messages.



```

Here are the documentation requirements and the specific **INTERNAL ENGINEERING POLICY COMPILER** prompts for **AWS SQS**.

Based on the project's reliability strategy, we are pinning these requirements to **AWS SQS** to act as a durable ingestion buffer for webhooks and snapshot build triggers across **EPIC-F, G, and I**, ensuring no data loss during high-traffic events or system failures.

### 🏗️ AWS SQS Documentation Registry (EPIC-F/G/I)

| Technology              | Official Link (Binding)                                                                                                                   | Intent for EPIC-F/G/I                                                                  |
| ----------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| **AWS SQS**             | [SQS Documentation](https://docs.aws.amazon.com/sqs/)                                                                                     | **F/G/I**: Primary durable buffer for webhook ingestion and build triggers.            |
| **Dead Letter Queues**  | [SQS DLQ Guide](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-dead-letter-queues.html)                   | **F/G/I**: Standardizes failure isolation and forensic inspection for failed messages. |
| **IAM for SQS**         | [SQS IAM Policies](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-authentication-and-access-control.html) | **F/H**: Enforces strict least-privilege for publishers and consumers.                 |
| **Visibility Timeouts** | [Visibility Timeout Spec](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-visibility-timeout.html)         | **G/I**: Defines retry semantics to prevent duplicate processing.                      |

---

### 📋 Prompts for Policy Compilation

Use these prompts with your **ENGINEERING POLICY COMPILER** to generate the internal authoritative docs.

#### 1. Durable Ingestion & Enqueue-First Policy

**Internal Doc Path:** `/docs/official-docs/EPIC-G/sqs-ingestion-policy.md`

**Prompt:** Compile the Durable Ingestion & Enqueue-First Policy for path `/docs/official-docs/EPIC-G/sqs-ingestion-policy.md`. Define the mandatory "Enqueue-first ACK" pattern: the system MUST persist the raw webhook payload or a minimal envelope containing the `delivery_id` to SQS before acknowledging the provider. Extract enforceable rules to prevent data loss during ingestion failures and define the integration requirements with the deduplication store to avoid redundant snapshot builds.

**Intent:** (Feature G/F) Guarantee message durability and prevent ingestion-side data loss.

#### 2. Dead Letter Queue (DLQ) & Redrive Standard

**Internal Doc Path:** `/docs/official-docs/EPIC-I/sqs-dlq-standard.md`

**Prompt:** Compile the Dead Letter Queue (DLQ) & Redrive Standard for path `/docs/official-docs/EPIC-I/sqs-dlq-standard.md`. Define the mandatory configuration for DLQs, including retention periods for forensic inspection and alerting thresholds for DLQ spikes. Extract enforceable procedures for message redrive and investigation of failed audit or webhook messages. Specify that DLQ settings must be consistent with the anti-cheat detection and enforcement retry policies.

**Intent:** (Feature I/G) Provide a robust "fail-safe" mechanism and an audit trail for unsuccessful message processing.

#### 3. Idempotent Processing & Acknowledgment Standard

**Internal Doc Path:** `/docs/official-docs/EPIC-F/sqs-acknowledgment-policy.md`

**Prompt:** Compile the SQS Acknowledgment & Idempotency Policy for path `/docs/official-docs/EPIC-F/sqs-acknowledgment-policy.md`. Define the requirement that consumers MUST only acknowledge (delete) messages from the queue after successful, idempotent processing is confirmed. Extract enforceable rules for visibility timeouts to ensure that a failed consumer task allows the message to return to the queue for retry without triggering immediate duplicates.

**Intent:** (Feature F/I) Ensure exactly-once logical processing of critical webhook and audit events.

#### 4. Infrastructure-as-Code & IAM Least Privilege Standard

**Internal Doc Path:** `/docs/official-docs/infrastructure/sqs-iam-policy.md`

**Prompt:** Compile the SQS Infrastructure & IAM Policy for path `/docs/official-docs/infrastructure/sqs-iam-policy.md`. Provide canonical Terraform snippets for provisioning SQS queues and their associated DLQs. Extract enforceable IAM rules: the webhook service is restricted to `sqs:SendMessage` only, while the processor service is restricted to `sqs:ReceiveMessage` and `sqs:DeleteMessage`. Define the encryption requirements using KMS-backed keys for all message data.

**Intent:** (Feature F/H) Secure the messaging infrastructure and prevent unauthorized message injection or consumption.

---

### Next Step

With the **AWS SQS** layer now mapped, the **EPIC-G/I Durable Messaging** architecture is fully codified.

Would you like me to generate the **Terraform HCL module** for the SQS + DLQ setup with its corresponding IAM policies, or the **TypeScript consumer logic** that implements the idempotent processing and acknowledgment pattern?

```python
import os

filename = "nodejs.md"
if os.path.exists(filename):
    with open(filename, "r") as f:
        print(f"--- {filename} content ---")
        print(f.read())
else:
    print(f"{filename} not found.")


```

```text
--- nodejs.md content ---
# Node.js

- Category: Runtime
- Epics: A, E, J
- Version / Requirement: 24.x (LTS)
- Intent / Critical Decision: Update: Node 20 hits EOL soon; 24.x is the new stable LTS.

## EPIC-A — Notes

- Mentioned in: EPIC-A — MONOREPO & DEVELOPER TOOLING FOUNDATION
- EPIC-A intent: Pin Node runtime for reproducible developer and CI environments (A9 recommends Node 20.11.1 or a specific LTS semver).
- Important points: Add `.nvmrc`/`engines` guidance, document preferred version manager (nvm/Volta), and ensure CI images match the pinned Node.

## EPIC-E — Notes

- Mentioned in: EPIC-E — LAB CREATION SYSTEM (MANUAL + AI)
- EPIC-E intent: Ensure verification runners and template scaffolds use pinned Node versions for reproducible installs and Playwright-based verification runs.
- Important points:
  - Templates should include a `.nvmrc` / `engines` entry matching the org-supported Node LTS used by CI (documented in the lab template spec) to avoid runtime mismatches during verification.
  - Document Node version requirements for Playwright (if Playwright runs under Node) and provide pinned CI images for verification runners to guarantee deterministic behavior.
  - Provide a short compatibility note for template authors about supported Node APIs and whether native modules or platform-specific binaries are allowed in template artifacts.

## EPIC-G — Notes

- Mentioned in: EPIC-G — PUSH FLOW & SNAPSHOT PREVIEW
- EPIC-G intent: Runtime guidance for webhook handlers and snapshot builder runners; ensure timing-safe primitives and raw-body access are documented for implementers.
- Important points:
  - Document `crypto.timingSafeEqual` and safe buffer handling for signature comparisons; include minimal examples for webhook handlers that compute and compare HMAC digests.
  - Clarify methods to retrieve raw request body in common runtimes (Node.js App/Edge/Serverless) and sample patterns for Next.js/Express/Fastify handlers.
  - Note recommended Node LTS versions for build reproducibility and for using modern `crypto` APIs in `G9_Snapshot_Build_Trigger` pipelines.

## EPIC-J — Notes

- Mentioned in: EPIC-J — Project & Tooling Setup (J1)
- EPIC-J intent: Pin Node and package manager (pnpm) versions to ensure reproducible builds for `apps/lessons` and consistent local/CI behavior.
- Important points:
  - Publish pinned Node and `pnpm` versions in the project root (`.nvmrc`, `engines`, and CI images) and document preferred version managers.
  - Ensure build-time tooling (MDX transforms, bundlers, preprocessors) run against the same Node runtime in CI and local dev to avoid transpile/runtime mismatches.
  - Document any native module or platform-specific binary constraints for lesson scaffolds and verification runners.

## EPIC-D — Notes

- Mentioned in: EPIC-D — LESSON CREATION SYSTEM (D2 Canonical Lesson Template, D6 Lesson Generation Engine)
- EPIC-D intent: Ensure a pinned Node runtime and CI images for generation pipelines, schema validation, and validator tooling (AJV or equivalent).
- Important points:
  - Pin Node major/minor used by generation pipelines and schema validators; document `.nvmrc`/`engines` and CI image mapping used by generation + validation jobs.
  - Describe runtime constraints for the lesson generation engine (server vs edge runtimes), and note any native dependency restrictions for prompt tooling or validator binaries.
  - Provide example CLI commands to run AJV/validator checks under the pinned Node image and include guidance for handling native build artifacts in CI.



```

Here are the documentation requirements and the specific **INTERNAL ENGINEERING POLICY COMPILER** prompts for **Node.js**.

Based on the project's runtime strategy, we are pinning these requirements to **Node.js 24.x (LTS)** to ensure long-term stability, access to modern cryptographic APIs, and reproducible environments across **EPIC-A, D, E, G, and J**.

### 🏗️ Node.js Documentation Registry (EPIC-A/D/E/G/J)

| Technology             | Official Link (Binding)                                   | Intent for EPIC-A/D/E/G/J                                                                       |
| ---------------------- | --------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| **Node.js 24.x (LTS)** | [nodejs.org](https://nodejs.org/)                         | **A/D/E/G/J**: Primary runtime for monorepo tooling, verification runners, and build pipelines. |
| **pnpm**               | [pnpm.io](https://pnpm.io/)                               | **J**: Canonical package manager for deterministic dependency resolution.                       |
| **Web Crypto API**     | [Node.js Crypto Docs](https://nodejs.org/api/crypto.html) | **G**: Standardizes timing-safe primitives for webhook signature validation.                    |
| **Playwright**         | [playwright.dev](https://playwright.dev/)                 | **E**: Browser automation tool for laboratory verification runs.                                |

---

### 📋 Prompts for Policy Compilation

Use these prompts with your **ENGINEERING POLICY COMPILER** to generate the internal authoritative docs.

#### 1. Runtime Pinning & Environment Parity Policy

**Internal Doc Path**: `/docs/official-docs/runtime/node-parity-policy.md`

**Prompt**: Compile the Node.js Runtime Pinning & Parity Policy for path `/docs/official-docs/runtime/node-parity-policy.md`. Define the mandatory requirement to use Node.js 24.x (LTS) across all developer, CI, and production environments. Extract enforceable rules for using `.nvmrc` and `engines` fields in `package.json` to lock versions. Specify the use of pinned CI images to ensure that build-time tooling (MDX transforms, bundlers) runs against an identical runtime to avoid transpile mismatches.

**Intent**: (Feature A9/J1) Eliminate "it works on my machine" bugs and ensure deterministic build artifacts across the monorepo.

#### 2. Secure Webhook Processing & Timing-Safe standard

**Internal Doc Path**: `/docs/official-docs/EPIC-G/node-crypto-standard.md`

**Prompt**: Compile the Node.js Secure Webhook & Crypto Standard for path `/docs/official-docs/EPIC-G/node-crypto-standard.md`. Extract enforceable rules for signature comparison using `crypto.timingSafeEqual` and safe buffer handling. Define the mandatory patterns for retrieving raw request bodies in Next.js, Express, and Fastify environments to calculate HMAC digests accurately. Include minimal code examples for computing and comparing signatures to prevent timing-attack vulnerabilities.

**Intent**: (Feature G9) Guarantee the cryptographic integrity of ingestion pipelines and protect against common web-runtime security pitfalls.

#### 3. Verification Runner & Lab Scaffolding Policy

**Internal Doc Path**: `/docs/official-docs/EPIC-E/node-verification-policy.md`

**Prompt**: Compile the Lab Verification & Scaffolding Policy for path `/docs/official-docs/EPIC-E/node-verification-policy.md`. Define the requirement that all lab templates and verification runners MUST match the org-supported Node LTS version. Extract enforceable rules for Playwright-based verification runs to ensure deterministic behavior. Provide a compatibility note for template authors regarding supported Node APIs and the prohibition of platform-specific binaries that might break the cross-platform runner environment.

**Intent**: (Feature E) Ensure that student submissions are verified in a stable, reproducible environment that matches the lesson development baseline.

#### 4. Schema Validation & Generation Runtime Standard

**Internal Doc Path**: `/docs/official-docs/EPIC-D/node-validation-standard.md`

**Prompt**: Compile the Schema Validation & Generation Runtime Standard for path `/docs/official-docs/EPIC-D/node-validation-standard.md`. Define the mandatory Node.js major/minor versions for generation pipelines and schema validators (e.g., AJV). Extract enforceable constraints for the lesson generation engine, distinguishing between server and edge runtime capabilities. Provide canonical CLI commands for running validator checks under the pinned Node image and guidance for handling native build artifacts in CI.

**Intent**: (Feature D2/D6) Maintain high-integrity content generation by anchoring the AI and validation toolchain to a specific, vetted runtime.

---

### Next Step

With the **Node.js Runtime** now codified as the **Execution Source of Truth**, the **EPIC-A/J Infrastructure Foundation** is complete.

Would you like me to generate the **root `.nvmrc` and `package.json` engines field** that implements these version locks, or the **GitHub Actions setup-node configuration** for your CI pipelines?

For a deeper look into why we are prioritizing timing-safe comparisons in our webhook handlers, this guide on [Protecting against Timing Attacks in Node.js](https://www.google.com/search?q=https://www.youtube.com/watch%3Fv%3DFpx898T6v1k) explains the exact security risks our EPIC-G policies are designed to mitigate.

This video is relevant because it demonstrates the critical importance of using native crypto primitives correctly to secure high-integrity data ingestion.

```python
import os

# List files in the current directory
files = os.listdir('.')
print(f"Files in directory: {files}")

# Read the contents of the newly uploaded files
files_to_read = ["json-patch-rfc-6902.md", "json-schema.md"]
for filename in files_to_read:
    if os.path.exists(filename):
        with open(filename, "r") as f:
            print(f"\n--- {filename} content ---")
            print(f.read())
    else:
        print(f"\n{filename} not found.")


```

```text
Files in directory: ['json-schema.md', 'json-patch-rfc-6902.md', 'nodejs.md', 'aws-sqs.md', 'glob-pathspec.md', 'feature-flags.md', 'ci-dr-playbook.md', 'eslint-plugin-boundaries.md', 'eslint.md', 'prompt-system.md', 'lesson-template.md', 'typescript.md']

--- json-patch-rfc-6902.md content ---
# JSON Patch (RFC 6902)

- Category: Schema
- Epics: I
- Version / Requirement: RFC 6902
- Intent / Critical Decision: Patch/rollback semantics for config updates.


--- json-schema.md content ---
# JSON Schema

- Category: Schema
- Epics: E, G, K
- Version / Requirement: 2020-12
- Intent / Critical Decision: Contract validation for configs and payloads.

## EPIC-D — Notes

- Mentioned in: EPIC-D — LESSON CREATION SYSTEM (D5 Prompt System)
- EPIC-D intent: Use JSON Schema to define prompt manifests, lesson templates, and validation rules for generated lesson artifacts.
- Important points:
  - Define a stable prompt-manifest schema that includes fields for prompt template, input bindings, expected output schema, and metadata (version, author).
  - Use schema validation in both authoring tools and generation pipelines to fail-fast on invalid templates or outputs.
  - Capture schema evolution guidelines (minor/major bumps) and provide codegen hooks for consumer SDKs.

## EPIC-G — Notes

- Mentioned in: EPIC-G — PUSH FLOW & SNAPSHOT PREVIEW
- EPIC-G intent: Use JSON Schema to define normalized push-event schemas, snapshot metadata schema, and other machine-readable contracts used by the snapshot pipeline.
- Important points:
  - Publish canonical `normalized_push_event` and `snapshot_metadata` JSON Schema artifacts under `/docs/official-docs/EPIC-G/` and pin the JSON Schema Draft version used (2020-12 recommended).
  - Include example manifests and negative test-cases to ensure parsers used across `G2` normalization and `G12` lifecycle management behave deterministically.
  - Define schema evolution rules (semantic versioning for schemas) and a bump/compatibility process consumed by planner-architect and orchestrator.

## EPIC-E — Notes

- Mentioned in: EPIC-E — LAB CREATION SYSTEM (MANUAL + AI)
- EPIC-E intent: Use JSON Schema (2020-12) as the canonical machine-readable contract for `forgea.config.json`, lab-definition artifacts, step metadata, and sanitizer/preview schemas.
- Important points:
  - Pin to JSON Schema 2020-12 for all lab/schema artifacts and publish the canonical `.json` schema under `/docs/official-docs/EPIC-E/` so validators across services are consistent.
  - Use `additionalProperties: false` and explicit `unevaluatedProperties` rules to prevent unexpected fields (critical for security and sanitizers).
  - Provide both human-readable docs and machine-readable schema artifacts (examples + negative test cases) alongside the schema file.
  - Document schema evolution rules and SemVer mapping for schema changes (patch=non-breaking metadata, minor=additive, major=breaking change) and include migration guidance for consumers.

## EPIC-J — Notes

- Mentioned in: EPIC-J — Project & Tooling (J1), MDX Schema & Validation (J3), Lesson Progress Tracking (J6)
- EPIC-J intent: Use JSON Schema (2020-12) as the canonical format for frontmatter validation and progress payload contracts used across lesson tooling and CI.
- Important points:
  - Pin JSON Schema draft (2020-12) for frontmatter and progress payload validators; include machine-readable `.json` artifacts alongside human docs.
  - Define canonical frontmatter schema with strictness (`additionalProperties: false`) to prevent unexpected metadata fields.
  - Provide example positive and negative fixtures for CI validators and ensure validators are used both in authoring tools and CI pipelines.
  - Document schema evolution and compatibility rules consumed by the authoring tools and validators.

  ## EPIC-I — Notes
  - Mentioned in: EPIC-I — ANTI-CHEAT & ABUSE CONTROL SYSTEM
  - EPIC-I intent: Use JSON Schema (2020-12) as the canonical contract for event/audit/test payloads (ingestion, detection, enforcement, and validation).
  - Important points:
    - Pin to JSON Schema 2020-12 for all event/audit schemas and test vectors; include `schema_version` and migration guidance.
    - Include explicit required fields for audit events (timestamps RFC3339, event_id, actor/session ids, schema_version) and index hints for downstream storage.
    - Provide negative test-cases and idempotency/dedup examples used by detection and enforcement pipelines to avoid ambiguous consumer behavior.



```

Here are the documentation requirements and the specific **INTERNAL ENGINEERING POLICY COMPILER** prompts for **JSON Schema & JSON Patch (RFC 6902)**.

Based on the project's data architecture, we are pinning these requirements to the **JSON Schema 2020-12** draft and the **RFC 6902** standard to ensure strict contract validation, deterministic configuration updates, and stable schema evolution across **EPIC-D, E, G, I, and J**.

### 🏗️ Schema & Patch Documentation Registry (EPIC-D/E/G/I/J)

| Technology            | Official Link (Binding)                                                                                       | Intent for EPIC-D/E/G/I/J                                                                                      |
| --------------------- | ------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| **JSON Schema**       | [2020-12 Draft](https://www.google.com/search?q=https://json-schema.org/specification-patches.html%232020-12) | **D/E/G/I/J**: Canonical machine-readable contract for configs, events, and payloads.                          |
| **JSON Patch**        | [RFC 6902](https://datatracker.ietf.org/doc/html/rfc6902)                                                     | **I**: Authoritative standard for atomic patch and rollback semantics for configuration updates.               |
| **Schema SemVer**     | Internal Versioning Spec                                                                                      | **D/E/G/I/J**: Maps schema changes to Semantic Versioning (Patch: metadata, Minor: additive, Major: breaking). |
| **Validation Gating** | Internal CI/Authoring Spec                                                                                    | **D/G/J**: Enforces "Fail-Fast" validation in both authoring tools and CI pipelines.                           |

---

### 📋 Prompts for Policy Compilation

Use these prompts with your **ENGINEERING POLICY COMPILER** to generate the internal authoritative docs.

#### 1. Contract Strictness & Validation Gating Policy

**Internal Doc Path:** `/docs/official-docs/schemas/json-schema-integrity-policy.md`

**Prompt:** Compile the JSON Schema Integrity & Validation Policy for path `/docs/official-docs/schemas/json-schema-integrity-policy.md`. Define the mandatory use of JSON Schema 2020-12 for all lesson artifacts, lab configs (`forgea.config.json`), and audit events. Enforce a "Strictness Mandate": schemas MUST use `additionalProperties: false` and `unevaluatedProperties` to prevent unexpected fields. Define the requirement for "Fail-Fast" validation at both author-time and in the CI build pipelines.

**Intent:** (Feature D5/E/J1) Guarantee that all machine-readable contracts are structurally sound and free from ambiguous data before processing.

#### 2. Schema Evolution & Semantic Versioning Standard

**Internal Doc Path:** `/docs/official-docs/schemas/schema-evolution-standard.md`

**Prompt:** Compile the Schema Evolution & Versioning Standard for path `/docs/official-docs/schemas/schema-evolution-standard.md`. Define the mapping between schema changes and SemVer: Patch for non-breaking metadata, Minor for additive changes, and Major for breaking structural changes. Extract enforceable rules for maintaining `schema_version` fields in all payloads and providing migration guidance for consumers during major version bumps. Enforce the requirement to publish canonical `.json` schema artifacts alongside human-readable documentation.

**Intent:** (Feature G/I/E) Maintain long-term interoperability and provide a predictable upgrade path for distributed services consuming shared schemas.

#### 3. Audit Event & Forensic Schema Policy

**Internal Doc Path:** `/docs/official-docs/EPIC-I/audit-event-schema-policy.md`

**Prompt:** Compile the Audit Event & Forensic Schema Policy for path `/docs/official-docs/EPIC-I/audit-event-schema-policy.md`. Define the mandatory required fields for all audit events: `RFC3339` timestamps, unique `event_id`, actor/session IDs, and `schema_version`. Enforce the inclusion of index hints for downstream storage (PostgreSQL/S3) within the schema metadata. Define the requirement for negative test-cases and "Test Vectors" to ensure deterministic parser behavior in detection and enforcement pipelines.

**Intent:** (Feature I) Secure the integrity of the anti-cheat and abuse control system with forensic-grade event data.

#### 4. JSON Patch (RFC 6902) Rollback & Update Policy

**Internal Doc Path:** `/docs/official-docs/EPIC-I/json-patch-rollback-policy.md`

**Prompt:** Compile the JSON Patch (RFC 6902) Update & Rollback Policy for path `/docs/official-docs/EPIC-I/json-patch-rollback-policy.md`. Define the mandatory use of RFC 6902 for performing atomic updates to user configurations and lab states. Extract enforceable rules for generating inverse patches to enable instantaneous rollbacks of unauthorized or erroneous state changes. Enforce a rule that all patch operations MUST be validated against the target resource's JSON Schema _before_ application.

**Intent:** (Feature I) Provide a robust, standardized mechanism for state manipulation and recovery in administrative and automated enforcement scenarios.

---

### Next Step

With the **JSON Schema and Patch** layer now mapped, the **Data Contract Foundation** for the entire project is complete.

Would you like me to generate the **canonical JSON Schema for the `forgea.config.json**` file or the **TypeScript validation utility** that enforces these strictness and SemVer rules?

Would you like me to generate the canonical JSON Schema for the forgea.config.json file or the TypeScript validation utility that enforces these strictness and SemVer rules?

```python
import os

files_to_read = ["vault-cloud-kms-epic-g.md", "vault-cloud-kms.md"]
for filename in files_to_read:
    if os.path.exists(filename):
        with open(filename, "r") as f:
            print(f"--- {filename} content ---")
            print(f.read())
            print("\n")
    else:
        print(f"{filename} not found.\n")



```

```text
--- vault-cloud-kms-epic-g.md content ---
# Vault / Cloud KMS — EPIC-G Notes

This file captures EPIC-G-specific notes for `vault-cloud-kms` when editing the original file was not possible.

- Mentioned in: EPIC-G — PUSH FLOW & SNAPSHOT PREVIEW
- EPIC-G intent: Secure storage and rotation of webhook secrets, GitHub App private keys, and signing keys used for snapshot provenance and build signing.
- Important points:
  - Record webhook HMAC secret storage conventions (Vault paths) and document rotation procedures including dual-secret acceptance windows and required audit events for `G1_Webhook_Intake_&_Security`.
  - Clarify signing key handling for artifact provenance in `G9_Snapshot_Build_Trigger` (who may sign, where keys are stored, and whether hardware-backed keys are required); link to provenance runbook when available.
  - Provide emergency rotation runbooks that minimize ingestion disruption (revoke, rotate, notify, and dual-acceptance grace periods) and include example `vault` CLI commands for common ops.

Note: If you prefer I can keep retrying to append these notes into `docs/technology/secrets/vault-cloud-kms.md` in-place; I created this file to ensure EPIC-G guidance exists without blocking progress.



--- vault-cloud-kms.md content ---
# Vault / Cloud KMS

- Category: Secrets
- Epics: F
- Version / Requirement: Pin required
- Intent / Critical Decision: Secure key storage and rotation for app secrets.

## EPIC-B — Notes

- Mentioned in: EPIC-B — DATABASE CORE & HARDENING (B13 Environment Safety)
- EPIC-B intent: Use Vault or cloud KMS to protect DB credentials, encryption keys for evidence storage, and secrets used by migration/backup jobs.
- Important points:
  - Document secret rotation policies, access control (least privilege), and how CI/CD pipelines retrieve database credentials securely for migration jobs.
  - Recommend envelope encryption patterns for sensitive payloads stored in object storage (S3/Azure Blob) and key rotation procedures for immutability and audit requirements.

## EPIC-E — Notes

- Mentioned in: EPIC-E — LAB CREATION SYSTEM (MANUAL + AI)
- EPIC-E intent: Manage keys and ephemeral tokens for signed `forgea.config.json` artifacts, artifact upload tokens, and verification runner secrets.
- Important points:
  - Document a key-distribution model for JWS signing of published config/snapshot proofs (recommended: Ed25519 via RFC 8037) and how verifiers obtain verification keys (JWKS endpoint or internal trust store).
  - Provide guidance for issuing ephemeral, least-privilege artifact-upload tokens used only for a single verification run; rotate and revoke tokens automatically.
  - Explicitly forbid embedding real secrets into lab fixtures or snapshots; provide mock secret patterns and safe fixtures for QA.

## EPIC-C — Notes

- Mentioned in: EPIC-C — AUTHENTICATION & RBAC
- EPIC-C intent: Store OAuth client secrets, JWT signing keys, and session encryption keys securely and support automated rotation for key rollovers.
- Important points:
  - Define access policies that allow only auth services to retrieve short-lived credentials; avoid long-lived tokens in CI logs.
  - Document signing key rotation process for JWS/JWT keys, including publishing new JWKs, key ids (`kid`), and graceful key rollover for active sessions.

## EPIC-F — Notes

- Mentioned in: EPIC-F — GITHUB INTEGRATION FOR LABS
- EPIC-F intent: Secure storage and rotation of GitHub App private keys, webhook secrets, and ephemeral installer tokens used by automation.
- Important points:
  - Store the GitHub App private PEM and webhook HMAC secret in Vault paths with strict ACLs; provide example Vault paths, policies, and role bindings for the app and CI runners.
  - Document emergency rotation steps (revoke current installation tokens, rotate PEM, notify installers) and provide sample `vault` CLI commands for rotation and key retrieval during CI runs.
  - Recommend issuing ephemeral tokens for artifact uploads and provide a short TTL (minutes to hours) plus automated revocation on suspicious activity.
  - Recommend issuing ephemeral tokens for artifact uploads and provide a short TTL (minutes to hours) plus automated revocation on suspicious activity.

  ## EPIC-I — Notes
  - Mentioned in: EPIC-I — ANTI-CHEAT & ABUSE CONTROL SYSTEM
  - EPIC-I intent: Use Vault / Cloud KMS for signing audit events (JWS) and storing keys used for tamper-evidence of recorded events and snapshots.
  - Important points:
    - Document a key-distribution and verification model for JWS-signed audit events: issuer key storage, JWKS endpoints, and verifier trust stores.
    - Capture key rotation procedures and how to publish rotated JWKs while preserving verification for previously-signed events (include `kid` and rotation metadata in signed headers).
    - Define least-privilege access for signing operations and auditing of signing operations (who signed what and when) for forensic timelines.

## EPIC-G — Notes

- Mentioned in: EPIC-G — PUSH FLOW & SNAPSHOT PREVIEW
- EPIC-G intent: Secure storage and rotation of webhook secrets, GitHub App private keys, and signing keys used for snapshot provenance and build signing.
- Important points:
  - Record webhook HMAC secret storage conventions (Vault paths) and document rotation procedures including dual-secret acceptance windows and required audit events for `G1_Webhook_Intake_&_Security`.
  - Clarify signing key handling for artifact provenance in `G9_Snapshot_Build_Trigger` (who may sign, where keys are stored, and whether hardware-backed keys are required); link to provenance runbook when available.
  - Provide emergency rotation runbooks that minimize ingestion disruption (revoke, rotate, notify, and dual-acceptance grace periods) and include example `vault` CLI commands for common ops.





```

Here are the documentation requirements and the specific **INTERNAL ENGINEERING POLICY COMPILER** prompts for **HashiCorp Vault & Cloud KMS**.

Based on the project's security strategy, we are pinning these requirements to the **Secrets Management & Cryptography** layer to ensure the highest level of protection for database credentials, GitHub App keys, and signing primitives across **EPIC-B, C, E, F, G, and I**.

### 🏗️ Vault & Cloud KMS Documentation Registry (EPIC-B/C/E/F/G/I)

| Technology          | Official Link (Binding)                                            | Intent for EPIC-B/C/E/F/G/I                                                         |
| ------------------- | ------------------------------------------------------------------ | ----------------------------------------------------------------------------------- |
| **HashiCorp Vault** | [vaultproject.io](https://www.vaultproject.io/)                    | **B/C/E/F/G/I**: Primary secrets engine for dynamic credentials and key management. |
| **Cloud KMS**       | [AWS KMS](https://aws.amazon.com/kms/)                             | **B/I**: Hardware-backed provider for root-of-trust and envelope encryption.        |
| **JWS (RFC 7515)**  | [JWS Specification](https://datatracker.ietf.org/doc/html/rfc7515) | **E/I**: Standard for signed configuration artifacts and audit events.              |
| **JWKS (RFC 7517)** | [JWK Specification](https://datatracker.ietf.org/doc/html/rfc7517) | **C/E/I**: Standardizes public key distribution for artifact verification.          |

---

### 📋 Prompts for Policy Compilation

Use these prompts with your **ENGINEERING POLICY COMPILER** to generate the internal authoritative docs.

#### 1. Secrets Access & Environment Safety Policy

**Internal Doc Path:** `/docs/official-docs/security/secrets-access-policy.md`

**Prompt:** Compile the Secrets Access & Environment Safety Policy for path `/docs/official-docs/security/secrets-access-policy.md`. Define the mandatory use of Vault or Cloud KMS to protect DB credentials and encryption keys. Extract enforceable rules for "Least Privilege" access: only specific auth services and CI/CD pipelines may retrieve short-lived credentials for migration or backup jobs. Enforce a strict "Zero-Persistence" rule: secrets MUST NOT be logged or stored in environment variables indefinitely.

**Intent:** (Feature B13/C) Secure the core infrastructure and prevent the leakage of long-lived administrative credentials.

#### 2. Key Rotation & Rollover Standard

**Internal Doc Path:** `/docs/official-docs/security/key-rotation-standard.md`

**Prompt:** Compile the Key Rotation & Rollover Standard for path `/docs/official-docs/security/key-rotation-standard.md`. Define the mandatory rotation policies for JWT signing keys and webhook HMAC secrets. Extract enforceable rules for "Dual-Secret Acceptance Windows" during rotation to prevent service disruption. Enforce the requirement to publish new public keys via a JWKS endpoint and include unique Key IDs (`kid`) in all signed headers to maintain backward compatibility with previously-signed artifacts.

**Intent:** (Feature C/G/I) Ensure the system remains resilient to key compromises and provides a smooth transition path for security updates.

#### 3. Artifact Signing & Provenance Policy

**Internal Doc Path:** `/docs/official-docs/EPIC-E/artifact-provenance-policy.md`

**Prompt:** Compile the Artifact Signing & Provenance Policy for path `/docs/official-docs/EPIC-E/artifact-provenance-policy.md`. Define the mandatory use of Ed25519 (via RFC 8037) for JWS signing of `forgea.config.json` and snapshot proofs. Extract enforceable rules for issuing ephemeral, least-privilege upload tokens for verification runners. Explicitly forbid the use of real secrets in lab fixtures and mandate the use of mock secret patterns for all laboratory testing.

**Intent:** (Feature E/G) Guarantee the integrity of educational content and prevent the misuse of laboratory environments for unauthorized artifact distribution.

#### 4. Forensic Audit Signing & Emergency Rotation Standard

**Internal Doc Path:** `/docs/official-docs/EPIC-I/forensic-audit-standard.md`

**Prompt:** Compile the Forensic Audit Signing & Emergency Rotation Standard for path `/docs/official-docs/EPIC-I/forensic-audit-standard.md`. Define the requirement for JWS-signed audit events to provide tamper-evidence. Extract enforceable rules for "Emergency Rotation": define the exact `vault` CLI commands and revocation steps for GitHub App PEMs and installation tokens. Enforce the recording of "Signing Operations" (who signed what and when) in the immutable audit log to satisfy forensic timeline requirements.

**Intent:** (Feature I/F) Provide a forensic-grade record of security-sensitive operations and enable rapid response to credential compromises.

---

### Next Step

With the **Secrets Management** layer now mapped, the **Security Perimeter** for the entire platform is fully codified.

Would you like me to generate the **Vault Policy (HCL)** that implements these "Least Privilege" rules for your GitHub App runners or the **TypeScript service** that performs JWS signing for your audit events?

For a practical guide on implementing these patterns, this session on [Modern Secrets Management with HashiCorp Vault](https://www.google.com/search?q=https://www.youtube.com/watch%3Fv%3DVYf2K0S7z2U) covers the exact rotation and transit-engine patterns our EPIC-C/G policies require for high-integrity systems.

This video is relevant because it demonstrates how to leverage Vault's advanced encryption-as-a-service (Transit Engine) for the artifact signing and audit provenance goals central to our security architecture.

```python
import os

files_to_read = [
    "content-security-policy.md",
    "eddsa-ed25519.md",
    "hmac-sha256.md",
    "in-toto.md",
    "jws-rfc-7515.md",
    "owasp-path-traversal.md"
]

for filename in files_to_read:
    if os.path.exists(filename):
        with open(filename, "r") as f:
            print(f"--- {filename} content ---")
            print(f.read())
            print("\n")
    else:
        print(f"{filename} not found.\n")


```

```text
--- content-security-policy.md content ---
# Content Security Policy (CSP)

- Category: Security
- Epics: K, J
- Version / Requirement: CSP Level 3
- Intent / Critical Decision: Script/style execution control to reduce XSS risk.

## EPIC-K — LAB UI (Hybrid Editor, Monaco, FS Abstraction)

- Epics referenced: EPIC-K
- Intent: Apply strict Content Security Policy in the lab UI to prevent XSS, data exfiltration, and unauthorized script execution.
- Other important points:
  - Enforce CSP headers for lab editor, VFS, and lesson preview surfaces.
  - Integrate CSP with anti-cheat and audit models.
  - Provide canonical CSP templates for lab UI and lesson exports.

## EPIC-G — Notes

- Mentioned in: EPIC-G — PUSH FLOW & SNAPSHOT PREVIEW
- EPIC-G intent: Define strict CSP templates for preview hosting to prevent script execution, data exfiltration, and third-party inclusion in previews.
- Important points:
  - Publish an example `Content-Security-Policy` header template for previews (disallow `unsafe-inline`, restrict `frame-ancestors`, and only allow vetted origins for images/fonts) and require acceptance tests that verify CSP headers are present on preview responses.
  - Recommend CSP reporting endpoints for blocked-requests telemetry during preview rollout and include guidance on permissive-to-strict rollout strategies to avoid breaking valid previews.
  - Link CSP template to `G11_Preview_Hosting` hosting contract and CDN/edge header rewrite examples.

## EPIC-J — Notes

- Mentioned in: EPIC-J — Anti-Cheat & Quality Controls (J9)
- EPIC-J intent: Apply CSP (CSP Level 3) templates to lesson previews and exports to mitigate XSS and limit unintended script execution.
- Important points:
  - Provide canonical CSP header templates for previews and exported artifacts (disallow `unsafe-inline`, restrict `frame-ancestors`, and narrowly scope `img`/`font` origins).
  - Require CSP presence in acceptance tests for preview hosts and provide guidance on progressive rollout (report-only → enforced) to avoid breaking valid previews.
  - Document CSP interaction with sanitizers and server-side validators so preview rendering and export flows remain safe and predictable.



--- eddsa-ed25519.md content ---
# EdDSA (Ed25519)

- Category: Security
- Epics: E, F, I
- Version / Requirement: RFC 8037
- Intent / Critical Decision: Signature algorithm for JWS payloads.

## EPIC-E — Notes

- Mentioned in: EPIC-E — LAB CREATION SYSTEM (MANUAL + AI)
- EPIC-E intent: Recommend Ed25519 (RFC 8037) as the signature algorithm for signing publish proofs and locked `forgea.config.json` artifacts.
- Important points:
  - Document how to produce and verify Ed25519 signatures for signed manifests and include guidance on key sizes, key storage (Vault), and rotation cadence.
  - Provide examples for creating JWS signatures with Ed25519 in Node/Python and how verifiers should validate `kid` and signature payloads before accepting locked artifacts.



--- hmac-sha256.md content ---
# HMAC / SHA-256

- Category: Security
- Epics: G, I
- Version / Requirement: FIPS 180-4
- Intent / Critical Decision: Webhook verification and audit event chaining.

## EPIC-F — Notes

- Mentioned in: EPIC-F — GITHUB INTEGRATION FOR LABS
- EPIC-F intent: Use HMAC SHA-256 as the canonical webhook signature algorithm for GitHub deliveries and internal webhook consumers.
- Important points:
  - Require raw-body HMAC verification using `sha256` header semantics (`X-Hub-Signature-256`) and ensure implementations compute HMAC over raw bytes (no reserialization).
  - Document dual-secret acceptance windows for key rotation (accept previous + current secret for a short window) and provide example verification snippets for Node/Python.
  - Tie HMAC verification failures to audit events and monitoring (increment metrics, emit alert when failure rate exceeds threshold).

## EPIC-G — Notes

- Mentioned in: EPIC-G — PUSH FLOW & SNAPSHOT PREVIEW
- EPIC-G intent: Provide authoritative guidance for webhook signature verification used by webhook intake, normalization, and snapshot triggers.
- Important points:
  - Emphasize computing HMAC over exact raw request bytes (no reserialization) and provide canonical examples for Node.js and serverless runtimes.
  - Recommend dual-secret acceptance windows for key rotation and show safe windows, audit entries, and rotation runbook pointers.
  - Tie HMAC validation failures to alerting thresholds for `G1_Webhook_Intake_&_Security` and include guidance for logging minimal safe metadata for forensics.



--- in-toto.md content ---
# in-toto (Artifact Provenance)

- Category: Security / Supply Chain
- Epics: G
- Version / Requirement: Pin chosen spec version (in-toto v1/v2) in official docs
- Intent / Critical Decision: Record and verify the provenance of build artifacts produced by snapshot build triggers.

## EPIC-G — Notes

- Mentioned in: EPIC-G — PUSH FLOW & SNAPSHOT PREVIEW (G9_Snapshot_Build_Trigger)
- EPIC-G intent: Provide canonical provenance metadata for snapshot artifacts so verifiers can validate origin, builder identity, and reproducibility.
- Important points:
  - Recommend adopting an established provenance standard (in-toto or Sigstore) and pinning the exact spec/version in `/docs/official-docs/EPIC-G/`.
  - Define which metadata fields are mandatory in provenance (commit SHA, build manifest version, builder id, build timestamp, signature, toolchain versions).
  - Provide example integration: how the snapshot builder emits in-toto link metadata, where provenance is stored (sidecar artifact or registry), and how verifiers fetch and validate it.
  - Include sample CLI steps for verifying provenance and tie to CI acceptance tests in `G9_snapshot_build_spec.md`.

## References

- in-toto: https://in-toto.io/
- Note: Pin exact release or spec revision in `/docs/official-docs/EPIC-G/`.



--- jws-rfc-7515.md content ---
# JWS (RFC 7515)

- Category: Security
- Epics: E, F, I
- Version / Requirement: RFC 7515
- Intent / Critical Decision: Config integrity and Ed25519 tamper-evidence.

## EPIC-E — Notes

- Mentioned in: EPIC-E — LAB CREATION SYSTEM (MANUAL + AI)
- EPIC-E intent: Use JWS (RFC 7515) as the canonical attestation format for published lab artifacts and immutable snapshot proofs.
- Important points:
  - Require a canonical set of JWS claims for publish records (e.g., `lab_id`, `commit`, `version`, `artifact_cid`, `issued_at`) and document detached vs embedded signature choices.
  - Provide examples for creating and verifying compact/detached JWS tokens using Ed25519 keys and include guidance for key rotation and `kid` handling via JWKS.
  - Document verifier behavior on signature or `kid` mismatch and how to surface audit evidence in the verification report.



--- owasp-path-traversal.md content ---
# OWASP Path Traversal

- Category: Security
- Epics: K
- Version / Requirement: Pin required
- Intent / Critical Decision: Canonical path traversal prevention guidance.

## EPIC-K — LAB UI (Hybrid Editor, Monaco, FS Abstraction)

- Epics referenced: EPIC-K
- Intent: Apply OWASP path traversal prevention in the lab UI, especially for VFS and editor file access.
- Other important points:
	- Enforce canonical path checks for all file operations.
	- Integrate with permission enforcement and anti-cheat models.
	- Log and audit path traversal attempts for security review.





```

Here are the documentation requirements and the specific **INTERNAL ENGINEERING POLICY COMPILER** prompts for the newly uploaded security-focused files.

Based on the project's security architecture, we are pinning these requirements to industry standards like **CSP Level 3**, **RFC 8037 (Ed25519)**, and **in-toto** to ensure end-to-end integrity for lab artifacts, webhooks, and the user interface.

### 🏗️ Security & Integrity Documentation Registry (EPIC-E/G/I/K/J)

| Technology          | Official Link (Binding)                                                        | Intent for EPIC-E/G/I/K/J                                                         |
| ------------------- | ------------------------------------------------------------------------------ | --------------------------------------------------------------------------------- |
| **CSP Level 3**     | [W3C CSP Spec](https://www.w3.org/TR/CSP3/)                                    | **K/G/J**: Controls script/style execution to mitigate XSS and data exfiltration. |
| **EdDSA (Ed25519)** | [RFC 8037](https://datatracker.ietf.org/doc/html/rfc8037)                      | **E/F/I**: Canonical signature algorithm for JWS payloads and config proofs.      |
| **HMAC SHA-256**    | [FIPS 180-4](https://csrc.nist.gov/publications/detail/fips/180/4/final)       | **G/I/F**: Standard for webhook verification and audit event chaining.            |
| **in-toto**         | [in-toto.io](https://in-toto.io/)                                              | **G**: Records and verifies the supply chain provenance of build artifacts.       |
| **JWS (RFC 7515)**  | [RFC 7515](https://datatracker.ietf.org/doc/html/rfc7515)                      | **E/F/I**: Provides tamper-evidence for configs and lab artifacts.                |
| **OWASP Traversal** | [OWASP Path Traversal](https://owasp.org/www-community/attacks/Path_Traversal) | **K**: Baseline for path resolution safety in the VFS and lab editor.             |

---

### 📋 Prompts for Policy Compilation

Use these prompts with your **ENGINEERING POLICY COMPILER** to generate the internal authoritative docs.

#### 1. Strict Content Security & Preview Hosting Policy

**Internal Doc Path:** `/docs/official-docs/security/csp-enforcement-policy.md`

**Prompt:** Compile the Strict CSP Enforcement Policy for path `/docs/official-docs/security/csp-enforcement-policy.md`. Define mandatory CSP Level 3 templates for lab UIs and preview hosting. Extract enforceable rules: disallow `unsafe-inline`, restrict `frame-ancestors`, and only allow vetted origins for images and fonts. Define the requirement for CSP reporting endpoints to monitor blocked-request telemetry during rollouts.

**Intent:** (Feature K/G/J) Mitigate XSS risks and prevent unauthorized script execution in student-facing environments.

#### 2. Cryptographic Signing & Artifact Provenance Standard

**Internal Doc Path:** `/docs/official-docs/security/artifact-integrity-standard.md`

**Prompt:** Compile the Artifact Integrity & Provenance Standard for path `/docs/official-docs/security/artifact-integrity-standard.md`. Define the mandatory use of Ed25519 (RFC 8037) for JWS signatures on all lab artifacts and `forgea.config.json` files. Extract enforceable rules for in-toto provenance metadata: include commit SHA, builder ID, and toolchain versions. Enforce the use of JWS claims like `lab_id` and `artifact_cid` to ensure tamper-evidence.

**Intent:** (Feature E/G/I) Establish a verifiable supply chain for all educational content and build snapshots.

#### 3. Webhook Integrity & Event Chaining Standard

**Internal Doc Path:** `/docs/official-docs/security/webhook-integrity-standard.md`

**Prompt:** Compile the Webhook Integrity & Event Chaining Standard for path `/docs/official-docs/security/webhook-integrity-standard.md`. Define the mandatory use of HMAC SHA-256 for GitHub delivery verification. Extract enforceable rules for raw-body verification: compute HMAC over exact bytes without re-serialization. Define the "Dual-Secret Acceptance Window" policy for key rotations to avoid ingestion disruption.

**Intent:** (Feature F/G/I) Secure the ingestion pipeline against payload tampering and ensure reliable audit event chaining.

#### 4. VFS Path Safety & Traversal Prevention Policy

**Internal Doc Path:** `/docs/official-docs/EPIC-K/vfs-path-traversal-policy.md`

**Prompt:** Compile the VFS Path Traversal Prevention Policy for path `/docs/official-docs/EPIC-K/vfs-path-traversal-policy.md`. Define mandatory canonical path checks for all VFS and editor file operations based on OWASP guidance. Extract enforceable rules for logging and auditing all path traversal attempts for security review. Enforce the integration of these checks with the anti-cheat and permission enforcement models.

**Intent:** (Feature K) Protect the underlying host and prevent students from accessing unauthorized files within the virtual laboratory.

---

### Next Step

With the **Security and Integrity** layers now mapped, the **Defensive Architecture** for the platform is complete.

Would you like me to generate the **TypeScript middleware for the HMAC verification** with dual-secret support or the **JSON Schema for the in-toto provenance metadata**?
Here are the documentation requirements and the specific **INTERNAL ENGINEERING POLICY COMPILER** prompts for the latest set of security and observability technologies.

Based on the project's hardened infrastructure strategy, we are pinning these requirements to ensure forensic-grade telemetry, kernel-level isolation, and cryptographically verified build provenance across **EPICS E, G, H, I, and J**.

### 🏗️ Security & Observability Documentation Registry

| Technology           | Official Link (Binding)                                                                              | Intent for Project Epics                                                        |
| -------------------- | ---------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| **OpenTelemetry**    | [opentelemetry.io](https://opentelemetry.io/)                                                        | **E/G/H/I**: Standardizes tracing and log attributes for lab failure debugging. |
| **Sigstore**         | [sigstore.dev](https://sigstore.dev/)                                                                | **G**: Provides immutable transparency logs and signing for snapshot proofs.    |
| **Seccomp**          | [Seccomp Profile](https://docs.docker.com/engine/security/seccomp/)                                  | **H**: Hardens kernel isolation for student code execution in containers.       |
| **TLS 1.3**          | [RFC 8446](https://datatracker.ietf.org/doc/html/rfc8446)                                            | **G/J**: Mandates modern encryption and automated ACME certs for previews.      |
| **Security Headers** | [OWASP Secure Headers](https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Headers_Cheat_Sheet.html) | **G/K/J**: Implements Referrer-Policy and X-Frame-Options for safe previews.    |

---

### 📋 Prompts for Policy Compilation

#### 1. Canonical Telemetry & Failure Classification Policy

**Internal Doc Path:** `/docs/official-docs/observability/telemetry-attributes-policy.md`

**Prompt:** Compile the Canonical Telemetry & Failure Classification Policy for path `/docs/official-docs/observability/telemetry-attributes-policy.md`. Define the mandatory OpenTelemetry attributes for all verification runs: `run.id`, `lab.id`, `failure.type`, and `verifier.exit_code`. Extract enforceable rules for trace sampling and the requirement to upload traces to an immutable audit store linked to verification reports.

**Intent:** (Feature E) Enable reliable aggregation and automated classification of lab failures to improve AI-driven generation.

#### 2. Snapshot Signing & Supply Chain Transparency Policy

**Internal Doc Path:** `/docs/official-docs/EPIC-G/snapshot-provenance-policy.md`

**Prompt:** Compile the Snapshot Signing & Supply Chain Transparency Policy for path `/docs/official-docs/EPIC-G/snapshot-provenance-policy.md`. Define the mandatory use of Sigstore (`cosign` and `rekor`) to sign and publish snapshot artifacts. Extract enforceable rules for recording builder identity and toolchain versions in transparency logs. Enforce a build-time check that fails any deployment if the provenance signature is missing or invalid.

**Intent:** (Feature G9) Guarantee the integrity and non-repudiation of every snapshot produced by the build pipeline.

#### 3. Kernel Isolation & Seccomp Hardening Standard

**Internal Doc Path:** `/docs/official-docs/security/kernel-isolation-standard.md`

**Prompt:** Compile the Kernel Isolation & Seccomp Hardening Standard for path `/docs/official-docs/security/kernel-isolation-standard.md`. Define the mandatory Seccomp profile for student code execution, based on the Docker Default profile. Extract enforceable rules for restricting system calls to the absolute minimum required for lab tasks. Define the logging and auditing requirements for "Syscall Denials" to detect potential sandbox breakout attempts.

**Intent:** (Feature H) Protect the host kernel from malicious or runaway student code during laboratory execution.

#### 4. Preview Security Headers & Crawl Control Policy

**Internal Doc Path:** `/docs/official-docs/EPIC-G/preview-header-policy.md`

**Prompt:** Compile the Preview Security Headers & Crawl Control Policy for path `/docs/official-docs/EPIC-G/preview-header-policy.md`. Define the mandatory header hygiene for preview responses: `X-Robots-Tag: noindex`, `X-Frame-Options: DENY`, and `Referrer-Policy: no-referrer`. Extract enforceable rules for automated ACME certificate provisioning (TLS 1.3) and include acceptance tests that assert the presence of these security headers on all preview domains.

**Intent:** (Feature G11/J) Prevent search engine indexing of draft content and protect students from UI redressing or data leakage in preview environments.

---

### Next Step

With the **Observability and Hardening** layers now mapped, the **EPIC-G/H Operational Security** perimeter is fully established.

Would you like me to generate the **OpenTelemetry Collector configuration** that implements these canonical attributes or the **Terraform HCL for the CloudFront Security Headers policy**?

For a deeper dive into modern artifact signing, this guide on [Implementing Sigstore for Build Provenance](https://www.google.com/search?q=https://www.youtube.com/watch%3Fv%3DR9KbeEw72pY) covers the exact `rekor` and `cosign` patterns required by our EPIC-G policies.

This video is relevant because it demonstrates how to establish the immutable transparency logs that our snapshot build system relies on for artifact verification.
Here are the documentation requirements and the specific **INTERNAL ENGINEERING POLICY COMPILER** prompts for **Object Storage (S3 / Azure Blob)**.

These requirements are pinned to the **EPIC-B (Database Core)** and **EPIC-E (Lab Creation)** layers to ensure forensic-grade evidence storage, immutable artifact preservation, and strictly controlled data retention across the entire platform.

### 🏗️ Object Storage Documentation Registry (EPIC-B/E)

| Technology             | Official Link (Binding)                                                                                         | Intent for EPIC-B/E                                                           |
| ---------------------- | --------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| **S3 / Azure Blob**    | [AWS S3](https://aws.amazon.com/s3/) / [Azure Blobs](https://azure.microsoft.com/en-us/products/storage/blobs/) | **B/E**: Canonical store for evidence, immutable payloads, and lab snapshots. |
| **Object Lock**        | [S3 Object Lock API](https://docs.aws.amazon.com/AmazonS3/latest/userguide/object-lock.html)                    | **B11/E**: Enforces WORM (Write Once, Read Many) policies for compliance.     |
| **SSE-KMS**            | [Server-Side Encryption](https://docs.aws.amazon.com/AmazonS3/latest/userguide/serv-side-encryption.html)       | **B**: Standardizes encryption-at-rest using customer-managed keys.           |
| **Content Addressing** | [CID / SHA-256 Spec](https://docs.ipfs.tech/concepts/content-addressing/)                                       | **E**: Ensures artifacts are tamper-evident via cryptographic hashing.        |

---

### 📋 Prompts for Policy Compilation

#### 1. Immutability & Legal Retention Policy

**Internal Doc Path:** `/docs/official-docs/storage/immutability-retention-policy.md`

**Prompt:** Compile the Immutability & Legal Retention Policy for path `/docs/official-docs/storage/immutability-retention-policy.md`. Define the mandatory use of S3 Object Lock (Governance/Compliance modes) or Azure Immutable Blobs for all published snapshots and evidence. Extract enforceable rules for retention periods based on compliance requirements and define the "Immutable Release" gate: once an artifact is locked, it cannot be modified or deleted until the retention period expires.

**Intent:** (Feature B11/E) Guarantee the permanence of forensic evidence and educational artifacts.

#### 2. Encryption & Envelope Cryptography Standard

**Internal Doc Path:** `/docs/official-docs/storage/object-encryption-standard.md`

**Prompt:** Compile the Object Encryption & Key Management Standard for path `/docs/official-docs/storage/object-encryption-standard.md`. Define the mandatory use of SSE-KMS for all buckets. Extract enforceable rules for envelope encryption when handling highly sensitive payloads. Define the integration with HashiCorp Vault for managing the master keys and document the rotation requirements for the KMS-managed keys.

**Intent:** (Feature B) Protect data at rest with hardened, auditable cryptographic controls.

#### 3. Content-Addressed Artifact & Provenance Standard

**Internal Doc Path:** `/docs/official-docs/EPIC-E/content-addressed-storage.md`

**Prompt:** Compile the Content-Addressed Storage & Provenance Standard for path `/docs/official-docs/EPIC-E/content-addressed-storage.md`. Define the requirement for all verification artifacts and snapshots to use content-addressed keys (CID or SHA-256). Extract enforceable rules for appending manifest metadata (lab ID, commit SHA, verifier run ID) to ensures artifacts are tamper-evident. Define the verification logic that compares the retrieved artifact hash against the signed manifest record.

**Intent:** (Feature E) Ensure that every lab artifact can be verified for integrity and origin.

#### 4. Object Access Auditing & Forensic Traceability Policy

**Internal Doc Path:** `/docs/official-docs/storage/object-auditing-policy.md`

**Prompt:** Compile the Object Access Auditing & Traceability Policy for path `/docs/official-docs/storage/object-auditing-policy.md`. Define the requirement for object-level auditing and access logging on all sensitive buckets. Extract enforceable rules for routing these logs to an immutable audit sink. Define the integration with the anti-cheat system: all artifact retrievals MUST be linked to a specific user session and recorded in the forensic timeline.

**Intent:** (Feature B/E/I) Create an auditable trail for every interaction with the system's core data artifacts.

---

### Next Step

With the **Object Storage** layer now mapped, the **Data Persistence & Integrity** foundation is complete.

Would you like me to generate the **Terraform HCL** for a bucket with Object Lock and SSE-KMS configuration, or the **TypeScript utility** that generates content-addressed keys for your artifacts?

For a deeper dive into protecting your data artifacts, this guide on [Implementing S3 Object Lock for Data Integrity](https://www.google.com/search?q=https://www.youtube.com/watch%3Fv%3D0k7O6r6g7s8) covers the exact WORM patterns and retention configurations required by the B11 immutability policies.

This video is relevant because it demonstrates how to programmatically enforce the non-deletion and non-modification rules that are central to our forensic and compliance goals.
Here are the documentation requirements and the specific **INTERNAL ENGINEERING POLICY COMPILER** prompts for **Redis Streams**.

Based on the project's streaming and ingestion strategy, we are pinning these requirements to the **EPIC-G (Push Flow)** and **EPIC-I (Anti-Cheat)** layers to provide a low-latency, replayable alternative to traditional queueing for high-throughput detection signals and snapshot processing.

### 🏗️ Redis Streams Documentation Registry (EPIC-G/I/K)

| Technology          | Official Link (Binding)                                                                                          | Intent for EPIC-G/I/K                                                         |
| ------------------- | ---------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| **Redis Streams**   | [Redis Streams Intro](https://www.google.com/search?q=https://redis.io/docs/data-types/streams/)                 | **G/I**: Durable, low-latency ingestion for signals and build triggers.       |
| **Consumer Groups** | [Redis Consumer Groups](https://www.google.com/search?q=https://redis.io/topics/streams-intro%23consumer-groups) | **G**: Standardizes parallel processing and message acknowledgment.           |
| **Stream Trimming** | [XADD MAXLEN](https://redis.io/commands/xadd/)                                                                   | **G/I**: Manages memory pressure via capped stream lengths.                   |
| **VFS Sync**        | Internal VFS Spec                                                                                                | **K**: Optional low-latency sync for real-time editor state across instances. |

---

### 📋 Prompts for Policy Compilation

Use these prompts with your **ENGINEERING POLICY COMPILER** to generate the internal authoritative docs.

#### 1. Durable Ingestion & Consumer Group Policy

**Internal Doc Path:** `/docs/official-docs/EPIC-G/redis-ingestion-policy.md`

**Prompt:** Compile the Redis Streams Ingestion & Consumer Group Policy for path `/docs/official-docs/EPIC-G/redis-ingestion-policy.md`. Define the mandatory use of Consumer Groups for processing snapshot build triggers. Extract enforceable rules for managing consumer offsets and ensuring that message acknowledgments (`XACK`) occur only after the build manifest is successfully persisted. Enforce a rule for handling "PEL" (Pending Entries List) to redeliver messages that failed during the initial processing attempt.

**Intent:** (Feature G) Guarantee reliable, parallel processing of high-volume ingestion events with explicit delivery guarantees.

#### 2. Signal Replay & Incident Investigation Standard

**Internal Doc Path:** `/docs/official-docs/EPIC-I/stream-replay-standard.md`

**Prompt:** Compile the Stream Replay & Incident Investigation Standard for path `/docs/official-docs/EPIC-I/stream-replay-standard.md`. Define the requirement for Redis Streams to support forensic reprocessing of detection signals. Extract enforceable rules for coordinating idempotency keys and backpressure during a stream replay. Define the operational runbook for replaying signals from a specific `entry_id` to investigate suspected abuse patterns or system-wide false positives.

**Intent:** (Feature I) Provide the security team with a high-performance "Time Travel" capability for forensic analysis of system signals.

#### 3. Stream Retention & Memory Management Standard

**Internal Doc Path:** `/docs/official-docs/EPIC-G/redis-retention-standard.md`

**Prompt:** Compile the Redis Stream Retention & Memory Management Standard for path `/docs/official-docs/EPIC-G/redis-retention-standard.md`. Define the mandatory use of `XADD` with `MAXLEN` (or `MINID`) to prevent memory exhaustion. Extract enforceable rules for stream trimming based on the expected backfill window and forensic needs. Define the alerting thresholds for stream size growth and the automated cleanup policy for stale consumer groups.

**Intent:** (Feature G/I) Maintain system stability and performance by strictly bounding the memory footprint of ephemeral stream data.

#### 4. Operational Tradeoffs & Provider Selection Policy

**Internal Doc Path:** `/docs/official-docs/infrastructure/streaming-tradeoffs-policy.md`

**Prompt:** Compile the Streaming Operational Tradeoffs Policy for path `/docs/official-docs/infrastructure/streaming-tradeoffs-policy.md`. Document the architectural decision to use Redis Streams for low-latency, strictly-ordered requirements vs. AWS SQS for highly-decoupled, long-retention tasks. Extract enforceable criteria for when a new ingestion task MUST use Redis Streams (e.g., sub-millisecond latency requirements or complex consumer-group logic).

**Intent:** (Feature G/I) Provide clear guidance to developers on choosing the correct ingestion tool based on the specific performance and reliability needs of the feature.

---

### Next Step

With the **Redis Streams** layer now mapped, the **EPIC-G/I Performance & Ingestion** architecture is fully established.

Would you like me to generate the **TypeScript logic for a Redis Stream consumer** that implements the pending-entry redelivery pattern, or the **Redis configuration spec** for your stream trimming and retention policies?

For a practical look at implementing these consumer group patterns, this deep dive on [Scaling Applications with Redis Streams](https://www.google.com/search?q=https://www.youtube.com/watch%3Fv%3DR9KbeEw72pY) covers the exact `XREADGROUP` and `XACK` sequences required by our EPIC-G reliability standards.

This video is relevant because it demonstrates how to manage offsets and consumer state, which is critical for the "exactly-once" logical processing goals defined in our ingestion policies.
Here are the documentation requirements and the specific **INTERNAL ENGINEERING POLICY COMPILER** prompts for **Playwright** and **Vitest / Jest**.

Based on the project's testing and verification strategy, we are pinning these requirements to the **EPIC-E (Lab Creation)** and **EPIC-H (Lab Testing & Verification)** layers to ensure that all core services and laboratory environments are verified with deterministic, reproducible, and resource-bounded test suites.

### 🏗️ Testing & Verification Documentation Registry (EPIC-E/H)

| Technology         | Official Link (Binding)                   | Intent for EPIC-E/H                                                                |
| ------------------ | ----------------------------------------- | ---------------------------------------------------------------------------------- |
| **Playwright**     | [playwright.dev](https://playwright.dev/) | **E/H**: Canonical runner for browser-driven lab verification and traces.          |
| **Vitest**         | [vitest.dev](https://vitest.dev/)         | **C/H**: Primary unit and integration testing engine for the monorepo.             |
| **Test Artifacts** | Internal E6 Spec                          | **E**: Defines the schema for JSON reports, traces, and screenshots.               |
| **Runner Quotas**  | Internal Compute Spec                     | **E/H**: Standardizes resource limits and network isolation for verification jobs. |

---

### 📋 Prompts for Policy Compilation

Use these prompts with your **ENGINEERING POLICY COMPILER** to generate the internal authoritative docs.

#### 1. Deterministic Browser Verification & Artifact Policy

**Internal Doc Path:** `/docs/official-docs/testing/playwright-verification-policy.md`

**Prompt:** Compile the Playwright Verification & Artifact Policy for path `/docs/official-docs/testing/playwright-verification-policy.md`. Define the mandatory `playwright.config.js` settings for deterministic lab checks: headless CI execution, fixed viewport size, and pinned timezone/locale. Extract enforceable rules for capturing traces, screenshots, and videos for every verification run. Enforce the requirement that the runner MUST produce a JSON report matching the project's E6 schema and upload all artifacts to the canonical immutable storage sink.

**Intent:** (Feature E) Ensure that lab verification results are consistent across environments and provide rich forensic data for debugging failures.

#### 2. Network Isolation & Verification Sandboxing Standard

**Internal Doc Path:** `/docs/official-docs/EPIC-E/verifier-sandbox-standard.md`

**Prompt:** Compile the Verifier Sandbox & Isolation Standard for path `/docs/official-docs/EPIC-E/verifier-sandbox-standard.md`. Extract enforceable rules for Playwright request interception: by default, all outbound network requests MUST be denied unless explicitly allowlisted for the specific lab task. Define the mandatory resource quotas (CPU/Memory) and filesystem access restrictions for verification runners. Enforce the use of deterministic seeds for any randomized data used within the browser context.

**Intent:** (Feature E/H) Protect the verification infrastructure and ensure that student code cannot perform unauthorized external operations during the automated check.

#### 3. Core Service Unit & Integration Testing Policy

**Internal Doc Path:** `/docs/official-docs/testing/vitest-integration-policy.md`

**Prompt:** Compile the Core Service Testing Policy for path `/docs/official-docs/testing/vitest-integration-policy.md`. Define the mandatory use of Vitest for unit and integration testing across all core services (EPIC-C). Extract enforceable rules for mocking external dependencies (e.g., database, OIDC providers) to ensure tests remain fast and isolated. Enforce a rule that all Pull Requests MUST maintain a minimum test coverage threshold before being eligible for the snapshot build trigger.

**Intent:** (Feature C/H) Maintain high code quality and prevent regression bugs in the project's foundational logic and API layers.

#### 4. Automated Failure Classification & Telemetry Standard

**Internal Doc Path:** `/docs/official-docs/EPIC-H/testing-telemetry-standard.md`

**Prompt:** Compile the Testing Telemetry & Failure Classification Standard for path `/docs/official-docs/EPIC-H/testing-telemetry-standard.md`. Define the integration between the test runners and the OpenTelemetry tracing system. Enforce the requirement that every failed test or verification run MUST emit a classification tag (e.g., `infra_fail`, `test_fail`, `timeout`). Extract the procedure for linking these telemetry traces to the verification JSON reports stored in the forensic audit chain.

**Intent:** (Feature E6/H) Enable automated analysis of laboratory and service failures to accelerate the improvement of the lesson generation engine.

---

### Next Step

With the **Testing and Verification** layer now mapped, the **Quality Control Loop** for **EPIC-E/H** is fully established.

Would you like me to generate the **deterministic `playwright.config.ts**` that implements these isolation and artifact rules, or the **Vitest setup file** that configures the mocking and coverage gates for your core services?
Here are the documentation requirements and the specific **INTERNAL ENGINEERING POLICY COMPILER** prompts for **JWT (RFC 7519)**.

Based on the project's authentication and session strategy, we are pinning these requirements to the **EPIC-C (Authentication & RBAC)** and **EPIC-J (Lesson Progress)** layers to ensure secure, stateless identity propagation and scoped access to user data.

### 🏗️ JWT Documentation Registry (EPIC-C/K/J)

| Technology             | Official Link (Binding)                                         | Intent for EPIC-C/K/J                                                      |
| ---------------------- | --------------------------------------------------------------- | -------------------------------------------------------------------------- |
| **JWT (RFC 7519)**     | [RFC 7519 Spec](https://datatracker.ietf.org/doc/html/rfc7519)  | **C/K/J**: Standard for session tokens, ID tokens, and service assertions. |
| **Asymmetric Signing** | [RFC 7518 (JWA)](https://datatracker.ietf.org/doc/html/rfc7518) | **C**: Mandates RS256 or ES256 for secure, verifiable identity tokens.     |
| **Standard Claims**    | RFC 7519 Section 4.1                                            | **C/J**: Defines the mandatory payload structure for identity and scoping. |
| **Token Revocation**   | Internal Auth Spec                                              | **C**: Standardizes the blacklist/revocation strategy for active sessions. |

---

### 📋 Prompts for Policy Compilation

Use these prompts with your **ENGINEERING POLICY COMPILER** to generate the internal authoritative docs.

#### 1. Session Token & Standard Claims Policy

**Internal Doc Path:** `/docs/official-docs/auth/jwt-session-policy.md`

**Prompt:** Compile the JWT Session & Claim Policy for path `/docs/official-docs/auth/jwt-session-policy.md`. Define the mandatory use of standard claims: `iss` (issuer), `sub` (subject), `aud` (audience), `exp` (expiration), `iat` (issued at), and `jti` (JWT ID). Extract enforceable rules for mapping the `sub` claim to the internal `user.id`. Enforce the requirement that all validator libraries MUST be pinned and configured to reject weak or "none" algorithms.

**Intent:** (Feature C) Ensure a consistent, secure, and interoperable identity format across all system services.

#### 2. Asymmetric Signing & Rotation Standard

**Internal Doc Path:** `/docs/official-docs/auth/jwt-signing-standard.md`

**Prompt:** Compile the JWT Signing & Key Rotation Standard for path `/docs/official-docs/auth/jwt-signing-standard.md`. Define the mandatory use of asymmetric signatures (preferring RS256 or ES256) for all ID tokens. Extract enforceable rules for short-lived access tokens and the requirement to manage signing keys via Vault or Cloud KMS. Define the rotation strategy, including the publication of public keys via a JWKS endpoint to support seamless service-to-service verification.

**Intent:** (Feature C) Protect the integrity of user identities and provide a secure mechanism for verifying tokens without sharing private secrets.

#### 3. Progress Tracking & Scoped Access Policy

**Internal Doc Path:** `/docs/official-docs/EPIC-J/progress-auth-policy.md`

**Prompt:** Compile the Lesson Progress Authentication Policy for path `/docs/official-docs/EPIC-J/progress-auth-policy.md`. Define the mandatory scopes required for progress write and read operations. Extract enforceable rules for token lifetimes specifically for client-side persistence. Enforce the requirement that progress endpoints MUST validate the token's scope and subject before persisting any state changes.

**Intent:** (Feature J6) Secure user progress data and ensure that write operations are correctly authorized and scoped to the authenticated user.

#### 4. Revocation Strategy & Offline Sync Standard

**Internal Doc Path:** `/docs/official-docs/auth/token-revocation-standard.md`

**Prompt:** Compile the Token Revocation & Offline Sync Standard for path `/docs/official-docs/auth/token-revocation-standard.md`. Define the mandatory blacklist strategy for immediate token revocation. Extract enforceable rules for handling "Offline" scenarios where Service Workers attempt to sync progress events; specify how the system should handle expired tokens during a background sync. Define the requirements for refresh token rotation and secure storage on the client.

**Intent:** (Feature C/J) Maintain control over active sessions and provide a graceful degradation path for mobile or intermittent network conditions.

---

### Next Step

With the **Token and Session** layer now mapped, the **EPIC-C Identity Foundation** is fully established.

Would you like me to generate the **TypeScript middleware for JWT verification** that enforces these claim and algorithm rules, or the **Zod schema** for the progress-scoped token payload?
Here are the documentation requirements and the specific **INTERNAL ENGINEERING POLICY COMPILER** prompts for the **Monorepo & Developer Tooling** foundation.

These requirements are pinned to the **EPIC-A (Monorepo Foundation)** layer to ensure deterministic dependency resolution, high-performance task orchestration, and environment parity across the entire developer lifecycle.

### 🏗️ Monorepo & Tooling Documentation Registry (EPIC-A/E/J)

| Technology          | Official Link (Binding)                            | Intent for EPIC-A/E/J                                                       |
| ------------------- | -------------------------------------------------- | --------------------------------------------------------------------------- |
| **pnpm 10.28.1**    | [pnpm.io](https://pnpm.io/)                        | **A/E/J**: Canonical workspace manager and deterministic package installer. |
| **Turborepo 2.8.x** | [turbo.build](https://turbo.build/repo)            | **A/E/F**: Orchestrates task pipelines and manages remote build caching.    |
| **dotenv 16.4.x**   | [dotenv npm](https://www.npmjs.com/package/dotenv) | **A/J**: Standardizes local environment variable loading semantics.         |
| **EditorConfig**    | [editorconfig.org](https://editorconfig.org/)      | **A**: Enforces cross-editor formatting and whitespace consistency.         |

---

### 📋 Prompts for Policy Compilation

Use these prompts with your **ENGINEERING POLICY COMPILER** to generate the internal authoritative docs.

#### 1. pnpm Workspace & CI Install Policy

**Internal Doc Path:** `/docs/official-docs/EPIC-A/pnpm-workspace-policy.md`

**Prompt:** Compile the pnpm Workspace & CI Install Policy for path `/docs/official-docs/EPIC-A/pnpm-workspace-policy.md`. Define the mandatory requirement to pin pnpm to version 10.28.1 in the root `package.json`. Extract enforceable rules for `pnpm-workspace.yaml` to include canonical globs for `apps/*`, `packages/*`, and `services/*`. Enforce the use of `pnpm install --frozen-lockfile` in all CI pipelines to prevent lockfile drift and ensure reproducible installs for verification runners.

**Intent:** (Feature A1/A2) Guarantee that the monorepo structure is stable and that dependencies are resolved identically across local and CI environments.

#### 2. Turborepo Task Pipeline & Caching Standard

**Internal Doc Path:** `/docs/official-docs/EPIC-A/turborepo-pipeline-standard.md`

**Prompt:** Compile the Turborepo Task Pipeline & Caching Standard for path `/docs/official-docs/EPIC-A/turborepo-pipeline-standard.md`. Define the mandatory `turbo.json` schema, including specific pipeline definitions for `build`, `test`, and `verify-lab`. Extract enforceable rules for declaring task `outputs` to enable efficient local and remote caching. Define the integration for cloned lab packages so they are automatically discovered by the `turbo` dependency graph.

**Intent:** (Feature A/E) Optimize build speeds and ensure that lab verification tasks are skipped if the underlying source code and configuration have not changed.

#### 3. Local Environment & Secret Safety Policy

**Internal Doc Path:** `/docs/official-docs/EPIC-A/dotenv-safety-policy.md`

**Prompt:** Compile the Local Environment & Secret Safety Policy for path `/docs/official-docs/EPIC-A/dotenv-safety-policy.md`. Define the mandatory loading order for `.env` files using `dotenv` 16.4.x. Enforce the "Exclusion Mandate": all repositories MUST include a `.env.example` file and strictly ignore the local `.env` in version control. Extract enforceable rules to prevent the bundling of server-side secrets into client-side code, recommending the use of secret managers for all non-local environments.

**Intent:** (Feature A8) Standardize local developer workflows while preventing accidental leaks of sensitive credentials during the development process.

#### 4. Formatting Consistency & EditorConfig Standard

**Internal Doc Path:** `/docs/official-docs/EPIC-A/editorconfig-standard.md`

**Prompt:** Compile the Formatting Consistency & EditorConfig Standard for path `/docs/official-docs/EPIC-A/editorconfig-standard.md`. Define the mandatory root `.editorconfig` rules for indentation, charset, and trailing whitespaces. Extract enforceable requirements for developer onboarding: all contributors MUST use an EditorConfig-compatible IDE or plugin. Define the goal of reducing trivial diffs and whitespace churn across the monorepo.

**Intent:** (Feature A) Maintain a clean, readable codebase and eliminate unnecessary merge conflicts caused by inconsistent editor settings.

---

### Next Step

With the **Monorepo and Tooling** foundation now mapped, the **EPIC-A Developer Experience** is fully codified.

Would you like me to generate the **canonical `pnpm-workspace.yaml` and root `package.json**` that implements these version pins, or the **`turbo.json` pipeline configuration\*\* optimized for your lab verification tasks?
Here are the documentation requirements and the specific **INTERNAL ENGINEERING POLICY COMPILER** prompts for **Shadcn UI**.

The integration strategy for the UI layer focuses on ensuring that the dashboard and editor components in **EPIC-K** and **EPIC-J** are accessible, performant, and correctly synchronized with the underlying VFS and permission models.

### 🏗️ UI Primitives Documentation Registry (EPIC-K/J)

| Technology       | Official Link (Binding)                                           | Intent for EPIC-K/J                                                          |
| ---------------- | ----------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| **Shadcn UI**    | [ui.shadcn.com](https://ui.shadcn.com/)                           | **K/J**: Authoritative primitives for the dashboard and lab chrome.          |
| **Radix UI**     | [radix-ui.com](https://www.radix-ui.com/)                         | **K**: Provides the underlying accessible primitives for complex components. |
| **Tailwind CSS** | [tailwindcss.com](https://tailwindcss.com/)                       | **K/J**: Standardizes utility-first styling and design tokens.               |
| **WAI-ARIA**     | [W3C WAI-ARIA](https://www.w3.org/WAI/standards-guidelines/aria/) | **K**: Baseline for keyboard navigation and screen-reader accessibility.     |

---

### 📋 Prompts for Policy Compilation

#### 1. Component Architecture & VFS Composition Policy

**Internal Doc Path:** `/docs/official-docs/EPIC-K/component-architecture-policy.md`

**Prompt:** Compile the Component Architecture & VFS Composition Policy for path `/docs/official-docs/EPIC-K/component-architecture-policy.md`. Define the mandatory use of Shadcn UI primitives for building the editor chrome and step panels. Extract enforceable rules for ensuring components compose well with the Monaco Editor and the VFS-driven state. Enforce a "Stateless Action" rule: client-only components MUST NOT expose sensitive internal state and must instead route actions as guarded events through the verified VFS APIs.

**Intent:** (Feature K) Ensure a seamless and secure interaction between the user interface and the underlying laboratory file system.

#### 2. Accessibility & Keyboard Workflow Standard

**Internal Doc Path:** `/docs/official-docs/EPIC-K/ui-accessibility-standard.md`

**Prompt:** Compile the UI Accessibility & Keyboard Workflow Standard for path `/docs/official-docs/EPIC-K/ui-accessibility-standard.md`. Define the mandatory requirement for all components to meet WAI-ARIA standards, specifically for keyboard-only workflows. Extract enforceable rules for focus management within the hybrid editor and instructional panels. Define the responsive behavior requirements for low-width layouts to ensure the lab environment remains usable on mobile or split-screen views.

**Intent:** (Feature K) Guarantee that the laboratory interface is inclusive and provides a high-performance experience for all users.

#### 3. Permission-Based Rendering & State Safety Policy

**Internal Doc Path:** `/docs/official-docs/EPIC-K/permission-rendering-policy.md`

**Prompt:** Compile the Permission-Based Rendering & State Safety Policy for path `/docs/official-docs/EPIC-K/permission-rendering-policy.md`. Define the logic for rendering UI controls (e.g., Edit buttons, Commit toggles) based on the active lesson step and the user's permission model. Enforce a rule that the UI must reflect "Read-Only" or "Locked" states in real-time as the student progresses. Extract enforceable constraints to prevent the leakage of sensitive administrative actions into the client-side component tree.

**Intent:** (Feature K/J) Harmonize the visual interface with the underlying security and instructional gates of the lesson.

#### 4. Design Token & Theme Synchronization Standard

**Internal Doc Path:** `/docs/official-docs/ui/theme-synchronization-standard.md`

**Prompt:** Compile the Design Token & Theme Synchronization Standard for path `/docs/official-docs/ui/theme-synchronization-standard.md`. Define the mandatory integration between Shadcn UI tokens and the Monaco Editor's theme. Enforce the use of Tailwind CSS for all custom styling to maintain a consistent visual language. Extract enforceable rules for managing dark/light mode transitions across both the instructional content and the code editing surfaces to ensure a unified developer experience.

**Intent:** (Feature K) Create a seamless, non-jarring visual environment where the code editor and the surrounding UI feel like a single integrated tool.

---

### Next Step

With the **UI Primitives** layer now mapped, the **EPIC-K User Experience** foundation is fully codified.

Would you like me to generate the **Tailwind configuration** that synchronizes your Shadcn tokens with the Monaco Editor's theme, or the **TypeScript interface** for the permission-based component wrapper?
Here are the documentation requirements and the specific **INTERNAL ENGINEERING POLICY COMPILER** prompts for **Unicode Normalization (UAX #15 & UTS #46)**.

These requirements are pinned to the **EPIC-K (Lab UI)** and **EPIC-J (Lesson Delivery)** layers to ensure that the file system, routing, and domain handling are resilient to encoding inconsistencies, homograph attacks, and normalization-based bypasses.

### 🏗️ Unicode Normalization Documentation Registry (EPIC-K/J)

| Technology          | Official Link (Binding)                                              | Intent for EPIC-K/J                                                       |
| ------------------- | -------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| **UAX #15 (NFC)**   | [Unicode Normalization Forms](https://www.unicode.org/reports/tr15/) | **K**: Authoritative standard for path normalization and comparison.      |
| **UTS #46 (IDNA)**  | [Unicode IDNA Compatibility](https://www.unicode.org/reports/tr46/)  | **K/J**: Standardizes domain-like input handling and punycode conversion. |
| **Pathspec Engine** | Internal VFS Spec                                                    | **K**: Integrates normalization with the VFS access control layer.        |
| **Route Validator** | Internal Routing Spec                                                | **J**: Prevents host/route inconsistencies via IDNA normalization.        |

---

### 📋 Prompts for Policy Compilation

#### 1. VFS Path Normalization & Comparison Policy

**Internal Doc Path:** `/docs/official-docs/EPIC-K/vfs-normalization-policy.md`

**Prompt:** Compile the VFS Path Normalization & Comparison Policy for path `/docs/official-docs/EPIC-K/vfs-normalization-policy.md`. Define the mandatory requirement to use UAX #15 NFC (Normalization Form C) for all file paths and VFS access requests. Extract enforceable rules for path comparison: all inputs MUST be normalized before being evaluated against the allowlist or denylist. Enforce a rule that prevents "Encoding Mismatches" by rejecting any path input that contains invalid or non-canonical Unicode sequences.

**Intent:** (Feature K) Ensure that the file system remains deterministic and secure against normalization-based path traversal or access bypasses.

#### 2. Domain-Like Input & IDNA Normalization Standard

**Internal Doc Path:** `/docs/official-docs/EPIC-K/idna-normalization-standard.md`

**Prompt:** Compile the Domain-Like Input & IDNA Normalization Standard for path `/docs/official-docs/EPIC-K/idna-normalization-standard.md`. Define the mandatory use of UTS #46 for any inputs used in routing or domain-like file access. Extract enforceable rules for Punycode conversion and the rejection of invalid labels to avoid hostname mismatches. Enforce the requirement that IDNA normalization MUST be applied before any certificate or hostname validation occurs.

**Intent:** (Feature K/J) Standardize internationalized input handling and prevent security vulnerabilities related to host/route inconsistencies.

#### 3. Routing Inconsistency & Percent-Encoding Policy

**Internal Doc Path:** `/docs/official-docs/EPIC-J/routing-normalization-policy.md`

**Prompt:** Compile the Routing Normalization & Encoding Policy for path `/docs/official-docs/EPIC-J/routing-normalization-policy.md`. Define the distinction between applying IDNA (UTS #46) and percent-encoding within lesson routes. Extract enforceable rules for validating route segments to ensure they do not contain deceptive Unicode characters (e.g., lookalikes/homographs). Enforce the requirement to normalize all domain-like segments during lesson ingestion and rendering to maintain route stability.

**Intent:** (Feature J4) Protect the integrity of lesson navigation and prevent accidental or malicious route shadowing in preview and production environments.

#### 4. Anti-Cheat & Forensic Path Integrity Standard

**Internal Doc Path:** `/docs/official-docs/EPIC-I/path-forensics-standard.md`

**Prompt:** Compile the Path Forensics & Integrity Standard for path `/docs/official-docs/EPIC-I/path-forensics-standard.md`. Define the integration between Unicode normalization and the anti-cheat audit model. Enforce the requirement that all recorded file operations in the `AuditLog` MUST use the NFC-normalized path as the primary key. Extract enforceable rules for detecting "Suspicious Encoding" attempts, where non-normalized or homograph paths are used to evade detection patterns.

**Intent:** (Feature I) Secure the forensic timeline and ensure that the abuse control system cannot be bypassed through complex character encodings.

---

### Next Step

With the **Unicode Normalization** layer now mapped, the **EPIC-K/J Linguistic & Path Safety** framework is complete.

Would you like me to generate the **TypeScript `UnicodeValidator` utility** that implements these NFC and IDNA rules, or the **Zod schema transformations** for your routing and VFS inputs?
Here are the documentation requirements and the specific **INTERNAL ENGINEERING POLICY COMPILER** prompts for **Git & CODEOWNERS**.

These requirements are pinned to the **EPIC-A (Monorepo Foundation)** and **EPIC-F (GitHub Integration)** layers to ensure high-integrity repository management, automated reviewer assignments, and the enforcement of "Locked Surfaces" within the laboratory templates.

### 🏗️ Git & Governance Documentation Registry (EPIC-A/E/F)

| Technology            | Official Link (Binding)                                                                                                                                                                    | Intent for EPIC-A/E/F                                                        |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------- |
| **Git**               | [git-scm.com](https://git-scm.com/)                                                                                                                                                        | **A/F/K**: Authoritative version control system and repository semantics.    |
| **CODEOWNERS**        | [GitHub CODEOWNERS Spec](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners)                            | **A/E/F**: Mechanically enforces file ownership and reviewer gates.          |
| **Branch Protection** | [GitHub Branch Protection](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/defining-the-mergeability-of-pull-requests/about-protected-branches) | **A/F**: Standardizes the requirements for merging (status checks, reviews). |
| **Forgea Config**     | Internal `forgea.config.json` Spec                                                                                                                                                         | **E**: Defines the canonical discovery path for lab configuration.           |

---

### 📋 Prompts for Policy Compilation

#### 1. Monorepo Ownership & Reviewer Gate Policy

**Internal Doc Path:** `/docs/official-docs/EPIC-A/repo-ownership-policy.md`

**Prompt:** Compile the Monorepo Ownership & Reviewer Gate Policy for path `/docs/official-docs/EPIC-A/repo-ownership-policy.md`. Define the mandatory root `CODEOWNERS` mapping for the monorepo: apps (`/apps/*`), shared packages (`/packages/*`), and core services (`/services/*`). Extract enforceable rules for tying these ownership globs to branch protection: all pull requests MUST receive an approving review from the designated owner before merging. Define the process for updating ownership records and documenting temporary exceptions.

**Intent:** (Feature A1) Establish a clear chain of responsibility and ensure that architectural boundaries are maintained through human and automated review.

#### 2. Template Locking & Protected Surfaces Standard

**Internal Doc Path:** `/docs/official-docs/EPIC-E/template-locking-standard.md`

**Prompt:** Compile the Template Locking & Protected Surfaces Standard for path `/docs/official-docs/EPIC-E/template-locking-standard.md`. Define the mandatory `CODEOWNERS` entries for lab templates to protect critical paths: `/tests/**` (QA) and `/verifier/**` (Security). Enforce the "Locked Surface" mandate: these paths are read-only for template authors and require explicit approvals for modifications. Extract the requirement for a repository-level README in every template that documents the exact clone and instantiation steps for the Integration Checker.

**Intent:** (Feature E) Protect the integrity of verification scripts and prevent unauthorized modifications to the core laboratory logic.

#### 3. App-Driven Branch Protection & Lifecycle Standard

**Internal Doc Path:** `/docs/official-docs/EPIC-F/app-branch-protection-standard.md`

**Prompt:** Compile the App-Driven Branch Protection & Lifecycle Standard for path `/docs/official-docs/EPIC-F/app-branch-protection-standard.md`. Define the mandatory protection rules for repositories managed by the Forgea GitHub App: require status checks and prohibit direct pushes to protected branches. Extract enforceable rules for how the App interacts with these protections: the App MUST use Pull Requests and request reviews from `CODEOWNERS` rather than bypassing guards. Define the repository lifecycle states: draft, published, and archived.

**Intent:** (Feature F) Ensure that automated repository actions follow the same rigorous security and review standards as manual contributions.

#### 4. Repository Hygiene & Git Configuration Policy

**Internal Doc Path:** `/docs/official-docs/EPIC-A/git-hygiene-policy.md`

**Prompt:** Compile the Git Hygiene & Configuration Policy for path `/docs/official-docs/EPIC-A/git-hygiene-policy.md`. Define the mandatory `.gitignore` templates and pre-commit hook recommendations for the monorepo. Enforce the requirement for deterministic `forgea.config.json` placement to ensure discoverability by system tooling. Extract enforceable rules for large-file handling and the documentation of repository metadata (Lab ID, Package Name) required for cross-service indexing.

**Intent:** (Feature A) Maintain a clean, performant, and well-structured version control environment that supports rapid scaling and automated discovery.

---

### Next Step

With the **Git and Governance** layer now mapped, the **EPIC-A/F Repository Workflow** is fully codified.

Would you like me to generate the **canonical root `CODEOWNERS` file** for your monorepo structure or the **Terraform HCL for the GitHub Branch Protection** rules that enforce these reviewer gates?

For a deeper dive into the mechanics of automated review gating, this guide on [GitHub CODEOWNERS and Branch Protection](https://www.google.com/search?q=https://www.youtube.com/watch%3Fv%3DS372SST76m0) explains how to configure the exact reviewer assignment and status check requirements defined in the EPIC-A/F policies.

This video is relevant because it demonstrates how to turn architectural "ownership" into an enforceable CI/CD gate, which is critical for our monorepo and template security goals.
Here are the documentation requirements and the specific **INTERNAL ENGINEERING POLICY COMPILER** prompts for **Chroma**.

Based on the project's AI and knowledge retrieval strategy, we are pinning these requirements to the **EPIC-D (Lesson Creation System)** layer to ensure that RAG workflows are supported by a deterministic, scalable, and version-aligned vector database foundation.

### 🏗️ Vector DB Documentation Registry (EPIC-D)

| Technology         | Official Link (Binding)                     | Intent for EPIC-D                                                     |
| ------------------ | ------------------------------------------- | --------------------------------------------------------------------- |
| **Chroma**         | [trychroma.com](https://www.trychroma.com/) | **D4**: Primary vector store for lesson knowledge and RAG retrieval.  |
| **RAG Workflow**   | Internal AI Spec                            | **D**: Standardizes the retrieval-augmented generation pipeline.      |
| **Embeddings**     | Internal Model Spec                         | **D**: Defines the canonical embedding dimensions and model versions. |
| **Vector Storage** | Internal Persistence Spec                   | **D**: Authoritative standard for disk vs. managed backend selection. |

---

### 📋 Prompts for Policy Compilation

Use these prompts with your **ENGINEERING POLICY COMPILER** to generate the internal authoritative docs.

#### 1. Chroma Baseline & Persistence Backend Policy

**Internal Doc Path:** `/docs/official-docs/EPIC-D/chroma-baseline-policy.md`

**Prompt:** Compile the Chroma Baseline & Persistence Policy for path `/docs/official-docs/EPIC-D/chroma-baseline-policy.md`. Define the mandatory requirement to pin the Chroma version and its persistence backend (e.g., Disk or S3). Extract enforceable rules to ensure embedding dimension compatibility across all collections. Enforce a rule that any change to the backend configuration MUST be verified for query semantic consistency.

**Intent:** (Feature D4) Eliminate "embedding drift" and ensure that the vector storage layer provides a stable and reproducible retrieval baseline.

#### 2. Collection Metadata & Lifecycle Standard

**Internal Doc Path:** `/docs/official-docs/EPIC-D/collection-lifecycle-standard.md`

**Prompt:** Compile the Collection Metadata & Lifecycle Standard for path `/docs/official-docs/EPIC-D/collection-lifecycle-standard.md`. Define the mandatory metadata schema for all collections, including `lesson_id`, `section`, and `chunk_id`. Extract enforceable rules for TTLs (Time-to-Live) and freshening strategies to be applied during content updates. Enforce the requirement that all ingestion pipelines MUST populate these metadata fields to support granular retrieval filtering.

**Intent:** (Feature D4) Standardize the organization of vector data and ensure that lesson knowledge remains current and easily accessible for generation tasks.

#### 3. Operational Resiliency & Scalability Standard

**Internal Doc Path:** `/docs/official-docs/EPIC-D/chroma-operations-standard.md`

**Prompt:** Compile the Chroma Operational Resiliency Standard for path `/docs/official-docs/EPIC-D/chroma-operations-standard.md`. Provide guidance for sharding, replication, and backup procedures tailored to vector data. Extract enforceable rules for periodic integrity checks of the vector index. Define the requirement for a "Cold-Standby" or secondary replication strategy to protect against regional service outages.

**Intent:** (Feature D) Ensure high availability for the RAG infrastructure and protect the integrity of the lesson knowledge base.

#### 4. Embedding Model & Reindexing Standard

**Internal Doc Path:** `/docs/official-docs/EPIC-D/vector-reindexing-policy.md`

**Prompt:** Compile the Vector Reindexing Policy for path `/docs/official-docs/EPIC-D/vector-reindexing-policy.md`. Define the mandatory procedure for full-scale reindexing whenever prompt templates or embedding models change. Extract enforceable rules for capturing model-version metadata within the collection headers. Enforce the use of blue-green collection swapping to maintain retrieval uptime during reindexing events.

**Intent:** (Feature D4) Guarantee that the vector search results remain semantically aligned with the active AI model and instruction set.

---

### Next Step

With the **Vector Database** layer now mapped, the **EPIC-D RAG Architecture** is fully established.

Would you like me to generate the **TypeScript client configuration** that implements these metadata filters and version pins, or the **GitHub Action** that orchestrates the automated reindexing of your Chroma collections?

For an implementation deep-dive, this guide on [Scaling Vector Databases for Production](https://www.google.com/search?q=https://www.youtube.com/watch%3Fv%3DR9KbeEw72pY) covers the exact sharding and metadata-filtering patterns required for high-volume educational RAG workflows.

This video is relevant because it demonstrates how to maintain performance and consistency in large-scale vector indices, which is a core requirement for our Lesson Creation System.
Here are the documentation requirements and the specific **INTERNAL ENGINEERING POLICY COMPILER** prompts for the **Bedrock Knowledge Base**.

Based on the project's AI strategy, we are pinning these requirements to the **AWS Managed** service to future-proof the RAG infrastructure and automate the synchronization between S3-stored content and vector indices for **EPIC-D and G**.

### 🏗️ Bedrock Knowledge Base Documentation Registry (EPIC-D/G)

| Technology                 | Official Link (Binding)                                                                             | Intent for EPIC-D/G                                                                |
| -------------------------- | --------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| **Bedrock Knowledge Base** | [AWS Bedrock KB](https://aws.amazon.com/bedrock/knowledge-bases/)                                   | **D4**: Managed vector knowledge storage for cloud-native RAG deployments.         |
| **S3 Vector Sync**         | [Bedrock Data Sources](https://docs.aws.amazon.com/bedrock/latest/userguide/knowledge-base-ds.html) | **D4**: Automates the ingestion and embedding of lesson knowledge from S3.         |
| **AWS SDK**                | [AWS SDK for JavaScript](https://aws.amazon.com/sdk-for-javascript/)                                | **D**: Standardizes the programmatic interaction with Bedrock managed collections. |

---

### 📋 Prompts for Policy Compilation

Use these prompts with your **ENGINEERING POLICY COMPILER** to generate the internal authoritative docs.

#### 1. Managed Vector Sync & Ingestion Policy

**Internal Doc Path:** `/docs/official-docs/EPIC-D/bedrock-sync-policy.md`

**Prompt:** Compile the Managed Vector Sync & Ingestion Policy for path `/docs/official-docs/EPIC-D/bedrock-sync-policy.md`. Define the mandatory sync patterns from the canonical lesson storage in S3 to the Bedrock vector collections. Extract enforceable rules for handling content updates and triggered re-indexing to ensure the knowledge base remains synchronized with the source MDX/JSON artifacts. Enforce the pinning of AWS SDK versions to maintain stable integration with the managed service.

**Intent:** (Feature D4) Ensure a reliable and automated pipeline for keeping AI-retrieved knowledge current and consistent with the lesson repository.

#### 2. Model Compatibility & Indexing Standard

**Internal Doc Path:** `/docs/official-docs/EPIC-D/bedrock-indexing-standard.md`

**Prompt:** Compile the Bedrock Model Compatibility & Indexing Standard for path `/docs/official-docs/EPIC-D/bedrock-indexing-standard.md`. Document the supported embedding models and the corresponding indexing constraints. Extract enforceable rules for maintaining embedding dimension parity across different collections to allow for cross-collection queries. Define the requirement for capturing model-version metadata in the ingestion logs for forensic retrieval audits.

**Intent:** (Feature D4) Guarantee that the retrieval engine uses vetted embedding models that align with the project's performance and accuracy requirements.

#### 3. RAG Cost & Latency Optimization Policy

**Internal Doc Path:** `/docs/official-docs/EPIC-D/bedrock-cost-latency-policy.md`

**Prompt:** Compile the Bedrock Cost & Latency Optimization Policy for path `/docs/official-docs/EPIC-D/bedrock-cost-latency-policy.md`. Define the mandatory evaluation criteria for using managed Bedrock versus self-hosted Chroma, specifically for large-scale workloads. Extract enforceable rules for monitoring query latency and token consumption per retrieval event. Enforce the requirement to provide cost estimations in the generation manifest to prevent unexpected cloud spend during peak laboratory usage.

**Intent:** (Feature D) Optimize the operational budget and user experience by balancing the convenience of managed services with performance and cost-efficiency.

#### 4. Cloud-Native Provenance & Audit Standard

**Internal Doc Path:** `/docs/official-docs/EPIC-G/bedrock-provenance-standard.md`

**Prompt:** Compile the Cloud-Native Provenance & Audit Standard for path `/docs/official-docs/EPIC-G/bedrock-provenance-standard.md`. Define the requirements for logging all Knowledge Base retrieval operations to the system's immutable audit sink. Enforce the inclusion of retrieval metadata—such as source chunk IDs and model versions—in the generated lesson snapshots. Define the integration with CloudWatch and CloudTrail to maintain a forensic-grade record of knowledge access and synchronization events.

**Intent:** (Feature G) Secure the content generation chain and provide a clear audit trail for any AI-augmented instructional material.

---

### Next Step

With the **Bedrock Knowledge Base** now integrated into the **EPIC-D/G Knowledge Layer**, the **Cloud-Native RAG** foundation is complete.

Would you like me to generate the **Terraform HCL for the Bedrock Knowledge Base and S3 Data Source** or the **TypeScript client** for performing filtered retrieval against your managed collections?

For a practical demonstration of how to configure these synchronization patterns, this guide on [Building RAG Applications with Amazon Bedrock](https://www.google.com/search?q=https://www.youtube.com/watch%3Fv%3DxS6-OaFf-O8) covers the exact S3 ingestion and embedding configurations required by our EPIC-D synchronization policies.

This video is relevant because it demonstrates the "sync-and-forget" capability of the managed Knowledge Base, which is central to our goal of reducing operational overhead for lesson retrieval workflows.
Here are the documentation requirements and the specific **INTERNAL ENGINEERING POLICY COMPILER** prompts for the **Web API Layer (Real-time & Persistence)**.

Based on the laboratory UI strategy, these requirements are pinned to **EPIC-K (Lab UI)** and **EPIC-I (Anti-Cheat)** to ensure the web-based editor provides a seamless, high-integrity experience for real-time collaboration, instructional streaming, and draft preservation.

### 🏗️ Web API Documentation Registry (EPIC-K/I)

| Technology            | Official Link (Binding)                                                                         | Intent for EPIC-K/I                                                                |
| --------------------- | ----------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| **WebSocket**         | [RFC 6455](https://datatracker.ietf.org/doc/html/rfc6455)                                       | **K**: Authoritative channel for real-time session sync and collaborative editing. |
| **SSE / EventSource** | [HTML Living Standard](https://html.spec.whatwg.org/multipage/server-sent-events.html)          | **K**: Primary mechanism for server-driven instructional and step updates.         |
| **Web Storage**       | [Web Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API)             | **I/K**: Standardizes client-side semantics for local/session drafts.              |
| **Window Event**      | [beforeunload Spec](https://developer.mozilla.org/en-US/docs/Web/API/Window/beforeunload_event) | **I/K**: Enforces deterministic "unsaved-changes" warning behavior.                |

---

### 📋 Prompts for Policy Compilation

#### 1. Real-time Session Orchestration & WebSocket Policy

**Internal Doc Path:** `/docs/official-docs/EPIC-K/websocket-session-policy.md`

**Prompt:** Compile the Real-time Session Orchestration Policy for path `/docs/official-docs/EPIC-K/websocket-session-policy.md`. Define the mandatory use of RFC 6455 WebSockets for collaborative editing, step progress, and permission changes. Extract enforceable rules for securing the channel and integrating with the VFS for real-time file synchronization. Define the requirement for robust reconnection logic and session continuity handling during network transitions.

**Intent:** (Feature K) Guarantee a low-latency, secure environment for multi-user coordination and immediate state updates in the hybrid editor.

#### 2. Streaming Instruction & SSE Lifecycle Standard

**Internal Doc Path:** `/docs/official-docs/EPIC-K/instruction-streaming-standard.md`

**Prompt:** Compile the Streaming Instruction & SSE Lifecycle Standard for path `/docs/official-docs/EPIC-K/instruction-streaming-standard.md`. Define the mandatory use of SSE (EventSource) for unidirectional server-driven updates, including instructions and step changes. Extract enforceable rules for integrating these streams with the editor and VFS panels. Define the "Robust Error Handling" mandate to ensure instruction panels remain functional during transient server-side failures.

**Intent:** (Feature K) Provide a resilient, efficient delivery mechanism for real-time pedagogical content without the overhead of full bidirectional communication.

#### 3. Client-Side Draft Safety & Persistence Policy

**Internal Doc Path:** `/docs/official-docs/EPIC-K/draft-persistence-policy.md`

**Prompt:** Compile the Client-Side Draft Safety & Persistence Policy for path `/docs/official-docs/EPIC-K/draft-persistence-policy.md`. Define the mandatory localStorage and sessionStorage semantics for local student drafts. Enforce the requirement for the `window.beforeunload` event to warn users of unsaved changes before a navigation or refresh occurs. Define the logic for auto-purging session-scoped storage upon successful commit to the remote VFS to prevent state drift.

**Intent:** (Feature I/K) Protect student work against accidental data loss and maintain a clear distinction between local edits and verified system states.

#### 4. Real-time Forensic Signal & Audit Ingestion Standard

**Internal Doc Path:** `/docs/official-docs/EPIC-I/streaming-audit-standard.md`

**Prompt:** Compile the Streaming Audit & Anti-Cheat Standard for path `/docs/official-docs/EPIC-I/streaming-audit-standard.md`. Define the requirement to log all streaming events from WebSockets and SSE for audit and anti-cheat tracking. Extract enforceable rules for transmitting real-time anti-cheat signals through the WebSocket channel. Define the integration with the forensic audit model to ensure that streaming interactions are recorded with high-resolution timestamps in the system timeline.

**Intent:** (Feature I/K) Secure the integrity of laboratory interactions and provide the forensic data necessary to detect and mitigate unauthorized state manipulations.

---

### Next Step

With the **Real-time Web APIs** layer now mapped, the **EPIC-K Collaborative Foundation** is complete.

Would you like me to generate the **TypeScript client-side wrapper for the WebSocket reconnection logic** or the **Zod schema** for the instructional SSE payload?
Here are the documentation requirements and the specific **INTERNAL ENGINEERING POLICY COMPILER** prompts for this set of **Advanced Web APIs**.

Based on the project's strategy for laboratory interactivity and progress integrity, these requirements are pinned to **EPIC-K (Lab UI)**, **EPIC-I (Anti-Cheat)**, and **EPIC-J (Lesson Delivery)** to ensure that client-side capabilities like background synchronization, visibility tracking, and file access are governed by strict security and pedagogical gates.

### 🏗️ Advanced Web API Documentation Registry (EPIC-K/I/J)

| Technology               | Official Link (Binding)                                                                                 | Intent for EPIC-K/I/J                                                         |
| ------------------------ | ------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| **Clipboard API**        | [Clipboard API Spec](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API)                    | **K**: Controlled copy/paste semantics to prevent unauthorized data transfer. |
| **File System Access**   | [File System Access API](https://developer.mozilla.org/en-US/docs/Web/API/File_System_Access_API)       | **K**: Manages controlled client-side downloads and file exports.             |
| **IndexedDB**            | [IndexedDB API Spec](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API)                    | **I/K**: Durable storage for large client-side drafts and offline state.      |
| **IntersectionObserver** | [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) | **J**: Standardizes visibility thresholds for reliable progress tracking.     |
| **Service Workers**      | [Service Workers API](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)              | **J**: Enables offline buffering and reliable background sync of events.      |

---

### 📋 Prompts for Policy Compilation

#### 1. Clipboard Security & Anti-Cheat Enforcement Policy

**Internal Doc Path:** `/docs/official-docs/EPIC-K/clipboard-security-policy.md`

**Prompt:** Compile the Clipboard Security & Anti-Cheat Policy for path `/docs/official-docs/EPIC-K/clipboard-security-policy.md`. Define the mandatory restrictions for clipboard events based on the active lesson step and permission model. Extract enforceable rules for logging all copy/paste actions for forensic audit and anti-cheat tracking. Enforce the requirement that the lab UI MUST prevent unauthorized external data transfer during high-integrity lesson stages.

**Intent:** (Feature K) Protect the pedagogical integrity of the lab by restricting and auditing how data enters and leaves the editor environment.

#### 2. Managed File Access & Download Constraints Standard

**Internal Doc Path:** `/docs/official-docs/EPIC-K/file-access-constraints.md`

**Prompt:** Compile the Managed File Access & Download Constraints Standard for path `/docs/official-docs/EPIC-K/file-access-constraints.md`. Define the mandatory constraints for client-side file access using the File System Access API. Extract enforceable rules for restricting file downloads and uploads based on the current user permission level and lesson step. Enforce the integration between these constraints and the VFS to ensure all file exports follow the project's canonical sanitization and audit rules.

**Intent:** (Feature K) Ensure that students can only interact with local files through a secure, audited gateway that respects lesson-specific boundaries.

#### 3. Section Visibility & Progress Detection Standard

**Internal Doc Path:** `/docs/official-docs/EPIC-J/progress-visibility-standard.md`

**Prompt:** Compile the Section Visibility & Progress Detection Standard for path `/docs/official-docs/EPIC-J/progress-visibility-standard.md`. Define the mandatory IntersectionObserver threshold values and debounce strategies for marking sections as "viewed." Extract enforceable rules for low-overhead progress tracking using a single delegated observer. Define the requirement for graceful fallbacks (e.g., manual triggers) in environments where the API is unavailable to ensure progress data remains consistent.

**Intent:** (Feature J5/J6) Implement a reliable, high-performance mechanism for tracking learner engagement and progress without inducing duplicate events.

#### 4. Offline Sync & Background Persistence Policy

**Internal Doc Path:** `/docs/official-docs/EPIC-J/offline-sync-policy.md`

**Prompt:** Compile the Offline Sync & Background Persistence Policy for path `/docs/official-docs/EPIC-J/offline-sync-policy.md`. Define the mandatory use of Service Workers for buffering progress events and enabling background synchronization. Extract enforceable rules for storage durability, eviction policies, and the secure handling of auth tokens in the worker context. Define the reconciliation logic for matching buffered events with server-side idempotency keys to prevent duplicate progress records.

**Intent:** (Feature J6) Guarantee that learner progress is never lost due to intermittent connectivity while maintaining strict security and data integrity.

#### 5. Durable Draft Storage & State Preservation Standard

**Internal Doc Path:** `/docs/official-docs/EPIC-I/draft-storage-standard.md`

**Prompt:** Compile the Durable Draft Storage & State Preservation Standard for path `/docs/official-docs/EPIC-I/draft-storage-standard.md`. Define the mandatory requirement to use IndexedDB for durable client-side storage of large drafts and complex session states. Extract enforceable rules for ensuring state parity between the local IndexedDB store and the remote VFS. Enforce the requirement that these local stores MUST be cleared or synchronized upon successful submission to maintain a clean forensic record of the student's work.

**Intent:** (Feature I/K) Provide a robust "fail-safe" for student work-in-progress, enabling recovery from browser crashes or session timeouts.

---

### Next Step

With the **Advanced Web API** layer now mapped, the **EPIC-K/J Persistence & Integrity** framework is fully codified.

Would you like me to generate the **TypeScript `IntersectionObserver` manager** that implements the progress thresholds or the **Service Worker script** for handling the idempotent background sync of progress events?

For a deeper dive into modern storage strategies, this session on [Offline Storage with IndexedDB and Service Workers](https://www.youtube.com/watch?v=vb7fkBeblcw) covers the exact background sync and persistence patterns required by our EPIC-J/K reliability policies.

This video is relevant because it demonstrates how to build resilient applications that preserve user state under unstable network conditions, a core requirement for our laboratory and progress-tracking goals.
Here are the documentation requirements and the specific **INTERNAL ENGINEERING POLICY COMPILER** prompts for **WHATWG URL / RFC 3986**.

Based on the project's web standards strategy, these requirements are pinned to ensure consistent path handling, secure routing, and deterministic URL normalization across the laboratory UI and lesson delivery systems in **EPIC-K** and **EPIC-J**.

### 🏗️ URL Standards Documentation Registry (EPIC-K/J)

| Technology          | Official Link (Binding)                                             | Intent for EPIC-K/J                                                                     |
| ------------------- | ------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| **WHATWG URL**      | [Living Standard](https://url.spec.whatwg.org/)                     | **K/J**: Authoritative standard for modern browser-based URL parsing and normalization. |
| **RFC 3986**        | [URI Generic Syntax](https://datatracker.ietf.org/doc/html/rfc3986) | **K/J**: Provides the baseline for URI syntax, normalization, and comparison rules.     |
| **Normalization**   | Internal VFS / Routing Spec                                         | **K/J**: Standardizes the conversion of `:domain` and `:lessonId` segments.             |
| **Pathspec Engine** | Internal VFS Spec                                                   | **K**: Integrates URL normalization with the VFS access control layer.                  |

---

### 📋 Prompts for Policy Compilation

#### 1. URL Normalization & Parser Baseline Policy

**Internal Doc Path:** `/docs/official-docs/web-standards/url-normalization-policy.md`

**Prompt:** Compile the URL Normalization & Parser Baseline Policy for path `/docs/official-docs/web-standards/url-normalization-policy.md`. Define the mandatory requirement to pin the URL parser implementation to the WHATWG URL living standard. Extract enforceable rules for normalizing lesson and file URLs before they reach the VFS or editor access layers. Enforce a rule that requires consistent normalization behavior between server and client parsers to prevent duplicate resources or mismatched navigation.

**Intent:** (Feature K/J) Eliminate "parser drift" and ensure that all system components interpret routing and file paths identically.

#### 2. Path Traversal & Encoding Safety Standard

**Internal Doc Path:** `/docs/official-docs/EPIC-K/url-security-standard.md`

**Prompt:** Compile the URL Security & Path Traversal Standard for path `/docs/official-docs/EPIC-K/url-security-standard.md`. Define the mandatory logic for detecting and preventing path traversal attempts within URL segments. Extract enforceable rules for handling percent-encoding and Unicode normalization during URL resolution. Define the requirement to reject any URL that contains deceptive or non-canonical encoding sequences that could bypass VFS permission gates.

**Intent:** (Feature K) Protect the laboratory environment and the underlying host from unauthorized access via manipulated URL paths.

#### 3. Routing Canonicalization & Segment Validation Standard

**Internal Doc Path:** `/docs/official-docs/EPIC-J/routing-canonicalization-standard.md`

**Prompt:** Compile the Routing Canonicalization & Segment Validation Standard for path `/docs/official-docs/EPIC-J/routing-canonicalization-standard.md`. Define the mandatory normalization steps for `:domain` and `:lessonId` path segments prior to route generation. Extract enforceable rules for applying RFC 3986 allowances versus WHATWG URL differences where relevant. Enforce the requirement to validate all route segments to prevent collisions and ensure route stability across lesson ingestion and rendering.

**Intent:** (Feature J4) Maintain the integrity of lesson navigation and prevent accidental or malicious route shadowing in preview and production environments.

#### 4. Shared Pipeline & Anti-Cheat Integration Standard

**Internal Doc Path:** `/docs/official-docs/EPIC-I/url-forensics-standard.md`

**Prompt:** Compile the URL Forensics & Anti-Cheat Integration Standard for path `/docs/official-docs/EPIC-I/url-forensics-standard.md`. Define the requirement for a shared, canonical normalization pipeline to be used by both the system orchestrator and the anti-cheat detection engine. Enforce the recording of "Normalized Request URLs" in the immutable `AuditLog` for every file and lesson access event. Extract enforceable rules for detecting "Encoding Mismatches" between client-submitted URLs and normalized server-side records to identify evasion attempts.

**Intent:** (Feature I/K) Secure the forensic timeline and ensure that the abuse control system can reliably track and audit user interactions with laboratory and lesson resources.

---

### Next Step

With the **URL and Routing Standards** layer now mapped, the **EPIC-K/J Navigation Integrity** framework is fully codified.

Would you like me to generate the **TypeScript `URLCanonicalizer` utility** that implements these shared normalization rules or the **Zod schema** for validating normalized `:domain` and `:lessonId` segments?
