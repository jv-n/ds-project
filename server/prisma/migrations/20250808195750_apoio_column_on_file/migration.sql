/*
  Warnings:

  - You are about to drop the column `documentacao` on the `Apoio` table. All the data in the column will be lost.
  - You are about to drop the column `usuarioId` on the `ONG` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "ONG" DROP CONSTRAINT "ONG_usuarioId_fkey";

-- DropIndex
DROP INDEX "ONG_usuarioId_key";

-- AlterTable
ALTER TABLE "Apoio" DROP COLUMN "documentacao";

-- AlterTable
ALTER TABLE "File" ADD COLUMN     "apoioId" INTEGER;

-- AlterTable
ALTER TABLE "ONG" DROP COLUMN "usuarioId";

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_apoioId_fkey" FOREIGN KEY ("apoioId") REFERENCES "Apoio"("id") ON DELETE SET NULL ON UPDATE CASCADE;
