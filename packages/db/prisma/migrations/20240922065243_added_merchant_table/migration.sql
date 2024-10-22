-- CreateEnum
CREATE TYPE "AuthType" AS ENUM ('Google', 'Facebook');

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "age" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Merchant" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "auth_type" "AuthType" NOT NULL,

    CONSTRAINT "Merchant_pkey" PRIMARY KEY ("id")
);
