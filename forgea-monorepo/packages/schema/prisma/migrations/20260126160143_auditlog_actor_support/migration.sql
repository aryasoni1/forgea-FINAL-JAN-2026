/*
  Warnings:

  - Added the required column `actorId` to the `AuditLog` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AuditLog" ADD COLUMN     "actorId" TEXT NOT NULL,
ALTER COLUMN "userId" DROP NOT NULL,
ALTER COLUMN "metadata" DROP NOT NULL;

-- CreateIndex
CREATE INDEX "Lab_failureClass_idx" ON "Lab"("failureClass");
