/*
  Warnings:

  - You are about to drop the `ONG` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Projeto` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Selo` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Usuario` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ApoioEmpresaProjeto` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `ongId` on the `Acao` table. All the data in the column will be lost.
  - You are about to drop the column `notaFiscalAcao` on the `Empresa` table. All the data in the column will be lost.
  - You are about to drop the column `notaFiscalProj` on the `Empresa` table. All the data in the column will be lost.
  - You are about to drop the column `usuarioId` on the `Empresa` table. All the data in the column will be lost.
  - Added the required column `ong` to the `Acao` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Usuario_email_key";

-- DropIndex
DROP INDEX "_ApoioEmpresaProjeto_B_index";

-- DropIndex
DROP INDEX "_ApoioEmpresaProjeto_AB_unique";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "ONG";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Projeto";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Selo";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Usuario";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_ApoioEmpresaProjeto";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "ODS" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titulo" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "EmpresaODS" (
    "empresaId" INTEGER NOT NULL,
    "odsId" INTEGER NOT NULL,

    PRIMARY KEY ("empresaId", "odsId"),
    CONSTRAINT "EmpresaODS_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "Empresa" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "EmpresaODS_odsId_fkey" FOREIGN KEY ("odsId") REFERENCES "ODS" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Acao" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT,
    "notaFiscal" TEXT,
    "ong" TEXT NOT NULL
);
INSERT INTO "new_Acao" ("id", "nome", "notaFiscal") SELECT "id", "nome", "notaFiscal" FROM "Acao";
DROP TABLE "Acao";
ALTER TABLE "new_Acao" RENAME TO "Acao";
CREATE TABLE "new_Empresa" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT,
    "cnpj" TEXT,
    "email" TEXT,
    "senha" TEXT,
    "colaboradores" INTEGER,
    "pontos" INTEGER DEFAULT 0,
    "selo" TEXT
);
INSERT INTO "new_Empresa" ("id", "nome") SELECT "id", "nome" FROM "Empresa";
DROP TABLE "Empresa";
ALTER TABLE "new_Empresa" RENAME TO "Empresa";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
