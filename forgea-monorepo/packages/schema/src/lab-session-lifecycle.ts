import type { Prisma } from "@prisma/client";
import { LabStatus } from "@prisma/client";
import { AuditAction, AuditActorType, AuditResourceType } from "./audit-actions";
import { db } from "./db";

type TransitionActor = {
  id: string;
  type: AuditActorType;
};

type TransitionInput = {
  sessionId: string;
  to: LabStatus;
  from?: LabStatus[];
  data?: Omit<Prisma.LabSessionUpdateInput, "status">;
  actor: TransitionActor;
  reason?: string;
};

export const LAB_SESSION_TRANSITIONS: Record<LabStatus, readonly LabStatus[]> = {
  [LabStatus.IN_PROGRESS]: [
    LabStatus.IN_PROGRESS,
    LabStatus.STUCK,
    LabStatus.VERIFIED_PASS,
    LabStatus.DEFERRED,
  ],
  [LabStatus.STUCK]: [
    LabStatus.STUCK,
    LabStatus.IN_PROGRESS,
    LabStatus.VERIFIED_PASS,
    LabStatus.DEFERRED,
  ],
  [LabStatus.DEFERRED]: [LabStatus.DEFERRED, LabStatus.IN_PROGRESS],
  [LabStatus.VERIFIED_PASS]: [LabStatus.VERIFIED_PASS],
};

export function isLabSessionTransitionAllowed(
  from: LabStatus,
  to: LabStatus,
): boolean {
  return LAB_SESSION_TRANSITIONS[from]?.includes(to) ?? false;
}

export async function transitionLabSession({
  sessionId,
  to,
  from,
  data,
  actor,
  reason,
}: TransitionInput): Promise<void> {
  if (data && "status" in data) {
    throw new Error("LabSession transition rejected: status must be set via 'to'.");
  }

  await db.$transaction(async (tx) => {
    const session = await tx.labSession.findUnique({
      where: { id: sessionId },
      select: {
        id: true,
        status: true,
        labId: true,
        userId: true,
      },
    });

    if (!session) {
      throw new Error("LabSession transition rejected: session not found.");
    }

    const currentStatus = session.status;

    if (from && !from.includes(currentStatus)) {
      throw new Error(
        `LabSession transition rejected: expected ${from.join(", ")}, got ${currentStatus}.`,
      );
    }

    if (!isLabSessionTransitionAllowed(currentStatus, to)) {
      throw new Error(
        `LabSession transition rejected: ${currentStatus} -> ${to} is not allowed.`,
      );
    }

    const updateData: Prisma.LabSessionUpdateInput = {
      ...(data ?? {}),
      ...(to !== currentStatus ? { status: to } : {}),
    };

    const updateResult = await tx.labSession.updateMany({
      where: { id: sessionId, status: currentStatus },
      data: updateData,
    });

    if (updateResult.count !== 1) {
      throw new Error(
        "LabSession transition rejected: concurrent update detected.",
      );
    }

    await tx.auditLog.create({
      data: {
        actorId: actor.id,
        userId: session.userId,
        action: AuditAction.LAB_STATUS_TRANSITION,
        metadata: {
          actorType: actor.type,
          resource: {
            type: AuditResourceType.LAB,
            id: session.labId,
          },
          labId: session.labId,
          labSessionId: session.id,
          fromStatus: currentStatus,
          toStatus: to,
          statusChanged: to !== currentStatus,
          reason,
        },
      },
    });
  });
}
