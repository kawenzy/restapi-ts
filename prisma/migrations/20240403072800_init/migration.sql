/*
  Warnings:

  - Added the required column `userCmId` to the `Comment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "userCmId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_userCmId_fkey" FOREIGN KEY ("userCmId") REFERENCES "User"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
