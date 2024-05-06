/*
  Warnings:

  - The primary key for the `Address` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `CustomerId` on the `Address` table. All the data in the column will be lost.
  - You are about to drop the column `address1` on the `Address` table. All the data in the column will be lost.
  - You are about to drop the column `address2` on the `Address` table. All the data in the column will be lost.
  - You are about to drop the column `city` on the `Address` table. All the data in the column will be lost.
  - You are about to drop the column `leadId` on the `Address` table. All the data in the column will be lost.
  - You are about to drop the column `postcode` on the `Address` table. All the data in the column will be lost.
  - You are about to drop the column `street` on the `Address` table. All the data in the column will be lost.
  - You are about to drop the column `uprn` on the `Address` table. All the data in the column will be lost.
  - Added the required column `line1` to the `Address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `postCode` to the `Address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `addressId` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `addressId` to the `Lead` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Address" DROP CONSTRAINT "Address_CustomerId_fkey";

-- DropForeignKey
ALTER TABLE "Address" DROP CONSTRAINT "Address_leadId_fkey";

-- AlterTable
ALTER TABLE "Address" DROP CONSTRAINT "Address_pkey",
DROP COLUMN "CustomerId",
DROP COLUMN "address1",
DROP COLUMN "address2",
DROP COLUMN "city",
DROP COLUMN "leadId",
DROP COLUMN "postcode",
DROP COLUMN "street",
DROP COLUMN "uprn",
ADD COLUMN     "country" TEXT,
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "latitude" TEXT,
ADD COLUMN     "line1" TEXT NOT NULL,
ADD COLUMN     "line2" TEXT,
ADD COLUMN     "line3" TEXT,
ADD COLUMN     "line4" TEXT,
ADD COLUMN     "line5" TEXT,
ADD COLUMN     "line6" TEXT,
ADD COLUMN     "longitude" TEXT,
ADD COLUMN     "postCode" TEXT NOT NULL,
ADD CONSTRAINT "Address_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Customer" ADD COLUMN     "addressId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Lead" ADD COLUMN     "addressId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Lead" ADD CONSTRAINT "Lead_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Customer" ADD CONSTRAINT "Customer_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
