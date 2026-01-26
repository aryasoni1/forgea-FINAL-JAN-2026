import crypto from "crypto";
import { db } from "@/lib/db";
import { AuditService } from "../../../../../../packages/audit/src/audit.service";
import {
  AuditAction,
  AuditActorType,
  AuditResourceType,
} from "../../../../../../packages/schema/src";
import { LabStatus } from "@prisma/client";

type GitHubPushPayload = {
  after?: string;
  repository?: {
    html_url?: string;
    name?: string;
    full_name?: string;
  };
};

const SYSTEM_ACTOR = {
  type: AuditActorType.SYSTEM,
  id: "github-webhook",
} as const;

export async function POST(req: Request) {
  const secret = process.env.GITHUB_WEBHOOK_SECRET ?? "";

  // Event filtering: only handle push events
  const event = req.headers.get("x-github-event");
  if (event !== "push") {
    return new Response("Event ignored", { status: 200 });
  }

  // Read raw body for HMAC verification
  const buf = Buffer.from(await req.arrayBuffer());

  const signature = req.headers.get("x-hub-signature-256") || "";
  if (!signature || !signature.startsWith("sha256=")) {
    return new Response("Invalid signature header", { status: 401 });
  }

  if (!secret) {
    // Missing secret — treat as unauthorized
    // eslint-disable-next-line no-console
    console.error("[GITHUB_WEBHOOK_FAILED] missing GITHUB_WEBHOOK_SECRET");
    return new Response("Invalid signature", { status: 401 });
  }

  try {
    const expected = crypto
      .createHmac("sha256", secret)
      .update(buf)
      .digest("hex");
    const received = signature.replace(/^sha256=/, "");

    const expectedBuf = Buffer.from(expected, "hex");
    const receivedBuf = Buffer.from(received, "hex");

    if (
      expectedBuf.length !== receivedBuf.length ||
      !crypto.timingSafeEqual(expectedBuf, receivedBuf)
    ) {
      return new Response("Invalid signature", { status: 401 });
    }

    const payload = JSON.parse(buf.toString("utf8")) as GitHubPushPayload;

    const repositoryUrl = payload.repository?.html_url;
    const commitSha = payload.after ?? "";

    if (!repositoryUrl) {
      // Nothing to do, but return 200 so GitHub won't retry
      return new Response("Missing repository URL", { status: 200 });
    }

    // Find an active LabSession (IN_PROGRESS or STUCK) matching the fork URL
    const session = await db.labSession.findFirst({
      where: {
        userForkUrl: repositoryUrl,
        status: { in: [LabStatus.IN_PROGRESS, LabStatus.STUCK] },
      },
    });

    if (!session) {
      // No matching session — still return 200 to avoid retries
      return new Response("No matching session", { status: 200 });
    }

    // Log an audit entry for the verification attempt
    try {
      await AuditService.log(
        SYSTEM_ACTOR,
        AuditAction.LAB_VERIFY_ATTEMPT,
        { type: AuditResourceType.LAB, id: session.labId } as any,
        { labId: session.labId, commitSha },
      );
    } catch (auditErr) {
      // Audit failures should not block the main flow
      // eslint-disable-next-line no-console
      console.error("[AUDIT_LOG_WRITE_FAILED]", {
        sessionId: session.id,
        error: auditErr,
      });
    }

    // Update the session: set to IN_PROGRESS and bump lastActivityAt
    await db.labSession.update({
      where: { id: session.id },
      data: {
        status: LabStatus.IN_PROGRESS,
        lastActivityAt: new Date(),
      },
    });

    return new Response("Success", { status: 200 });
  } catch (error) {
    // Log and return 200 so GitHub doesn't continually retry on server errors
    // eslint-disable-next-line no-console
    console.error("[GITHUB_WEBHOOK_FAILED]", { error });
    return new Response("Processing failed", { status: 200 });
  }
}
