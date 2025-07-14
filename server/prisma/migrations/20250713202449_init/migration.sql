-- CreateTable
CREATE TABLE "Usuario" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "telefone" TEXT,
    "nome" TEXT
);

-- CreateTable
CREATE TABLE "ONG" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT,
    "causa" TEXT NOT NULL,
    "localizacao" TEXT NOT NULL,
    "apoio" TEXT,
    "usuarioId" INTEGER NOT NULL,
    CONSTRAINT "ONG_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Empresa" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT,
    "notaFiscalProj" TEXT,
    "notaFiscalAcao" TEXT,
    "usuarioId" INTEGER NOT NULL,
    CONSTRAINT "Empresa_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Acao" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT,
    "notaFiscal" TEXT,
    "ongId" INTEGER NOT NULL,
    CONSTRAINT "Acao_ongId_fkey" FOREIGN KEY ("ongId") REFERENCES "ONG" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Projeto" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT,
    "ongId" INTEGER NOT NULL,
    CONSTRAINT "Projeto_ongId_fkey" FOREIGN KEY ("ongId") REFERENCES "ONG" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Selo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "tipo" TEXT NOT NULL,
    "tier" INTEGER NOT NULL,
    "empresaId" INTEGER NOT NULL,
    CONSTRAINT "Selo_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "Empresa" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_ApoioEmpresaProjeto" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_ApoioEmpresaProjeto_A_fkey" FOREIGN KEY ("A") REFERENCES "Empresa" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_ApoioEmpresaProjeto_B_fkey" FOREIGN KEY ("B") REFERENCES "Projeto" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_ApoioEmpresaAcao" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_ApoioEmpresaAcao_A_fkey" FOREIGN KEY ("A") REFERENCES "Acao" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_ApoioEmpresaAcao_B_fkey" FOREIGN KEY ("B") REFERENCES "Empresa" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_ApoioEmpresaProjeto_AB_unique" ON "_ApoioEmpresaProjeto"("A", "B");

-- CreateIndex
CREATE INDEX "_ApoioEmpresaProjeto_B_index" ON "_ApoioEmpresaProjeto"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ApoioEmpresaAcao_AB_unique" ON "_ApoioEmpresaAcao"("A", "B");

-- CreateIndex
CREATE INDEX "_ApoioEmpresaAcao_B_index" ON "_ApoioEmpresaAcao"("B");
