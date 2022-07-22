/*
  Warnings:

  - A unique constraint covering the columns `[name,MRP,vendorID]` on the table `Products` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Products_name_MRP_vendorID_key` ON `Products`(`name`, `MRP`, `vendorID`);
