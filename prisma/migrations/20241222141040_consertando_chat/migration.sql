-- AlterTable
ALTER TABLE "Chat" ALTER COLUMN "content" SET NOT NULL,
ALTER COLUMN "content" SET DEFAULT 'Sem conteúdo',
ALTER COLUMN "content" SET DATA TYPE TEXT;
