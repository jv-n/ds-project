-- CreateTable
CREATE TABLE "Usuario" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "telefone" TEXT,
    "nome" TEXT,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ONG" (
    "id" SERIAL NOT NULL,
    "nome" TEXT,
    "causa" TEXT NOT NULL,
    "localizacao" TEXT NOT NULL,
    "apoio" TEXT,
    "usuarioId" INTEGER NOT NULL,

    CONSTRAINT "ONG_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Empresa" (
    "id" SERIAL NOT NULL,
    "nome" TEXT,
    "notaFiscalProj" TEXT,
    "notaFiscalAcao" TEXT,
    "usuarioId" INTEGER NOT NULL,

    CONSTRAINT "Empresa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Acao" (
    "id" SERIAL NOT NULL,
    "nome" TEXT,
    "notaFiscal" TEXT,
    "ongId" INTEGER NOT NULL,

    CONSTRAINT "Acao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Projeto" (
    "id" SERIAL NOT NULL,
    "nome" TEXT,
    "ongId" INTEGER NOT NULL,

    CONSTRAINT "Projeto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Selo" (
    "id" SERIAL NOT NULL,
    "tipo" TEXT NOT NULL,
    "tier" INTEGER NOT NULL,
    "empresaId" INTEGER NOT NULL,

    CONSTRAINT "Selo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ApoioEmpresaProjeto" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_ApoioEmpresaAcao" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
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

-- AddForeignKey
ALTER TABLE "ONG" ADD CONSTRAINT "ONG_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Empresa" ADD CONSTRAINT "Empresa_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Acao" ADD CONSTRAINT "Acao_ongId_fkey" FOREIGN KEY ("ongId") REFERENCES "ONG"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Projeto" ADD CONSTRAINT "Projeto_ongId_fkey" FOREIGN KEY ("ongId") REFERENCES "ONG"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Selo" ADD CONSTRAINT "Selo_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "Empresa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ApoioEmpresaProjeto" ADD CONSTRAINT "_ApoioEmpresaProjeto_A_fkey" FOREIGN KEY ("A") REFERENCES "Empresa"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ApoioEmpresaProjeto" ADD CONSTRAINT "_ApoioEmpresaProjeto_B_fkey" FOREIGN KEY ("B") REFERENCES "Projeto"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ApoioEmpresaAcao" ADD CONSTRAINT "_ApoioEmpresaAcao_A_fkey" FOREIGN KEY ("A") REFERENCES "Acao"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ApoioEmpresaAcao" ADD CONSTRAINT "_ApoioEmpresaAcao_B_fkey" FOREIGN KEY ("B") REFERENCES "Empresa"("id") ON DELETE CASCADE ON UPDATE CASCADE;
