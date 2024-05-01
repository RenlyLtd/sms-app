/*
  Warnings:

  - The primary key for the `Campaign` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `campaign_id` on the `Campaign` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "CampaignLeads" DROP CONSTRAINT "CampaignLeads_campaign_id_fkey";

-- DropForeignKey
ALTER TABLE "_LeadToCampaign" DROP CONSTRAINT "_LeadToCampaign_A_fkey";

-- AlterTable
ALTER TABLE "Address" ALTER COLUMN "street" DROP NOT NULL,
ALTER COLUMN "building_type" DROP NOT NULL,
ALTER COLUMN "account" DROP NOT NULL,
ALTER COLUMN "site_type" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Campaign" DROP CONSTRAINT "Campaign_pkey",
DROP COLUMN "campaign_id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Campaign_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Customer" ALTER COLUMN "email_alias" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "CampaignLeads" ADD CONSTRAINT "CampaignLeads_campaign_id_fkey" FOREIGN KEY ("campaign_id") REFERENCES "Campaign"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LeadToCampaign" ADD CONSTRAINT "_LeadToCampaign_A_fkey" FOREIGN KEY ("A") REFERENCES "Campaign"("id") ON DELETE CASCADE ON UPDATE CASCADE;
