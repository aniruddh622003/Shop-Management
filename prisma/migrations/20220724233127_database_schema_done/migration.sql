/*
  Warnings:

  - You are about to drop the column `vendorID` on the `products` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name,MRP]` on the table `Products` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `products` DROP FOREIGN KEY `Products_vendorID_fkey`;

-- DropIndex
DROP INDEX `Products_name_MRP_vendorID_key` ON `products`;

-- AlterTable
ALTER TABLE `products` DROP COLUMN `vendorID`;

-- CreateTable
CREATE TABLE `PurchaseItem` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `productID` INTEGER NOT NULL,
    `vendorID` INTEGER NOT NULL,
    `Quantity` INTEGER NOT NULL,
    `PurchasePrice` DOUBLE NOT NULL,
    `PurchaseID` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Purchase` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `purchasedByID` INTEGER NOT NULL,
    `Note` VARCHAR(500) NOT NULL,
    `TransactionID` INTEGER NULL,

    UNIQUE INDEX `Purchase_TransactionID_key`(`TransactionID`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SaleItem` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `productID` INTEGER NOT NULL,
    `Quantity` INTEGER NOT NULL,
    `SellPrice` DOUBLE NOT NULL,
    `SaleID` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Sales` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `soldByID` INTEGER NOT NULL,
    `Note` VARCHAR(500) NOT NULL,
    `TransactionID` INTEGER NULL,

    UNIQUE INDEX `Sales_TransactionID_key`(`TransactionID`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Transactions` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `Date_Time` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `Gain` BOOLEAN NOT NULL,
    `Amount` DOUBLE NOT NULL,
    `ModeOfPayment` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_ProductsToVendor` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_ProductsToVendor_AB_unique`(`A`, `B`),
    INDEX `_ProductsToVendor_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Products_name_MRP_key` ON `Products`(`name`, `MRP`);

-- AddForeignKey
ALTER TABLE `PurchaseItem` ADD CONSTRAINT `PurchaseItem_vendorID_fkey` FOREIGN KEY (`vendorID`) REFERENCES `Vendor`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PurchaseItem` ADD CONSTRAINT `PurchaseItem_productID_fkey` FOREIGN KEY (`productID`) REFERENCES `Products`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PurchaseItem` ADD CONSTRAINT `PurchaseItem_PurchaseID_fkey` FOREIGN KEY (`PurchaseID`) REFERENCES `Purchase`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Purchase` ADD CONSTRAINT `Purchase_purchasedByID_fkey` FOREIGN KEY (`purchasedByID`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Purchase` ADD CONSTRAINT `Purchase_TransactionID_fkey` FOREIGN KEY (`TransactionID`) REFERENCES `Transactions`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SaleItem` ADD CONSTRAINT `SaleItem_productID_fkey` FOREIGN KEY (`productID`) REFERENCES `Products`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SaleItem` ADD CONSTRAINT `SaleItem_SaleID_fkey` FOREIGN KEY (`SaleID`) REFERENCES `Sales`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Sales` ADD CONSTRAINT `Sales_soldByID_fkey` FOREIGN KEY (`soldByID`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Sales` ADD CONSTRAINT `Sales_TransactionID_fkey` FOREIGN KEY (`TransactionID`) REFERENCES `Transactions`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ProductsToVendor` ADD CONSTRAINT `_ProductsToVendor_A_fkey` FOREIGN KEY (`A`) REFERENCES `Products`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ProductsToVendor` ADD CONSTRAINT `_ProductsToVendor_B_fkey` FOREIGN KEY (`B`) REFERENCES `Vendor`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
