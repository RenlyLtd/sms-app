/*
  Warnings:

  - Added the required column `account` to the `List` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "List" ADD COLUMN     "account" TEXT NOT NULL;
