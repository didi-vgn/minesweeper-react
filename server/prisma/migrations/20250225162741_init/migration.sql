-- CreateTable
CREATE TABLE "User_Achievement" (
    "userId" TEXT NOT NULL,
    "achievementId" TEXT NOT NULL,
    "earnedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_Achievement_pkey" PRIMARY KEY ("userId","achievementId")
);

-- AddForeignKey
ALTER TABLE "User_Achievement" ADD CONSTRAINT "User_Achievement_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_Achievement" ADD CONSTRAINT "User_Achievement_achievementId_fkey" FOREIGN KEY ("achievementId") REFERENCES "Achievement"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
