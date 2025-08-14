/*
  Warnings:

  - You are about to drop the column `senha` on the `Usuario` table. All the data in the column will be lost.
  - Added the required column `status` to the `File` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `Usuario` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "File" ADD COLUMN     "status" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Usuario" DROP COLUMN "senha",
ADD COLUMN     "password" TEXT NOT NULL;
