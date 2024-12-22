/*
  Warnings:

  - The `content` column on the `Chat` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `folderId` to the `ChatFolder` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Chat" DROP COLUMN "content",
ADD COLUMN     "content" TEXT[] DEFAULT ARRAY['Sem conteúdo']::TEXT[];

-- AlterTable
ALTER TABLE "ChatFolder" ADD COLUMN     "folderId" TEXT NOT NULL;
