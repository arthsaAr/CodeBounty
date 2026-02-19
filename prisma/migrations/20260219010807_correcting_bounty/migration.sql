/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Bounty` table. All the data in the column will be lost.
  - You are about to drop the column `reward` on the `Bounty` table. All the data in the column will be lost.
  - Added the required column `amount` to the `Bounty` table without a default value. This is not possible if the table is not empty.
  - Added the required column `creatorId` to the `Bounty` table without a default value. This is not possible if the table is not empty.
  - Added the required column `difficulty` to the `Bounty` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Bounty" DROP COLUMN "createdAt",
DROP COLUMN "reward",
ADD COLUMN     "amount" INTEGER NOT NULL,
ADD COLUMN     "creatorId" INTEGER NOT NULL,
ADD COLUMN     "difficulty" TEXT NOT NULL,
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'active';

-- AddForeignKey
ALTER TABLE "Bounty" ADD CONSTRAINT "Bounty_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
