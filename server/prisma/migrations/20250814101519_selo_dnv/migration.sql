/*
  Warnings:

  - You are about to drop the column `nivel` on the `Empresa` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Empresa" DROP COLUMN "nivel",
ADD COLUMN     "selo_nivel" TEXT NOT NULL DEFAULT 'N/A';
