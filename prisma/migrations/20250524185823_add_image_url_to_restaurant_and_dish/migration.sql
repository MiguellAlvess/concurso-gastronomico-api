/*
  Warnings:

  - Added the required column `image_url` to the `Dish` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image_url` to the `Restaurant` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Dish" ADD COLUMN     "image_url" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Restaurant" ADD COLUMN     "image_url" TEXT NOT NULL;
