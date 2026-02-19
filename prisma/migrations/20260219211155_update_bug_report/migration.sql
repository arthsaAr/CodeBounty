/*
  Warnings:

  - You are about to drop the column `createdAt` on the `BugReport` table. All the data in the column will be lost.
  - Added the required column `hunterId` to the `BugReport` table without a default value. This is not possible if the table is not empty.
  - Added the required column `severity` to the `BugReport` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BugReport" DROP COLUMN "createdAt",
ADD COLUMN     "hunterId" INTEGER NOT NULL,
ADD COLUMN     "lineNumbers" TEXT,
ADD COLUMN     "severity" TEXT NOT NULL,
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'pending';

-- AddForeignKey
ALTER TABLE "BugReport" ADD CONSTRAINT "BugReport_hunterId_fkey" FOREIGN KEY ("hunterId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
