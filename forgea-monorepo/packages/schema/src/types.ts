import type { UserRole } from "@prisma/client";

/**
 * RBAC primitives (STRICT, non-hierarchical)
 * Trust > Convenience. Default deny.
 */

export enum SubscriptionTier {
  FREE = "FREE",
  PRO = "PRO",
  ENTERPRISE = "ENTERPRISE",
}

export enum AdminPermission {
  LAB_OPS = "LAB_OPS", // Generate / mutate labs
  SIGNAL_TUNING = "SIGNAL_TUNING", // ICPR calibration
  USER_AUDIT = "USER_AUDIT", // View integrity logs
  SUPER_ADMIN = "SUPER_ADMIN", // Billing + kill-switch
}

/**
 * Capabilities are the ONLY thing RBAC checks.
 * No stringly-typed permissions.
 */
export enum Capability {
  // Subscription-gated (explicit; NO tier ordering)
  ACCESS_FOUNDATIONAL_LABS = "ACCESS_FOUNDATIONAL_LABS",
  ACCESS_SENIOR_LABS = "ACCESS_SENIOR_LABS",
  ACCESS_SENIOR_CONTEXT_API = "ACCESS_SENIOR_CONTEXT_API",
  GENERATE_RESUME_BULLETS = "GENERATE_RESUME_BULLETS",

  // Role-gated
  ACCESS_DASHBOARD = "ACCESS_DASHBOARD",
  VIEW_PROOF_PAGES = "VIEW_PROOF_PAGES",
  ACCESS_ADMIN_PANEL = "ACCESS_ADMIN_PANEL",

  // Admin permission-gated (explicit; never implied by ADMIN role)
  GENERATE_LABS = "GENERATE_LABS",
  TUNE_SIGNALS = "TUNE_SIGNALS",
  VIEW_INTEGRITY_LOGS = "VIEW_INTEGRITY_LOGS",
}

/**
 * Session claims used for Edge authorization decisions.
 *
 * SECURITY REQUIREMENTS (enforced by auth/session issuance, not middleware):
 * - Admin permissions stored in DB
 * - Loaded once at login/sign-in
 * - Immutable during session lifetime
 * - Session rotated/invalidated on permission change
 */
export interface SessionUser {
  id: string;
  email: string;
  role: UserRole;
  subscriptionTier: SubscriptionTier;
  /**
   * MUST be server-issued (DB-derived at login) and NOT client-editable.
   * Middleware treats unknown/invalid values as unauthenticated (fail-closed).
   */
  adminPermissions: AdminPermission[];
}

/**
 * Minimal audit payload for admin-gated decisions.
 * (Edge-safe: ship to an audit sink; no DB writes in middleware.)
 */
export interface AuditEvent {
  userId: string;
  role: UserRole;
  subscriptionTier: SubscriptionTier;

  capability: Capability;
  allowed: boolean;

  route: string;
  method: string;

  reason?: string;

  timestampIso: string;
  ip?: string;
  userAgent?: string;
  requestId?: string;
}
