-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('CANDIDATE', 'ADMIN', 'RECRUITER');

-- CreateEnum
CREATE TYPE "SubscriptionTier" AS ENUM ('FREE', 'PRO', 'ENTERPRISE');

-- CreateEnum
CREATE TYPE "LabStatus" AS ENUM ('IN_PROGRESS', 'STUCK', 'VERIFIED_PASS', 'DEFERRED');

-- CreateEnum
CREATE TYPE "FailureClass" AS ENUM ('RESOURCE_LEAK', 'STATE_CORRUPTION', 'RENDERING_FAILURE', 'SECURITY_EXPOSURE', 'PERFORMANCE_DEGRADATION', 'DATA_INTEGRITY');

-- CreateTable
CREATE TABLE "User" (
    "id" UUID NOT NULL,
    "githubId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" "UserRole" NOT NULL,
    "tier" "SubscriptionTier" NOT NULL,
    "icprScore" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Lab" (
    "id" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "epic" TEXT NOT NULL,
    "failureClass" "FailureClass" NOT NULL,
    "sourceGithubIssueUrl" TEXT NOT NULL,
    "repoVersion" TEXT NOT NULL,
    "baseRepoUrl" TEXT NOT NULL,
    "constraints" JSONB NOT NULL,

    CONSTRAINT "Lab_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LabSession" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "labId" UUID NOT NULL,
    "status" "LabStatus" NOT NULL DEFAULT 'IN_PROGRESS',
    "userForkUrl" TEXT NOT NULL,
    "previewUrl" TEXT,
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastActivityAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LabSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationLog" (
    "id" UUID NOT NULL,
    "sessionId" UUID NOT NULL,
    "commitSha" TEXT NOT NULL,
    "prDiff" TEXT NOT NULL,
    "ciOutput" TEXT NOT NULL,
    "verifiedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "VerificationLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ResumeBullet" (
    "id" UUID NOT NULL,
    "sessionId" UUID NOT NULL,
    "bulletText" TEXT NOT NULL,
    "atsKeywords" TEXT[],

    CONSTRAINT "ResumeBullet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuditLog" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "action" TEXT NOT NULL,
    "metadata" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AuditLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_githubId_key" ON "User"("githubId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationLog_sessionId_key" ON "VerificationLog"("sessionId");

-- CreateIndex
CREATE UNIQUE INDEX "ResumeBullet_sessionId_key" ON "ResumeBullet"("sessionId");

-- AddForeignKey
ALTER TABLE "LabSession" ADD CONSTRAINT "LabSession_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LabSession" ADD CONSTRAINT "LabSession_labId_fkey" FOREIGN KEY ("labId") REFERENCES "Lab"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VerificationLog" ADD CONSTRAINT "VerificationLog_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "LabSession"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResumeBullet" ADD CONSTRAINT "ResumeBullet_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "LabSession"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuditLog" ADD CONSTRAINT "AuditLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
