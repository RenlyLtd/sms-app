/*
  Warnings:

  - You are about to drop the column `clicks` on the `Campaign` table. All the data in the column will be lost.
  - You are about to drop the column `conversions` on the `Campaign` table. All the data in the column will be lost.
  - You are about to drop the column `list_id` on the `Campaign` table. All the data in the column will be lost.
  - You are about to drop the column `unsubscriptions` on the `Campaign` table. All the data in the column will be lost.
  - You are about to drop the column `lead_count` on the `List` table. All the data in the column will be lost.
  - You are about to drop the `CampaignLeads` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_LeadToCampaign` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `updated` to the `Lead` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Campaign" DROP CONSTRAINT "Campaign_list_id_fkey";

-- DropForeignKey
ALTER TABLE "CampaignLeads" DROP CONSTRAINT "CampaignLeads_campaign_id_fkey";

-- DropForeignKey
ALTER TABLE "CampaignLeads" DROP CONSTRAINT "CampaignLeads_lead_id_fkey";

-- DropForeignKey
ALTER TABLE "_LeadToCampaign" DROP CONSTRAINT "_LeadToCampaign_A_fkey";

-- DropForeignKey
ALTER TABLE "_LeadToCampaign" DROP CONSTRAINT "_LeadToCampaign_B_fkey";

-- AlterTable
ALTER TABLE "Campaign" DROP COLUMN "clicks",
DROP COLUMN "conversions",
DROP COLUMN "list_id",
DROP COLUMN "unsubscriptions";

-- AlterTable
ALTER TABLE "Lead" ADD COLUMN     "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "List" DROP COLUMN "lead_count";

-- DropTable
DROP TABLE "CampaignLeads";

-- DropTable
DROP TABLE "_LeadToCampaign";

-- CreateTable
CREATE TABLE "ListOnLead" (
    "listId" INTEGER NOT NULL,
    "leadId" INTEGER NOT NULL,

    CONSTRAINT "ListOnLead_pkey" PRIMARY KEY ("listId","leadId")
);

-- CreateTable
CREATE TABLE "CampaignLists" (
    "listId" INTEGER NOT NULL,
    "campaignId" INTEGER NOT NULL,

    CONSTRAINT "CampaignLists_pkey" PRIMARY KEY ("listId","campaignId")
);

-- CreateTable
CREATE TABLE "_ListToCampaign" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ListToCampaign_AB_unique" ON "_ListToCampaign"("A", "B");

-- CreateIndex
CREATE INDEX "_ListToCampaign_B_index" ON "_ListToCampaign"("B");

-- AddForeignKey
ALTER TABLE "ListOnLead" ADD CONSTRAINT "ListOnLead_listId_fkey" FOREIGN KEY ("listId") REFERENCES "List"("list_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ListOnLead" ADD CONSTRAINT "ListOnLead_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "Lead"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CampaignLists" ADD CONSTRAINT "CampaignLists_listId_fkey" FOREIGN KEY ("listId") REFERENCES "List"("list_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CampaignLists" ADD CONSTRAINT "CampaignLists_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "Campaign"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ListToCampaign" ADD CONSTRAINT "_ListToCampaign_A_fkey" FOREIGN KEY ("A") REFERENCES "Campaign"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ListToCampaign" ADD CONSTRAINT "_ListToCampaign_B_fkey" FOREIGN KEY ("B") REFERENCES "List"("list_id") ON DELETE CASCADE ON UPDATE CASCADE;
