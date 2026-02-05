import { AsyncLocalStorage } from "async_hooks";
import type { Prisma } from "@prisma/client";
import crypto from "node:crypto";
import {
  AuditAction,
  AuditActorType,
  AuditResourceType,
  AuditSeverity,
} from "../../schema/src/audit-actions";
import { db } from "../../schema/src/db";

/**
 * AUDIT LOGS ARE APPEND-ONLY.
 * Updates and deletes are forbidden at DB level.
 * Any attempt indicates a security breach.
 */

export type AuditMetadataMap = {
  [AuditAction.USER_LOGIN]: {
    provider?: "credentials" | "github";
    ip?: string;
    userAgent?: string;
  };
  [AuditAction.USER_REGISTER]: {
    provider?: "credentials" | "github";
    ip?: string;
    userAgent?: string;
  };

  [AuditAction.LAB_START]: {
    labId: string;
  };
  [AuditAction.LAB_VERIFY_ATTEMPT]: {
    labId: string;
    commitSha?: string;
    prUrl?: string;
  };
  [AuditAction.LAB_VERIFY_SUCCESS]: {
    labId: string;
    commitSha: string;
    prUrl: string;
    verificationLogId: string;
  };
  [AuditAction.LAB_VERIFY_FAIL]: {
    labId: string;
    commitSha?: string;
    prUrl?: string;
    verificationLogId?: string;
    failureReason?: string;
  };

  [AuditAction.LAB_STATUS_TRANSITION]: {
    labId: string;
    labSessionId: string;
    fromStatus: string;
    toStatus: string;
    reason?: string;
  };

  [AuditAction.RESUME_GENERATED]: {
    sessionId: string;
    labId: string;
    resumeBulletId?: string;
  };

  [AuditAction.SUBSCRIPTION_UPDATE]: {
    from: string;
    to: string;
    stripeEventId?: string;
  };

  [AuditAction.ADMIN_OVERRIDE]: {
    targetUserId?: string;
    labSessionId?: string;
    overrideReason: string;
  };
};

export type AuditActor = {
  id: string;
  type: AuditActorType;
};

export type AuditResource = {
  id: string;
  type: AuditResourceType;
};

type CorrelationContext = {
  correlationId: string;
};

const correlationStorage = new AsyncLocalStorage<CorrelationContext>();

export const RequestContext = {
  run<T>(correlationId: string, fn: () => T): T {
    return correlationStorage.run({ correlationId }, fn);
  },
  getCorrelationId(): string | undefined {
    return correlationStorage.getStore()?.correlationId;
  },
};

const MAX_METADATA_BYTES = 12 * 1024;

// Scrub explicit sensitive keys (exact match after normalization).
const FORBIDDEN_KEYS_NORMALIZED = new Set<string>([
  "password",
  "accesstoken",
  "refreshtoken",
  "apikey",
  "secret",
  "token",
  "idtoken",
]);

function normalizeKey(key: string): string {
  return key.toLowerCase().replace(/[^a-z0-9]/g, "");
}

function shouldScrubKey(key: string): boolean {
  return FORBIDDEN_KEYS_NORMALIZED.has(normalizeKey(key));
}

function scrubMetadataValue(value: unknown): unknown {
  if (value === null) return null;

  if (Array.isArray(value)) {
    return value.map((v) => scrubMetadataValue(v));
  }

  if (typeof value === "object") {
    const obj = value as Record<string, unknown>;
    const out: Record<string, unknown> = {};

    for (const [k, v] of Object.entries(obj)) {
      if (shouldScrubKey(k)) continue;
      out[k] = scrubMetadataValue(v);
    }

    return out;
  }

  return value;
}

function scrubMetadata<T extends Record<string, unknown>>(
  metadata: T,
): Record<string, unknown> {
  const scrubbed = scrubMetadataValue(metadata);
  return typeof scrubbed === "object" && scrubbed !== null
    ? (scrubbed as Record<string, unknown>)
    : {};
}

function severityForAction(action: AuditAction): AuditSeverity {
  switch (action) {
    case AuditAction.USER_LOGIN:
    case AuditAction.USER_REGISTER:
    case AuditAction.LAB_START:
    case AuditAction.LAB_VERIFY_SUCCESS:
    case AuditAction.RESUME_GENERATED:
      return AuditSeverity.LOW;

    case AuditAction.LAB_VERIFY_ATTEMPT:
    case AuditAction.SUBSCRIPTION_UPDATE:
      return AuditSeverity.MEDIUM;

    case AuditAction.LAB_VERIFY_FAIL:
    case AuditAction.ADMIN_OVERRIDE:
      return AuditSeverity.HIGH;

    case AuditAction.LAB_STATUS_TRANSITION:
      return AuditSeverity.MEDIUM;
  }
}

function byteLengthOfJson(value: unknown): number {
  const json = JSON.stringify(value);
  return new TextEncoder().encode(json).byteLength;
}

function enforceMetadataSize(
  metadata: Record<string, unknown>,
): Record<string, unknown> {
  try {
    const size = byteLengthOfJson(metadata);
    if (size <= MAX_METADATA_BYTES) return metadata;

    // Truncate safely: keep only core forensic fields.
    return {
      truncated: true,
      originalSizeBytes: size,
      // Keep a small, stable set of keys if present.
      actorType: metadata.actorType,
      severity: metadata.severity,
      resource: metadata.resource,
      correlationId: metadata.correlationId,
    };
  } catch {
    return {
      truncated: true,
      serializationFailed: true,
    };
  }
}

async function emitSecurityAlert(payload: {
  action: AuditAction;
  severity: AuditSeverity;
  actorId: string;
  actorType: AuditActorType;
  resourceId: string;
  resourceType: AuditResourceType;
  correlationId?: string;
}): Promise<void> {
  const url = process.env.FORGEA_SECURITY_ALERT_SINK_URL;
  if (!url) return;

  try {
    await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
      keepalive: true,
    });
  } catch (error) {
    // Never block the main request on alerting.
    // eslint-disable-next-line no-console
    console.error("[AUDIT_ALERT_FAILED]", { action: payload.action, error });
  }
}

export class AuditService {
  private constructor() {}

  /**
   * Append-only audit write.
   * - Never throws (logging failures must not block main request)
   * - Scrubs explicit secret keys recursively
   * - Stores actorType/resourceType/severity in structured metadata
   * - Uses server-generated correlationId only (RequestContext); never trusts caller input
   * - Enforces metadata max size to prevent DoS/DB bloat
   *
   * TODO: Archive AuditLogs > 12 months to cold storage (S3 / BigQuery).
   * TODO: Add eslint/code-review enforcement that critical writes must call AuditService.log.
   */
  static async log<A extends AuditAction>(
    actor: AuditActor,
    action: A,
    resource: AuditResource,
    metadata: AuditMetadataMap[A],
  ): Promise<void> {
    try {
      const existingCorrelationId = RequestContext.getCorrelationId();
      const correlationId = existingCorrelationId ?? crypto.randomUUID();
      const scrubbed = scrubMetadata(metadata as Record<string, unknown>);

      const severity = severityForAction(action);

      const finalMetadata: Record<string, unknown> = {
        actorType: actor.type,
        severity,
        resource: {
          type: resource.type,
          id: resource.id,
        },
        ...scrubbed,
        correlationId,
        ...(existingCorrelationId ? {} : { correlationMissing: true }),
      };

      const boundedMetadata = enforceMetadataSize(finalMetadata);

      const isUserActor =
        actor.type === AuditActorType.USER ||
        actor.type === AuditActorType.ADMIN;

      await db.auditLog.create({
        data: {
          userId: isUserActor ? actor.id : undefined,
          actorId: actor.id,
          action,
          metadata: boundedMetadata as Prisma.InputJsonValue,
        },
      });

      if (severity === AuditSeverity.HIGH) {
        void emitSecurityAlert({
          action,
          severity,
          actorId: actor.id,
          actorType: actor.type,
          resourceId: resource.id,
          resourceType: resource.type,
          correlationId,
        });
      }
    } catch (error) {
      // Audit failures must never crash or block the main request.
      // eslint-disable-next-line no-console
      console.error("[AUDIT_LOG_WRITE_FAILED]", {
        actorId: actor.id,
        action,
        resourceId: resource.id,
        error,
      });
    }
  }
}
