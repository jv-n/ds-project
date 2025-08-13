/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Empresa" DROP CONSTRAINT "Empresa_usuarioId_fkey";

-- DropForeignKey
ALTER TABLE "public"."ONG" DROP CONSTRAINT "ONG_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Prefeitura" DROP CONSTRAINT "Prefeitura_usuarioId_fkey";

-- DropTable
DROP TABLE "public"."User";

-- CreateTable
CREATE TABLE "public"."users" (
    "id" SERIAL NOT NULL,
    "cnpj" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "telefone" TEXT,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_cnpj_key" ON "public"."users"("cnpj");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "public"."users"("email");

-- AddForeignKey
ALTER TABLE "public"."ONG" ADD CONSTRAINT "ONG_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Empresa" ADD CONSTRAINT "Empresa_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Prefeitura" ADD CONSTRAINT "Prefeitura_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
