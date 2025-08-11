-- CreateEnum
CREATE TYPE "StatusSubscription" AS ENUM ('Active', 'Past_due', 'Canceled');

-- CreateEnum
CREATE TYPE "EndpointUsage" AS ENUM ('Autocomplete');

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "role" SET DEFAULT 'enfermera';

-- CreateTable
CREATE TABLE "Nota" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "metadata" JSONB NOT NULL,
    "isDelete" BOOLEAN NOT NULL,
    "version" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "Subscription" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "StripeSubscriptionId" TEXT NOT NULL,
    "planId" TEXT NOT NULL,
    "status" "StatusSubscription" NOT NULL,
    "currentPeriodEnd" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "BillingHistory" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "stripeInvoiceId" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "UsageRecord" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "endpoint" "EndpointUsage" NOT NULL,
    "tokensConsumed" INTEGER NOT NULL,
    "costEstimated" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "Nota_id_key" ON "Nota"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Subscription_id_key" ON "Subscription"("id");

-- CreateIndex
CREATE UNIQUE INDEX "BillingHistory_id_key" ON "BillingHistory"("id");

-- CreateIndex
CREATE UNIQUE INDEX "BillingHistory_stripeInvoiceId_key" ON "BillingHistory"("stripeInvoiceId");

-- CreateIndex
CREATE UNIQUE INDEX "UsageRecord_id_key" ON "UsageRecord"("id");
