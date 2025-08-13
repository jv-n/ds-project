-- CreateTable
CREATE TABLE "public"."User" (
    "id" SERIAL NOT NULL,
    "cnpj" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "telefone" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ONG" (
    "id" SERIAL NOT NULL,
    "ods" TEXT,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "ONG_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Empresa" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    "pontos" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Empresa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Prefeitura" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "usuarioId" INTEGER NOT NULL,

    CONSTRAINT "Prefeitura_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Apoio" (
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
CREATE TABLE "public"."Criterio" (
    "id" SERIAL NOT NULL,
    "tipo" TEXT NOT NULL,
    "pontuacao" INTEGER NOT NULL,
    "empresaId" INTEGER NOT NULL,
    "seloId" INTEGER NOT NULL,

    CONSTRAINT "Criterio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Selo" (
    "id" SERIAL NOT NULL,
    "tipo" TEXT NOT NULL,
    "tier" TEXT NOT NULL,

    CONSTRAINT "Selo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."File" (
    "id" TEXT NOT NULL,
    "storedName" TEXT NOT NULL,
    "mimetype" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "path" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "File_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_cnpj_key" ON "public"."User"("cnpj");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "ONG_userId_key" ON "public"."ONG"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Empresa_usuarioId_key" ON "public"."Empresa"("usuarioId");

-- CreateIndex
CREATE UNIQUE INDEX "Prefeitura_usuarioId_key" ON "public"."Prefeitura"("usuarioId");

-- AddForeignKey
ALTER TABLE "public"."ONG" ADD CONSTRAINT "ONG_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Empresa" ADD CONSTRAINT "Empresa_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Prefeitura" ADD CONSTRAINT "Prefeitura_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Apoio" ADD CONSTRAINT "Apoio_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "public"."Empresa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Apoio" ADD CONSTRAINT "Apoio_ongId_fkey" FOREIGN KEY ("ongId") REFERENCES "public"."ONG"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Apoio" ADD CONSTRAINT "Apoio_prefeituraId_fkey" FOREIGN KEY ("prefeituraId") REFERENCES "public"."Prefeitura"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Criterio" ADD CONSTRAINT "Criterio_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "public"."Empresa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Criterio" ADD CONSTRAINT "Criterio_seloId_fkey" FOREIGN KEY ("seloId") REFERENCES "public"."Selo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
