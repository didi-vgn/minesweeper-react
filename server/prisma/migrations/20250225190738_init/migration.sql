/*
  Warnings:

  - You are about to drop the column `condition` on the `Achievement` table. All the data in the column will be lost.
  - You are about to drop the column `icon` on the `Achievement` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id]` on the table `Achievement` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Achievement" DROP COLUMN "condition",
DROP COLUMN "icon";

-- CreateIndex
CREATE UNIQUE INDEX "Achievement_id_key" ON "Achievement"("id");
