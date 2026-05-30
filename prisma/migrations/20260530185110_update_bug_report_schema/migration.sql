/*
  Warnings:

  - You are about to drop the column `lineNumbers` on the `BugReport` table. All the data in the column will be lost.
  - Added the required column `lineEnd` to the `BugReport` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lineStart` to the `BugReport` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `severity` on the `BugReport` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Severity" AS ENUM ('easy', 'medium', 'hard', 'critical');

-- AlterTable
ALTER TABLE "BugReport" DROP COLUMN "lineNumbers",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "lineEnd" INTEGER NOT NULL,
ADD COLUMN     "lineStart" INTEGER NOT NULL,
DROP COLUMN "severity",
ADD COLUMN     "severity" "Severity" NOT NULL;
