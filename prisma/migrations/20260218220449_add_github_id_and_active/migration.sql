/*
  Warnings:

  - A unique constraint covering the columns `[githubId]` on the table `Repository` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `githubId` to the `Repository` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Repository" ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "githubId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Repository_githubId_key" ON "Repository"("githubId");
