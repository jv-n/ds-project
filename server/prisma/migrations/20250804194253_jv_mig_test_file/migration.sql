/*
  Warnings:

  - You are about to drop the column `notaFiscalAcao` on the `Empresa` table. All the data in the column will be lost.
  - You are about to drop the column `notaFiscalProj` on the `Empresa` table. All the data in the column will be lost.
  - You are about to drop the column `apoio` on the `ONG` table. All the data in the column will be lost.
  - You are about to drop the column `causa` on the `ONG` table. All the data in the column will be lost.
  - You are about to drop the column `localizacao` on the `ONG` table. All the data in the column will be lost.
  - You are about to drop the column `nome` on the `ONG` table. All the data in the column will be lost.
  - You are about to drop the column `empresaId` on the `Selo` table. All the data in the column will be lost.
  - You are about to drop the column `nome` on the `Usuario` table. All the data in the column will be lost.
  - You are about to drop the `Acao` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Projeto` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ApoioEmpresaAcao` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ApoioEmpresaProjeto` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[usuarioId]` on the table `Empresa` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[usuarioId]` on the table `ONG` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[cnpj]` on the table `Usuario` will be added. If there are existing duplicate values, this will fail.
  - Made the column `nome` on table `Empresa` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `cnpj` to the `Usuario` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Acao" DROP CONSTRAINT "Acao_ongId_fkey";

-- DropForeignKey
ALTER TABLE "Projeto" DROP CONSTRAINT "Projeto_ongId_fkey";

-- DropForeignKey
ALTER TABLE "Selo" DROP CONSTRAINT "Selo_empresaId_fkey";

-- DropForeignKey
ALTER TABLE "_ApoioEmpresaAcao" DROP CONSTRAINT "_ApoioEmpresaAcao_A_fkey";

-- DropForeignKey
ALTER TABLE "_ApoioEmpresaAcao" DROP CONSTRAINT "_ApoioEmpresaAcao_B_fkey";

-- DropForeignKey
ALTER TABLE "_ApoioEmpresaProjeto" DROP CONSTRAINT "_ApoioEmpresaProjeto_A_fkey";

-- DropForeignKey
ALTER TABLE "_ApoioEmpresaProjeto" DROP CONSTRAINT "_ApoioEmpresaProjeto_B_fkey";

-- AlterTable
ALTER TABLE "Empresa" DROP COLUMN "notaFiscalAcao",
DROP COLUMN "notaFiscalProj",
ADD COLUMN     "pontos" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "nome" SET NOT NULL;

-- AlterTable
ALTER TABLE "ONG" DROP COLUMN "apoio",
DROP COLUMN "causa",
DROP COLUMN "localizacao",
DROP COLUMN "nome",
ADD COLUMN     "ods" TEXT;

-- AlterTable
ALTER TABLE "Selo" DROP COLUMN "empresaId",
ALTER COLUMN "tier" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Usuario" DROP COLUMN "nome",
ADD COLUMN     "cnpj" TEXT NOT NULL;

-- DropTable
DROP TABLE "Acao";

-- DropTable
DROP TABLE "Projeto";

-- DropTable
DROP TABLE "_ApoioEmpresaAcao";

-- DropTable
DROP TABLE "_ApoioEmpresaProjeto";

-- CreateTable
CREATE TABLE "Prefeitura" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "usuarioId" INTEGER NOT NULL,

    CONSTRAINT "Prefeitura_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Apoio" (
    "id" SERIAL NOT NULL,
    "data" TIMESTAMP(3) NOT NULL,
    "valor" DOUBLE PRECISION NOT NULL,
    "tipoAjuda" TEXT NOT NULL,
    "documentacao" TEXT NOT NULL,
    "empresaId" INTEGER NOT NULL,
    "ongId" INTEGER NOT NULL,
    "prefeituraId" INTEGER,

    CONSTRAINT "Apoio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Criterio" (
    "id" SERIAL NOT NULL,
    "tipo" TEXT NOT NULL,
    "pontuacao" INTEGER NOT NULL,
    "empresaId" INTEGER NOT NULL,
    "seloId" INTEGER NOT NULL,

    CONSTRAINT "Criterio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "File" (
    "id" SERIAL NOT NULL,
    "storedName" TEXT NOT NULL,
    "mimetype" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "path" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "File_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Prefeitura_usuarioId_key" ON "Prefeitura"("usuarioId");

-- CreateIndex
CREATE UNIQUE INDEX "Empresa_usuarioId_key" ON "Empresa"("usuarioId");

-- CreateIndex
CREATE UNIQUE INDEX "ONG_usuarioId_key" ON "ONG"("usuarioId");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_cnpj_key" ON "Usuario"("cnpj");

-- AddForeignKey
ALTER TABLE "Prefeitura" ADD CONSTRAINT "Prefeitura_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Apoio" ADD CONSTRAINT "Apoio_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "Empresa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Apoio" ADD CONSTRAINT "Apoio_ongId_fkey" FOREIGN KEY ("ongId") REFERENCES "ONG"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Apoio" ADD CONSTRAINT "Apoio_prefeituraId_fkey" FOREIGN KEY ("prefeituraId") REFERENCES "Prefeitura"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Criterio" ADD CONSTRAINT "Criterio_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "Empresa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Criterio" ADD CONSTRAINT "Criterio_seloId_fkey" FOREIGN KEY ("seloId") REFERENCES "Selo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
