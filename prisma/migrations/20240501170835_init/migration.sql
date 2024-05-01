-- CreateEnum
CREATE TYPE "CustomerStatus" AS ENUM ('Order', 'Active', 'Cancelled', 'Terminated');

-- CreateEnum
CREATE TYPE "CustomerSubStatus" AS ENUM ('Order_Received', 'Order_Registered', 'Installation_Issue', 'Lead_In_Install_Booked', 'Pre_Install_Check_Booked', 'Pre_Install_Failed', 'Lead_In_Failed', 'Faceplate_Installed_Awaiting_CPE', 'Install_Complete_Activation_Required', 'Activated', 'Cancelled', 'Terminated');

-- CreateTable
CREATE TABLE "Lead" (
    "id" SERIAL NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "contact_no" TEXT,
    "email" TEXT,
    "dns" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Lead_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Message" (
    "id" SERIAL NOT NULL,
    "destination" TEXT NOT NULL,
    "data" TEXT NOT NULL,
    "flash" BOOLEAN NOT NULL DEFAULT false,
    "received" TIMESTAMP(3),
    "scheduled_delivery" TIMESTAMP(3),
    "lead_id" INTEGER,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DeliveryReport" (
    "id" SERIAL NOT NULL,
    "destination_number" TEXT NOT NULL,
    "code" INTEGER NOT NULL,
    "dlr_body" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "msg_id" INTEGER,

    CONSTRAINT "DeliveryReport_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "List" (
    "list_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "type" TEXT NOT NULL,
    "lead_count" INTEGER NOT NULL DEFAULT 0,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" TIMESTAMP(3) NOT NULL,
    "tags" TEXT[],

    CONSTRAINT "List_pkey" PRIMARY KEY ("list_id")
);

-- CreateTable
CREATE TABLE "Campaign" (
    "campaign_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "list_id" INTEGER NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" TIMESTAMP(3) NOT NULL,
    "ended" TIMESTAMP(3),
    "clicks" INTEGER NOT NULL DEFAULT 0,
    "unsubscriptions" INTEGER NOT NULL DEFAULT 0,
    "status" TEXT NOT NULL,
    "conversions" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Campaign_pkey" PRIMARY KEY ("campaign_id")
);

-- CreateTable
CREATE TABLE "CampaignLeads" (
    "campaign_id" INTEGER NOT NULL,
    "lead_id" INTEGER NOT NULL,

    CONSTRAINT "CampaignLeads_pkey" PRIMARY KEY ("campaign_id","lead_id")
);

-- CreateTable
CREATE TABLE "Customer" (
    "id" SERIAL NOT NULL,
    "ho_cmid" INTEGER,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "dob" TIMESTAMP(3) NOT NULL,
    "mobile" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "bundleId" INTEGER,
    "ordering_date" TIMESTAMP(3),
    "termination_date" TIMESTAMP(3),
    "activation_date" TIMESTAMP(3),
    "cancellation_date" TIMESTAMP(3),
    "installation_appointment" TIMESTAMP(3),
    "dns" BOOLEAN NOT NULL DEFAULT true,
    "customer_status" "CustomerStatus" NOT NULL,
    "customer_sub_status" "CustomerSubStatus" NOT NULL,
    "total_wifi" BOOLEAN NOT NULL,
    "phone" BOOLEAN NOT NULL,
    "total_monthly_cost" INTEGER NOT NULL,
    "marketing_pref" BOOLEAN NOT NULL,
    "email_alias" TEXT NOT NULL,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bundle" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "speed" INTEGER NOT NULL,
    "contract_length" INTEGER NOT NULL,
    "min_speed" INTEGER NOT NULL,
    "up_speed" INTEGER NOT NULL,
    "down_speed" INTEGER NOT NULL,
    "promo_price" DOUBLE PRECISION NOT NULL,
    "ooc_price" DOUBLE PRECISION NOT NULL,
    "activationFee" INTEGER NOT NULL,

    CONSTRAINT "Bundle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Address" (
    "uprn" INTEGER NOT NULL,
    "address1" TEXT NOT NULL,
    "address2" TEXT,
    "street" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "postcode" TEXT NOT NULL,
    "building_type" TEXT NOT NULL,
    "account" INTEGER NOT NULL,
    "site_type" TEXT NOT NULL,
    "CustomerId" INTEGER NOT NULL,
    "leadId" INTEGER,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("uprn")
);

-- CreateTable
CREATE TABLE "_LeadToCampaign" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Lead_email_key" ON "Lead"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Customer_email_key" ON "Customer"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Customer_email_alias_key" ON "Customer"("email_alias");

-- CreateIndex
CREATE UNIQUE INDEX "_LeadToCampaign_AB_unique" ON "_LeadToCampaign"("A", "B");

-- CreateIndex
CREATE INDEX "_LeadToCampaign_B_index" ON "_LeadToCampaign"("B");

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_lead_id_fkey" FOREIGN KEY ("lead_id") REFERENCES "Lead"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DeliveryReport" ADD CONSTRAINT "DeliveryReport_msg_id_fkey" FOREIGN KEY ("msg_id") REFERENCES "Message"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Campaign" ADD CONSTRAINT "Campaign_list_id_fkey" FOREIGN KEY ("list_id") REFERENCES "List"("list_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CampaignLeads" ADD CONSTRAINT "CampaignLeads_campaign_id_fkey" FOREIGN KEY ("campaign_id") REFERENCES "Campaign"("campaign_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CampaignLeads" ADD CONSTRAINT "CampaignLeads_lead_id_fkey" FOREIGN KEY ("lead_id") REFERENCES "Lead"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Customer" ADD CONSTRAINT "Customer_bundleId_fkey" FOREIGN KEY ("bundleId") REFERENCES "Bundle"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_CustomerId_fkey" FOREIGN KEY ("CustomerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "Lead"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LeadToCampaign" ADD CONSTRAINT "_LeadToCampaign_A_fkey" FOREIGN KEY ("A") REFERENCES "Campaign"("campaign_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LeadToCampaign" ADD CONSTRAINT "_LeadToCampaign_B_fkey" FOREIGN KEY ("B") REFERENCES "Lead"("id") ON DELETE CASCADE ON UPDATE CASCADE;
