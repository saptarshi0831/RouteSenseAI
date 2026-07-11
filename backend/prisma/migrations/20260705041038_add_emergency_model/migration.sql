-- DropForeignKey
ALTER TABLE "Emergency" DROP CONSTRAINT "Emergency_userId_fkey";

-- DropForeignKey
ALTER TABLE "LiveLocation" DROP CONSTRAINT "LiveLocation_userId_fkey";

-- DropForeignKey
ALTER TABLE "ShareSession" DROP CONSTRAINT "ShareSession_creatorId_fkey";

-- AlterTable
ALTER TABLE "Emergency" ALTER COLUMN "status" SET DEFAULT 'ACTIVE';

-- AddForeignKey
ALTER TABLE "LiveLocation" ADD CONSTRAINT "LiveLocation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShareSession" ADD CONSTRAINT "ShareSession_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Emergency" ADD CONSTRAINT "Emergency_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
