/*
  Warnings:

  - You are about to drop the column `pontos` on the `Empresa` table. All the data in the column will be lost.
  - You are about to drop the column `tier` on the `Selo` table. All the data in the column will be lost.
  - You are about to drop the column `tipo` on the `Selo` table. All the data in the column will be lost.
  - You are about to drop the `Apoio` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Criterio` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `File` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ONG` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Prefeitura` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `updatedAt` to the `Empresa` table without a default value. This is not possible if the table is not empty.
  - Added the required column `descricao` to the `Selo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `empresaId` to the `Selo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nivel` to the `Selo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pontuacaoMin` to the `Selo` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Apoio" DROP CONSTRAINT "Apoio_empresaId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Apoio" DROP CONSTRAINT "Apoio_ongId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Apoio" DROP CONSTRAINT "Apoio_prefeituraId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Criterio" DROP CONSTRAINT "Criterio_empresaId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Criterio" DROP CONSTRAINT "Criterio_seloId_fkey";

-- DropForeignKey
ALTER TABLE "public"."ONG" DROP CONSTRAINT "ONG_usuarioId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Prefeitura" DROP CONSTRAINT "Prefeitura_usuarioId_fkey";

-- AlterTable
ALTER TABLE "public"."Empresa" DROP COLUMN "pontos",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "numColaboradores" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "odsId" INTEGER[],
ADD COLUMN     "pontuacao" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "public"."Selo" DROP COLUMN "tier",
DROP COLUMN "tipo",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "descricao" TEXT NOT NULL,
ADD COLUMN     "empresaId" INTEGER NOT NULL,
ADD COLUMN     "nivel" TEXT NOT NULL,
ADD COLUMN     "pontuacaoMin" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "public"."Usuario" ADD COLUMN     "perfil" TEXT NOT NULL DEFAULT 'empresa';

-- DropTable
DROP TABLE "public"."Apoio";

-- DropTable
DROP TABLE "public"."Criterio";

-- DropTable
DROP TABLE "public"."File";

-- DropTable
DROP TABLE "public"."ONG";

-- DropTable
DROP TABLE "public"."Prefeitura";

-- CreateTable
CREATE TABLE "public"."AcaoEmpresa" (
    "acaoId" INTEGER NOT NULL,
    "empresaId" INTEGER NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "nomeOng" TEXT NOT NULL,
    "emailOng" TEXT NOT NULL,
    "telefoneOng" TEXT NOT NULL,
    "odsAcao" INTEGER[],

    CONSTRAINT "AcaoEmpresa_pkey" PRIMARY KEY ("acaoId","empresaId")
);

-- CreateTable
CREATE TABLE "public"."Doacao" (
    "id" SERIAL NOT NULL,
    "data" TIMESTAMP(3) NOT NULL,
    "valor" DOUBLE PRECISION NOT NULL,
    "tipo" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Pendente',
    "motivoReprovacao" TEXT,
    "empresaId" INTEGER NOT NULL,
    "acaoId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Doacao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Documento" (
    "id" TEXT NOT NULL,
    "storedName" TEXT NOT NULL,
    "mimetype" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "path" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "doacaoId" INTEGER,

    CONSTRAINT "Documento_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."AcaoEmpresa" ADD CONSTRAINT "AcaoEmpresa_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "public"."Empresa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Doacao" ADD CONSTRAINT "Doacao_acaoId_empresaId_fkey" FOREIGN KEY ("acaoId", "empresaId") REFERENCES "public"."AcaoEmpresa"("acaoId", "empresaId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Selo" ADD CONSTRAINT "Selo_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "public"."Empresa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Documento" ADD CONSTRAINT "Documento_doacaoId_fkey" FOREIGN KEY ("doacaoId") REFERENCES "public"."Doacao"("id") ON DELETE SET NULL ON UPDATE CASCADE;
