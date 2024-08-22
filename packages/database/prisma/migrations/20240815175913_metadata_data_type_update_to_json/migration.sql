/*
  Warnings:

  - The `publicMetadata` column on the `Organization` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `privateMetadata` column on the `Organization` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `publicMetadata` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `privateMetadata` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `unsafeMetadata` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Organization" DROP COLUMN "publicMetadata",
ADD COLUMN     "publicMetadata" JSONB,
DROP COLUMN "privateMetadata",
ADD COLUMN     "privateMetadata" JSONB;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "publicMetadata",
ADD COLUMN     "publicMetadata" JSONB,
DROP COLUMN "privateMetadata",
ADD COLUMN     "privateMetadata" JSONB,
DROP COLUMN "unsafeMetadata",
ADD COLUMN     "unsafeMetadata" JSONB;
