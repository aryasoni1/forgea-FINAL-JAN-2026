/**
 * Strict audit actions (legal-grade). NO free-form strings.
 * Do not add values without a schema + compliance review.
 */
export enum AuditAction {
  USER_LOGIN = "USER_LOGIN",
  USER_REGISTER = "USER_REGISTER",

  LAB_START = "LAB_START",
  LAB_VERIFY_ATTEMPT = "LAB_VERIFY_ATTEMPT",
  LAB_VERIFY_SUCCESS = "LAB_VERIFY_SUCCESS",
  LAB_VERIFY_FAIL = "LAB_VERIFY_FAIL",

  RESUME_GENERATED = "RESUME_GENERATED",

  SUBSCRIPTION_UPDATE = "SUBSCRIPTION_UPDATE",

  ADMIN_OVERRIDE = "ADMIN_OVERRIDE",
}

export enum AuditActorType {
  USER = "USER",
  ADMIN = "ADMIN",
  SYSTEM = "SYSTEM",
}

export enum AuditResourceType {
  LAB = "LAB",
  USER = "USER",
  SUBSCRIPTION = "SUBSCRIPTION",
  PAYMENT = "PAYMENT",
  SYSTEM = "SYSTEM",
}

export enum AuditSeverity {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
}
