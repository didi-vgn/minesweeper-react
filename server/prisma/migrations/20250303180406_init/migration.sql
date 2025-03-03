-- DropForeignKey
ALTER TABLE "User_Achievement" DROP CONSTRAINT "User_Achievement_achievementId_fkey";

-- AddForeignKey
ALTER TABLE "User_Achievement" ADD CONSTRAINT "User_Achievement_achievementId_fkey" FOREIGN KEY ("achievementId") REFERENCES "Achievement"("id") ON DELETE CASCADE ON UPDATE CASCADE;
