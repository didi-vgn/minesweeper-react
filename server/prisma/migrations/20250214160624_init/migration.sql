/*
  Warnings:

  - A unique constraint covering the columns `[userId,levelId]` on the table `Adventure_Progress` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Adventure_Progress_userId_levelId_key" ON "Adventure_Progress"("userId", "levelId");
