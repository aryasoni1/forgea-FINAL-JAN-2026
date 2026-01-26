import { type NextAuthOptions } from "next-auth";
import GitHub from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { db } from "@/lib/db";
import { headers } from "next/headers";
import bcrypt from "bcryptjs";
import { z } from "zod";
import crypto from "node:crypto";
import {
  AuditService,
  RequestContext,
} from "../../packages/audit/src/audit.service";
import {
  AuditAction,
  AuditActorType,
  AuditResourceType,
} from "../../packages/schema/src/audit-actions";
import { UserRole } from "../../packages/schema/src/types";

const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const authConfig = {
  adapter: PrismaAdapter(db),
  session: {
    strategy: "database",
  },
  events: {
    async signIn({
      user,
      account,
    }: {
      user: { id?: string | null; email?: string | null };
      account?: { provider?: string | null } | null;
    }) {
      try {
        const h = headers();
        const userAgent = h.get("user-agent") ?? undefined;
        const forwardedFor = h.get("x-forwarded-for") ?? "";
        const ip = forwardedFor.split(",")[0]?.trim() || undefined;
        const correlationId = h.get("x-request-id") ?? crypto.randomUUID();

        const userId = user?.id ? String(user.id) : "";
        const dbUser = userId
          ? await db.user.findUnique({ where: { id: userId } })
          : null;
        const actorType =
          dbUser?.role === UserRole.ADMIN
            ? AuditActorType.ADMIN
            : AuditActorType.USER;

        await RequestContext.run(correlationId, async () => {
          await AuditService.log(
            { id: userId, type: actorType },
            AuditAction.USER_LOGIN,
            { id: userId, type: AuditResourceType.USER },
            {
              provider: account?.provider as
                | "credentials"
                | "github"
                | undefined,
              ip,
              userAgent,
            },
          );
        });
      } catch (error) {
        // Never block sign-in on audit failures.
        // eslint-disable-next-line no-console
        console.error("[AUDIT_LOGIN_HOOK_FAILED]", error);
      }
    },

    async createUser({
      user,
    }: {
      user: { id?: string | null; email?: string | null };
    }) {
      try {
        const h = headers();
        const userAgent = h.get("user-agent") ?? undefined;
        const forwardedFor = h.get("x-forwarded-for") ?? "";
        const ip = forwardedFor.split(",")[0]?.trim() || undefined;
        const correlationId = h.get("x-request-id") ?? crypto.randomUUID();

        const userId = user?.id ? String(user.id) : "";

        await RequestContext.run(correlationId, async () => {
          await AuditService.log(
            { id: userId, type: AuditActorType.USER },
            AuditAction.USER_REGISTER,
            { id: userId, type: AuditResourceType.USER },
            {
              provider: undefined,
              ip,
              userAgent,
            },
          );
        });
      } catch (error) {
        // Never block user creation on audit failures.
        // eslint-disable-next-line no-console
        console.error("[AUDIT_REGISTER_HOOK_FAILED]", error);
      }
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  providers: [
    GitHub({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
      allowDangerousEmailAccountLinking: false,
      profile(profile: { id: string | number; email?: string | null }) {
        return {
          id: profile.id.toString(),
          email: profile.email,
          githubId: profile.id.toString(),
        };
      },
    }),
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: Record<string, unknown> | undefined) {
        const validatedCredentials = credentialsSchema.safeParse(credentials);

        if (!validatedCredentials.success) {
          return null;
        }

        const { email, password } = validatedCredentials.data;

        const user = await db.user.findUnique({
          where: { email },
          include: { accounts: true },
        });

        if (!user) {
          return null;
        }

        const credentialsAccount = user.accounts.find(
          (acc: { provider: string; access_token?: string | null }) =>
            acc.provider === "credentials",
        );

        if (!credentialsAccount || !credentialsAccount.access_token) {
          return null;
        }

        const passwordMatch = await bcrypt.compare(
          password,
          credentialsAccount.access_token,
        );

        if (!passwordMatch) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
        };
      },
    }),
  ],
} satisfies NextAuthOptions;
