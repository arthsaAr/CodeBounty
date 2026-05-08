/*
  Warnings:

  - Added the required column `filePath` to the `Bounty` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Bounty" ADD COLUMN     "filePath" TEXT NOT NULL;
