/*
  Warnings:

  - You are about to drop the `File` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."File" DROP CONSTRAINT "File_doacaoId_fkey";

-- DropTable
DROP TABLE "public"."File";

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
ALTER TABLE "public"."Documento" ADD CONSTRAINT "Documento_doacaoId_fkey" FOREIGN KEY ("doacaoId") REFERENCES "public"."Doacao"("id") ON DELETE SET NULL ON UPDATE CASCADE;
