-- AlterTable
ALTER TABLE "public"."Usuario" ADD COLUMN     "resetPasswordExpires" TIMESTAMP(3),
ADD COLUMN     "resetPasswordToken" TEXT;
