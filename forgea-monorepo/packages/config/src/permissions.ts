import {
  AdminPermission,
  Capability,
  SubscriptionTier,
  UserRole,
  type AuditEvent,
  type SessionUser,
} from "@forgea/schema";

/**
 * Centralized route exposure policy (middleware must consume this; no hardcoding).
 */
export const ROUTES = {
  publicPaths: [
    "/",
    "/login",
    "/signup",
    "/pricing",
    "/terms",
    "/privacy",
  ] as const,

  /**
   * Public API paths that must not be blocked by default-deny `/api/*` policy.
   * Keep this list minimal and explicit.
   */
  publicApiPathRegexes: [/^\/api\/auth(?:\/.*)?$/] as const,

  /**
   * Protected prefixes enforced by middleware (explicit; no implicit policy).
   */
  protectedPrefixes: ["/dashboard", "/admin", "/api"] as const,
} as const;

/**
 * Permission matrix (capability-based, non-hierarchical).
 * - No bitmasks
 * - No ordering assumptions
 * - Default deny
 * - RBAC only (no quotas / billing / rate-limits)
 */
export const PERMISSIONS: {
  byTier: Record<SubscriptionTier, readonly Capability[]>;
  byRole: Record<UserRole, readonly Capability[]>;
  byAdminPermission: Record<AdminPermission, readonly Capability[]>;
} = {
  byTier: {
    [SubscriptionTier.FREE]: [Capability.ACCESS_FOUNDATIONAL_LABS],
    [SubscriptionTier.PRO]: [
      Capability.ACCESS_FOUNDATIONAL_LABS,
      Capability.ACCESS_SENIOR_LABS,
      Capability.GENERATE_RESUME_BULLETS,
      Capability.ACCESS_SENIOR_CONTEXT_API,
    ],
    [SubscriptionTier.ENTERPRISE]: [
      Capability.ACCESS_FOUNDATIONAL_LABS,
      Capability.ACCESS_SENIOR_LABS,
      Capability.GENERATE_RESUME_BULLETS,
      Capability.ACCESS_SENIOR_CONTEXT_API,
    ],
  },

  byRole: {
    [UserRole.CANDIDATE]: [
      Capability.ACCESS_DASHBOARD,
      Capability.VIEW_PROOF_PAGES,
    ],
    [UserRole.RECRUITER]: [
      Capability.ACCESS_DASHBOARD,
      Capability.VIEW_PROOF_PAGES,
    ],
    [UserRole.ADMIN]: [
      Capability.ACCESS_DASHBOARD,
      Capability.ACCESS_ADMIN_PANEL,
      Capability.VIEW_PROOF_PAGES,
    ],
  },

  byAdminPermission: {
    [AdminPermission.LAB_OPS]: [Capability.GENERATE_LABS],
    [AdminPermission.SIGNAL_TUNING]: [Capability.TUNE_SIGNALS],
    [AdminPermission.USER_AUDIT]: [Capability.VIEW_INTEGRITY_LOGS],
    [AdminPermission.SUPER_ADMIN]: [],
  },
};

export type RouteRule =
  | {
      kind: "roles";
      pattern: RegExp;
      allowedRoles: readonly UserRole[];
      auditIfAdmin?: true;
    }
  | {
      kind: "capability";
      pattern: RegExp;
      requiredCapability: Capability;
      auditIfAdmin?: true;
    };

/**
 * Route rules (capabilities, NOT hierarchies).
 * IMPORTANT: `/api/*` is default-deny unless matched here or whitelisted in ROUTES.publicApiPathRegexes.
 */
export const ROUTE_RULES: readonly RouteRule[] = [
  // /dashboard/* -> explicit role allow-list
  {
    kind: "roles",
    pattern: /^\/dashboard(?:\/.*)?$/,
    allowedRoles: [UserRole.CANDIDATE, UserRole.RECRUITER, UserRole.ADMIN],
  },

  // /admin/* -> requires ADMIN role (explicit) + auditable
  {
    kind: "roles",
    pattern: /^\/admin(?:\/.*)?$/,
    allowedRoles: [UserRole.ADMIN],
    auditIfAdmin: true,
  },

  // Paid endpoints (explicit capability flags; no tier ordering)
  {
    kind: "capability",
    pattern: /^\/api\/senior-context(?:\/.*)?$/,
    requiredCapability: Capability.ACCESS_SENIOR_CONTEXT_API,
    auditIfAdmin: true,
  },
  {
    kind: "capability",
    pattern: /^\/api\/resume\/generate$/,
    requiredCapability: Capability.GENERATE_RESUME_BULLETS,
    auditIfAdmin: true,
  },

  // Admin-permission endpoints (explicit)
  {
    kind: "capability",
    pattern: /^\/api\/labs\/generate$/,
    requiredCapability: Capability.GENERATE_LABS,
    auditIfAdmin: true,
  },
] as const;

function isEnumValue<T extends Record<string, string>>(
  enumObj: T,
  value: unknown,
): value is T[keyof T] {
  return typeof value === "string" && Object.values(enumObj).includes(value);
}

/**
 * Validate and normalize session user claims (fail-closed).
 * If invalid, treat as unauthenticated.
 */
export function parseSessionUser(input: unknown): SessionUser | null {
  const u = input as Partial<SessionUser> | null | undefined;
  if (!u || typeof u !== "object") return null;

  if (typeof u.id !== "string" || u.id.length === 0) return null;
  if (typeof u.email !== "string" || u.email.length === 0) return null;

  if (!isEnumValue(UserRole, u.role)) return null;
  if (!isEnumValue(SubscriptionTier, u.subscriptionTier)) return null;

  const perms = Array.isArray(u.adminPermissions) ? u.adminPermissions : [];
  const normalizedPerms: AdminPermission[] = [];

  for (const p of perms) {
    if (!isEnumValue(AdminPermission, p)) return null;
    normalizedPerms.push(p);
  }

  // Prevent privilege injection: non-admins must not carry admin permissions.
  if (u.role !== UserRole.ADMIN && normalizedPerms.length > 0) {
    return null;
  }

  return {
    id: u.id,
    email: u.email,
    role: u.role,
    subscriptionTier: u.subscriptionTier,
    adminPermissions: normalizedPerms,
  };
}

/**
 * Capability evaluation (explicit, fail-closed).
 */
export function canUserPerform(
  user: SessionUser,
  capability: Capability,
): { allowed: true } | { allowed: false; reason: string } {
  const roleCaps = PERMISSIONS.byRole[user.role] ?? [];
  if (roleCaps.includes(capability)) {
    return { allowed: true };
  }

  const tierCaps = PERMISSIONS.byTier[user.subscriptionTier] ?? [];
  if (tierCaps.includes(capability)) {
    return { allowed: true };
  }

  if (user.role === UserRole.ADMIN) {
    for (const perm of user.adminPermissions) {
      const permCaps = PERMISSIONS.byAdminPermission[perm] ?? [];
      if (permCaps.includes(capability)) {
        return { allowed: true };
      }
    }
  }

  return { allowed: false, reason: `Missing capability: ${capability}` };
}

export function matchRouteRule(pathname: string): RouteRule | null {
  for (const rule of ROUTE_RULES) {
    if (rule.pattern.test(pathname)) return rule;
  }
  return null;
}

/**
 * Audit hook (Edge-safe):
 * - MUST be called for admin-gated decisions (allow/deny)
 * - No DB calls here; ship to an external sink if configured
 */
export async function emitAuditEvent(event: AuditEvent): Promise<void> {
  const sinkUrl = process.env.FORGEA_AUDIT_SINK_URL;

  if (typeof sinkUrl === "string" && sinkUrl.length > 0) {
    try {
      await fetch(sinkUrl, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(event),
        keepalive: true,
      });
      return;
    } catch {
      // Fail closed applies to authorization, not telemetry.
    }
  }

  // Minimal fallback hook (replace with real sink).
  // eslint-disable-next-line no-console
  console.info("[AUDIT]", JSON.stringify(event));
}
