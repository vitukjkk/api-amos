/*
  Warnings:

  - You are about to drop the column `userId` on the `Objective` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userName]` on the table `Objective` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userName` to the `Objective` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Objective" DROP CONSTRAINT "Objective_userId_fkey";

-- DropIndex
DROP INDEX "Objective_userId_key";

-- AlterTable
ALTER TABLE "Objective" DROP COLUMN "userId",
ADD COLUMN     "userName" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Objective_userName_key" ON "Objective"("userName");

-- AddForeignKey
ALTER TABLE "Objective" ADD CONSTRAINT "Objective_userName_fkey" FOREIGN KEY ("userName") REFERENCES "User"("username") ON DELETE RESTRICT ON UPDATE CASCADE;
